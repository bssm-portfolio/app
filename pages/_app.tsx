import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Modal from "@/components/common/Modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <Modal />
    </RecoilRoot>
  );
}
