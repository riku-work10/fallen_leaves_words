'use client'
import { useState } from 'react';

type MessageFormProps = {
  onSubmit: () => void;
  userId: number;
};

export default function MessageForm({ onSubmit, userId }: MessageFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, userId }),
    });

    setContent('');
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={20}
        className="border p-2 rounded w-full"
        placeholder="言葉を入力..."
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded mt-2 hover:bg-orange-600"
      >
        投稿
      </button>
    </form>
  );
}
