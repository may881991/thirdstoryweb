import React from 'react';
import { useNavigate } from "react-router-dom";
import './Footer.css';
import { Container, Row, Col } from "react-bootstrap";
import { BsInstagram , BsYoutube, BsFacebook } from "react-icons/bs";
import footerLogo from "../../assets/images/f-logo.png";
import boxItem from "../../assets/images/bgBox.png";

function Footer() {
    const navigate = useNavigate();
    
    const gotoActivities = () => { 
        navigate('/activities')
    }

    const gotoGallery = () => { 
        navigate('/gallery')
    } 

    const gotoAbout = () => { 
        navigate('/about')
    }
    return(
        <Container fluid className="footer">
            {<img src={boxItem} alt={boxItem}  className="bgItem5" />}
            <Container className="py-5">
                <Row>
                    <Col lg={4} md={12}>
                        <h5>{<img src={footerLogo} alt={footerLogo}/>} Third Story Project</h5>
                        <p>We are a non-profit social enterprise, registered as a business and publisher in Myanmar.</p>
                        <label>©thirdstory 2022. All rights reserved</label>
                    </Col>
                    <Col lg={4} md={12} className="px-5">
                        <h5 className='secTitle'>Our Stories</h5>
                        <ul>
                            <li><a href='/about' onClick={gotoAbout}>About Us</a></li>
                            <li><a href='/gallery' onClick={gotoGallery}>Happy Customer</a></li>
                            <li><a href='/activities' onClick={gotoActivities}>Our Activities</a></li>
                            {/* <li><a href='https://www.google.com/'>Apps</a></li> */}
                        </ul>
                    </Col>
                    {/* <Col lg={3} md={12}>
                        <h5 className='secTitle'>Shops</h5>
                        <ul>
                            <li><a href='https://sites.google.com/view/thirdstoryproject/where-to-buy?authuser=0'>Yangon</a></li>
                            <li><a href='https://sites.google.com/view/thirdstoryproject/where-to-buy?authuser=0'>Mandalay</a></li>
                            <li><a href='https://sites.google.com/view/thirdstoryproject/where-to-buy?authuser=0'>Shan State</a></li>
                            <li><a href='https://sites.google.com/view/thirdstoryproject/where-to-buy?authuser=0'>Kayin State</a></li>
                        </ul>
                    </Col> */}
                    <Col lg={4} md={12} className="contactInfo">
                        <h5>Contact Us</h5>
                        <label>admin@thirdstoryproject.org</label>
                        {/* <label>No. 86, 52 Street, Middle Block, </label> */}
                        <label>Yangon, Myanmar (Burma)</label>
                        <div>
                            <a href='https://www.youtube.com/channel/UCROK29V6rKZWO8LZbUFWglw/featured'> <BsYoutube /></a>
                            <a href='https://www.instagram.com/thirdstoryproject/?hl=en'> <BsInstagram /></a>
                            <a href='https://www.facebook.com/thirdstorychildrenbooks'> <BsFacebook /></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
    
export default Footer;