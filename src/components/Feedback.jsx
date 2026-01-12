import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const Feedback = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    e.target.reset();
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000); // Auto-close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
            
                * {
                    font-family: "Poppins", sans-serif;
                }
            `}</style>
      <section className="relative border rounded-3xl mt-45 flex flex-col md:flex-row justify-center px-4 py-20 gap-20">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 size-140  rounded-full blur-[200px]"></div>

        <div className="text-center md:text-left mt-20">
          {/* <div className="flex items-center  p-1.5 rounded-full border border-green-900 text-xs w-fit mx-auto md:mx-0">
            <div className="flex items-center">
              <img
                className="size-7 rounded-full border border-green-900"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                alt="userImage1"
              />
              <img
                className="size-7 rounded-full border border-green-900 -translate-x-2"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                alt="userImage2"
              />
              <img
                className="size-7 rounded-full border border-green-900 -translate-x-4"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                alt="userImage3"
              />
            </div>
            <p className="-translate-x-2 text-xs text-slate-200">
              Join a community of ambitious professionals{" "}
            </p>
          </div> */}
          <h1 className="font-medium text-3xl md:text-5xl/15 bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent max-w-[470px] mt-4">
            Help us improve ResuCurate
          </h1>
          <p className="text-sm/6 text-cyan-50 max-w-[345px] mt-4 mx-auto md:mx-0">
            Tell us what’s working, what’s not, or what you’d love to see next.
          </p>
        </div>

        <div className="w-full max-w-lg bg-[#00A63E]/0 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name (optional)"
                className="w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition"
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Your email (optional, only if you want a reply)"
                className="w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition"
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Message</label>
              <textarea
                placeholder="Any bugs, feature requests, or ideas?"
                rows="4"
                required
                className="w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white/40 placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition resize-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs md:text-sm text-white/60 max-w-3xs">
                By submitting, you agree to our{" "}
                <span className="text-white">Terms</span> and{" "}
                <span className="text-white">Privacy Policy</span>.
              </p>
              <button
                type="submit"
                className="bg-linear-to-r from-purple-950 to-purple-600 hover:from-purple-600 hover:to-purple-950 text-white text-sm px-8 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Thank You Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="relative bg-[#0b1020] border border-white/10 rounded-2xl shadow-2xl p-8 max-w-md mx-4">
              <button
                onClick={() => setShowPopup(false)}
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
                  Thank You!
                </h2>

                <p className="text-slate-400">
                  Thanks for helping us build a better ResuCurate.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Feedback;
