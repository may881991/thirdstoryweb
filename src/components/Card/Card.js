import React from 'react';
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";
import "./Card.css";


function Cardlayout(props){
 
  const checkAuthor = props.author;
  const navigate = useNavigate();

  let addIcon,buyNow;

  function addToCart(){
    
  }
  function bookView(){
    localStorage.setItem("bookData",JSON.stringify(props));
    navigate('/bookDetails')
  }

  if(checkAuthor === undefined){
    addIcon =  null;
    buyNow =  null;
    return (
      <Card className="col-md-4">
        <Card.Body className="">
          <Card.Img variant="top" src={props.bookCover} />
          <Card.Title className="">
            {props.title}
            <span className="age-group">{props.price}</span>
          </Card.Title>
          <Card.Text>
          {props.desc}
          <label className='dateText'>{props.date}</label>
          </Card.Text>
          <Card.Link href="#">{props.author}</Card.Link>
        </Card.Body>
        {buyNow}
      </Card>
    );
  }else{
    addIcon =  <BsCart3 />;
    buyNow = <Button className="buyBtn" variant="outline-primary"> Buy Now! </Button>;
    return (
      <Card className="col-md-4" onClick={bookView}>
        <Card.Body className="">
          <Card.Img variant="top" src={props.bookCover} />
          <Card.Title className="">
            {props.title}
            <span className="age-group">{props.price}</span>
          </Card.Title>
          <Card.Link href="#">{props.author}</Card.Link>
          <Card.Link href="#" onClick={addToCart} className='float-end'>{addIcon}</Card.Link>
        </Card.Body>
        {buyNow}
      </Card>
    );
  }
}

export default Cardlayout;
