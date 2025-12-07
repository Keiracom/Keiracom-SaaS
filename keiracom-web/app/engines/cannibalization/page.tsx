"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { AppHull } from "@/components/layout/AppHull"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { AlertTriangle, ArrowRight, Swords } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ConflictData {
    conflict_id: string
    keyword: string
    master_url: string
    master_rank: number
    victim_url: string
    victim_rank: number
    action: string
}

const columns: ColumnDef<ConflictData>[] = [
    {
        accessorKey: "keyword",
        header: "Conflict Keyword",
        cell: ({ row }) => (
            <div className="font-bold text-white flex items-center gap-2">
                <Swords size={16} className="text-red-500" />
                {row.getValue("keyword")}
            </div>
        ),
    },
    {
        accessorKey: "master_url",
        header: "Master Asset (Keep)",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-xs text-[#00E054] font-bold">RANK #{row.original.master_rank}</span>
                <span className="text-xs text-gray-400 truncate max-w-[200px]">{row.original.master_url}</span>
            </div>
        ),
    },
    {
        accessorKey: "victim_url",
        header: "Victim Asset (Fix)",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-xs text-red-500 font-bold">RANK #{row.original.victim_rank}</span>
                <span className="text-xs text-gray-400 truncate max-w-[200px]">{row.original.victim_url}</span>
            </div>
        ),
    },
    {
        accessorKey: "action",
        header: "Resolution",
        cell: ({ row }) => {
            const action = row.getValue("action") as string
            return (
                <Badge variant="outline" className="border-[#00E054] text-[#00E054]">
                    {action} <ArrowRight size={12} className="ml-1" />
                </Badge>
            )
        },
    },
]

export default function CannibalizationPage() {
    const { isLoaded, isSignedIn, getToken } = useAuth()
    const [data, setData] = useState<ConflictData[]>([])
    const [loading, setLoading] = useState(false)
    const [lastRun, setLastRun] = useState<string | null>(null)

    const runScan = async () => {
        setLoading(true)
        try {
            const token = await getToken()

            // Fetch Project ID
            const projRes = await fetch("http://127.0.0.1:8000/api/v1/projects", {
                headers: { Authorization: `Bearer ${token}` }
            })
            const projects = await projRes.json()
            if (projects.length === 0) throw new Error("No Project Found")
            const projectId = projects[0].id

            const res = await fetch(`http://127.0.0.1:8000/api/v1/engines/cannibalization/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                const json = await res.json()
                setData(json)
                setLastRun(new Date().toLocaleTimeString())
            }
        } catch (err) {
            console.error("Failed to run scan", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AppHull>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Cannibalization Resolver</h1>
                        <p className="text-[#666666]">
                            "The Highlander Protocol". <span className="text-red-500">Eliminate internal competition.</span>
                        </p>
                    </div>
                    <Button
                        onClick={runScan}
                        disabled={loading}
                        className="bg-white text-black hover:bg-gray-200 font-bold"
                    >
                        {loading ? <Swords className="mr-2 h-4 w-4 animate-spin" /> : <Swords className="mr-2 h-4 w-4" />}
                        {loading ? "Resolving..." : "Run Conflict Scan"}
                    </Button>
                </div>

                <Card className="bg-[#0A0A0A] border-[#1F1F1F] text-white">
                    <CardHeader className="border-b border-[#1F1F1F]">
                        <div className="flex justify-between items-center">
                            <CardTitle>Conflict Report</CardTitle>
                            {lastRun && <span className="text-xs text-[#666]">Last run: {lastRun}</span>}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {data.length === 0 ? (
                            <div className="p-12 text-center text-[#666]">
                                {loading ? "Executing Protocol..." : "No conflicts detected or scan not run yet."}
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
