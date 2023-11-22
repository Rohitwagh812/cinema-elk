import { useEffect, useState } from 'react'
import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import LoginImg from '../assets/Logo.png'
import '../Components/Css/Signup.css'
import { useNavigate } from 'react-router-dom'
import NameImg from '../assets/name.png'

import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred.user)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        navigate('/register')
      });
  }


  useEffect(()=>{
    console.log(auth.currentUser)
  })

  return (
    <div style={{ padding: 80 }} className='signup-page'>
      <Container>
        <Row>
          <Col>
            <img className='Login-img' src={LoginImg} />
          </Col>
          <Col style={{ paddingTop: 20, marginLeft: 30 }}>
            <img src={NameImg} alt="" height={70} />
            <Form style={{ marginTop: 10 }}>
              <div style={{ display: "flex", width: '80%', flexDirection: 'row', justifyContent: 'center' }}>
                <Form.Group style={{ width: '60%' }} className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control onChange={(e) => setEmail(e.currentTarget.value)} className='user-input' type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group style={{ width: '60%', marginLeft: '0.7em' }} className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(e) => setPassword(e.currentTarget.value)} className='user-input' type="password" placeholder="Password" />
                </Form.Group>
              </div>
              <Button onClick={() => handleLogin()} variant="primary" type="submit" className='bt-submit'>
                Login Now
              </Button>
            </Form>
            <div className='member-div'>
              Join The Club , <a onClick={() => navigate('/signup')}>Click Here</a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
