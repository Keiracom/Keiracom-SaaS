"use client"
import React from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { Crosshair, AlertCircle, TrendingUp, Filter, Target } from "lucide-react"

export default function FreshnessPage() {
    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Crosshair className="text-blue-600" /> Freshness Attack
                </h1>
                <p className="text-sm text-gray-500 mb-6">Snipe competitor rankings with superior freshness</p>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white border-l-4 border-blue-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Scanning</div>
                        <div className="text-3xl font-bold text-blue-600">842</div>
                        <div className="text-xs text-gray-500">SERPs Monitored</div>
                    </div>
                    <div className="bg-white border-l-4 border-red-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Stale Content</div>
                        <div className="text-3xl font-bold text-red-500">18</div>
                        <div className="text-xs text-gray-500">Targets Found</div>
                    </div>
                    <div className="bg-white border-l-4 border-yellow-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Thin Content</div>
                        <div className="text-3xl font-bold text-yellow-500">12</div>
                        <div className="text-xs text-gray-500">Targets Found</div>
                    </div>
                    <div className="bg-white border-l-4 border-purple-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Vulnerability</div>
                        <div className="text-3xl font-bold text-purple-600">High</div>
                        <div className="text-xs text-gray-500">Sector Avg</div>
                    </div>
                </div>

                {/* Attack Targets List */}
                <div className="bg-white border border-dd-light-border rounded shadow-sm">
                    <div className="px-4 py-3 border-b border-dd-light-border bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-sm text-gray-900">Priority Attack Targets (Live)</h3>
                        <div className="flex gap-2">
                            <button className="text-xs bg-white border px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-50">
                                <Filter width={12} /> Filter
                            </button>
                        </div>
                    </div>

                    <div className="divide-y divide-dd-light-border">
                        {/* Target 1 */}
                        <div className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="font-bold text-gray-900 mb-1">ahrefs.com/blog/keyword-research</div>
                                    <div className="text-xs text-gray-500">Rank: #2 • Last Updated: 34 months ago • Word Count: 850</div>
                                </div>
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold">VULN: 92</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div className="bg-red-50 rounded p-2 text-xs border border-red-100">
                                    <div className="font-bold text-red-700 mb-1">Age Analysis</div>
                                    <div className="text-gray-600 space-y-1">
                                        <div>• Published: Jan 2022 (34mo)</div>
                                        <div>• Ancient Data</div>
                                        <div>• Pre-AI Era content</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 rounded p-2 text-xs border border-yellow-100">
                                    <div className="font-bold text-yellow-700 mb-1">Thinness Analysis</div>
                                    <div className="text-gray-600 space-y-1">
                                        <div>• Current: 850 words</div>
                                        <div>• Top 5 avg: 2,500 words</div>
                                        <div>• Missing: 'AI keywords'</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-blue-800 mb-1 flex items-center gap-1"><Target width={12} /> Attack Strategy</div>
                                    <div className="text-gray-700">Generate 3,000+ word "Ultimate Guide 2025" covering AI integration. Est. Capture: <span className="font-bold text-green-600">+1,200 visits/mo</span></div>
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-1.5 rounded font-bold hover:bg-blue-700 text-xs flex items-center gap-1">
                                    <TrendingUp width={12} /> Generate Brief
                                </button>
                            </div>
                        </div>

                        {/* Target 2 */}
                        <div className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="font-bold text-gray-900 mb-1">moz.com/learn/seo/backlinks</div>
                                    <div className="text-xs text-gray-500">Rank: #4 • Last Updated: 18 months ago • Word Count: 1,200</div>
                                </div>
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-xs font-bold">VULN: 84</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div className="bg-red-50 rounded p-2 text-xs border border-red-100">
                                    <div className="font-bold text-red-700 mb-1">Age Analysis</div>
                                    <div className="text-gray-600 space-y-1">
                                        <div>• Published: June 2023 (18mo)</div>
                                        <div>• Slightly Outdated</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 rounded p-2 text-xs border border-yellow-100">
                                    <div className="font-bold text-yellow-700 mb-1">Thinness Analysis</div>
                                    <div className="text-gray-600 space-y-1">
                                        <div>• Current: 1,200 words</div>
                                        <div>• Top 5 avg: 2,800 words</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-blue-800 mb-1 flex items-center gap-1"><Target width={12} /> Attack Strategy</div>
                                    <div className="text-gray-700">Create "Backlink Masterclass 2025" with video. Est. Capture: <span className="font-bold text-green-600">+850 visits/mo</span></div>
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-1.5 rounded font-bold hover:bg-blue-700 text-xs flex items-center gap-1">
                                    <TrendingUp width={12} /> Generate Brief
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AppHull>
    )
}
