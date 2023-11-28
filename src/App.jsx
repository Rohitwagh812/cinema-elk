import {Navbar , Container, Nav, Button} from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
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
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase';



function App () {

  const navigate = useNavigate()

  // useEffect(()=>{
   
    
     
  // },[])
  const users = auth.currentUser

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
        // console.log('User is logged in');
      } else {
        navigate('/login');
        // console.log('User is logged out');
      }
    });
  
    return () => unsubscribe();
  }, []);

 const name = localStorage.getItem('name')
//  console.log(name)

 const handleLogout = () => {
  signOut(auth).then(() => {
      console.log('Logout successful');
    }).catch((error) => {
      console.error('Logout error:', error.message);
    });
};
 
  return (
    <div style={{height:'100vh', overflow:'hidden'}}>
     {
      users && <Navbar style={{borderBottom:'gray 1px solid '}}>
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
          <Nav style={{display:"flex", alignItems:"center"}}>
          <Nav.Link onClick={()=>navigate('/')}><img height={40} src={ Homebutton }/></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link onClick={()=>navigate('/user/review')}><img height={40} src={ ReviesImg }/></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <Nav.Link onClick={()=>navigate('/profile/'+ name)}><img height={40} src={ UserImg }/></Nav.Link>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <Button style={{width:150}} onClick={handleLogout}>LogOut</Button>
        </Nav>
       
      </Container>
    </Navbar>
     }
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/review/:id' element={<Review/>}/>
          <Route path='/profile/:name' element={<Profile/>}/>
          <Route path='/user/review' element={<UserReview/>}/>
          <Route path='/user/:id' element={<UserMovieReviews/>}/>
      </Routes>
       
    </div>
  )
}

export default App