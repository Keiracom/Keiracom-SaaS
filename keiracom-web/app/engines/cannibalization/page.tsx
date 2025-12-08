"use client"
import React from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { AlertTriangle, Check, CheckCircle } from "lucide-react"

const CONFLICTS = [
    {
        keyword: "best crm software",
        winner: "/software/best-crm", winnerRank: "#5", winnerStrength: 85, winnerTraffic: "1,200/mo",
        loser: "/blog/crm-reviews-2024", loserRank: "#11", loserStrength: 72, loserTraffic: "300/mo",
        recommendation: "301 Redirect Blog -> Product Page.",
        impact: "+800 visits/mo"
    },
    {
        keyword: "email marketing tips",
        winner: "/learn/email-marketing", winnerRank: "#8", winnerStrength: 78, winnerTraffic: "450/mo",
        loser: "/tips/email-guide", loserRank: "#14", loserStrength: 65, loserTraffic: "120/mo",
        recommendation: "Merge content + 301.",
        impact: "+300 visits/mo"
    },
    {
        keyword: "seo audit checklist",
        winner: "/tools/seo-audit", winnerRank: "#3", winnerStrength: 92, winnerTraffic: "2,500/mo",
        loser: "/blog/2022-seo-audit", loserRank: "#22", loserStrength: 40, loserTraffic: "10/mo",
        recommendation: "Delete & Redirect.",
        impact: "Clean up legacy bloat."
    },
    {
        keyword: "rank tracker",
        winner: "/features/rank-tracker", winnerRank: "#12", winnerStrength: 70, winnerTraffic: "600/mo",
        loser: "/blog/what-is-rank-tracker", loserRank: "#11", loserStrength: 68, loserTraffic: "650/mo",
        recommendation: "Canonical Tag (Blog -> Feature).",
        impact: "Prioritize product conversion page."
    }
]

export default function CannibalizationPage() {
    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-500" /> Cannibalization Resolver
                </h1>
                <p className="text-sm text-gray-500 mb-6">Internal keyword conflicts degrading portfolio performance</p>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white dark:bg-dd-panel border-l-4 border-red-500 rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Critical</div>
                        <div className="text-3xl font-bold text-red-500">4</div>
                        <div className="text-xs text-gray-500">Conflicts</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border-l-4 border-yellow-500 rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Warning</div>
                        <div className="text-3xl font-bold text-yellow-500">8</div>
                        <div className="text-xs text-gray-500">Conflicts</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border-l-4 border-purple-500 rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Est. Lost Traffic</div>
                        <div className="text-3xl font-bold text-purple-500">2.4k</div>
                        <div className="text-xs text-gray-500">Visits/month</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border-l-4 border-green-500 rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Auto-Fixed</div>
                        <div className="text-3xl font-bold text-green-500">12</div>
                        <div className="text-xs text-gray-500">This Week</div>
                    </div>
                </div>

                {/* Conflicts List */}
                <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded">
                    <div className="px-4 py-3 border-b border-dd-light-border dark:border-dd-border bg-gray-50 dark:bg-gray-800">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Active Conflicts</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {CONFLICTS.map((c, i) => (
                            <div key={i} className={`border rounded p-4 ${i === 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="font-bold text-gray-900 dark:text-white">"{c.keyword}"</div>
                                    <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-purple-700 flex items-center gap-1">
                                        <Check width={12} /> Resolve
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="border-l-2 border-green-500 pl-3">
                                        <div className="text-green-600 font-bold">👑 Winner</div>
                                        <div className="font-mono text-xs text-gray-800 dark:text-gray-200">{c.winner}</div>
                                        <div className="text-xs text-gray-500 mt-1">Rank: {c.winnerRank} • Strength: {c.winnerStrength} • Traffic: {c.winnerTraffic}</div>
                                    </div>
                                    <div className="border-l-2 border-yellow-500 pl-3">
                                        <div className="text-yellow-600 font-bold">⚠️ Loser</div>
                                        <div className="font-mono text-xs text-gray-800 dark:text-gray-200">{c.loser}</div>
                                        <div className="text-xs text-gray-500 mt-1">Rank: {c.loserRank} • Strength: {c.loserStrength} • Traffic: {c.loserTraffic}</div>
                                    </div>
                                </div>
                                <div className="mt-3 bg-white dark:bg-gray-800 border border-dd-light-border dark:border-dd-border rounded p-2 text-xs">
                                    <span className="font-bold text-purple-600">AI Recommendation:</span> {c.recommendation}
                                    <div className="text-gray-500 mt-1">Expected traffic gain: <span className="text-green-600 font-bold">{c.impact}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppHull>
    )
}
