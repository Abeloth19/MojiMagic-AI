import { examplePrompts } from "@/lib/examples";

interface ExamplePromptsProps {
  onExampleClick: (text: string) => void;
}

export default function ExamplePrompts({
  onExampleClick,
}: ExamplePromptsProps) {
  return (
    <div className="space-y-3">
      <p className="text-white/80 text-sm font-medium">Try these examples:</p>
      <div className="flex flex-wrap gap-2">
        {examplePrompts.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.text)}
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer"
          >
            {example.text.length > 40
              ? `${example.text.substring(0, 40)}...`
              : example.text}
          </button>
        ))}
      </div>
    </div>
  );
}
