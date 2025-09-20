'use client'
import { useEffect, useState } from 'react';

type Leaf = {
  id: number;
  content: string;
}

export default function FallingLeaves({ messages }: { messages: Leaf[] }) {
  const [fallingLeaves, setFallingLeaves] = useState<Leaf[]>([]);
  const [stackedLeaves, setStackedLeaves] = useState<Leaf[]>([]);
  const [clickedLeaf, setClickedLeaf] = useState<number | null>(null);

  const icons = ['🍂', '🍁', '🌰', '🍄', '🎃', '🦉', '🍎', '🧡', '🌾', '🥮'];
  const bgColors = ['#FDE68A', '#FCA5A5', '#FBBF24', '#F59E0B', '#EAB308'];

  useEffect(() => {
    const newLeaves = messages.filter(
      msg => !stackedLeaves.find(leaf => leaf.id === msg.id)
    );
    setFallingLeaves(newLeaves);
  }, [messages, stackedLeaves]);

  const handleAnimationEnd = (leaf: Leaf) => {
    setStackedLeaves(prev => [...prev, leaf]);
    setFallingLeaves(prev => prev.filter(l => l.id !== leaf.id));
  };

  const handleClick = (id: number) => {
    setClickedLeaf(id);
    setTimeout(() => setClickedLeaf(null), 500); // 0.5秒で戻す
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 落ちる葉 */}
      {fallingLeaves.map(leaf => {
        const duration = Math.random() * 5 + 8; // 8〜13秒
        const delay = Math.random() * 3;        // 0〜3秒
        const icon = icons[Math.floor(Math.random() * icons.length)];
        const rotate = Math.random() * 30 - 15; // -15〜15度
        const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

        return (
          <div
            key={leaf.id}
            className="absolute animate-flutter"
            style={{
              left: `${Math.random() * 90}%`,
              top: `-${Math.random() * 10}rem`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              transform: `rotate(${rotate}deg)`
            }}
            onAnimationEnd={() => handleAnimationEnd(leaf)}
          >
            <div
              className="text-orange-800 px-3 py-1 rounded-full shadow-md inline-block text-sm font-semibold"
              style={{ backgroundColor: bgColor }}
            >
              {icon} {leaf.content}
            </div>
          </div>
        )
      })}

      {/* 積もった葉 */}
      <div className="absolute bottom-0 w-full flex flex-wrap justify-start gap-1 p-1">
        {stackedLeaves.map(leaf => {
          const icon = icons[Math.floor(Math.random() * icons.length)];
          const rotate = Math.random() * 20 - 10;
          const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
          const isClicked = clickedLeaf === leaf.id;

          return (
            <div
              key={leaf.id}
              className={`text-orange-800 px-3 py-1 rounded-full shadow-md inline-block text-sm font-semibold
                transition-transform duration-300
                hover:scale-110 hover:-translate-y-1
                ${isClicked ? 'animate-bounce-leaf' : ''}`}
              style={{
                transform: `rotate(${rotate}deg)`,
                backgroundColor: bgColor
              }}
              onClick={() => handleClick(leaf.id)}
            >
              {icon} {leaf.content}
            </div>
          )
        })}
      </div>

      {/* CSSアニメーション */}
      <style jsx>{`
        @keyframes bounceLeaf {
          0% { transform: translateY(0); }
          25% { transform: translateY(-10px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        .animate-bounce-leaf {
          animation: bounceLeaf 0.5s ease;
        }
      `}</style>
    </div>
  )
}
