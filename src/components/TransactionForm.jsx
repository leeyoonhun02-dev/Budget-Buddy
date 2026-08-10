import { useEffect, useState } from "react";

import { useTransactions } from "../context/TransactionContext";
import { useToast } from "../context/ToastContext";

import "../styles/Form.css";

const TransactionForm = () => {
  const {
    editingTransaction,
    setEditingTransaction,
    addTransaction,
    updateTransaction,
    transactionError,
  } = useTransactions();

  const toast = useToast();

  const categories = [
    "Food",
    "Transportation",
    "Bills",
    "Salary",
    "Shopping",
    "Entertainment",
    "Healthcare",
    "Education",
    "Others",
  ];

  const [type, setType] = useState("Income");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] =
    useState("Food");
  const [customCategory, setCustomCategory] =
    useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [submitting, setSubmitting] =
    useState(false);
  const [formError, setFormError] =
    useState("");

  useEffect(() => {
    if (!editingTransaction) {
      return;
    }

    setType(editingTransaction.type);
    setDescription(
      editingTransaction.description
    );

    if (
      categories.includes(
        editingTransaction.category
      )
    ) {
      setCategory(editingTransaction.category);
      setCustomCategory("");
    } else {
      setCategory("Others");
      setCustomCategory(
        editingTransaction.category
      );
    }

    setAmount(
      String(editingTransaction.amount)
    );

    const formattedDate =
      editingTransaction.transactionDate
        ? new Date(
            editingTransaction.transactionDate
          )
            .toISOString()
            .split("T")[0]
        : "";

    setDate(formattedDate);
  }, [editingTransaction]);

  const resetForm = () => {
    setType("Income");
    setDescription("");
    setCategory("Food");
    setCustomCategory("");
    setAmount("");
    setDate("");
    setFormError("");

    setEditingTransaction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    const finalCategory =
      category === "Others"
        ? customCategory.trim()
        : category;

    if (
      !description.trim() ||
      !amount ||
      !date ||
      !finalCategory
    ) {
      const message =
        "Please complete all required fields.";

      setFormError(message);
      toast.warning(message, {
        title: "Incomplete Form",
      });

      return;
    }

    const numericAmount = Number(amount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      const message =
        "Amount must be greater than zero.";

      setFormError(message);
      toast.warning(message, {
        title: "Invalid Amount",
      });

      return;
    }

    const transactionData = {
      type,
      description: description.trim(),
      category: finalCategory,
      amount: numericAmount,
      transactionDate: date,
    };

    const isEditing = Boolean(
      editingTransaction
    );

    try {
      setSubmitting(true);

      if (isEditing) {
        await updateTransaction(
          editingTransaction._id,
          transactionData
        );

        toast.success(
          "Transaction updated successfully.",
          {
            title: "Changes Saved",
          }
        );
      } else {
        await addTransaction(transactionData);

        toast.success(
          "Transaction added successfully.",
          {
            title: "Transaction Created",
          }
        );
      }

      resetForm();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to save transaction.";

      setFormError(message);

      toast.error(message, {
        title: isEditing
          ? "Update Failed"
          : "Creation Failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    resetForm();

    toast.info(
      "Transaction editing was cancelled.",
      {
        title: "Edit Cancelled",
        duration: 2500,
      }
    );
  };

  return (
    <form
      className="transaction-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      {(formError || transactionError) && (
        <p className="form-error" role="alert">
          {formError || transactionError}
        </p>
      )}

      <label>Type</label>

      <div className="radio-group">
        <label className="radio-option">
          <input
            type="radio"
            name="transaction-type"
            value="Income"
            checked={type === "Income"}
            onChange={(e) =>
              setType(e.target.value)
            }
            disabled={submitting}
          />

          Income
        </label>

        <label className="radio-option">
          <input
            type="radio"
            name="transaction-type"
            value="Expense"
            checked={type === "Expense"}
            onChange={(e) =>
              setType(e.target.value)
            }
            disabled={submitting}
          />

          Expense
        </label>
      </div>

      <label htmlFor="transaction-description">
        Description
      </label>

      <input
        id="transaction-description"
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        disabled={submitting}
        required
      />

      <label htmlFor="transaction-category">
        Category
      </label>

      <select
        id="transaction-category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        disabled={submitting}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {category === "Others" && (
        <>
          <label htmlFor="custom-category">
            Specify Category
          </label>

          <input
            id="custom-category"
            type="text"
            placeholder="Enter category"
            value={customCategory}
            onChange={(e) =>
              setCustomCategory(e.target.value)
            }
            disabled={submitting}
            required
          />
        </>
      )}

      <label htmlFor="transaction-amount">
        Amount
      </label>

      <div className="amount-input">
        <span aria-hidden="true">￥</span>

        <input
          id="transaction-amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          disabled={submitting}
          required
        />
      </div>

      <label htmlFor="transaction-date">
        Date
      </label>

      <input
        id="transaction-date"
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        disabled={submitting}
        required
      />

      <button
        type="submit"
        disabled={submitting}
      >
        {submitting
          ? editingTransaction
            ? "Updating..."
            : "Adding..."
          : editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
      </button>

      {editingTransaction && (
        <button
          type="button"
          className="cancel-edit-btn"
          onClick={handleCancelEdit}
          disabled={submitting}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default TransactionForm;