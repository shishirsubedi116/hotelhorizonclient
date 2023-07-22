import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../admin_css/bookedrooms.css'
import { useNavigate } from 'react-router-dom'


const BookedRooms = () => {
  const navigate = useNavigate()


  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    const response = await fetch('https://hotelhorizonserver.onrender.com/api/admin/getroomdetails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': sessionStorage.getItem('token')
      }
    })
    const json = await response.json()
    if (sessionStorage.getItem('token') && sessionStorage.getItem('isAdmin')) {
      if (json.success) {
        setBookings(json.message)
      }
      else {
        alert(json.message)
        navigate('/login')
      }
    }
    else {
      alert('Please Login')
      navigate('/login')
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('isAdmin')) {
      navigate('/')
    }
    fetchBookings()
  }, [])


  return (
    <div className='booked-rooms'>
      <h2>Booked Rooms</h2>
      <ul className='admin-ul'>
        {
          bookings.map((elem) => {
            return (
              <li><Link className='booked-links' to={`/room/${elem.roomNo}`}>Room: {elem.roomNo}</Link></li>

            )
          })
        }
      </ul>
    </div>
  )
}

export default BookedRooms