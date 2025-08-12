import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <HeroSection />

      <footer className="text-center py-8 text-white/60">
        <p>Built with ✨ MojiMagic AI</p>
      </footer>
    </div>
  );
}
