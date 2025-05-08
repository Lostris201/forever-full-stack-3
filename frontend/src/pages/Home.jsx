import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import BestSeller from '../components/BestSeller'
import SlideBanner from '../components/SlideBanner'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  // Initialize AOS library
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Slide Banner */}
      <div className="w-full" data-aos="fade-up">
        <SlideBanner />
      </div>

      {/* Reels Feed Video Section */}
      <div className="py-16 bg-gray-50" data-aos="fade-up" data-aos-delay="200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 prata-regular">Reels</h2>
            <NavLink to="/video-feed" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
              Video Sekmesine Git
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </NavLink>
          </div>
          
          {/* Reels Style Horizontal Scroll */}
          <div className="relative">
            <div className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory gap-4">
              {/* Reel 1 */}
              <div className="flex-shrink-0 w-[250px] md:w-[280px] snap-start" data-aos="fade-up" data-aos-delay="100">
                <NavLink to="/video-feed" className="block relative h-[450px] rounded-xl overflow-hidden shadow-lg bg-black">
                  <video
                    className="h-full w-full object-cover"
                    src="/asset/277d658f1f254562941cf99435e2b215.MP4"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/50/50" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium">@teapotmaster</span>
                    </div>
                    <p className="text-sm line-clamp-2">Autumn Collection - Discover our seasonal designs #teapot #collection</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </NavLink>
              </div>

              {/* Reel 2 */}
              <div className="flex-shrink-0 w-[250px] md:w-[280px] snap-start" data-aos="fade-up" data-aos-delay="200">
                <NavLink to="/video-feed" className="block relative h-[450px] rounded-xl overflow-hidden shadow-lg bg-black">
                  <video
                    className="h-full w-full object-cover"
                    src="/asset/1077abf01f9b46e1bdac92ad525eb086.MP4"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/51/51" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium">@teadesigner</span>
                    </div>
                    <p className="text-sm line-clamp-2">Elegant Designs - Handcrafted with premium materials #premium #design</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </NavLink>
              </div>

              {/* Reel 3 */}
              <div className="flex-shrink-0 w-[250px] md:w-[280px] snap-start" data-aos="fade-up" data-aos-delay="300">
                <NavLink to="/video-feed" className="block relative h-[450px] rounded-xl overflow-hidden shadow-lg bg-black">
                  <video
                    className="h-full w-full object-cover"
                    src="/asset/162b7a8eb5564aa2ba27207fa2e10a28.MP4"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/52/52" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium">@modernteapots</span>
                    </div>
                    <p className="text-sm line-clamp-2">Modern Classics - Timeless style for your kitchen #modern #kitchen</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </NavLink>
              </div>

              {/* Reel 4 */}
              <div className="flex-shrink-0 w-[250px] md:w-[280px] snap-start" data-aos="fade-up" data-aos-delay="400">
                <NavLink to="/video-feed" className="block relative h-[450px] rounded-xl overflow-hidden shadow-lg bg-black">
                  <video
                    className="h-full w-full object-cover"
                    src="/asset/2fe47b735e0645bb868a0fab299b4924.MP4"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex-shrink-0">
                        <img src="https://picsum.photos/53/53" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium">@specialteas</span>
                    </div>
                    <p className="text-sm line-clamp-2">Special Collection - Unique designs for special occasions #special #unique</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </NavLink>
              </div>

              {/* View All Reel - CTA */}
              <div className="flex-shrink-0 w-[250px] md:w-[280px] snap-start" data-aos="fade-up" data-aos-delay="500">
                <NavLink to="/video-feed" className="block relative h-[450px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-6 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Daha Fazla Video</h3>
                  <p className="mb-6 opacity-90">Tüm video koleksiyonumuzu keşfedin</p>
                  <span className="inline-block px-6 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-opacity-90 transition-all">
                    Video Akışına Git
                  </span>
                </NavLink>
              </div>
            </div>
            
            {/* Scroll Indicators */}
            <div className="hidden md:flex absolute top-1/2 -left-4 transform -translate-y-1/2">
              <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2">
              <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BestSeller Section */}
      <div className="space-y-24 py-10">
        <section className="relative overflow-hidden" data-aos="fade-up">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 -skew-y-3 transform origin-top-right"></div>
          <div className="relative z-10 py-8">
            <BestSeller />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
