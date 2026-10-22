import type { Category, Expense } from '../types'

export function monthKey(date: string): string {
  return date.slice(0, 7)
}

export function filterByMonth(expenses: Expense[], month: string): Expense[] {
  return expenses.filter((expense) => monthKey(expense.date) === month)
}

export function totalOf(expenses: Expense[]): number {
  return Math.round(expenses.reduce((sum, expense) => sum + expense.amount, 0) * 100) / 100
}

export function totalsByCategory(expenses: Expense[]): { category: Category; total: number }[] {
  const totals = new Map<Category, number>()

  for (const expense of expenses) {
    totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount)
  }

  return [...totals.entries()]
    .map(([category, total]) => ({ category, total: Math.round(total * 100) / 100 }))
    .sort((a, b) => b.total - a.total)
}

export function availableMonths(expenses: Expense[], currentMonth: string): string[] {
  const months = new Set(expenses.map((expense) => monthKey(expense.date)))
  months.add(currentMonth)

  return [...months].sort().reverse()
}

function escapeCsv(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

export function toCsv(expenses: Expense[]): string {
  const rows = expenses.map((expense) =>
    [expense.date, escapeCsv(expense.title), expense.category, expense.amount.toFixed(2)].join(','),
  )

  return ['Date,Title,Category,Amount', ...rows].join('\n')
}
