import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMain from "../components/NavbarMain";

function Layout() {
  return (
    <>
      {" "}
      <div className="bg-gray-950 p-2 w-auto">
        <NavbarMain />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
