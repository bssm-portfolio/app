import { useState } from "react";
import { DownIcon } from "../Icon";
import WhiteFilterIcon from "../Icon/WhiteFilterIcon";

export default function SearchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);
  return (
    <div
      className="text-white flex flex-col mb-small cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <WhiteFilterIcon />
        <span className="block ml-3 text-middle">필터</span>
        <DownIcon className="ml-3 mt-1 [&>path]:stroke-white" />
      </div>
      {isOpen && <div>숨김</div>}
      <hr className="text-white mt-3 mb-10" />
    </div>
  );
}
