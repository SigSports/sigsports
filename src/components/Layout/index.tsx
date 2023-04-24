import React, { Children } from "react";
import Sidebar from "../Sidebar";

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <div
        className="relative min-h-screen md:flex w-full"
        data-dev-hint="container"
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
