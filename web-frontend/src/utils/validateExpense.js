import { EPSILON } from './consts';

const validateExpense = (expense_amount, shares) => {
  const totalShares = shares.reduce((a, b) => a + b.share_amount, 0);
  return Math.abs(totalShares - Number(expense_amount)) < EPSILON;
};

export { validateExpense };
