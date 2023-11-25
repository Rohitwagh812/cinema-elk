import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { db } from '../Firebase';

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

const Fake_User_Api = 'https://randomuser.me/api/?results=12';

const user_img = 'https://picsum.photos/200/300';

const IMAGES_API = 'https://image.tmdb.org/t/p/w500';

function Review () {
  const [reviews, setReviews] = useState([]);

  const [similar, setSimilar] = useState([]);

  const [users, setUsers] = useState([]);

  const [usreRatings , setUserRatings] = useState('');
  
  const [reviewTexts, setReviewTexts] = useState('');

  const [backgroundColor, setBackgroundColor] = useState('white');

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const movie = location.state;

  useEffect(() => {
   
    if (movie.id) {
      
      const Data_Api = `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=d828e36455d8fbda95a32b87e746c932&language=en-US`;

      axios.get(Data_Api).then((rep) => {

        console.log(rep.data.results);
        
        setReviews(rep.data.results);
      });
    }
  }, [movie.id , similar.id]);


      useEffect(()=>{
        localStorage.setItem('review' , usreRatings + 1)
      })
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // onClose();
      };

  // console.log(Id)
      // useEffect(()=>{
        const getAllUsers = async()=>{
           
              const Id = Math.floor(Math.random() * 10000)

              const collectionReferece = collection(db, 'data')

              addDoc(collectionReferece , {

                review_texts : reviewTexts,

                ratings: usreRatings,

                review_id :Id ,

                movie_data : {
                 
                  movie_img : IMAGES_API + movie.poster_path,

                  movie_id : movie.id,

                }
                
              }).then(response=>{

                console.log('add data') 

              }).catch(err=>{

                console.log(err)

              })

              const userDocument = await getDocs(collectionReferece)

                  userDocument.forEach((user) => { 

                    console.log(user.id , '=>' , user.data())

                  })
            }

            const handleClick = () =>{

              getAllUsers()

            }

  
  useEffect(() => {
    if (movie.id) {
      const Data_Api = `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=d828e36455d8fbda95a32b87e746c932&language=en-US&page=2%27`;

      axios.get(Data_Api).then((rep) => {

        setSimilar(rep.data.results);

      });
      similar.map((data)=>{

        console.log(data)

      })
    }
  }, [movie.id]);
  
  useEffect(() => {
    axios.get(Fake_User_Api).then((rep) => {

      setUsers(rep.data.results);

    });
  }, []);
 

  const handleButtonClick = () => {
    
    setShowForm(true);

    setBackgroundColor('rgba(0, 0, 0, 0.763)');
    
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setBackgroundColor('white');
  };
  return (
    <div style={{backgroundColor}}>
      
    <div className='review-page' style={{ width: '100vw', height: '98vh', overflowY: 'scroll', scrollbarColor:'none', padding: 20 }}>
      <Container>
        <Row>
          <Col>
            <div className='r' style={{ padding: 10, display: 'flex', justifyContent: 'center', borderRight: '1px solid black', width: '40vw', height: 'auto' }}>
              <div>
                <img src={IMAGES_API + movie.poster_path} height={300} width={350} alt="" />
                <h4 style={{ marginTop: 10, fontWeight: 'bold' }}>{movie.title}</h4>
                <h5 style={{ marginTop: 10, fontWeight: 'bold' }}>Movie Overview</h5>
                <p style={{ marginTop: 10 }}> {movie.overview}</p>
                <div>
                  {
                    showForm ? (
                      <div onClose={handleCloseForm} className='form-page-main-div' style={{ padding:20}}>
                      <div className="form-page">
                        <Form onSubmit={handleSubmit}> 
                          <Form.Group style={{borderBottom:'2px solid black'}} className="mb-3" controlId="formReview">
                            <Form.Control style={{border:'none', height:'15vh', padding:20, outline:'none'}} 
                              rows={3}
                              as="textarea"
                              placeholder="Enter your  Review Here"
                              onChange={(e) => setReviewTexts(e.target.value)}
                            />
                          </Form.Group>
                          <div style={{margin:20, display:'flex', alignItems:'center'}}> Rating 
                          <Form.Control className='form-page-input y'  style={{ marginLeft:7, marginRight:7 , width:30, borderBottom:'2px solid black', padding:2 , textAlign:'center', borderRadius:'0px'}}
                              rows={3}
                              value={usreRatings}
                              onChange={(e) => setUserRatings(e.currentTarget.value)}
                            /> Out Of 5 </div>
                          <Button variant="primary" type="submit"  onClick={()=>{handleClick()
                            handleCloseForm() 
                          }}>
                            Submit Review
                          </Button>
                        </Form>
                      </div>
                </div>
                    ): (
                      <Button className='post-bt' onClick={handleButtonClick}>Post Review</Button>
                    )
                  }
              </div>
                <h5 style={{ marginTop: 10, fontWeight: 'bold' }}>Cast & crew</h5>
                <div className="cast" style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap' }}>
                  {users.map((user, index) => (
                    <div style={{ marginTop: 10 }} key={index}>
                      <img style={{ borderRadius: '50%', margin: 10 }} src={user.picture.large} height={50} width={50} alt="" />
                      <h6 style={{ textAlign: 'center' }}>{user.name.first}</h6>
                    </div>
                  ))}
                </div>
                <h5 className="bold">Similar Movies</h5>
                <div style={{ marginTop: 10, fontWeight: 'bold', display: 'flex', flexWrap: 'wrap' }}>
                  {similar.map((movie, index) => (
                    <div key={index}>
                      <Card
                        onClick={() => navigate('/review/' + movie.id, { state: movie })}
                        key={movie.id}
                        style={{ height: 'auto', width: '6rem', overflow: 'hidden', cursor: 'pointer', marginLeft: 10 }}
                        className="card-movies"
                      >
                        <Card.Img style={{ height: 140 }} variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        <Card.Body>
                          <Card.Title style={{ fontSize: 15 }}>{movie.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '44vw' }}>
              <div>
                <h4 style={{ textAlign: 'center' }} className="bold">
                  Reviews By Cinema ELK Users
                </h4>
              </div>
              <div style={{ marginTop: 20 }}>
                {reviews.length === 0 ? (
                  <div style={{ textAlign: 'center', marginTop: 50 }}>
                    <h5>This Movie Review Not Available</h5>
                  </div>
                ) :(
                  reviews.map((review, index) => (
                    <div style={{ borderBottom: 'gray 1px solid' }} key={index}>
                      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center' }}>
                        <img height={40} width={40} style={{ borderRadius: '50%' }} src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}` } alt="" />
                        <h5 style={{ marginLeft: 20 }} className="bold ">
                          {review.author}
                        </h5>
                      </div>
                      <p style={{ marginTop: 10, textAlign: 'justify' }}>{review.content}</p>
                      <h6 style={{ fontWeight: 'normal', marginRight: -10 }}>Rating : {review.author_details.rating}</h6>
                    </div>
                  ))
                )}
              </div>
            </div> 
          </Col>
        </Row>
      </Container>
      <div> 
      </div>
    </div>
    </div>
  );
};

export default Review;