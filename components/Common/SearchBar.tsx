import React from "react";

export default function SearchBar() {
  return (
    <div className="flex gap-3">
      <input className="border-2 rounded-xl h-10 w-96 p-4" />
      <button
        className="p-2 w-10 h-10 bg-orange-200 rounded-full shadow-sm"
        type="submit"
      >
        검
      </button>
    </div>
  );
}
