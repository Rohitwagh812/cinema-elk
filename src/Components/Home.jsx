import { useState } from 'react';
import React, { useEffect } from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import './Css/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Top_Rated = 'https://api.themoviedb.org/3/discover/movie?api_key=d828e36455d8fbda95a32b87e746c932&language=en-US&page=1'

const Now_Playing = 'https://api.themoviedb.org/3/movie/now_playing?api_key=d828e36455d8fbda95a32b87e746c932&language=en-US&page=2%27'

const Popular_Movies = 'https://api.themoviedb.org/3/movie/popular?api_key=d828e36455d8fbda95a32b87e746c932&language=en-US&page=2%27'

const Upcoming_Movies = 'https://api.themoviedb.org/3/movie/upcoming?api_key=d828e36455d8fbda95a32b87e746c932&language=en-US&page=2%27'

function Home() {
  const [rated , setRateds] = useState([])
  const [playing , setPlayings] = useState([])
  const [populars , setPopulars] = useState([])
  const [upcoming , setUpcomings] = useState([])
  const navigate  = useNavigate()

  useEffect(()=>{
    axios.get(Top_Rated).then((res)=>{
      console.log(res.data)
      setRateds(res.data.results)
     })
     
     
     axios.get(Now_Playing).then((res)=>{
      console.log(res,'now playing')
      setPlayings(res.data.results)
     })
     
     
     axios.get(Popular_Movies).then((res)=>{
      console.log(res.data.results)
      setPopulars(res.data.results)
     })
     
     axios.get(Upcoming_Movies).then((res)=>{
      console.log(res.data.results)
      setUpcomings(res.data.results)
     })
  },[])

 

  

  return (
    <div className='home-page'>
        <Row>
          <Col className='col-two' style={{padding:30 , overflowY:'scroll' , height:'100vh'}}>
              <div>
              <h3 style={{marginBottom:20}}>
                  Now Playing Movies
                </h3>
                
                <div style={{width:'97vw' , display:'flex' , overflowX:'scroll'}}>
                   {
                     playing.map((movie , index)=>{
                      return(
                        <div key={index}>
                          <Card onClick={()=> navigate('/review/' +  movie.id  , {state : movie})} key={movie.id} style={{height:'auto', width:"8rem", overflow:'hidden',  cursor:'pointer', marginLeft:10}} className='card-movies-one'>
                            <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card>
                        </div>
                      )
                     })
                   }
                </div>
              </div>
              <div>
              <h3 style={{marginBottom:20, marginTop:20}}>
                  Popular Movies
                </h3>
                <div style={{width:'97vw', display:'flex',overflowX:'scroll'}}>
                   {
                     populars.map((movie , index)=>{
                      return(
                        <Col key={index}>
                          
                            {/* <Carousel> */}
                              <Card onClick={()=> navigate('/review/' +  movie.id  , {state : movie})} style={{ width:"8rem", height:'auto', marginLeft:10, overflow:'hidden',  cursor:'pointer'}} className='card-movies-one'>
                              <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                      )
                     })
                   }
                </div>
              </div>
              <div>
              <h3 style={{marginBottom:20, marginTop:20}}>
                  Top Rated Movies
                </h3>
                <div style={{width:'97vw', display:'flex',overflowX:'scroll'}}>
                   {
                     rated.map((movie , index)=>{
                      return(
                        <Col key={index}>
                              <Card onClick={()=>navigate('/review/' +  movie.id  , {state : movie})} style={{height:'auto', marginLeft:10, width:"8rem", overflow:'hidden',  cursor:'pointer'}} className='card-movies-one'>
                              <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                      )
                     })
                   }
                </div>
              </div>
              <div>
              <h3 style={{marginBottom:20, marginTop:20}}>
                  Upcoming Movies
                </h3>
                <div style={{width:'97vw', display:'flex',overflowX:'scroll'}}>
                   {
                     upcoming.map((movie , index)=>{
                      return(
                        <Col key={index}>
                              <Card onClick={()=> navigate('/review/' +  movie.id  , {state : movie})} style={{height:'auto', width:"8rem", overflow:'hidden',  cursor:'pointer',marginLeft:10}} className='card-movies-one'>
                              <Card.Img style={{height:140}} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                              <Card.Title style={{fontSize:15}}>{movie.title}</Card.Title>
                            </Card.Body>
                            </Card> 
                        </Col>
                      )
                     })
                   }
                </div>
              </div>
          </Col>
        </Row>
     {/* </Container> */}
    </div>
  )
}

export default Home