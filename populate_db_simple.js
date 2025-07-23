const mongoose = require('mongoose');
const Product = require('./models/Product');
const { mockProducts } = require('./populateDB');

async function populateDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb+srv://sosservicesmaroc:8CcWeyFtp97PxOTW@cluster0.rxayflo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('Inserting products...');
    await Product.insertMany(mockProducts);
    
    const count = await Product.countDocuments();
    console.log(`Successfully inserted ${count} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

populateDatabase();
