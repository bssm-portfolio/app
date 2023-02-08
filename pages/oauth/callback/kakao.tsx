import { useOauth } from "@/models/oauth";
import { Storage } from "@/models/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Kakao() {
  const router = useRouter();
  const [authCode, setAuthCode] = useState("");
  const { token } = useOauth("kakao", authCode);

  useEffect(() => {
    setAuthCode(router.query.code as string);
  }, [router.query]);

  useEffect(() => {
    if (token !== "") {
      Storage.setItem("ACCESS_TOKEN", token);
      router.push("/");
    }
  }, [token, router]);

  return <div />;
}
