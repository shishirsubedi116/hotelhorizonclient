import React from 'react'
import './css_files/home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Hotel Horizon</h1>
          <p>Our hotel provides you unparallel luxury experience, we have top quality customer service and strive to meet every need you have.</p>
          <Link to="/rooms" className="btn">Book Now</Link>
        </div>
      </section>
    </>

  )
}

export default Home