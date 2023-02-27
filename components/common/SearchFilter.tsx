import { useState } from "react";
import WhiteFilterIcon from "../Icon/WhiteFilterIcon";

export default function SearchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);
  return (
    <div
      className="text-white flex flex-col mb-small cursor-pointer"
      onClick={handleClick}
    >
      <div className="inline-flex items-center">
        <WhiteFilterIcon />
        <span className="block ml-3 text-middle">필터</span>
      </div>
      {isOpen && <div>숨김</div>}
    </div>
  );
}
