# SalaSpell Helper

A web application to help D&D players filter and discover spells by class, level, and source books.

## Features

- Password protected access
- Filter spells by class and level
- Filter by source books you own
- Search spells by name
- Spell recommendations based on class and level
- Responsive design

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

1. Push your code to the `main` branch
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically build and deploy your site

Your site will be available at: `https://suideDev.github.io/DNDSpellList/`

### Manual Deployment

1. Build the static site:
```bash
npm run build
```

2. The `out` folder contains the static files ready for GitHub Pages.

3. Follow GitHub Pages setup:
   - Go to repository Settings → Pages
   - Select source branch (gh-pages) or use GitHub Actions

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- D&D 5e API

