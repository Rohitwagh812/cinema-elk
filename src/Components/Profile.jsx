import { useState } from 'react'

import React, { useEffect } from 'react'

import { auth, db } from '../Firebase'

import { collection, getDocs , addDoc, setDoc, getDoc, doc } from 'firebase/firestore'
import { Card } from 'react-bootstrap'
import ReadMoreButton from './ReadMoreButton'


export default function Profile() {

  const [user , setUser] = useState('')

  const [datas , setDatas] = useState('')

  console.log(auth.currentUser.displayName)

  const name = auth.currentUser.displayName

  useEffect(()=>{

    const getAllUsers = async()=>{

          const collectionReferece = doc(db, 'user' , 'user')

          setDoc(collectionReferece , { 

             user_name : name,

          }).then(response=>{

            console.log('add data')

          }).catch(err=>{

            console.log(err)

          }) 

          getDoc(collectionReferece).then((doc) => {

                  console.log(doc.id , '=>' , doc.data())

                  if(name == doc.data().user_name){

                    console.log('loginn done', '' + '' , doc.data().user_name)

                    setUser(doc.data())

                  }else{ 

                    console.log('error')

                  }
                }) 
        }

        getAllUsers()
        })


        useEffect(()=>{
          const getAllUser = async()=>{

                const collectionReferece = collection(db, 'data')

              //   const userDocument = await getDocs(collectionReferece)
              //   userDocument.forEach((user) => { 
              //     console.log(user.data())
              //     setDatas(user.data())
              //   })




              try {
                const querySnapshot = await getDocs(collectionReferece);
                const data = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                console.log('All data:', data);
                return data;
              } catch (error) {
                console.error('Error getting documents:', error);
              }
            }

              getAllUser()
        
        })



  return (
    <div style={{width:'97vw', padding:30}}>
        <h2 className='text-md-center '>
           My Review
        </h2>
        <div>
          <Card style={{width:"30rem", height:"auto", display:'flex', margin:20, padding:20, cursor:'pointer'}}>
            <div style={{display:'flex', flexWrap:"wrap"}}>
              <div style={{width:'20rem', padding:5}}>
                  <div style={{borderBottom:'gray 2px solid'}}>
                    {/* <Card.Img  className='d-inline-block' style={{width:30, height:30, borderRadius:"50%"}} src={} /> */}
                    <Card.Title  className='d-inline-block fw-bold ' style={{fontSize:20, marginLeft:25}}>{user.user_name}</Card.Title>
                  </div>
                    <Card.Text style={{marginTop:10}}>User In Numbars Rating : {datas.ratings}</Card.Text>
                  <ReadMoreButton text={datas.review_texts} maxLength={8}/>
              </div> 
              <div style={{display:'flex'}}>
                <Card.Img width={300} height={150} src={datas.movie_data.movie_img} />

              </div>
            </div>
                          
          </Card>
        </div>
    </div>
  )
}
