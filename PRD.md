# PRD: Voucher Analytics — Lipoelastic

## Problém
Lipoelastic potřebuje přehlednou analýzu prodeje voucherů za Q1 2026, ale data z GA4 jsou v surové Excelové tabulce bez vizualizace nebo segmentace. CEO, obchodní a marketingový ředitel nemají rychlý způsob, jak porovnat výkon B2B a B2C voucherů nebo vidět, které produktové kategorie táhnou prodeje.

## Cílový uživatel
Management Lipoelastic — CEO, obchodní ředitel, marketingový ředitel.

## User Stories
- Jako manažer chci vidět celkové tržby z voucherů za Q1 2026, abych měl okamžitý přehled o výkonu.
- Jako marketingový ředitel chci porovnat B2B a B2C segment, abych věděl, kde vouchery fungují lépe.
- Jako obchodní ředitel chci vidět top vouchery podle tržeb, abych věděl, kteří partneři generují nejvíc prodejů.
- Jako manažer chci filtrovat data podle měsíce (leden / únor / březen), abych viděl trendy v čase.
- Jako manažer chci vidět prodeje podle kategorie produktu, abych pochopil, co se přes vouchery prodává.

## MVP Scope

### In scope
- Dashboard s KPI kartami (celkové tržby, počet prodaných kusů, počet aktivních voucherů)
- Rozdělení B2B vs B2C — tržby a počet kusů
- Top vouchery podle tržeb (tabulka + graf)
- Segmentace prodejů podle kategorie produktu
- Filtr: měsíc (leden / únor / březen / celé Q1)
- Filtr: segment (B2B / B2C / vše)

### Out of scope
- AI shrnutí výkonu pro prezentaci vedení
- Upload nových Excel souborů (přidání dalších období)
- Porovnání s předchozím kvartálem nebo rokem
- Export reportu do PDF nebo Excel
- Automatická synchronizace s GA4

## Datový model

### Tabulka: vouchers
| Sloupec | Typ | Popis |
|---------|-----|-------|
| id | integer (PK, identity) | Primární klíč |
| code | text | Unikátní kód voucheru (např. FNKV10) |
| segment | text | 'B2B' nebo 'B2C' |
| created_at | timestamptz | Čas vytvoření záznamu |

### Tabulka: sales
| Sloupec | Typ | Popis |
|---------|-----|-------|
| id | integer (PK, identity) | Primární klíč |
| month | integer | Měsíc (1=leden, 2=únor, 3=březen) |
| voucher_id | integer (FK → vouchers) | Reference na voucher |
| item_name | text | Název produktu |
| item_id | integer | ID produktu z GA4 |
| item_category | text | Kategorie produktu |
| item_revenue | numeric | Tržby v Kč |
| items_purchased | integer | Počet prodaných kusů |
| created_at | timestamptz | Čas vytvoření záznamu |

## SQL pro Supabase

Viz soubor `migrations/001_initial.sql`.

> **Spusť SQL v DEV projektu.** Až budeš deployovat, stejný SQL spustíš i v PROD projektu.
