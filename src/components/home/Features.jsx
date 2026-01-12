import React from "react";

function Features() {
  const featuresData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500 size-8 mt-4"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      ),
      title: "See Your Resume Like a Recruiter",
      description:
        "Our AI evaluates your resume exactly like modern ATS systems do, surfacing strengths, gaps, and optimization opportunities to boost interview callbacks.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500 size-8 mt-4"
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
      ),
      title: "Upload Your Resume — Start Free",
      description:
        "Get an instant resume score and detailed insights across structure, keywords, and impact — all optimized to pass ATS filters effortlessly.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500 size-8 mt-4"
        >
          <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <circle cx="17.5" cy="17.5" r="3.5" />
        </svg>
      ),
      title: "Professional, ATS-Optimized Templates",
      description:
        "Clean, modern templates built to meet recruiter expectations and ensure compatibility with ATS parsing systems.",
    },

    // 🔹 NEW FEATURES BELOW 🔹

    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500 size-8 mt-4"
        >
          <path d="M9 12l2 2 4-4" />
          <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6z" />
        </svg>
      ),
      title: "Industry-Tested Resume Designs",
      description:
        "Every template is crafted with input from industry professionals to align with real hiring standards and recruiter preferences.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500 size-8 mt-4"
        >
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-6" />
        </svg>
      ),
      title: "AI-Powered Bullet Points",
      description:
        "Generate high-impact, metrics-driven bullet points trained specifically on what recruiters and hiring managers look for.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500 size-8 mt-4"
        >
          <path d="M12 3v12" />
          <path d="m8 11 4 4 4-4" />
          <rect x="4" y="17" width="16" height="4" rx="1" />
        </svg>
      ),
      title: "One-Click Instant Download",
      description:
        "Export your ATS-friendly resume as a high-quality PDF using LaTeX — formatted perfectly and ready to send to recruiters.",
    },
  ];

  return (
    <>
      <style>
        {`@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

                * {
                    font-family: "Poppins", sans-serif;
                }`}
      </style>

      <section className="mt-20 py-20 px-4 flex flex-col justify-center items-center gap-6">
        {/* <button className="px-4 h-8 border border-gray-800 text-slate-200 text-xs rounded-lg">
          Features
        </button> */}
        <h2
          className="text-3xl md:text-[40px]/12 max-w-lg text-center font-medium
          bg-gradient-to-r from-fuchsia-200 via-white to-emerald-400
          bg-clip-text text-transparent">
          
          AI That Builds Resumes Recruiters Actually Read
        </h2>
        <p className="text-base/7 text-gray-200 max-w-xl text-center">
          Optimize content, structure, and impact with intelligent tools
          designed to beat ATS filters and impress hiring managers.
        </p>
        <div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-8 mt-10 px-6 max-w-7xl mx-auto">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`hover:-translate-y-1 transition-all duration-300 flex ${
                index === 1
                  ? "p-px rounded-[13px] bg-gradient-to-br from-[#9544FF] to-[#223B60]"
                  : ""
              }`}
            >
              <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 w-80 h-80 flex flex-col">
                {feature.icon}
                <h3 className="text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Features;
