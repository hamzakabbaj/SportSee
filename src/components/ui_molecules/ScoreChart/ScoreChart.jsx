import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import styles from "./ScoreChart.module.scss";

export default function ScoreChart({ score }) {
  const percent = Math.round((score || 0) * 100);
  const data = [{ name: "score", value: percent, fill: "#FF0000" }];

  return (
    <div
      className={styles.scoreChart}
      style={{ position: "relative", background: "#fbfbfb", borderRadius: 8 }}
    >
      <span
        style={{
          position: "absolute",
          top: 16,
          left: 24,
          color: "#20253A",
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        Score
      </span>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={12}
          data={data}
          startAngle={210}
          endAngle={-210}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            cornerRadius={12}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#282D30" }}>
          {percent}%
        </div>
        <div
          style={{
            color: "#74798C",
            fontSize: 16,
            fontWeight: 500,
            marginTop: 4,
          }}
        >
          de votre
          <br />
          objectif
        </div>
      </div>
    </div>
  );
}
