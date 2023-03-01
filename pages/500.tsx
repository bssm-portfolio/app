import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";

export default function Page500() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-4.625rem)] flex flex-col items-center">
      <h1 className="text-[4rem] text-blue font-bold pt-44">500 Error</h1>
      <p className="pt-14">죄송합니다. 페이지를 찾을 수 없습니다.</p>
      <Button
        className="mt-24 py-3 px-32 rounded-full font-semibold"
        onClick={() => router.push("/")}
      >
        <span className="text-base">홈으로 이동</span>
      </Button>
    </div>
  );
}
