import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        // Anasayfada da arama yapabilmek için visible durumunu her zaman true yapıyoruz
        setVisible(true);
    },[location])
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() && !location.pathname.includes('collection')) {
            navigate('/collection');
        }
    }
    
    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <form onSubmit={handleSearch} className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)} 
                    className='flex-1 outline-none bg-inherit text-sm' 
                    type="text" 
                    placeholder='Ürün ara...'
                />
                <button type="submit">
                    <img className='w-4 cursor-pointer' src={assets.search_icon} alt="Ara" />
                </button>
            </form>
            <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default SearchBar
