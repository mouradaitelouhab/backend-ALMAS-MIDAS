const mongoose = require("mongoose");
const Product = require("../models/Product"); // Assuming you have a Product model

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const productsToPopulate = [
  {
    name: "Bague Solitaire Diamant Luxe",
    description: "Magnifique bague solitaire en or jaune 18k sertie d'un diamant de 1 carat. Cette pièce intemporelle symbolise l'amour éternel avec son design classique et élégant.",
    price: 2999,
    stockQuantity: 12,
    category: "Bagues",
    images: ["/uploads/product1.jpg"],
    seller: "60d5ec49f8c7a20015a8b45a", // Replace with a valid seller ID if needed, or remove if not required
    rating: 4.8,
    reviewCount: 127
  },
  {
    name: "Collier Perles Tahiti",
    description: "Collier en perles de Tahiti authentiques avec fermoir en or blanc. Un bijou d'exception pour une élégance rare.",
    price: 1899,
    stockQuantity: 8,
    category: "Colliers",
    images: ["/uploads/product2.jpg"],
    seller: "60d5ec49f8c7a20015a8b45b",
    rating: 4.6,
    reviewCount: 89
  },
  {
    name: "Bracelet Tennis Diamants",
    description: "Bracelet tennis avec diamants brillants, design classique et élégant. Parfait pour ajouter une touche de luxe à votre poignet.",
    price: 3499,
    stockQuantity: 3,
    category: "Bracelets",
    images: ["/uploads/product3.jpg"],
    seller: "60d5ec49f8c7a20015a8b45c",
    rating: 4.9,
    reviewCount: 156
  },
  {
    name: "Bague Brillant Rond Classique",
    description: "Bague de fiançailles classique en or blanc 18k avec diamant rond brillant. Design intemporel avec sertissage 6 griffes pour une sécurité optimale.",
    price: 1899,
    stockQuantity: 15,
    category: "Bagues",
    images: ["/uploads/product4.jpg"],
    seller: "60d5ec49f8c7a20015a8b45a",
    rating: 4.7,
    reviewCount: 89
  },
  {
    name: "Bague Lora Solitaire Délicate",
    description: "Bague solitaire délicate avec design moderne et épuré. Parfaite pour un style minimaliste et sophistiqué.",
    price: 1299,
    stockQuantity: 20,
    category: "Bagues",
    images: ["/uploads/product5.jpg"],
    seller: "60d5ec49f8c7a20015a8b45b",
    rating: 4.5,
    reviewCount: 73
  },
  {
    name: "Bague Harper Classique",
    description: "Design classique Harper avec diamant rond dans un sertissage traditionnel. Élégance intemporelle pour toutes les occasions.",
    price: 1599,
    stockQuantity: 10,
    category: "Bagues",
    images: ["/uploads/product6.jpg"],
    seller: "60d5ec49f8c7a20015a8b45c",
    rating: 4.6,
    reviewCount: 203
  },
  {
    name: "Bague Solitaire Confort",
    description: "Bague solitaire avec anneau confort-fit pour un port agréable au quotidien. Design moderne avec finition polie.",
    price: 999,
    stockQuantity: 25,
    category: "Bagues",
    images: ["/uploads/product7.jpg"],
    seller: "60d5ec49f8c7a20015a8b45a",
    rating: 4.2,
    reviewCount: 92
  },
  {
    name: "Collier Solitaire Oval Core",
    description: "Collier pendentif avec diamant oval solitaire. Design épuré et moderne, parfait pour un look sophistiqué au quotidien.",
    price: 1799,
    stockQuantity: 18,
    category: "Colliers",
    images: ["/uploads/product8.jpg"],
    seller: "60d5ec49f8c7a20015a8b45b",
    rating: 4.7,
    reviewCount: 64
  },
  {
    name: "Pendentif Diamant Bezel",
    description: "Pendentif diamant rond de 1.5 carat serti dans un bezel moderne. Chaîne en or incluse pour un ensemble parfait.",
    price: 2299,
    stockQuantity: 7,
    category: "Colliers",
    images: ["/uploads/product9.jpg"],
    seller: "60d5ec49f8c7a20015a8b45c",
    rating: 4.8,
    reviewCount: 118
  },
  {
    name: "Collier Athena Diamant",
    description: "Collier pendentif Athena avec diamant central et design géométrique moderne. Pièce statement pour les occasions spéciales.",
    price: 1599,
    stockQuantity: 14,
    category: "Colliers",
    images: ["/uploads/product10.jpg"],
    seller: "60d5ec49f8c7a20015a8b45a",
    rating: 4.5,
    reviewCount: 45
  },
  {
    name: "Pendentif Victorian Diamant",
    description: "Pendentif de style victorien avec diamants et design vintage exquis. Pièce de collection pour les amateurs d'antiquités.",
    price: 3299,
    stockQuantity: 5,
    category: "Colliers",
    images: ["/uploads/product11.jpg"],
    seller: "60d5ec49f8c7a20015a8b45b",
    rating: 4.9,
    reviewCount: 87
  },
  {
    name: "Collier Tiffany Diamonds by the Yard",
    description: "Collier inspiré du célèbre design Tiffany avec diamant unique suspendu. Élégance discrète et raffinée.",
    price: 899,
    stockQuantity: 30,
    category: "Colliers",
    images: ["/uploads/product12.jpg"],
    seller: "60d5ec49f8c7a20015a8b45c",
    rating: 4.3,
    reviewCount: 134
  },
  {
    name: "Set Bracelets Luxe Or",
    description: "Collection de bracelets empilables en or avec différentes textures et finitions. Set de 4 pièces pour un look layered moderne.",
    price: 1299,
    stockQuantity: 10,
    category: "Bracelets",
    images: ["/uploads/product13.jpg"],
    seller: "60d5ec49f8c7a20015a8b45a",
    rating: 4.6,
    reviewCount: 189
  },
  {
    name: "Bracelets Boho Empilables",
    description: "Bracelets bohème chic avec perles dorées et détails en or 14k. Parfaits pour un style décontracté élégant.",
    price: 599,
    stockQuantity: 22,
    category: "Bracelets",
    images: ["/uploads/product14.jpg"],
    seller: "60d5ec49f8c7a20015a8b45b",
    rating: 4.1,
    reviewCount: 76
  },
  {
    name: "Bracelet Gemmes Luxe",
    description: "Bracelet stretch avec gemmes colorées et or 14k. Design artisanal avec pierres semi-précieuses sélectionnées.",
    price: 799,
    stockQuantity: 15,
    category: "Bracelets",
    images: ["/uploads/product15.jpg"],
    seller: "60d5ec49f8c7a20015a8b45c",
    rating: 4.4,
    reviewCount: 52
  },
  {
    name: "Collection Bracelets Élégants",
    description: "Ensemble de bracelets raffinés en or et argent avec diamants. Design contemporain pour femme moderne.",
    price: 1599,
    stockQuantity: 8,
    category: "Bracelets",
    images: ["/uploads/product16.jpg"],
    seller: "60d5ec49f8c7a20015a8b45a",
    rating: 4.7,
    reviewCount: 245
  },
  {
    name: "Bracelets Tendance Oak & Luna",
    description: "Bracelets fashion tendance avec design moderne et finitions soignées. Parfaits pour accessoiriser toute tenue.",
    price: 399,
    stockQuantity: 30,
    category: "Bracelets",
    images: ["/uploads/product17.jpg"],
    seller: "60d5ec49f8c7a20015a8b45b",
    rating: 4.0,
    reviewCount: 167
  },
  {
    name: "Boucles d'Oreilles Diamant Classiques",
    description: "Puces d'oreilles classiques avec diamants ronds brillants. Design intemporel parfait pour toutes les occasions.",
    price: 1199,
    stockQuantity: 18,
    category: "Boucles d'oreilles",
    images: ["/uploads/product18.jpg"],
    seller: "60d5ec49f8c7a20015a8b45c",
    rating: 4.8,
    reviewCount: 83
  },
  {
    name: "Boucles Pendantes Diamant Poire",
    description: "Boucles d'oreilles pendantes avec diamants ronds et poires. Design élégant pour les événements spéciaux.",
    price: 2599,
    stockQuantity: 6,
    category: "Boucles d'oreilles",
    images: ["/uploads/product19.jpg"],
    seller: "60d5ec49f8c7a20015a8b45a",
    rating: 4.9,
    reviewCount: 198
  },
  {
    name: "Puces Diamant Or Jaune",
    description: "Puces d'oreilles en or jaune avec diamants sertis 4 griffes. Style classique et intemporel.",
    price: 899,
    stockQuantity: 25,
    category: "Boucles d'oreilles",
    images: ["/uploads/product20.jpg"],
    seller: "60d5ec49f8c7a20015a8b45b",
    rating: 4.2,
    reviewCount: 124
  }
];

const populateProducts = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is not defined in the .env file. Cannot populate products.");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected for product population...");

    // Clear existing products to avoid duplicates on re-runs, or use upsert logic
    // For this scenario, we'll remove all and re-insert for simplicity. 
    // In a real app, you'd want more sophisticated upsert/diff logic.
    await Product.deleteMany({}); 
    console.log("🗑️ Cleared existing products.");

    const insertedProducts = await Product.insertMany(productsToPopulate);
    console.log(`✅ Successfully inserted ${insertedProducts.length} products.`);

  } catch (err) {
    console.error("❌ Error populating products:", err.message);
    // Log specific errors for debugging
    if (err.code === 11000) {
      console.error("Duplicate key error. Ensure product names or other unique fields are unique.");
    }
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed.");
    }
  }
};

populateProducts();


