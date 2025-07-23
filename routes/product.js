const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, requireAdmin, requireSeller, requireProductOwnership } = require('../middleware/auth');
const { validateObjectId, sanitizeInput } = require('../middleware/validation');

// Public routes
router.get('/search', productController.searchProducts);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin/Seller protected routes
router.post('/', authenticateToken, requireSeller, sanitizeInput, productController.createProduct);
router.put('/:id', authenticateToken, requireProductOwnership, sanitizeInput, productController.updateProduct);
router.delete('/:id', authenticateToken, requireProductOwnership, productController.deleteProduct);

// Image upload route
router.post('/upload-image', authenticateToken, requireSeller, productController.upload.single('image'), productController.uploadProductImage);

module.exports = router;


