'use client'
import { useEffect, useState } from 'react';

type Leaf = {
  id: number;
  content: string;
};

export default function FallingLeaves({ messages }: { messages: Leaf[] }) {
  const [fallingLeaves, setFallingLeaves] = useState<Leaf[]>([]);
  const [stackedLeaves, setStackedLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // 新しい葉っぱだけを落下させる
    const newLeaves = messages.filter(
      msg => !stackedLeaves.find(leaf => leaf.id === msg.id) &&
             !fallingLeaves.find(leaf => leaf.id === msg.id)
    );

    if (newLeaves.length > 0) {
      setFallingLeaves(prev => [...prev, ...newLeaves]);
    }
  }, [messages, stackedLeaves, fallingLeaves]);

  const handleAnimationEnd = (leaf: Leaf) => {
    setStackedLeaves(prev => [...prev, leaf]);
    setFallingLeaves(prev => prev.filter(l => l.id !== leaf.id));
  };

  return (
    <div className="relative h-96 w-full overflow-hidden border bg-green-50">
      {/* 落ちる葉っぱ */}
{fallingLeaves.map(leaf => {
  const duration = Math.random() * 2 + 5; // 5〜7秒に変更（以前は3〜5秒）
  return (
    <div
      key={leaf.id}
      className="absolute text-orange-500 font-bold animate-flutter"
      style={{
        left: `${Math.random() * 90}%`,
        top: `-${Math.random() * 10}rem`,
        animationDuration: `${duration}s`
      }}
      onAnimationEnd={() => handleAnimationEnd(leaf)}
    >
      {leaf.content}
    </div>
  )
})}


      {/* 積もった葉っぱ */}
      <div className="absolute bottom-0 w-full flex flex-wrap justify-start gap-1 p-1">
        {stackedLeaves.map(leaf => (
          <span key={leaf.id} className="text-orange-500 font-bold">
            {leaf.content}
          </span>
        ))}
      </div>
    </div>
  )
}
