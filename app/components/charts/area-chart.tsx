"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface CustomAreaChartProps {
  data: Array<{ name: string; value: number; value2?: number }>
  color?: string
  color2?: string
  height?: number
}

export function CustomAreaChart({ data, color = "#3b82f6", color2 = "#10b981", height = 300 }: CustomAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
          {color2 && (
            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color2} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color2} stopOpacity={0.1} />
            </linearGradient>
          )}
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
        {color2 && (
          <Area
            type="monotone"
            dataKey="value2"
            stroke={color2}
            fillOpacity={1}
            fill="url(#colorValue2)"
            strokeWidth={2}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}
