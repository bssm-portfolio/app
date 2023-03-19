import { PortfolioListType } from "@/types/portfolio.interface";
import classNames from "classnames";
import Chip from "./Chip";

interface ChipItem {
  id: number | string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}
interface ChipGroupProps {
  items: ChipItem[];
  type?: PortfolioListType;
  className?: string;
  isShorten?: boolean;
}

export default function ChipGroup({
  items,
  type = "main",
  className = "",
  isShorten = false,
}: ChipGroupProps) {
  const getFilteredItems = () => {
    if (isShorten) return items.filter((_, idx) => idx < 3);
    return items;
  };

  return (
    <Chip.Group className={classNames(className, "pt-2")} type={type}>
      {getFilteredItems().map((item) => (
        <Chip.Item
          type={type}
          key={item.id}
          {...{
            selected: item.selected,
            onClick: item.onClick,
          }}
        >
          {item.label}
        </Chip.Item>
      ))}
      {isShorten && items.length >= 4 && (
        <Chip.Item type={type}>더보기</Chip.Item>
      )}
    </Chip.Group>
  );
}
