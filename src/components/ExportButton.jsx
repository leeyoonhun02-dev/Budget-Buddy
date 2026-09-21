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

    const formatDate = (date) => {
      if (!date) return "";

      const [year, month, day] = String(date).split("T")[0].split("-");

      const monthName = new Date(
        Date.UTC(Number(year), Number(month) - 1, 1),
      ).toLocaleString("en-US", { month: "long" }, { timeZone: "UTC" });

      return `${monthName} ${day}, ${year}`;
    };

    const escapeCSV = (value) => {
      const stringValue = String(value ?? "");

      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const rows = transactions.map((transaction) => [
      transaction.description,
      transaction.category,
      transaction.type,
      transaction.amount,
      formatDate(transaction.transactionDate),
      transaction.createdAt,
      transaction.updatedAt,
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "budget-buddy-transactions.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" className="export-btn" onClick={exportToCSV}>
      📥 Export Transactions
    </button>
  );
};

export default ExportButton;
