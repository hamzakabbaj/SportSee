/* AverageSessionD3.jsx */
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

/* map 1‑7 ➜ French weekday initials */
const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

export default function AverageSessionChart({ data }) {
  const svgRef = useRef(null);
  data = data.map((d) => ({ ...d, label: WEEKDAYS[d.day - 1] }));

  useEffect(() => {
    /* ---- layout ---- */
    const M = { top: 60, right: 20, bottom: 30, left: 20 };
    const W = 500;
    const H = 500;
    const iw = W - M.left - M.right;
    const ih = H - M.top - M.bottom;

    /* ---- scales ---- */
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.day))
      .range([0, iw])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.sessionLength) - 10,
        d3.max(data, (d) => d.sessionLength) + 10,
      ])
      .range([ih, 0]);

    /* ---- line generator ---- */
    const line = d3
      .line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveMonotoneX);

    /* ---- root svg ---- */
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .style("background", "#E60000") // card base colour
      .style("border-radius", "8px")
      .style("font-family", "sans-serif");

    svg.selectAll("*").remove(); // clear previous render
    const g = svg
      .append("g")
      .attr("transform", `translate(${M.left},${M.top})`);

    /* ---- dark overlay that follows cursor ---- */
    const overlayRect = g
      .append("rect")
      .attr("x", iw)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", ih)
      .attr("fill", "rgba(0,0,0,0.05)");

    /* ---- line path ---- */
    g.append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.8)")
      .attr("stroke-width", 3);

    /* ---- x‑axis letters ---- */
    g.append("g")
      .attr("transform", `translate(0,${ih})`)
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.day))
      .attr("y", 0)
      .attr("dy", "1.2em")
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(255,255,255,0.5)")
      .style("font-size", 14)
      .text((d) => d.label);

    /* ---- title ---- */
    svg
      .append("text")
      .attr("x", M.left)
      .attr("y", 30)
      .attr("fill", "rgba(255,255,255,0.6)")
      .style("font-size", 24)
      .style("font-weight", 500)
      .text("Durée moyenne des");
    svg
      .append("text")
      .attr("x", M.left)
      .attr("y", 60)
      .attr("fill", "rgba(255,255,255,0.6)")
      .style("font-size", 24)
      .style("font-weight", 500)
      .text("sessions");

    /* ---- point marker ---- */
    const marker = g
      .append("circle")
      .attr("r", 5)
      .attr("fill", "#fff")
      .attr("stroke", "rgba(255,255,255,0.3)")
      .attr("stroke-width", 10)
      .style("opacity", 0);

    /* ---- tooltip ---- */
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("color", "#000")
      .style("padding", "6px 10px")
      .style("border-radius", "2px")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("pointer-events", "none")
      .style("opacity", 0);

    /* ---- transparent overlay to capture mouse ---- */
    svg
      .append("rect")
      .attr("x", M.left)
      .attr("y", M.top)
      .attr("width", iw)
      .attr("height", ih)
      .attr("fill", "transparent")
      .on("mousemove", function (event) {
        const [mx] = d3.pointer(event, this);
        const day = Math.round(
          x.invert ? x.invert(mx) : x.domain()[d3.bisectCenter(x.range(), mx)]
        );
        const d = data.find((p) => p.day === day);

        if (!d) return;

        const cx = x(d.day) + M.left;
        const cy = y(d.sessionLength) + M.top;

        /* move overlay rectangle */
        overlayRect.attr("x", cx - M.left).attr("width", iw - (cx - M.left));

        /* move marker */
        marker
          .attr("cx", x(d.day))
          .attr("cy", y(d.sessionLength))
          .style("opacity", 1);

        /* tooltip */
        tooltip
          .style("opacity", 1)
          .html(`${d.sessionLength} min`)
          .style("left", `${cx + 15}px`)
          .style("top", `${cy - 15}px`);
      })
      .on("mouseleave", () => {
        marker.style("opacity", 0);
        tooltip.style("opacity", 0);
        overlayRect.attr("width", 0);
      });

    /* ---- clean‑up on unmount ---- */
    return () => tooltip.remove();
  }, []);

  return <svg ref={svgRef} width="100%" height="100%" />;
}
