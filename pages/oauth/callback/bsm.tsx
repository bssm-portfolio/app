import { AUTH_TOKEN } from "@/config/const";
import { useOauth } from "@/models/oauth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Bsm() {
  const router = useRouter();
  const [authCode, setAuthCode] = useState("");
  const { token } = useOauth("bsm", authCode);

  useEffect(() => {
    setAuthCode(router.query.code as string);
  }, [router.query]);

  useEffect(() => {
    if (token !== "") {
      localStorage.setItem(AUTH_TOKEN, token);
      router.push("/");
    }
  }, [token, router]);

  return <div />;
}
