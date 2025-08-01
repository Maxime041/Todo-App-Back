# Todo API - Application de Gestion de Tâches

### Lien projet : https://github.com/users/Maxime041/projects/2
### render.com : https://todo-app-back-p4tg.onrender.com 

## Description

API REST dockerisée pour la gestion de tâches développée avec Node.js, Express et MongoDB. Cette application permet de créer, lire, modifier et supprimer des tâches via une interface REST.

## Objectifs

- Fournir une API REST complète pour la gestion de tâches
- Démontrer l'utilisation de Docker et docker-compose
- Appliquer les bonnes pratiques de développement API
- Préparer l'application pour l'intégration CI/CD

## Architecture du Projet

```
todo-api/
├── src/
│   ├── config/
│   │   └── database.js          # Configuration MongoDB
│   ├── routes/
│   │   └── tasks.js             # Routes API pour les tâches
│   ├── models/
│   │   └── task.js              # Modèle Mongoose pour Task
│   ├── middleware/
│   │   └── errorHandler.js      # Gestionnaire d'erreurs global
│   └── app.js                   # Point d'entrée de l'application
├── tests/                       # Tests unitaires et d'intégration
│   ├── unit/
│   │   └── task.test.js         # Tests unitaires du modèle Task
│   └── integration/
│       └── api.test.js          # Tests d'intégration API
├── Dockerfile                   # Configuration Docker
├── docker-compose.yml           # Orchestration des services
├── package.json                 # Dépendances Node.js
├── .dockerignore               # Fichiers ignorés par Docker
├── .gitignore                  # Fichiers ignorés par Git
└── README.md                   # Documentation du projet
```

## Prérequis

- **Docker** : v20.10 ou supérieur
- **Docker Compose** : v2.0 ou supérieur
- **Node.js** : v18 ou supérieur (pour développement local)
- **npm** : v8 ou supérieur (pour développement local)

## Installation et Démarrage

### Avec Docker (Recommandé)

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Maxime041/Todo-App-Back.git
   cd Todo-App-Back-main
   ```

2. **Démarrer l'application avec Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Vérifier le statut des services**
   ```bash
   docker-compose ps
   ```

4. **Consulter les logs**
   ```bash
   docker-compose logs -f api
   ```

### En développement local

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   ```bash
   # Créer le fichier .env
   echo "PORT=3003" > .env
   echo "MONGODB_URI=mongodb://localhost:27017/todoapi" >> .env
   ```

3. **Démarrer MongoDB localement**
   ```bash
   # Avec Docker
   docker run -d -p 27017:27017 --name mongodb mongo:7
   ```

4. **Démarrer l'application**
   ```bash
   npm start
   ```

## Configuration

L'application utilise les variables d'environnement suivantes :

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `NODE_ENV` | Environment d'exécution | `production` |
| `PORT` | Port du serveur | `3003` |
| `MONGODB_URI` | URI de connexion MongoDB | `mongodb://localhost:27017/todoapi` |

## API Documentation

### Base URL
```
http://localhost:3003/api
https://todo-app-back-p4tg.onrender.com/api/
```

### Health Check
```http
GET /health
```

**Réponse :**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Endpoints des Tâches

#### Lister toutes les tâches
```http
GET /api/tasks
```

**Réponse :**
```json
{
  "result": true,
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Ma première tâche",
      "description": "Description de la tâche",
      "status": "todo",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

#### Récupérer une tâche par ID
```http
GET /api/tasks/:id
```

**Réponse :**
```json
{
  "result": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Ma première tâche",
    "description": "Description de la tâche",
    "status": "todo",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

#### Créer une nouvelle tâche
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Nouvelle tâche",
  "description": "Description obligatoire",
  "status": "todo"
}
```

**Réponse :**
```json
{
  "result": true,
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Nouvelle tâche",
    "description": "Description obligatoire",
    "status": "todo",
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

#### Modifier une tâche
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Tâche modifiée",
  "description": "Nouvelle description",
  "status": "in-progress"
}
```

**Réponse :**
```json
{
  "result": true,
  "message": "Tâche mise à jour !",
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Tâche modifiée",
    "description": "Nouvelle description",
    "status": "in-progress",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}
```

#### Supprimer une tâche
```http
DELETE /api/tasks/:id
```

**Réponse :**
```json
{
  "result": true,
  "message": "Tâche supprimée !"
}
```

### Modèle de Données

#### Task
```javascript
{
  id: "UUID",                    // Identifiant unique (auto-généré)
  title: "string",               // Titre (obligatoire)
  description: "string",         // Description (optionnel)
  status: "enum",                // Statut : 'todo', 'in-progress', 'done'
  createdAt: "timestamp",        // Date de création (auto)
  updatedAt: "timestamp"         // Date de modification (auto)
}
```

### Codes d'Erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 400 | Données invalides |
| 404 | Ressource non trouvée |
| 409 | Conflit de données |
| 500 | Erreur serveur |

## Tests

L'application dispose d'une suite de tests complète comprenant :

```bash
# Exécuter tous les tests
npm test

# Tests unitaires uniquement
npm run test:unit

# Tests d'intégration uniquement
npm run test:integration
```

### Structure des Tests
- **Tests unitaires** : Validation des modèles et fonctions isolées
- **Tests d'intégration** : Validation des endpoints API complets
- **Health check** : Vérification de l'état de l'API

Les tests couvrent :
- Création, lecture, modification et suppression des tâches
- Validation des données d'entrée
- Endpoints de santé de l'API

## CI/CD

L'application utilise GitHub Actions pour l'intégration continue :

- **Tests automatiques** sur push et pull request
- **Build Docker** automatique
- **Validation** de la qualité du code

## Technologies Utilisées

- **Node.js** : Runtime JavaScript
- **Express.js** : Framework web
- **Mongoose** : ODM pour MongoDB
- **MongoDB** : Base de données NoSQL
- **Docker** : Containerisation
- **Helmet** : Sécurité HTTP
- **CORS** : Gestion des origines croisées
- **Jest** : Framework de tests
- **GitHub Actions** : CI/CD