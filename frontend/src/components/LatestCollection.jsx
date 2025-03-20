import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState({
        bambu: [],
        bıçak: [],
        cam: [],
        mutfak: []
    });

    useEffect(() => {
        const categorizedProducts = {
            bambu: [],
            bıçak: [],
            cam: [],
            mutfak: []
        };

        products.forEach(product => {
            if (product.category === 'bambu') {
                categorizedProducts.bambu.push(product);
            } else if (product.category === 'bıçak') {
                categorizedProducts.bıçak.push(product);
            } else if (product.category === 'cam') {
                categorizedProducts.cam.push(product);
            } else if (product.category === 'mutfak') {
                categorizedProducts.mutfak.push(product);
            }
        });

        setLatestProducts(categorizedProducts);
    }, [products]);

    return (
        <div className='my-10'>
            {/* Bambu Section */}
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Trend'} text2={'Bambular'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.bambu.length > 0 ? (
                    latestProducts.bambu.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-600'>Henüz bambu ürünü yok.</p>
                )}
            </div>

            {/* Bıçak Section */}
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Trend'} text2={'Bıçaklar'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.bıçak.length > 0 ? (
                    latestProducts.bıçak.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-600'>Henüz bıçak ürünü yok.</p>
                )}
            </div>

            {/* Cam Section */}
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Trend'} text2={'Camlar'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.cam.length > 0 ? (
                    latestProducts.cam.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-600'>Henüz cam ürünü yok.</p>
                )}
            </div>

            {/* Mutfak Section */}
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Trend'} text2={'Mutfak Eşyaları'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.mutfak.length > 0 ? (
                    latestProducts.mutfak.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-600'>Henüz mutfak ürünü yok.</p>
                )}
            </div>
        </div>
    )
}

export default LatestCollection
