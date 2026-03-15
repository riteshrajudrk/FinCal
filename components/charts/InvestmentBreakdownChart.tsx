"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { compactCurrencyFormatter } from "@/lib/finance";

type InvestmentBreakdownChartProps = {
  totalInvestment: number;
  estimatedReturns: number;
};

export function InvestmentBreakdownChart({
  totalInvestment,
  estimatedReturns,
}: InvestmentBreakdownChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [
    { name: "Invested amount", value: totalInvestment, color: "#224c87" },
    { name: "Estimated returns", value: estimatedReturns, color: "#da3832" },
  ];

  return (
    <section className="rounded-[2rem] border border-[var(--border-soft)] bg-white/85 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-red)]">
            Portfolio mix
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--primary-blue-strong)]">
            Invested amount vs estimated returns
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          A simple split view to show how much of the final corpus comes from your own
          contribution and how much may come from growth.
        </p>
      </div>

      <div className="mt-8 grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="h-[320px]" role="img" aria-label="Invested amount versus estimated returns chart">
          {isMounted ? (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={78}
                  outerRadius={118}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => compactCurrencyFormatter.format(Number(value ?? 0))} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full animate-pulse rounded-full bg-slate-100" />
          )}
        </div>

        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="rounded-[1.25rem] border border-[var(--border-soft)] bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm font-semibold text-[var(--primary-blue-strong)]">{item.name}</p>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {compactCurrencyFormatter.format(item.value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
