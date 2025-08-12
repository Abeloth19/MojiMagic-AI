"use client";
import CopyButton from "./CopyButton";

interface EmojiOutputProps {
  result: {
    emojis: string;
    emotions: Record<string, number>;
  };
}

export default function EmojiOutput({ result }: EmojiOutputProps) {
  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <div className="text-center space-y-4">
        <div className="text-6xl tracking-wider">{result.emojis}</div>

        <CopyButton text={result.emojis} />

        <div className="text-white/60 text-sm">
          <p className="mb-2">Detected emotions:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(result.emotions).map(([emotion, score]) => (
              <span
                key={emotion}
                className="bg-white/10 px-3 py-1 rounded-full"
              >
                {emotion}: {Math.round(score * 100)}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
