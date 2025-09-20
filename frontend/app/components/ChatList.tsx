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

const bgColors = ['#FDE68A', '#FCA5A5', '#FBBF24', '#F59E0B', '#EAB308'];

const ChatList: FC<ChatListProps> = ({ messages }) => {
  return (
    <div className="h-full overflow-y-auto p-4 bg-orange-300 backdrop-blur-sm">
      <h2 className="text-lg font-bold mb-2 text-orange-800 text-center">過去の投稿</h2>
      <ul className="space-y-2 max-w-full">
        {messages.map((msg) => {
          const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
          return (
            <li
              key={msg.id}
              className="p-2 rounded-2xl shadow-md transition hover:scale-105 break-words"
              style={{ backgroundColor: bgColor }}
            >
              <div className="text-sm font-semibold text-orange-900">{msg.user.nickname}</div>
              <div className="text-base text-orange-900">{msg.content}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
