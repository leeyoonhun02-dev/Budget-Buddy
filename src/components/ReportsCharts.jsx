import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

const formatCurrency = (value) =>
  `￥${Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })}`;

const CustomTooltip = ({
  active,
  payload,
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];

  return (
    <div className="chart-tooltip">
      <strong>{item.name}</strong>

      <span>{formatCurrency(item.value)}</span>
    </div>
  );
};

const ReportsCharts = ({
  expenseCategories,
}) => {
  const data = Object.entries(
    expenseCategories
  ).map(([category, amount]) => ({
    name: category,
    value: Number(amount),
  }));

  return (
    <div className="report-chart-wrapper">
      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={58}
            outerRadius={112}
            paddingAngle={2}
            labelLine={false}
            label={({ percent }) =>
              percent >= 0.05
                ? `${(percent * 100).toFixed(0)}%`
                : ""
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={
                  COLORS[index % COLORS.length]
                }
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportsCharts;