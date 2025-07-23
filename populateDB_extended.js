// Extended product database with more jewelry items
// This creates a comprehensive catalog for the jewelry store

const extendedMockProducts = [
  {
    id: 1,
    name: 'Bracelet Tennis Diamants',
    description: 'Bracelet tennis composé de 38 diamants ronds taille brillant de qualité exceptionnelle, monté sur or blanc.',
    price: 124000,
    originalPrice: 155000,
    category: 'bracelets',
    images: ['/images/products/bracelet1.jpg', '/images/products/bracelet2.jpg'],
    rating: 4.9,
    reviewCount: 156,
    stockQuantity: 4,
    specifications: {
      metal: 'Or blanc 18 carats',
      gemstone: 'Diamants naturels',
      color: 'F-G',
      cut: 'Brillant',
      length: '18 cm'
    },
    status: 'Active'
  },
  {
    id: 2,
    name: 'Boucles d\'Oreilles Puces Diamant',
    description: 'Paire de puces d\'oreilles en or jaune 18 carats, chacune sertie d\'un diamant rond de 0.5 carat.',
    price: 32000,
    originalPrice: 36000,
    category: 'earrings',
    images: ['/images/products/earrings1.jpg', '/images/products/earrings2.jpg'],
    rating: 4.8,
    reviewCount: 203,
    stockQuantity: 8,
    specifications: {
      metal: 'Or jaune 18 carats',
      gemstone: 'Diamants naturels',
      color: 'G-H',
      cut: 'Brillant',
      caratWeight: '1.0 ct total'
    },
    status: 'Active'
  },
  {
    id: 3,
    name: 'Collier Chaîne Or',
    description: 'Collier chaîne en or jaune 18 carats, maille forçat, longueur 45 cm.',
    price: 18500,
    originalPrice: 22000,
    category: 'necklaces',
    images: ['/images/products/necklace1.jpg', '/images/products/necklace2.jpg'],
    rating: 4.7,
    reviewCount: 89,
    stockQuantity: 12,
    specifications: {
      metal: 'Or jaune 18 carats',
      length: '45 cm',
      weight: '15.2g',
      clasp: 'Mousqueton'
    },
    status: 'Active'
  },
  {
    id: 4,
    name: 'Bague Solitaire Diamant',
    description: 'Bague solitaire en platine sertie d\'un diamant rond de 2 carats, taille brillant.',
    price: 285000,
    originalPrice: 320000,
    category: 'rings',
    images: ['/images/products/ring1.jpg', '/images/products/ring2.jpg'],
    rating: 5.0,
    reviewCount: 45,
    stockQuantity: 2,
    specifications: {
      metal: 'Platine 950',
      gemstone: 'Diamant naturel',
      caratWeight: '2.0 ct',
      color: 'D',
      clarity: 'VVS1',
      cut: 'Brillant'
    },
    status: 'Active'
  },
  {
    id: 5,
    name: 'Montre Diamants Luxe',
    description: 'Montre de luxe avec cadran serti de diamants, bracelet en or blanc.',
    price: 450000,
    originalPrice: 500000,
    category: 'watches',
    images: ['/images/products/watch_diamond_1.jpg', '/images/products/watch_diamond_2.jpg'],
    rating: 4.9,
    reviewCount: 23,
    stockQuantity: 1,
    specifications: {
      metal: 'Or blanc 18 carats',
      movement: 'Automatique',
      waterResistance: '50m',
      gemstone: 'Diamants naturels'
    },
    status: 'Active'
  },
  {
    id: 6,
    name: 'Bague Émeraude Art Déco',
    description: 'Bague vintage style Art Déco sertie d\'une émeraude centrale entourée de diamants.',
    price: 195000,
    originalPrice: 225000,
    category: 'rings',
    images: ['/images/products/ring_emerald_1.jpg', '/images/products/ring_emerald_2.jpg'],
    rating: 4.8,
    reviewCount: 67,
    stockQuantity: 3,
    specifications: {
      metal: 'Or blanc 18 carats',
      gemstone: 'Émeraude naturelle',
      caratWeight: '1.5 ct',
      color: 'Vert intense',
      style: 'Art Déco'
    },
    status: 'Active'
  },
  {
    id: 7,
    name: 'Collier Choker Diamants',
    description: 'Collier choker moderne serti de diamants, parfait pour les occasions spéciales.',
    price: 85000,
    originalPrice: 95000,
    category: 'necklaces',
    images: ['/images/products/necklace_choker_1.jpg', '/images/products/necklace_choker_2.jpg'],
    rating: 4.6,
    reviewCount: 124,
    stockQuantity: 6,
    specifications: {
      metal: 'Or rose 18 carats',
      gemstone: 'Diamants naturels',
      length: '35 cm',
      style: 'Moderne'
    },
    status: 'Active'
  },
  {
    id: 8,
    name: 'Boucles d\'Oreilles Créoles Perles',
    description: 'Élégantes créoles ornées de perles de culture, parfaites pour un look sophistiqué.',
    price: 24500,
    originalPrice: 28000,
    category: 'earrings',
    images: ['/images/products/earrings_pearl_1.jpg', '/images/products/earrings_pearl_2.jpg'],
    rating: 4.7,
    reviewCount: 189,
    stockQuantity: 10,
    specifications: {
      metal: 'Or jaune 18 carats',
      gemstone: 'Perles de culture',
      diameter: '3 cm',
      pearlSize: '8-9 mm'
    },
    status: 'Active'
  },
  {
    id: 9,
    name: 'Bracelet Manchette Diamants',
    description: 'Bracelet manchette large serti de diamants, pièce statement pour les grandes occasions.',
    price: 165000,
    originalPrice: 185000,
    category: 'bracelets',
    images: ['/images/products/cuff_diamond_1.jpg', '/images/products/cuff_diamond_2.jpg'],
    rating: 4.9,
    reviewCount: 78,
    stockQuantity: 2,
    specifications: {
      metal: 'Or blanc 18 carats',
      gemstone: 'Diamants naturels',
      width: '2.5 cm',
      caratWeight: '3.5 ct total'
    },
    status: 'Active'
  },
  {
    id: 10,
    name: 'Bague Rubis Princesse',
    description: 'Bague royale sertie d\'un rubis birman entouré de diamants, taille princesse.',
    price: 225000,
    originalPrice: 260000,
    category: 'rings',
    images: ['/images/products/ring_ruby_1.jpg', '/images/products/ring_ruby_2.jpg'],
    rating: 5.0,
    reviewCount: 34,
    stockQuantity: 1,
    specifications: {
      metal: 'Platine 950',
      gemstone: 'Rubis birman',
      caratWeight: '2.2 ct',
      color: 'Rouge pigeon',
      origin: 'Birmanie'
    },
    status: 'Active'
  },
  {
    id: 11,
    name: 'Pendentif Cœur Diamants',
    description: 'Pendentif romantique en forme de cœur serti de diamants, symbole d\'amour éternel.',
    price: 45000,
    originalPrice: 52000,
    category: 'necklaces',
    images: ['/images/products/pendant_heart_1.jpg', '/images/products/pendant_heart_2.jpg'],
    rating: 4.8,
    reviewCount: 156,
    stockQuantity: 8,
    specifications: {
      metal: 'Or rose 18 carats',
      gemstone: 'Diamants naturels',
      caratWeight: '0.75 ct total',
      chainLength: '45 cm'
    },
    status: 'Active'
  },
  {
    id: 12,
    name: 'Boucles d\'Oreilles Créoles Or',
    description: 'Créoles classiques en or, design intemporel pour un port quotidien élégant.',
    price: 15500,
    originalPrice: 18000,
    category: 'earrings',
    images: ['/images/products/earrings_hoops_1.jpg', '/images/products/earrings_hoops_2.jpg'],
    rating: 4.5,
    reviewCount: 267,
    stockQuantity: 15,
    specifications: {
      metal: 'Or jaune 18 carats',
      diameter: '2.5 cm',
      weight: '8.5g',
      closure: 'Clip sécurisé'
    },
    status: 'Active'
  },
  {
    id: 13,
    name: 'Bague Saphir Bleu Royal',
    description: 'Bague exceptionnelle sertie d\'un saphir bleu de Ceylan, entouré de diamants.',
    price: 175000,
    originalPrice: 200000,
    category: 'rings',
    images: ['/images/products/ring_sapphire_1.jpg', '/images/products/ring_sapphire_2.jpg'],
    rating: 4.9,
    reviewCount: 52,
    stockQuantity: 2,
    specifications: {
      metal: 'Or blanc 18 carats',
      gemstone: 'Saphir de Ceylan',
      caratWeight: '1.8 ct',
      color: 'Bleu royal',
      origin: 'Sri Lanka'
    },
    status: 'Active'
  },
  {
    id: 14,
    name: 'Chaîne Or Maille Forçat',
    description: 'Chaîne classique en or, maille forçat, parfaite pour porter vos pendentifs préférés.',
    price: 12500,
    originalPrice: 15000,
    category: 'necklaces',
    images: ['/images/products/chain_gold_1.jpg', '/images/products/chain_gold_2.jpg'],
    rating: 4.4,
    reviewCount: 198,
    stockQuantity: 20,
    specifications: {
      metal: 'Or jaune 18 carats',
      length: '50 cm',
      weight: '12.8g',
      linkType: 'Forçat'
    },
    status: 'Active'
  },
  {
    id: 15,
    name: 'Parure Diamants Complète',
    description: 'Parure complète comprenant collier, boucles d\'oreilles et bracelet assortis.',
    price: 285000,
    originalPrice: 325000,
    category: 'sets',
    images: ['/images/products/set_diamond_1.jpg', '/images/products/set_diamond_2.jpg'],
    rating: 5.0,
    reviewCount: 28,
    stockQuantity: 1,
    specifications: {
      metal: 'Or blanc 18 carats',
      gemstone: 'Diamants naturels',
      caratWeight: '5.5 ct total',
      pieces: '3 pièces'
    },
    status: 'Active'
  }
];

