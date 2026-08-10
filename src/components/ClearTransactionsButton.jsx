import { useState } from "react";

import { useTransactions } from "../context/TransactionContext";
import { useToast } from "../context/ToastContext";

const ClearTransactionsButton = () => {
  const {
    transactions,
    clearAllTransactions,
    setEditingTransaction,
  } = useTransactions();

  const toast = useToast();

  const [clearing, setClearing] =
    useState(false);

  const handleClear = async () => {
    if (transactions.length === 0) {
      toast.info(
        "There are no transactions to delete.",
        {
          title: "Nothing to Clear",
        }
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete ALL transactions?\n\nThis action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setClearing(true);

      const response =
        await clearAllTransactions();

      setEditingTransaction(null);

      toast.success(
        response?.message ||
          "All transactions were cleared successfully.",
        {
          title: "Transactions Cleared",
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to clear transactions.",
        {
          title: "Clear Failed",
        }
      );
    } finally {
      setClearing(false);
    }
  };

  return (
    <button
      type="button"
      className="clear-btn"
      onClick={handleClear}
      disabled={clearing}
    >
      {clearing
        ? "Clearing..."
        : "🗑 Clear All"}
    </button>
  );
};

export default ClearTransactionsButton;