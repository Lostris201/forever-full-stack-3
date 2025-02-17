import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const AddVideo = ({ token }) => {
    const [video, setVideo] = useState(false)
    const [thumbnail, setThumbnail] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Trending")

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
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log('Hata:', error)
            toast.error(error.response?.data?.message || 'Video yüklenirken bir hata oluştu')
        }
    }

    return (
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
    )
}

export default AddVideo