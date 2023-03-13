import { clearInput, focusInput } from "@/utils/input";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { XIcon } from "../Icon";
import SearchIcon from "../Icon/SearchIcon";
import Select from "./Select";

const searchOptions = [
  {
    label: "제목",
    value: "제목",
  },
  {
    label: "테마별",
    value: "테마별",
  },
  {
    label: "제작자별",
    value: "제작자별",
  },
  {
    label: "학생별",
    value: "학생별",
  },
];

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<string>("");
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
    setKeyword(event.target.value);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    setCategory(event.target.value);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({ pathname: `/search`, query: { keyword } });
  };

  return (
    <form className={getSearchBarCss()} onSubmit={handleSearch}>
      <Select
        className="text-middle"
        name="category"
        value={category}
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
        value={keyword}
        onChange={(event) => handleKeyword(event)}
      />

      {keyword ? (
        <button
          type="button"
          className="ml-3"
          onClick={() => clearInput(inputRef)}
        >
          <XIcon className="w-base h-base" />
        </button>
      ) : (
        <div className="w-4 h-4 ml-3" />
      )}
    </form>
  );
}
