import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";

export default function Page500() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-4.625rem)] flex flex-col items-center">
      <h1 className="text-[3rem] text-blue font-bold pt-44">
        비공개 포트폴리오입니다.
      </h1>
      <Button
        className="mt-24 !py-3 !px-32 rounded-full font-semibold"
        onClick={() => router.push("/")}
      >
        <span className="text-base">홈으로 이동</span>
      </Button>
    </div>
  );
}
