import classNames from "classnames";
import { useState } from "react";
import { DownIcon } from "../Icon";
import OrangeFilterIcon from "../Icon/OrangeFilterIcon";
import WhiteFilterIcon from "../Icon/WhiteFilterIcon";

export default function SearchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);
  return (
    <div
      className="flex flex-col mb-small cursor-pointer text-white"
      onClick={handleClick}
    >
      <div className="flex items-center">
        {isOpen ? <OrangeFilterIcon /> : <WhiteFilterIcon />}

        <span
          className={classNames("block ml-3 text-middle text-somago_yellow", {
            "!text-white": !isOpen,
          })}
        >
          필터
        </span>
        <DownIcon
          className={classNames(
            "ml-3 mt-1 [&>path]:stroke-somago_yellow rotate-180",
            {
              " [&>path]:!stroke-white rotate-0": !isOpen,
            },
          )}
        />
      </div>
      {isOpen && <div>숨김</div>}
      <hr className="text-white mt-3 mb-10" />
    </div>
  );
}
