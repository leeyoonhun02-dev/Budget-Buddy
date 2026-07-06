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
  const { transactions } = useTransactions();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All");
  const [typeFilter, setTypeFilter] =
    useState("All");
  const [sortBy, setSortBy] =
    useState("AddedNewest");

  const categories = [
    ...new Set(
      transactions.map(
        (transaction) => transaction.category
      )
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
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );

        case "AddedOldest":
          return (
            new Date(a.createdAt) -
            new Date(b.createdAt)
          );

        case "TransactionNewest":
          return (
            new Date(b.date) -
            new Date(a.date)
          );

        case "TransactionOldest":
          return (
            new Date(a.date) -
            new Date(b.date)
          );

        case "Highest":
          return b.amount - a.amount;

        case "Lowest":
          return a.amount - b.amount;

        case "A-Z":
          return a.description.localeCompare(
            b.description
          );

        case "Z-A":
          return b.description.localeCompare(
            a.description
          );

        default:
          return 0;
      }
    });

  const filtersApplied =
    search.trim() !== "" ||
    categoryFilter !== "All" ||
    typeFilter !== "All";

  return (
    <>
      <PageHeader
        title="Transactions"
        subtitle="Add and manage your income and expenses."
      />

      <div className="filter-section">
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
      </div>

      <div className="transaction-content">
        <TransactionForm />

        <div className="transaction-history">
          <div className="history-header">
            <h2 className="history-title">
              {filtersApplied
                ? `Transaction History (${filteredTransactions.length} of ${transactions.length})`
                : `Transaction History (${transactions.length})`}
            </h2>

            <ExportButton />
            <ClearTransactionsButton />
          </div>

          <TransactionList
            transactions={filteredTransactions}
          />
        </div>
      </div>
    </>
  );
};

export default Transactions;