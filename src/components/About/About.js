import React, { useState, useEffect } from 'react';
import NavBar from "../Nav/NavBar";
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import { Container, Row, Col } from "react-bootstrap";
import firstImg from "../../assets/images/fristprize.png";
import WYLKImg from "../../assets/images/WYLK9.png";
import storyImg1 from "../../assets/images/image1.png";
import storyImg2 from "../../assets/images/image2.png";
import storyImg3 from "../../assets/images/image3.png";
import storyImg4 from "../../assets/images/image4.png";
import './About.css';


function AboutUs(){
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
                    {<img src={firstImg} alt={firstImg} className="bannerImg1 img-fluid"/> }
                    </Col>
                    <Col md={8} className="text-center bannerText">
                    <h2>Our Story</h2>
                    <p className='storyText'>The Third Story Project creates children's books with a positive message for children in Myanmar, written and illustrated by Myanmar artists. </p>
                    </Col>
                    <Col md={2}>
                    {<img src={WYLKImg} alt={WYLKImg} className="bannerImg4 img-fluid"/> }
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={10} className='offset-md-1'>
                        <Row className='storyBox'>
                            <Col>
                                The Third Story Project, a collaborative effort between the Myanmar Storytellers and the Benevolent Youth Association (Yangon), creates and produces children’s books in Burmese and other Myanmar languages to distribute free of charge to children around Myanmar. The stories are written and illustrated by Myanmar artists for a Myanmar audience and address issues of peace, tolerance, diversity, gender, environment and child rights.
                            </Col>
                            <Col className='text-end'>
                                {<img src={storyImg1} alt={storyImg1} className="img-fluid"/> }
                            </Col>
                        </Row>
                        <Row className='storyBox'>
                            <Col>
                                {<img src={storyImg2} alt={storyImg2} className="img-fluid"/> }
                            </Col>
                            <Col>
                                The Third Story Project has distributed over 870,000 books free of charge to children in cities and villages throughout Myanmar. We work with many local volunteer organizations to distribute books in every division and state in Myanmar. The organizations deliver the books directly to children and use storytelling to engage the kids in a dialogue about important issues.
                            </Col>
                        </Row>
                        <Row className='storyBox'>
                            <Col>
                                We also offer storyteller trainings to community leaders, teachers, volunteers and religious leaders so they can use storytelling in their work to better connect with the people they serve. Additionally, we work with young students to educate them about child rights and storytelling. We coach teens on how to create their own stories, offering them an outlet to express themselves in a constructive way.
                            </Col>
                            <Col className='text-end'>
                                {<img src={storyImg3} alt={storyImg3} className="img-fluid"/> }
                            </Col>
                        </Row>
                        <Row className='storyBox'>
                            <Col>
                                {<img src={storyImg4} alt={storyImg4} className="img-fluid"/> }
                            </Col>
                            <Col>
                                We are a non-profit social enterprise, registered as a business and publisher in Myanmar. All proceeds go directly back to the project to create more entertaining books to deliver to little people's hands. The Third Story Project sells books to major international organizations, local volunteer groups, to parents and to everyone else who loves a great story. 
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

export default AboutUs;