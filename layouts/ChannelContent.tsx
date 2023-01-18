import { Header } from "@/components";
import { ReactNode } from "react";

interface FrameProps {
  title: ReactNode;
  filter: ReactNode;
  datagrid: ReactNode;
}

function Frame({ title, filter, datagrid }: FrameProps) {
  return (
    <div className="px-[8.25rem] pt-10">
      <div>{title}</div>
      <div>{filter}</div>
      <div>{datagrid}</div>
    </div>
  );
}

export default function ChannelContentLayout({
  title,
  filter,
  datagrid,
}: FrameProps) {
  return (
    <>
      <Header />
      <Frame title={title} filter={filter} datagrid={datagrid} />
    </>
  );
}
