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

## Prisma Setup

### Create the .env

Create a secret with the following command:

```bash
openssl rand -base64 32
```

Create a `.env` file in the root of the project with the following content:

```env
DATABASE_URL="file:./dev.sqlite"
AUTH_SECRET="your-auth-secret"
```

This project uses Prisma to connect to a database. You can use the following commands to setup the database:


```bash
npx prisma migrate dev
# or
yarn prisma migrate dev
# or
pnpm prisma migrate dev
# or    
bun prisma migrate dev
```

## Use authentiication session in app

This project uses [next-auth](https://next-auth.js.org/) to handle authentication. You can use the following commands to setup the authentication:

```typescript jsx
...
import { auth, signOut } from '@/auth';
//recuperation de l'utilisateur
const session = await auth();
<div>
    {session ? `Bonjour ${session.user.name}` : 'Not logged in'}
</div>

//deconnection
<form action={logoutAction} className='flex'>
    <button type='submit' className='btn btn-primary'>
        Logout
    </button>
</form>
...
```