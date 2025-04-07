# 📁 Portfolio Airtable - ESGI 5IW3

Projet individuel visant à créer un portfolio connecté à Airtable pour présenter les projets étudiants.

---

## ⚙️ Stack technique

- Frontend : React (Vite + TypeScript)
- Backend : NestJS (TypeScript)
- Base de données : Airtable API
- Authentification : JWT + bcrypt

---

## 🔧 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Narutino10/Projet-Airtable.git
cd Projet-Airtable
```

### 2. Lancer le backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

### 3. Lancer le frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## 🔐 Variables d’environnement

### Backend `.env`

```
PORT=3000
AIRTABLE_API_KEY=sk_xxxxxxxxxxxxx
AIRTABLE_BASE_ID=app_xxxxxxxxxxxxx
JWT_SECRET=supersecretjwtkey
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:3000
```

---

## 🧠 Fonctionnalités

### Côté utilisateur

- Voir la liste des projets publiés
- Voir les détails d’un projet
- Rechercher des projets
- Liker un projet

### Côté administration

- Connexion sécurisée (email + mot de passe)
- Publier / dépublier un projet
- Voir la répartition des likes

---

## 📤 Déploiement

À faire en local ou en ligne (Railway, Render, Netlify, etc.)

---

## ✍️ Auteur

Projet réalisé par **[Ton Prénom Nom]** dans le cadre de l'ESGI - 5IW3.

```

Souhaites-tu maintenant :
1. Que je te prépare le **starter backend NestJS** (avec modules `auth`, `projects`, `airtable`) ?
2. Ou le **frontend React** avec les pages prêtes (`Home`, `ProjectDetails`, `AdminLogin`, etc.) ?
3. Ou les deux 👀 ?