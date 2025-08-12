"use client";
import { useState } from "react";
import { analyzeText } from "@/lib/api";
import ExamplePrompts from "./ExamplePrompts";
import EmojiOutput from "./EmojiOutput";
import LoadingSpinner from "./LoadingSpinner";

export default function MainConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    emojis: string;
    emotions: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await analyzeText(text);
      setResult(response);
    } catch (err) {
      setError("Failed to analyze text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleText: string) => {
    setText(exampleText);
    setResult(null);
    setError("");
  };

  return (
    <section id="converter" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here and watch the magic happen..."
                className="w-full h-32 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-white/30 text-lg"
                maxLength={500}
              />
              <div className="text-right text-white/60 text-sm mt-2">
                {text.length}/500
              </div>
            </div>

            <ExamplePrompts onExampleClick={handleExampleClick} />

            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? <LoadingSpinner /> : "Convert to Emojis ✨"}
            </button>

            {error && (
              <div className="text-red-300 text-center p-4 bg-red-500/20 rounded-xl">
                {error}
              </div>
            )}

            {result && <EmojiOutput result={result} />}
          </div>
        </div>
      </div>
    </section>
  );
}
