import React, { useEffect, useState } from 'react'
import '../admin_css/allbookings.css'
import { useNavigate } from 'react-router-dom'

const AllBookings = () => {
    const navigate = useNavigate()


    const [bookings, setBookings] = useState([])

    const fetchBookings = async()=>{
        const response = await fetch('https://hotelhorizonserver.onrender.com/api/admin/getallbookings', {
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
                navigate('/login')
                alert(json.message)
            }
        }
        else {
            alert('Please Login')
            navigate('/login')
        }
    }

    useEffect(()=>{
        if(!sessionStorage.getItem('token')||!sessionStorage.getItem('isAdmin')){
            navigate('/')
        }
        fetchBookings()
    },[])
  return (
    <div className='all-bookings'>
    <h2>Incomplete Bookings</h2>

    <table>
        <tr>
            <th>Room Number</th>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Booked Date</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Extra Time</th>
            <th>Completed</th>
            <th>Cancelled</th>
        </tr>
        {
            bookings.map((booking)=>{
                return(
                    <tr>
                    <td>{booking.roomNo}</td>
                    <td>{booking.bookId}</td>
                    <td>{booking.UserName}</td>
                    <td>{booking.email}</td>
                    <td>{booking.bookedDate.slice(0, 10)}</td>
                    <td>{booking.from.slice(0, 10)}</td>
                    <td>{booking.to.slice(0, 10)}</td>
                    <td>{booking.extraTime}</td>
                    <td>{booking.completed.toString()}</td>
                    <td>{booking.cancelled.toString()}</td>
                </tr>
                )
            })
        }

    </table>
</div>
  )
}

export default AllBookings