# Get Q Labs

Independent Get Q Labs sales funnel, Authorize.Net checkout, one-click upgrade flow, reporting database, and campaign admin.

## Funnel

| Route | Product | Price | Discount |
|---|---|---:|---:|
| `/` | Q Labs | $47 | — |
| `/oto1` | Done-For-You | $197 | $97 |
| `/oto2` | Automated Profits | $97 | $47 |
| `/oto3` | Instant Income | $67 | $37 |
| `/oto4` | Cyber Protection | $127 | $97 |
| `/oto5` | Autopilot Earnings | $147 | $47 |
| `/oto6` | High-Ticket Payout | $97 | $47 |
| `/oto7` | Reseller & License Rights | $167 | $67 |
| `/thankyou` | Order completion and onboarding | — | — |

The original page videos remain hosted by the source video provider. Checkout and upgrade links are handled by this application.

## Infrastructure

- Payments: Authorize.Net Accept.js and Customer Profiles for one-click upgrades.
- Database: a dedicated Neon Postgres database configured through this project's `DATABASE_URL`; it must not point to another offer's database.
- Hosting: Vercel Node function through `api/index.mjs`.
- Admin: `/admin`, PIN `67`; protected lead data PIN `0720`.

Create a separate Vercel project from this repository, provision a separate Neon database for it, and populate the variables listed in `.env.example`. Never commit production credentials.

## Local verification

```bash
npm install
npm test
npm start
```

Run `npm run mirror` only when intentionally refreshing the source page layouts.
