import { useTransactions } from "../context/TransactionContext";

const ClearTransactionsButton = () => {
  const {
    transactions,
    dispatch,
    setEditingTransaction,
  } = useTransactions();

  const handleClear = () => {
    if (transactions.length === 0) {
      alert("There are no transactions to delete.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete ALL transactions?\n\nThis action cannot be undone."
    );

    if (!confirmed) return;

    dispatch({
      type: "CLEAR_TRANSACTIONS",
    });

    setEditingTransaction(null);
  };

  return (
    <button
      className="clear-btn"
      onClick={handleClear}
    >
      🗑 Clear All
    </button>
  );
};

export default ClearTransactionsButton;