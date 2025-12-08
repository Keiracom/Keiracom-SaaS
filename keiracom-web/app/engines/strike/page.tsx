"use client"
import React from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { Zap, Activity, TrendingUp, Sparkles, Wrench, Download, Check, Copy, X } from "lucide-react"

const OPPORTUNITIES = [
    { keyword: "best crm for small business", vol: "12k", diff: 65, rank: 14, contentScore: 65, schemaScore: 0, titleScore: 90 },
    { keyword: "marketing automation tools", vol: "8.5k", diff: 72, rank: 18, contentScore: 80, schemaScore: 40, titleScore: 60 },
    { keyword: "email marketing software", vol: "22k", diff: 85, rank: 12, contentScore: 45, schemaScore: 100, titleScore: 40 },
    { keyword: "project management tools", vol: "15k", diff: 78, rank: 16, contentScore: 70, schemaScore: 0, titleScore: 70 },
    { keyword: "seo audit checklist", vol: "5.4k", diff: 55, rank: 19, contentScore: 60, schemaScore: 60, titleScore: 50 },
    { keyword: "content marketing strategy", vol: "18k", diff: 82, rank: 11, contentScore: 85, schemaScore: 80, titleScore: 95 },
    { keyword: "social media scheduler", vol: "9.2k", diff: 60, rank: 13, contentScore: 55, schemaScore: 0, titleScore: 80 }
]

export default function StrikePage() {
    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-2">
                    <Zap className="text-yellow-500" /> Strike Distance Sniper
                </h1>
                <p className="text-sm text-gray-500 mb-6">Keywords ranking #11-20 ready to hit Page 1</p>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Opportunities</div>
                        <div className="text-3xl font-bold text-yellow-500">12</div>
                        <div className="text-xs text-gray-500">Keywords in range</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Avg. Position</div>
                        <div className="text-3xl font-bold text-gray-600 dark:text-gray-300">14.2</div>
                        <div className="text-xs text-gray-500">Current rank</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Est. Traffic Gain</div>
                        <div className="text-3xl font-bold text-green-500">+3.2k</div>
                        <div className="text-xs text-gray-500">If moved to Page 1</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Quick Wins</div>
                        <div className="text-3xl font-bold text-purple-500">5</div>
                        <div className="text-xs text-gray-500">Ready to optimize</div>
                    </div>
                </div>

                {/* Assets Table */}
                <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded">
                    <div className="px-4 py-3 border-b border-dd-light-border dark:border-dd-border bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Striking Distance Opportunities</h3>
                        <div className="text-xs text-gray-500 flex items-center gap-4">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Critical (&lt;60)</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Warning (60-80)</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Good (&gt;80)</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-dd-light-border dark:border-dd-border">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Keyword</th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">Rank</th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Content</th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Schema</th>
                                    <th className="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Title</th>
                                    <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {OPPORTUNITIES.map((opp, i) => (
                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="font-mono text-xs text-gray-800 dark:text-gray-200">{opp.keyword}</div>
                                            <div className="text-[10px] text-gray-500">{opp.vol} vol • {opp.diff} KD</div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="font-bold text-lg text-yellow-600">#{opp.rank}</div>
                                        </td>
                                        {[opp.contentScore, opp.schemaScore, opp.titleScore].map((score, j) => (
                                            <td key={j} className="px-4 py-3 text-center">
                                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs border ${score < 60 ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                                        score < 80 ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                                            'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                                                    }`}>
                                                    {score}
                                                </div>
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-right">
                                            <button className="bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:hover:bg-yellow-900/60 text-yellow-700 dark:text-yellow-300 px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1 ml-auto">
                                                <Wrench width={12} /> Fix
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppHull>
    )
}
