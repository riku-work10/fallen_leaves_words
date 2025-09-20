'use client'
import { useEffect, useState } from 'react';
import MessageForm from './components/MessageForm';
import FallingLeaves from './components/FallingLeaves';
import NicknamePopup from './components/NicknamePopup';
import ChatList from './components/ChatList';
import { AnimatePresence, motion } from 'framer-motion'; // フェード用

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
  const [showIntro, setShowIntro] = useState(true);

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
      setShowIntro(false);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <AnimatePresence mode="wait">
      {/* ニックネーム未登録 & イントロ表示 */}
      {!userId && showIntro && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-orange-100 via-yellow-200 to-orange-300"
        >
          <FallingLeaves messages={[]} />
          <div className="relative z-10 text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-8 px-4">
            🍂 落ち葉の世界へようこそ 🍂
            <p className="mt-2 text-base md:text-lg font-normal">
              もともとわふわ落ちる葉っぱを眺めながら、まずはニックネームを入力してね
              <br />
              そんな感じでできたアプリです
            </p>
          </div>
          <button
            onClick={() => setShowIntro(false)}
            className="relative z-10 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            はじめる
          </button>
        </motion.div>
      )}

      {/* ニックネーム未登録 */}
      {!userId && !showIntro && (
        <motion.div
          key="nickname"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-orange-100 via-yellow-200 to-orange-300"
        >
          <NicknamePopup
            onSave={(id, name) => {
              setUserId(id);
              setNickname(name);
            }}
          />
        </motion.div>
      )}

      {/* ログイン済み表示 */}
      {userId && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex h-screen"
        >
          <div
            className="flex-1 flex flex-col items-center justify-start p-4 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://d2o4rrq92x9csx.cloudfront.net/articles/zelkova-tree-illustration_11-1-29-6.webp')`,
            }}
          >
            <h1 className="text-3xl font-bold text-orange-400 mb-4 text-center drop-shadow-lg">
              みんなの落ち葉
            </h1>
            <div className="flex-1 w-full relative">
              <FallingLeaves messages={messages} />
            </div>
          </div>

          <div className="w-1/4 border-l flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <ChatList messages={messages} />
            </div>
            <div className="p-2 border-t bg-amber-400">
              <MessageForm onSubmit={fetchMessages} userId={userId} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
