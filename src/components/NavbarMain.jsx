import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarMain() {
  const user = { name: "Steve Henderson " };
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
  };
  return (
    <>
      <div className="bg-cyan-950 border-b border-b-cyan-500 shadow-xl rounded-3xl p-1">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="logo"
              className="h-12 w-12 object-contain"
            />
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <p className="max-sm:hidden text-gray-300 font-medium">
              Hi, <span className="text-white">{user?.name}</span>
            </p>
            <button
              onClick={logoutUser}
              className="rounded-full border bg-slate-700 border- bg-slate-200 px-5 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:border-slate-300 hover:shadow-lg hover:shadow-gray-900/50 active:scale-95"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavbarMain;
