/* DailyActivityD3Chart.jsx */
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "./DailyActivityChart.module.scss";

export default function DailyActivityD3Chart({ data }) {
  const svgRef = useRef(null);
  data = data.map((d, i) => ({ ...d, idx: i + 1 }));

  useEffect(() => {
    /* ---- CONSTANTS ---------------------------------------------------- */
    const MARGIN = { top: 40, right: 30, bottom: 30, left: 30 };
    const W = 700;
    const H = 300;
    const iw = W - MARGIN.left - MARGIN.right; // inner width
    const ih = H - MARGIN.top - MARGIN.bottom; // inner height

    /* ---- SCALES ------------------------------------------------------- */
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.idx))
      .range([0, iw])
      .padding(0.8);

    const yCal = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.calories)])
      .nice()
      .range([ih, 0]);

    const yKg = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.kilogram) - 1,
        d3.max(data, (d) => d.kilogram) + 1,
      ])
      .range([ih, 0]);

    const BAR_W = x.bandwidth() / 2; // two bars per day

    /* ---- ROOT SVG ----------------------------------------------------- */
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .style("font-family", "sans-serif");

    svg.selectAll("*").remove(); // clear previous render

    const g = svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    /* ---- GRID LINES --------------------------------------------------- */
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yCal)
          .ticks(3)
          .tickSize(-iw)
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#DEDEDE")
      .attr("stroke-dasharray", "2");

    /* ---- AXES --------------------------------------------------------- */
    g.append("g")
      .attr("transform", `translate(0,${ih})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((d) => d) // show 1‑7
          .tickSize(0)
      )
      .selectAll("text")
      .attr("fill", "#9B9EAC")
      .attr("font-size", "14px")
      .attr("dy", "1.2em");

    g.append("g") // right‑side kg axis (ticks only)
      .attr("transform", `translate(${iw},0)`)
      .attr("color", "#9B9EAC")
      .attr("font-size", "14px")
      .call(d3.axisRight(yKg).ticks(3).tickSize(0))
      .select(".domain")
      .remove();

    /* ---- BARS: WEIGHT (black/grey) ----------------------------------- */
    g.selectAll(".kgBar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "kgBar")
      .attr("x", (d) => x(d.idx))
      .attr("y", (d) => yKg(d.kilogram))
      .attr("width", BAR_W)
      .attr("height", (d) => ih - yKg(d.kilogram))
      .attr("fill", "#282D30")
      .attr("rx", 3);

    /* ---- BARS: CALORIES (red) ---------------------------------------- */
    g.selectAll(".calBar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "calBar")
      .attr("x", (d) => x(d.idx) + BAR_W + 8)
      .attr("y", (d) => yCal(d.calories))
      .attr("width", BAR_W)
      .attr("height", (d) => ih - yCal(d.calories))
      .attr("fill", "#E60000")
      .attr("rx", 3);

    /* ---- TOOLTIP ------------------------------------------------------ */
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#E60000")
      .style("color", "#fff")
      .style("padding", "12px 10px")
      .style("font-size", "7px")
      .style("opacity", 0)
      .style("pointer-events", "none");

    svg
      .selectAll("rect")
      .on("mouseenter", (_, d) => {
        tooltip
          .style("opacity", 1)
          .html(`${d.kilogram} kg<br/><br/>${d.calories} kCal`);
      })
      .on("mousemove", (e) => {
        tooltip
          .style("left", `${e.pageX + 15}px`)
          .style("top", `${e.pageY - 28}px`);
      })
      .on("mouseleave", () => tooltip.style("opacity", 0));

    /* ---- CLEAN‑UP on unmount ----------------------------------------- */
    return () => {
      tooltip.remove();
    };
  }, []);

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
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}

/* -- tiny helper for the legend --------------------------------------- */
const LegendDot = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
      }}
    />
    {label}
  </div>
);
