"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";

export default function GroupPage() {
  const { groupid } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`/api/groups/${groupid}`);
        if (!response.ok) throw new Error("グループ情報の取得に失敗しました");
        const data = await response.json();
        setGroup(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "グループの共有",
          text: "このグループの割り勘ページを共有します。",
          url: currentUrl,
        })
        .catch((error) => console.error("共有に失敗しました", error));
    } else {
      handleCopy();
    }
  };

  if (loading) return <p className="text-center mt-10">読み込み中...</p>;
  if (!group) return <p className="text-center mt-10">グループが見つかりません</p>;

  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col items-center space-y-6 w-screen h-screen mt-10">
          <h1 className="text-2xl font-bold text-black">{group.name}</h1>
          <h2 className="text-xl text-black">メンバー</h2>
          <ul className="bg-white p-4 rounded shadow w-1/2">
            {group.members.map((member) => (
              <li key={member.id} className="p-2 border-b last:border-none text-black">
                {member.name}
              </li>
            ))}
          </ul>

          <h2 className="text-xl text-black mt-6">精算すべき金額</h2>
          {group.logs.length > 0 ? (
            group.logs.map((log) => (
              <div key={log.id} className="p-4 bg-white rounded shadow w-1/2 mb-4">
                <p>{log.payer.name} が {log.amount} 円を支払いました</p>
                <ul>
                  {log.participants.map((participant) => {
                    const participantName = group.members.find(
                      (member) => member.id === participant.participantId
                    )?.name; // オプショナルチェイニングを使用
                    return participantName ? (
                      <li key={participant.participantId} className="text-black">
                        {participantName} → {log.payer.name} に {participant.amount} 円支払い
                      </li>
                    ) : null; // 名前がない場合は表示しない
                  })}
                </ul>
              </div>
            ))
          ) : (
            <p>支払い記録はありません。</p>
          )}

          <Link href={`/group/${groupid}/split`}>
            <button className="outline-none disabled:opacity-50 border bg-white text-black font-bold py-4 text-base rounded-full w-48">
              割り勘を追加する
            </button>
          </Link>

          {/* URLコピー・共有ボタン */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleCopy}
              className="bg-blue-500 text-white px-4 py-2 rounded w-36 hover:bg-blue-600 transition"
            >
              {copied ? "コピーしました！" : "URLをコピー"}
            </button>

            <button
              onClick={handleShare}
              className="bg-green-500 text-white px-4 py-2 rounded w-36 hover:bg-green-600 transition"
            >
              共有
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
