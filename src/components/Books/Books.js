import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookData } from '../../firebase.js';
import './Books.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsBook} from "react-icons/bs";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Books = () => {
  const navigate = useNavigate();
  const { isLoading, bookdata } = GetBookLists();

  const bookLists = () => {  
    navigate('/stories')
  }

  if (isLoading === true) {
    let itemLeng = [ 1, 2, 3, 4, 5, 6];
    return(
      <Container fluid className="ourBooks paddingZero">
        <Container className='bookLists py-5'>
          <Row>
            {itemLeng.map((item) => (
                <Col md={2} className="px-2 ml-5" key={item}>
                      <div className="card__image loading"></div>
                      <div className="card__title loading"></div>
                </Col>
              ))
            }
          </Row>
        </Container>
        <Container className='bookLists py-5'>
          <Row>
            {itemLeng.map((item) => (
                  <Col md={2} className="px-2 ml-5" key={item}>
                        <div className="card__image loading"></div>
                        <div className="card__title loading"></div>
                  </Col>
                ))
              }
          </Row>
        </Container>
      </Container>
    )
  }else{
    localStorage.setItem('bookLists' , JSON.stringify(bookdata));
    const groupBylanguage = bookdata.reduce((group, value) => {
      const { language } = value;
      group[language] = group[language] ?? [];
      group[language].push(value);
      return group;
    }, {});

    return (
      <Container fluid className="ourBooks paddingZero">
          {Object.entries(groupBylanguage).map(([item,value])=> (
            <Container className='bookLists pt-3' key={item}>
              <h4>{item}</h4>
              {value.length <= 5 ? (
                  <Row className='bookItem'> 
                      {value.map((data) => ( 
                          <BookFrame key={data.ISBN} bookInfo={data}/> 
                       )) }
                  </Row>
                ) : (
                <OwlCarousel className='owl-theme' items={5} loop margin={10} nav>
                  {value.map((data) => (
                        <BookFrame key={data.ISBN} bookInfo={data}/>
                      ))
                   }
                </OwlCarousel>
              )}
            </Container>
          ))}
          <Container className="d-flex justify-content-center pb-5">
              <Button className='btn btn-primary' onClick={bookLists}> <BsBook /> See All Books</Button>
          </Container>
        </Container>
    );
  }
}

// getBookLists
function GetBookLists() {
  const [isLoading, setIsLoading] = useState(false);
  let [bookdata , setData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    var checkBookLists = localStorage.getItem('bookLists');
    if(checkBookLists.length > 2){  
      setData(JSON.parse(checkBookLists));
      setIsLoading(false);
    }else{
      console.log("else")
      getBookData().then((lists) => {
        lists.forEach((ele) => {
          var data = ele.data();
          setData(arr => [...arr , data]);
          setIsLoading(false);
        });
      }).catch(() => setIsLoading(false));
    }
  }, []);

  return { isLoading, bookdata };
}

const BookFrame = ({bookInfo}) => {
  //console.log(bookInfo)

  const navigate = useNavigate();
  const bookView = () => {  
    localStorage.setItem("bookData",JSON.stringify(bookInfo));
    navigate('/bookDetails')
  }

  return (
      <div className="item" onClick={bookView}>
        <img className="d-block" src={bookInfo.bookCover} alt={bookInfo.bookCover}/>
        <label>{bookInfo.title}</label>
      </div>
  );
}

export default Books;