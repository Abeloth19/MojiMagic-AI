"use client";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200 text-sm font-medium"
    >
      {copied ? "Copied! ✓" : "Copy Emojis 📋"}
    </button>
  );
}
