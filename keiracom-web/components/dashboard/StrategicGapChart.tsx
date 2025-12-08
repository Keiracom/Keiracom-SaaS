"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AuthorityGap } from "@/types/engines"

const mockGaps: AuthorityGap[] = [
    { cluster_name: "Dental Implants", gap_score: 100, opportunity_volume: 1200 },
    { cluster_name: "Cosmetic Veneers", gap_score: 85, opportunity_volume: 800 },
    { cluster_name: "Teeth Whitening", gap_score: 60, opportunity_volume: 2400 },
    { cluster_name: "Emergency Care", gap_score: 45, opportunity_volume: 3000 },
    { cluster_name: "Pediatric", gap_score: 20, opportunity_volume: 1500 },
]

export function StrategicGapChart() {
    return (
        <Card className="col-span-1 bg-black/40 border-slate-800 backdrop-blur-sm shadow-xl">
            <CardHeader>
                <CardTitle className="text-slate-100 font-mono tracking-tight">AUTHORITY_GAPS</CardTitle>
                <CardDescription className="text-slate-400 font-mono text-xs">
                    Missing content clusters weighted by search volume.
                    <br />
                    <span className="text-red-500">RED</span> = Critical Gap (&gt;80%)
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockGaps}>
                        <XAxis
                            dataKey="cluster_name"
                            stroke="#64748b"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px" }}
                            itemStyle={{ color: "#e2e8f0", fontFamily: "monospace" }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="opportunity_volume" radius={[4, 4, 0, 0]}>
                            {mockGaps.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.gap_score > 80 ? "#ef4444" : "#22c55e"}
                                    className="transition-all duration-500 hover:opacity-80"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
