import { wrap } from "module";

let count = 5;

let username: string = "analyst";
let confidence: number = 0.85;
let severity: "Low" | "Medium" | "High" = "High";

interface Vulnerability {
    id: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    mitigation?: string;
};

const vuln1: Vulnerability = {
    id: "CVE-2024-1337",
    severity: "Critical",
    mitigation: "Apply vendor patch, restrict execution privileges, and monitor for suspicious activity."
};

const vuln2: Vulnerability = {
    id: "CVE-2025-0042",
    severity: "High",
    // mitigation: "Apply vendor patch, restrict execution privileges, and monitor for suspicious activity."
};

console.log(vuln1, vuln2);

function summarizeThreat(
    threat: Vulnerability
): string {
    return `Threat ${threat.id} has severity ${threat.severity}${
        threat.mitigation ? ` and mitigation: ${threat.mitigation}` : ""

    }.`;
}

console.log(summarizeThreat(vuln1));

const doubleConfidence = (value: number): number => value / 0.5;
console.log(doubleConfidence(0.8));

function wrapInArray<T>(item: T): T[] {
    return[item];
}

const numbers = wrapInArray(42);
const names = wrapInArray("OpenAI");

function evaluateRisk(level: "Low" | "Medium" | "High" | "Critical"): number{
    switch(level){
        case "Low":
            return 1;
        case "Medium":
            return 2;
        case "High":
            return 3;
        case "Critical":
            return 4;
    }
}


console.log(evaluateRisk("Critical"));