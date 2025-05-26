import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import styles from "./PerformanceRadarChart.module.scss";

const KIND_LABELS = {
  1: "Intensité",
  2: "Vitesse",
  3: "Force",
  4: "Endurance",
  5: "Energie",
  6: "Cardio",
};

export default function PerformanceRadarChart({ data }) {
  // Prepare data for the radar chart
  // const chartData = data.map((item) => ({
  //   value: item.value,
  //   kind: KIND_LABELS[item.kind],
  // }));

  console.log("PerformanceRadarChart data", data);

  return (
    <div
      className={styles.performanceRadarChart}
      style={{
        background: "#232323",
        borderRadius: 8,
        width: "100%",
        height: "100%",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="70%" data={data}>
          <PolarGrid
            gridType="polygon"
            stroke="#fff"
            radialLines={false}
            strokeOpacity={0.7}
          />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fill: "#fff", fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#FF0101B2"
            fill="#FF0101B2"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
