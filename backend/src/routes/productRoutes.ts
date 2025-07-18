import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { chat } from '../controllers/chatController';
import productController from '../controllers/productController';
import authenticationToken from '../middlewares/auth';

const router = express.Router();
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10, // Maximum 10 files
  },
});

// Product management routes
router.post(
  '/add',
  authenticationToken,
  upload.array('images', 10), // Maximum 10 images
  productController.createProduct,
);
router.get('/list-all', productController.getProducts);
router.post('/search', productController.searchProductsByStr as any);
router.get('/search/:category', productController.searchByCategory as any);
router.get('/:id', productController.getProductById);
router.put(
  '/:id',
  authenticationToken,
  upload.array('images', 10),
  productController.updateProduct,
);
router.delete('/:id', authenticationToken, productController.deleteProduct);

// Chat related routes
router.post('/chat', authenticationToken, upload.single('image'), chat);

export default router;