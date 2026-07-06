import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

import {
  transactionReducer,
  initialState,
} from "../reducer/transactionReducer";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    transactionReducer,
    initialState,
    () => {
      const storedTransactions = localStorage.getItem(
        "transactions"
      );

      return storedTransactions
        ? {
            transactions: JSON.parse(storedTransactions),
          }
        : initialState;
    }
  );

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(state.transactions)
    );
  }, [state.transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        dispatch,
        editingTransaction,
        setEditingTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  return useContext(TransactionContext);
};