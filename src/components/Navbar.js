import React from 'react'
import './css_files/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './images/logo.png'

const Navbar = () => {
    const navigate = useNavigate()
    const LogOut = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('isAdmin')
        navigate('/login')
    }
    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        <Link to='/'><img src={Logo} alt="Hotel Horizon Logo" /></Link>
                    </div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/gallery">About</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/rooms">Rooms</Link></li>
                        <li><Link to="/mybookedrooms">My Bookings</Link></li>
                        {sessionStorage.getItem('isAdmin') ? <><li><Link to="/admin/mainadmin">admin</Link></li>
                            </> : <>
                        </>}
                    </ul>
                    <div className="login-signup">
                        {!sessionStorage.getItem('token') ? <><Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link></> : <><button onClick={LogOut}>Log Out</button>
                        </>}
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar