const mongoose = require('mongoose');
const { mockUsers, mockProducts, mockCategories } = require('../populateDB');

// Import models
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

/**
 * Script pour peupler MongoDB Atlas avec les données de test
 * Utilise la même logique que populateDB.js mais avec gestion d'erreurs améliorée
 */
const populateAtlas = async () => {
  try {
    // Configuration des URIs de connexion
    const ATLAS_URI = process.env.MONGODB_ATLAS_URI || process.env.MONGO_ATLAS_URI;
    const LOCAL_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/almasdimas';
    
    if (!ATLAS_URI) {
      console.log('⚠️  MONGODB_ATLAS_URI non définie, utilisation de la base locale');
    }

    // Options de connexion optimisées
    const connectionOptions = {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    };

    // Tentative de connexion à Atlas d'abord, puis local
    let connected = false;
    let connectionSource = '';

    if (ATLAS_URI) {
      try {
        console.log('🌐 Connexion à MongoDB Atlas...');
        await mongoose.connect(ATLAS_URI, connectionOptions);
        connected = true;
        connectionSource = 'MongoDB Atlas';
        console.log('✅ Connecté à MongoDB Atlas avec succès');
      } catch (error) {
        console.log('❌ Échec de connexion à Atlas:', error.message);
        console.log('🔄 Tentative de connexion locale...');
      }
    }

    if (!connected) {
      try {
        await mongoose.connect(LOCAL_URI, connectionOptions);
        connected = true;
        connectionSource = 'MongoDB Local';
        console.log('✅ Connecté à MongoDB local avec succès');
      } catch (error) {
        console.error('❌ Impossible de se connecter à MongoDB:', error.message);
        process.exit(1);
      }
    }

    console.log(`📊 Source de données: ${connectionSource}`);
    console.log(`📊 Base de données: ${mongoose.connection.name}`);

    // Vérifier si les données existent déjà
    const existingProducts = await Product.countDocuments();
    const existingCategories = await Category.countDocuments();
    const existingUsers = await User.countDocuments();

    console.log(`📊 Données existantes: ${existingProducts} produits, ${existingCategories} catégories, ${existingUsers} utilisateurs`);

    // Peupler les catégories si elles n'existent pas
    if (existingCategories === 0) {
      console.log('📝 Ajout des catégories...');
      try {
        // Insérer une par une pour éviter les conflits de slug
        for (const category of mockCategories) {
          try {
            await Category.create(category);
          } catch (error) {
            if (error.code === 11000) {
              console.log(`⚠️  Catégorie "${category.categoryName}" déjà existante, ignorée`);
            } else {
              throw error;
            }
          }
        }
        console.log(`✅ Catégories traitées avec succès`);
      } catch (error) {
        console.error('❌ Erreur lors de l\'ajout des catégories:', error.message);
      }
    } else {
      console.log('ℹ️  Catégories déjà présentes, passage ignoré');
    }

    // Peupler les utilisateurs si ils n'existent pas
    if (existingUsers === 0) {
      console.log('👥 Ajout des utilisateurs...');
      try {
        // Insérer un par un pour éviter les conflits
        for (const user of mockUsers) {
          try {
            await User.create(user);
          } catch (error) {
            if (error.code === 11000) {
              console.log(`⚠️  Utilisateur "${user.email}" déjà existant, ignoré`);
            } else {
              throw error;
            }
          }
        }
        console.log(`✅ Utilisateurs traités avec succès`);
      } catch (error) {
        console.error('❌ Erreur lors de l\'ajout des utilisateurs:', error.message);
      }
    } else {
      console.log('ℹ️  Utilisateurs déjà présents, passage ignoré');
    }

    // Peupler les produits si ils n'existent pas
    if (existingProducts === 0) {
      console.log('🛍️  Ajout des produits...');
      try {
        // Insérer par lots pour optimiser
        await Product.insertMany(mockProducts, { ordered: false });
        console.log(`✅ ${mockProducts.length} produits ajoutés`);
      } catch (error) {
        if (error.name === 'MongoBulkWriteError') {
          const insertedCount = error.result.insertedCount;
          console.log(`✅ ${insertedCount} produits ajoutés (certains ignorés car déjà existants)`);
        } else {
          throw error;
        }
      }
    } else {
      console.log('ℹ️  Produits déjà présents, passage ignoré');
    }

    // Statistiques finales
    const finalProducts = await Product.countDocuments();
    const finalCategories = await Category.countDocuments();
    const finalUsers = await User.countDocuments();

    console.log('\n📊 STATISTIQUES FINALES:');
    console.log(`   • Produits: ${finalProducts}`);
    console.log(`   • Catégories: ${finalCategories}`);
    console.log(`   • Utilisateurs: ${finalUsers}`);
    console.log(`   • Source: ${connectionSource}`);

    console.log('\n✅ Population de la base de données terminée avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors du peuplement:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    // Fermer la connexion
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Connexion fermée');
    }
  }
};

// Exécuter le script si appelé directement
if (require.main === module) {
  populateAtlas();
}

module.exports = { populateAtlas };
