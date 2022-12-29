import React, { useState, useEffect } from 'react';
import NavBar from "../Nav/NavBar";
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import './Gallery.css'; 
import { Container, Row, Col } from "react-bootstrap";
import boxItem from "../../assets/images/bgBox.png";
import customer1Img from "../../assets/images/customer4.png";
import customer2Img from "../../assets/images/customer5.png";
import customer3Img from "../../assets/images/customer6.png"; 
import customer4Img from "../../assets/images/customer7.png";
import customer5Img from "../../assets/images/customer8.png";
import customer6Img from "../../assets/images/customer9.png"; 
import customer7Img from "../../assets/images/customer10.png";
import customer8Img from "../../assets/images/customer11.png";
import customer9Img from "../../assets/images/customer12.png"; 
import customer10Img from "../../assets/images/customer13.png";
import customer11Img from "../../assets/images/customer14.png";
import customer12Img from "../../assets/images/customer15.png"; 
function Customers() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])
    return(
        <>
        {loading === false ? (
        <Container fluid className="ourGallery text-center paddingZero">
            <NavBar bg="light"/>
            {<img src={boxItem} alt={boxItem} className="bgItem3" />}
            <Container className='mt-5'>
                <h2>Happy Customers</h2> 
                    <Row className='galleryItem'>
                        <Col xs={10} md={4}>
                            <img src={customer1Img} alt={customer1Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer2Img} alt={customer2Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer3Img} alt={customer3Img} className="img-fluid" />
                        </Col> 
                        <Col xs={10} md={4}>
                            <img src={customer4Img} alt={customer4Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer5Img} alt={customer5Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer6Img} alt={customer6Img} className="img-fluid" />
                        </Col> 
                        <Col xs={10} md={4}>
                            <img src={customer7Img} alt={customer7Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer8Img} alt={customer8Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer9Img} alt={customer9Img} className="img-fluid" />
                        </Col>  
                        <Col xs={10} md={4}>
                            <img src={customer10Img} alt={customer10Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer11Img} alt={customer11Img} className="img-fluid" />
                        </Col>
                        <Col xs={10} md={4}>
                            <img src={customer12Img} alt={customer12Img} className="img-fluid" />
                        </Col> 
                    </Row> 
            </Container>
            <Footer />
        </Container>
        ) : (
        <Loading />
      )}
      </>
    );
}

export default Customers;