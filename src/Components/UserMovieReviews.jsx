import React from 'react';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ReadMoreButton from './ReadMoreButton';

function UserMovieReviews() {;
  const location = useLocation();
  const item = location.state;
  const title = item.original_name;
  const img = item.profile_path;
  console.log(img); 
  const knownFor = item.known_for || [];
  
  console.log(knownFor[2].original_title);

  return (
    <div style={{ width: '100vw', padding: 20, height: '100vh', overflowY: 'scroll' }}>
      <h4 style={{ textAlign: 'center', marginRight: 150 }} className='bold'>
        Reviews Given By {item.name}
      </h4>
      <div style={{display:'flex', flexWrap:"wrap"}}>
      {knownFor.map((movie, index) => {
        return (
            <div key={index}>
               
               <Card style={{width:"30rem", height:"auto", display:'flex', margin:20, padding:20, cursor:'pointer'}}>
                         <div style={{display:'flex', flexWrap:"wrap"}}>
                         <div style={{width:'20rem', padding:5}}>
                          <div style={{borderBottom:'gray 2px solid'}}>
                            <Card.Img  className='d-inline-block' style={{width:30, height:30, borderRadius:"50%"}} src={`https://image.tmdb.org/t/p/w500${img}`} />
                            <Card.Title  className='d-inline-block' style={{fontSize:20, marginLeft:25}}>{title}</Card.Title>
                          </div>
                            <Card.Text style={{marginTop:10}}>User In Numbars Rating : {movie.vote_average}</Card.Text>
                           <ReadMoreButton text={movie.overview} maxLength={50}/>
                        </div> 
                        <div style={{display:'flex'}}>
                          <Card.Img width={300} height={150} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        </div>
                         </div>
                         
                    </Card>
            </div>
        );
      })}
      </div>
    </div>
  );
}

export default UserMovieReviews;