import { ReactNode } from "react";
import { Header, Navigator } from "@/components";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Navigator />
      <div className="m-6">{children}</div>
    </>
  );
}
