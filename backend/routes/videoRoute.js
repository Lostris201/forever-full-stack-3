import express from 'express';
import { listVideos, addVideo, removeVideo, singleVideo } from '../controllers/videoController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const videoRouter = express.Router();

videoRouter.post('/add', 
    adminAuth, 
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ]), 
    addVideo
);
videoRouter.post('/remove', adminAuth, removeVideo);
videoRouter.post('/single', singleVideo);
videoRouter.get('/list', listVideos);

export default videoRouter;