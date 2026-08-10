import { useTransactions } from "../context/TransactionContext";

const ExportButton = () => {
  const { transactions } = useTransactions();

  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export.");
      return;
    }

    const headers = [
      "Description",
      "Category",
      "Type",
      "Amount",
      "Date",
      "Created At",
      "Updated At",
    ];

    const rows = transactions.map((transaction) => [
      transaction.description,
      transaction.category,
      transaction.type,
      transaction.amount,
      transaction.date,
      transaction.createdAt,
      transaction.updatedAt,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "budget-buddy-transactions.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="export-btn"
      onClick={exportToCSV}
    >
      📥 Export Transactions
    </button>
  );
};

export default ExportButton;