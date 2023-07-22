import React, { useEffect, useState } from 'react'
import './css_files/rooms.css'
import { Link } from 'react-router-dom'



const Rooms = () => {

  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const response = await fetch('https://hotelhorizonserver.onrender.com/api/room/allrooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (json.success) {
      setRooms(json.message)
    }
    else {
      alert(json.message)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])


  return (
    <div className="rooms-container">
      <h2>Our Rooms</h2>
      {
        rooms.length==0?<><h3 style={{color:'red'}}>No Rooms</h3></>:
        rooms.map((element) => {
          return (
            <>
              <div className="room-card" key={element._id}>
                <img src={`https://hotelhorizonserver.onrender.com/public/${element.roomPictures}`} alt="Room 1" />
                <h3>Room {element.roomNo}</h3>
                <p className="price">${element.Price} per night stay</p>
                <p className="description">{element.roomDetails}</p>
                {
                  element.isBooked ?

                    <><p className="booking-status">Status: <span className="booked">Booked</span></p>
                      <Link to={`/room/${element.roomNo}`} className="book-now-btn btn-booked">View Details</Link></> :

                    <><p className="booking-status">Status: <span className="not-booked">Not Booked</span></p>
                      <Link to={`/room/${element.roomNo}`} className="book-now-btn">View Details</Link></>
                }
              </div>
            </>
          )
        })
      }
   </div>
  )
}

export default Rooms