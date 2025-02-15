"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ルーティング用
import Header from "../components/header";

export default function Group() {
  const [groupTitle, setGroupTitle] = useState(""); // グループ名の入力
  const [name, setName] = useState(""); // 名前の入力
  const [names, setNames] = useState([]); // 名前リスト
  const router = useRouter();

  // 名前を追加
  const addName = () => {
    if (name.trim() === "") return;
    setNames([...names, name]);
    setName("");
  };

  // 名前を削除
  const removeName = (index) => {
    setNames(names.filter((_, i) => i !== index));
  };

  // グループ作成
  const createGroup = async () => {
    if (groupTitle.trim() === "" || names.length === 0) {
      alert("グループ名とメンバーを入力してください");
      return;
    }

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: groupTitle, members: names }),
      });

      if (!response.ok) {
        throw new Error("グループ作成に失敗しました");
      }

      const data = await response.json();
      router.push(`/group/${data.groupid}`);
    } catch (error) {
      console.error("Error:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="bg-gray-300">
      <Header />
      <div className="flex justify-center w-screen h-screen">
        <div className="flex flex-col items-center space-y-4 w-screen h-screen">
          <p className="mt-20 text-xl text-black">旅行のタイトル</p>
          <input
            className="border p-2 w-1/2 rounded"
            placeholder="タイトルを入力"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
          />

          <p className="mt-10 text-xl text-black">名前の追加</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-1/2 mb-2 rounded"
            placeholder="名前を入力"
          />

          <button
            onClick={addName}
            className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 hover:bg-blue-600 transition"
          >
            追加
          </button>

          <ul className="mt-4 w-1/4 text-center">
            {names.map((n, index) => (
              <li key={index} className="flex items-center justify-between p-2 bg-white border-b">
                <span className="mx-auto text-black">{n}</span>
                <button
                  onClick={() => removeName(index)}
                  className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={createGroup}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded w-1/2 hover:bg-green-600 transition"
          >
            グループを作成
          </button>
        </div>
      </div>
    </div>
  );
}
