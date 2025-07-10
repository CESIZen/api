# CESIZen API

API backend pour le projet CESIZen, construite avec NestJS - un framework Node.js progressif pour créer des applications server-side efficaces et scalables.

## Prérequis

- Node.js (version 16 ou plus récente)
- npm ou yarn
- Base de données (PostgreSQL/MySQL/MongoDB selon la configuration)

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/CESIZen/api.git
cd api
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```
Éditez le fichier `.env` avec vos paramètres de base de données et autres configurations nécessaires.

4. (Optionnel) Lancez les migrations de base de données si applicable :
```bash
npm run migration:run
```

## Lancement du projet

### Mode développement
```bash
npm run start:dev
```
L'API sera accessible sur `http://localhost:3000`

### Mode production
```bash
npm run start:prod
```

### Mode standard
```bash
npm run start
```

## Tests

### Tests unitaires
```bash
npm run test
```

### Tests end-to-end
```bash
npm run test:e2e
```

### Couverture de tests
```bash
npm run test:cov
```

## Structure du projet

```
src/
├── modules/          # Modules de l'application
├── common/          # Utilitaires partagés
├── config/          # Configuration de l'application
├── database/        # Configuration base de données
└── main.ts          # Point d'entrée de l'application
```

## Documentation API

Une fois l'application lancée, la documentation Swagger est disponible sur :
`http://localhost:3000/api/docs`

## Déploiement

Pour déployer l'application, consultez la [documentation de déploiement NestJS](https://docs.nestjs.com/deployment).

## Ressources

- [Documentation NestJS](https://docs.nestjs.com)
- [Discord NestJS](https://discord.gg/G7Qnnhy)
- [Cours NestJS](https://courses.nestjs.com/)

## Licence

Ce projet est sous licence MIT.
