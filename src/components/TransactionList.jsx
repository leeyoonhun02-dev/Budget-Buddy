import Card from "./Card";
import TransactionItem from "./TransactionItem";

import "../styles/TransactionList.css";

const TransactionList = ({ transactions }) => {
  return (
    <Card className="transaction-history">
      {transactions.length === 0 ? (
        <p className="empty-message">
          No transactions found.
        </p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default TransactionList;