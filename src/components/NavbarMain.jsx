// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function NavbarMain() {
//   const user = { name: "User " };
//   const navigate = useNavigate();

//   const logoutUser = () => {
//     navigate("/");
//   };
//   return (
//     <>
//       <div className="bg-cyan-950 border-b border-b-cyan-500 shadow-xl rounded-3xl p-1">
//         <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
//           <Link to="/app" className="hover:opacity-80 transition-opacity">
//             <img
//               src="/logo.png"
//               alt="logo"
//               className="h-12 w-12 object-contain"
//             />
//           </Link>
//           <div className="hidden gap-6 md:flex text-white">
//             {[
//               { label: "Dashboard", onClick: () => navigate("/") },
//               { label: "Generate", onClick: () => navigate("/builder") },
//               { label: "ATS Scan", onClick: () => navigate("/ats-scan") },
//               { label: "My Resumes", onClick: () => navigate("/my-resumes") },
//             ].map(({ label, onClick }) => (
//               <button
//                 key={label}
//                 onClick={onClick}
//                 className="group relative overflow-hidden text-left"
//               >
//                 <span className="block transition-transform duration-300 group-hover:-translate-y-full text-sm hover:text-indigo-400">
//                   {label}
//                 </span>
//                 <span className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
//                   {label}
//                 </span>
//               </button>
//             ))}
//           </div>
//           <div className="flex items-center gap-6 text-sm">
//             <p className="max-sm:hidden text-gray-300 font-medium">
//               Hi, <span className="text-white">{user?.name}</span>
//             </p>
//             <button
//               onClick={logoutUser}
//               className="rounded-full border bg-slate-700 border- bg-slate-200 px-5 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:border-slate-300 hover:shadow-lg hover:shadow-gray-900/50 active:scale-95"
//             >
//               Logout
//             </button>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }

// export default NavbarMain;


import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NavTab = ({ label, onClick, setPosition, isActive }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-200
        ${
          isActive 
            ? "text-white font-semibold hover:text-black" 
            : "text-gray-300 hover:text-black"
        }`}
    >
      {label}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-9 rounded-full bg-cyan-50 text-black shadow-lg shadow-indigo-500/50"
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        opacity: position.opacity,
      }}
    />
  );
};

function NavbarMain() {
  const user = { name: "User" };
  const navigate = useNavigate();
  const location = useLocation();

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const logoutUser = () => {
    navigate("/");
  };

  const tabs = [
    { label: "Dashboard", path: "/app" },
    { label: "Generate", path: "/app/generate" },
    { label: "ATS Scan", path: "/app/ats-scan" },
    { label: "My Resumes", path: "/app/my-resumes" },
    { label: "View Arsenal", path: "/app/view-arsenal" },
  ];

  return (
    <div className="bg-gray-950 rounded-3xl backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        
        {/* Logo */}
        <Link 
          to="/app"
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src="/logo.png"
            alt="logo"
            className="h-12 w-12 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
          />
        </Link>

        {/* Sliding Tabs */}
        <ul
          onMouseLeave={() =>
            setPosition((pv) => ({ ...pv, opacity: 0 }))
          }
          className="relative hidden md:flex w-fit rounded-full bg-black/80 backdrop-blur-md p-1.5 border border-slate-600/50 shadow-inner"
        >
          {tabs.map((tab) => (
            <NavTab
              key={tab.path}
              label={tab.label}
              isActive={location.pathname === tab.path}
              onClick={() => navigate(tab.path)}
              setPosition={setPosition}
            />
          ))}

          <Cursor position={position} />
        </ul>

        {/* User Section */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <p className="hidden sm:block text-gray-400">
            Hi, <span className="text-white font-semibold">{user.name}</span>
          </p>
          <button
            onClick={logoutUser}
            className="group relative rounded-full bg-gradient-to-r from-slate-700 to-slate-600 px-5 py-1.5 text-white font-medium transition-all duration-300 hover:from-slate-900 hover:to-slate-800 hover:shadow-lg hover:shadow-slate-500/20 active:scale-95 border border-slate-600/50 hover:border-slate-500/50"
          >
            <span className="relative z-10">Logout</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavbarMain;
