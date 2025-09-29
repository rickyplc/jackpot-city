## Getting Started

### Prerequisites

This repo uses [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating) to pin the Node version.

1. Install NVM: follow the official install guide above.
2. In the project root, run:

```bash
# use the project's Node version from .nvmrc
nvm install
nvm use
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Unit testing (Vitest)

This project uses [Vitest](https://vitest.dev) with jsdom and Testing Library for unit tests.

Quick start:

```bash
# run all unit tests once
npm run test:unit

# watch mode
npm run test:watch

# coverage report (text + lcov)
npm run test:coverage
```

Run a single test file:

```bash
npm run test:unit __tests__/unit/lib/games/filter.test.ts
```

Filter by test name (pattern):

```bash
npm run test:unit -- -t "filterByQuery"
```

Notes:

- Keep unit tests under `__tests__/unit/**` to match the current project layout.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
