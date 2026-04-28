-- Voucher Analytics — Lipoelastic Q1 2026
-- Spusť v Supabase SQL Editoru (DEV projekt)

-- =====================
-- TABULKY
-- =====================

CREATE TABLE vouchers (
  id integer generated always as identity primary key,
  code text not null unique,
  segment text not null check (segment in ('B2B', 'B2C')),
  created_at timestamptz default now()
);

CREATE TABLE sales (
  id integer generated always as identity primary key,
  month integer not null check (month between 1 and 12),
  voucher_id integer references vouchers(id) on delete cascade,
  item_name text not null,
  item_id integer,
  item_category text,
  item_revenue numeric not null default 0,
  items_purchased integer not null default 0,
  created_at timestamptz default now()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vouchers_allow_all" ON vouchers
  FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sales_allow_all" ON sales
  FOR ALL USING (true) WITH CHECK (true);

-- =====================
-- SEED: VOUCHERY (B2B / B2C klasifikace)
-- B2B = kliniky, nemocnice, lymfo centra, terapeuti
-- B2C = spotřebitelské kampaně a akce
-- =====================

INSERT INTO vouchers (code, segment) VALUES
-- B2B: Fakultní nemocnice (FN*)
('FNBRNO10',        'B2B'),
('FNBULOVKA10',     'B2B'),
('FNHRADEC10',      'B2B'),
('FNKV10',          'B2B'),
('FNMOTOL10',       'B2B'),
('FNOL10',          'B2B'),
('FNUSA10',         'B2B'),
-- B2B: Lymfo kliniky (L-*)
('L-AGELOVA10',     'B2B'),
('L-ARCUSOLOMOUC10','B2B'),
('L-BUDEJOVICE10',  'B2B'),
('L-FNO10',         'B2B'),
('L-FNOLKOZNI10',   'B2B'),
('L-FNUSA10',       'B2B'),
('L-KHN10',         'B2B'),
('L-KOZNILYMFO10',  'B2B'),
('L-MEDICAUH10',    'B2B'),
('L-MULACOVA10',    'B2B'),
('L-NEMPREROV10',   'B2B'),
('L-SNO10',         'B2B'),
('L-STROUHALOVA10', 'B2B'),
('L-VITKOVICE10',   'B2B'),
('L-ZDRAVAKUZE10',  'B2B'),
-- B2B: NTA síť terapeutů (NTA-10-*)
('NTA-10-BEROUN',   'B2B'),
('NTA-10-BH',       'B2B'),
('NTA-10-BK',       'B2B'),
('NTA-10-BRECLAV',  'B2B'),
('NTA-10-CB',       'B2B'),
('NTA-10-DECIN',    'B2B'),
('NTA-10-KLADNO',   'B2B'),
('NTA-10-LIBEREC',  'B2B'),
('NTA-10-MB',       'B2B'),
('NTA-10-OLOMOUC',  'B2B'),
('NTA-10-PLZEN',    'B2B'),
('NTA-10-SVITAVY',  'B2B'),
('NTA-10-TRUTNOV',  'B2B'),
('NTA-10-UNL',      'B2B'),
('NTA-10-UNO',      'B2B'),
-- B2B: Známé zdravotnické instituce
('IKEM10',          'B2B'),
('ISCARE10',        'B2B'),
('MOU10',           'B2B'),
('VFN10',           'B2B'),
('UEM10',           'B2B'),
('USTAVCHR10',      'B2B'),
('NEMOCNICEBEROUN10','B2B'),
('RAKOVNIK10',      'B2B'),
('VINOHRADY10',     'B2B'),
('MOTOLPLASTIKA10', 'B2B'),
-- B2B: Kliniky a odborná centra
('ABCCLINIC10',     'B2B'),
('ABCLINIC10',      'B2B'),
('AWACLINIC10',     'B2B'),
('PRAGUECLINIC10',  'B2B'),
('MEDICOMCLINIC',   'B2B'),
('ANGIO10',         'B2B'),
('ANGIODNY10',      'B2B'),
('ANGIOZDAR10',     'B2B'),
('FITLYMFA10',      'B2B'),
('LYMFAVPOHYBU10',  'B2B'),
('LYMFOBEROUN10',   'B2B'),
('LYMFOCARE10',     'B2B'),
('LYMFOKINDL10',    'B2B'),
('LYMFOL10',        'B2B'),
('LYMRAPOTIN10',    'B2B'),
('LPLYMF10',        'B2B'),
('LASERPLASTIC',    'B2B'),
('LASERPLASTIC10',  'B2B'),
('PLASTICARE10',    'B2B'),
('PLASTIKAČB10',    'B2B'),
('MEDICOMB10',      'B2B'),
('MEDICOMP10',      'B2B'),
('MEDIKAP10',       'B2B'),
('DERMI10',         'B2B'),
('10ESTHE',         'B2B'),
('ESTHE10',         'B2B'),
('ESTHESIA10',      'B2B'),
('AESTHEVITA10',    'B2B'),
('OFFTHERAPY10',    'B2B'),
('FYZIOVLEHKOSTI10','B2B'),
('AROMASTUDIO10',   'B2B'),
('CASTLEBEAUTY10',  'B2B'),
('CLEOPATRA10',     'B2B'),
('FORME10',         'B2B'),
('GIA10',           'B2B'),
('HOMEA10',         'B2B'),
('KOSTR10',         'B2B'),
('LD10',            'B2B'),
('LLCOLO10',        'B2B'),
('LLCOVA10',        'B2B'),
('MBC10',           'B2B'),
('OPCH10',          'B2B'),
('PERFECTL10',      'B2B'),
('PERFECTPR10',     'B2B'),
('PREMIER10',       'B2B'),
('PRIVAMED10',      'B2B'),
('RENOME10',        'B2B'),
('RRC10',           'B2B'),
('SANUS10',         'B2B'),
('VENUSIUM10',      'B2B'),
('VERONIVITA10',    'B2B'),
('OB10',            'B2B'),
('AMEM10E',         'B2B'),
('ART_ETHIC10',     'B2B'),
('BODY&FACE10',     'B2B'),
('MARBELLE10E',     'B2B'),
('SOMMEROVA10E',    'B2B'),
('STEPANKA10',      'B2B'),
('STIBOROVA10',     'B2B'),
('TEREZA10',        'B2B'),
('ELI10',           'B2B'),
('LETICIA10',       'B2B'),
('MACECEK10',       'B2B'),
('VONCOVA10',       'B2B'),
('DOLEZAL10',       'B2B'),
('KUBIKOVA10',      'B2B'),
('KULHANEK10',      'B2B'),
('POMAD10',         'B2B'),
('DOBES10',         'B2B'),
('A-Z10',           'B2B'),
('AZ10',            'B2B'),
('HAWAII10',        'B2B'),
-- B2C: Spotřebitelské kampaně
('MUJLIPOELASTIC',  'B2C'),
('LIPOELASTIC10',   'B2C'),
('NEWLEGS2026',     'B2C'),
('NOVELEGINY',      'B2C'),
('BF25',            'B2C'),
('VALENTINE',       'B2C'),
('LIPEDEMBOOK',     'B2C'),
('COLLAGENTEST',    'B2C'),
('THANKYOU10',      'B2C'),
('300PROTEBE',      'B2C'),
('MDZ20',           'B2C'),
('PAYER10',         'B2C');
