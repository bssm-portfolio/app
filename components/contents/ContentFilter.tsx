import { useState } from "react";
import BlackFilterIcon from "../Icon/BlackFilterIcon";

export default function ContentFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);
  return (
    <div
      className="flex flex-col mb-small cursor-pointer"
      onClick={handleClick}
    >
      <div className="inline-flex items-center">
        <BlackFilterIcon />
        <span className="block ml-3 text-middle">필터</span>
      </div>
      {isOpen && <div>숨김</div>}
    </div>
  );
}
