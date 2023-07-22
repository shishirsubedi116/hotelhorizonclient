import React, { useState } from 'react'
import './css_files/changepassword.css'
import { useNavigate } from 'react-router-dom'

const Changepassword = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const postData = await fetch('https://hotelhorizonserver.onrender.com/api/auth/changepass', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, newPassword })
            })
            const data = await postData.json()
            console.log(data);
            if(data.success){
                alert(data.message)
                navigate('/login')
            }
            else{
                alert(data.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='change-password-page'>
            <h2>Change Password</h2>
            <form action="#" method="post">
                <label htmlFor="currentPassword">Email</label>
                <input type="email" id="currentPassword" name="currentPassword" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="newPassword">Current Password</label>
                <input type="password" id="newPassword" name="newPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label htmlFor="confirmPassword">New Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                <button type="submit" onClick={handleSubmit}>Change Password</button>
            </form>
        </div>
    )
}

export default Changepassword