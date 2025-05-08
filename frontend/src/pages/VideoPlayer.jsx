import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const VideoPlayer = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                // If videoId is a URL, we're coming from direct navigation
                if (videoId.includes('/')) {
                    setVideo({
                        id: 'direct',
                        url: decodeURIComponent(videoId),
                        title: 'Video',
                        description: 'Video açıklaması',
                        username: '@user',
                        userImage: 'https://picsum.photos/50/50',
                        likes: 0,
                        comments: 0
                    });
                    setLoading(false);
                    return;
                }

                // Otherwise fetch from API
                const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
                const response = await axios.get(`${backendUrl}/api/video/${videoId}`);
                
                if (response.data.success) {
                    setVideo({
                        id: response.data.video._id,
                        url: response.data.video.videoUrl,
                        title: response.data.video.title,
                        description: response.data.video.description,
                        username: `@${response.data.video.title.split(' ')[0].toLowerCase()}`,
                        userImage: response.data.video.thumbnailUrl || 'https://picsum.photos/50/50',
                        likes: Math.floor(Math.random() * 1000),
                        comments: Math.floor(Math.random() * 100)
                    });
                } else {
                    toast.error('Video bulunamadı');
                    navigate('/video-feed');
                }
                setLoading(false);
            } catch (error) {
                console.error('Video yüklenirken hata oluştu:', error);
                toast.error('Video yüklenirken bir hata oluştu');
                setLoading(false);
                navigate('/video-feed');
            }
        };
        
        fetchVideo();
    }, [videoId, navigate]);

    const handleBack = () => {
        navigate('/video-feed');
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
        toast.success(isLiked ? 'Beğeni kaldırıldı' : 'Video beğenildi');
    };

    const toggleSave = () => {
        setIsSaved(!isSaved);
        toast.success(isSaved ? 'Video kaydedilenlerden çıkarıldı' : 'Video kaydedildi');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: video?.title || 'Video',
                text: video?.description || 'Harika bir video!',
                url: window.location.href,
            }).catch(err => {
                console.error('Paylaşım hatası:', err);
                toast.error('Paylaşım sırasında bir hata oluştu');
            });
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => toast.success('Video linki kopyalandı'))
                .catch(() => toast.error('Link kopyalanamadı'));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <button onClick={handleBack} className="text-white flex items-center gap-2">
                    <FaArrowLeft size={20} />
                    <span>Geri</span>
                </button>
                <h1 className="text-xl font-bold text-white">Video</h1>
                <div className="w-10"></div> {/* Boşluk için */}
            </div>

            {/* Video Player */}
            <div className="pt-16 pb-20">
                <div className="relative w-full aspect-video bg-black">
                    <video
                        src={video?.url}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        playsInline
                    />
                </div>

                {/* Video Info */}
                <div className="p-4 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <img 
                            src={video?.userImage} 
                            alt={video?.username} 
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-bold">{video?.username}</h3>
                            <p className="text-sm text-gray-400">{video?.title}</p>
                        </div>
                    </div>
                    
                    <p className="mb-6">{video?.description}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-between items-center border-t border-b border-gray-800 py-3">
                        <button 
                            onClick={toggleLike}
                            className="flex flex-col items-center gap-1"
                        >
                            <FaHeart size={24} className={isLiked ? 'text-red-500' : 'text-white'} />
                            <span className="text-sm">{isLiked ? (video?.likes || 0) + 1 : video?.likes || 0}</span>
                        </button>
                        
                        <button className="flex flex-col items-center gap-1">
                            <FaComment size={24} />
                            <span className="text-sm">{video?.comments || 0}</span>
                        </button>
                        
                        <button 
                            onClick={handleShare}
                            className="flex flex-col items-center gap-1"
                        >
                            <FaShare size={24} />
                            <span className="text-sm">Paylaş</span>
                        </button>
                        
                        <button 
                            onClick={toggleSave}
                            className="flex flex-col items-center gap-1"
                        >
                            <FaBookmark size={24} className={isSaved ? 'text-blue-500' : 'text-white'} />
                            <span className="text-sm">Kaydet</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
