import React from "react";
import type { ThreatReport } from "../types/threat";

interface Props {
    report: ThreatReport;
}

export default function ThreatResult ({ report }: Props) {
    return (
        <section className="mt-6 grid gap-4">
            <div className="p-4 rounded-lg border bg-white shadow-sm">
                <h2 className="text-lg font-semibold">Attack Vector</h2>
                <p className="mt-2 text-sm text-gray-700">{report.attackVector}</p>
            </div>

            <div className="p-4 rounded-lg border bg-white shadow-sm flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium">Severity</h3>
                    <p className="mt-1 text-sm">{report.severity}</p>
                </div>
                {typeof report.confidence === "number" && (
                    <div className="text-xs text-gray-500">
                        Confidence: {(report.confidence * 100).toFixed(0)}%
                    </div>
                )}
            </div>

            <div className="p-4 rounded-lg border bg-white shadow-sm">
                <h3 className="text-sm font-medium">Mitigation</h3>
                <p className="mt-2 text-sm text-gray-700">{report.mitigation}</p>
            </div>
        </section>
    );
}

