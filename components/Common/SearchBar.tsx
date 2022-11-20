import React from "react";
import { Button } from "@/components";

export default function SearchBar() {
  return (
    <div className="flex gap-3">
      <select>
        <option>테마</option>
        <option>제작자</option>
        <option>추천순</option>
      </select>
      <input className="border-2 rounded-xl h-10 w-96 p-4" />
      <Button
        className="p-2 w-10 h-10 bg-orange-200 rounded-full shadow-sm"
        type="submit"
      >
        검
      </Button>
    </div>
  );
}
