const mongoose = require('mongoose');

/**
 * Fonction pour établir la connexion à MongoDB
 * Essaie d'abord MongoDB Atlas, puis se rabat sur la base locale
 */
const connectDB = async () => {
  // Configuration des URIs de connexion
  const ATLAS_URI = process.env.MONGODB_ATLAS_URI || process.env.MONGO_ATLAS_URI;
  const LOCAL_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/almasdimas';
  
  // Options de connexion optimisées pour Atlas et local
  const connectionOptions = {
    serverSelectionTimeoutMS: 10000, // 10 secondes pour la sélection du serveur
    socketTimeoutMS: 45000, // 45 secondes pour les opérations socket
    maxPoolSize: 10, // Limite du pool de connexions
    retryWrites: true,
    w: 'majority'
  };

  // Fonction pour tenter une connexion
  const attemptConnection = async (uri, source) => {
    try {
      console.log(`🔄 Tentative de connexion à ${source}...`);
      const conn = await mongoose.connect(uri, connectionOptions);
      
      console.log(`✅ MongoDB connecté avec succès via ${source}`);
      console.log(`📊 Host: ${conn.connection.host}`);
      console.log(`📊 Base de données: ${conn.connection.name}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Échec de connexion à ${source}:`, error.message);
      return false;
    }
  };

  try {
    let connected = false;

    // 1. Essayer MongoDB Atlas en priorité si l'URI est fournie
    if (ATLAS_URI) {
      console.log('🌐 Tentative de connexion à MongoDB Atlas...');
      connected = await attemptConnection(ATLAS_URI, 'MongoDB Atlas');
    }

    // 2. Si Atlas échoue ou n'est pas configuré, essayer la base locale
    if (!connected) {
      console.log('🏠 Tentative de connexion à MongoDB local...');
      connected = await attemptConnection(LOCAL_URI, 'MongoDB Local');
    }

    // 3. Si aucune connexion n'a réussi
    if (!connected) {
      console.log('⚠️  Aucune base de données disponible, fonctionnement en mode dégradé');
      return;
    }

    // Configuration des événements de connexion
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connecté à MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Erreur de connexion MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose déconnecté de MongoDB');
      
      // Tentative de reconnexion automatique
      setTimeout(async () => {
        console.log('🔄 Tentative de reconnexion...');
        await connectDB();
      }, 5000);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Mongoose reconnecté à MongoDB');
    });

  } catch (error) {
    console.error('❌ Erreur critique lors de la connexion à MongoDB:', error.message);
    console.log('⚠️  L\'application continuera sans base de données...');
  }
};

/**
 * Fonction pour fermer proprement la connexion à la base de données
 * Utile lors de l'arrêt de l'application
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 Connexion MongoDB fermée proprement');
  } catch (error) {
    console.error('❌ Erreur lors de la fermeture de la connexion:', error.message);
  }
};

process.on('SIGINT', async () => {
  console.log('\n🛑 Signal SIGINT reçu, fermeture de l\'application...');
  await disconnectDB();
  process.exit(0);
});

module.exports = { connectDB, disconnectDB };
