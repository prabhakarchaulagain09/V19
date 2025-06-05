"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CustomLineChartProps {
  data: Array<{ name: string; value: number; value2?: number }>
  color?: string
  color2?: string
  height?: number
}

export function CustomLineChart({ data, color = "#3b82f6", color2, height = 300 }: CustomLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
        />
        {color2 && (
          <Line
            type="monotone"
            dataKey="value2"
            stroke={color2}
            strokeWidth={3}
            dot={{ fill: color2, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: color2, strokeWidth: 2 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
