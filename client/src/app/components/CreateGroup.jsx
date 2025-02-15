// グループ作成のためのReactコンポーネント
"use client"
import { useState } from 'react'

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('')
  const [groupId, setGroupId] = useState(null)

  const handleCreateGroup = async () => {
    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: groupName }),
    })

    const data = await res.json()
    setGroupId(data.groupid)
  }

  return (
    <div>
      <h1>グループ作成</h1>
      <input
        type="text"
        placeholder="グループ名"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreateGroup}>グループ作成</button>

      {groupId && (
        <div>
          <p>グループが作成されました！</p>
          <p>グループID: {groupId}</p>
        </div>
      )}
    </div>
  )
}

export default CreateGroup
