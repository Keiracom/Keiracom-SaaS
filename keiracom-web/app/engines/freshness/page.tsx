"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { AppHull } from "@/components/layout/AppHull"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, AlertTriangle, RefreshCcw, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FreshnessData {
    asset_id: number
    keyword: string
    url: string
    current_rank: number
    last_updated: string
    days_old: number
    freshness_score: number
    status: string
    action: string
}

const columns: ColumnDef<FreshnessData>[] = [
    {
        accessorKey: "keyword",
        header: "Asset",
        cell: ({ row }) => (
            <div>
                <div className="font-bold text-white">{row.getValue("keyword")}</div>
                <div className="text-xs text-blue-400 truncate max-w-[200px]">{row.original.url}</div>
            </div>
        ),
    },
    {
        accessorKey: "days_old",
        header: "Age (Days)",
        cell: ({ row }) => <div className="font-mono text-[#666]">{row.getValue("days_old")}d</div>,
    },
    {
        accessorKey: "freshness_score",
        header: "Freshness",
        cell: ({ row }) => {
            const score = row.getValue("freshness_score") as number
            return (
                <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                        <div
                            className={`h-full ${score < 50 ? 'bg-red-500' : 'bg-[#00E054]'}`}
                            style={{ width: `${score}%` }}
                        />
                    </div>
                    <span className="text-xs text-[#666]">{score}%</span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant="outline" className={`
                ${status === 'CRITICAL DECAY' ? 'border-red-500 text-red-500' :
                        status === 'WARNING' ? 'border-yellow-500 text-yellow-500' : 'border-[#00E054] text-[#00E054]'}
            `}>
                    {status === 'CRITICAL DECAY' && <AlertTriangle size={12} className="mr-1" />}
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "action",
        header: "Recommended Action",
        cell: ({ row }) => <div className="text-xs font-bold text-white uppercase tracking-wider">{row.getValue("action")}</div>,
    },
]

export default function FreshnessEnginePage() {
    const { isLoaded, isSignedIn, getToken } = useAuth()
    const [data, setData] = useState<FreshnessData[]>([])
    const [loading, setLoading] = useState(false)
    const [lastRun, setLastRun] = useState<string | null>(null)

    const runScan = async () => {
        setLoading(true)
        try {
            const token = await getToken()
            // Determine Project ID (For now, hardcoded or fetched from user context. 
            // In real app, we might get it from a global state or previous API call. 
            // We'll fetch the first project from /api/v1/projects or let the backend handle 'current' if we had that.
            // For this demo, let's assuming Backend finds the project or we pass a dummy ID that backend resolves via UserID)
            // Wait, the route accepts project_id in path: /freshness/{project_id}.
            // I need to fetch the project ID first.

            // Quick Fix: Fetch projects first, then scan.
            const projRes = await fetch("http://127.0.0.1:8000/api/v1/projects", {
                headers: { Authorization: `Bearer ${token}` }
            })
            const projects = await projRes.json()
            if (projects.length === 0) throw new Error("No Project Found")
            const projectId = projects[0].id

            const res = await fetch(`http://127.0.0.1:8000/api/v1/engines/freshness/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                const json = await res.json()
                setData(json)
                setLastRun(new Date().toLocaleTimeString())
            }
        } catch (err) {
            console.error("Failed to run freshness scan", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AppHull>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Freshness Attack</h1>
                        <p className="text-[#666666]">
                            Identify and revive decaying content. <span className="text-[#00E054]">Recover lost traffic.</span>
                        </p>
                    </div>
                    <Button
                        onClick={runScan}
                        disabled={loading}
                        className="bg-[#00E054] text-black hover:bg-[#00B342] font-bold"
                    >
                        {loading ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
                        {loading ? "Scanning..." : "Run Freshness Audit"}
                    </Button>
                </div>

                <Card className="bg-[#0A0A0A] border-[#1F1F1F] text-white">
                    <CardHeader className="border-b border-[#1F1F1F]">
                        <div className="flex justify-between items-center">
                            <CardTitle>Decay Report</CardTitle>
                            {lastRun && <span className="text-xs text-[#666]">Last run: {lastRun}</span>}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {data.length === 0 ? (
                            <div className="p-12 text-center text-[#666]">
                                {loading ? "Analyzing Content Age..." : "No decay detected or scan not run yet."}
                            </div>
                        ) : (
                            <DataTable columns={columns} data={data} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppHull>
    )
}
