import React, { useEffect } from 'react'
import '../admin_css/mainadmin.css'
import { Link, useNavigate } from 'react-router-dom'

const MainAdmin = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!sessionStorage.getItem('isAdmin') || !sessionStorage.getItem('token')){
            navigate('/login')
        }
    },[])
    return (
        <div className='main-admin'>
            <h2>Welcome, Admin!</h2>
            <ul className='admin-ul'>
                <li><Link className='admin-links' to={'/admin/completebooking'}>Complete Booking</Link></li>
                <li><Link className='admin-links' to={'/admin/bookedrooms'}>Booked Rooms</Link></li>
                <li><Link className='admin-links' to={'/admin/incompletebookings'}>Incomplete Bookings</Link></li>
                <li><Link className='admin-links' to={'/admin/discardbooking'}>Discard Booking</Link></li>
                <li><Link className='admin-links' to={'/admin/allbookings'}>All Bookings</Link></li>
                <li><Link className='admin-links' to={'/admin/newroom'}>New Room</Link></li>
            </ul>
        </div>
    )
}

export default MainAdmin