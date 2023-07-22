import React, { useState,useEffect } from 'react'
import './css_files/otp.css'
import { Link, useNavigate } from 'react-router-dom'

const Forgotpassverify = () => {
    const navigate = useNavigate()
    const verification = sessionStorage.getItem('verification')

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(0)

    useEffect(() => {
        if (!verification) {
            navigate('/signup')
        }
        else {
            setEmail(sessionStorage.getItem('verification'))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(email, otp);
            const postData = await fetch('https://hotelhorizonserver.onrender.com/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            })
            const data = await postData.json()
            console.log(data);
            if (data.success) {
                sessionStorage.setItem('TempToken', data.message)
                navigate('/newpass')
            } else {
                alert(data.message)
                navigate('/signup')
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="verify-container">
                <h2>Verify OTP</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP:</label>
                        <input type="Number" value={otp} onChange={(e) => setOtp(e.target.value)} id="otp" name="otp" placeholder="Enter the OTP" required />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn">Verify</button>
                </form>
            </div>
        </>
    )
}

export default Forgotpassverify