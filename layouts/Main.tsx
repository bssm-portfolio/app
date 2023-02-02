import { ReactNode } from "react";

export default function MainLayout({ app }: { app: ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div className="m-6 w-70">{app}</div>
    </div>
  );
}
