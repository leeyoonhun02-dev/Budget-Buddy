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
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <>
      <PageHeader
        title="💰 Budget Ledger"
        subtitle="Manage your income and expenses efficiently."
      />

      <div className="summary-grid">
        <SummaryCard
          icon={<FaMoneyBillWave />}
          title="Income"
          amount={`￥${totalIncome.toLocaleString()}`}
        />

        <SummaryCard
          icon={<FaCreditCard />}
          title="Expenses"
          amount={`￥${totalExpenses.toLocaleString()}`}
        />

        <SummaryCard
          icon={<FaWallet />}
          title="Balance"
          amount={`￥${balance.toLocaleString()}`}
        />
      </div>

      <Card>
        <h2>Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
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
              {transactions
                .slice()
                .reverse()
                .slice(0, 5)
                .map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>

                    <td>{transaction.category}</td>

                    <td
                      className={
                        transaction.type === "Income"
                          ? "income-text"
                          : "expense-text"
                      }
                    >
                      ￥{transaction.amount.toLocaleString()}
                    </td>

                    <td>
                      {new Date(transaction.date).toLocaleDateString(
                        "en-PH",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
};

export default Dashboard;