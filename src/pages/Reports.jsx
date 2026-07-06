import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import ReportsCharts from "../components/ReportsCharts";
import IncomeExpenseChart from "../components/IncomeExpenseChart";

import { useTransactions } from "../context/TransactionContext";

import "../styles/Reports.css";

const Reports = () => {
  const { transactions } = useTransactions();

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "Income"
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const totalIncome = incomeTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const totalExpenses = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const balance = totalIncome - totalExpenses;

  // Statistics

  const highestIncome =
    incomeTransactions.length > 0
      ? Math.max(
          ...incomeTransactions.map(
            (transaction) => transaction.amount
          )
        )
      : 0;

  const highestExpense =
    expenseTransactions.length > 0
      ? Math.max(
          ...expenseTransactions.map(
            (transaction) => transaction.amount
          )
        )
      : 0;

  const transactionCount = transactions.length;
  const incomeCount = incomeTransactions.length;
  const expenseCount = expenseTransactions.length;

  // Category Totals

  const expenseCategories = {};

  expenseTransactions.forEach((transaction) => {
    if (!expenseCategories[transaction.category]) {
      expenseCategories[transaction.category] = 0;
    }

    expenseCategories[transaction.category] +=
      transaction.amount;
  });

  const incomeCategories = {};

  incomeTransactions.forEach((transaction) => {
    if (!incomeCategories[transaction.category]) {
      incomeCategories[transaction.category] = 0;
    }

    incomeCategories[transaction.category] +=
      transaction.amount;
  });

  return (
    <>
      <PageHeader
        title="📊 Financial Reports"
        subtitle="View your financial summary."
      />

      {/* Summary Cards */}

      <div className="summary-grid">
        <Card>
          <h3>Total Income</h3>

          <p className="income-text">
            ￥{totalIncome.toLocaleString()}
          </p>
        </Card>

        <Card>
          <h3>Total Expenses</h3>

          <p className="expense-text">
            ￥{totalExpenses.toLocaleString()}
          </p>
        </Card>

        <Card>
          <h3>Net Balance</h3>

          <p>
            ￥{balance.toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Statistics */}

      <Card>
        <h2>Statistics</h2>

        <div className="report-row">
          <span>Highest Income</span>

          <strong className="income-text">
            ￥{highestIncome.toLocaleString()}
          </strong>
        </div>

        <div className="report-row">
          <span>Highest Expense</span>

          <strong className="expense-text">
            ￥{highestExpense.toLocaleString()}
          </strong>
        </div>

        <div className="report-row">
          <span>Total Transactions</span>

          <strong>{transactionCount}</strong>
        </div>

        <div className="report-row">
          <span>Income Entries</span>

          <strong>{incomeCount}</strong>
        </div>

        <div className="report-row">
          <span>Expense Entries</span>

          <strong>{expenseCount}</strong>
        </div>
      </Card>

      {/* Category Reports */}

      <div className="report-grid">
        <Card>
          <h2>Expenses by Category</h2>

          {Object.keys(expenseCategories).length === 0 ? (
            <p>No expense data.</p>
          ) : (
            Object.entries(expenseCategories).map(
              ([category, amount]) => (
                <div
                  className="report-row"
                  key={category}
                >
                  <span>{category}</span>

                  <strong className="expense-text">
                    ￥{amount.toLocaleString()}
                  </strong>
                </div>
              )
            )
          )}
        </Card>

        <Card>
          <h2>Income Sources</h2>

          {Object.keys(incomeCategories).length === 0 ? (
            <p>No income data.</p>
          ) : (
            Object.entries(incomeCategories).map(
              ([category, amount]) => (
                <div
                  className="report-row"
                  key={category}
                >
                  <span>{category}</span>

                  <strong className="income-text">
                    ￥{amount.toLocaleString()}
                  </strong>
                </div>
              )
            )
          )}
        </Card>
      </div>

      {/* Charts */}

      <div className="charts-grid">
        <Card>
          <h2>Expense Distribution</h2>

          <ReportsCharts
            expenseCategories={expenseCategories}
          />
        </Card>

        <Card>
          <h2>Income vs Expenses</h2>

          <IncomeExpenseChart
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </Card>
      </div>
    </>
  );
};

export default Reports;