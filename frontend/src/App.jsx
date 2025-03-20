import React from 'react'
import { Routes, Route, createRoutesFromElements, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import VideoFeed from './pages/VideoFeed'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

export const backendUrl = "http://localhost:5000" 

const App = () => {
  // Mevcut URL yolunu al
  const location = useLocation();
  const isVideoFeedPage = location.pathname === '/video-feed';

  // VideoFeed sayfasında olup olmadığımıza göre kapsayıcı sınıf belirle
  const containerClass = isVideoFeedPage 
    ? 'video-feed-page'  // Video sayfasındayız, özel sınıf
    : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]';  // Normal sayfa

  return (
    <div className={containerClass}>
      <ToastContainer />
      {/* Navbar ve SearchBar sadece video sayfasında değilsek göster */}
      {!isVideoFeedPage && (
        <>
          <Navbar />
          <SearchBar />
        </>
      )}
      
      <Routes future={{ v7_startTransition: true }}>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/video-feed' element={<VideoFeed />} />
      </Routes>
      
      {/* Footer sadece video sayfasında değilsek göster */}
      {!isVideoFeedPage && <Footer />}
    </div>
  )
}

export default App
