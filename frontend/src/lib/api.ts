interface AnalyzeResponse {
  emojis: string;
  emotions: Record<string, number>;
}

export async function analyzeText(text: string): Promise<AnalyzeResponse> {
  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze text");
  }

  return response.json();
}
