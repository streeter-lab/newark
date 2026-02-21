# Deploying the GitHub OAuth Worker for Decap CMS

This Cloudflare Worker handles the GitHub OAuth flow so that Decap CMS can
authenticate users without relying on Netlify's OAuth service.

## Prerequisites

1. **Node.js** (v18+) and **npm**
2. **Wrangler CLI** — install with `npm install -g wrangler`
3. A **GitHub OAuth App** — create one at
   <https://github.com/settings/developers>
   - **Homepage URL**: `https://newark-on-trent.com`
   - **Authorisation callback URL**: `https://newark-github-oauth.<your-subdomain>.workers.dev/api/callback`
4. A **Cloudflare account** with Workers enabled

## 1. Authenticate Wrangler

```sh
wrangler login
```

## 2. Deploy the Worker

From this directory (`workers/github-oauth`):

```sh
wrangler deploy
```

Wrangler will print the worker URL, e.g.
`https://newark-github-oauth.<your-subdomain>.workers.dev`.

## 3. Set Environment Variables

Use the Cloudflare dashboard **or** the Wrangler CLI to set the three required
variables.

### Via Wrangler CLI

```sh
# Non-secret (plain text)
wrangler secret put GITHUB_CLIENT_ID
# Paste the Client ID from your GitHub OAuth App, then press Enter

wrangler secret put GITHUB_CLIENT_SECRET
# Paste the Client Secret, then press Enter

wrangler secret put ALLOWED_HOST
# Enter: newark-on-trent.com
```

### Via Cloudflare Dashboard

1. Go to **Workers & Pages** → **newark-github-oauth** → **Settings** →
   **Variables and Secrets**
2. Add the following:

| Variable              | Value                            | Encrypt |
|-----------------------|----------------------------------|---------|
| `GITHUB_CLIENT_ID`   | *(from GitHub OAuth App)*        | No      |
| `GITHUB_CLIENT_SECRET`| *(from GitHub OAuth App)*       | Yes     |
| `ALLOWED_HOST`       | `newark-on-trent.com`            | No      |

## 4. Update Decap CMS Config

In `src/admin/config.yml`, set `base_url` under `backend` to the worker URL:

```yaml
backend:
  name: github
  repo: streeter-lab/newark
  branch: main
  base_url: https://newark-github-oauth.<your-subdomain>.workers.dev
```

Replace `<your-subdomain>` with your actual Cloudflare Workers subdomain (you
can find this in the Cloudflare dashboard under **Workers & Pages** →
**Overview**).

## 5. Update GitHub OAuth App Callback URL

Make sure the **Authorisation callback URL** in your GitHub OAuth App matches:

```
https://newark-github-oauth.<your-subdomain>.workers.dev/api/callback
```

## How It Works

1. User clicks "Login with GitHub" in Decap CMS
2. Decap CMS opens a popup to `/api/auth` on the worker
3. The worker redirects to GitHub's OAuth authorisation page
4. User authorises the app on GitHub
5. GitHub redirects back to `/api/callback` with a code
6. The worker exchanges the code for an access token
7. The worker returns an HTML page that posts the token back to the Decap CMS
   window via `postMessage`
