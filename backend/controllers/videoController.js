import { v2 as cloudinary } from "cloudinary";
import videoModel from "../models/videoModel.js";

// function for add video
const addVideo = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const videoFile = req.files.video && req.files.video[0];
        const thumbnailFile = req.files.thumbnail && req.files.thumbnail[0];

        if (!videoFile) {
            return res.json({ success: false, message: "Video file is required" });
        }

        // Upload video to cloudinary
        const videoResult = await cloudinary.uploader.upload(videoFile.path, {
            resource_type: 'video',
            folder: 'videos'
        });

        // Upload thumbnail if exists
        let thumbnailUrl = '';
        if (thumbnailFile) {
            const thumbnailResult = await cloudinary.uploader.upload(thumbnailFile.path, {
                resource_type: 'image',
                folder: 'video-thumbnails'
            });
            thumbnailUrl = thumbnailResult.secure_url;
        }

        const videoData = {
            title,
            description,
            category,
            videoUrl: videoResult.secure_url,
            thumbnailUrl,
            date: Date.now()
        };

        const video = new videoModel(videoData);
        await video.save();

        res.json({ success: true, message: "Video Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for list videos
const listVideos = async (req, res) => {
    try {
        const videos = await videoModel.find({}).sort({ date: -1 });
        console.log('Listelenen videolar:', videos); // Kontrol için log ekleyelim
        
        if (!videos || videos.length === 0) {
            return res.json({ success: false, message: "Hiç video bulunamadı" });
        }
        
        res.json({ success: true, videos });
    } catch (error) {
        console.log('Video listeleme hatası:', error);
        res.json({ success: false, message: error.message });
    }
};

// function for removing video
const removeVideo = async (req, res) => {
    try {
        await videoModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Video Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for single video info
const singleVideo = async (req, res) => {
    try {
        const { videoId } = req.body;
        const video = await videoModel.findById(videoId);
        res.json({ success: true, video });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { listVideos, addVideo, removeVideo, singleVideo };