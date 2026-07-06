import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const IncomeExpenseChart = ({
  totalIncome,
  totalExpenses,
}) => {
  const data = [
    {
      name: "Income",
      amount: totalIncome,
      color: "#16a34a",
    },
    {
      name: "Expense",
      amount: totalExpenses,
      color: "#dc2626",
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip
          formatter={(value) =>
            `￥${Number(value).toLocaleString()}`
          }
        />

        <Bar
          dataKey="amount"
          radius={[8, 8, 0, 0]}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.color}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;