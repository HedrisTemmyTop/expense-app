import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/request";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // const [fetchedExpense, setFetchedExpense] = useState([]);

  useEffect(() => {
    const fetchExpenses = async function () {
      setIsLoading(true);
      try {
        const data = await getExpenses();

        expensesCtx.setExpenses(data);
      } catch (error) {
        setError("Could not fetch expenses!");
      } finally {
        setIsLoading(false);
      }

      // setFetchedExpense(data);
    };

    fetchExpenses();
  }, []);
  console.log(expensesCtx.expenses);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    console.log(date7DaysAgo);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  const handleResetError = function () {
    setError("");
  };
  console.log(recentExpenses);
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={handleResetError} />;
  if (isLoading) return <LoadingOverlay />;
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
