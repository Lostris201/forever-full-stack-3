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
    <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm'>
        <div className='flex items-center justify-between py-4 px-6'>
            <Link to='/' className='transition-transform hover:scale-105'>
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            <ul className='hidden sm:flex gap-8 text-sm font-medium'>
                <NavLink to='/' className='hover:text-black/70'>Anasayfa</NavLink>
                <NavLink to='/collection' className='hover:text-black/70'>ürünlerimiz</NavLink>
                <NavLink to='/about' className='hover:text-black/70'>Hakkımızda</NavLink>
                <NavLink to='/contact' className='hover:text-black/70'>İletişim</NavLink>
                <NavLink to='/video-feed' className='hover:text-black/70'>Video</NavLink>
            </ul>

            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-6'>
                    <img 
                        onClick={() => setShowSearch(true)} 
                        src={assets.search_icon} 
                        className='w-5 cursor-pointer transition-transform hover:scale-110' 
                        alt="Search" 
                    />
                    
                    <div className='group relative'>
                        <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                        {/* Dropdown Menu */}
                        {token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>Profilim</p>
                                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Siparişlerim</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Çıkış Yap</p>
                            </div>
                        </div>}
                    </div> 
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> 
                </div>
            </div>
        </div>

        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>Anasayfa</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>ürünlerimiz</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>Hakkımızda</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>İletişim</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/video-feed'>Video</NavLink>
                </div>
        </div>
    </div>
  )
}

export default Navbar
