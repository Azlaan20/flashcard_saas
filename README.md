# flashcard_saas

AI-powered flashcard generation and study app built with Next.js.

## Local setup

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open http://localhost:3000 in your browser.

## Required environment variables

Copy `.env.example` to `.env.local` for local development and add the corresponding secrets through your deployment provider for hosted environments.

Required variables:

```text
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
OPENAI_API_KEY
NEXT_PUBLIC_STRIPE_PUBLIC_KEY
STRIPE_SECRET_KEY
```

Never commit real API keys or secret values to GitHub.

### Vercel

In Vercel, add the variables under:

`Project → Settings → Environment Variables`

Enable the appropriate values for Production and Preview, then redeploy. Without the Clerk variables, authentication cannot initialize. Without the OpenAI or Stripe variables, their respective application features will not function.

## Deployment

The project is deployed with Vercel and uses the Next.js App Router. GitHub Actions runs `npm ci` and `npm run build` on pull requests before changes are merged.
