import type { Category } from '../types'
import { formatMoney } from '../lib/format'

interface Props {
  totals: { category: Category; total: number }[]
  grandTotal: number
}

export function CategoryBreakdown({ totals, grandTotal }: Props) {
  if (totals.length === 0) {
    return <p className="text-sm text-slate-500">No spending this month yet.</p>
  }

  return (
    <ul className="space-y-3">
      {totals.map(({ category, total }) => {
        const share = grandTotal > 0 ? (total / grandTotal) * 100 : 0
        return (
          <li key={category}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{category}</span>
              <span className="tabular-nums text-slate-500">
                {formatMoney(total)} · {share.toFixed(0)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${share}%` }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
