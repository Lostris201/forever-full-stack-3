import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaMusic, FaPause, FaPlay } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';

const VideoFeed = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [likes, setLikes] = useState({});
    const videoRefs = useRef({});
    const containerRef = useRef(null);
    const [startY, setStartY] = useState(null);

    // Navbar'ı gizle/göster
    useEffect(() => {
        const navbar = document.querySelector('nav');
        if (navbar) navbar.style.display = 'none';
        
        return () => {
            if (navbar) navbar.style.display = 'block';
        };
    }, []);

    const videos = [
        {
            id: 1,
            url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            username: '@naturelover',
            description: 'Muhteşem doğa manzaraları 🌲 #doğa #huzur',
            songName: 'Orijinal Ses - Doğa Sesleri',
            likes: '1.2M',
            comments: '10.5K',
            shares: '5.2K',
            userImage: 'https://picsum.photos/50/50'
        },
        {
            id: 2,
            url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            username: '@citylights',
            description: 'Şehrin en güzel anları 🌆 #şehir #gece',
            songName: 'Popüler Müzik - Şehir Sesleri',
            likes: '856K',
            comments: '7.2K',
            shares: '3.1K',
            userImage: 'https://picsum.photos/51/51'
        },
        {
            id: 3,
            url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            username: '@beachlover',
            description: 'Deniz kenarında huzurlu anlar 🌊 #deniz #yaz',
            songName: 'Trend Müzik - Dalga Sesleri',
            likes: '2.1M',
            comments: '15.3K',
            shares: '8.7K',
            userImage: 'https://picsum.photos/52/52'
        }
    ];

    // Video kontrolü
    const togglePlay = () => {
        const video = videoRefs.current[currentIndex];
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Like işlemi
    const toggleLike = (videoId) => {
        setLikes(prev => ({
            ...prev,
            [videoId]: !prev[videoId]
        }));
    };

    // Wheel event ile kaydırma
    const handleWheel = (e) => {
        if (e.deltaY > 0 && currentIndex < videos.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Klavye ile kaydırma
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
            } else if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
                setCurrentIndex(prev => prev + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, videos.length]);

    // Dokunmatik kaydırma
    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (startY === null) return;

        const currentY = e.touches[0].clientY;
        const diff = startY - currentY;

        if (Math.abs(diff) > 50) { // minimum kaydırma mesafesi
            if (diff > 0 && currentIndex < videos.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setStartY(null);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
                setStartY(null);
            }
        }
    };

    const handleTouchEnd = () => {
        setStartY(null);
    };

    // Video değiştiğinde otomatik oynatma
    useEffect(() => {
        const video = videoRefs.current[currentIndex];
        if (video) {
            video.currentTime = 0;
            if (isPlaying) {
                video.play();
            }
        }
    }, [currentIndex]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
            <div className="w-full max-w-[1200px] h-[calc(100vh-80px)] mx-auto flex">
                {/* Sol Taraf - Video Listesi */}
                <div className="w-[320px] h-full bg-[#262626]/90 backdrop-blur-md overflow-y-auto p-4 border-r border-gray-700">
                    <h2 className="text-white text-lg font-semibold mb-4">Reels</h2>
                    {videos.map((video, index) => (
                        <div 
                            key={video.id}
                            onClick={() => {
                                setCurrentIndex(index);
                                setIsPlaying(true);
                            }}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 transition-all duration-200 ${
                                currentIndex === index ? 'bg-[#363636]' : 'hover:bg-[#363636]'
                            }`}
                        >
                            <img 
                                src={video.userImage} 
                                alt={video.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-white text-sm font-medium">{video.username}</h3>
                                <p className="text-gray-400 text-xs truncate">{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sağ Taraf - Video Player */}
                <div className="flex-1 relative bg-black/90 backdrop-blur-md">
                    <div 
                        ref={containerRef}
                        className="absolute inset-0 flex items-center justify-center"
                        onWheel={handleWheel}
                    >
                        <div 
                            className="w-[380px] h-[675px] relative bg-black rounded-lg overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {videos.map((video, index) => (
                                <div
                                    key={video.id}
                                    className={`absolute inset-0 transition-transform duration-300 ${
                                        index === currentIndex ? 'translate-y-0' : 
                                        index < currentIndex ? '-translate-y-full' : 'translate-y-full'
                                    }`}
                                >
                                    <video
                                        ref={el => videoRefs.current[index] = el}
                                        src={video.url}
                                        className="w-full h-full object-cover"
                                        loop
                                        playsInline
                                        onClick={togglePlay}
                                        style={{ display: index === currentIndex ? 'block' : 'none' }}
                                    />
                                    
                                    {/* Video Kontrolleri */}
                                    <div className="absolute right-4 bottom-[100px] flex flex-col gap-6">
                                        <button 
                                            onClick={() => toggleLike(video.id)}
                                            className="w-11 h-11 bg-gray-200/20 rounded-full flex items-center justify-center hover:bg-gray-200/30 transition-all duration-200"
                                        >
                                            {likes[video.id] ? (
                                                <FaHeart className="text-red-500 text-xl" />
                                            ) : (
                                                <FaRegHeart className="text-white text-xl" />
                                            )}
                                        </button>
                                        <div className="text-center">
                                            <span className="text-white text-xs block">{video.likes}</span>
                                        </div>

                                        <button className="w-11 h-11 bg-gray-200/20 rounded-full flex items-center justify-center hover:bg-gray-200/30 transition-all duration-200">
                                            <FaComment className="text-white text-xl" />
                                        </button>
                                        <div className="text-center">
                                            <span className="text-white text-xs block">{video.comments}</span>
                                        </div>

                                        <button className="w-11 h-11 bg-gray-200/20 rounded-full flex items-center justify-center hover:bg-gray-200/30 transition-all duration-200">
                                            <FaShare className="text-white text-xl" />
                                        </button>
                                        <div className="text-center">
                                            <span className="text-white text-xs block">{video.shares}</span>
                                        </div>
                                    </div>

                                    {/* Video Bilgileri */}
                                    <div className="absolute bottom-6 left-4 right-16 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <img 
                                                src={video.userImage} 
                                                alt={video.username}
                                                className="w-8 h-8 rounded-full border border-white"
                                            />
                                            <span className="font-semibold">{video.username}</span>
                                            <button className="px-4 py-1 border border-white rounded-md text-sm font-semibold hover:bg-white/10 transition-all duration-200">
                                                Takip Et
                                            </button>
                                        </div>
                                        <p className="text-sm mb-2">{video.description}</p>
                                        <div className="flex items-center gap-2">
                                            <FaMusic className="text-sm" />
                                            <p className="text-sm">{video.songName}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Kaydırma İndikatörleri */}
                            {currentIndex > 0 && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50">
                                    ↑ Yukarı kaydır
                                </div>
                            )}
                            {currentIndex < videos.length - 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50">
                                    ↓ Aşağı kaydır
                                </div>
                            )}

                            {/* Play/Pause Overlay */}
                            <div 
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                onClick={togglePlay}
                            >
                                {!isPlaying && (
                                    <div className="bg-black/30 p-4 rounded-full">
                                        <FaPlay className="text-white text-3xl" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoFeed;