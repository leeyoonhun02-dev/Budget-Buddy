import { useState } from "react";

import { useTransactions } from "../context/TransactionContext";
import { useToast } from "../context/ToastContext";

import "../styles/TransactionItem.css";

const TransactionItem = ({ transaction }) => {
  const {
    deleteTransaction,
    editingTransaction,
    setEditingTransaction,
  } = useTransactions();

  const toast = useToast();

  const [deleting, setDeleting] =
    useState(false);

  const handleEdit = () => {
    setEditingTransaction(transaction);

    toast.info(
      `Editing "${transaction.description}".`,
      {
        title: "Edit Mode",
        duration: 2200,
      }
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${transaction.description}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      await deleteTransaction(transaction._id);

      if (
        transaction._id ===
        editingTransaction?._id
      ) {
        setEditingTransaction(null);
      }

      toast.success(
        `"${transaction.description}" was deleted.`,
        {
          title: "Transaction Deleted",
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete transaction.",
        {
          title: "Delete Failed",
        }
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr
      className={
        deleting
          ? "transaction-row-deleting"
          : ""
      }
    >
      <td>
        <span
          className={
            transaction.type === "Income"
              ? "badge income"
              : "badge expense"
          }
        >
          {transaction.type}
        </span>

        <div className="transaction-description">
          {transaction.description}
        </div>

        <div className="transaction-category">
          {transaction.category}
        </div>

        <div className="timestamp">
          Created:{" "}
          {new Date(
            transaction.createdAt
          ).toLocaleString("en-JP", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>

        {transaction.updatedAt !==
          transaction.createdAt && (
          <div className="timestamp">
            Updated:{" "}
            {new Date(
              transaction.updatedAt
            ).toLocaleString("en-JP", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
        )}
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
        ￥
        {Number(
          transaction.amount
        ).toLocaleString()}
      </td>

      <td className="transaction-date">
        {new Date(
          transaction.transactionDate
        ).toLocaleDateString("en-JP", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      <td className="action-buttons">
        <button
          type="button"
          className="edit-btn"
          onClick={handleEdit}
          disabled={deleting}
        >
          ✏ Edit
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting
            ? "Deleting..."
            : "🗑 Delete"}
        </button>
      </td>
    </tr>
  );
};

export default TransactionItem;