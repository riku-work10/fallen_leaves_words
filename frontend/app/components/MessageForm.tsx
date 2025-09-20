'use client'
import { useState } from 'react';

type MessageFormProps = {
  onSubmit: () => void;
  userId: number;
};

export default function MessageForm({ onSubmit, userId }: MessageFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, userId }),
    });

    setContent('');
    onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IME変換中はEnterで送信させない
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="mb-4 flex gap-2 w-full"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={20}
        className="border p-2 rounded-2xl flex-1 text-orange-900 placeholder:text-white shadow-md break-words w-full"
        placeholder="言葉を入力..."
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-2xl hover:bg-orange-600 shadow-md"
      >
        投稿
      </button>
    </form>
  );
}
