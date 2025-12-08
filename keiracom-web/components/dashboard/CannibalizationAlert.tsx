"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, AlertTriangle, CheckCircle } from "lucide-react"
import { CannibalizationConflict } from "@/types/engines"

const mockConflicts: CannibalizationConflict[] = [
    {
        term: "teeth whitening cost",
        winner_url: "/services/whitening",
        loser_url: "/blog/cost-of-whitening-2023",
        status: "pending",
        rationale: "Service page has higher conversion intent than outdated blog."
    },
    {
        term: "emergency dentist",
        winner_url: "/emergency-services",
        loser_url: "/contact-us",
        status: "resolved",
        redirect_rule: "Redirect 301 /contact-us /emergency-services"
    }
]

export function CannibalizationAlert() {
    return (
        <Card className="col-span-1 md:col-span-2 bg-black/40 border-slate-800 backdrop-blur-sm shadow-xl">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-slate-100 font-mono tracking-tight flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            CANNIBALIZATION_ALERTS
                        </CardTitle>
                        <CardDescription className="text-slate-400 font-mono text-xs mt-1">
                            Internal competition detected. Protocol: Highlander (There can be only one).
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-amber-500/50 text-amber-500 bg-amber-500/10 animate-pulse">
                        {mockConflicts.filter(c => c.status === 'pending').length} ACTIVE
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockConflicts.map((conflict, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-200 font-mono">
                                    KEYWORD: <span className="text-amber-400">"{conflict.term}"</span>
                                </span>
                                {conflict.status === 'resolved' ? (
                                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">RESOLVED</Badge>
                                ) : (
                                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">ACTION REQ</Badge>
                                )}
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="flex-1 p-2 rounded bg-slate-950/50 border border-slate-800/50 text-slate-400 line-through decoration-red-500/50">
                                    {conflict.loser_url}
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600" />
                                <div className="flex-1 p-2 rounded bg-slate-950/50 border border-green-900/30 text-green-400">
                                    {conflict.winner_url}
                                </div>
                            </div>

                            {conflict.rationale && (
                                <p className="mt-3 text-xs text-slate-500 font-mono pl-2 border-l-2 border-slate-800">
                                    AI_RATIONALE: {conflict.rationale}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
