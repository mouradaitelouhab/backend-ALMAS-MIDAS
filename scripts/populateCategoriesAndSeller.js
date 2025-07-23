const mongoose = require("mongoose");
const Category = require("../models/Category");
const User = require("../models/User"); // Assuming you have a User model

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const populateCategoriesAndSeller = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in the .env file. Cannot populate categories and seller.");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected for categories and seller population...");

    // Clear existing categories and users to avoid duplicates
    await Category.deleteMany({});
    console.log("🗑️ Cleared existing categories.");
    await User.deleteMany({ role: 'seller' }); // Clear only sellers
    console.log("🗑️ Cleared existing sellers.");

    // Create categories
    const categoriesToPopulate = [
      { categoryName: "Bagues", description: "Collection de bagues élégantes" },
      { categoryName: "Colliers", description: "Colliers et pendentifs" },
      { categoryName: "Bracelets", description: "Bracelets de luxe" },
      { categoryName: "Boucles d'oreilles", description: "Boucles d'oreilles raffinées" },
    ];

    const insertedCategories = [];
    for (const catData of categoriesToPopulate) {
      const newCat = new Category(catData);
      await newCat.save(); // Save individually to trigger pre-save middleware for slug generation
      insertedCategories.push(newCat);
    }
    console.log(`✅ Successfully inserted ${insertedCategories.length} categories.`);

    // Create a default seller
    const sellerData = {
      username: "test_seller",
      email: "seller@example.com",
      password: "password123", // In a real app, hash this password
      role: "Seller",
    };
    const defaultSeller = await User.create(sellerData);
    console.log(`✅ Successfully created default seller: ${defaultSeller.username} (${defaultSeller._id})`);

    // Save the IDs for later use
    const categoryIds = {};
    insertedCategories.forEach(cat => {
      categoryIds[cat.categoryName] = cat._id;
    });

    console.log("Category IDs:", categoryIds);
    console.log("Seller ID:", defaultSeller._id);

  } catch (err) {
    console.error("❌ Error populating categories and seller:", err.message);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed.");
    }
  }
};

populateCategoriesAndSeller();


