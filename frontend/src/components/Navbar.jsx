import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className='sticky top-0 z-50 bg-white/0 backdrop-blur-md shadow-sm'>
        <div className='flex items-center justify-between py-3 px-4 md:py-4 md:px-6'>
            <Link to='/' className='transition-transform hover:scale-105'>
                <img src={assets.logo} className='w-28 md:w-36' alt="Logo" />
            </Link>

            {/* Desktop Navigation - Only visible on md and larger screens */}
            <ul className='hidden md:flex gap-8 text-sm font-medium'>
                <NavLink to='/' className='hover:text-black/70'>Anasayfa</NavLink>
                <NavLink to='/collection' className='hover:text-black/70'>ürünlerimiz</NavLink>
                <NavLink to='/about' className='hover:text-black/70'>Hakkımızda</NavLink>
                <NavLink to='/contact' className='hover:text-black/70'>İletişim</NavLink>
                <NavLink to='/video-feed' className='hover:text-black/70'>Video</NavLink>
            </ul>

            <div className='flex items-center gap-4 md:gap-8'>
                <div className='flex items-center gap-4 md:gap-6'>
                    <img 
                        onClick={() => setShowSearch(true)} 
                        src={assets.search_icon} 
                        className='w-4 md:w-5 cursor-pointer transition-transform hover:scale-110' 
                        alt="Search" 
                    />
                    
                    <div className='group relative'>
                        <img onClick={()=> token ? null : navigate('/login') } className='w-4 md:w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                        {/* Dropdown Menu */}
                        {token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-32 md:w-36 py-3 px-4 md:px-5 bg-slate-100 text-gray-500 rounded text-sm'>
                                <p className='cursor-pointer hover:text-black'>Profilim</p>
                                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Siparişlerim</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Çıkış Yap</p>
                            </div>
                        </div>}
                    </div> 
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-4 md:w-5 min-w-4 md:min-w-5' alt="" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    {/* Mobile Menu Button - Only visible on mobile */}
                    <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-4 md:w-5 cursor-pointer md:hidden' alt="" /> 
                </div>
            </div>
        </div>

        {/* Mobile Navigation - Only visible when menu is opened */}
        {visible && (
            <div className='fixed inset-0 z-40 md:hidden' onClick={() => setVisible(false)}>
                <div className='fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg z-50' onClick={e => e.stopPropagation()}>
                    <div className='flex flex-col text-gray-600 bg-white'>
                        <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer border-b bg-white'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                            <p className='text-sm font-medium'>Geri</p>
                        </div>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 px-6 border-b text-sm hover:bg-gray-50 bg-white' to='/'>Anasayfa</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 px-6 border-b text-sm hover:bg-gray-50 bg-white' to='/collection'>ürünlerimiz</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 px-6 border-b text-sm hover:bg-gray-50 bg-white' to='/about'>Hakkımızda</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 px-6 border-b text-sm hover:bg-gray-50 bg-white' to='/contact'>İletişim</NavLink>
                        <NavLink onClick={()=>setVisible(false)} className='py-3 px-6 border-b text-sm hover:bg-gray-50 bg-white' to='/video-feed'>Video</NavLink>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Navbar
