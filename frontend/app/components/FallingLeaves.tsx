'use client'
import { useEffect, useState } from 'react';

type Leaf = {
  id: number;
  content: string;
}

export default function FallingLeaves({ messages }: { messages: Leaf[] }) {
  const [fallingLeaves, setFallingLeaves] = useState<Leaf[]>([]);
  const [stackedLeaves, setStackedLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // 新しいメッセージだけを落下させる
    const newLeaves = messages.filter(
      msg => !stackedLeaves.find(leaf => leaf.id === msg.id)
    );

    setFallingLeaves(newLeaves);
  }, [messages, stackedLeaves]);

  const handleAnimationEnd = (leaf: Leaf) => {
    // 落下が終わったら積もらせる
    setStackedLeaves(prev => [...prev, leaf]);
    setFallingLeaves(prev => prev.filter(l => l.id !== leaf.id));
  };

  return (
    <div className="relative h-96 w-full overflow-hidden border bg-green-50">
      {/* 落ちる葉 */}
      {fallingLeaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute animate-fall text-orange-500 font-bold"
          style={{ left: `${Math.random() * 90}%`, top: `-${Math.random() * 10}rem` }}
          onAnimationEnd={() => handleAnimationEnd(leaf)}
        >
          {leaf.content}
        </div>
      ))}

      {/* 積もった葉 */}
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
