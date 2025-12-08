import React, { useState } from 'react';
import Navbar from "./components/navbar/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import PlaceOrder from "./pages/placeorder/PlaceOrder"
import LoginPopup from "./components/loginpopup/LoginPopup"
import Footer from "./components/footer/footer"
import MyOrders from "./pages/myorders/MyOrders"
import Verify from "./pages/verify/Verify"

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
