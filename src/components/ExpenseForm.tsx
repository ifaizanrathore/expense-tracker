import { useState, type FormEvent } from 'react'
import { CATEGORIES, type Category, type Expense } from '../types'
import { today } from '../lib/format'

interface Props {
  onAdd: (expense: Expense) => void
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900'

export function ExpenseForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>('Food')
  const [date, setDate] = useState(today())

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const parsedAmount = Number(amount)

    if (!title.trim() || !(parsedAmount > 0)) {
      return
    }

    onAdd({ id: crypto.randomUUID(), title: title.trim(), amount: parsedAmount, category, date })
    setTitle('')
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <input className={inputClass} placeholder="What did you spend on?" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Title" required />
      <input className={inputClass} type="number" min="0.01" step="0.01" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} aria-label="Amount" required />
      <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as Category)} aria-label="Category">
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input className={inputClass} type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date" required />
      <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Add</button>
    </form>
  )
}
