import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-4.625rem)] flex flex-col items-center">
      <h1 className="text-[4rem] text-blue font-bold pt-44">404 Error</h1>
      <h1 className="text-[3.25rem] mt-3 text-blue font-bold">
        PAGE NOT FOUND
      </h1>
      <p className="pt-14">죄송합니다. 페이지를 찾을 수 없습니다.</p>
      <p>이 페이지는 삭제되었거나 URL이 변경되었을 수 있습니다.</p>
      <Button
        className="mt-24 py-3 px-32 rounded-full font-semibold"
        onClick={() => router.push("/")}
      >
        <span className="text-base">홈으로 이동</span>
      </Button>
    </div>
  );
}
