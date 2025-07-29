require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const Task = require('./models/task');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès');
    await sequelize.sync({ alter: true });
    console.log('Modèles Sequelize synchronisés avec la base de données');
    app.listen(3002, () => {
      console.log('Serveur démarré sur le port 3002');
    });
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
app.use('/api/tasks', taskRoutes);
// Error handling
app.use(errorHandler);

startServer();

module.exports = app;