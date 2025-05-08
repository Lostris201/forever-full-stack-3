import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 1,
        image: '/asset/WhatsApp Video 2025-05-08 at 12.42.11.mp4', // Newly added WhatsApp video
        title: 'Featured Collection',
        description: 'Our latest and most exclusive designs'
    },
    {
        id: 2,
        image: '/asset/277d658f1f254562941cf99435e2b215.MP4', // Previous first video now second
        title: 'Autumn Collection',
        description: 'Discover our seasonal teapot designs'
    },
    {
        id: 2,
        image: '/asset/1077abf01f9b46e1bdac92ad525eb086.MP4', // Second uploaded video used as image
        title: 'Elegant Designs',
        description: 'Handcrafted with premium materials'
    },
    {
        id: 3,
        image: '/asset/162b7a8eb5564aa2ba27207fa2e10a28.MP4', // Third uploaded video used as image
        title: 'Modern Classics',
        description: 'Timeless style for your kitchen'
    }
];

const SlideBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <div className="relative w-full h-full">
                        <video
                            src={slides[currentSlide].image}
                            muted
                            autoPlay
                            loop
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover"
                            onLoadStart={(e) => e.target.play().catch(err => console.log('Autoplay prevented:', err))}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                    {slides[currentSlide].title}
                                </h2>
                                <p className="text-xl md:text-2xl">
                                    {slides[currentSlide].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SlideBanner; 