import { useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import ReportsCharts from "../components/ReportsCharts";
import IncomeExpenseChart from "../components/IncomeExpenseChart";

import { useTransactions } from "../context/TransactionContext";

import "../styles/Reports.css";

const Reports = () => {
  const {
    transactions,
    transactionsLoading,
    transactionError,
  } = useTransactions();

  const navigate = useNavigate();

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "Income"
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const totalIncome = incomeTransactions.reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  );

  const totalExpenses = expenseTransactions.reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  );

  const balance = totalIncome - totalExpenses;

  const highestIncome =
    incomeTransactions.length > 0
      ? Math.max(
          ...incomeTransactions.map((transaction) =>
            Number(transaction.amount)
          )
        )
      : 0;

  const highestExpense =
    expenseTransactions.length > 0
      ? Math.max(
          ...expenseTransactions.map((transaction) =>
            Number(transaction.amount)
          )
        )
      : 0;

  const averageIncome =
    incomeTransactions.length > 0
      ? totalIncome / incomeTransactions.length
      : 0;

  const averageExpense =
    expenseTransactions.length > 0
      ? totalExpenses / expenseTransactions.length
      : 0;

  const transactionCount = transactions.length;
  const incomeCount = incomeTransactions.length;
  const expenseCount = expenseTransactions.length;

  const expenseCategories = expenseTransactions.reduce(
    (totals, transaction) => {
      const category = transaction.category;
      const amount = Number(transaction.amount);

      totals[category] =
        (totals[category] || 0) + amount;

      return totals;
    },
    {}
  );

  const incomeCategories = incomeTransactions.reduce(
    (totals, transaction) => {
      const category = transaction.category;
      const amount = Number(transaction.amount);

      totals[category] =
        (totals[category] || 0) + amount;

      return totals;
    },
    {}
  );

  const sortedExpenseCategories = Object.entries(
    expenseCategories
  ).sort((a, b) => b[1] - a[1]);

  const sortedIncomeCategories = Object.entries(
    incomeCategories
  ).sort((a, b) => b[1] - a[1]);

  const topExpenseCategory =
    sortedExpenseCategories[0] || null;

  const topIncomeCategory =
    sortedIncomeCategories[0] || null;

  const savingsRate =
    totalIncome > 0
      ? (balance / totalIncome) * 100
      : 0;

  const expenseRatio =
    totalIncome > 0
      ? (totalExpenses / totalIncome) * 100
      : 0;

  const formatCurrency = (amount) =>
    `￥${Number(amount).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;

  const formatPercentage = (value) =>
    `${Number(value).toFixed(1)}%`;

  const getFinancialMessage = () => {
    if (transactionCount === 0) {
      return {
        icon: "📊",
        title: "Start building your financial report",
        message:
          "Add income and expense transactions to generate useful financial insights.",
        type: "neutral",
      };
    }

    if (balance > 0) {
      return {
        icon: "✅",
        title: "Your balance is positive",
        message: `You currently have ${formatCurrency(
          balance
        )} remaining after expenses.`,
        type: "positive",
      };
    }

    if (balance < 0) {
      return {
        icon: "⚠️",
        title: "Your expenses exceed your income",
        message: `You are currently over budget by ${formatCurrency(
          Math.abs(balance)
        )}.`,
        type: "negative",
      };
    }

    return {
      icon: "ℹ️",
      title: "Your income and expenses are equal",
      message:
        "Your current balance is zero. Review your spending to create more savings.",
      type: "neutral",
    };
  };

  const financialMessage = getFinancialMessage();

  if (transactionsLoading) {
    return (
      <>
        <PageHeader
          title="📈 Reports"
          subtitle="Analyze your financial activity and spending trends."
        />

        <Card className="reports-loading-card">
          <div className="reports-loading-state">
            <span
              className="reports-spinner"
              aria-hidden="true"
            />

            <h3>Preparing your financial reports</h3>

            <p>
              Calculating totals, categories, and financial
              insights...
            </p>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="📈 Reports"
        subtitle="Analyze your financial activity and spending trends."
      />

      {transactionError && (
        <div className="report-error" role="alert">
          <span aria-hidden="true">⚠️</span>

          <span>{transactionError}</span>
        </div>
      )}

      {transactionCount === 0 ? (
        <Card className="reports-empty-card">
          <div className="reports-empty-state">
            <div
              className="reports-empty-icon"
              aria-hidden="true"
            >
              📈
            </div>

            <h2>No report data yet</h2>

            <p>
              Add your first income or expense transaction
              to unlock summaries, category reports, charts,
              and financial insights.
            </p>

            <button
              type="button"
              className="reports-primary-btn"
              onClick={() =>
                navigate("/transactions")
              }
            >
              Add a Transaction
            </button>
          </div>
        </Card>
      ) : (
        <>
          <div className="reports-summary-grid">
            <Card className="report-summary-card income-summary-card">
              <div className="report-summary-top">
                <span className="report-summary-icon">
                  💵
                </span>

                <span className="report-summary-label">
                  Total Income
                </span>
              </div>

              <strong className="report-summary-value income-value">
                {formatCurrency(totalIncome)}
              </strong>

              <small>
                {incomeCount}{" "}
                {incomeCount === 1
                  ? "income entry"
                  : "income entries"}
              </small>
            </Card>

            <Card className="report-summary-card expense-summary-card">
              <div className="report-summary-top">
                <span className="report-summary-icon">
                  💳
                </span>

                <span className="report-summary-label">
                  Total Expenses
                </span>
              </div>

              <strong className="report-summary-value expense-value">
                {formatCurrency(totalExpenses)}
              </strong>

              <small>
                {expenseCount}{" "}
                {expenseCount === 1
                  ? "expense entry"
                  : "expense entries"}
              </small>
            </Card>

            <Card
              className={`report-summary-card ${
                balance >= 0
                  ? "balance-positive-card"
                  : "balance-negative-card"
              }`}
            >
              <div className="report-summary-top">
                <span className="report-summary-icon">
                  👛
                </span>

                <span className="report-summary-label">
                  Net Balance
                </span>
              </div>

              <strong
                className={`report-summary-value ${
                  balance >= 0
                    ? "income-value"
                    : "expense-value"
                }`}
              >
                {formatCurrency(balance)}
              </strong>

              <small>
                Savings rate:{" "}
                {formatPercentage(savingsRate)}
              </small>
            </Card>
          </div>

          <Card
            className={`financial-insight-card insight-${financialMessage.type}`}
          >
            <div className="financial-insight-icon">
              {financialMessage.icon}
            </div>

            <div className="financial-insight-content">
              <h2>{financialMessage.title}</h2>

              <p>{financialMessage.message}</p>
            </div>
          </Card>

          <div className="reports-statistics-grid">
            <Card className="reports-statistics-card">
              <div className="reports-card-heading">
                <div>
                  <h2>Financial Statistics</h2>

                  <p>
                    Key figures based on all of your
                    transactions.
                  </p>
                </div>

                <span className="reports-heading-icon">
                  📊
                </span>
              </div>

              <div className="report-stat-list">
                <div className="report-stat-row">
                  <span>Highest Income</span>

                  <strong className="income-value">
                    {formatCurrency(highestIncome)}
                  </strong>
                </div>

                <div className="report-stat-row">
                  <span>Highest Expense</span>

                  <strong className="expense-value">
                    {formatCurrency(highestExpense)}
                  </strong>
                </div>

                <div className="report-stat-row">
                  <span>Average Income</span>

                  <strong>
                    {formatCurrency(averageIncome)}
                  </strong>
                </div>

                <div className="report-stat-row">
                  <span>Average Expense</span>

                  <strong>
                    {formatCurrency(averageExpense)}
                  </strong>
                </div>

                <div className="report-stat-row">
                  <span>Total Transactions</span>

                  <strong>{transactionCount}</strong>
                </div>
              </div>
            </Card>

            <Card className="reports-statistics-card">
              <div className="reports-card-heading">
                <div>
                  <h2>Quick Insights</h2>

                  <p>
                    Highlights from your income and
                    expenses.
                  </p>
                </div>

                <span className="reports-heading-icon">
                  💡
                </span>
              </div>

              <div className="report-insight-list">
                <div className="report-insight-item">
                  <span className="report-insight-icon expense">
                    📉
                  </span>

                  <div>
                    <span>Top Expense Category</span>

                    <strong>
                      {topExpenseCategory
                        ? topExpenseCategory[0]
                        : "No expense data"}
                    </strong>

                    {topExpenseCategory && (
                      <small>
                        {formatCurrency(
                          topExpenseCategory[1]
                        )}
                      </small>
                    )}
                  </div>
                </div>

                <div className="report-insight-item">
                  <span className="report-insight-icon income">
                    📈
                  </span>

                  <div>
                    <span>Top Income Source</span>

                    <strong>
                      {topIncomeCategory
                        ? topIncomeCategory[0]
                        : "No income data"}
                    </strong>

                    {topIncomeCategory && (
                      <small>
                        {formatCurrency(
                          topIncomeCategory[1]
                        )}
                      </small>
                    )}
                  </div>
                </div>

                <div className="report-insight-item">
                  <span className="report-insight-icon balance">
                    💰
                  </span>

                  <div>
                    <span>Expense-to-Income Ratio</span>

                    <strong>
                      {formatPercentage(expenseRatio)}
                    </strong>

                    <small>
                      Percentage of income used for expenses
                    </small>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="report-category-grid">
            <Card className="report-category-card">
              <div className="reports-card-heading">
                <div>
                  <h2>Expenses by Category</h2>

                  <p>
                    Categories ordered from highest to
                    lowest spending.
                  </p>
                </div>

                <span className="reports-heading-icon">
                  💳
                </span>
              </div>

              {sortedExpenseCategories.length === 0 ? (
                <div className="report-mini-empty">
                  No expense data available.
                </div>
              ) : (
                <div className="report-category-list">
                  {sortedExpenseCategories.map(
                    ([category, amount], index) => {
                      const percentage =
                        totalExpenses > 0
                          ? (amount / totalExpenses) * 100
                          : 0;

                      return (
                        <div
                          className="report-category-item"
                          key={category}
                        >
                          <div className="report-category-top">
                            <div>
                              <span className="category-rank">
                                {index + 1}
                              </span>

                              <strong>{category}</strong>
                            </div>

                            <span className="expense-value">
                              {formatCurrency(amount)}
                            </span>
                          </div>

                          <div className="category-progress-track">
                            <span
                              className="category-progress expense-progress"
                              style={{
                                width: `${Math.min(
                                  percentage,
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                          <small>
                            {formatPercentage(percentage)} of
                            total expenses
                          </small>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </Card>

            <Card className="report-category-card">
              <div className="reports-card-heading">
                <div>
                  <h2>Income Sources</h2>

                  <p>
                    Sources ordered from highest to lowest
                    income.
                  </p>
                </div>

                <span className="reports-heading-icon">
                  💵
                </span>
              </div>

              {sortedIncomeCategories.length === 0 ? (
                <div className="report-mini-empty">
                  No income data available.
                </div>
              ) : (
                <div className="report-category-list">
                  {sortedIncomeCategories.map(
                    ([category, amount], index) => {
                      const percentage =
                        totalIncome > 0
                          ? (amount / totalIncome) * 100
                          : 0;

                      return (
                        <div
                          className="report-category-item"
                          key={category}
                        >
                          <div className="report-category-top">
                            <div>
                              <span className="category-rank">
                                {index + 1}
                              </span>

                              <strong>{category}</strong>
                            </div>

                            <span className="income-value">
                              {formatCurrency(amount)}
                            </span>
                          </div>

                          <div className="category-progress-track">
                            <span
                              className="category-progress income-progress"
                              style={{
                                width: `${Math.min(
                                  percentage,
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                          <small>
                            {formatPercentage(percentage)} of
                            total income
                          </small>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </Card>
          </div>

          <div className="reports-charts-grid">
            <Card className="report-chart-card">
              <div className="reports-card-heading">
                <div>
                  <h2>Expense Distribution</h2>

                  <p>
                    Compare how your spending is divided by
                    category.
                  </p>
                </div>

                <span className="reports-heading-icon">
                  🥧
                </span>
              </div>

              {sortedExpenseCategories.length === 0 ? (
                <div className="report-chart-empty">
                  No expense data available for this chart.
                </div>
              ) : (
                <ReportsCharts
                  expenseCategories={expenseCategories}
                />
              )}
            </Card>

            <Card className="report-chart-card">
              <div className="reports-card-heading">
                <div>
                  <h2>Income vs Expenses</h2>

                  <p>
                    Compare your total income with your
                    total spending.
                  </p>
                </div>

                <span className="reports-heading-icon">
                  📊
                </span>
              </div>

              <IncomeExpenseChart
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
              />
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Reports;