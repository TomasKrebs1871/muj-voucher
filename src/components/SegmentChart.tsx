'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { SegmentData } from '@/lib/types'

interface Props {
  data: SegmentData[]
}

const COLORS = { B2B: '#3b82f6', B2C: '#10b981' }

function fmt(v: number) {
  return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(v)
}

export default function SegmentChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">B2B vs B2C — tržby</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
          <XAxis dataKey="segment" tick={{ fontSize: 13 }} />
          <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => fmt(Number(v))} />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
            {data.map(d => (
              <Cell key={d.segment} fill={COLORS[d.segment as keyof typeof COLORS] ?? '#6b7280'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-3">
        {data.map(d => (
          <div key={d.segment} className="text-sm">
            <span className="font-semibold text-gray-700">{d.segment}: </span>
            <span className="text-gray-500">{d.units.toLocaleString('cs-CZ')} ks</span>
          </div>
        ))}
      </div>
    </div>
  )
}
