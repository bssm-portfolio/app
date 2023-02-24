import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Modal from "@/components/common/Modal";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "@/config";
import { Header } from "@/components";
import Toast from "@/components/common/Toast";
import { DefaultSeo, DefaultSeoProps } from "next-seo";

const DEFAULT_SEO: DefaultSeoProps = {
  title: "meta head title에 들어가는 값",
  description: "meta head description에 들어가는 값",
  canonical: "https://www.carrotins.com",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "카카오톡, 페이스북에 링크 넣으면 연결되는 url",
    title: "카카오톡, 페이스북에 링크 넣으면 올라올 타이틀",
    site_name: "사이트이름",
    images: [
      {
        url: "카카오톡, 페이스북에에 링크 넣으면 올라올 이미지",
        width: 285,
        height: 167,
        alt: "이미지",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

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
      <DefaultSeo {...DEFAULT_SEO} />
      <QueryClientProvider client={client}>
        {config.nodeEnv === "development" && <ReactQueryDevtools />}
        <Header />
        <Component {...pageProps} />
        <Modal />
        <Toast />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
