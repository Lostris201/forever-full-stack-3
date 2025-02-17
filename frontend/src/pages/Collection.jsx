import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filters Panel */}
          <div className='lg:w-64 flex-shrink-0'>
            <div className='sticky top-24 bg-white rounded-xl shadow-sm p-6'>
              <h2 className='text-lg font-semibold mb-4'>Filtre</h2>
              {/* Category Filter */}
              <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Kategori</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Bıçak
                  </p>
                  <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Bıçak
                  </p>
                  <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Bıçak
                  </p>
                </div>
              </div>
              {/* SubCategory Filter */}
              <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Tür</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Çeşit
                  </p>
                  <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Çeşit
                  </p>
                  <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Çeşit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className='flex-1'>
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-2xl font-bold'>Tüm Ürünler</h1>
              <select 
                onChange={(e) => setSortType(e.target.value)}
                className='bg-white border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/5'
              >
                <option value="relavent">Sırala: Öne Çıkanlar</option>
                <option value="low-high">Sırala: Düşükten Yükseğe </option>
                <option value="high-low">Sırala: Yüksekten Düşüğe</option>
              </select>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {filterProducts.map((product) => (
                <div key={product._id} className='group'>
                  <div className='relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md'>
                    <ProductItem name={product.name} id={product._id} price={product.price} image={product.image} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection
