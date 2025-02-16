"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../components/header";

export default function Split() {
  const { groupid } = useParams(); // URLのgroupidを取得
  const router = useRouter();

  const [members, setMembers] = useState([]);
  const [manualTotal, setManualTotal] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [group, setGroup] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 追加: 二重送信防止

  // グループの情報とメンバーを取得する
  useEffect(() => {
    const fetchGroupData = async () => {
      const res = await fetch(`/api/groups/${groupid}`);
      if (res.ok) {
        const groupData = await res.json();
        setGroup(groupData);
        setMembers(groupData.members);
      }
    };
    fetchGroupData();
  }, [groupid]);

  // 支払いデータをサーバーに送信
  const submitLog = async () => {
    if (!selectedPerson || manualTotal <= 0 || !group) return;

    setIsSubmitting(true); // ボタンを無効化

    const res = await fetch(`/api/groups/${group.id}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payerId: parseInt(selectedPerson, 10),
        amount: manualTotal,
        groupid: group.id,
      }),
    });

    if (res.ok) {
      router.push(`/group/${groupid}`); // 成功時にページ遷移
    } else {
      const errorText = await res.text();
      console.error("エラー:", errorText);
    }

    setIsSubmitting(false); // 再度ボタンを押せるように
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <p className="text-xl text-center font-bold mb-6">金額を分けましょう</p>

            <p className="mb-4">立て替えた人</p>
            <select
              value={selectedPerson || ""}
              onChange={(e) => setSelectedPerson(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6"
            >
              <option value="">選択してください</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>

            <p className="mb-4">総計</p>
            <input
              type="number"
              value={manualTotal || ""}
              onChange={(e) => setManualTotal(parseInt(e.target.value, 10) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6"
            />

            <button
              onClick={submitLog}
              disabled={isSubmitting} // 追加: 送信中は無効化
              className={`w-full px-4 py-2 rounded-md text-white ${
                isSubmitting ? "bg-gray-400" : "bg-blue-500"
              }`}
            >
              {isSubmitting ? "処理中..." : "割り勘を記録"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
