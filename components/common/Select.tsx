import React from "react";
import DownIcon from "../Icon/DownIcon";

export default function Select({ children }: { children: React.ReactNode }) {
  return (
    <>
      <select className="appearance-none border-r border-black">
        {children}
      </select>
      <span>
        <DownIcon />
      </span>
    </>
  );
}
