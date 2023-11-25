import {Navbar , Container, Nav} from 'react-bootstrap';
import React, { useState } from 'react'
import './App.css'
import LogoImg from './assets/Navone.png'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import { Form, Route, Routes, useNavigate } from 'react-router-dom';
import NameImg from './assets/Navtwo.png';
import Review from './Components/Review';
import Profile from './Components/Profile';
import UserReview from './Components/UserReview';
import UserMovieReviews from './Components/UserMovieReviews';
import Homebutton from '../src/assets/Homebutton.png'
import ReviesImg from '../src/assets/Review.png'
import UserImg from '../src/assets/User.png'



function App () {

  const navigate = useNavigate()


  const [show, setShow] = useState([])

  const handleShow = () => {
     
  }

 
  return (
    <div style={{height:'110vh', overflow:'hidden'}}>
      <Navbar style={{borderBottom:'gray 1px solid '}}>
        <Container>
          <Navbar.Brand style={{fontSize:'1.7rem', cursor:"pointer"}} onClick={()=>navigate('/')}>
              <img
                alt=""
                src={ LogoImg }
                width="40"
                height="40"
                className="d-inline-block align-top accordion "
              />{' '}{' '}{' '}{' '}{' '}{' '}
              <img
                  alt=""
                  src={ NameImg }
                  width="200"
                  height="30"
                  className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Nav className="justify-content-end">
            <Nav.Link onClick={()=>navigate('/')}><img height={40} src={ Homebutton }/></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link onClick={()=>navigate('/user/review')}><img height={40} src={ ReviesImg }/></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link onClick={()=>navigate('/profile')}><img height={40} src={ UserImg }/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/review/:id' element={<Review/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/user/review' element={<UserReview/>}/>
          <Route path='/user/:id' element={<UserMovieReviews/>}/>
      </Routes>
       
    </div>
  )
}

export default App