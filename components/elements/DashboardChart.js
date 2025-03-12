import * as React from "react";
import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ViewChart() {
  const [duration, setDuration] = useState("weekly");

  // Static Data for Pie Chart
  const pieData = {
    weekly: [
      { id: 0, value: 40, label: "Lead", color: "#2EC400" },
      { id: 1, value: 60, label: "Visit", color: "#00ABC4" },
    ],
    monthly: [
      { id: 0, value: 30, label: "Lead", color: "#2EC400" },
      { id: 1, value: 70, label: "Visit", color: "#00ABC4" },
    ],
    yearly: [
      { id: 0, value: 25, label: "Lead", color: "#2EC400" },
      { id: 1, value: 75, label: "Visit", color: "#00ABC4" },
    ],
  };
  const valueFormatter = (value) => `${value}%`;

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "end" }}>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <PieChart
         width={1000}
         height={400}
        series={[
          {
            data: pieData[duration],
            innerRadius: 90,
            arcLabel: (params) => valueFormatter(params.value), // Show percentage on slices
            arcLabelMinAngle: 20, // Only show labels if slice is large enough
          },
        ]}
        skipAnimation={false} // Keep animations enabled
      />
    </div>
  );
}