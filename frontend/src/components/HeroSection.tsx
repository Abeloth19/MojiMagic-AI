"use client";
import FloatingEmojis from "./FloatingEmojis";

export default function HeroSection() {
  const scrollToConverter = () => {
    document
      .getElementById("converter")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <FloatingEmojis />
      <div className="text-center z-10 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
          ✨ MojiMagic 🎭
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-white/90 mb-8">
          AI that turns your text into perfect emojis
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Express yourself better with AI-generated emoji combinations that
          capture your exact mood and meaning
        </p>
        <button
          onClick={scrollToConverter}
          className="bg-white text-purple-600 font-semibold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Try Now ↓
        </button>
      </div>
    </section>
  );
}
