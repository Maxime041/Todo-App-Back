function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      result: false,
      error: 'Données invalides',
      details: err.message
    });
  }
  
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      result: false,
      error: 'Conflit de données'
    });
  }
  
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      result: false,
      error: 'Erreur de base de données'
    });
  }
  
  res.status(500).json({
    result: false,
    error: 'Erreur Serveur'
  });
}

module.exports = errorHandler;