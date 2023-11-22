import { useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { collection, getDocs, addDoc, doc, onSnapshot } from 'firebase/firestore';
import { Button, Card } from 'react-bootstrap';
import ReadMoreButton from './ReadMoreButton';

import Deletebutton from '../assets/Deletebutton.png'
import Editbutton from '../assets/Editbutton.png'

export default function Profile() {
  const [user, setUser] = useState('');
  const [datas, setDatas] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState('');

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const name = auth.currentUser.displayName;
  console.log(typeof name)
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

      const docRef = doc(db, 'user', 'user', name);
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
    const getAllUser = async () => {
      const collectionReferece = collection(db, 'data');
      try {
        const querySnapshot = await getDocs(collectionReferece);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('All data:', data);
        setDatas(data || [2]);
        setText(data[2]?.review_texts || '');
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    getAllUser();
  }, []);

  const handleClickDeletereviews = () =>{
    console.log('delete')
  }



  return (
    <div style={{ width: '99vw', padding: 30, height:"auto", overflowY: 'scroll', scrollbarColor:'none' }}>
      <h2 className='text-md-center '>My Review</h2>
      <div>
        <Card style={{ width: '30rem', height: 'auto', display: 'flex', margin: 20, padding: 20, cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '20rem', padding: 5 }}>
              <div style={{ borderBottom: 'gray 2px solid', display: 'flex', alignItems: 'center' }}>
                <Card.Img style={{ height: 30, width: 30, borderRadius: '50%' }} src={user_profile_img} />
                <Card.Title className='d-inline-block fw-bold ' style={{ fontSize: 20, marginLeft: 25 }}>
                  {name}
                </Card.Title>
              </div>
              <Card.Text style={{ marginTop: 10 }}>User In Numbers Rating: {datas[2]?.ratings}</Card.Text>
              <div>
                {isExpanded ? (
                  <div>
                    <div>{text}</div>
                     <div style={{display:"flex", alignItems:'center', marginTop: 10}}>
                    <Button onClick={toggleReadMore}>
                      Read Less
                    </Button>
                     <Button style={{marginLeft:10}} className='two-bt'>
                      <img height={30} src={Editbutton} alt="" />
                     </Button>
                     <Button className='two-bt'>
                      <img height={30} src={Deletebutton} onClick={()=>handleClickDeletereviews()} alt="" />
                     </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      {text.slice(0, 50)}
                      {text.length > 50 && '... '}
                    </div>
                    <div style={{display:"flex", alignItems:'center'}}>
                    <Button style={{ marginTop: 10 }} onClick={toggleReadMore}>
                      Read More
                    </Button>
                     <Button style={{ marginTop: 10 ,marginLeft:10 }}  className='two-bt'>
                      <img height={30} src={Editbutton} alt="" />
                     </Button>
                     <Button style={{ marginTop: 10 ,marginLeft:10 }}  className='two-bt'>
                      <img height={30} src={Deletebutton} alt="" />
                     </Button>
                    </div>
                    
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <Card.Img width={300} height={150} src={datas[0]?.movie_data.movie_img} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}