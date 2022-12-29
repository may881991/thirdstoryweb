import React, { useEffect, useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithGoogle, getUserData} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container , Form, Button, Row, Col} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Loading from '../Loading/Loading';
import './Login.css';
import logo from "./../../assets/images/Logo.png";
import logInImg1 from "./../../assets/images/SweZin1.png";
import googleImg from "./../../assets/images/google-icon.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, error] = useAuthState(auth);
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null); 
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
        getUserData(user).then((user) => {
          if(user !== null){ 
            user.forEach((ele) => {
              var userData = ele.data();  
              setUserData(userData)
              navigate("/dashboard");
            });
          }
       }).catch((err) => console.log(err)); 
      }, [user, error]);

    return (
        <>
        {loading === false ? (
        <Container fluid>
            <Container fluid className="paddingZero">
                <Row>
                    <Col className="loginBg">
                        <img alt={logo} src={logo} className="logo"/>
                        <img alt={logInImg1} src={logInImg1}/>
                        <Button variant="light" type="submit" onClick={signInWithGoogle} className="position-absolute">
                            <img alt={googleImg} src={googleImg}/> Sign In with Google
                        </Button>
                    </Col>
                    <Col className='d-flex'>
                        <div id='loginForm' className='col-md-8 m-auto p-3 align-items-center login'>
                            <div className="text-center">
                                <h3>Log In</h3>
                                <label>Login with your eamil and password.</label>
                            </div>
                            <Form.Group className="m-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="m-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="primary" type="submit" className='loginBtn' onClick={() => signInWithEmailAndPassword(auth, email, password)}>
                                    Log in
                                </Button>
                                <p className='py-5 signUpText'>Don’t have an account? <Link to="/signup">Sign up Here!</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
        </Container>
    </Container> 
    ) : (
        <Loading />
    )}
    </>
    );
}

