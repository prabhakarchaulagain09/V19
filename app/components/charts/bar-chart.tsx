"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CustomBarChartProps {
  data: Array<{ name: string; value: number; value2?: number }>
  color?: string
  color2?: string
  height?: number
}

export function CustomBarChart({ data, color = "#3b82f6", color2, height = 300 }: CustomBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        {color2 && <Bar dataKey="value2" fill={color2} radius={[4, 4, 0, 0]} />}
      </BarChart>
    </ResponsiveContainer>
  )
}
