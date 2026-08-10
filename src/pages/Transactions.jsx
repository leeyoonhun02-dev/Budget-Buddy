import { useState } from "react";

import PageHeader from "../components/PageHeader";
import TransactionFilters from "../components/TransactionFilters";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExportButton from "../components/ExportButton";
import ClearTransactionsButton from "../components/ClearTransactionsButton";

import { useTransactions } from "../context/TransactionContext";

import "../styles/Transactions.css";

const Transactions = () => {
  const {
    transactions,
    transactionsLoading,
    transactionError,
  } = useTransactions();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("AddedNewest");

  const categories = [
    ...new Set(
      transactions.map((transaction) => transaction.category)
    ),
  ];

  const filteredTransactions = [...transactions]
    .filter((transaction) =>
      transaction.description
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((transaction) =>
      categoryFilter === "All"
        ? true
        : transaction.category === categoryFilter
    )
    .filter((transaction) =>
      typeFilter === "All"
        ? true
        : transaction.type === typeFilter
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "AddedNewest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "AddedOldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "TransactionNewest":
          return (
            new Date(b.transactionDate) -
            new Date(a.transactionDate)
          );

        case "TransactionOldest":
          return (
            new Date(a.transactionDate) -
            new Date(b.transactionDate)
          );

        case "Highest":
          return Number(b.amount) - Number(a.amount);

        case "Lowest":
          return Number(a.amount) - Number(b.amount);

        case "A-Z":
          return a.description.localeCompare(b.description);

        case "Z-A":
          return b.description.localeCompare(a.description);

        default:
          return 0;
      }
    });

  const filtersApplied =
    search.trim() !== "" ||
    categoryFilter !== "All" ||
    typeFilter !== "All";

  const historyCountText = filtersApplied
    ? `${filteredTransactions.length} of ${transactions.length}`
    : filteredTransactions.length;

  return (
    <>
      <PageHeader
        title="💳 Transactions"
        subtitle="Add, edit, organize, and manage your transactions."
      />

      <section className="filter-section">
        <TransactionFilters
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
      </section>

      {transactionError && (
        <p className="transaction-page-error">
          {transactionError}
        </p>
      )}

      <div className="transaction-content">
        <TransactionForm />

        <section className="transaction-history">
          <div className="history-header">
            <div className="history-heading">
              <h2 className="history-title">
                Transaction History
              </h2>

              <span className="history-count">
                {historyCountText}{" "}
                {filteredTransactions.length === 1
                  ? "Transaction"
                  : "Transactions"}
              </span>
            </div>

            <div className="history-actions">
              <ExportButton />
              <ClearTransactionsButton />
            </div>
          </div>

          {transactionsLoading ? (
            <div className="history-status">
              <div className="loading-spinner" />

              <p>Loading transactions...</p>
            </div>
          ) : (
            <TransactionList
              transactions={filteredTransactions}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default Transactions;