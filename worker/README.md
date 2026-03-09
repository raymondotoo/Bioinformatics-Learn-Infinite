# Feedback Worker (Cloudflare)

This worker accepts feedback form submissions and writes them into this repo under `_data/feedback/<slug>/entry<timestamp>.yml`.

## 1) Prerequisites

- Cloudflare account
- Wrangler CLI (`npm i -g wrangler`)
- A GitHub token with `contents:write` on this repo

## 2) Configure

```bash
cd worker
cp wrangler.toml.example wrangler.toml
wrangler login
wrangler secret put GITHUB_TOKEN
```

## 3) Deploy

```bash
wrangler deploy
```

Copy the deployed URL and set it in `_config.yml`:

```yml
feedback:
  endpoint: "https://<your-worker>.workers.dev"
```

## 4) Verify

- Submit feedback from any learning page.
- Confirm a new file appears under `_data/feedback/...`.
- Confirm GitHub Action updates `data/feedback.csv`.
