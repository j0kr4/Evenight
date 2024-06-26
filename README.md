# Prisma

# Next auth
- npx auth secret
- openssl rand -base64 33
  
# React hook form,

# shadcn

# route Back

Enregistrement d'un utilisateur:
POST /api/users
Corps de la requête: { name: string, email: string, password: string }

Connexion de l'utilisateur:
POST /api/auth/login
Corps de la requête: { email: string, password: string }

Déconnexion de l'utilisateur:
POST /api/auth/logout

Récupération des informations de l'utilisateur:
GET /api/users/me
Headers: { Authorization: Bearer <token> }
Routes Soirée (Party)

Création d'une nouvelle soirée:
POST /api/parties
Corps de la requête: { name: string, cityId: number, typeId: number, date: string, time: string, availableSeats: number, isPaid: boolean }
Headers: { Authorization: Bearer <token> }

Récupération des soirées disponibles (avec filtres):
GET /api/parties
Paramètres de la requête: { city?: string, type?: string, availableSeats?: number, isPaid?: boolean, date?: string }

Récupération des détails d'une soirée:
GET /api/parties/[id]

Mise à jour d'une soirée:
PUT /api/parties/[id]
Corps de la requête: { name?: string, cityId?: number, typeId?: number, date?: string, time?: string, availableSeats?: number, isPaid?: boolean }
Headers: { Authorization: Bearer <token> }

Suppression d'une soirée:
DELETE /api/parties/[id]
Headers: { Authorization: Bearer <token> }
Routes Message (Message)

Envoyer un message:
POST /api/messages
Corps de la requête: { partyId: number, content: string }
Headers: { Authorization: Bearer <token> }

Récupérer les messages d'une soirée:
GET /api/messages
Paramètres de la requête: { partyId: number }
Routes Ville (City) et Type de Soirée (PartyType)

Récupérer la liste des villes:
GET /api/cities

Récupérer la liste des types de soirées:
GET /api/partytypes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
