import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const BestSeller = () => {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const videos = [
        {
            id: 1,
            thumbnail: 'https://picsum.photos/300/400',
            title: 'Doğa Yürüyüşü',
            username: '@naturelover',
            views: '1.2M görüntülenme'
        },
        {
            id: 2,
            thumbnail: 'https://picsum.photos/300/401',
            title: 'Şehir Turu',
            username: '@citylights',
            views: '856K görüntülenme'
        },
        {
            id: 3,
            thumbnail: 'https://picsum.photos/300/402',
            title: 'Deniz Kenarı',
            username: '@beachlover',
            views: '2.1M görüntülenme'
        },
        {
            id: 4,
            thumbnail: 'https://picsum.photos/300/403',
            title: 'Dağ Manzarası',
            username: '@mountainview',
            views: '945K görüntülenme'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Trend Videolar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video, index) => (
                    <div
                        key={video.id}
                        className="relative rounded-xl overflow-hidden cursor-pointer group"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => navigate('/video-feed')}
                    >
                        <div className="aspect-[3/4]">
                            <img
                                src={video.thumbnail}
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
                            <p className="text-white/80 text-xs">{video.username}</p>
                            <p className="text-white/60 text-xs mt-1">{video.views}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSeller;