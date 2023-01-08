export default function SearchBar() {
  return (
    <div className="flex gap-3">
      <select>
        <option>테마</option>
        <option>제작자</option>
        <option>추천순</option>
      </select>
      <input className="border-2 rounded-xl h-10 w-96 p-4" />
    </div>
  );
}
