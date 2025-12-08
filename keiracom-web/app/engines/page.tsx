"use client"

import Link from "next/link"
import { AppHull } from "@/components/layout/AppHull"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Search, Layers, Swords, Target } from "lucide-react"

const ENGINES = [
    {
        id: 1,
        name: "Revenue Shield",
        description: "Protects high-value keywords from ranking decay using SERP analysis.",
        icon: Shield,
        status: "active",
        href: "/engines/revenue"
    },
    {
        id: 2,
        name: "Freshness Attack",
        description: "Auto-injects 'Quality of Life' updates into stale content.",
        icon: Zap,
        status: "active",
        href: "/engines/freshness"
    },
    {
        id: 3,
        name: "Strike Distance",
        description: "Optimizes keywords ranking #4-#10 to hit Top 3 using AI nudges.",
        icon: Target,
        status: "active",
        href: "/engines/strike"
    },
    {
        id: 4,
        name: "Authority Architect",
        description: "Identifies topical gaps and generates pillar content blueprints.",
        icon: Layers,
        status: "training",
        href: "/engines/authority"
    },
    {
        id: 5,
        name: "Cannibalization Resolver",
        description: "Fixes internal competition via 'Highlander Protocol' redirects.",
        icon: Swords,
        status: "active",
        href: "/engines/cannibalization"
    },
    {
        id: 6,
        name: "SERP Heist",
        description: "Steals Featured Snippets by rewriting content to match intent.",
        icon: Search,
        status: "beta",
        href: "/engines/heist"
    }
]

export default function EnginesPage() {
    return (
        <AppHull>
            <div className="p-8 space-y-8 bg-[#050505] min-h-screen">
                <div className="border-b border-slate-800 pb-5">
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3 font-mono">
                        <Zap className="text-[#00E054]" size={32} />
                        ENGINE_ROOM
                    </h1>
                    <p className="text-gray-400 mt-2 font-mono text-sm max-w-2xl">
                        Direct control over Keiracom's 6 autonomous SEO engines.
                        Monitor status, trigger manual runs, and configure threshold parameters.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ENGINES.map((engine) => (
                        <Card key={engine.id} className="bg-black/40 border-slate-800 hover:border-[#00E054]/50 transition-all group backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-[#00E054]/10 transition-colors">
                                        <engine.icon className="h-6 w-6 text-gray-400 group-hover:text-[#00E054]" />
                                    </div>
                                    <Badge variant="outline" className={`
                                        uppercase text-[10px] tracking-wider font-mono
                                        ${engine.status === 'active' ? 'text-[#00E054] border-[#00E054]/30 bg-[#00E054]/5' :
                                            engine.status === 'beta' ? 'text-purple-400 border-purple-400/30 bg-purple-400/5' :
                                                'text-amber-400 border-amber-400/30 bg-amber-400/5'}
                                    `}>
                                        {engine.status}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl text-white group-hover:text-[#00E054] transition-colors font-mono tracking-tight">
                                    {engine.name}
                                </CardTitle>
                                <CardDescription className="text-gray-500 text-xs font-mono uppercase">
                                    PROTOCOL_E0{engine.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm mb-6 min-h-[40px] font-sans">
                                    {engine.description}
                                </p>
                                <Link
                                    href={engine.href}
                                    className="flex items-center text-xs font-bold text-white/50 hover:text-white transition-colors group/link font-mono uppercase border border-transparent hover:border-slate-700 rounded px-3 py-2 w-fit bg-slate-900/50 hover:bg-slate-900"
                                >
                                    ACCESS_TERMINAL
                                    <ArrowRight className="ml-2 h-3 w-3 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300 text-[#00E054]" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppHull>
    )
}
