import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const newsletterModel = mongoose.model("Newsletter", newsletterSchema);

export default newsletterModel; 