"use client"
import { AppHull } from "@/components/layout/AppHull"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeistEnginePage() {
    return (
        <AppHull>
            <div className="p-8 min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center">
                <div className="p-6 bg-slate-900/50 rounded-full mb-6 border border-slate-800">
                    <Search className="h-16 w-16 text-amber-500" />
                </div>
                <h1 className="text-3xl font-bold text-white font-mono mb-2 tracking-tight">SERP_HEIST <span className="text-xs align-top text-slate-500">v3.0</span></h1>
                <p className="text-gray-400 max-w-md font-mono text-sm mb-8">
                    PROTOCOL STATUS: <span className="text-amber-500 animate-pulse">BETA</span><br />
                    Steals Featured Snippets by matching search intent schema.
                </p>
                <div className="flex gap-4">
                    <Button className="bg-amber-500 text-black hover:bg-amber-600 font-bold font-mono">
                        IDENTIFY_TARGETS
                    </Button>
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 font-mono">
                        VIEW_LOOT
                    </Button>
                </div>
            </div>
        </AppHull>
    )
}
