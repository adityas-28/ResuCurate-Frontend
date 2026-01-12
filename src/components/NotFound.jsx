import { React } from "react";
import { Link } from "react-router-dom";
import BlobCursor from "./BlobCursor";

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-sm max-md:px-4 py-20 bg-black h-dvh overflow-hidden">
      <div className="fixed inset-0  z-10">
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
          zIndex={100}
        />
      </div>
      <h1 className="relative z-20 text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
        404 Not Found
      </h1>
      <div className="relative z-20 h-px w-80 rounded bg-gradient-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
      <p className="relative z-20 md:text-xl text-gray-400 max-w-lg text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        data-ignore-cursor
        className="group relative z-50 flex items-center gap-1 bg-white hover:bg-gray-200 px-7 py-2.5 text-gray-800 rounded-full mt-10 font-medium active:scale-95 transition-all pointer-events-auto"
      >
        Back to Home
        <svg
          className="group-hover:translate-x-0.5 transition"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417"
            stroke="#1E1E1E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
};

export default NotFound;
