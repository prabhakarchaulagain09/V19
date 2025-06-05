"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface CustomRadialChartProps {
  data: Array<{ name: string; value: number; fill: string }>
  height?: number
}

export function CustomRadialChart({ data, height = 300 }: CustomRadialChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
