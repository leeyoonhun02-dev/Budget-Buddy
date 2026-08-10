import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import apiClient from "../api/apiClient";
import { useAuth } from "./AuthContext";

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactionsLoading, setTransactionsLoading] =
    useState(false);
  const [transactionError, setTransactionError] =
    useState("");

  const fetchTransactions = async (queryParams = {}) => {
    if (!isAuthenticated) {
      setTransactions([]);
      return;
    }

    try {
      setTransactionsLoading(true);
      setTransactionError("");

      const response = await apiClient.get("/transactions", {
        params: queryParams,
      });

      setTransactions(response.data.transactions);
    } catch (error) {
      setTransactionError(
        error.response?.data?.message ||
          "Unable to load transactions."
      );
    } finally {
      setTransactionsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [isAuthenticated]);

  const addTransaction = async (transactionData) => {
    try {
      setTransactionError("");

      const response = await apiClient.post(
        "/transactions",
        transactionData
      );

      setTransactions((currentTransactions) => [
        response.data.transaction,
        ...currentTransactions,
      ]);

      return response.data.transaction;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to add transaction.";

      setTransactionError(message);
      throw error;
    }
  };

  const updateTransaction = async (
    transactionId,
    transactionData
  ) => {
    try {
      setTransactionError("");

      const response = await apiClient.put(
        `/transactions/${transactionId}`,
        transactionData
      );

      setTransactions((currentTransactions) =>
        currentTransactions.map((transaction) =>
          transaction._id === transactionId
            ? response.data.transaction
            : transaction
        )
      );

      setEditingTransaction(null);

      return response.data.transaction;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to update transaction.";

      setTransactionError(message);
      throw error;
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      setTransactionError("");

      await apiClient.delete(
        `/transactions/${transactionId}`
      );

      setTransactions((currentTransactions) =>
        currentTransactions.filter(
          (transaction) =>
            transaction._id !== transactionId
        )
      );

      if (editingTransaction?._id === transactionId) {
        setEditingTransaction(null);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to delete transaction.";

      setTransactionError(message);
      throw error;
    }
  };

  const clearAllTransactions = async () => {
    try {
      setTransactionError("");

      const response = await apiClient.delete(
        "/transactions"
      );

      setTransactions([]);
      setEditingTransaction(null);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to clear transactions.";

      setTransactionError(message);
      throw error;
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        editingTransaction,
        transactionsLoading,
        transactionError,
        setEditingTransaction,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        clearAllTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider."
    );
  }

  return context;
};