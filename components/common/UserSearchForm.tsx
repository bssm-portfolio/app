import httpClient from "@/apis";
import { Member } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import Input from "../atoms/Input";
import { SearchIcon, XIcon } from "../Icon";

interface UserSearchFormProps {
  selectedMembers: Member[];
  setSelectedMembers: Dispatch<SetStateAction<Member[]>>;
}

export default function UserSearchForm({
  selectedMembers,
  setSelectedMembers,
}: UserSearchFormProps) {
  const [memberSearchText, setMemberSearchText] = useState("");
  const { data } = useQuery(["member search", memberSearchText], () =>
    memberSearchText !== ""
      ? httpClient.memberName
          .get({ params: { name: memberSearchText } })
          .then((r) => r.data.list)
      : [],
  );

  return (
    <>
      <div className="mb-1">
        {selectedMembers.map((member) => (
          <div className="flex px-2 gap-2 items-center" key={member.memberId}>
            <span>
              {member.name}({member.email})
            </span>
            <XIcon
              className="w-3 cursor-pointer"
              onClick={() =>
                setSelectedMembers((s) =>
                  s.filter(
                    (selectedMember) =>
                      selectedMember.memberId !== member.memberId,
                  ),
                )
              }
            />
          </div>
        ))}
      </div>
      <div className="relative">
        <SearchIcon className="absolute top-2 left-3 w-[0.8125rem]" />
        <Input
          className="w-full pl-8 mb-2"
          placeholder="사용자 이름을 입력하세요"
          onChange={(e) => setMemberSearchText(e.target.value)}
        />
      </div>
      <div className="flex flex-col overflow-y-scroll max-h-20">
        {data?.map((v: Member) => {
          const selected = selectedMembers.some(
            (member) => member.memberId === v.memberId,
          );
          return (
            <div
              className={classNames("px-4 py-1 text-lg  hover:cursor-pointer", {
                "bg-slate-400": selected,
                "hover:bg-slate-200": !selected,
              })}
              key={v.memberId}
              onClick={() => !selected && setSelectedMembers((s) => [...s, v])}
            >
              {v.name}({v.email})
            </div>
          );
        })}
      </div>
    </>
  );
}
