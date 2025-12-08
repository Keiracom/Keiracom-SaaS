"use client"
import React from 'react'
import { AppHull } from "@/components/layout/AppHull"
import { GitBranch, Sparkles, CheckCircle, FileText, Target, Play, Check, Rocket } from "lucide-react"

export default function AuthorityPage() {
    return (
        <AppHull>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
                    <GitBranch className="text-purple-500" /> Authority Architect
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Topic Cluster Graph */}
                    <div className="lg:col-span-2 bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-6">
                        <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Topic Cluster Graph</h3>
                        <div className="h-96 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center relative overflow-hidden">
                            {/* SVG Network Visualization */}
                            <svg className="w-full h-full">
                                {/* Central Hub */}
                                <circle cx="250" cy="200" r="40" fill="#632CA6" opacity="0.2" />
                                <text x="250" y="205" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 text-xs font-bold">SEO Core</text>

                                {/* Connected Topics (Green = Covered) */}
                                <line x1="250" y1="200" x2="150" y2="100" stroke="#10B981" strokeWidth="2" opacity="0.5" />
                                <circle cx="150" cy="100" r="30" fill="#10B981" opacity="0.2" />
                                <text x="150" y="105" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs">Technical</text>

                                <line x1="250" y1="200" x2="350" y2="100" stroke="#10B981" strokeWidth="2" opacity="0.5" />
                                <circle cx="350" cy="100" r="30" fill="#10B981" opacity="0.2" />
                                <text x="350" y="105" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs">On-Page</text>

                                <line x1="250" y1="200" x2="400" y2="250" stroke="#10B981" strokeWidth="2" opacity="0.5" />
                                <circle cx="400" cy="250" r="30" fill="#10B981" opacity="0.2" />
                                <text x="400" y="255" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs">Analytics</text>

                                {/* Missing Topics (Red = Gaps) */}
                                <line x1="250" y1="200" x2="100" y2="250" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                                <circle cx="100" cy="250" r="30" fill="#EF4444" opacity="0.3" className="animate-pulse" />
                                <text x="100" y="255" textAnchor="middle" className="fill-red-600 dark:fill-red-400 text-xs font-bold">Link Building</text>

                                <line x1="250" y1="200" x2="200" y2="350" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                                <circle cx="200" cy="350" r="30" fill="#EF4444" opacity="0.3" className="animate-pulse" />
                                <text x="200" y="355" textAnchor="middle" className="fill-red-600 dark:fill-red-400 text-xs font-bold">Local SEO</text>

                                <line x1="250" y1="200" x2="350" y2="350" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                                <circle cx="350" cy="350" r="30" fill="#EF4444" opacity="0.3" className="animate-pulse" />
                                <text x="350" y="355" textAnchor="middle" className="fill-red-600 dark:fill-red-400 text-xs font-bold">E-commerce</text>
                            </svg>
                        </div>
                        <div className="mt-4 flex gap-4 text-xs">
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span>Covered (12)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>Gaps (3)</span>
                            </div>
                        </div>
                    </div>

                    {/* Topical Voids (Gap Analysis) */}
                    <div className="bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-6 flex flex-col h-[500px]">
                        <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Topical Voids (Priority Order)</h3>
                        <div className="space-y-3 flex-1 overflow-y-auto pr-2">

                            {/* Void 1 */}
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                                <div className="font-bold text-sm mb-1 text-gray-900 dark:text-white">Link Building 2025 Strategy</div>
                                <div className="text-xs text-gray-500 mb-2 flex items-center">
                                    <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded font-bold">HIGH</span>
                                    <span className="ml-2">Est. 2,400 visits/mo</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                    <Target width={10} /> Found in: moz.com, ahrefs.com
                                </div>
                                <button className="w-full bg-purple-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-purple-700 flex items-center justify-center gap-1">
                                    <Sparkles width={12} /> Generate Brief
                                </button>
                            </div>

                            {/* Void 2 */}
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                                <div className="font-bold text-sm mb-1 text-gray-900 dark:text-white">E-commerce SEO Guide</div>
                                <div className="text-xs text-gray-500 mb-2 flex items-center">
                                    <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded font-bold">HIGH</span>
                                    <span className="ml-2">Est. 4,200 visits/mo</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-2">
                                    <CheckCircle width={12} /> <span className="font-semibold">Draft Complete</span>
                                </div>
                                <button className="w-full bg-green-500 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-green-600 flex items-center justify-center gap-1">
                                    <Check width={12} /> Review & Approve
                                </button>
                            </div>

                            {/* Void 3 */}
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                                <div className="font-bold text-sm mb-1 text-gray-900 dark:text-white">Local SEO Checklist</div>
                                <div className="text-xs text-gray-500 mb-2 flex items-center">
                                    <span className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 px-2 py-0.5 rounded font-bold">MED</span>
                                    <span className="ml-2">Est. 1,800 visits/mo</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 mb-2">
                                    <FileText width={12} /> <span className="font-semibold">Brief Generated</span>
                                </div>
                                <button className="w-full bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-600 flex items-center justify-center gap-1">
                                    <Play width={12} /> Create Draft
                                </button>
                            </div>

                            {/* Void 4 */}
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                                <div className="font-bold text-sm mb-1 text-gray-900 dark:text-white">Python for Marketers</div>
                                <div className="text-xs text-gray-500 mb-2 flex items-center">
                                    <span className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 px-2 py-0.5 rounded font-bold">MED</span>
                                    <span className="ml-2">Est. 1,100 visits/mo</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                    <Target width={10} /> Found in: searchenginejournal.com
                                </div>
                                <button className="w-full bg-purple-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-purple-700 flex items-center justify-center gap-1">
                                    <Sparkles width={12} /> Generate Brief
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AppHull>
    )
}
