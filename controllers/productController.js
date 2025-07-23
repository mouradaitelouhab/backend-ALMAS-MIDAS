const Product = require('../models/Product');
const { getAllProducts: getMockProducts, getProductById: getMockProductById } = require('../populateDB');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/products');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload product image
const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const imageUrl = `/uploads/products/${req.file.filename}`;
    
    res.json({
      success: true,
      imageUrl: imageUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading image'
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      minPrice, 
      maxPrice, 
      search,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    let products;
    
    try {
      // Try to get products from database first
      let query = {};
      
      // Apply filters to database query
      if (category) {
        query.category = category;
      }
      
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      // Apply sorting
      let sort = {};
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

      // Get total count for pagination
      const totalProducts = await Product.countDocuments(query);
      
      // Apply pagination
      const skip = (page - 1) * limit;
      
      products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      // Convert to plain objects for consistency
      products = products.map(p => p.toObject());

      res.json({
        success: true,
        data: products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts: totalProducts,
          hasNext: skip + products.length < totalProducts,
          hasPrev: skip > 0
        }
      });
      
      console.log(`[PRODUCT] Fetched products from database. Count: ${products.length}`);
      return;
      
    } catch (dbError) {
      console.warn('[PRODUCT] Database error, falling back to mock data:', dbError.message);
      
      // Fallback to mock data
      products = getMockProducts();

      // Apply filters to mock data
      if (category) {
        products = products.filter(p => p.category === category);
      }

      if (minPrice) {
        products = products.filter(p => p.price >= parseFloat(minPrice));
      }

      if (maxPrice) {
        products = products.filter(p => p.price <= parseFloat(maxPrice));
      }

      if (search) {
        const searchLower = search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      products.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        if (sortBy === 'price') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }
        
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedProducts = products.slice(startIndex, endIndex);

      res.json({
        success: true,
        data: paginatedProducts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(products.length / limit),
          totalProducts: products.length,
          hasNext: endIndex < products.length,
          hasPrev: startIndex > 0
        }
      });
      
      console.log(`[PRODUCT] Fetched products from mock data. Count: ${paginatedProducts.length}`);
    }
  } catch (error) {
    console.error("[PRODUCT] Error fetching all products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    let product;
    
    try {
      // Try database first
      product = await Product.findById(req.params.id);
      if (product) {
        product = product.toObject();
      }
    } catch (dbError) {
      console.warn('[PRODUCT] Database error, falling back to mock data:', dbError.message);
    }
    
    // Fallback to mock data if not found in database
    if (!product) {
      product = getMockProductById(req.params.id);
    }
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search term required'
      });
    }

    let products = getMockProducts();
    const searchLower = q.toLowerCase();

    // Apply search filter
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    );

    // Apply additional filters
    if (category) {
      products = products.filter(p => p.category === category);
    }

    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedProducts,
      searchTerm: q,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(products.length / limit),
        totalProducts: products.length,
        hasNext: endIndex < products.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stockQuantity,
      imageURLs,
      specifications,
      tags
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, and category are required'
      });
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      stockQuantity: parseInt(stockQuantity) || 0,
      imageURLs: imageURLs || [],
      specifications: specifications || {},
      tags: tags || [],
      seller: req.user._id || req.user.id,
      rating: 0,
      reviewCount: 0
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Error creating product'
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...updateData,
        price: updateData.price ? parseFloat(updateData.price) : undefined,
        stockQuantity: updateData.stockQuantity ? parseInt(updateData.stockQuantity) : undefined
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Error updating product'
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: deletedProduct,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error deleting product'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  upload
};


