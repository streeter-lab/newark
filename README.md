# Newark-on-Trent Community Website

A community and visitor information website for Newark-on-Trent, a historic market town in Nottinghamshire, England.

## Tech Stack

- **Static Site Generator**: [Eleventy (11ty)](https://www.11ty.dev/) v3
- **Templating**: Nunjucks
- **Styling**: Vanilla CSS with custom properties (design tokens)
- **JavaScript**: Vanilla ES6+
- **Fonts**: Inter (Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

The development server runs at `http://localhost:8080` with live reloading.

## Project Structure

```
newark/
├── _data/
│   └── site.json          # Shared site metadata
├── _includes/
│   └── base.njk           # Base layout (header, footer, nav)
├── css/
│   └── styles.css          # Complete stylesheet with design tokens
├── js/
│   └── main.js             # Interactive functionality (ES6+)
├── images/
│   ├── favicon.svg          # Site favicon
│   ├── og-image.svg         # Open Graph image for social sharing
│   └── placeholder.svg      # Generic image placeholder
├── index.njk                # Homepage
├── about.njk                # History & heritage
├── things-to-do.njk         # Attractions & activities
├── visitor-info.njk         # Travel, parking, accommodation
├── local-life.njk           # Community, schools, shopping
├── events.njk               # Events calendar & market days
├── 404.njk                  # Error page
├── sitemap.njk              # Auto-generated sitemap
├── robots.txt               # Search engine directives
├── .eleventy.js             # Eleventy configuration
└── package.json
```

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Welcome page with highlights and teasers |
| About | `/about.html` | History timeline, castle, church, notable people |
| Things To Do | `/things-to-do.html` | Filterable attraction cards with categories |
| Visitor Info | `/visitor-info.html` | Transport, parking, accommodation, interactive map |
| Local Life | `/local-life.html` | Schools, shopping, food & drink, sports, community |
| Events | `/events.html` | Featured events, annual highlights, market days |

## Features

- Dark mode with system preference detection and localStorage persistence
- Responsive design (mobile-first with tablet and desktop breakpoints)
- Accessible navigation with keyboard support and ARIA attributes
- Category filtering with `aria-pressed` for screen reader support
- Auto-generated XML sitemap
- Structured data (JSON-LD) for SEO
- Print styles and reduced motion support

## Build Output

The built site is output to `_site/`. This directory is git-ignored.

## License

ISC
