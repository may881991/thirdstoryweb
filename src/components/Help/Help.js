import React from 'react';
import { useNavigate } from "react-router-dom";
import './Help.css';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import jayImg from "../../assets/images/jayjay.png";
import helpImg1 from "../../assets/images/help1.png";
import helpImg2 from "../../assets/images/help2.png";
import helpImg3 from "../../assets/images/help3.png";

function Help() {
    const navigate = useNavigate();
    const gotoActivities = () => { 
      navigate('/activities')
    }
    return(
        <Container fluid className="helpSection">
            <Container>
            <h2 className='text-center'>How You Can Help!</h2>
            <Row className="py-5">
                <Col lg={4}>
                    <Card>
                    <Card.Img variant="top" src={helpImg1} />
                    <Card.Body>
                        <Card.Title>Buy Our Books</Card.Title>
                        <Card.Text>
                        Our books are fantastic for your favorite little person, your neighbor's children...
                        </Card.Text>
                        <Card.Link onClick={gotoActivities}>Read More<BsArrowRight /></Card.Link>
                    </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card>
                    <Card.Img variant="top" src={helpImg2} />
                    <Card.Body>
                        <Card.Title>Pass it On</Card.Title>
                        <Card.Text>
                        An exclusive program at Hla Day is Pass it On where you can choose to pass it on yourself...
                        </Card.Text>
                        <Card.Link onClick={gotoActivities}>Read More <BsArrowRight /></Card.Link>
                    </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card>
                    <Card.Img variant="top" src={helpImg3} />
                    <Card.Body>
                        <Card.Title>Bring a Bag of Books</Card.Title>
                        <Card.Text>
                        Are you coming to Myanmar for holidays or work?  Maximize your maximum luggage limits by ...
                        </Card.Text>
                        <Card.Link onClick={gotoActivities}>Read More <BsArrowRight /></Card.Link>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className='d-flex justify-content-center pb-5'>
              <Button className="btn btn-primary downloadBtn" href="https://docs.google.com/forms/d/e/1FAIpQLSeBygpoiLCSevcgoE5kZN-LpHu-Nq3RR6mzDUgrjTAyyP7nbw/viewform" target='_blank'>
                     Book Donation Request!
                </Button>
            </div>

            {<img src={jayImg} alt={jayImg} className="bgItem4" />}
            </Container>
        </Container>
    );
}
export default Help;