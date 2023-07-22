import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css_files/setnewpass.css'

const SetNewPass = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!sessionStorage.getItem('TempToken')) {
            navigate('/login')
        }
    })
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const postData = await fetch('https://hotelhorizonserver.onrender.com/api/auth/newpass', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem('TempToken')
                },
                body: JSON.stringify({ password })
            })
            const data = await postData.json()
            if (data.success) {
                alert(data.message)
                navigate('/login')
            } else {
                alert(data.message)
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='set-new-password'> <h2>Set New Password</h2>
            <form action="#" method="post">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" name="newPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" onClick={handleSubmit}>Set New Password</button>
            </form></div>
    )
}

export default SetNewPass