import Image from "next/image";
import Header from "./components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[url('/background.jpg')] bg-cover bg-center flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-between w-screen h-full">
        <div></div>
        <p className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 mt-20 animate-pulse font-extrabold tracking-wide shadow-md">
          ようこそ！さあ、始めましょう。
        </p>
        <Link href={"/group"} className="text-white text-2xl font-bold">
          <button className="transition-transform transform hover:scale-105 outline-none disabled:opacity-50 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-4 px-8 text-3xl rounded-full w-96 mb-40 shadow-lg hover:shadow-2xl">
            はじめる
          </button>
        </Link>
      </div>
    </div>
  );
}
