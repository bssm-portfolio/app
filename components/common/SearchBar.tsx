import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { XIcon } from "../Icon";
import SearchIcon from "../Icon/SearchIcon";
import Select from "./Select";

const getSearchBarCss = () => {
  return `
  flex 
  items-center 
  text-primary-dark_gray
  border
  border-primary-dark_gray
  rounded-full
  px-[1.5rem]
  py-[0.5rem]`;
};

const focusInput = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};

const xClick = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    inputRef.current.value = "";
    focusInput(inputRef);
  }
};

const handleKeyword = (
  event: ChangeEvent<HTMLInputElement>,
  setKeyword: Dispatch<SetStateAction<string>>,
) => setKeyword(event.target.value);

const handleSelect = (
  event: ChangeEvent<HTMLSelectElement>,
  setCategory: Dispatch<SetStateAction<string>>,
) => setCategory(event.target.value);

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={getSearchBarCss()}
      onSubmit={(event) => event.preventDefault()}
    >
      <Select
        className="text-middle"
        name="category"
        value={category}
        onChange={(event) => handleSelect(event, setCategory)}
      >
        <option>테마</option>
        <option>제작자</option>
        <option>추천순</option>
      </Select>
      <span className="block border-r border-primary-dark_gray h-base" />
      <SearchIcon className="mx-small" onClick={() => focusInput(inputRef)} />
      <input
        ref={inputRef}
        name="keyword"
        className="focus:outline-none w-[13.875rem]"
        placeholder="검색"
        value={keyword}
        onChange={(event) => handleKeyword(event, setKeyword)}
      />

      {keyword ? (
        <button type="button" className="ml-3" onClick={() => xClick(inputRef)}>
          <XIcon className="w-base h-base" />
        </button>
      ) : (
        <div className="w-4 h-4 ml-3" />
      )}
    </form>
  );
}
