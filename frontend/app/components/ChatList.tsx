'use client'
import type { FC } from 'react';

type Message = {
  id: number;
  content: string;
  createdAt: string;
  user: { id: number; nickname: string };
};

type ChatListProps = {
  messages: Message[];
};

const ChatList: FC<ChatListProps> = ({ messages }) => {
  return (
    <div className="h-full overflow-y-auto border-l p-4 bg-white/70 backdrop-blur-sm">
      <h2 className="text-lg font-bold mb-2">過去の投稿</h2>
      <ul className="space-y-2">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className="p-2 rounded-lg shadow-sm bg-orange-100 hover:bg-orange-200 transition"
          >
            <div className="text-sm text-black">{msg.user.nickname}</div>
            <div className="text-base">{msg.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
