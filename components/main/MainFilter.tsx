import { useEffect, useState } from "react";
import RadioButton from "../atoms/RadioButton";

export default function MainFilter() {
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

  return (
    <div className="flex items-center justify-center gap-3 my-11">
      <RadioButton
        id="all"
        name="main-radio"
        label="전체"
        value="전체"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <RadioButton
        id="recommend"
        name="main-radio"
        label="추천"
        value="추천"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <RadioButton
        id="all2"
        name="main-radio"
        label="랭킹순"
        value="랭킹순"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <RadioButton
        id="all3"
        name="main-radio"
        label="3학년 랭킹순"
        value="3학년 랭킹순"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <RadioButton
        id="all4"
        name="main-radio"
        label="2학년 랭킹순"
        value="2학년 랭킹순"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <RadioButton
        id="all5"
        name="main-radio"
        label="1학년 랭킹순"
        value="1학년 랭킹순"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <RadioButton
        id="all6"
        name="main-radio"
        label="팔로잉"
        value="팔로잉"
        keyword={keyword}
        setKeyword={setKeyword}
      />
    </div>
  );
}
