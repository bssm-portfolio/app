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
  title: "BSSM Portfolio",
  description: "부산소프트웨어마이스터고 포트폴리오",
  canonical: config.clientUrl,
  themeColor: "#3E73FB",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: config.clientUrl,
    title: "BSSM Portfolio",
    site_name: "BSSM Portfolio",
    images: [
      {
        url: "/assets/images/defaultThumbnail.png",
        width: 320,
        height: 160,
        alt: "BSSM Portfolio",
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
