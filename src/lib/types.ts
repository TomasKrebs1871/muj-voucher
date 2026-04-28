export type Segment = 'B2B' | 'B2C' | 'vse'
export type Month = 1 | 2 | 3 | 0 // 0 = celé Q1

export interface KpiData {
  totalRevenue: number
  totalUnits: number
  activeVouchers: number
}

export interface SegmentData {
  segment: string
  revenue: number
  units: number
}

export interface VoucherRow {
  code: string
  segment: string
  revenue: number
  units: number
}

export interface CategoryRow {
  category: string
  revenue: number
  units: number
}
