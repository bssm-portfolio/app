import { SearchType } from "@/types/portfolio.interface";
import { focusInput } from "@/utils/input";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import SearchIcon from "../Icon/SearchIcon";
import Select from "./Select";

interface SearchOptions {
  label: string;
  value: SearchType;
}

const searchOptions: SearchOptions[] = [
  {
    label: "제목",
    value: "TITLE",
  },
  {
    label: "기여자",
    value: "CONTRIBUTOR",
  },
  {
    label: "제작자",
    value: "CREATOR",
  },
];

export default function SearchBar() {
  const router = useRouter();
  const [searchProperty, setSearchProperty] = useState({});
  const inputRef = useRef<HTMLInputElement>(null);

  const getSearchBarCss = () => {
    return `
    hidden 
    items-center 
    bg-white
    text-primary-dark_gray
    border
    border-primary-dark_gray
    rounded-full
    px-[1.5rem]
    py-[0.5rem]
    xl:flex
  `;
  };

  const handleKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchProperty((prev) => ({ ...prev, keyword: event.target.value }));

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    setSearchProperty((prev) => ({
      ...prev,
      searchType: event.target.value as SearchType,
    }));

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: "/search",
      query: searchProperty,
    });
  };

  return (
    <form className={getSearchBarCss()} onSubmit={handleSearch}>
      <Select
        className="text-middle"
        name="category"
        onChange={(event) => handleSelect(event)}
        options={searchOptions}
        nativeSelect
      />
      <span className="block border-r border-primary-dark_gray h-base" />
      <SearchIcon className="mx-small" onClick={() => focusInput(inputRef)} />
      <input
        ref={inputRef}
        name="keyword"
        className="w-[13.875rem] focus:outline-none "
        placeholder="검색"
        onChange={(event) => handleKeyword(event)}
      />
    </form>
  );
}
