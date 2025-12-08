"use client"
import React from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { Shield, TrendingUp, DollarSign, AlertCircle, ArrowRightLeft } from "lucide-react"

const ASSETS = [
    { keyword: "best crm software", volume: "12.5k", cpc: "$45.00", difficulty: 85, yes: 9.2, status: "Active" },
    { keyword: "email marketing tools", volume: "8.1k", cpc: "$32.50", difficulty: 78, yes: 8.5, status: "Active" },
    { keyword: "project management", volume: "22.0k", cpc: "$55.00", difficulty: 91, yes: 7.8, status: "Review" },
    { keyword: "seo audit guide", volume: "3.4k", cpc: "$12.00", difficulty: 45, yes: 9.8, status: "Active" },
    { keyword: "landing page builder", volume: "6.2k", cpc: "$28.00", difficulty: 65, yes: 8.9, status: "Active" },
]

export default function RevenuePage() {
    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Shield className="text-green-600" /> Revenue Shield
                </h1>
                <p className="text-sm text-gray-500 mb-6">Portfolio protection and yield maximization</p>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    <div className="bg-white border-l-4 border-green-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Total Assets</div>
                        <div className="text-3xl font-bold text-gray-900">247</div>
                        <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp width={12} /> +12%</div>
                    </div>
                    <div className="bg-white border-l-4 border-green-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Avg YES Score</div>
                        <div className="text-3xl font-bold text-green-600">8.7</div>
                        <div className="text-xs text-gray-500">Yield Efficiency</div>
                    </div>
                    <div className="bg-white border-l-4 border-yellow-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Risk Exposure</div>
                        <div className="text-3xl font-bold text-yellow-500">$2.4k</div>
                        <div className="text-xs text-gray-500">Monthly Value</div>
                    </div>
                    <div className="bg-white border-l-4 border-purple-500 rounded p-3 shadow-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold">Swap Opps</div>
                        <div className="text-3xl font-bold text-purple-600">3</div>
                        <div className="text-xs text-gray-500">High Conviction</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Asset Table */}
                    <div className="lg:col-span-2 bg-white border border-dd-light-border rounded-lg overflow-hidden shadow-sm">
                        <div className="px-4 py-3 border-b border-dd-light-border bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-sm text-gray-800">High Yield Assets</h3>
                            <button className="text-xs bg-white border px-2 py-1 rounded hover:bg-gray-50">Filter</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-dd-light-border">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-600">Keyword</th>
                                        <th className="px-4 py-2 text-right font-semibold text-gray-600">Volume</th>
                                        <th className="px-4 py-2 text-right font-semibold text-gray-600">CPC</th>
                                        <th className="px-4 py-2 text-right font-semibold text-gray-600">Diff</th>
                                        <th className="px-4 py-2 text-right font-semibold text-gray-600">YES</th>
                                        <th className="px-4 py-2 text-center font-semibold text-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dd-light-border text-gray-700">
                                    {ASSETS.map((asset, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium">{asset.keyword}</td>
                                            <td className="px-4 py-2 text-right font-mono text-xs">{asset.volume}</td>
                                            <td className="px-4 py-2 text-right font-mono text-xs text-green-600">{asset.cpc}</td>
                                            <td className="px-4 py-2 text-right">
                                                <span className={`px-1.5 rounded ${asset.difficulty > 80 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {asset.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-right font-bold text-gray-900">{asset.yes}</td>
                                            <td className="px-4 py-2 text-center">
                                                <span className={`inline-block w-2 h-2 rounded-full ${asset.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Swap Panel */}
                    <div className="bg-white border border-dd-light-border rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <ArrowRightLeft className="text-purple-600" width={18} />
                            <h3 className="font-bold text-gray-800">Swap Recommendations</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-purple-50 border border-purple-100 rounded p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-purple-700">REPLACE</span>
                                    <span className="text-xs text-red-500 font-bold">-12% Yield</span>
                                </div>
                                <div className="text-sm font-bold text-gray-800 mb-1">"cheap crm"</div>
                                <div className="flex justify-center my-1"><ArrowRightLeft width={12} className="text-gray-400" /></div>
                                <div className="text-sm font-bold text-green-600 mb-2">"crm for startups"</div>
                                <div className="flex justify-between items-start">
                                    <div className="text-xs text-gray-500">Vol: 1.2k • CPC: $15</div>
                                    <button className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-purple-700">Execute</button>
                                </div>
                            </div>

                            <div className="p-3 border rounded bg-gray-50 text-center">
                                <div className="text-xs text-gray-500 mb-1">Portfolio Optimization</div>
                                <div className="text-green-600 font-bold text-lg">+$450/mo</div>
                                <div className="text-xs text-gray-400">Potential Gain</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppHull>
    )
}
