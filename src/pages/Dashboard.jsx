import { useNavigate } from "react-router-dom";

import SummaryCard from "../components/SummaryCard";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

import { useTransactions } from "../context/TransactionContext";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
} from "react-icons/fa";

import "../styles/Dashboard.css";

const Dashboard = () => {
  const {
    transactions,
    transactionsLoading,
  } = useTransactions();

  const navigate = useNavigate();

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const totalExpenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const balance = totalIncome - totalExpenses;

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const formatCurrency = (amount) =>
    `￥${Number(amount).toLocaleString()}`;

  const formatDate = (date) => {
    if (!date) {
      return "No date";
    }

    return new Date(date).toLocaleDateString(
      "en-JP",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <>
      <PageHeader
        title="📊 Dashboard"
        subtitle="Manage your income and expenses."
      />

      <div className="summary-grid">
        <SummaryCard
          icon={<FaMoneyBillWave />}
          title="Income"
          amount={formatCurrency(totalIncome)}
        />

        <SummaryCard
          icon={<FaCreditCard />}
          title="Expenses"
          amount={formatCurrency(totalExpenses)}
        />

        <SummaryCard
          icon={<FaWallet />}
          title="Balance"
          amount={formatCurrency(balance)}
          className={
            balance < 0
              ? "negative-balance-card"
              : ""
          }
        />
      </div>

      <Card className="dashboard-recent-card">
        <div className="dashboard-section-header">
          <div>
            <h2>Recent Transactions</h2>

            <p>
              Your five most recently added financial
              records.
            </p>
          </div>

          {transactions.length > 0 && (
            <button
              type="button"
              className="view-all-btn"
              onClick={() =>
                navigate("/transactions")
              }
            >
              View All
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        {transactionsLoading ? (
          <div className="dashboard-loading">
            <span
              className="dashboard-spinner"
              aria-hidden="true"
            />

            <p>Loading your transactions...</p>
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="dashboard-empty-state">
            <div
              className="dashboard-empty-icon"
              aria-hidden="true"
            >
              📊
            </div>

            <h3>No transactions yet</h3>

            <p>
              Add your first income or expense to begin
              tracking your finances.
            </p>

            <button
              type="button"
              className="dashboard-primary-btn"
              onClick={() =>
                navigate("/transactions")
              }
            >
              Add Your First Transaction
            </button>
          </div>
        ) : (
          <div className="recent-table-wrapper">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map(
                  (transaction) => (
                    <tr key={transaction._id}>
                      <td>
                        <div className="recent-description">
                          {transaction.description}
                        </div>

                        <span
                          className={
                            transaction.type === "Income"
                              ? "recent-type income"
                              : "recent-type expense"
                          }
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td>
                        {transaction.category}
                      </td>

                      <td
                        className={
                          transaction.type === "Income"
                            ? "income-text"
                            : "expense-text"
                        }
                      >
                        {transaction.type === "Income"
                          ? "+"
                          : "-"}
                        {formatCurrency(
                          transaction.amount
                        )}
                      </td>

                      <td>
                        {formatDate(
                          transaction.transactionDate
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
};

export default Dashboard;