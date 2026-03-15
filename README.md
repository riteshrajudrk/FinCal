# FinCal Goal-Based Investment Calculator

An educational Goal-Based Investment Calculator built for the FinCal Innovation Hackathon.

The app helps users understand how much monthly SIP they may need to invest to reach a future financial goal after accounting for inflation and expected returns.

## Overview

This project is designed as a responsive, accessible, production-ready fintech web application using Next.js 15 App Router, TypeScript, Tailwind CSS, and Recharts.

Users can:

- Adjust financial assumptions using interactive sliders
- See real-time goal inflation and SIP calculations
- Visualize portfolio growth over time
- Compare total invested amount versus estimated returns
- Understand the formulas through an educational explanation section

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion
- Node.js compatible

## Financial Logic

### Step 1: Inflate the Goal Cost

`FutureGoalValue = PresentCost * (1 + inflationRate)^years`

### Step 2: Calculate Required SIP

`r = annualReturn / 12`

`n = years * 12`

`RequiredSIP = FutureGoalValue * r / ((((1 + r)^n) - 1) * (1 + r))`

## Inputs

- `currentGoalCost`
- `yearsToGoal`
- `expectedInflationRate`
- `expectedAnnualReturn`

## Outputs

- `inflatedGoalCost`
- `requiredMonthlyInvestment`
- `totalInvestment`
- `estimatedReturns`

## Features

- Interactive sliders instead of manual text inputs
- Real-time calculations
- Animated result cards
- Growth projection chart
- Investment vs returns breakdown chart
- Educational explanation section
- Responsive design across desktop and mobile
- Accessible forms and keyboard-friendly controls
- Required financial disclaimer

## Accessibility

The UI was built with WCAG 2.1 AA-oriented practices in mind:

- Semantic HTML structure
- Clear section headings
- Keyboard-accessible slider controls
- ARIA labels for interactive inputs and chart regions
- Visible focus states
- Brand colors chosen with readable contrast on light surfaces

## Brand Guidelines Applied

- Primary Blue: `#224c87`
- Red: `#da3832`
- Grey: `#919090`
- Font stack: `Montserrat, Arial, Verdana, sans-serif`

## Project Structure

```text
app/
  favicon.ico
  globals.css
  layout.tsx
  page.tsx
components/
  calculator/
    Disclaimer.tsx
    ExplanationSection.tsx
    GoalCalculator.tsx
    RangeSlider.tsx
    ResultCard.tsx
  charts/
    GrowthChart.tsx
    InvestmentBreakdownChart.tsx
lib/
  finance.ts
styles/
  theme.css
```

## Key Files

- `app/page.tsx` renders the calculator experience
- `components/calculator/GoalCalculator.tsx` contains the main UI and live state
- `components/charts/GrowthChart.tsx` shows projected growth over time
- `components/charts/InvestmentBreakdownChart.tsx` shows invested amount vs returns
- `lib/finance.ts` contains the core financial formulas and projection helpers

## Local Setup

### Prerequisites

- Node.js 18 or later
- npm

### Install

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## Verification

This project has been verified with a successful production build using:

- Next.js `15.5.12`

## Disclaimer

This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns.

## Working Video Guide

Demo video: `https://drive.google.com/file/d/1GhTpBb4sdwd3T9e5TFT77ZKpY2USwR8g/view?usp=sharing`

Use this short script while recording the mandatory demo video:

1. Open the homepage and introduce the app as a Goal-Based Investment Calculator for educational financial planning.
2. Show the four sliders: current goal cost, years to goal, inflation rate, and annual return.
3. Change the sliders live and explain that the result cards update instantly.
4. Highlight the inflated goal cost and required monthly SIP.
5. Scroll to the growth projection chart and explain how compounding affects long-term outcomes.
6. Scroll to the invested vs returns chart and explain contribution versus generated wealth.
7. Show the explanation section with the formulas.
8. End by showing the disclaimer and summarizing that the tool is educational, not investment advice.

## Suggested GitHub Submission Notes

When publishing the repository, include:

- Project title
- Hackathon name
- Problem statement addressed
- Tech stack used
- Setup instructions
- Screenshots if available
- Demo video link

## Future Enhancements

- Goal presets such as education, retirement, travel, or home purchase
- Export to PDF
- Compare multiple return scenarios
- Save and share plan links
- Multi-language support
