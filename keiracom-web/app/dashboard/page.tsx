"use client"

import { AppHull } from "@/components/layout/AppHull"
import { WinRateTicker } from "@/components/dashboard/WinRateTicker"
import { StrategicGapChart } from "@/components/dashboard/StrategicGapChart"
import { CannibalizationAlert } from "@/components/dashboard/CannibalizationAlert"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AssetsDataGrid } from "@/components/dashboard/AssetsDataGrid"

export default function DashboardPage() {
  return (
    <AppHull>
      <div className="p-6 space-y-6 bg-[#050505] min-h-screen text-slate-200">

        {/* Header */}
        <div className="flex justify-between items-end border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-white mb-1">
              KEIRACOM_EXEC_TERMINAL <span className="text-emerald-500 text-xs align-top">v3.1</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              High-Frequency SEO Trading & Asset Management
            </p>
          </div>
          <div className="text-right font-mono text-xs text-slate-600">
            MARKET_STATUS: <span className="text-emerald-500 animate-pulse">OPEN</span>
          </div>
        </div>

        {/* 1. Ticker Tape (KPIs) */}
        <WinRateTicker />

        {/* 2. Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left: Authority Gaps (Chart) */}
          <div className="col-span-1">
            <StrategicGapChart />
          </div>

          {/* Right: Cannibalization (Alerts) - Spans 2 cols */}
          <div className="col-span-1 md:col-span-2">
            <CannibalizationAlert />
          </div>
        </div>

        {/* 3. Deep Dive (Assets Grid) */}
        <AssetsDataGrid />

      </div>
    </AppHull>
  )
}