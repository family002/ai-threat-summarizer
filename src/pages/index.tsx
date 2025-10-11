import React, { useState } from 'react';
import type { ThreatReport } from "../types/threat";
import ThreatResult from "../components/ThreatResult";

export default function Home() {
  const [input, setInput] = useState<string>("")
  const [result, setResult] = useState<ThreatReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }

  const mockParse = (text: string): ThreatReport => {
    const lower = text.toLowerCase();
    const attackVector = 
      lower.includes("rce") || lower.includes("remote code execution")
      ? "Remote Code Execution"
      : lower.includes("phish") || lower.includes("phishing")
      ? "Phishing"
      : lower.includes("xss")
      ? "Cross-site Scripting"
      : "Unknown / Requires manual review";

    const severity: ThreatReport["severity"] =
      lower.includes("critical") || lower.includes("0-day") ? "Critical" : lower.includes("high") ? "High" : "Medium";

    return {
      attackVector,
      severity,
      impact: "Potential unauthorized code execution or data exfiltration (summary).",
      mitigation: "Apply vendor patch, restrict execution privileges, and monitor for suspicious activity.",
      confidence: 0.72,
      raw: text.slice(0, 200),
    };
  };

  const handleAnalyze = async (): Promise<void> => {
    if (!input.trim()) {
      alert("Please paste a report or CVE description.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parsed: ThreatReport = await response.json();
      setResult(parsed);
    } catch (err) {
      console.error("Analyze error:", err);
      alert("Something went wrong. See console for details.");
    } finally {
      setLoading(false);
    }

      // simulate async work (replace with real fetch in Hour 3)
    //   await new Promise((r) => setTimeout(r, 700));
    //   const parsed = mockParse(input);
    //   setResult(parsed);
    // } catch (err) {
    //   console.error("Analyze error:", err);
    //   alert("Something went wrong. See console for details.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🧠 AI Threat Intel Summarizer</h1>

        <textarea
          value={input}
          onChange={handleChange}
          placeholder="Paste a cybersecurity report or CVE description here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-xl text-white font-semibold transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Threat"}
        </button>

        {/* show last input snippet */}
        {result && (
          <>
            <div className="mt-4 text-xs text-gray-500">Preview: {result.raw}</div>
            <ThreatResult report={result} />
          </>
        )}
      </div>
    </main>
  );
}