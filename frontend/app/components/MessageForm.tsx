'use client'
import { useState } from 'react';

export default function MessageForm({ onSubmit }: { onSubmit: () => void }) {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // まずユーザー作成
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });
    const user = await userRes.json();

    // メッセージ作成
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, content }),
    });

    setContent('');
    onSubmit(); // メッセージ再取得
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        placeholder="ニックネーム"
        className="border p-2 rounded"
        required
        maxLength={20}
      />
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="落ち葉メッセージ"
        className="border p-2 rounded"
        required
        maxLength={20}
      />
      <button type="submit" className="bg-yellow-400 p-2 rounded hover:bg-yellow-500">
        投稿
      </button>
    </form>
  )
}
