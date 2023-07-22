import React, { useEffect, useState } from 'react'
import './css_files/room.css'
import { useParams } from 'react-router-dom'
import BookRoom from './BookRoom'

const Room = () => {

    const params = useParams();
    const { roomNo } = params;

    const [room, setRoom] = useState([])

    const fetchRoom = async () => {
        const response = await fetch(`https://hotelhorizonserver.onrender.com/api/room/singleroom/${roomNo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (json.success) {
            setRoom([json.message])
        } else {
            alert(json.message)
        }
    }

    useEffect(() => {
        fetchRoom()
    }, [])

    return (
        <>
            <div className="room-details">
                {
                    room.map((element) => {
                        const src = `https://hotelhorizonserver.onrender.com/public/${element.roomPictures}`
                        return (
                            <>
                                <h2 key={element._id}>Room {roomNo}</h2>
                                <p className="description">{element.roomDetails}</p>

                                <h3>Room Picture:</h3>

                                <div className="room-pictures">
                                    <img src={src} alt="Room" />
                                </div>

                                <div className="booking-section">
                                    <p className="price"><b title='Payment After Reaching Hotel'><i>${element.Price}</i></b> per night stay</p>
                                    {
                                        element.isBooked ? <>
                                            <p className="booking-status">Status: <span className="booked">Booked</span></p>
                                            <p>booked till: {element.bookedTill.slice(0, 10)}</p>
                                            <button className="book-now-btn disabled-link" disabled={true}>You can't Book Now</button></> : <><p className="booking-status">Status: <span className="not-booked">Not Booked</span></p>
                                            <h4>Book Now:</h4>
                                            <>
                                                <BookRoom roomNo={roomNo} />
                                            </>
                                        </>
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Room
