import * as React from "react";
import { useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function ViewChart() {
  const [duration, setDuration] = useState("Today");

  // Static Data for Gauge Chart
  const gaugeData = {
    Today: { value: (57 / 87) * 100, label: "Response Rate", max: 100 },
    monthly: { value: (107 / 167) * 100, label: "Response Rate", max: 100 },
    yearly: { value: (217 / 254) * 100, label: "Response Rate", max: 100 },
  };

  return (
    <div style={{ width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "end" }}>
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="Today">Today</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
        <div>
          <Gauge
            width={700}
            height={400}
            value={gaugeData[duration].value}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                transform: "translate(0px, 0px)",
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#00ABC4",
              },
            }}
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: "60%",
              },
            ]}
            text={({ value }) => `${value.toFixed(1)} %`}
            outerRadius="50%"
          />
        </div>
         <div style={{ flex: 0.5, textAlign: "left", marginLeft: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ width: "20px", height: "20px", backgroundColor: "#00ABC4", display: "inline-block", marginRight: "10px" }}></span>
            <span>Responses Sent</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: "20px", height: "20px", backgroundColor: "#E0E0E0", display: "inline-block", marginRight: "10px" }}></span>
            <span>Incoming Messages</span>
          </div>
        </div>
        </div>
      </div>
     
    </div>
  );
}