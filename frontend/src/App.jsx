import React from "react"
import Navbar from "./components/navbar/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
import PlaceOrder from "./pages/placeorder/PlaceOrder"
import Footer from "./components/footer/footer"

const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
