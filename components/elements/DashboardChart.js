import * as React from "react";
import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ViewChart() {
  const [duration, setDuration] = useState("weekly");

  // Static Data for Pie Chart
  const pieData = {
    weekly: [
      { id: 0, value: 40, label: "Lead to Visit", color: "#FF4906" },
      { id: 1, value: 60, label: "Direct Visit", color: "#00ABC4" },
    ],
    monthly: [
      { id: 0, value: 30, label: "Lead to Visit", color: "#FF4906" },
      { id: 1, value: 70, label: "Direct Visit", color: "#00ABC4" },
    ],
    yearly: [
      { id: 0, value: 25, label: "Lead to Visit", color: "#FF4906" },
      { id: 1, value: 75, label: "Direct Visit", color: "#00ABC4" },
    ],
  };

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
        series={[{
          data: pieData[duration],
          innerRadius: 90,
          outerRadius: 150,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -135,
          endAngle: 225,
          cx: 550,
          cy: 150,
        }]}
        width={1000}
        height={400}
      />
    </div>
  );
}