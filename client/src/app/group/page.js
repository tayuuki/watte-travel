"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="bg-gray-200">
      <Header />
      <div className="flex justify-center w-screen h-screen">
        <div className="flex flex-col items-center space-y-6 w-96 py-8 px-4 bg-white rounded-lg shadow-xl">
          <p className="text-2xl text-gray-800">旅行のタイトル</p>
          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="タイトルを入力"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
          />

          <p className="text-xl text-gray-800 mt-6">名前の追加</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="名前を入力"
          />

          <button
            onClick={addName}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            追加
          </button>

          <ul className="mt-4 w-full text-center space-y-3">
            {names.map((n, index) => (
              <li key={index} className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg shadow-md">
                <span className="text-gray-800">{n}</span>
                <button
                  onClick={() => removeName(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={createGroup}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition duration-300"
          >
            グループを作成
          </button>
        </div>
      </div>
    </div>
  );
}
