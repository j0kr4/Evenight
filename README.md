Guide d'Installation

Ce guide vous aidera à configurer votre environnement de développement, y compris l'installation des logiciels nécessaires et la configuration du dépôt de projet.
Étape 1 : Installer Node.js

Node.js est un environnement d'exécution JavaScript basé sur le moteur JavaScript V8 de Chrome. Suivez les instructions ci-dessous pour l'installer :

    Allez sur le site officiel de Node.js.
    Téléchargez la version LTS (recommandée pour la plupart des utilisateurs).
    Exécutez l'installateur et suivez les instructions à l'écran pour terminer l'installation.

    Vérifiez l'installation en ouvrant un terminal et en exécutant la commande suivante :
    node -v

    Vous devriez voir le numéro de version de Node.js.

Étape 2 : Installer Docker et le lancer

Docker est une plateforme permettant de développer, expédier et exécuter des applications dans des conteneurs. Suivez ces étapes pour installer et démarrer Docker :

    Allez sur le site officiel de Docker.
    Téléchargez l'installateur Docker Desktop pour votre système d'exploitation.
    Exécutez l'installateur et suivez les instructions à l'écran.
    Une fois installé, ouvrez Docker Desktop pour démarrer Docker.

    Vérifiez l'installation en ouvrant un terminal et en exécutant la commande suivante :

    docker --version

    Vous devriez voir le numéro de version de Docker.

Étape 3 : Cloner le dépôt Git

Ensuite, clonez le dépôt où votre code de projet est hébergé : https://github.com/j0kr4/Evenight

    Ouvrez un terminal.
    Exécutez la commande suivante en remplaçant <repository-url> par l'URL de votre dépôt Git :

git clone https://github.com/j0kr4/Evenight

Accédez au répertoire cloné :

    cd Evenight

Étape 4 : Installer les dépendances du projet

Une fois le dépôt cloné, vous devez installer les dépendances du projet en utilisant npm :

    Dans le terminal, assurez-vous d'être dans le répertoire du projet.
    Exécutez la commande suivante pour installer les dépendances :


    npm install

Étape 5 : Exécuter Redis avec Docker

Lancez une instance Redis en utilisant Docker :

    Dans le terminal, exécutez la commande suivante pour démarrer Redis :


    docker run -p 6379:6379 -it redis/redis-stack-server:latest

Étape 6 : Modifier le fichier .env.example

Configurez les variables d'environnement nécessaires en modifiant le fichier .env.example :

    Générez un secret d'authentification :

        npx auth secret

Copiez le secret généré et mettez-le dans AUTH_SECRET du fichier .env.example.

Mettez l'URL de votre base de données dans DATABASE_URL du fichier .env.example.

Renommez le fichier .env.example en .env :

    mv .env.example .env

Étape 7 : Générer et pousser le schéma de la base de données

Utilisez Prisma pour générer et pousser le schéma de votre base de données :

    Dans le terminal, exécutez la commande suivante :

        npx prisma db push

Étape 8 : Générer les seeds pour avoir des données

Générez les seeds pour avoir des données de base dans votre base de données :

    Dans le terminal, exécutez la commande suivante :

        npx prisma db seed

Étape 9 : Démarrer le serveur de développement

Avec tout configuré, vous pouvez maintenant démarrer le serveur de développement :

    Dans le terminal, assurez-vous d'être dans le répertoire du projet.
    Exécutez la commande suivante pour démarrer le serveur de développement :

        npm run dev

Votre environnement de développement devrait maintenant être opérationnel. Vous pouvez accéder à votre application comme spécifié dans la configuration de votre projet. Si vous rencontrez des problèmes, consultez la documentation du projet ou demandez de l'aide à votre équipe.

# route Back


Connexion de l'utilisateur:
POST /api/auth/login

Déconnexion de l'utilisateur:
POST /api/auth/logout

Création d'une nouvelle soirée:
POST /api/party


Récupération des détails d'une soirée:
GET /api/party/[id]


Suppression d'une soirée:
DELETE /api/party/[id]
Headers: { Authorization: Bearer <token> }
Routes Message (Message)

Envoyer un message:
POST /api/comments


Récupérer les messages d'une soirée:
GET /api/comments







## Gestion du Cache et Base de Données
Next.js 14 : Gestion Native du Cache
Next.js 14 gère le cache de manière native en utilisant diverses techniques pour optimiser les performances :

Static Generation (SSG) : Génère des pages statiques au moment de la construction, mises en cache et servies par le CDN.
Incremental Static Regeneration (ISR) : Régénère les pages statiques de manière incrémentale après le déploiement.
Cache-Control Headers : Configure les en-têtes de contrôle de cache HTTP pour définir la durée de mise en cache.
API Routes : Les routes API peuvent bénéficier du cache côté serveur ou par des en-têtes spécifiques.
Prisma : Gestion de la Base de Données avec des Index
Prisma est un ORM moderne pour Node.js et TypeScript, facilitant l'interaction avec la base de données :

Schéma Prisma : Définit les modèles de données et les index dans un fichier schema.prisma.

## prisma
Copier le code
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
  @@index([email], name: "email_index")
}
Migration : Génère et applique des migrations pour mettre à jour la structure de la base de données.

Optimisation des Requêtes : Les index améliorent les performances des requêtes en permettant une récupération plus rapide des données.

## Redis : Cache Supplémentaire
Redis est utilisé pour la mise en cache en mémoire, améliorant encore les performances et la réactivité :

Cache des Pages : Stocke les versions mises en cache des pages statiques générées.
Cache des API Routes : Les réponses des requêtes fréquentes sont mises en cache pour une récupération rapide.
E










## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
