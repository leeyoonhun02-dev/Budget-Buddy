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

const formatCurrency = (value) =>
  `￥${Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })}`;

const CustomTooltip = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>

      <span>
        {formatCurrency(payload[0].value)}
      </span>
    </div>
  );
};

const IncomeExpenseChart = ({
  totalIncome,
  totalExpenses,
}) => {
  const data = [
    {
      name: "Income",
      amount: Number(totalIncome),
      color: "#16a34a",
    },
    {
      name: "Expenses",
      amount: Number(totalExpenses),
      color: "#dc2626",
    },
  ];

  return (
    <div className="report-chart-wrapper">
      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <BarChart
          data={data}
          margin={{
            top: 15,
            right: 10,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: "#64748b",
              fontSize: 12,
            }}
            axisLine={{
              stroke: "#cbd5e1",
            }}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(value) =>
              value >= 1000000
                ? `￥${(value / 1000000).toFixed(
                    1
                  )}M`
                : value >= 1000
                  ? `￥${(
                      value / 1000
                    ).toFixed(0)}K`
                  : `￥${value}`
            }
            tick={{
              fill: "#64748b",
              fontSize: 11,
            }}
            axisLine={false}
            tickLine={false}
            width={72}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: "rgba(148, 163, 184, 0.08)",
            }}
          />

          <Bar
            dataKey="amount"
            radius={[10, 10, 4, 4]}
            maxBarSize={88}
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
    </div>
  );
};

export default IncomeExpenseChart;