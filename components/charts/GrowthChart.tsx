"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { compactCurrencyFormatter, type GrowthDataPoint } from "@/lib/finance";

type GrowthChartProps = {
  data: GrowthDataPoint[];
};

export function GrowthChart({ data }: GrowthChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="rounded-[2rem] border border-[var(--border-soft)] bg-white/85 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-red)]">
            Growth projection
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--primary-blue-strong)]">
            Investment growth over time
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          This chart shows how monthly investing and compounding may work together across your
          time horizon.
        </p>
      </div>

      <div className="mt-8 h-[320px] w-full" role="img" aria-label="Projected investment growth chart">
        {isMounted ? (
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#224c87" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#224c87" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(145,144,144,0.18)" vertical={false} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: "#496079" }} />
              <YAxis
                tickFormatter={(value) => compactCurrencyFormatter.format(value)}
                tickLine={false}
                axisLine={false}
                width={96}
                tick={{ fill: "#496079" }}
              />
              <Tooltip
                formatter={(value) => compactCurrencyFormatter.format(Number(value ?? 0))}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid rgba(34,76,135,0.12)",
                  boxShadow: "0 20px 40px rgba(16,35,63,0.12)",
                }}
              />
              <Area
                type="monotone"
                dataKey="growth"
                stroke="#224c87"
                strokeWidth={3}
                fill="url(#growthFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full animate-pulse rounded-[1.5rem] bg-slate-100" />
        )}
      </div>
    </section>
  );
}
