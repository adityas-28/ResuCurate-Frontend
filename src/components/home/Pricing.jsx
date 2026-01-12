import React from "react";

function Pricing() {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$0",
      credits: "1 Resume",
      description:
        "Perfect for students and job seekers creating their first ATS-optimized resume.",
      features: [
        "1 Resume Project",
        "AI Resume Score & ATS Analysis",
        "Core Resume Templates",
        "Basic AI Bullet Suggestions",
        "LaTeX-Based High-Quality PDF Export",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      price: "$5",
      credits: "5 Resumes",
      description:
        "Ideal for active job seekers applying to multiple roles or industries.",
      features: [
        "Up to 5 Resume Versions",
        "Premium AI Bullet Generation",
        "Industry-Specific Optimization",
        "LaTeX-Based High-Quality PDF Export",
      ],
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: "$15",
      credits: "Unlimited",
      description:
        "Built for professionals, freelancers, and power users who want maximum flexibility.",
      features: [
        "Unlimited Resumes",
        "Premium AI Bullet Generation",
        "Industry-Specific Optimization",
        "LaTeX-Based High-Quality PDF Export",
      ],
    },
  ];

  const handlePurchase = async (planId) => {};
  return (
    <>
      <div className="w-full max-w-6xl mx-auto z-20 max-md:px-4 mt-15">
        <div className="pt-14 py-4 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Intro Column */}
            <div className="lg:col-span-1 flex flex-col justify-center p-4">
              <h2
                className="text-3xl font-semibold leading-tight
  bg-gradient-to-r from-purple-400 via-white to-green-300
  bg-clip-text text-transparent"
              >
                Choose Your Plan
              </h2>

              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                Start free and upgrade when you're ready to accelerate your job
                search. Simple, transparent pricing designed to help you get
                hired.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span> ATS-optimized
                  resumes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span> AI-powered bullet
                  points
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span> One-click LaTeX PDF
                  export
                </li>
              </ul>
            </div>

            {/* Pricing Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`p-6 mx-auto w-full max-w-sm rounded-lg text-white shadow-lg transition-all
              ${
                plan.id === "growth"
                  ? "bg-indigo-950/40 ring-2 ring-indigo-500 scale-[1.03]"
                  : "bg-black/20 ring ring-indigo-950 hover:ring-indigo-500"
              }
            `}
                >
                  <h3 className="text-xl font-bold">{plan.name}</h3>

                  <div className="my-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-300"> / {plan.credits}</span>
                  </div>

                  <p className="text-gray-300 mb-6">{plan.description}</p>

                  <ul className="space-y-1.5 mb-6 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-indigo-300 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(plan.id)}
                    className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-sm rounded-md transition-all"
                  >
                    {plan.id === "starter" ? "Get Started Free" : "Upgrade Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
