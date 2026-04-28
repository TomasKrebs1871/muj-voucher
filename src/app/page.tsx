'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { Month, Segment, KpiData, SegmentData, VoucherRow, CategoryRow } from '@/lib/types'
import KpiCard from '@/components/KpiCard'
import Filters from '@/components/Filters'
import SegmentChart from '@/components/SegmentChart'
import TopVouchers from '@/components/TopVouchers'
import CategoryChart from '@/components/CategoryChart'

function fmt(v: number) {
  return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(v)
}

export default function Dashboard() {
  const [month, setMonth] = useState<Month>(0)
  const [segment, setSegment] = useState<Segment>('vse')
  const [kpi, setKpi] = useState<KpiData | null>(null)
  const [segmentData, setSegmentData] = useState<SegmentData[]>([])
  const [topVouchers, setTopVouchers] = useState<VoucherRow[]>([])
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    // Základní dotaz se joinem na vouchers
    let q = supabase
      .from('sales')
      .select('month, item_revenue, items_purchased, item_category, vouchers!inner(code, segment)')

    if (month !== 0) q = q.eq('month', month)
    if (segment !== 'vse') q = q.eq('vouchers.segment', segment)

    const { data: rows } = await q

    if (!rows) { setLoading(false); return }

    // KPI
    const totalRevenue = rows.reduce((s, r) => s + Number(r.item_revenue), 0)
    const totalUnits = rows.reduce((s, r) => s + Number(r.items_purchased), 0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vouchers = Array.from(new Set(rows.map((r: any) => r.vouchers?.code)))
    setKpi({ totalRevenue, totalUnits, activeVouchers: vouchers.length })

    // B2B vs B2C
    const segMap: Record<string, SegmentData> = {}
    for (const r of rows) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const seg: string = (r.vouchers as any)?.segment ?? 'B2C'
      if (!segMap[seg]) segMap[seg] = { segment: seg, revenue: 0, units: 0 }
      segMap[seg].revenue += Number(r.item_revenue)
      segMap[seg].units += Number(r.items_purchased)
    }
    setSegmentData(Object.values(segMap).sort((a, b) => b.revenue - a.revenue))

    // Top vouchery
    const vMap: Record<string, VoucherRow> = {}
    for (const r of rows) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const code: string = (r.vouchers as any)?.code ?? '?'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const seg: string = (r.vouchers as any)?.segment ?? 'B2C'
      if (!vMap[code]) vMap[code] = { code, segment: seg, revenue: 0, units: 0 }
      vMap[code].revenue += Number(r.item_revenue)
      vMap[code].units += Number(r.items_purchased)
    }
    setTopVouchers(Object.values(vMap).sort((a, b) => b.revenue - a.revenue).slice(0, 15))

    // Kategorie
    const catMap: Record<string, CategoryRow> = {}
    for (const r of rows) {
      const cat = r.item_category?.trim() ?? 'Ostatní'
      if (!catMap[cat]) catMap[cat] = { category: cat, revenue: 0, units: 0 }
      catMap[cat].revenue += Number(r.item_revenue)
      catMap[cat].units += Number(r.items_purchased)
    }
    setCategories(Object.values(catMap).sort((a, b) => b.revenue - a.revenue))

    setLoading(false)
  }, [month, segment])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Voucher Analytics</h1>
          <p className="text-sm text-gray-500">Lipoelastic — Q1 2026</p>
        </div>
        <Filters month={month} segment={segment} onMonthChange={setMonth} onSegmentChange={setSegment} />
      </div>

      {loading && (
        <div className="text-center py-16 text-gray-400 text-sm">Načítám data...</div>
      )}

      {!loading && kpi && (
        <>
          {/* KPI karty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KpiCard title="Celkové tržby" value={fmt(kpi.totalRevenue)} sub="vč. DPH" />
            <KpiCard title="Prodáno kusů" value={kpi.totalUnits.toLocaleString('cs-CZ')} />
            <KpiCard title="Aktivní vouchery" value={String(kpi.activeVouchers)} sub="unikátních kódů" />
          </div>

          {/* B2B vs B2C + Kategorie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SegmentChart data={segmentData} />
            <CategoryChart data={categories} />
          </div>

          {/* Top vouchery */}
          <TopVouchers data={topVouchers} />
        </>
      )}
    </div>
  )
}
