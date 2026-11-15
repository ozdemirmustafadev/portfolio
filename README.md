# ozdemirmustafa.com

Personal site and blog. Built with Next.js, TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

| Command             | Description          |
| ------------------- | -------------------- |
| `npm run dev`       | Start the dev server |
| `npm run build`     | Production build     |
| `npm run lint`      | ESLint               |
| `npm run typecheck` | TypeScript check     |
| `npm run format`    | Format the codebase  |

## Project structure

```
src/
  app/[lang]/     localized routes and root layout
  components/
    layout/       header, footer
    providers/    client-side providers
    sections/     page sections
    ui/           shared primitives
  content/        profile, projects, experience data
  i18n/           locale config and dictionaries
  lib/            helpers
  proxy.ts        locale detection and redirects
```
