"use client"
import React, { useState } from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { Ghost, Eye, Crosshair, AlertCircle } from "lucide-react"

const TARGETS = [
    { domain: "ahrefs.com", status: "SUCCESS", target: '"keyword research" (#1)', action: "artifact" },
    { domain: "hubspot.com", status: "WEAK SNIPPET", target: '"marketing plan template" (#1)', issue: "Paragraph (Hard to read)", action: "steal" },
    { domain: "semrush.com", status: "QUEUED", target: '"backlink checker" (#1)', action: "none" },
    { domain: "moz.com", status: "WEAK SNIPPET", target: '"domain authority" (#1)', issue: "Old Data (2021)", action: "steal" },
    { domain: "backlinko.com", status: "SCANNING", target: '"on-page seo" (#1)', action: "none" },
    { domain: "searchenginejournal.com", status: "WEAK SNIPPET", target: '"seo trends 2025" (#1)', issue: "No List Structure", action: "steal" },
    { domain: "shopify.com", status: "SUCCESS", target: '"ecommerce platform" (#1)', action: "artifact" },
    { domain: "neilpatel.com", status: "QUEUED", target: '"digital marketing" (#2)', action: "none" },
    { domain: "wordstream.com", status: "WEAK SNIPPET", target: '"google ads guide" (#1)', issue: "Weak Definitions", action: "steal" },
    { domain: "yoast.com", status: "SUCCESS", target: '"technical seo" (#1)', action: "artifact" }
]

export default function HeistPage() {
    const [consoleOutput] = useState([
        "root@keiracom-heist:~# ./run_attack.sh target=ahrefs.com",
        "[+] Initializing Heist Protocols...",
        "[+] Target identified: ahrefs.com (DR 92)",
        "[+] Scanning SERPs for weak snippets...",
        "!WARN! Found weakness: 'how to do keyword research' (Pos 1)",
        "[+] Extracting structure... DONE",
        "[+] Generating superior content (Gemini Pro)...",
        "... (processing 4s) ...",
        "[✓] GENERATION COMPLETE."
    ])

    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                    <Ghost className="text-purple-500" /> SERP Heist (Competitor Pwnage)
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Console */}
                    <div className="bg-black rounded-lg p-4 font-mono text-xs text-green-500 h-[500px] overflow-y-auto shadow-md">
                        {consoleOutput.map((line, i) => (
                            <div key={i} className={line.includes("!WARN!") ? "text-yellow-500" : line.includes("COMPLETE") ? "text-purple-500 font-bold" : line.includes("root@") ? "text-gray-500" : ""}>
                                {line.replace("!WARN! ", "")}
                                {line.includes("COMPLETE") && (
                                    <span className="underline cursor-pointer hover:text-white transition-colors block mt-1">
                                        &gt;&gt; View Artifact: heist_draft_01.md &lt;&lt;
                                    </span>
                                )}
                            </div>
                        ))}
                        <div className="animate-pulse">_</div>
                    </div>

                    {/* Targets */}
                    <div className="bg-white border border-dd-light-border rounded-lg overflow-hidden h-[500px] flex flex-col shadow-sm">
                        <div className="px-4 py-2 bg-gray-50 border-b border-dd-light-border font-bold text-xs uppercase text-gray-500">
                            Active Targets
                        </div>
                        <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
                            {TARGETS.map((t, i) => (
                                <div key={i} className="p-3 hover:bg-gray-50">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="font-bold text-sm text-gray-900">{t.domain}</div>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${t.status === 'SUCCESS' ? 'bg-green-100 text-green-600' :
                                                t.status === 'WEAK SNIPPET' ? 'bg-red-100 text-red-600' :
                                                    t.status === 'SCANNING' ? 'bg-blue-100 text-blue-600 animate-pulse' :
                                                        'bg-gray-100 text-gray-500'
                                            }`}>{t.status}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">Target: {t.target}</div>
                                    {t.issue && (
                                        <div className="text-xs text-red-500 mb-2 flex items-center gap-1">
                                            <AlertCircle width={10} /> {t.issue}
                                        </div>
                                    )}
                                    {t.action === 'artifact' && (
                                        <button className="w-full bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-purple-700 flex items-center justify-center gap-1">
                                            <Eye width={10} /> View Artifact
                                        </button>
                                    )}
                                    {t.action === 'steal' && (
                                        <button className="w-full bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700 flex items-center justify-center gap-1">
                                            <Crosshair width={10} /> Steal Position 0
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppHull>
    )
}
