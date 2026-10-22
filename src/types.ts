export const CATEGORIES = ['Food', 'Transport', 'Housing', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'] as const

export type Category = (typeof CATEGORIES)[number]

export interface Expense {
  id: string
  title: string
  amount: number
  category: Category
  date: string
}
