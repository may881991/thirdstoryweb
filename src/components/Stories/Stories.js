import React, { useState, useEffect } from 'react';
import NavBar from "../Nav/NavBar";
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import { Container, Row, Col } from "react-bootstrap";
import deeKu from "../../assets/images/dee-ku.png";
import paceofHeart from "../../assets/images/Peace-from-heart.png";
import { Player, BigPlayButton } from 'video-react';
import video1 from "../../assets/videos/video1.mp4";
import thumbnail1 from "../../assets/images/video-thumbnail1.png";
import '../../../node_modules/video-react/dist/video-react.css';
import './Stories.css';


function Stories(){
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])

    return (
    <>
    {loading === false ? (
        <Container fluid className='sidebarBg paddingZero'>
            <NavBar bg="light"/>
            <Container fluid className='banner'>
                <Row>
                    <Col md={2} className="py-3">
                    {<img src={deeKu} alt={deeKu} className="bannerImg1 img-fluid"/> }
                    </Col>
                    <Col md={8} className="text-center bannerText">
                    <h2>Hear our Stories</h2>
                    <p className='storyText'>We work with many other amazing organizations who also believe in bringing wonderful stories to children. Many have used our books for videos and other interactive learning tools. Below are videos of our stories done by our partners and volunteers. Happy listening! </p>
                    </Col>
                    <Col md={2}>
                    {<img src={paceofHeart} alt={paceofHeart} className="bannerImg4 img-fluid"/> }
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={10} className='offset-md-1'>
                        <Row className='storyBox'>
                            <Col>
                                <h4>What are Child Rights?</h4>
                                {/* <label>Phoe Sa Lone</label> */}
                                <Player src={video1} poster={thumbnail1}> 
                                    <BigPlayButton position="center" />
                                </Player>
                            </Col> 
                        </Row>
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

export default Stories;