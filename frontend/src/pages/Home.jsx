import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative">
        <Hero />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content Sections with Smooth Transitions */}
      <div className="space-y-20 py-10">
        <div className="transform hover:scale-[1.02] transition-transform duration-500">
          <LatestCollection />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gray-900/5 -skew-y-3 transform origin-top-right"></div>
          <div className="relative z-10">
            <BestSeller />
          </div>
        </div>

        <div className="bg-white py-16">
          <OurPolicy />
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
          <div className="relative z-10">
            <NewsletterBox />
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-black/80 text-white p-4 rounded-full shadow-lg hover:bg-black transition-all duration-300 backdrop-blur-sm"
      >
        ↑
      </button>
    </div>
  )
}

export default Home
