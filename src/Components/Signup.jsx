import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import LoginImg from '../assets/Logo.png';
import '../Components/Css/Signup.css';
import { useNavigate } from 'react-router-dom';
import NameImg from '../assets/name.png';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSignup = async () => {
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    console.log(userCredential)
    navigate('/')
  }).catch((err) => {
    console.log(err)
    alert(err.message)
  });
};
console.log(name)
useEffect(() => {
  // console.log(auth.currentUser)
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName: localStorage.getItem('name')
    }).then(() => {
      console.log('Display name updated successfully');
    }).catch((error) => {
      console.error('Error updating display name:', error.message);
    });
  }
}, [name]);

  return (
    <div style={{ padding: 80 }} className="signup-page">
      <Container>
        <Row>
          <Col>
            <img className="Login-img" src={LoginImg} />
          </Col>
          <Col style={{ paddingTop: 20, marginLeft: 30 }}>
            <img src={NameImg} alt="" height={70} />
            <div style={{ marginTop: 10 }}>
              <Form.Group style={{ width: '80%', marginTop: 10 }} className="mb-3" controlId="formBasicPassword">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.currentTarget.value)}
                  className="user-input"
                  value={name}
                  type="name"
                  placeholder="User Name"
                />
              </Form.Group>
              <div style={{ display: 'flex', width: '80%', flexDirection: 'row', justifyContent: 'center' }}>
                <Form.Group style={{ width: '60%' }} className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </Form.Group>

                <Form.Group style={{ width: '60%', marginLeft: '0.7em' }} className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="user-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </Form.Group>
              </div>
              <Button onClick={handleSignup} variant="primary" type="submit" className="bt-submit">
                Join The Club
              </Button>
            </div>
            <div className="member-div">
              Already A Member ? <a onClick={() => navigate('/login')}>Click Here</a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;