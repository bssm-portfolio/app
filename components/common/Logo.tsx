import Image from "next/image";

export default function Logo() {
  return (
    <div className="text-xl cursor-pointer">
      <Image
        src="/assets/images/logo.png"
        width={240}
        height={40}
        alt="BSSM LOGO"
      />
    </div>
  );
}
