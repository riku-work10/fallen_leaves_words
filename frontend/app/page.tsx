'use client'
import { useEffect, useState } from 'react';
import MessageForm from './components/MessageForm';
import FallingLeaves from './components/FallingLeaves';

type Message = {
  id: number;
  content: string;
  createdAt: string;
  user: { id: number; nickname: string };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">みんなの落ち葉</h1>
      <MessageForm onSubmit={fetchMessages} />
      <FallingLeaves messages={messages} />
    </div>
  );
}
