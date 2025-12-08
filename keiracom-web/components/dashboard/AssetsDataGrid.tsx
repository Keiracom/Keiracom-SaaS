"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockAssets = [
    { target: "Dental Implants Guide", status: "optimized", engine: "Authority (E4)", score: 98, last_action: "Blueprint Generated" },
    { target: "Cost of Teeth Whitening", status: "conflict", engine: "Cannibalization (E5)", score: 45, last_action: "Redirect Proposed" },
    { target: "Emergency Dentist FAQ", status: "stolen", engine: "SERP Heist (E6)", score: 100, last_action: "Snippet Secured" },
    { target: "Invisalign Reviews 2024", status: "processing", engine: "Freshness (E2)", score: 72, last_action: "Injecting QoS..." },
    { target: "Root Canal Costs", status: "idle", engine: "Strike Dist. (E3)", score: 60, last_action: "Monitoring" },
]

export function AssetsDataGrid() {
    return (
        <Card className="bg-black/40 border-slate-800 backdrop-blur-sm shadow-xl mt-6">
            <CardHeader className="border-b border-slate-800/50 pb-3">
                <CardTitle className="text-slate-100 font-mono text-sm tracking-wider flex items-center justify-between">
                    <span>ASSET_LIQUIDITY_POOL // ACTIVE_TRADES</span>
                    <span className="text-xs text-slate-500 font-normal">Last Sync: 00:00:01</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-950/30">
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableHead className="text-slate-500 font-mono text-xs h-10">TARGET_ASSET</TableHead>
                            <TableHead className="text-slate-500 font-mono text-xs h-10">ENGINE_PROTOCOL</TableHead>
                            <TableHead className="text-slate-500 font-mono text-xs h-10">STATUS</TableHead>
                            <TableHead className="text-right text-slate-500 font-mono text-xs h-10">VALUATION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockAssets.map((asset, i) => (
                            <TableRow key={i} className="border-slate-800 hover:bg-slate-900/50 transition-colors group cursor-pointer">
                                <TableCell className="font-medium text-slate-300 font-mono text-sm">
                                    {asset.target}
                                    <div className="text-[10px] text-slate-600 block md:hidden">{asset.last_action}</div>
                                </TableCell>
                                <TableCell className="font-mono text-slate-500 text-xs hidden md:table-cell">
                                    {asset.engine}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={
                                        asset.status === 'optimized' || asset.status === 'stolen' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5 font-mono text-[10px]" :
                                            asset.status === 'processing' ? "text-blue-500 border-blue-500/20 bg-blue-500/5 animate-pulse font-mono text-[10px]" :
                                                "text-amber-500 border-amber-500/20 bg-amber-500/5 font-mono text-[10px]"
                                    }>
                                        {asset.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono text-slate-300 text-sm">
                                    <span className={asset.score > 90 ? "text-emerald-400" : "text-slate-400"}>
                                        {asset.score}
                                    </span>
                                    <span className="text-slate-700">/100</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
