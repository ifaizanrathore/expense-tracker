import { describe, expect, it } from 'vitest'
import { availableMonths, filterByMonth, toCsv, totalOf, totalsByCategory } from './expenses'
import type { Expense } from '../types'

const expenses: Expense[] = [
  { id: '1', title: 'Groceries', amount: 42.1, category: 'Food', date: '2026-10-02' },
  { id: '2', title: 'Bus pass', amount: 30, category: 'Transport', date: '2026-10-05' },
  { id: '3', title: 'Dinner, with "friends"', amount: 25.2, category: 'Food', date: '2026-10-09' },
  { id: '4', title: 'Rent', amount: 900, category: 'Housing', date: '2026-09-01' },
]

describe('expenses', () => {
  it('filters expenses to a single month', () => {
    expect(filterByMonth(expenses, '2026-10').map((e) => e.id)).toEqual(['1', '2', '3'])
  })

  it('totals without floating point drift', () => {
    expect(totalOf(filterByMonth(expenses, '2026-10'))).toBe(97.3)
  })

  it('groups totals by category, largest first', () => {
    expect(totalsByCategory(filterByMonth(expenses, '2026-10'))).toEqual([
      { category: 'Food', total: 67.3 },
      { category: 'Transport', total: 30 },
    ])
  })

  it('always includes the current month, newest first', () => {
    expect(availableMonths(expenses, '2026-11')).toEqual(['2026-11', '2026-10', '2026-09'])
  })

  it('escapes commas and quotes in CSV output', () => {
    expect(toCsv([expenses[2]])).toBe('Date,Title,Category,Amount\n2026-10-09,"Dinner, with ""friends""",Food,25.20')
  })
})
