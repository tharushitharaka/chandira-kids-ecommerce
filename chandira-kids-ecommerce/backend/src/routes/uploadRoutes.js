import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.post('/product-image', protect, authorize('admin'), uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Image file is required');
  }

  res.status(201).json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
});

export default router;
