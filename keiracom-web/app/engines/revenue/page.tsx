"use client"
import React from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { Shield, Info, RefreshCw, ArrowRight, Server } from "lucide-react"

const ASSETS = [
    { keyword: "best ai writing tools 2025", vol: "12,500", cpc: "$8.50", diff: 45, yes: 9.9, status: "ACTIVE" },
    { keyword: "saas marketing agency", vol: "4,200", cpc: "$15.20", diff: 52, yes: 9.8, status: "ACTIVE" },
    { keyword: "enterprise seo platform", vol: "1,800", cpc: "$24.50", diff: 58, yes: 9.7, status: "ACTIVE" },
    { keyword: "google ads alternative", vol: "5,400", cpc: "$12.40", diff: 48, yes: 9.6, status: "ACTIVE" },
    { keyword: "keyword research services", vol: "2,900", cpc: "$9.80", diff: 41, yes: 9.5, status: "ACTIVE" },
    { keyword: "email automation tools", vol: "6,100", cpc: "$7.20", diff: 54, yes: 9.4, status: "ACTIVE" },
    { keyword: "crm for startups", vol: "3,500", cpc: "$14.50", diff: 62, yes: 9.3, status: "ACTIVE" },
    { keyword: "how to start a blog", vol: "45,000", cpc: "$2.80", diff: 75, yes: 9.2, status: "ACTIVE" },
    { keyword: "best web hosting 2024", vol: "8,200", cpc: "$18.00", diff: 82, yes: 9.1, status: "ACTIVE" },
    { keyword: "free seo tools", vol: "12,400", cpc: "$3.50", diff: 50, yes: 9.1, status: "ACTIVE" },
    // ... (Truncated for clean code)
]

export default function RevenuePage() {
    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-2">
                    <Shield className="text-green-500" /> Revenue Shield
                </h1>
                <p className="text-sm text-gray-500 mb-6">Active Portfolio Optimization (Yield Maximization)</p>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Portfolio Size</div>
                        <div className="text-3xl font-bold text-green-600">247</div>
                        <div className="text-xs text-gray-500">Active Assets</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Avg YES Score</div>
                        <div className="text-3xl font-bold text-gray-600 dark:text-gray-300">8.7</div>
                        <div className="text-xs text-gray-500">Out of 10</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Swap Queue</div>
                        <div className="text-3xl font-bold text-yellow-500">3</div>
                        <div className="text-xs text-gray-500">Pending</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Est. Monthly Value</div>
                        <div className="text-3xl font-bold text-green-500">$12.4k</div>
                        <div className="text-xs text-gray-500">Traffic × CPC</div>
                    </div>
                </div>

                {/* Asset Table */}
                <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded">
                    <div className="px-4 py-3 border-b border-dd-light-border dark:border-dd-border bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Active Portfolio (Top 25 by YES Score)</h3>
                        <div className="text-xs font-mono text-gray-500 cursor-pointer hover:text-green-500 transition-colors flex items-center gap-1">
                            <Info width={12} /> YES = (Search Volume × CPC) / Difficulty^1.5
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-dd-light-border dark:border-dd-border">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Keyword</th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">Volume</th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">CPC</th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">Difficulty</th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">YES Score</th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {ASSETS.map((asset, i) => (
                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-800 dark:text-gray-200">{asset.keyword}</td>
                                        <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{asset.vol}</td>
                                        <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{asset.cpc}</td>
                                        <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{asset.diff}</td>
                                        <td className="px-4 py-3 text-right font-bold text-green-500">{asset.yes}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded text-xs font-bold">
                                                {asset.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Swap Recommendation Panel */}
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4 flex justify-between items-center">
                    <div>
                        <div className="font-bold text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-2">
                            <Info width={16} /> Zero-Latency Swap Recommendation
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            New opportunity <span className="font-mono font-bold">"best seo audit tool 2024"</span> (YES: <span className="text-green-600 font-bold">9.8</span>)
                            exceeds worst asset <span className="font-mono font-bold">"backlink checker free"</span> (YES: <span className="text-red-500 font-bold">7.1</span>).
                        </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 shadow flex items-center gap-2">
                        <RefreshCw width={16} /> Execute Swap
                    </button>
                </div>

            </div>
        </AppHull>
    )
}
