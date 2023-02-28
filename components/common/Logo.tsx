import config from "@/config";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="text-xl cursor-pointer">
      <Image
        src={config.defaultLogo}
        width={240}
        height={40}
        alt="BSSM LOGO"
        priority
        sizes="15rem"
      />
    </div>
  );
}
