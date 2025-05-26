/* DailyActivityD3Chart.jsx */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import styles from "./DailyActivityChart.module.scss";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length === 2) {
    return (
      <div
        style={{
          background: "#E60000",
          color: "#fff",
          padding: 12,
          fontSize: 12,
        }}
      >
        <div>{payload[0].value}kg</div>
        <div>{payload[1].value}Kcal</div>
      </div>
    );
  }
  return null;
};

const LegendDot = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
      }}
    />
    {label}
  </div>
);

export default function DailyActivityRechartChart({ data }) {
  return (
    <div className={styles.dailyActivityChart}>
      <div className={styles.dailyActivityChart__header}>
        <h3 className={styles.dailyActivityChart__header__title}>
          Activité quotidienne
        </h3>
        <div className={styles.dailyActivityChart__header__legend}>
          <LegendDot color="#282D30" label="Poids (kg)" />
          <LegendDot color="#E60000" label="Calories brûlées (kCal)" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 40, right: 30, left: 30, bottom: 30 }}
          barGap={8}
        >
          <CartesianGrid
            strokeDasharray="2"
            vertical={false}
            stroke="#DEDEDE"
          />
          <XAxis
            dataKey="weekDay"
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="kg"
            dataKey="kilogram"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            domain={[(dataMin) => dataMin - 1, (dataMax) => dataMax + 1]}
            allowDecimals={false}
          />
          <YAxis
            yAxisId="cal"
            dataKey="calories"
            hide
            domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#C4C4C480" }} />
          <Bar
            yAxisId="kg"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
            name="Poids (kg)"
          />
          <Bar
            yAxisId="cal"
            dataKey="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
            name="Calories brûlées (kCal)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
