require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;