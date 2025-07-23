const mongoose = require('mongoose');
const Category = require('./models/Category');

const categories = [
  { _id: new mongoose.Types.ObjectId(), categoryName: 'Bagues', description: 'Collection de bagues élégantes', slug: 'bagues' },
  { _id: new mongoose.Types.ObjectId(), categoryName: 'Colliers', description: 'Colliers et pendentifs', slug: 'colliers' },
  { _id: new mongoose.Types.ObjectId(), categoryName: 'Bracelets', description: 'Bracelets tendance', slug: 'bracelets' },
  { _id: new mongoose.Types.ObjectId(), categoryName: 'Boucles d\'oreilles', description: 'Boucles d\'oreilles raffinées', slug: 'boucles-oreilles' }
];

async function createCategories() {
  try {
    await mongoose.connect('mongodb://localhost:27017/almasdimas');
    console.log('Connected to MongoDB');
    
    await Category.deleteMany({});
    await Category.insertMany(categories);
    
    console.log('Categories created successfully');
    
    // Export category IDs for use in products
    const cats = await Category.find({});
    console.log('Category IDs:');
    cats.forEach(cat => console.log(`${cat.categoryName}: ${cat._id}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createCategories();
