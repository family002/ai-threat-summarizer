// Define ThreatReport types & Interface along with additional context
export type Severity = "Low" | "Medium" | "High" | "Critical";

export interface ThreatReport {
    attackVector: string;
    severity: Severity;
    impact: string;
    mitigation: string;

    confidence?: number;
    raw?: string;
}