import Button from "@/components/atoms/Button";

export default function Page500() {
  return (
    <div className="min-h-[calc(100vh-4.625rem)] pl-36">
      <h1 className="text-[4rem] text-blue font-bold pt-44 ">500 Error</h1>
      <Button className="text-3xl mt-24 py-3 px-28 rounded-full font-semibold">
        홈으로 가기
      </Button>
    </div>
  );
}
