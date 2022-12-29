import React, { Component  } from 'react';
import { Container, Row, Col, Button, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { logout, getUserData } from "../../firebase";
import { BsChevronLeft, BsChevronRight , BsArrowDownShort} from "react-icons/bs";
import logo from "../../assets/images/Logo.png";
import maskLogo from "../../assets/images/happyland.png";
import profileImg from "../../assets/images/user.png";
import "./Reader.css";
import Loading from '../Loading/Loading';

export default class ReaderView extends Component {
    state = { numPages: null, pageNumber: 0 , loading : true, userBookLists : [], userInfo : null, bookstatus : false, bookInfo: null};

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	};

    componentDidMount(){ 
        let userData = localStorage.getItem('user');
        userData = JSON.parse(userData); 
        let bookInfolocal = localStorage.getItem('bookData');
        bookInfolocal = JSON.parse(bookInfolocal);  
        this.setState({ bookInfo: bookInfolocal});
        console.log(userData)
        if(userData !== null){
            this.setState({ userInfo: userData}) 
            getUserData(userData).then((user) => {
                user.forEach((ele) => {
                  var userData = ele.data(); 
                  this.setState({ userBookLists: userData});
                  let userbookData = userData.shopLists;
                  console.log(userData.shopLists)
                  if(userbookData !== undefined){ 
                      userbookData.map((book) => { 
                          if(bookInfolocal.title === book.title){
                              this.setState({ bookstatus: true});
                          } 
                      }); 
                  }  
                  this.setState({ loading: false});
                });
            }).catch((err) => console.log(err));   
        }else{
            setTimeout(() => this.setState({ loading: false}), 500);
        }
        console.log(this.state.bookstatus)
    };

	goToPrevPage = () =>
		this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
	goToNextPage = () => {
		this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));
        console.log(this.state.pageNumber)
        if(this.state.pageNumber > 3){
            console.log(this.state.pageNumber)
        }
    }
    
    render() {
        const { pageNumber, numPages, loading, userBookLists, userInfo, bookstatus, bookInfo } = this.state;  
        console.log(bookstatus)
        console.log(bookInfo)
        return(
            <>
            {loading === false ? (
                <Container fluid className='Reader paddingZero'>
                    <nav className='d-flex justify-content-center pt-3'>
                        <img alt={logo} src={logo} className="logo"/>
                    </nav>
                    <Row className='py-5'>
                        <Col md={10} className="offset-md-1">
                            <Row>
                                <Col>
                                    <Link to="/bookDetails"><button className="backBtn"><BsChevronLeft/></button></Link> <label className='booktitle'> {bookInfo.title} </label>
                                </Col>
                                <Col className='text-center'>
                                {bookstatus === true && (
                                    <Button className="btn btn-primary downloadBtn" href={bookInfo.bookUrl} download target='_blank'>
                                            Download <BsArrowDownShort/>
                                    </Button> 
                                 )}
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <img alt={profileImg} src={profileImg}/>
                                        {userInfo !== null ? (
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    <label className='name'>{userBookLists.name}</label> 
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {/* <Dropdown.Item href="#">Account Details</Dropdown.Item> */}
                                                    <Dropdown.Item href="#" onClick={logout}>Log Out</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ) : (
                                            <label className='name'></label>
                                        )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='align-items-center readerView'>
                        <Col md={1} className="arrow">
                            <BsChevronLeft onClick={this.goToPrevPage}/>
                        </Col>
                        <Col md={10}>
                            <Document file={bookInfo.bookUrl} onLoadSuccess={this.onDocumentLoadSuccess} width={500}>
                                <Page pageNumber={pageNumber+1} />
                                {pageNumber > 4 ? (
                                    <div className='overlay'> <img alt={maskLogo} src={maskLogo}/></div> ) : (
                                    <div className='overlay d-none'> <img alt={maskLogo} src={maskLogo}/></div> 
                                )}
                            </Document>
                        </Col>
                        <Col md={1} className="arrow">
                            <BsChevronRight onClick={this.goToNextPage}/>
                        </Col>
                    </Row>

                    <p className='pageNum'>
                        Page {pageNumber+1} of {numPages}
                    </p>
                </Container>
            ) : (
                <Loading />
            )}
            </>
        );
	}
}