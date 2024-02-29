import React from "react";
import { Quicksand } from "next/font/google";
import Sidebar from "../Sidebar";

const quicksand = Quicksand({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${quicksand.className} h-screen w-screen `}>
      <div
        className="mdw-full relative min-h-screen bg-white-default md:flex"
        data-dev-hint="container"
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
