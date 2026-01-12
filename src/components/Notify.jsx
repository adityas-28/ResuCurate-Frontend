import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import BlobCursor from "./BlobCursor";

const Notify = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  return (
    <div className="relative min-h-screen bg-[#020617] text-gray-200 flex items-center justify-center px-4 py-24 overflow-hidden bg">
      {/* Blob Cursor */}
      <div className="fixed inset-0 z-0 ">
        <BlobCursor
          blobType="circle"
          fillColor="#5227FF"
          trailCount={3}
          sizes={[75, 150, 100]}
          innerSizes={[20, 35, 25]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.75)"
          shadowBlur={5}
          shadowOffsetX={10}
          shadowOffsetY={10}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
        />
      </div>

      {/* Content */}
      <section className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full border rounded-4xl p-5">
        <h2 className="text-4xl font-semibold max-w-2xl">
          We’re Almost{" "}
          <span className="bg-gradient-to-t from-indigo-600 to-black p-1 inline-block">
            Ready
          </span>
        </h2>

        <p className="text-slate-400 max-w-lg mt-4">
          ResuCurate is currently in early access. We’re polishing the final
          experience to make sure every resume passes real ATS systems.
        </p>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center mt-10 text-sm rounded-full h-14 max-w-xl w-full
         focus-within:outline-indigo-600"
        >
          <input
            className="bg-transparent outline-none rounded-full px-4 h-full flex-1 placeholder:text-slate-400 text-white"
            placeholder="Enter your email address"
            type="email"
            required
          />
          <button
            type="submit"
            className="ml-3 bg-indigo-600 text-white rounded-full h-11 mr-1 px-8
            flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-xs">
          Get notified the moment ResuCurate is fully live.
        </p>

        <Link
          to="/"
          className="mt-8 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          ← Back to Home
        </Link>
      </section>

      {/* Thank You Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="relative bg-[#0b1020] border border-white/10 rounded-2xl shadow-2xl p-8 max-w-md mx-4">
            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/");
              }}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="size-5 text-slate-300" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex items-center justify-center size-16 rounded-full bg-green-500/10">
                <svg
                  className="size-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                You’re on the list!
              </h2>

              <p className="text-slate-400">
                We’ll notify you as soon as ResuCurate is ready!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notify;
