import { useTransactions } from "../context/TransactionContext";

import "../styles/TransactionItem.css";

const TransactionItem = ({ transaction }) => {
  const {
    dispatch,
    editingTransaction,
    setEditingTransaction,
  } = useTransactions();

  const handleEdit = () => {
    setEditingTransaction(transaction);
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: transaction.id,
    });

    if (transaction.id === editingTransaction?.id) {
      setEditingTransaction(null);
    }
  };

  return (
    <tr>
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
          {new Date(transaction.createdAt).toLocaleString(
            "en-JP",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }
          )}
        </div>

        {transaction.updatedAt !==
          transaction.createdAt && (
          <div className="timestamp">
            Updated:{" "}
            {new Date(transaction.updatedAt).toLocaleString(
              "en-JP",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }
            )}
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
        {transaction.type === "Income" ? "+" : "-"}￥
        {transaction.amount.toLocaleString()}
      </td>

      <td className= "transaction-date">
        {new Date(transaction.date).toLocaleDateString(
          "en-JP",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )}
      </td>

      <td className="action-buttons">
        <button
          className="edit-btn"
          onClick={handleEdit}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          🗑 Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionItem;