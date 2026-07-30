# Ionic ERP marketing site — Next.js and TypeScript

This repository is the compatibility migration of the Ionic ERP React/Vite
marketing site to the Next.js App Router and strict TypeScript.

The project preserves the source website's Bengali content, public URLs,
responsive styling, images, cards, tabs, accordions, navigation, contact
fields, and compatibility form behavior.

## Stack

- Next.js 16.2
- React 19.2
- TypeScript 6 in strict mode
- Tailwind CSS 3.4
- DaisyUI 4.12
- React Hook Form
- React Icons
- React Tabs
- Vitest and React Testing Library
- Playwright

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Browser tests:

```bash
npx playwright install chromium
npm run test:e2e
```

## Public routes

- `/`
- `/contact`
- `/manufacturing-industry-ionic-erp-software`
- `/healthcare`
- `/trading-ionic-erp`
- `/chemical-industry-ionic-erp`
- `/lone-management-ionic-erp`
- `/agriculture-ionic-erp`
- `/all-services-ionic-erp`

`/loan-management-ionic-erp` permanently redirects to the original misspelled
loan URL to preserve compatibility.

## Form behavior

The supplied source project did not contain a backend. Contact submissions only
logged their values in the browser console. This behavior remains isolated in
`src/services/lead.ts`. Replace that adapter only after a real lead API,
validation, data-retention policy, and abuse protection have been approved.

## Deployment

The application can be deployed to any platform that supports Next.js:

```bash
npm run build
npm run start
```

No runtime environment variables are required for the current compatibility
version. Never place private credentials in variables exposed to browser code.

See [MIGRATION_REPORT.md](./MIGRATION_REPORT.md) for the complete migration map,
preserved behavior, known source defects, and verification record.
