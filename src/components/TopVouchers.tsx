'use client'

import { VoucherRow } from '@/lib/types'

interface Props {
  data: VoucherRow[]
}

function fmt(v: number) {
  return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(v)
}

export default function TopVouchers({ data }: Props) {
  const max = data[0]?.revenue ?? 1

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Top vouchery podle tržeb</h2>
      <div className="space-y-2">
        {data.map((row, i) => (
          <div key={row.code} className="flex items-center gap-3">
            <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                row.segment === 'B2B' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {row.segment}
            </span>
            <span className="text-sm text-gray-700 w-36 truncate font-mono">{row.code}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${row.segment === 'B2B' ? 'bg-blue-400' : 'bg-emerald-400'}`}
                style={{ width: `${(row.revenue / max) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-700 w-28 text-right">{fmt(row.revenue)}</span>
            <span className="text-xs text-gray-400 w-14 text-right">{row.units} ks</span>
          </div>
        ))}
      </div>
    </div>
  )
}
