const mongoose = require('mongoose');

// Realistic product data with 20 jewelry items
const products = [
  // RINGS (5 products)
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bague Solitaire Diamant Luxe',
    description: 'Magnifique bague solitaire en or jaune 18k sertie d\'un diamant de 1 carat. Cette pièce intemporelle symbolise l\'amour éternel avec son design classique et élégant.',
    price: 2999,
    imageURLs: ['/images/products/ring1.jpg'],
    category: 'rings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 5,
    status: 'Active',
    rating: 4.9,
    reviews: 127,
    specifications: {
      material: 'Or jaune 18k',
      gemstone: 'Diamant 1ct',
      size: 'Ajustable',
      weight: '3.2g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bague Brillant Rond Classique',
    description: 'Bague de fiançailles classique en or blanc 18k avec diamant rond brillant. Design intemporel avec sertissage 6 griffes pour une sécurité optimale.',
    price: 1899,
    imageURLs: ['/images/products/ring2.jpg'],
    category: 'rings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 8,
    status: 'Active',
    rating: 4.8,
    reviews: 89,
    specifications: {
      material: 'Or blanc 18k',
      gemstone: 'Diamant 0.75ct',
      size: 'Ajustable',
      weight: '2.8g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bague Lora Solitaire Délicate',
    description: 'Bague solitaire délicate avec design moderne et épuré. Parfaite pour un style minimaliste et sophistiqué.',
    price: 1299,
    imageURLs: ['/images/products/ring3.jpg'],
    category: 'rings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 12,
    status: 'Active',
    rating: 4.7,
    reviews: 156,
    specifications: {
      material: 'Or rose 14k',
      gemstone: 'Diamant 0.5ct',
      size: 'Ajustable',
      weight: '2.1g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bague Harper Classique',
    description: 'Design classique Harper avec diamant rond dans un sertissage traditionnel. Élégance intemporelle pour toutes les occasions.',
    price: 1599,
    imageURLs: ['/images/products/ring4.jpg'],
    category: 'rings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 6,
    status: 'Active',
    rating: 4.6,
    reviews: 73,
    specifications: {
      material: 'Or blanc 14k',
      gemstone: 'Diamant 0.6ct',
      size: 'Ajustable',
      weight: '2.5g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bague Solitaire Confort',
    description: 'Bague solitaire avec anneau confort-fit pour un port agréable au quotidien. Design moderne avec finition polie.',
    price: 999,
    imageURLs: ['/images/products/ring5.jpg'],
    category: 'rings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 15,
    status: 'Active',
    rating: 4.5,
    reviews: 203,
    specifications: {
      material: 'Or blanc 14k',
      gemstone: 'Diamant 0.4ct',
      size: 'Ajustable',
      weight: '2.0g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // NECKLACES (5 products)
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Collier Solitaire Oval Core',
    description: 'Collier pendentif avec diamant oval solitaire. Design épuré et moderne, parfait pour un look sophistiqué au quotidien.',
    price: 1799,
    imageURLs: ['/images/products/necklace1.jpg'],
    category: 'necklaces',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 7,
    status: 'Active',
    rating: 4.8,
    reviews: 92,
    specifications: {
      material: 'Or blanc 18k',
      gemstone: 'Diamant oval 0.8ct',
      length: '45cm ajustable',
      weight: '4.2g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Pendentif Diamant Bezel',
    description: 'Pendentif diamant rond de 1.5 carat serti dans un bezel moderne. Chaîne en or incluse pour un ensemble parfait.',
    price: 2299,
    imageURLs: ['/images/products/necklace2.jpg'],
    category: 'necklaces',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 4,
    status: 'Active',
    rating: 4.9,
    reviews: 64,
    specifications: {
      material: 'Or jaune 18k',
      gemstone: 'Diamant rond 1.5ct',
      length: '50cm',
      weight: '6.8g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Collier Athena Diamant',
    description: 'Collier pendentif Athena avec diamant central et design géométrique moderne. Pièce statement pour les occasions spéciales.',
    price: 1599,
    imageURLs: ['/images/products/necklace3.jpg'],
    category: 'necklaces',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 9,
    status: 'Active',
    rating: 4.7,
    reviews: 118,
    specifications: {
      material: 'Or rose 14k',
      gemstone: 'Diamant 0.7ct',
      length: '42cm ajustable',
      weight: '5.1g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Pendentif Victorian Diamant',
    description: 'Pendentif de style victorien avec diamants et design vintage exquis. Pièce de collection pour les amateurs d\'antiquités.',
    price: 3299,
    imageURLs: ['/images/products/necklace4.jpg'],
    category: 'necklaces',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 2,
    status: 'Active',
    rating: 4.9,
    reviews: 45,
    specifications: {
      material: 'Or jaune 18k',
      gemstone: 'Diamants multiples 2ct total',
      length: '55cm',
      weight: '8.5g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Collier Tiffany Diamonds by the Yard',
    description: 'Collier inspiré du célèbre design Tiffany avec diamant unique suspendu. Élégance discrète et raffinée.',
    price: 899,
    imageURLs: ['/images/products/necklace5.jpg'],
    category: 'necklaces',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 18,
    status: 'Active',
    rating: 4.6,
    reviews: 87,
    specifications: {
      material: 'Or blanc 14k',
      gemstone: 'Diamant 0.3ct',
      length: '40cm ajustable',
      weight: '3.5g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // BRACELETS (5 products)
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Set Bracelets Luxe Or',
    description: 'Collection de bracelets empilables en or avec différentes textures et finitions. Set de 4 pièces pour un look layered moderne.',
    price: 1299,
    imageURLs: ['/images/products/bracelet1.jpg'],
    category: 'bracelets',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 10,
    status: 'Active',
    rating: 4.7,
    reviews: 134,
    specifications: {
      material: 'Or 18k',
      gemstone: 'Diamants pavés',
      size: 'Ajustable 16-19cm',
      weight: '12.3g (set complet)'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bracelets Boho Empilables',
    description: 'Bracelets bohème chic avec perles dorées et détails en or 14k. Parfaits pour un style décontracté élégant.',
    price: 599,
    imageURLs: ['/images/products/bracelet2.jpg'],
    category: 'bracelets',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 25,
    status: 'Active',
    rating: 4.5,
    reviews: 189,
    specifications: {
      material: 'Or 14k et perles',
      gemstone: 'Perles naturelles',
      size: 'Élastique universel',
      weight: '8.7g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bracelet Gemmes Luxe',
    description: 'Bracelet stretch avec gemmes colorées et or 14k. Design artisanal avec pierres semi-précieuses sélectionnées.',
    price: 799,
    imageURLs: ['/images/products/bracelet3.jpg'],
    category: 'bracelets',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 8,
    status: 'Active',
    rating: 4.8,
    reviews: 76,
    specifications: {
      material: 'Or 14k',
      gemstone: 'Gemmes mixtes',
      size: 'Stretch 15-20cm',
      weight: '15.2g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Collection Bracelets Élégants',
    description: 'Ensemble de bracelets raffinés en or et argent avec diamants. Design contemporain pour femme moderne.',
    price: 1599,
    imageURLs: ['/images/products/bracelet4.jpg'],
    category: 'bracelets',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 6,
    status: 'Active',
    rating: 4.9,
    reviews: 52,
    specifications: {
      material: 'Or et argent',
      gemstone: 'Diamants',
      size: 'Ajustable',
      weight: '18.5g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Bracelets Tendance Oak & Luna',
    description: 'Bracelets fashion tendance avec design moderne et finitions soignées. Parfaits pour accessoiriser toute tenue.',
    price: 399,
    imageURLs: ['/images/products/bracelet5.jpg'],
    category: 'bracelets',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 30,
    status: 'Active',
    rating: 4.4,
    reviews: 245,
    specifications: {
      material: 'Métal doré',
      gemstone: 'Cristaux',
      size: 'Ajustable',
      weight: '6.8g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // EARRINGS (5 products)
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Boucles d\'Oreilles Diamant Classiques',
    description: 'Puces d\'oreilles classiques avec diamants ronds brillants. Design intemporel parfait pour toutes les occasions.',
    price: 1199,
    imageURLs: ['/images/products/earring1.jpg'],
    category: 'earrings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 12,
    status: 'Active',
    rating: 4.8,
    reviews: 167,
    specifications: {
      material: 'Or blanc 14k',
      gemstone: 'Diamants 0.5ct total',
      size: '5mm',
      weight: '1.8g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Boucles Pendantes Diamant Poire',
    description: 'Boucles d\'oreilles pendantes avec diamants ronds et poires. Design élégant pour les événements spéciaux.',
    price: 2599,
    imageURLs: ['/images/products/earring2.jpg'],
    category: 'earrings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 4,
    status: 'Active',
    rating: 4.9,
    reviews: 83,
    specifications: {
      material: 'Or blanc 18k',
      gemstone: 'Diamants 1.2ct total',
      size: '25mm longueur',
      weight: '4.2g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Puces Diamant Or Jaune',
    description: 'Puces d\'oreilles en or jaune avec diamants sertis 4 griffes. Style classique et intemporel.',
    price: 899,
    imageURLs: ['/images/products/earring3.jpg'],
    category: 'earrings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 20,
    status: 'Active',
    rating: 4.6,
    reviews: 198,
    specifications: {
      material: 'Or jaune 14k',
      gemstone: 'Diamants 0.4ct total',
      size: '4mm',
      weight: '1.5g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Boucles Fleur Multi-Diamants',
    description: 'Boucles d\'oreilles en forme de fleur avec multiples diamants. Design féminin et sophistiqué.',
    price: 1799,
    imageURLs: ['/images/products/earring4.jpg'],
    category: 'earrings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 7,
    status: 'Active',
    rating: 4.7,
    reviews: 124,
    specifications: {
      material: 'Or blanc 14k',
      gemstone: 'Diamants 0.8ct total',
      size: '8mm',
      weight: '2.8g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Boucles Diamant Jaune Fancy',
    description: 'Boucles d\'oreilles avec diamants jaunes fancy dans un sertissage or blanc. Pièce rare et précieuse.',
    price: 4599,
    imageURLs: ['/images/products/earring5.jpg'],
    category: 'earrings',
    sellerID: new mongoose.Types.ObjectId(),
    stockQuantity: 2,
    status: 'Active',
    rating: 5.0,
    reviews: 28,
    specifications: {
      material: 'Or blanc 18k',
      gemstone: 'Diamants jaunes 1.5ct total',
      size: '12mm',
      weight: '5.2g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock users data
const mockUsers = [
  {
    _id: new mongoose.Types.ObjectId(),
    username: 'adminUser',
    email: 'admin@almas-dimas.com',
    role: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: 'sellerUser',
    email: 'seller@almas-dimas.com',
    role: 'Seller',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: 'clientUser',
    email: 'client@almas-dimas.com',
    role: 'Buyer',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock categories
const mockCategories = [
  {
    _id: new mongoose.Types.ObjectId(),
    categoryName: 'rings',
    displayName: 'Bagues',
    description: 'Bagues de fiançailles, alliances et bagues de mode',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    categoryName: 'necklaces',
    displayName: 'Colliers',
    description: 'Colliers, pendentifs et chaînes',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    categoryName: 'bracelets',
    displayName: 'Bracelets',
    description: 'Bracelets, bangles et bracelets de charme',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    categoryName: 'earrings',
    displayName: 'Boucles d\'oreilles',
    description: 'Puces, créoles et boucles pendantes',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Functions to get data
const getAllProducts = () => {
  return products.map(product => ({
    ...product,
    _id: product._id.toString(),
    sellerID: product.sellerID.toString()
  }));
};

const getProductById = (id) => {
  const product = products.find(p => p._id.toString() === id);
  if (product) {
    return {
      ...product,
      _id: product._id.toString(),
      sellerID: product.sellerID.toString()
    };
  }
  return null;
};

const getProductsByCategory = (category) => {
  return products
    .filter(p => p.category === category)
    .map(product => ({
      ...product,
      _id: product._id.toString(),
      sellerID: product.sellerID.toString()
    }));
};

module.exports = {
  mockUsers,
  mockProducts: products,
  mockCategories,
  getAllProducts,
  getProductById,
  getProductsByCategory
};