const mockCategories = [
  { id: 1, name: 'rings', displayName: 'Bagues', description: 'Bagues de fiançailles et alliances' },
  { id: 2, name: 'necklaces', displayName: 'Colliers', description: 'Colliers et pendentifs' },
  { id: 3, name: 'earrings', displayName: 'Boucles d\'oreilles', description: 'Boucles d\'oreilles et puces' },
  { id: 4, name: 'bracelets', displayName: 'Bracelets', description: 'Bracelets et gourmettes' },
  { id: 5, name: 'watches', displayName: 'Montres', description: 'Montres de luxe' },
  { id: 6, name: 'sets', displayName: 'Parures', description: 'Parures et ensembles assortis' }
];

const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@almasdimas.com',
    role: 'Admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    id: 2,
    username: 'testuser',
    email: 'test@example.com',
    role: 'Buyer',
    firstName: 'Test',
    lastName: 'User'
  }
];

// Simple in-memory storage for development
let products = [...extendedMockProducts];
let categories = [...mockCategories];
let users = [...mockUsers];
let cart = [];
let orders = [];

// Export functions to access data
const getAllProducts = () => products;
const getProductById = (id) => products.find(p => p.id == id);
const getCategories = () => categories;
const getUsers = () => users;
const getCart = () => cart;
const addToCart = (item) => cart.push(item);
const clearCart = () => cart = [];
const getOrders = () => orders;
const addOrder = (order) => orders.push(order);

module.exports = {
  getAllProducts,
  getProductById,
  getCategories,
  getUsers,
  getCart,
  addToCart,
  clearCart,
  getOrders,
  addOrder,
  mockProducts: extendedMockProducts,
  mockCategories,
  mockUsers
};

