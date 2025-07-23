const mongoose = require('mongoose');
const Product = require('./models/Product');

// Use the category IDs from the previous output
const categoryIds = {
  'Bagues': '6880b951b464c63a5e3b6fd5',
  'Colliers': '6880b951b464c63a5e3b6fd6',
  'Bracelets': '6880b951b464c63a5e3b6fd7',
  'Boucles d\'oreilles': '6880b951b464c63a5e3b6fd8'
};

const products = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bague Solitaire Diamant Luxe',
    description: 'Magnifique bague solitaire en or jaune 18k sertie d\'un diamant de 1 carat. Cette pièce intemporelle symbolise l\'amour éternel avec son design classique et élégant.',
    price: 2999,
    stockQuantity: 5,
    categoryID: new mongoose.Types.ObjectId(categoryIds['Bagues']),
    sellerID: new mongoose.Types.ObjectId(),
    imageURLs: ['/images/products/ring1.jpg'],
    rating: 4.9,
    reviewCount: 127,
    productType: 'Ring',
    metal: 'Gold 18K',
    status: 'Active'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bague Brillant Rond Classique',
    description: 'Bague de fiançailles classique en or blanc 18k avec diamant rond brillant. Design intemporel avec sertissage 6 griffes pour une sécurité optimale.',
    price: 1899,
    stockQuantity: 8,
    categoryID: new mongoose.Types.ObjectId(categoryIds['Bagues']),
    sellerID: new mongoose.Types.ObjectId(),
    imageURLs: ['/images/products/ring2.jpg'],
    rating: 4.8,
    reviewCount: 89,
    productType: 'Ring',
    metal: 'White Gold',
    status: 'Active'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Collier Solitaire Oval Core',
    description: 'Collier pendentif avec diamant oval solitaire. Design épuré et moderne, parfait pour un look sophistiqué au quotidien.',
    price: 1799,
    stockQuantity: 3,
    categoryID: new mongoose.Types.ObjectId(categoryIds['Colliers']),
    sellerID: new mongoose.Types.ObjectId(),
    imageURLs: ['/images/products/necklace1.jpg'],
    rating: 4.7,
    reviewCount: 92,
    productType: 'Necklace',
    metal: 'Gold 18K',
    status: 'Active'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bracelet Gemmes Luxe',
    description: 'Bracelet stretch avec gemmes colorées et or 14k. Design artisanal avec pierres semi-précieuses sélectionnées.',
    price: 799,
    stockQuantity: 12,
    categoryID: new mongoose.Types.ObjectId(categoryIds['Bracelets']),
    sellerID: new mongoose.Types.ObjectId(),
    imageURLs: ['/images/products/bracelet1.jpg'],
    rating: 4.6,
    reviewCount: 76,
    productType: 'Bracelet',
    metal: 'Gold 14K',
    status: 'Active'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Boucles d\'Oreilles Diamant Classiques',
    description: 'Puces d\'oreilles classiques avec diamants ronds brillants. Design intemporel parfait pour toutes les occasions.',
    price: 1199,
    stockQuantity: 6,
    categoryID: new mongoose.Types.ObjectId(categoryIds['Boucles d\'oreilles']),
    sellerID: new mongoose.Types.ObjectId(),
    imageURLs: ['/images/products/earrings1.jpg'],
    rating: 4.8,
    reviewCount: 167,
    productType: 'Earrings',
    metal: 'White Gold',
    status: 'Active'
  }
];

async function createProducts() {
  try {
    await mongoose.connect('mongodb://localhost:27017/almasdimas');
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    await Product.insertMany(products);
    
    const count = await Product.countDocuments();
    console.log(`Successfully inserted ${count} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createProducts();
