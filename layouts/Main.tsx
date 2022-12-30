import { ReactNode } from "react";
import { Header } from "@/components";

export default function MainLayout({ app }: { app: ReactNode }) {
  return (
    <>
      <Header />
      <div className="w-full flex justify-center">
        <div className="m-6 w-70">{app}</div>
      </div>
    </>
  );
}
