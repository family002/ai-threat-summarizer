import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import type { ThreatReport } from "../../types/threat";

// Initialize OpenAI
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Threat Analyzer - stores raw text input, sends it to OpenAI API, and returns analysis
class ThreatAnalyzer {
    text: string;
    constructor(text: string) {
        this.text = text;
    }

    private classifyRisk(level: string, vector: string): [string, string]{
        return [level, vector];
    }

    async analyze(): Promise<ThreatReport>{
    const prompt = `
    Analyze the following cybersecurity report or CVE description and extract:

    - Attack Vector
    - Severity Level (Low, Medium, High, Critical)
    - Impact Summary
    - Recommended Mitigation

    Respond in JSON with keys: attackVector, severity, impact, mitigation.

    Report:
    """${this.text}"""
    `;
    try {
        const completion = await client.responses.create({
        model: "gpt-4o-mini",
        input: [{ role: "user", content: prompt,}],
        text: { format: { type: "json_object" } },
    });
        
    const data: ThreatReport = JSON.parse(completion.output_text);
    const [severity, vector] = this.classifyRisk(data.severity, data.attackVector);
    console.log("Classified Risk Tuple:", [severity, vector]);

    return data;
    } catch (error:any) {
        console.error("API error:", error);
        throw new Error("Failed to analyze threat report.");
    }
    }
}

// API Handler - processes POST requests
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed"});
    }
    const { text } = req.body;
    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Missing or invalid input text"});
    }
    const analyzer = new ThreatAnalyzer(text);
    try{
        const report = await analyzer.analyze();
        return res.status(200).json(report);
    } catch (err: any){
        res.status(500).json({ error: err.message });
    }
}

// Example Output
// CVE-2024-23897: A remote code execution vulnerability in Jenkins allows attackers to read arbitrary files via CLI.

// Attack Vector: Remote Code Execution
// Severity: High
// Impact Summary: Potential unauthorized code execution or data exfiltration (summary).
// Mitigation: Apply vendor patch, restrict execution privileges, and monitor for suspicious activity.

//Testing:
// CVE-2025-14567: An information disclosure issue in WidgetPro 1.3 allows local users to view temporary log files containing debug information. Attackers require local access to exploit this vulnerability.
// CVE-2025-18792: A SQL injection vulnerability in the search function of ShopEase 2.1 allows remote attackers to execute arbitrary SQL commands via crafted input in the query parameter.
// CVE-2025-22010: Buffer overflow in the image processing module of SecureScan 5.0 allows remote attackers to execute arbitrary code via a crafted PNG file.
// CVE-2025-30100: Authentication bypass in CloudPanel 3.8 allows attackers to gain administrative access by manipulating session tokens.
// CVE-2025-40150: A race condition in DataSync 2.0 can cause denial of service when multiple sync requests occur simultaneously. Exploitation requires authenticated network access.