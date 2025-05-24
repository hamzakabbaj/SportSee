/* AverageSessionD3.jsx */
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import styles from "./AverageSessionChart.module.scss";

/* map 1‑7 ➜ French weekday initials */
const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          color: "#000",
          padding: "6px 10px",
          borderRadius: 2,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {payload[0].value} min
      </div>
    );
  }
  return null;
}

function CustomCursor({ points, width, height }) {
  // Draw a semi-transparent overlay from the hovered point to the right
  if (!points || !points[0]) return null;
  const { x } = points[0];
  return (
    <Rectangle
      fill="rgba(0,0,0,0.05)"
      x={x}
      y={0}
      width={width - x}
      height={height}
    />
  );
}

export default function AverageSessionChart({ data }) {
  // Add weekday label to each data point
  const chartData = data.map((d) => ({ ...d, label: WEEKDAYS[d.day - 1] }));

  return (
    <div
      className={styles.averageSessionChart}
      style={{
        background: "#E60000",
        borderRadius: 8,
        position: "relative",
        width: "100%",
        height: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 20,
          color: "rgba(255,255,255,0.6)",
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1.2,
          zIndex: 2,
        }}
      >
        <div className={styles.averageSessionChart__title}>
          Durée moyenne des <br /> sessions
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 60, right: 20, left: 20, bottom: 30 }}
        >
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 14 }}
            padding={{ left: 10, right: 10 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={
              <CustomCursor width={500 - 20 - 20} height={500 - 60 - 30} />
            } // match D3 overlay
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 8,
              fill: "#fff",
              stroke: "rgba(255,255,255,0.3)",
              strokeWidth: 10,
              style: { opacity: 1 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
