import React from "react";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-gray-400">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col items-center gap-6 text-center">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ResuCurate logo"
            className="h-[45px] w-[45px] object-contain"
          />
          <span className="text-lg font-semibold text-white">
            ResuCurate
          </span>
        </div>

        {/* Description */}
        <p className="max-w-xl text-sm">
          Build ATS-friendly resumes that recruiters actually read. Optimized
          with AI. Designed for real hiring systems.
        </p>

        {/* Fun line */}
        <p className="text-xs text-gray-500 italic">
          Built by a software engineer who understands the job search struggle.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-6 pt-2">
          
          {/* Twitter / X */}
          <a href="#" className="hover:text-indigo-400 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26L22.827 21.75h-6.588l-5.157-6.724L4.99 21.75H1.68l7.73-8.835L1.173 2.25h6.757l4.664 6.086L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" className="hover:text-indigo-400 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 23.5h4V7.5h-4v16ZM8.5 7.5h3.8v2.2h.1c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1v9.9h-4v-8.8c0-2.1-.04-4.8-2.92-4.8-2.92 0-3.37 2.28-3.37 4.64v8.96h-4v-16Z" />
            </svg>
          </a>

          {/* GitHub */}
          <a href="#" className="hover:text-indigo-400 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.03c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.27-5.23-5.65 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.17a11.1 11.1 0 0 1 5.8 0c2.21-1.48 3.18-1.17 3.18-1.17.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.07 0 4.39-2.69 5.35-5.25 5.63.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
            </svg>
          </a>

        </div>

        {/* Copyright */}
        <p className="pt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} ResuCurate
        </p>
      </div>
    </footer>
  );
}

export default Footer;
