import newsletterModel from "../models/newsletterModel.js";

// Abone ekle
const addNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.json({ success: false, message: "E-posta zorunlu" });
        const exists = await newsletterModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "Bu e-posta zaten abone" });
        await newsletterModel.create({ email });
        res.json({ success: true, message: "Abonelik başarılı" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Aboneleri listele
const listNewsletter = async (req, res) => {
    try {
        const list = await newsletterModel.find({}).sort({ date: -1 });
        res.json({ success: true, list });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Abone sil
const removeNewsletter = async (req, res) => {
    try {
        const { id } = req.body;
        await newsletterModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Abone silindi" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addNewsletter, listNewsletter, removeNewsletter }; 