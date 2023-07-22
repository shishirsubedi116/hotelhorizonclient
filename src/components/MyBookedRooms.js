import React, { useEffect, useState } from 'react'
import './css_files/mybookedrooms.css'
import { Link, useNavigate } from 'react-router-dom';

const MyBookedRooms = () => {


    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate()

    const fetchRooms = async () => {
        const response = await fetch('https://hotelhorizonserver.onrender.com/api/booking/mybookedrooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            }
        })
        const json = await response.json()
        if (sessionStorage.getItem('token')) {
            if (json.success) {
                setRooms(json.message)
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

    useEffect(() => {
        fetchRooms();
    }, [])

    return (
        <>
            <h2 className='my-boookings'>My Bookings</h2>
            <ul class="booking-list">
                {
                    rooms.map((element) => {
                        return (
                            <li>
                                <Link to={`/room/${element.roomNo}`}>
                                    <b>RoomNo: </b> {element.roomNo}
                                    <br />
                                    <br />
                                    <b> From:</b> &nbsp; {element.from.slice(0, 10)}
                                    <br />
                                    <br />
                                    <b>To:</b> {element.to.slice(0, 10)}
                                    <br />
                                    <br />
                                    <b>Booking Id:</b> {element.bookId}
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>
            {
                sessionStorage.getItem('token') ?
                <>
                    <h4 className='mybooklinks'><Link to={'/cancelbooking'}>Cancel Booking?</Link></h4>
                    <h4 className='mybooklinks'><Link to={'/addextratime'}>Add Extra Time?</Link></h4>
                </>
                    : <></>
            }
        </>
    )
}

export default MyBookedRooms