import React, { useEffect, useState } from 'react'
import '../admin_css/newroom.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewRoom = () => {

  const [roomNo, setRoomNo] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [pic1, setPic1] = useState('');

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!sessionStorage.getItem('token')||!sessionStorage.getItem('isAdmin')){
      navigate('/')
    }

    const formdata = new FormData();
    formdata.append('roomNo', roomNo);
    formdata.append('roomDetails', roomDescription);
    formdata.append('Price', price);
    formdata.append('roomPictures', pic1, pic1.name);


    try {
      let url = 'https://hotelhorizonserver.onrender.com/api/room/newroom'
      let response = await axios.post(url, formdata, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': sessionStorage.getItem('token')
        }
      })
      console.log(response);
      if (response.data.success) {
        navigate('/rooms')
        alert(response.data.message)
      }
      else {
        alert(response.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    if(!sessionStorage.getItem('token')||!sessionStorage.getItem('isAdmin')){
      navigate('/');
    };
  },[])

  return (
    <div className='new-room'>
      <h2>Add New Room</h2>
      <form>
        <div>
          <label for="price">Price:</label>
          <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} class="input-field" required />
        </div>
        <div>
          <label for="roomNo">Room Number:</label>
          <input type="Number" id="roomNo" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} name="roomNo" class="input-field" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" name="description" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} class="input-field" required></textarea>
        </div>
        <div>
          <label for="image1">Image :</label>
          <input type="file" id="image1" name="image1" onChange={(e) => setPic1(e.target.files[0])} class="input-field" required />
        </div>

        <button type="submit" class="submit-button" onClick={handleSubmit}>Add Room</button>
      </form>
    </div>
  )
}

export default NewRoom