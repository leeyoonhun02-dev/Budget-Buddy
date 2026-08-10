import { useEffect, useState } from "react";

import Card from "./Card";
import TransactionItem from "./TransactionItem";

import "../styles/TransactionList.css";

const INITIAL_VISIBLE_COUNT = 5;
const LOAD_MORE_COUNT = 5;

const TransactionList = ({ transactions }) => {
  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_COUNT
  );

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [transactions]);

  const visibleTransactions = transactions.slice(
    0,
    visibleCount
  );

  const hasMoreTransactions =
    visibleCount < transactions.length;

  const canShowLess =
    visibleCount > INITIAL_VISIBLE_COUNT;

  const handleViewMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(
        currentCount + LOAD_MORE_COUNT,
        transactions.length
      )
    );
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <Card className="transaction-list-card">
      {transactions.length === 0 ? (
        <div className="empty-message">
          <div className="empty-icon">📄</div>

          <h3>No transactions found</h3>

          <p>
            Add a transaction or adjust your filters to see
            financial records here.
          </p>
        </div>
      ) : (
        <>
          <div className="transaction-table-wrapper">
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
                {visibleTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="transaction-list-footer">
            <span className="visible-count">
              Showing {visibleTransactions.length} of{" "}
              {transactions.length} transactions
            </span>

            <div className="view-controls">
              {hasMoreTransactions && (
                <button
                  type="button"
                  className="view-more-btn"
                  onClick={handleViewMore}
                  aria-label="Show more transactions"
                >
                  <span>View More</span>
                  <span
                    className="view-arrow"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </button>
              )}

              {canShowLess && (
                <button
                  type="button"
                  className="show-less-btn"
                  onClick={handleShowLess}
                  aria-label="Show fewer transactions"
                >
                  <span>Show Less</span>
                  <span
                    className="view-arrow"
                    aria-hidden="true"
                  >
                    ↑
                  </span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default TransactionList;