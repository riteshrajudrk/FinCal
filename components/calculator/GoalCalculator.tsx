"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Disclaimer } from "@/components/calculator/Disclaimer";
import { ExplanationSection } from "@/components/calculator/ExplanationSection";
import { RangeSlider } from "@/components/calculator/RangeSlider";
import { ResultCard } from "@/components/calculator/ResultCard";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { InvestmentBreakdownChart } from "@/components/charts/InvestmentBreakdownChart";
import {
  calculateGoalPlan,
  compactCurrencyFormatter,
  currencyFormatter,
  generateGrowthProjection,
  percentageFormatter,
  type CalculatorInputs,
} from "@/lib/finance";

const defaultInputs: CalculatorInputs = {
  currentGoalCost: 1_500_000,
  yearsToGoal: 12,
  expectedInflationRate: 6,
  expectedAnnualReturn: 12,
};

export function GoalCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  const results = useMemo(() => calculateGoalPlan(inputs), [inputs]);
  const growthData = useMemo(
    () => generateGrowthProjection(inputs, results.requiredMonthlyInvestment),
    [inputs, results.requiredMonthlyInvestment],
  );

  const updateInput = <Key extends keyof CalculatorInputs>(key: Key, value: CalculatorInputs[Key]) =>
    setInputs((current) => ({ ...current, [key]: value }));

  const inflationImpact = results.inflatedGoalCost - inputs.currentGoalCost;
  const monthlyGap = results.inflatedGoalCost / Math.max(inputs.yearsToGoal * 12, 1);

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,255,255,0.74))] shadow-[var(--shadow-soft)]">
          <div className="grid gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
            <header className="max-w-2xl">
              <p className="inline-flex rounded-full bg-[rgba(34,76,135,0.1)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary-blue)]">
                FinCal Innovation Hackathon
              </p>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--primary-blue-strong)] sm:text-5xl">
                Goal-Based Investment Calculator
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
                Explore how inflation can change the future cost of your goal and estimate the
                monthly SIP needed to stay on track.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                <span className="rounded-full border border-[rgba(34,76,135,0.12)] bg-white px-4 py-2">
                  Real-time SIP planning
                </span>
                <span className="rounded-full border border-[rgba(34,76,135,0.12)] bg-white px-4 py-2">
                  Inflation-aware goal targeting
                </span>
                <span className="rounded-full border border-[rgba(34,76,135,0.12)] bg-white px-4 py-2">
                  Interactive visual breakdown
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">Goal horizon</p>
                  <p className="mt-2 text-2xl font-bold text-[var(--primary-blue-strong)]">
                    {inputs.yearsToGoal} years
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">Expected inflation</p>
                  <p className="mt-2 text-2xl font-bold text-[var(--primary-blue-strong)]">
                    {percentageFormatter.format(inputs.expectedInflationRate)}%
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">Expected return</p>
                  <p className="mt-2 text-2xl font-bold text-[var(--primary-blue-strong)]">
                    {percentageFormatter.format(inputs.expectedAnnualReturn)}%
                  </p>
                </div>
              </div>
            </header>

            <motion.section
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              aria-labelledby="calculator-controls"
              className="rounded-[2rem] bg-[var(--surface)] p-5 ring-1 ring-[rgba(34,76,135,0.08)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-red)]">
                    Interactive controls
                  </p>
                  <h2
                    id="calculator-controls"
                    className="mt-2 text-2xl font-bold text-[var(--primary-blue-strong)]"
                  >
                    Tune your assumptions
                  </h2>
                </div>
              </div>

              <form className="mt-6 space-y-4" aria-label="Goal investment calculator inputs">
                <RangeSlider
                  id="current-goal-cost"
                  label="Current goal cost"
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={inputs.currentGoalCost}
                  onChange={(value) => updateInput("currentGoalCost", value)}
                  formatValue={(value) => compactCurrencyFormatter.format(value)}
                  description="Choose the cost of your goal in today's money."
                />
                <RangeSlider
                  id="years-to-goal"
                  label="Years to goal"
                  min={1}
                  max={30}
                  step={1}
                  value={inputs.yearsToGoal}
                  onChange={(value) => updateInput("yearsToGoal", value)}
                  formatValue={(value) => `${value} years`}
                  description="Set how long you have before you need the money."
                />
                <RangeSlider
                  id="expected-inflation-rate"
                  label="Expected inflation rate"
                  min={1}
                  max={12}
                  step={0.5}
                  value={inputs.expectedInflationRate}
                  onChange={(value) => updateInput("expectedInflationRate", value)}
                  formatValue={(value) => `${percentageFormatter.format(value)}%`}
                  description="Estimate how much the goal cost may increase every year."
                />
                <RangeSlider
                  id="expected-annual-return"
                  label="Expected annual return"
                  min={1}
                  max={18}
                  step={0.5}
                  value={inputs.expectedAnnualReturn}
                  onChange={(value) => updateInput("expectedAnnualReturn", value)}
                  formatValue={(value) => `${percentageFormatter.format(value)}%`}
                  description="Estimate the yearly return your investments may generate."
                />
              </form>
            </motion.section>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] border border-[var(--border-soft)] bg-white/85 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-red)]">
              Planning insight
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--primary-blue-strong)]">
              Inflation can materially widen the gap between today's price and tomorrow's goal
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
              With your current assumptions, a goal that costs <strong>{currencyFormatter.format(inputs.currentGoalCost)}</strong>{" "}
              today may grow to <strong>{currencyFormatter.format(results.inflatedGoalCost)}</strong> in{" "}
              <strong>{inputs.yearsToGoal} years</strong>. That means inflation alone adds{" "}
              <strong>{currencyFormatter.format(inflationImpact)}</strong> to the amount you may need.
            </p>
          </article>

          <article className="rounded-[2rem] bg-[linear-gradient(180deg,#224c87,#16355f)] p-6 text-white shadow-[var(--shadow-soft)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
              Monthly perspective
            </p>
            <p className="mt-4 text-4xl font-bold tracking-tight">
              {currencyFormatter.format(results.requiredMonthlyInvestment)}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/80">
              Estimated SIP required each month to build the target corpus under your selected return
              and inflation assumptions.
            </p>
            <div className="mt-6 rounded-[1.5rem] bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Corpus target spread
              </p>
              <p className="mt-2 text-xl font-semibold">
                {currencyFormatter.format(monthlyGap)} per month equivalent
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <ResultCard
            title="Inflated Goal Cost"
            value={currencyFormatter.format(results.inflatedGoalCost)}
            description="Projected future cost of your goal after accounting for inflation."
          />
          <ResultCard
            title="Required Monthly SIP"
            value={currencyFormatter.format(results.requiredMonthlyInvestment)}
            description="Estimated monthly investment needed to build your target corpus."
          />
          <ResultCard
            title="Total Investment"
            value={currencyFormatter.format(results.totalInvestment)}
            description="Total amount you may contribute across the full investment period."
          />
          <ResultCard
            title="Estimated Returns"
            value={currencyFormatter.format(results.estimatedReturns)}
            description="Estimated growth generated by compounding over your contribution period."
            accent="red"
          />
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
        <GrowthChart data={growthData} />
        <InvestmentBreakdownChart
          totalInvestment={results.totalInvestment}
          estimatedReturns={results.estimatedReturns}
        />
        <ExplanationSection />
        <Disclaimer />
      </section>
    </main>
  );
}
