# Voucher Analytics — Lipoelastic

Dashboard pro analýzu prodeje voucherů Lipoelastic za Q1 2026. Zobrazuje výkon B2B a B2C segmentu, top vouchery podle tržeb a segmentaci podle kategorie produktu.

## Stack
Next.js + Supabase + Tailwind + Vercel

## Lokální vývoj
```bash
npm install
npm run dev
```

Otevři http://localhost:3000

---

## Supabase setup
1. Spusť `migrations/001_initial.sql` v DEV projektu (tabulky + vouchery)
2. Spusť `migrations/002_seed_sales.sql` v DEV projektu (data z GA4)
3. Vytvoř `.env.local` podle `.env.example`

## Deploy
```bash
/hack-deploy
```
