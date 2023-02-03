import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Google() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query);
  }, [router.query]);
  return <div>구글</div>;
}
