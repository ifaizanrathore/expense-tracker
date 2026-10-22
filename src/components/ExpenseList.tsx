import type { Expense } from '../types'
import { formatMoney } from '../lib/format'

interface Props {
  expenses: Expense[]
  onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">Nothing here yet. Add your first expense above.</p>
  }

  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
      {expenses.map((expense) => (
        <li key={expense.id} className="flex items-center gap-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{expense.title}</p>
            <p className="text-xs text-slate-500">
              {expense.category} · {new Date(`${expense.date}T00:00`).toLocaleDateString()}
            </p>
          </div>
          <span className="font-semibold tabular-nums">{formatMoney(expense.amount)}</span>
          <button
            onClick={() => onDelete(expense.id)}
            className="rounded-md px-2 py-1 text-sm text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
            aria-label={`Delete ${expense.title}`}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
