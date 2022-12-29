import React, { useState, useEffect } from 'react';
import './Activities.css';
import { getActivityData } from '../../firebase.js';
import NavBar from "../Nav/NavBar";
import Card from "../Card/Card";
import Loading from '../Loading/Loading';
import { Container, Row, Col , ListGroup } from "react-bootstrap";
import Footer from '../Footer/Footer';
import treeImg from "../../assets/images/tree.png";
import py1 from "../../assets/images/py1.png";

function Activities(){
    const [loading, setLoading] = useState(true)
    let [data , setData] = useState([]);
    useEffect(() => {
        getActivityData().then((lists) => {
          lists.forEach((ele) => {
            var data = ele.data();
            setData(arr => [...arr , data]);
            setTimeout(() => setLoading(false), 500)
          });
        }).catch(() => setLoading(false));
    }, [])
    return(
      <>
      {loading === false ? (
        <Container fluid className='sidebarBg'>
            <NavBar bg="light"/>
            <Container fluid className='banner'>
                <Row>
                    <Col md={2} className="py-3">
                    {<img src={treeImg} alt={treeImg} className="bannerImg1 img-fluid"/> }
                    </Col>
                    <Col md={8} className="text-center bannerText">
                    <h2>Our Activities</h2>
                    <p className='px-5'>The Third Story Project offers a variety of trainings for different groups. Working with the Myanmar Storytellers and other talented professionals, we help people understand the power of storytelling.</p>
                    </Col>
                    <Col md={2}>
                    {<img src={py1} alt={py1} className="bannerImg3 img-fluid"/> }
                    </Col>
                </Row>
            </Container>
            <Container className='activitiesLists'>
              <Row>
                <Col md={2}>
                  <h5>Categories</h5>
                  <hr/>
                  <ListGroup>
                    <ListGroup.Item>Our Attivities</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={10} className="row">
                  {data.map((card, i) => {
                      return (
                        <Card
                          key={i}
                          bookCover={card.image}
                          title={card.title}
                          desc={card.description}
                          date={card.date}
                        />
                      );
                    })}
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

export default Activities;