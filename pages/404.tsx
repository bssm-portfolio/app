import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-4.625rem)] pl-36">
      <h1 className="text-[4rem] text-blue font-bold pt-44 ">404 Error</h1>
      <h1 className="text-[3.25rem] mt-3 text-blue font-bold">
        PAGE NOT FOUND
      </h1>
      <Button
        className="text-3xl mt-24 py-3 px-28 rounded-full font-semibold"
        onClick={() => router.push("/")}
      >
        홈으로 가기
      </Button>
    </div>
  );
}
