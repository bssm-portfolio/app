import ProfileDetail from "@/components/profile/Detail";
import { MainLayout } from "@/layouts";
import Head from "next/head";

export default function ProfileDetailPage() {
  return (
    <div>
      <Head>
        <title>BSSM SH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout app={<ProfileDetail />} />
    </div>
  );
}