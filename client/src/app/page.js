import Image from "next/image";
import Header from "./components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[url('/background.jpg')] bg-cover bg-center flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-between w-screen h-full">
        <div></div>
        <p className="text-7xl text-black mt-20 animate-pulse">
          ようこそ！さあ、始めましょう。
        </p>
        <Link href={"/group"} className="text-white text-2xl font-bold">
          <button className="outline-none disabled:opacity-50 border bg-white text-black font-bold py-12 text-3xl rounded-full w-96 mb-40">
            はじめる
          </button>
        </Link>
      </div>
    </div>
  );
}
