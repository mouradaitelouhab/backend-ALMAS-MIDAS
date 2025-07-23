const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { getProductById } = require('../populateDB');

const getUserId = (req) => req.user._id || req.user.id || 'demo-user';

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    
    // Try to get cart from database first
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      // Create empty cart if none exists
      cart = new Cart({
        user: userId,
        items: []
      });
      await cart.save();
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.2; // 20% TVA
    const shipping = subtotal > 50000 ? 0 : 500; // Free shipping over 500€
    const total = subtotal + tax + shipping;

    const cartData = {
      items: cart.items.map(item => ({
        id: item.product?._id || item.product,
        name: item.product?.name || 'Product',
        price: item.price,
        image: item.product?.images?.[0] || '/images/placeholder.jpg',
        quantity: item.quantity,
        stockQuantity: item.product?.stockQuantity || 0
      })),
      subtotal,
      tax,
      shipping,
      total
    };
    
    res.json({ 
      success: true, 
      cart: cartData
    });
  } catch (error) {
    console.error('Error getting cart:', error);
    
    // Fallback to mock data if database fails
    const emptyCart = { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };
    res.json({ 
      success: true, 
      cart: emptyCart
    });
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, options = {} } = req.body;
    const userId = getUserId(req);

    // Try to get product from database first, fallback to mock data
    let product;
    try {
      product = await Product.findById(productId);
    } catch (dbError) {
      // Fallback to mock data
      product = getProductById(productId);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ success: false, message: "Not enough stock available" });
    }

    // Get or create user cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: []
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId && JSON.stringify(item.options || {}) === JSON.stringify(options)
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price,
        options: options
      });
    }

    await cart.save();

    // Calculate totals for response
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.2;
    const shipping = subtotal > 50000 ? 0 : 500;
    const total = subtotal + tax + shipping;

    const cartData = {
      items: cart.items.map(item => ({
        id: item.product,
        name: product.name,
        price: item.price,
        image: product.images?.[0] || '/images/placeholder.jpg',
        quantity: item.quantity,
        options: item.options,
        stockQuantity: product.stockQuantity
      })),
      subtotal,
      tax,
      shipping,
      total
    };

    res.status(200).json({ 
      success: true, 
      cart: cartData,
      message: 'Article ajouté au panier'
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = getUserId(req);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    // Populate and calculate totals
    await cart.populate('items.product');
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.2;
    const shipping = subtotal > 50000 ? 0 : 500;
    const total = subtotal + tax + shipping;

    const cartData = {
      items: cart.items.map(item => ({
        id: item.product._id,
        name: item.product.name,
        price: item.price,
        image: item.product.images?.[0] || '/images/placeholder.jpg',
        quantity: item.quantity,
        stockQuantity: item.product.stockQuantity
      })),
      subtotal,
      tax,
      shipping,
      total
    };

    res.json({ 
      success: true, 
      cart: cartData
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = getUserId(req);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    // Populate and calculate totals
    await cart.populate('items.product');
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.2;
    const shipping = subtotal > 50000 ? 0 : 500;
    const total = subtotal + tax + shipping;

    const cartData = {
      items: cart.items.map(item => ({
        id: item.product._id,
        name: item.product.name,
        price: item.price,
        image: item.product.images?.[0] || '/images/placeholder.jpg',
        quantity: item.quantity,
        stockQuantity: item.product.stockQuantity
      })),
      subtotal,
      tax,
      shipping,
      total
    };

    res.json({ 
      success: true, 
      cart: cartData,
      message: 'Article supprimé du panier'
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    const emptyCart = { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };

    res.json({ 
      success: true, 
      cart: emptyCart,
      message: 'Panier vidé'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
};


