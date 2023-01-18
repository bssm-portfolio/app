import FilterIcon from "../Icon/FilterIcon";

export default function Filter() {
  return (
    <div className="flex items-center mb-small cursor-pointer">
      <FilterIcon />
      <span className="block ml-3 text-middle">필터</span>
    </div>
  );
}
