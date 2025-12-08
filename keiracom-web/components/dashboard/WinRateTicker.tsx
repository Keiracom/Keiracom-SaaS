"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Diamond, Crown, ShieldCheck } from "lucide-react"

export function WinRateTicker() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Metric 1 - Engine 6 */}
            <Card className="bg-black/40 border-slate-800 backdrop-blur-sm shadow-lg hover:border-emerald-500/30 transition-colors">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-mono text-slate-400 tracking-wider">SNIPPETS_STOLEN (Engine 6)</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-2 font-mono">12</h3>
                            <p className="text-xs text-green-500 flex items-center mt-1 font-mono">
                                <TrendingUp className="h-3 w-3 mr-1" /> +3 this week
                            </p>
                        </div>
                        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            <Diamond className="h-5 w-5 text-emerald-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Metric 2 - Engine 4 */}
            <Card className="bg-black/40 border-slate-800 backdrop-blur-sm shadow-lg hover:border-purple-500/30 transition-colors">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-mono text-slate-400 tracking-wider">AUTHORITY_NODES (Engine 4)</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-2 font-mono">84%</h3>
                            <p className="text-xs text-slate-500 flex items-center mt-1 font-mono">
                                4 Clusters Dominant
                            </p>
                        </div>
                        <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <Crown className="h-5 w-5 text-purple-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Metric 3 - Engine 1 */}
            <Card className="bg-black/40 border-slate-800 backdrop-blur-sm shadow-lg hover:border-blue-500/30 transition-colors">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-mono text-slate-400 tracking-wider">REVENUE_SHIELD (Engine 1)</p>
                            <h3 className="text-3xl font-bold text-slate-100 mt-2 font-mono">$42.8k</h3>
                            <p className="text-xs text-green-500 flex items-center mt-1 font-mono">
                                <TrendingUp className="h-3 w-3 mr-1" /> +12% protected
                            </p>
                        </div>
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <ShieldCheck className="h-5 w-5 text-blue-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
