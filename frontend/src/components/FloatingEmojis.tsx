"use client";
import { useState, useEffect } from "react";

const emojis = ["✨", "🎭", "😊", "🎉", "💫", "🌟", "🎈", "🦄", "🌈", "💖"];

export default function FloatingEmojis() {
  const [emojiPositions, setEmojiPositions] = useState<
    Array<{
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);

  useEffect(() => {
   
    const positions = emojis.map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }));
    setEmojiPositions(positions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className={`absolute text-2xl opacity-30 animate-float`}
          style={emojiPositions[index] || {}}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
