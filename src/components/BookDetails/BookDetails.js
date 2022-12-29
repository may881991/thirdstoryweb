import React , { useState , useEffect}from 'react';
import NavBar from "../Nav/NavBar";
import Footer from '../Footer/Footer';
import ListsView from "../Lists/Lists";
import { Container, Row, Col, Button , Offcanvas, ListGroup, OffcanvasTitle} from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { BsArrowLeft, BsBook, BsCartPlusFill , BsCart3} from "react-icons/bs";
import meesuImg from "../../assets/images/meesu.png";
import natImg from "../../assets/images/Natpauksi.png";
import "./BookDetails.css";

function OffCanvasaddTo({ name, ...props}) {
  let bookData = props.data;
  let bookArr  = props.array;
  const [totalbookCount, setTotalBookCount] = useState(props.total);
  let checkBookName;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  const addToCart= () => {
    setShow(true)
    let bookInfo = localStorage.getItem('bookData');
    let bookInfoObj = JSON.parse(bookInfo);
    bookInfoObj.count = 1;
    setTotalBookCount(totalbookCount + 1)
    console.log(bookInfoObj)
    let getBookName = bookInfoObj.title;
    let getPrice = bookInfoObj.price;
    bookInfoObj.subTotal = parseInt(getPrice);
    checkBookName = bookArr.includes(getBookName);
    bookArr.push(getBookName)
    const bookCounts = {};
    for (const num of bookArr) {
      bookCounts[num] = bookCounts[num] ? bookCounts[num] + 1 : 1;
    }
    console.log(bookCounts)

    if(bookData !== null && checkBookName === false){
      bookData.push(bookInfoObj);
      localStorage.setItem('addToCart', JSON.stringify(bookData));
      return bookData;
    }else{
      console.log(bookCounts);
      let updateData = [];
      bookData.map((obj) => {
        if(obj.title === getBookName){
          obj.count += 1;
          obj.subTotal += parseInt(getPrice);
          updateData.push(obj)
        }else{
          updateData.push(obj)
        }
      })
      localStorage.setItem('addToCart', JSON.stringify(updateData));
      bookData = updateData;
      return bookData;
    }
  }
  console.log(bookData)
  if(bookData.length > 0){
    let subTotal = 0;
    return (
      <>
        <Button variant="primary" onClick={addToCart} className="me-2">
          {name} <BsCartPlusFill />
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props} className="addTocartOff" >
          <Offcanvas.Header closeButton>
            <label><BsCart3 />  <span>{totalbookCount}</span></label>
            <Offcanvas.Title>Your Books</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <ListGroup className='addToLists'>
            {bookData.map((book, i) => {
              subTotal += parseInt(book.subTotal);
              return (
                <ListsView
                  key={i}
                  num={i}
                  count={book.count}
                  title={book.title}
                  price={book.subTotal}
                />
              );
            })}
            </ListGroup>
          <OffcanvasTitle>SubTotal : <label id="totalVal">{subTotal} K</label></OffcanvasTitle>
          <Link to="/order" className="me-2 btn btn-outline-light"> Confirm Order </Link>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }else{
    console.log(bookData)
    return (
      <>
          <Button variant="primary" onClick={addToCart} className="me-2">
            {name} <BsCartPlusFill />
          </Button>
      </>
    );
  }
}

function BookDetails(){ 
    const [loading, setLoading] = useState(true)
    let bookData = localStorage.getItem('addToCart');
    let bookArr = [];
    let totalBookCount = 0;
    if(bookData === null){
      bookData = [];
    }else{
      bookData = JSON.parse(localStorage.getItem('addToCart'));
      bookData.forEach(function(book){
        totalBookCount += book.count;
        bookArr.push(book.title)
      })
    }
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])
    console.log(totalBookCount);
    console.log(bookArr)
    document.body.classList.add('bookDetail');
    const navigate = useNavigate();
    let bookInfo = localStorage.getItem('bookData');
    bookInfo = JSON.parse(bookInfo);
    let price = parseInt(bookInfo.price);
    function goBack(){
      localStorage.removeItem("bookData");
      navigate('/stories')
    }

    function readBook(){
      navigate('/read')
    }

    return(
      <>
      {loading === false ? (
        <Container fluid className='paddingZero'>
            <NavBar bg="light"/>
            <Container fluid className='banner'>
            <Row className='mx-auto container'>
                <Col md={2} className="py-3 meesuImg">
                  {<img src={meesuImg} alt={meesuImg} className="img-fluid"/> }
                </Col>
                <Col md={8} className="bookInfo">
                    <Button variant="link" onClick={goBack}> <BsArrowLeft />Back</Button>
                    <Row>
                      <Col md={4}>
                        {<img src={bookInfo.bookCover} alt={"BookCover"} className="img-fluid"/> }
                      </Col>
                      <Col md={6} className="offset-md-1 pt-5">
                        <h5>{bookInfo.title}</h5>
                        <p><label>Author : </label> {bookInfo.author}  </p>
                        <p><label>Illustrator : </label> {bookInfo.illustrator}  </p>
                        <p><label>Price : </label> {price} kyats</p>
                        <Button variant="outline-primary" onClick={readBook}> <BsBook /> Read </Button>
                        {['end'].map((placement, idx) => (
                          <OffCanvasaddTo key={idx} placement={placement} name={"Add To Cart"} data={bookData} array={bookArr} total={totalBookCount}/> 
                        ))}
                      </Col>
                    </Row>
                </Col>
                <Col md={2} className="py-3">
                  {<img src={natImg} alt={natImg} className="img-fluid"/> }
                </Col>
            </Row>
            </Container>
            <Footer />
        </Container>
        ) : (
        <Loading />
      )}
      </>
    )
}
export default BookDetails;