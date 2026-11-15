# ozdemirmustafa.com

Personal site and blog. Built with Next.js, TypeScript, Tailwind CSS and MDX.

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
  actions/        server actions
  app/[lang]/     localized routes and root layout
  components/
    blog/         blog building blocks
    layout/       header, footer
    providers/    client-side providers
    sections/     home page sections
    ui/           shared primitives
  content/        profile, projects, experience and blog posts
  i18n/           locale config and dictionaries
  lib/            helpers and data fetching
  proxy.ts        locale detection and redirects
```

## Content

- Profile, projects, experience and skills live in `src/content/*.ts`.
- Blog posts live in `src/content/blog/<locale>/<slug>.mdx` and export a `metadata` object.
- UI strings live in `src/i18n/dictionaries`.

## Environment

| Variable               | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata and the sitemap |
| `GITHUB_TOKEN`         | Optional, enables the contribution calendar    |
| `SMTP_*`               | Mail server credentials for the contact form   |
| `CONTACT_TO_EMAIL`     | Where contact form messages are delivered      |

A fine-grained GitHub token with no extra permissions is enough for the contribution calendar.

## Deployment

The app builds into a standalone Docker image and runs behind Nginx.

```bash
cp .env.example .env
docker compose up -d --build
```

The container listens on `127.0.0.1:3000`. An example Nginx config with HTTPS redirects is in `deploy/nginx.conf`. Certificates can be issued with Certbot:

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d ozdemirmustafa.com -d www.ozdemirmustafa.com
```

To update the site, pull the latest changes and run `docker compose up -d --build` again.
