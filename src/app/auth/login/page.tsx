import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex  justify-center items-center h-screen">
      <div>
        <Image
          src="/images/login.svg"
          width={300}
          height={300}
          alt="illustration"
        />
      </div>
      <div>sss</div>
    </div>
  );
}
