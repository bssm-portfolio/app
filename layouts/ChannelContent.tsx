import { Header } from "@/components";
import { ReactNode } from "react";

interface FrameProps {
  title: ReactNode;
  datagrid: ReactNode;
}

function Frame({ title, datagrid }: FrameProps) {
  return (
    <div className="px-[8.25rem] pt-10">
      <div>{title}</div>
      <div>{datagrid}</div>
    </div>
  );
}

export default function ChannelContentLayout({ title, datagrid }: FrameProps) {
  return (
    <>
      <Header />
      <Frame title={title} datagrid={datagrid} />
    </>
  );
}
