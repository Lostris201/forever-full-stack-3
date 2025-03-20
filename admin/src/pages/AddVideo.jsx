import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'

const AddVideo = ({ token }) => {
    const [video, setVideo] = useState(false)
    const [thumbnail, setThumbnail] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Trending")
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)

    // Videoları getir
    const fetchVideos = async () => {
        try {
            setLoading(true)
            const response = await axios.get(backendUrl + "/api/video/list")
            if (response.data.success) {
                setVideos(response.data.videos)
            } else {
                toast.error(response.data.message || "Videolar yüklenirken bir hata oluştu")
            }
        } catch (error) {
            console.error("Video yükleme hatası:", error)
            toast.error("Videolar yüklenirken bir hata oluştu")
        } finally {
            setLoading(false)
        }
    }

    // Komponent yüklendiğinde videoları getir
    useEffect(() => {
        fetchVideos()
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            formData.append("title", title)
            formData.append("description", description)
            formData.append("category", category)

            if (video) {
                formData.append("video", video)
            } else {
                return toast.error("Video yüklemeniz gerekiyor")
            }

            thumbnail && formData.append("thumbnail", thumbnail)

            const response = await axios.post(backendUrl + "/api/video/add", formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                toast.success(response.data.message)
                // Form alanlarını temizle
                setTitle('')
                setDescription('')
                setVideo(false)
                setThumbnail(false)
                setCategory("Trending")
                // Videoları yeniden yükle
                fetchVideos()
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log('Hata:', error)
            toast.error(error.response?.data?.message || 'Video yüklenirken bir hata oluştu')
        }
    }

    // Video silme fonksiyonu
    const handleDeleteVideo = async (videoId) => {
        if (window.confirm("Bu videoyu silmek istediğinizden emin misiniz?")) {
            try {
                const response = await axios.post(
                    backendUrl + "/api/video/remove", 
                    { videoId }, 
                    { headers: { token } }
                )
                
                if (response.data.success) {
                    toast.success("Video başarıyla silindi")
                    // Videoları yeniden yükle
                    fetchVideos()
                } else {
                    toast.error(response.data.message || "Video silinirken bir hata oluştu")
                }
            } catch (error) {
                console.error("Video silme hatası:", error)
                toast.error("Video silinirken bir hata oluştu")
            }
        }
    }

    return (
        <div className='w-full'>
            <h2 className='text-xl font-semibold mb-6'>Video Yönetimi</h2>
            
            {/* Video Ekleme Formu */}
            <div className='bg-white p-6 rounded-lg shadow-sm mb-8'>
                <h3 className='text-lg font-medium mb-4'>Yeni Video Ekle</h3>
                <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                    <div>
                        <p className='mb-2'>Video ve Thumbnail Yükle</p>
                        <div className='flex gap-4'>
                            {/* Video upload alanı */}
                            <label htmlFor="video" className='cursor-pointer'>
                                <div className='w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg overflow-hidden'>
                                    {!video ? (
                                        <img className='w-20 opacity-50' src={assets.upload_area} alt="Upload" />
                                    ) : (
                                        <video 
                                            className='w-full h-full object-cover' 
                                            src={URL.createObjectURL(video)}
                                        />
                                    )}
                                </div>
                                <p className='text-center mt-2 text-sm text-gray-600'>Video</p>
                                <input
                                    onChange={(e) => setVideo(e.target.files[0])}
                                    type="file"
                                    id="video"
                                    accept="video/*"
                                    hidden
                                />
                            </label>

                            {/* Thumbnail upload alanı */}
                            <label htmlFor="thumbnail" className='cursor-pointer'>
                                <div className='w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg overflow-hidden'>
                                    {!thumbnail ? (
                                        <img className='w-20 opacity-50' src={assets.upload_area} alt="Upload" />
                                    ) : (
                                        <img
                                            className='w-full h-full object-cover'
                                            src={URL.createObjectURL(thumbnail)}
                                            alt="Thumbnail"
                                        />
                                    )}
                                </div>
                                <p className='text-center mt-2 text-sm text-gray-600'>Thumbnail (İsteğe bağlı)</p>
                                <input
                                    onChange={(e) => setThumbnail(e.target.files[0])}
                                    type="file"
                                    id="thumbnail"
                                    accept="image/*"
                                    hidden
                                />
                            </label>
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='mb-2'>Video Başlığı</p>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className='w-full max-w-[500px] px-3 py-2 border rounded'
                            type="text"
                            placeholder='Video başlığını girin'
                            required
                        />
                    </div>

                    <div className='w-full'>
                        <p className='mb-2'>Video Açıklaması</p>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className='w-full max-w-[500px] px-3 py-2 border rounded min-h-[100px]'
                            placeholder='Video açıklamasını girin'
                            required
                        />
                    </div>

                    <div>
                        <p className='mb-2'>Kategori</p>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            className='px-3 py-2 border rounded'
                        >
                            <option value="Trending">Trending</option>
                            <option value="Latest">Latest</option>
                            <option value="Popular">Popular</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className='w-28 py-3 mt-4 bg-black text-white rounded hover:bg-gray-800 transition-colors'
                    >
                        EKLE
                    </button>
                </form>
            </div>
            
            {/* Video Listesi ve Silme */}
            <div className='bg-white p-6 rounded-lg shadow-sm'>
                <h3 className='text-lg font-medium mb-4'>Mevcut Videolar</h3>
                
                {loading ? (
                    <p>Videolar yükleniyor...</p>
                ) : videos.length === 0 ? (
                    <p>Henüz video eklenmemiş</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {videos.map(video => (
                            <div key={video._id} className='border rounded-lg overflow-hidden bg-gray-50'>
                                <div className='h-40 bg-gray-200'>
                                    {video.thumbnailUrl ? (
                                        <img 
                                            src={video.thumbnailUrl} 
                                            alt={video.title} 
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center bg-gray-100 text-gray-400'>
                                            Thumbnail Yok
                                        </div>
                                    )}
                                </div>
                                <div className='p-3'>
                                    <div className='flex justify-between items-start'>
                                        <h4 className='font-medium text-gray-800'>{video.title}</h4>
                                        <button 
                                            onClick={() => handleDeleteVideo(video._id)}
                                            className='p-2 text-red-500 hover:bg-red-50 rounded-full'
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                    <p className='text-sm text-gray-500 mt-1'>{video.category}</p>
                                    <p className='text-xs text-gray-400 mt-2'>
                                        {new Date(video.date).toLocaleDateString('tr-TR')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddVideo