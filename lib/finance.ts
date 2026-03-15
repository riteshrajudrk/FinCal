export type CalculatorInputs = {
  currentGoalCost: number;
  yearsToGoal: number;
  expectedInflationRate: number;
  expectedAnnualReturn: number;
};

export type CalculatorResults = {
  inflatedGoalCost: number;
  requiredMonthlyInvestment: number;
  totalInvestment: number;
  estimatedReturns: number;
};

export type GrowthDataPoint = {
  year: number;
  invested: number;
  growth: number;
  returns: number;
};

const percentToDecimal = (value: number) => value / 100;

export function calculateFutureGoalValue(
  currentGoalCost: number,
  yearsToGoal: number,
  expectedInflationRate: number,
) {
  return (
    currentGoalCost * Math.pow(1 + percentToDecimal(expectedInflationRate), yearsToGoal)
  );
}

export function calculateRequiredSIP(
  futureGoalValue: number,
  yearsToGoal: number,
  expectedAnnualReturn: number,
) {
  const months = yearsToGoal * 12;
  const monthlyRate = percentToDecimal(expectedAnnualReturn) / 12;

  if (months <= 0) {
    return futureGoalValue;
  }

  if (monthlyRate === 0) {
    return futureGoalValue / months;
  }

  const numerator = futureGoalValue * monthlyRate;
  const denominator = (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate);

  return numerator / denominator;
}

export function calculateGoalPlan(inputs: CalculatorInputs): CalculatorResults {
  const inflatedGoalCost = calculateFutureGoalValue(
    inputs.currentGoalCost,
    inputs.yearsToGoal,
    inputs.expectedInflationRate,
  );

  const requiredMonthlyInvestment = calculateRequiredSIP(
    inflatedGoalCost,
    inputs.yearsToGoal,
    inputs.expectedAnnualReturn,
  );

  const totalInvestment = requiredMonthlyInvestment * inputs.yearsToGoal * 12;
  const estimatedReturns = Math.max(inflatedGoalCost - totalInvestment, 0);

  return {
    inflatedGoalCost,
    requiredMonthlyInvestment,
    totalInvestment,
    estimatedReturns,
  };
}

export function generateGrowthProjection(
  inputs: CalculatorInputs,
  requiredMonthlyInvestment: number,
) {
  const monthlyRate = percentToDecimal(inputs.expectedAnnualReturn) / 12;
  const totalMonths = inputs.yearsToGoal * 12;
  const projection: GrowthDataPoint[] = [];
  let invested = 0;
  let balance = 0;

  for (let month = 1; month <= totalMonths; month += 1) {
    invested += requiredMonthlyInvestment;
    balance = monthlyRate === 0
      ? invested
      : (balance + requiredMonthlyInvestment) * (1 + monthlyRate);

    if (month % 12 === 0 || month === totalMonths) {
      projection.push({
        year: Math.ceil(month / 12),
        invested: Number(invested.toFixed(2)),
        growth: Number(balance.toFixed(2)),
        returns: Number((balance - invested).toFixed(2)),
      });
    }
  }

  return projection;
}

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const compactCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

export const percentageFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});
