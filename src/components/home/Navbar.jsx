import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  onHomeClick,
  onFeaturesClick,
  onPricingClick,
  onFeedbackClick,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 left-1/2 z-50 flex h-12 w-[calc(100%-3rem)] max-w-6xl -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-white/20 bg-black/40 px-4 text-xs backdrop-blur-md md:w-auto">
        {/* <a href="#" className="flex-shrink-0">
          {/* <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
            <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
          </svg> 
          
        </a> */}
        <Link to="/">
          <img
            src="/logo.png"
            alt="logo"
            className="h-14 w-14 object-contain"
          />
        </Link>
        <div className="hidden gap-6 md:flex">
          {[
            { label: "Home", onClick: onHomeClick },
            { label: "Features", onClick: onFeaturesClick },
            { label: "Pricing", onClick: onPricingClick },
            { label: "Get in Touch", onClick: onFeedbackClick },
          ].map(({ label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="group relative overflow-hidden text-left"
            >
              <span className="block transition-transform duration-300 group-hover:-translate-y-full text-sm hover:text-indigo-400">
                {label}
              </span>
              <span className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          {/* <button className="rounded-full border border-slate-600 px-4 py-2 text-sm font-medium transition hover:bg-slate-800">
            Contact
          </button> */}
          <Link
            to="/login"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-[0px_0px_30px_7px] shadow-white/50 transition duration-300 hover:bg-slate-100 hover:shadow-[0px_0px_30px_14px] hover:shadow-white/50"
          >
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto flex-shrink-0 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto bg-black/95 backdrop-blur-md md:hidden">
          <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-start gap-6 px-6 py-8">
            {[
              { label: "Home", onClick: onHomeClick },
              { label: "Features", onClick: onFeaturesClick },
              { label: "Pricing", onClick: onPricingClick },
              { label: "Get in Touch", onClick: onFeedbackClick },
            ].map(({ label, onClick }) => (
              <button
                key={label}
                onClick={() => {
                  onClick?.();
                  setOpen(false);
                }}
                className="text-lg font-medium text-white transition-colors hover:text-indigo-400"
              >
                {label}
              </button>
            ))}
            <div className="mt-4 flex flex-col items-center gap-4">
              <Link
                to="/app"
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-[0px_0px_30px_7px] shadow-white/50 transition duration-300 hover:bg-slate-100 hover:shadow-[0px_0px_30px_14px] hover:shadow-white/50 text-center"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
