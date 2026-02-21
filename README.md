# Newark-on-Trent.com

Community website for Newark-on-Trent, Nottinghamshire. Built with [Eleventy](https://www.11ty.dev/) and [Decap CMS](https://decapcms.org/), deployable to Cloudflare Pages.

## Local development

```bash
npm install
npm start
```

The site will be available at `http://localhost:8080`.

## Project structure

```
src/
  _includes/       # Layout templates (base, business, event, news-post)
  _data/           # Global data files (if needed)
  admin/           # Decap CMS admin interface
  css/             # Stylesheets
  images/          # Static images and CMS uploads
  businesses/      # Local business entries (Markdown)
  events/          # Event entries (Markdown)
  news/            # News & noticeboard entries (Markdown)
  index.njk        # Homepage
eleventy.config.js # Eleventy configuration
wrangler.toml      # Cloudflare Pages build configuration
```

## Content sections

### Local Businesses

Each business is a Markdown file in `src/businesses/` with front matter fields:

- `name` — Business name
- `description` — Short description
- `category` — One of: Pubs & Restaurants, Shopping, Services, Health & Beauty, Trades, Professional Services, Leisure & Entertainment, Community & Charity, Other
- `address` — Street address
- `phone` — Phone number (optional)
- `website` — Website URL (optional)
- `facebook` — Facebook page URL (optional)
- `photo` — Photo path (optional)

### Events

Each event is a Markdown file in `src/events/` with front matter fields:

- `name` — Event name
- `date` — Event date (YYYY-MM-DD)
- `location` — Venue or location
- `description` — Event description
- `photo` — Photo path (optional)

### News & Noticeboard

Each news post is a Markdown file in `src/news/` with front matter fields:

- `title` — Headline
- `date` — Publication date (YYYY-MM-DD)
- `photo` — Photo path (optional)
- Body content as Markdown below the front matter

## Adding content via Decap CMS

1. Navigate to `https://your-site.pages.dev/admin/`
2. Log in with your GitHub account (you must have write access to this repository)
3. Select a content section (Local Businesses, Events, or News & Noticeboard)
4. Click **New** to create an entry, or select an existing entry to edit it
5. Fill in the fields and click **Publish**

Decap CMS commits changes directly to the repository. Cloudflare Pages will automatically rebuild and deploy the site when new commits are pushed.

## Adding content manually

Create a new Markdown file in the appropriate folder (`src/businesses/`, `src/events/`, or `src/news/`) with the required front matter fields. Commit and push to trigger a deploy.

## Deploying to Cloudflare Pages

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select **Workers & Pages**
2. Click **Create** and select **Pages** then **Connect to Git**
3. Select this GitHub repository
4. Configure the build settings:
   - **Framework preset:** None
   - **Build command:** `npm install && npm run build`
   - **Build output directory:** `_site`
   - **Node.js version:** 18 (or set `NODE_VERSION=18` in environment variables)
5. Click **Save and Deploy**

> **Note:** The build command and output directory must be set in the Cloudflare Pages dashboard, not in `wrangler.toml` (which does not support a `[build]` section for Pages projects). The `wrangler.toml` file is used only for the `pages_build_output_dir` setting.

The site will rebuild automatically on every push to the configured branch.

### Setting up Decap CMS authentication

For the CMS admin interface to work, you need to register a GitHub OAuth application:

1. Go to GitHub **Settings > Developer settings > OAuth Apps > New OAuth App**
2. Set the **Authorization callback URL** to `https://api.netlify.com/auth/done`
3. Note the **Client ID** and **Client Secret**
4. In Netlify (used only for auth), create a site and go to **Site settings > Access control > OAuth** and add a GitHub provider with your Client ID and Secret

Alternatively, you can configure Decap CMS to use the `git-gateway` backend or a custom OAuth provider compatible with Cloudflare Pages.

## Building for production

```bash
npm run build
```

The generated site will be in the `_site/` directory.
