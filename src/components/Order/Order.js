import React , { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup , Modal, Offcanvas, Image} from "react-bootstrap";
import { storage, addBookToUser } from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "emailjs-com";
import { useNavigate, Link } from 'react-router-dom'
import NavBar from "../Nav/NavBar";
import Loading from '../Loading/Loading';
import delImg1 from "../../assets/images/deliveryInfo1.jpg";
import delImg2 from "../../assets/images/deliveryInfo2.jpg";
import "./Order.css";

function OrderConfirmed(){
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false); 
  const handleInfoClose = () => setShowInfo(false);
  const handleShow = () => setShowInfo(true);
  const [show, setShow] = useState(false);
  let data = JSON.parse(localStorage.getItem('addToCart'));
  let user = localStorage.getItem('user');
  let subTotal = 0;
  console.log(data);
  const form = useRef();
  const radioHandler = (status) => {
    setStatus(status);
  };

  useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
  }, [])

  const [imageUrl, setImageUrl] = useState(null);
  const setImageUpload = (imageUpload) => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url)
      });
    });
  }

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("addToCart");
    localStorage.removeItem("bookData");
    navigate('/stories')
  }
  const addbookInfo = () =>{
    addBookToUser(user, data);
  }

  const goTologin = () =>{
    navigate('/login')
  }


  const sendEmail = (e) => {
    e.preventDefault();
    var gethtml = document.getElementById("orderLists").innerHTML;
    var getTemplate = document.getElementById("htmlTemplate")
    getTemplate.value += '<div style="width: 500px">' + gethtml +'</div>';
    if(imageUrl !== null && status === 2){
      getTemplate.value += "<b>Payment options :</b> Direct Bank Transfer<br>";
      getTemplate.value += "<b>Payment Screenshot :</b> " +  imageUrl;
    }else{
      getTemplate.value += "<b>Payment options :</b> Cash On Delivery";
    }
    emailjs.sendForm('service_hicz56n', 'template_pohsi8l', form.current, 'LkA6BCTBIux5qO0KS')
      .then((result) => {
          console.log(result)
          if(result.status === 200){
            setShow(true)
          }
      }, (error) => {
          console.log(error.text);
          alert(error.text)
      });
  };

  return (
    <>
    {loading === false ? (
    <Container fluid className='paddingZero'>
      <NavBar bg="light"/>
      <Container fluid className='orderForm'>
        <Container className='py-5'>
          <Row className='py-5'>
            <Col md={6} className="orderSummary" id="orderLists">
              <h3>Order Summary</h3>
              <ListGroup className='addToLists col-md-10'>
              {data.map((book, i) => {
                subTotal += parseInt(book.subTotal);
                return(
                  <ListGroup.Item key={i} style={{"borderBottom": "1px solid","paddingBottom": "10px"}}>
                    <span className='addNum' style={{"paddingRight": "0.5rem","borderRight": "1px solid"}}>{i + 1}</span>
                    <label className='addTitle' style={{"width": "300px","paddingLeft": "10px","display": "inline-block"}}>{book.title} </label>
                    <label  style={{"width": "50px"}}> x {book.count} </label>
                    <label style={{"width": "80px","paddingLeft": "10px","display": "inline-block"}}>
                      <span>{book.subTotal} K</span>
                    </label>
                  </ListGroup.Item>
                );
              })}
              {/* <Row>
                <Col style={{"width": "250px","display": "inline-block"}}></Col>
                <Col style={{"width": "180px","display": "inline-block"}} className="addTitle">
                  <p><label style={{"width": "80px","display": "inline-block"}}>SubTotal </label> : <label style={{"width": "70px","display": "inline-block","textAlign": "right"}}>{subTotal} K</label></p>
                  <p><label style={{"width": "80px","display": "inline-block"}}>Delivery </label> : <label style={{"width": "70px","display": "inline-block","textAlign": "right"}}>1000 K </label></p>
                </Col>
              </Row> */}
              <Row className='total'>
                <Col style={{"width": "250px","display": "inline-block"}}></Col>
                <Col style={{"width": "180px","display": "inline-block"}} className="addTitle">
                  <p><label style={{"width": "80px","display": "inline-block"}}>Total </label> : <label style={{"width": "70px","display": "inline-block","textAlign": "right"}}> {subTotal} K </label></p>
                </Col>
              </Row>
              </ListGroup>
            </Col>
            <Col md={6}>
              <Form className="infoForm" ref={form} onSubmit={sendEmail} id="submitForm">
              <h3>Customer Information</h3>
                <Form.Group className="mb-4 row">
                  <Form.Label className='col-md-4'>Name <strong>*</strong></Form.Label>
                  <Form.Control className='col-md-8' type="text" placeholder="Enter your name" name="user_name"/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                  <Form.Label className='col-md-4'>Email <strong>*</strong></Form.Label>
                  <Form.Control className='col-md-8' type="email" placeholder="Enter your email" name="user_email"/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                  <Form.Label className='col-md-4'>Phone Number <strong>*</strong></Form.Label>
                  <Form.Control className='col-md-8' type="text" placeholder="Enter your phone number" name="user_phone" />
                </Form.Group>
                <Form.Group className="mb-4 row">
                  <Form.Label className='col-md-4'>Payment Options<strong>*</strong></Form.Label>
                  <div className='col-md-8 row'>
                    <div className='col-md-6'>
                      <Form.Check type="radio" name="options" label="Cash On Delivery" onClick={(e) => radioHandler(1)}/>
                    </div>
                    <div className='col-md-6'>
                      <Form.Check type="radio" name="options" label="Direct Bank Transfer" onClick={(e) => radioHandler(2)}/>
                    </div>
                  </div>
                </Form.Group>
                {status === 2 && (
                  <Form.Group className="mb-4 row">
                    <Form.Label className='col-md-4'>Payment Screenshoot<strong>*</strong></Form.Label>
                    <Form.Group controlId="formFileSm" className="col-md-8 fileInput">
                      <Form.Control type="file" onChange={(event) => {setImageUpload(event.target.files[0]);}}/>
                    </Form.Group>
                  </Form.Group>
                )}
                <Form.Group className="mb-4 row">
                  <Form.Label className='col-md-4'>Address <strong>*</strong></Form.Label>
                  <Form.Control className='col-md-8' as="textarea" rows={3} placeholder="Enter your address" name="user_address"/>
                </Form.Group>
                <Form.Group className="mb-4 row">
                  <Form.Label className='col-md-4'>Message <strong>*</strong></Form.Label>
                  <Form.Control className='col-md-8' as="textarea" rows={3} placeholder="Enter your message to Third Sory" name="message"/>
                </Form.Group> 
                <Form.Group className="mb-4 row d-none">
                  <Form.Label className='col-md-4'>Order lists</Form.Label>
                  <Form.Control className='col-md-8' as="textarea" rows={3} id="htmlTemplate" name="my_html"/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit" onClick={addbookInfo}>
                      Complete Your Order
                    </Button>
                    <p className='py-3 signUpText'> Already have an account? <Link to="/login" onClick={goTologin}> Login Here!</Link></p>
                </div>

                {show === true && (
                   <Modal show={show} onHide={handleClose} centered className='text-center'>
                    <Modal.Header closeButton>
                      <Modal.Title>Order Confimed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, your order successfully sent!</Modal.Body>
                 </Modal>
                )}
            </Form>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="payment-footer">
        <Container>
          <Row>
            <Col md={6} className="py-4">
              <h4>Payment Method</h4>
              <p><label className='payment-name'>Kpay / Wave Pay </label>: +95945454545</p>
              <p><label className='payment-name'>KBZ Mobile Banking </label>: 0980 4567 0987 3456</p>
              <p><label className='payment-name'>AYA Mobile Banking </label>: 7980 6745 2384 9634</p>
            </Col>
            <Col md={6} className="py-4">
              <h4>Review & Place Order </h4>
              <p>Please review the order details and payment details before proceeding to confirm your order </p>

              <Button variant="primary" type="submit"  onClick={handleShow}>
                Show Delivery Information
              </Button> 
              <Offcanvas show={showInfo} onHide={handleInfoClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Delivery Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {<Image src={delImg1} alt="delivery image 1" className='img-fluid'/>}
                  {<Image src={delImg2} alt="delivery image 2" className='img-fluid'/>}
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
          </Row>
        </Container>
      </Container>
     </Container>
       ) : (
        <Loading />
    )}
    </>
  );
}

export default OrderConfirmed;
