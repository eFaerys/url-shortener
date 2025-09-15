# URL Shortener App

Une application simple pour raccourcir des URLs, avec un backend en NestJS et un frontend en React + TypeScript + Vite.

---

## Structure du projet

Le projet est organisé en deux parties :

- **back** : Backend développé avec [NestJS](https://nestjs.com/) et TypeScript, utilisant une base de données SQLite.
- **front** : Frontend développé avec [React](https://reactjs.org/) + TypeScript et [Vite](https://vitejs.dev/).

---

## Prérequis

- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/) installés sur votre machine.
- Définir vos .env en vous basant sur le .envexemple

---

## Lancer le projet

1. Cloner le dépôt :

```bash
git clone <URL_DU_DEPOT>
cd <NOM_DU_PROJET>
docker compose up --build -d
