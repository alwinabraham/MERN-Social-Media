import React,{useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function BarChartComponent({data, color}) {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 3,
        left: 2,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis dataKey="count"/>
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill={color} />
    </BarChart>
  );
}