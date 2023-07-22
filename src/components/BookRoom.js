import React, { useState } from 'react'
import './css_files/bookroom.css'
import { useNavigate } from 'react-router-dom';

const BookRoom = ({ roomNo }) => {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [fromTime, setFromTime] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!sessionStorage.getItem('token')) {
            navigate('/login')
            alert('You need to login first')
        }
        try {
            const sendData = await fetch('https://hotelhorizonserver.onrender.com/api/booking/bookroom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ to: toDate, from: fromDate + 'T' + fromTime, roomNo: roomNo })
            })
            const response = await sendData.json()
            if (response.success) {
                alert(response.message);
                navigate('/mybookedrooms')
            }
            else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="booking-form">
                <div className="form-group">
                    <label htmlFor="from-date">From :</label>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} id="from-date" title='Payment After Reaching Hotel' name="from-date" required />
                    <p>Select Time</p>
                    <input type="time" onChange={(e) => setFromTime(e.target.value)} id="booking-time" required name="booking-time"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="to-date">To :</label>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} id="to-date" name="to-date" required />
                </div>
                <button type="submit" title='Payment After Reaching Hotel' onClick={handleSubmit}>Book Room</button>
            </form>
        </>
    )
}

export default BookRoom