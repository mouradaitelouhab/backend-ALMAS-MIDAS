const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticateToken } = require("../middleware/auth");
const { sanitizeInput } = require("../middleware/validation");

// All cart routes require authentication
router.use(authenticateToken);

router.get("/", cartController.getUserCart);
router.post("/add-item", sanitizeInput, cartController.addItemToCart);
router.put("/update-item", sanitizeInput, cartController.updateCartItemQuantity);
router.delete("/remove-item/:productId", cartController.removeItemFromCart);
router.post("/clear", cartController.clearCart);

module.exports = router;


