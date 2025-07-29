require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initializeDatabase } = require('./config/database');
const defineTaskModel = require('./models/task');
//const taskRoutes = require('./routes/tasks');
//const errorHandler = require('./middleware/errorHandler');
const app = express();
/*// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());*/

async function initDatabase() {
  try {
    const sequelize = await initializeDatabase();
    defineTaskModel(sequelize); 
    await sequelize.sync({ alter: true });
    console.log('Modèles Sequelize synchronisés avec la base de données');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error.message);
    process.exit(1);
  }
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});
// Routes
//app.use('/api/tasks', taskRoutes);
// Error handling
//app.use(errorHandler);
// Initialisation de la base de données au démarrage
initDatabase();

module.exports = app;
