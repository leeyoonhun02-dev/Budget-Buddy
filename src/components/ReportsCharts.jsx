import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

const ReportsCharts = ({ expenseCategories }) => {
  const data = Object.entries(expenseCategories).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label={({  percent }) =>
            `${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={
                COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>
        

        <Tooltip 
          formatter={(value) =>
            `￥${Number(value).toLocaleString()}`
          } 
        />

        <Legend 
        verticalAlign="bottom"
        height={36}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReportsCharts;