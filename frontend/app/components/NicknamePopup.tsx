'use client'
import { useState } from 'react';

type NicknamePopupProps = {
  onSave: (userId: number, nickname: string) => void;
};

const bgColors = ['#FDE68A', '#FCA5A5', '#FBBF24', '#F59E0B', '#EAB308'];

export default function NicknamePopup({ onSave }: NicknamePopupProps) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });

    const data = await res.json();
    localStorage.setItem('userId', data.id);
    localStorage.setItem('nickname', data.nickname);

    onSave(data.id, data.nickname);
  };

  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-200 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-lg flex flex-col gap-4"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="text-xl font-bold text-orange-900">ニックネームを入力してください</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 rounded-full shadow-md text-orange-900 placeholder:text-orange-400"
          placeholder="ニックネーム"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 shadow-md"
        >
          登録
        </button>
      </form>
    </div>
  );
}
