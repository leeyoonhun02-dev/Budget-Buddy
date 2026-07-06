import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { useTransactions } from "../context/TransactionContext";

import "../styles/Form.css";

const TransactionForm = () => {
  const {
    dispatch,
    editingTransaction,
    setEditingTransaction,
  } = useTransactions();

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
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setDescription(editingTransaction.description);
    
    if (categories.includes(editingTransaction.category)) {
      setCategory(editingTransaction.category);
      setCustomCategory("");
    } else {
      setCategory("Others");
      setCustomCategory(editingTransaction.category);
    }
      setAmount(String(editingTransaction.amount));
      setDate(editingTransaction.date);
    }
  }, [editingTransaction]);

  const resetForm = () => {
    setType("Income");
    setDescription("");
    setCategory("Food");
    setCustomCategory("");
    setAmount("");
    setDate("");

    setEditingTransaction(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !description.trim() ||
      !amount ||
      !date ||
      (category === "Others" && !customCategory.trim())
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const now = new Date().toISOString();

    const transactionData = {
      id: editingTransaction ? editingTransaction.id : uuid(),
      type,
      description,
      category:
        category === "Others"
          ? customCategory
          : category,
      amount: Number(amount),
      date,

      createdAt: editingTransaction
        ? editingTransaction.createdAt
        : now,
      updatedAt: now,
    };

    if (editingTransaction) {
      dispatch({
        type: "EDIT_TRANSACTION",
        payload: transactionData,
      });
    } else {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: transactionData,
      });
    }

    resetForm();
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

      <label>Type</label>

      <div className="radio-group">
        <label className="radio-option">
          <input
            type="radio"
            value="Income"
            checked={type === "Income"}
            onChange={(e) => setType(e.target.value)}
          />
          Income
        </label>

        <label className="radio-option">
          <input
            type="radio"
            value="Expense"
            checked={type === "Expense"}
            onChange={(e) => setType(e.target.value)}
          />
          Expense
        </label>
      </div>

      <label>Description</label>

      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <label>Category</label>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        {categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      {category === "Others" && (
        <>
          <label>Specify Category</label>

          <input
            type="text"
            placeholder="Enter category"
            value={customCategory}
            onChange={(e) =>
              setCustomCategory(e.target.value)
            }
          />
        </>
      )}

      <label>Amount</label>

      <div className="amount-input">
        <span>￥</span>

        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />
      </div>

      <label>Date</label>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />

      <button type="submit">
        {editingTransaction
          ? "Update Transaction"
          : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;