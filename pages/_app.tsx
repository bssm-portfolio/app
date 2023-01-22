import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Modal from "@/components/common/Modal";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "@/config";
import Popup from "@/components/common/Popup";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        {config.nodeEnv === "development" ? <ReactQueryDevtools /> : null}
        <Component {...pageProps} />
        <Modal />
        <Popup />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
