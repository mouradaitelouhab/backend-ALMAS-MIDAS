const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { getProductById } = require('../populateDB');

// Simple in-memory order storage for demo
let userOrders = new Map();

const getUserId = (req) => req.user?._id || req.user?.id || 'demo-user';

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    let orders;
    
    try {
      // Try database first
      orders = await Order.find({}).populate("user", "username email").populate("items.product", "name price");
    } catch (dbError) {
      console.warn('[ORDER] Database error, falling back to mock data:', dbError.message);
      // Fallback to mock data - return all orders from all users
      orders = [];
      for (let [userId, userOrderList] of userOrders) {
        orders.push(...userOrderList);
      }
    }
    
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's orders
const getMyOrders = async (req, res) => {
  try {
    const userId = getUserId(req);
    let orders;
    
    try {
      // Try database first
      orders = await Order.find({ user: userId }).populate("items.product", "name price");
    } catch (dbError) {
      console.warn('[ORDER] Database error, falling back to mock data:', dbError.message);
      // Fallback to mock data
      orders = userOrders.get(userId) || [];
    }
    
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    let order;
    
    try {
      // Try database first
      order = await Order.findById(req.params.id).populate("user", "username email").populate("items.product", "name price");
    } catch (dbError) {
      console.warn('[ORDER] Database error, falling back to mock data:', dbError.message);
      // Fallback to mock data - search through all user orders
      for (let [userId, userOrderList] of userOrders) {
        order = userOrderList.find(o => o.id === req.params.id);
        if (order) break;
      }
    }
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new order
const createOrder = async (req, res) => {
  const { shippingAddress, billingAddress } = req.body;

  try {
    const userId = getUserId(req);
    let cart;
    let orderItems = [];
    let totalAmount = 0;

    try {
      // Try to get cart from database
      cart = await Cart.findOne({ user: userId }).populate("items.product");
      
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }

      for (const item of cart.items) {
        let product;
        
        try {
          product = await Product.findById(item.product._id);
        } catch (dbError) {
          // Fallback to mock data
          product = getProductById(item.product._id || item.product);
        }

        if (!product || product.stockQuantity < item.quantity) {
          return res.status(400).json({ success: false, message: `Not enough stock for ${item.product?.name || 'product'}` });
        }

        orderItems.push({
          product: item.product._id || item.product,
          quantity: item.quantity,
          price: item.price,
          name: product.name,
          image: product.images?.[0] || '/images/placeholder.jpg'
        });
        totalAmount += item.quantity * item.price;

        // Try to reduce product stock in database
        try {
          if (product.save) {
            product.stockQuantity -= item.quantity;
            await product.save();
          }
        } catch (stockError) {
          console.warn('[ORDER] Could not update stock in database:', stockError.message);
        }
      }

      // Try to create order in database
      try {
        const newOrder = new Order({
          user: userId,
          items: orderItems,
          totalAmount,
          shippingAddress: shippingAddress || req.user?.shippingAddress,
          billingAddress: billingAddress || req.user?.billingAddress,
          paymentStatus: "Pending",
          orderStatus: "Pending",
        });

        await newOrder.save();

        // Clear the user's cart after order creation
        cart.items = [];
        await cart.save();

        res.status(201).json({ success: true, message: "Order created successfully", data: newOrder });
        return;
        
      } catch (dbError) {
        console.warn('[ORDER] Database error creating order, falling back to mock storage:', dbError.message);
      }
      
    } catch (cartError) {
      console.warn('[ORDER] Cart database error, using fallback:', cartError.message);
      return res.status(400).json({ success: false, message: "Cart not found or empty" });
    }

    // Fallback: create order in mock storage
    const orderId = Date.now().toString();
    const mockOrder = {
      id: orderId,
      _id: orderId,
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress: shippingAddress || {},
      billingAddress: billingAddress || {},
      paymentStatus: "Pending",
      orderStatus: "Pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store in mock storage
    if (!userOrders.has(userId)) {
      userOrders.set(userId, []);
    }
    userOrders.get(userId).push(mockOrder);

    res.status(201).json({ success: true, message: "Order created successfully", data: mockOrder });

  } catch (error) {
    console.error('[ORDER] Error creating order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    let order;
    
    try {
      // Try database first
      order = await Order.findById(req.params.id);
      if (order) {
        order.orderStatus = status;
        await order.save();
        res.json({ success: true, message: "Order status updated successfully", data: order });
        return;
      }
    } catch (dbError) {
      console.warn('[ORDER] Database error, falling back to mock data:', dbError.message);
    }
    
    // Fallback to mock data
    let found = false;
    for (let [userId, userOrderList] of userOrders) {
      const orderIndex = userOrderList.findIndex(o => o.id === req.params.id);
      if (orderIndex !== -1) {
        userOrderList[orderIndex].orderStatus = status;
        userOrderList[orderIndex].updatedAt = new Date();
        order = userOrderList[orderIndex];
        found = true;
        break;
      }
    }
    
    if (!found) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated successfully", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};


