# 🎬 CinéInfo - Application de Gestion de Films et Acteurs

Application full-stack de gestion de films et acteurs français synchronisée avec l'API TMDB.

## 🏗️ Architecture

```
strapi_mosquitoes_CDA/
├── back-end-strapi/     # API Backend Strapi (Node.js + SQLite)
└── my-app/              # Frontend React + Vite
```

## 🔧 Prérequis

- **Node.js** : version 18.0.0 à 22.x.x
- **npm** : version 6.0.0 ou supérieure
- **Clé API TMDB** : [Obtenir une clé](https://www.themoviedb.org/settings/api)

## 📦 Installation

### Backend (Strapi)

```bash
cd back-end-strapi
npm install
```

Créez un fichier `.env` :

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified

# OBLIGATOIRE
TMDB_API_KEY="votre_clé_api_tmdb"

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Frontend (React)

```bash
cd ../my-app
npm install
```

Créez un fichier `.env` :

```env
VITE_API_URL=http://localhost:1337
```

## 🚀 Lancement

### 1. Démarrer le Backend

```bash
cd back-end-strapi
npm run develop
```

**Première utilisation :**
- Créez un compte admin via l'interface : http://localhost:1337/admin
- Allez dans **Settings → Roles → Authenticated**
- Cochez les permissions pour **Movie** et **Actor** : `find`, `findOne`, `create`, `syncFrenchMovies`

### 2. Démarrer le Frontend

```bash
cd my-app
npm run dev
```

L'application sera accessible à : http://localhost:5173

## ✨ Fonctionnalités

### Frontend
- **Page d'accueil** : Liste des films et acteurs avec recherche et pagination
- **Pages détail** : Informations complètes sur les films et acteurs
- **Admin** : Connexion et synchronisation TMDB

### Backend
- **API REST** : CRUD complet pour Movies et Actors
- **Synchronisation automatique** : Import quotidien depuis TMDB (3h du matin)
- **Authentification JWT** : Sécurisation des routes sensibles

## 🔌 API Endpoints principaux

```bash
# Films
GET    /api/movies                    # Liste avec pagination
GET    /api/movies/:id?populate=actors # Détail avec acteurs
POST   /api/movies/sync-french        # Synchroniser TMDB (auth requise)

# Acteurs
GET    /api/actors                    # Liste avec pagination
GET    /api/actors/:id?populate=movies # Détail avec filmographie

# Authentification
POST   /api/auth/local                # Login (retourne JWT)
```

**Exemples de requêtes :**

```bash
# Recherche de films
GET /api/movies?filters[titre][$containsi]=amour&pagination[page]=1&pagination[pageSize]=10

# Pagination
GET /api/movies?pagination[page]=1&pagination[pageSize]=20&sort=titre:desc

# Authentification
POST /api/auth/local
Content-Type: application/json
{
  "identifier": "email@example.com",
  "password": "votre_mot_de_passe"
}
```

## 🛠️ Stack Technique

**Backend :**
- Strapi 5.28.0 (CMS Headless)
- Node.js + SQLite
- Axios (appels TMDB)

**Frontend :**
- React 19.1.1
- Vite 7.1.7
- React Router DOM 7.9.4
- React Icons 5.5.0

## 📁 Structure simplifiée

```
back-end-strapi/
├── config/              # Configuration serveur, DB, CRON
├── src/api/
│   ├── movie/          # Collection Movies + service TMDB
│   └── actor/          # Collection Actors
└── src/policies/       # Contrôle d'accès

my-app/
├── src/
│   ├── components/     # Header, Footer, Cards, Loader
│   ├── pages/          # Home, Details, Admin
│   └── services/       # API calls + Auth JWT
└── public/
```


## Persona

Persona 1

Objectif : rechercher un film précis et le consulter
Frustration : avoir un système de recherche difficile d’utilisation (avec casse) 
Attentes : trouver facilement le film que je cherche

Persona 2

Objectif : rechercher un acteur et voir sa fiche
Frustration : avoir un système de recherche difficile d’utilisation (avec casse) 
Attentes : trouver facilement l’acteur recherché et voir dans sa fiche la liste de films auxquels il a participé
