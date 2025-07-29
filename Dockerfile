# Utilisation d'une image de base Node.js
FROM node:18

# Création du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package*.json pour optimiser le cache Docker
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers dans le conteneur
COPY . .

# Exposition du port utilisé par l'application (votre app utilise le port 3002)
EXPOSE 3002

# Commande pour démarrer l'application
CMD ["npm", "start"]