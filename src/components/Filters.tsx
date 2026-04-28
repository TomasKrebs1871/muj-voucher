'use client'

import { Month, Segment } from '@/lib/types'

interface Props {
  month: Month
  segment: Segment
  onMonthChange: (m: Month) => void
  onSegmentChange: (s: Segment) => void
}

export default function Filters({ month, segment, onMonthChange, onSegmentChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Měsíc:</label>
        <select
          value={month}
          onChange={e => onMonthChange(Number(e.target.value) as Month)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>Celé Q1</option>
          <option value={1}>Leden</option>
          <option value={2}>Únor</option>
          <option value={3}>Březen</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Segment:</label>
        <select
          value={segment}
          onChange={e => onSegmentChange(e.target.value as Segment)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="vse">Vše</option>
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </select>
      </div>
    </div>
  )
}
