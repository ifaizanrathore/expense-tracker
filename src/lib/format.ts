const currency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })

export const formatMoney = (amount: number): string => currency.format(amount)

export function formatMonth(month: string): string {
  const [year, monthIndex] = month.split('-').map(Number)
  return new Date(year, monthIndex - 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

export function today(): string {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}
