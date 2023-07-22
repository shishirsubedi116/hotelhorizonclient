import React, { useEffect, useState } from 'react'
import './css_files/addextratime.css'
import { useNavigate } from 'react-router-dom'

const AddExtraTime = () => {
    const navigate = useNavigate()
    const [roomNo, setRoomNo] = useState(0)
    const [eTime, setETime] = useState(0)

    const submitCancel = async (e) => {
        e.preventDefault()

        if (window.confirm(`${eTime} days will be added to room ${roomNo}`)==true) {
            try {
                const response = await fetch('https://hotelhorizonserver.onrender.com/api/booking/addextratime', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': sessionStorage.getItem('token')
                    },
                    body: JSON.stringify({ roomNo: roomNo, eTime })
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
        }
        else{
            return
        }
    }

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login');
            alert('please log in')
        }

    }, [])

    return (
        <>
            <h2 className='cancel-book'>Add Extra Days</h2>
            <form class="cancel-booking-form">
                <div class="form-group">
                    <label for="room-number">Room Number:</label>
                    <input type="text" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} id="room-number" name="room-number" required />
                </div>
                <div class="form-group">
                    <label for="email">Extra Days:</label>
                    <input type="Number" value={eTime} onChange={(e) => setETime(e.target.value)} required />
                </div>
                <button type="submit" onClick={submitCancel}>Add Extra Days</button>
            </form>
        </>
    )
}

export default AddExtraTime