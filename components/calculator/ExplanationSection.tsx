export function ExplanationSection() {
  return (
    <section
      aria-labelledby="how-it-works"
      className="rounded-[2rem] border border-[var(--border-soft)] bg-white/85 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:p-8"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-red)]">
          Understand the math
        </p>
        <h2
          id="how-it-works"
          className="mt-3 text-2xl font-bold tracking-tight text-[var(--primary-blue-strong)] sm:text-3xl"
        >
          How this goal-based investment calculator works
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          The calculator first estimates what your goal may cost in the future by applying
          inflation every year. It then uses a monthly compounding SIP formula to estimate
          how much you would need to invest each month to reach that target amount.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="rounded-[1.5rem] bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-[var(--primary-blue-strong)]">
            Step 1: Inflate the goal cost
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Future Goal Value = Present Cost x (1 + Inflation Rate)
            <sup>Years</sup>
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This helps you plan for the actual amount you may need when the goal arrives, not
            today&apos;s price tag.
          </p>
        </article>

        <article className="rounded-[1.5rem] bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-[var(--primary-blue-strong)]">
            Step 2: Estimate the monthly SIP
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Required SIP = Future Goal Value x r / (((1 + r)
            <sup>n</sup> - 1) x (1 + r))
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Here, <strong>r</strong> is the expected monthly return and <strong>n</strong> is the
            total number of monthly investments.
          </p>
        </article>
      </div>
    </section>
  );
}
