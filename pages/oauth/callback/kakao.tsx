import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Kakao() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query);
  }, [router.query]);
  return <div>카카오</div>;
}
