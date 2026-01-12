import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMain from "../components/NavbarMain";

function Layout() {
  return (
    <>
      {" "}
      <div className="bg-slate-950 p-2">
        <NavbarMain />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
