"use client";
import { useState } from "react";
import Header from "../../../components/header";

export default function Split() {
  const groups = [
    { id: 1, name: "Aさん" },
    { id: 2, name: "Bさん" },
    { id: 3, name: "Cさん" },
  ];

  // 各グループの金額を state で管理
  const [amounts, setAmounts] = useState({ 1: 0, 2: 0, 3: 0 });
  const [ratios, setRatios] = useState({ 1: 1, 2: 1, 3: 1 }); // 比率の初期値を1:1:1に設定
  const [manualTotal, setManualTotal] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null); // 立て替えた人
  const [activeTab, setActiveTab] = useState(1); // タブの切り替え

  // 各グループの金額を比率に基づいて計算
  const totalRatio = Object.values(ratios).reduce(
    (sum, ratio) => sum + ratio,
    0
  );

  // 金額の割り当て処理、余りが出ないように調整
  const calculateAmounts = () => {
    let remainingAmount = manualTotal; // 残りの金額
    const totalRatio = Object.values(ratios).reduce(
      (sum, ratio) => sum + ratio,
      0
    ); // 合計比率
    const amounts = {};

    // 比率に基づいて金額を計算
    for (let id in ratios) {
      const calculatedAmount = (ratios[id] / totalRatio) * manualTotal;
      amounts[id] = Math.floor(calculatedAmount); // 小数点以下を切り捨て
      remainingAmount -= amounts[id]; // 余りを減らしていく
    }

    // 余りが残っていれば、最初の人にその分を足す
    if (remainingAmount > 0) {
      amounts[1] += remainingAmount;
    }

    return amounts;
  };

  const amountsCalculated = calculateAmounts();

  const handleAmountChange = (id, value) => {
    const parsedValue = value ? parseInt(value, 10) || 0 : 0;
    setAmounts((prev) => ({
      ...prev,
      [id]: parsedValue,
    }));
  };

  const handleTotalChange = (value) => {
    setManualTotal(value ? parseInt(value, 10) || 0 : 0);
  };

  // 色の判定
  const totalAmountInput = Object.values(amountsCalculated).reduce(
    (sum, amount) => sum + amount,
    0
  );
  const remainingColor =
    totalAmountInput < manualTotal
      ? "text-red-500"
      : totalAmountInput === manualTotal
      ? "text-black"
      : "text-blue-500";

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <p className="text-xl text-center font-bold mb-6">
              金額を分けましょう
            </p>

            {/* タブの切り替え */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setActiveTab(1)}
                className={`px-4 py-2 mr-2 rounded-tl-lg rounded-tr-lg w-32 ${
                  activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                比率で入力
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`px-4 py-2 rounded-bl-lg rounded-br-lg w-32 ${
                  activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                金額で入力
              </button>
            </div>

            {/* 比率で入力するタブ */}
            {activeTab === 1 && (
              <>
                <p className="mb-4">立て替えた人</p>
                <select
                  value={selectedPerson || ""}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6"
                >
                  <option value="">選択してください</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>

                <p className="mb-4">総計</p>
                <input
                  type="number"
                  value={manualTotal || ""}
                  onChange={(e) => handleTotalChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6"
                />

                <ul className="mb-6">
                  {groups.map((group) => (
                    <li
                      key={group.id}
                      className="flex items-center justify-between mb-4"
                    >
                      <span>{group.name}</span>
                      <input
                        type="number"
                        value={ratios[group.id] || 1}
                        onChange={(e) =>
                          handleAmountChange(group.id, e.target.value)
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      />
                      <span>比率</span>
                    </li>
                  ))}
                </ul>

                {/* 各グループの金額計算 */}
                <ul>
                  {groups.map((group) => (
                    <li
                      key={group.id}
                      className="flex items-center justify-between"
                    >
                      <span>{group.name}</span>
                      <span>{amountsCalculated[group.id]} 円</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* 金額で入力するタブ */}
            {activeTab === 2 && (
              <>
                <p className="mb-4">立て替えた人</p>
                <select
                  value={selectedPerson || ""}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6"
                >
                  <option value="">選択してください</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>

                <p className="mb-4">総計</p>
                <input
                  type="number"
                  value={manualTotal || ""}
                  onChange={(e) => handleTotalChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6"
                />

                <ul className="mb-6">
                  {groups.map((group) => (
                    <li
                      key={group.id}
                      className="flex items-center justify-between mb-4"
                    >
                      <span>{group.name}</span>
                      <input
                        type="number"
                        value={amounts[group.id] || ""}
                        onChange={(e) =>
                          handleAmountChange(group.id, e.target.value)
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      />
                      <span>金額</span>
                    </li>
                  ))}
                </ul>

                {/* 合計金額と差分 */}
                <p className={`text-lg font-bold ${remainingColor}`}>
                  合計金額: {totalAmountInput} 円
                </p>
                <p className={`text-lg font-bold ${remainingColor}`}>
                  総計との差: {manualTotal - totalAmountInput} 円
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function GroupLog({ params }) {
//   const { groupid } = params;
//   const router = useRouter();
//   const [members, setMembers] = useState([]);
//   const [payerId, setPayerId] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [participants, setParticipants] = useState({});

//   useEffect(() => {
//     async function fetchGroup() {
//       try {
//         const res = await fetch(`/api/group/${groupid}`);
//         if (!res.ok) throw new Error("グループ情報の取得に失敗しました");
//         const data = await res.json();
//         setMembers(data.members);
//         // 初期化
//         const initialParticipants = data.members.reduce((acc, member) => {
//           acc[member.id] = 1.0 / data.members.length; // 均等割り
//           return acc;
//         }, {});
//         setParticipants(initialParticipants);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchGroup();
//   }, [groupid]);

//   async function handleSubmit() {
//     if (!payerId || !amount) {
//       alert("支払者と金額を入力してください");
//       return;
//     }

//     try {
//       const res = await fetch(`/api/group/${groupid}/log`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           payerId,
//           amount: parseInt(amount, 10),
//           participants: Object.entries(participants).map(([memberId, share]) => ({
//             memberId: parseInt(memberId, 10),
//             share: parseFloat(share),
//           })),
//         }),
//       });

//       if (!res.ok) throw new Error("ログ追加に失敗しました");

//       alert("ログが追加されました");
//       router.refresh();
//     } catch (error) {
//       console.error(error);
//       alert("エラーが発生しました");
//     }
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">グループログの追加</h1>

//       {/* 支払者選択 */}
//       <label className="block mt-4">支払者:</label>
//       <select
//         className="border p-2 w-full"
//         value={payerId || ""}
//         onChange={(e) => setPayerId(Number(e.target.value))}
//       >
//         <option value="">選択してください</option>
//         {members.map((member) => (
//           <option key={member.id} value={member.id}>
//             {member.name}
//           </option>
//         ))}
//       </select>

//       {/* 金額入力 */}
//       <label className="block mt-4">金額:</label>
//       <input
//         type="number"
//         className="border p-2 w-full"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       {/* 参加者の負担割合設定 */}
//       <label className="block mt-4">負担割合:</label>
//       {members.map((member) => (
//         <div key={member.id} className="flex items-center mt-2">
//           <span className="w-24">{member.name}</span>
//           <input
//             type="number"
//             className="border p-1 w-20"
//             step="0.01"
//             min="0"
//             max="1"
//             value={participants[member.id] || 0}
//             onChange={(e) => {
//               setParticipants((prev) => ({
//                 ...prev,
//                 [member.id]: parseFloat(e.target.value),
//               }));
//             }}
//           />
//         </div>
//       ))}

//       {/* 追加ボタン */}
//       <button
//         className="mt-4 bg-blue-500 text-white p-2 w-full"
//         onClick={handleSubmit}
//       >
//         決定
//       </button>
//     </div>
//   );
// }
