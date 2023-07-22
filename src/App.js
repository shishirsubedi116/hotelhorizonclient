import React, { useContext, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Footer from './components/Footer'
import Otp from './components/Otp'
import Rooms from './components/Rooms'
import Room from './components/Room'
import CancelBooking from './components/CancelBooking'
import MyBookedRooms from './components/MyBookedRooms'
import AddExtraTime from './components/AddExtraTime'
import MainAdmin from './components/Admin/MainAdmin'
import NewRoom from './components/Admin/NewRoom'
import BookedRooms from './components/Admin/BookedRooms'
import IncompleteBookings from './components/Admin/IncompleteBookings'
import AllBookings from './components/Admin/AllBookings'
import CompleteBookings from './components/Admin/CompleteBookings'
import DiscardBooking from './components/Admin/DiscardBooking'
import Changepassword from './components/Changepassword'
import Forgotpassverify from './components/Forgotpassverify'
import SetNewPass from './components/SetNewPass'

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* User Routes  */}
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/verifyotp' element={<Otp />} />
          <Route exact path='/rooms' element={<Rooms />} />
          <Route exact path='/cancelbooking' element={<CancelBooking />} />
          <Route exact path='/addextratime' element={<AddExtraTime />} />
          <Route exact path='/mybookedrooms' element={<MyBookedRooms />} />
          <Route exact path='/forgotverify' element={<Forgotpassverify />} />
          <Route exact path='/room/:roomNo' element={<Room />} />
          <Route exact path='/changepassword' element={<Changepassword />} />
          <Route exact path='/newpass' element={<SetNewPass />} />

          {/* Admin Routes  */}
          <Route exact path='/admin/mainadmin' element={<MainAdmin />} />
          <Route exact path='/admin/newroom' element={<NewRoom />} />
          <Route exact path='/admin/bookedrooms' element={<BookedRooms />} />
          <Route exact path='/admin/incompletebookings' element={<IncompleteBookings />} />
          <Route exact path='/admin/allbookings' element={<AllBookings />} />
          <Route exact path='/admin/completebooking' element={<CompleteBookings />} />
          <Route exact path='/admin/discardbooking' element={<DiscardBooking />} />
        </Routes>
        <Footer />
      </BrowserRouter>      
    </>
  )
}

export default App