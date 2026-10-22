import { useEffect, useMemo, useState } from 'react'
import type { Expense } from './types'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { useLocalStorage } from './lib/useLocalStorage'
import { availableMonths, filterByMonth, monthKey, toCsv, totalOf, totalsByCategory } from './lib/expenses'
import { formatMonth, formatMoney, today } from './lib/format'

const card = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', [])
  const [budget, setBudget] = useLocalStorage<number>('monthly-budget', 1000)
  const [dark, setDark] = useLocalStorage<boolean>('dark-mode', window.matchMedia('(prefers-color-scheme: dark)').matches)
  const currentMonth = monthKey(today())
  const [month, setMonth] = useState(currentMonth)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const monthExpenses = useMemo(
    () => filterByMonth(expenses, month).sort((a, b) => b.date.localeCompare(a.date)),
    [expenses, month],
  )
  const spent = totalOf(monthExpenses)
  const remaining = budget - spent
  const usedPercent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0

  function exportCsv() {
    const blob = new Blob([toCsv(monthExpenses)], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `expenses-${month}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">💸 Expense Tracker</h1>
          <p className="text-sm text-slate-500">Your data stays in this browser.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            aria-label="Month"
          >
            {availableMonths(expenses, currentMonth).map((m) => (
              <option key={m} value={m}>
                {formatMonth(m)}
              </option>
            ))}
          </select>
          <button onClick={() => setDark(!dark)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700" aria-label="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className={card}>
          <p className="text-sm text-slate-500">Spent</p>
          <p className="text-2xl font-bold tabular-nums">{formatMoney(spent)}</p>
        </div>
        <div className={card}>
          <label className="text-sm text-slate-500" htmlFor="budget">
            Monthly budget
          </label>
          <input
            id="budget"
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="block w-full bg-transparent text-2xl font-bold tabular-nums outline-none"
          />
        </div>
        <div className={card}>
          <p className="text-sm text-slate-500">{remaining >= 0 ? 'Remaining' : 'Over budget'}</p>
          <p className={`text-2xl font-bold tabular-nums ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            {formatMoney(Math.abs(remaining))}
          </p>
          <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
            <div className={`h-1.5 rounded-full ${remaining < 0 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${usedPercent}%` }} />
          </div>
        </div>
      </section>

      <section className={`${card} mb-6`}>
        <ExpenseForm onAdd={(expense) => setExpenses([...expenses, expense])} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className={card}>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">{formatMonth(month)}</h2>
            <button onClick={exportCsv} disabled={monthExpenses.length === 0} className="text-sm font-medium text-emerald-600 hover:underline disabled:opacity-40">
              Export CSV
            </button>
          </div>
          <ExpenseList expenses={monthExpenses} onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))} />
        </section>
        <section className={card}>
          <h2 className="mb-4 font-semibold">By category</h2>
          <CategoryBreakdown totals={totalsByCategory(monthExpenses)} grandTotal={spent} />
        </section>
      </div>
    </main>
  )
}
