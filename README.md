# 💸 Expense Tracker

A fast, private expense tracker that runs entirely in your browser. Log what you spend, set a monthly budget, see where the money goes by category, and export any month to CSV.

**Live demo:** https://ifaizanrathore.github.io/expense-tracker/

## Features

- Add expenses with a title, amount, category and date
- Monthly budget with a remaining or over-budget indicator
- Per-category breakdown with share of total spending
- Switch between months; your history is kept
- Export the selected month to CSV (commas and quotes escaped properly)
- Light and dark mode
- No account and no server: data is saved in `localStorage`

## Tech stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev) for dev server and builds
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vitest](https://vitest.dev) for unit tests
- Deployed to GitHub Pages

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm test         # run unit tests
npm run build    # production build in dist/
```

## Project structure

```
src/
├── App.tsx                  # layout, budget summary, month picker
├── components/
│   ├── ExpenseForm.tsx      # add an expense
│   ├── ExpenseList.tsx      # list and delete expenses
│   └── CategoryBreakdown.tsx
├── lib/
│   ├── expenses.ts          # pure functions: filtering, totals, CSV
│   ├── expenses.test.ts
│   ├── format.ts            # currency and date formatting
│   └── useLocalStorage.ts   # persisted state hook
└── types.ts
```

The business logic in `lib/expenses.ts` is kept free of React, so it's easy to test in isolation.

## License

[MIT](LICENSE)
