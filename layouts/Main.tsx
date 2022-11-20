import { ReactNode } from "react";
import { Header } from "@/components";

export default function MainLayout({ app }: { app: ReactNode }) {
  return (
    <>
      <Header />
      <div className="m-6">{app}</div>
    </>
  );
}
