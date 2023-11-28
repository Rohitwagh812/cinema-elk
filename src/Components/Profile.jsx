import { deleteDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { collection, getDocs, addDoc, doc, onSnapshot } from 'firebase/firestore';
import { Button, Card } from 'react-bootstrap';
import ReadMoreButton from './ReadMoreButton';

import Deletebutton from '../assets/Deletebutton.png'
import Editbutton from '../assets/Editbutton.png'

import 'ldrs/dotPulse'

// Default values shown  


export default function Profile() {
  const [user, setUser] = useState([]);
  const [datas, setDatas] = useState([]);
  const [reviewsId, setReviewsId] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
 
  const name = localStorage.getItem('user_name');
  // console.log(name)
  const user_profile_img = 'https://picsum.photos/200/300';

  useEffect(() => {
    const getAllUsers = async () => {
      const collectionReferece = collection(db, 'user', 'user');
      try {
        const docRef = await addDoc(collectionReferece, {
          user_name: name,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }

      const docRef = doc(db, 'user', 'user');
      try {
        const docSnap = await getDocs(docRef);
        console.log(docSnap.id, '=>', docSnap.data());
        setUser(docSnap.data());
        
      } catch (error) {
        console.error('Error getting document: ', error);
      }
    };

    getAllUsers();
  }, [name]);

  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'data'), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('All data:', data);
    setDatas(data);
  });

  return () => unsubscribe();
  },[]);

  // useEffect(()=>{
  //   datas.map((d) => {
  //     setReviewsId(d.id)
  //     console.log(d.id)
  //   })
  // },[])

  
  const handleClickDelete = async (id) => {
    console.log('reviewsId:', id);
    if (id) {
      console.log('code working');
      await deleteDoc(doc(db, 'data', id));
      setDatas((prevData) => prevData.filter((item) => item.id !==id));
    } else {
      console.log('code not working');
    }
  
  }

  // const editbutton =  async () => {
  //    alert('hello')
  // }

  const handleClickEdit = async (id) => {
    console.log('hello' , id);
    alert('this movie reaview id form user'+' '+' '+ id)
  
    // const newData = {
      
    // };
  
    // if (id) {
    //   try {
    //     // Update the document instead of deleting it
    //     await updateDoc(doc(db, 'data', id), newData);
    //     setDatas((prevData) =>
    //       prevData.map((item) => (item.id === id ? { ...item, ...newData } : item))
    //     );
    //     console.log('Document updated successfully');
    //   } catch (error) {
    //     console.error('Error updating document: ', error);
    //   }
    // } else {
    //   console.log('Invalid ID for editing');
    // }
  };
 

  return (
    <div style={{ width: '99vw', padding: 30, height: '100vh', overflowY: 'scroll' }}>
        <h2 className='text-md-center'>My Review</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
        datas.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 50, fontWeight:"bold", width:'100vw' }}>
            <h4>Please Add Your Review</h4>
            <l-dot-pulse style={{marginTop:50}}   size="90" speed="1.3" color="black"  ></l-dot-pulse>
          </div>
        ) :(
         datas.map((d, index) => {
          return(
            
               <Card className='user-page' style={{ width: '30rem', height: 'auto', display: 'flex', margin: 20, padding: 10, cursor: 'pointer', overflow:'hidden' }}key={index}>
               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '20rem', padding: 5 }}>
              <div style={{ borderBottom: 'gray 2px solid', display: 'flex', alignItems: 'center' }}>
                <Card.Img style={{ height: 30, width: 30, borderRadius: '50%' }} src={user_profile_img} />
                <Card.Title className='d-inline-block fw-bold ' style={{ fontSize: 20, marginLeft: 25 }}>
                  {name}
                </Card.Title>
              </div>
              
              <Card.Text style={{ marginTop: 10 }}>User In Numbers Rating: {d.ratings}</Card.Text>
              <div>
              <Card.Text>
                {d.review_texts.length > 10 ? (
                  <div style={{display:'flex',alignItems:'center'}}>
                    <ReadMoreButton style={{width:40 , overflow:''}}  text={d.review_texts} maxLength={20} />
                    <div style={{display:"flex", alignItems:'center', marginTop: 40}}>
                     <Button onClick={()=> editbutton()} style={{marginLeft:10}} className='two-bt'>
                      <img height={30} src={Editbutton} alt="" />
                     </Button>
                     <Button  onClick={()=>handleClickDelete(d.id)} className='two-bt'>
                      <img height={30} src={Deletebutton}  alt="" />
                     </Button>
                    </div>
                    
                  
                  </div>
                ) : (
                  <div style={{display:'flex',alignItems:'center'}}>
                    <ReadMoreButton  style={{width:40}} text={d.review_texts} maxLength={50} />
                  <div style={{display:"flex", alignItems:'center', marginTop: 10}}>
                     <Button  style={{marginLeft:10 ,marginTop:16}} className='two-bt'>
                      <img height={30} onClick={()=>handleClickEdit(d.id)} src={Editbutton} alt="" />
                     </Button>
                     <Button onClick={()=>handleClickDelete(d.id)}  style={{marginTop:16}} className='two-bt'>
                      <img height={30} src={Deletebutton}alt="" />
                     </Button>
                    </div>
                  </div>
                )}
              </Card.Text>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <Card.Img width={300} height={150} src={d.movie_data.movie_img} />
            </div>
          </div>
              </Card>
           
           ) 
      })   )
      }
      </div>
</div>
  );
}