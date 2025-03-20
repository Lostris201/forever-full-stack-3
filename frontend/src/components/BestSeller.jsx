import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import axios from 'axios';

const BestSeller = () => {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Varsayılan örnek videolar
    const defaultVideos = [
        {
            id: 1,
            title: 'Doğa Yürüyüşü',
            thumbnailUrl: 'https://picsum.photos/300/400',
            username: '@naturelover',
            views: '1.2M görüntülenme'
        },
        {
            id: 2,
            title: 'Şehir Turu',
            thumbnailUrl: 'https://picsum.photos/300/401',
            username: '@citylights',
            views: '856K görüntülenme'
        },
        {
            id: 3,
            title: 'Deniz Kenarı',
            thumbnailUrl: 'https://picsum.photos/300/402',
            username: '@beachlover',
            views: '2.1M görüntülenme'
        },
        {
            id: 4,
            title: 'Dağ Manzarası',
            thumbnailUrl: 'https://picsum.photos/300/403',
            username: '@mountainview',
            views: '945K görüntülenme'
        }
    ];

    // Backend'den videoları yükleme
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
                const response = await axios.get(`${backendUrl}/api/video/list`);
                
                if (response.data.success && response.data.videos.length > 0) {
                    // Sadece 4 video göster (veya daha az)
                    const videoLimit = Math.min(response.data.videos.length, 4);
                    setVideos(response.data.videos.slice(0, videoLimit));
                } else {
                    console.log('API videoları bulunamadı, örnek veriler gösteriliyor');
                    // Eğer videolar yoksa örnek videolar göster
                    setVideos(defaultVideos);
                }
            } catch (error) {
                console.error('Video yükleme hatası:', error);
                // Hata durumunda örnek veriler göster
                console.log('Örnek videolar gösteriliyor');
                setVideos(defaultVideos);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Trend Videolar</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Trend Videolar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video, index) => (
                    <div
                        key={video._id || video.id}
                        className="relative rounded-xl overflow-hidden cursor-pointer group"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => navigate('/video-feed')}
                    >
                        <div className="aspect-[3/4]">
                            <img
                                src={video.thumbnailUrl || `https://picsum.photos/300/${400 + index}`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <FaPlay className="text-white text-4xl" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white font-semibold text-sm">{video.title}</h3>
                            <p className="text-white/80 text-xs">{video.username || `@${video.title.split(' ')[0].toLowerCase()}`}</p>
                            <p className="text-white/60 text-xs mt-1">{video.views || `${Math.floor(Math.random() * 900) + 100}K görüntülenme`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSeller;