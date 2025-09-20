'use client'
import { useState } from 'react';

type NicknamePopupProps = {
  onSave: (userId: number, nickname: string) => void;
};

export default function NicknamePopup({ onSave }: NicknamePopupProps) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    // バックエンドにユーザー登録リクエスト
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });

    const data = await res.json();
    // userId と nickname を保存
    localStorage.setItem('userId', data.id);
    localStorage.setItem('nickname', data.nickname);

    onSave(data.id, data.nickname);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">ニックネームを入力してください</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="ニックネーム"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          登録
        </button>
      </form>
    </div>
  );
}
