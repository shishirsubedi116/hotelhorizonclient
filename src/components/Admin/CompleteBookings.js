import React, { useEffect, useState } from 'react'
import '../admin_css/completebookings.css'
import { useNavigate } from 'react-router-dom'

const CompleteBookings = () => {
    const navigate = useNavigate()
    const [roomNo, setRoomNo] = useState(0)

    const submitCancel = async (e) => {
        e.preventDefault()
        if (`Discard booking of room ${roomNo}`) {

            try {
                const response = await fetch('https://hotelhorizonserver.onrender.com/api/admin/completebook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': sessionStorage.getItem('token')
                    },
                    body: JSON.stringify({ roomNo: roomNo })
                })
                const json = await response.json()
                if (json.success) {
                    alert(json.message)
                    navigate('/rooms')
                }
                else {
                    alert(json.message)
                }

            } catch (error) {
                console.log(error);
            }
        }else{
            return 
        }
    }



useEffect(() => {
    if (!sessionStorage.getItem('token' || !sessionStorage.getItem('isAdmin'))) {
        navigate('/login');
        alert('please log in')
    }

}, [])
return (
    <>
        <h2 className='complete-book'>Complete Booking</h2>
        <form class="complete-booking-form">
            <div class="form-group">
                <label for="room-number">Room Number:</label>
                <input type="text" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} id="room-number" name="room-number" required />
            </div>
            <button type="submit" onClick={submitCancel}>Complete Booking</button>
        </form>
    </>
)
}

export default CompleteBookings