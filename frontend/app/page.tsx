'use client'
import { useEffect, useState } from 'react';
import MessageForm from './components/MessageForm';
import FallingLeaves from './components/FallingLeaves';
import NicknamePopup from './components/NicknamePopup';
import ChatList from './components/ChatList';

type Message = {
  id: number;
  content: string;
  createdAt: string;
  user: { id: number; nickname: string };
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const savedUserId = localStorage.getItem('userId');
    const savedNickname = localStorage.getItem('nickname');
    if (savedUserId && savedNickname) {
      setUserId(Number(savedUserId));
      setNickname(savedNickname);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <div className="flex h-screen">
      {!userId ? (
        <NicknamePopup
          onSave={(id, name) => {
            setUserId(id);
            setNickname(name);
          }}
        />
      ) : (
        <>
          {/* 左側: 投稿と落ち葉 */}
          <div className="flex-1 flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">みんなの落ち葉</h1>
            <MessageForm onSubmit={fetchMessages} userId={userId} />
            <div className="flex-1 relative">
              <FallingLeaves messages={messages} />
            </div>
          </div>

          {/* 右側: 過去の投稿チャット */}
          <div className="w-1/5 border-l">
            <ChatList messages={messages} />
          </div>
        </>
      )}
    </div>
  );
}
