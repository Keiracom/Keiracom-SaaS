"use client"
import React from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { Crosshair, Target, Zap, Info, Clock, Lock, ShieldCheck } from "lucide-react"

const TARGETS = [
    {
        url: "ahrefs.com/blog/keyword-research",
        rank: "#2", updated: "34 months ago", words: 850,
        vuln: 92,
        ageAnalysis: "Published: Jan 2022 (34mo) • Ancient Data • Pre-AI Era",
        thinAnalysis: "Current: 850 words • Top 5 avg: 2,500 words • Missing: 'AI keywords'",
        strategy: 'Generate 3,000+ word "Ultimate Guide 2025" covering AI integration.',
        capture: "+1,200 visits/mo",
        btnMock: "brief"
    },
    {
        url: "backlinko.com/seo-techniques",
        rank: "#3", updated: "28 months ago", words: 1200,
        vuln: 90,
        ageAnalysis: "Published: Aug 2022 • Outdated Algo References",
        thinAnalysis: "Missing new SGE context • Visuals outdated",
        strategy: "Update list with 2025 algorithms (SGE, AI Overviews).",
        capture: "+2,500 visits/mo",
        btnMock: "brief"
    },
    {
        url: "searchenginejournal.com/meta-tags",
        rank: "#1", updated: "42 months ago", words: 600,
        vuln: 95,
        ageAnalysis: "Ancient content • Deprecated tags listed",
        thinAnalysis: "Extremely thin (600w) vs complexity",
        strategy: "Target is ancient and thin. Create definitive meta tag library.",
        capture: "+4,100 visits/mo",
        btnMock: "brief"
    },
    {
        url: "shopify.com/blog/dropshipping",
        rank: "#1", updated: "6 months ago", words: 4000,
        vuln: 45,
        ageAnalysis: "Fresh content • High Domain Authority",
        thinAnalysis: "Comprehensive (4k words)",
        strategy: 'Strong asset. Only attack via "Alternative/Comparison" angle.',
        capture: "+300 visits/mo",
        btnMock: "hard"
    }
]

export default function FreshnessPage() {
    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-2">
                    <Crosshair className="text-blue-500" /> Freshness Attack
                </h1>
                <p className="text-sm text-gray-500 mb-6">Execute "Skyscraper" attacks on stale competitor content</p>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Stale Targets</div>
                        <div className="text-3xl font-bold text-red-500">18</div>
                        <div className="text-xs text-gray-500">Age &gt;18 months</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Thin Content</div>
                        <div className="text-3xl font-bold text-yellow-500">12</div>
                        <div className="text-xs text-gray-500">&lt; 1,000 words</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">High Vulnerability</div>
                        <div className="text-3xl font-bold text-orange-500">7</div>
                        <div className="text-xs text-gray-500">Aged + Thin</div>
                    </div>
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded p-3">
                        <div className="text-xs text-gray-500 uppercase font-bold">Est. Traffic Gain</div>
                        <div className="text-3xl font-bold text-green-500">+4.8k</div>
                        <div className="text-xs text-gray-500">If attacked</div>
                    </div>
                </div>

                {/* Vulnerability List */}
                <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded">
                    <div className="px-4 py-3 border-b border-dd-light-border dark:border-dd-border bg-gray-50 dark:bg-gray-800">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">Vulnerability Targets (Sorted by Score)</h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {TARGETS.map((t, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="font-bold text-gray-800 dark:text-white mb-1">{t.url}</div>
                                        <div className="text-xs text-gray-500">
                                            Rank: {t.rank} • Last Updated: {t.updated} • Word Count: {t.words}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-xs font-bold ${t.vuln > 80 ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                            : t.vuln > 50 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                                                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        }`}>
                                        VULN: {t.vuln}
                                    </span>
                                </div>

                                {t.vuln > 50 && (
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div className="bg-red-50 dark:bg-red-900/20 rounded p-2 text-xs">
                                            <div className="font-bold text-red-700 dark:text-red-300 mb-1">Age Analysis</div>
                                            <div className="text-gray-600 dark:text-gray-400">{t.ageAnalysis}</div>
                                        </div>
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2 text-xs">
                                            <div className="font-bold text-yellow-700 dark:text-yellow-300 mb-1">Thinness Analysis</div>
                                            <div className="text-gray-600 dark:text-gray-400">{t.thinAnalysis}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 text-xs flex justify-between items-center group">
                                    <div>
                                        <div className="font-bold text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1">
                                            {t.btnMock === 'brief' ? <Target width={12} /> : <Info width={12} />}
                                            {t.btnMock === 'brief' ? 'Attack Strategy' : 'Hard Target'}
                                        </div>
                                        <div className="text-gray-700 dark:text-gray-300">
                                            {t.strategy} Est. Capture: <span className={t.btnMock === 'brief' ? 'font-bold text-green-600' : 'font-bold text-yellow-600'}>{t.capture}</span>
                                        </div>
                                    </div>
                                    {t.btnMock === 'brief' ? (
                                        <button className="ml-4 bg-blue-600 text-white px-4 py-1.5 rounded font-bold hover:bg-blue-700 text-xs flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Zap width={12} /> Generate Brief
                                        </button>
                                    ) : (
                                        <button className="ml-4 bg-gray-400 text-white px-4 py-1.5 rounded font-bold text-xs flex items-center gap-1 cursor-not-allowed shrink-0 opacity-50">
                                            <Lock width={12} /> Low ROI
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppHull>
    )
}
