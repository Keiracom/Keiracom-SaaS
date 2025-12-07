"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs" // Removed useUser
import { AppHull } from "@/components/layout/AppHull"
import { Card, CardContent } from "@/components/ui/card" // Removed CardTitle used CardHeader previously but it was unused too
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Type Definition matching Backend
interface AssetResponse {
    id: number
    keyword: string
    url: string
    current_rank: number
    search_volume: number
    cpc: number
    difficulty: number
    yes_score: number
}

// Columns Configuration
const columns: ColumnDef<AssetResponse>[] = [
    {
        accessorKey: "keyword",
        header: "Keyword",
        cell: ({ row }) => <div className="font-bold text-white">{row.getValue("keyword")}</div>,
    },
    {
        accessorKey: "current_rank",
        header: "Rank",
        cell: ({ row }) => {
            const rank = row.getValue("current_rank") as number
            return (
                <div className="flex items-center gap-2">
                    <span className="text-lg font-mono text-yellow-500">#{rank}</span>
                    {rank > 10 && <ArrowUpRight size={14} className="text-[#00E054]" />}
                </div>
            )
        },
    },
    {
        accessorKey: "search_volume",
        header: "Volume",
        cell: ({ row }) => <div className="font-mono text-[#666]">{row.getValue("search_volume")}</div>,
    },
    {
        accessorKey: "yes_score",
        header: "YES Score",
        cell: ({ row }) => {
            const score = row.getValue("yes_score") as number
            return (
                <Badge variant="outline" className={`
                ${score > 80 ? 'border-[#00E054] text-[#00E054]' :
                        score > 50 ? 'border-yellow-500 text-yellow-500' : 'border-[#333] text-[#666]'}
            `}>
                    {score.toFixed(1)}
                </Badge>
            )
        },
    },
    {
        accessorKey: "difficulty",
        header: "KD%",
        cell: ({ row }) => <div className="text-xs text-[#444]">{row.getValue("difficulty")}%</div>,
    },
]

export default function AssetsPage() {
    const { isLoaded, isSignedIn, getToken } = useAuth()
    const [data, setData] = useState<AssetResponse[]>([])
    const [loading, setLoading] = useState(true)

    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            if (!isSignedIn) return
            try {
                const token = await getToken()
                // Use env var in future, for now localhost is hardcoded but technically wrong for prod
                // Leaving hardcoded for now as per previous state, but we should fix it later.
                const res = await fetch("http://127.0.0.1:8000/api/v1/assets/strike-list", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (!res.ok) {
                    throw new Error(`API Error: ${res.status} ${res.statusText}`)
                }
                const json = await res.json()
                setData(json)
            } catch (err: unknown) { // Fixed: unknown instead of any
                console.error("Failed to fetch assets", err)
                setError((err as Error).message || "Failed to load assets")
            } finally {
                setLoading(false)
            }
        }

        if (isLoaded && isSignedIn) {
            fetchData()
        }
    }, [isLoaded, isSignedIn, getToken])

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                Loading Assets...
            </div>
        )
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                Redirecting to Login...
            </div>
        )
    }

    if (error) {
        return (
            <AppHull>
                <div className="p-8 text-red-500 border border-red-900 bg-red-900/10 rounded-lg">
                    <h3 className="font-bold">Connection Error</h3>
                    <p>Could not reach the Intelligence Engine.</p>
                    <code className="block mt-2 text-xs bg-black p-2 rounded">{error}</code>
                    <p className="mt-4 text-sm text-gray-400">Ensure the backend is running on port 8000.</p>
                </div>
            </AppHull>
        )
    }

    return (
        <AppHull>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Strike List</h1>
                        <p className="text-[#666666]">
                            High-yield opportunities ranking #11-#20. <span className="text-[#00E054]">Fix these first.</span>
                        </p>
                    </div>
                </div>

                <Card className="bg-[#0A0A0A] border-[#1F1F1F] text-white">
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-8 text-center text-[#666]">Scanning SERPs...</div>
                        ) : (
                            <DataTable columns={columns} data={data} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppHull>
    )
}
