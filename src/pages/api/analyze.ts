import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import type { ThreatReport } from "../../types/threat";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not allowed" });
    }

    const { text } = req.body;
    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Missing or invalid input text."});
    }

    const prompt = `
    Analyze the following cybersecurity report or CVE description and extract:

    - Attack Vector
    - Severity Level (Low, Medium, High, Critical)
    - Impact Summary
    - Recommended Mitigation

    Respond in JSON with keys: attackVector, severity, impact, mitigation.

    Report:
    """${text}"""
    `;
    try {
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: prompt,
        },
      ],
      text: {
        format: "json", // ✅ Updated syntax for structured output
      },
    });
        
        const outputText = completion.output_text;
        const data: ThreatReport = JSON.parse(outputText);
        res.status(200).json(data);
    } catch (err: any) {
        console.error("API error:", err);
        res.status(500).json({ error: "Failed to analyze threat report." })
    }
}

// Example Output
// CVE-2024-23897: A remote code execution vulnerability in Jenkins allows attackers to read arbitrary files via CLI.

// Attack Vector: Remote Code Execution
// Severity: High
// Impact Summary: Potential unauthorized code execution or data exfiltration (summary).
// Mitigation: Apply vendor patch, restrict execution privileges, and monitor for suspicious activity.