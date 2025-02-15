// メンバー追加のためのReactコンポーネント
"use client"
import { useState } from 'react'

const AddMember = ({ groupId }) => {
  const [name, setName] = useState('')
  const [money, setMoney] = useState(0)

  const handleAddMember = async () => {
    const res = await fetch(`/api/groups/${groupId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, money }),
    })

    const data = await res.json()
    console.log(data) // 追加されたメンバー情報
  }

  return (
    <div>
      <h2>メンバー追加</h2>
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="支払った金額"
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
      />
      <button onClick={handleAddMember}>メンバー追加</button>
    </div>
  )
}

export default AddMember
