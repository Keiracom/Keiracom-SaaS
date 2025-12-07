"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, Search, Globe } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Cell, PieChart, Pie } from "recharts"

// --- Mock Data for UI Dev ---
const gapData = [
  { name: "AppSumo", value: 35 },
  { name: "RepWin", value: 55 },
  { name: "HubSpot", value: 20 },
  { name: "G2", value: 45 },
  { name: "SEO Platform", value: 15 },
]

const activityData = [
  { name: "Week 1", count: 2 },
  { name: "Week 2", count: 5 },
  { name: "Week 3", count: 8 },
  { name: "Week 4", count: 12 },
  { name: "Week 5", count: 18 },
]

const winningData = [
  { name: "Video (40%)", value: 40, color: "#00E054" },
  { name: "Case Study (20%)", value: 20, color: "#1F1F1F" },
  { name: "Guide (10%)", value: 10, color: "#333333" },
]

export default function DashboardPage() {
  return (
    <AppHull>
      <div className="grid grid-cols-12 gap-6 p-6">

        {/* 1. Report Configuration Module (Top Full Width) */}
        <Card className="col-span-12 border-[#1F1F1F] bg-[#0A0A0A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm text-[#888] font-normal uppercase tracking-wider">Report Configuration Module</CardTitle>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1F1F1F] rounded text-sm text-white font-mono border border-[#333]">
                  <Globe size={14} className="text-[#666]" />
                  semrush.com
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1F1F1F] rounded text-sm text-[#888] font-mono border border-[#333]">
                  <Search size={14} className="text-[#666]" />
                  AI SEO Software
                </div>
                <button className="px-4 py-1.5 bg-[#00E054] text-black font-bold text-sm rounded hover:bg-[#00c044] transition-colors">
                  Save & Schedule Analytic
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#666] text-xs uppercase mb-1">Total Gaps Identified</div>
              <div className="text-4xl font-bold text-[#00E054] font-mono">125</div>
            </div>
          </CardHeader>
        </Card>

        {/* 2. Competitor Domain Intelligence (Top Left) */}
        <Card className="col-span-12 md:col-span-5 border-[#1F1F1F] bg-[#0A0A0A]">
          <CardHeader>
            <CardTitle>Competitor Domain</CardTitle>
            <p className="text-xs text-[#666] mt-1">Analysis Status: Processing Intelligence with Gemini Agent...</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Alerts */}
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded flex items-start gap-3">
              <AlertTriangle className="text-red-500 mt-0.5" size={16} />
              <div>
                <div className="text-red-500 text-xs font-bold uppercase mb-0.5">High Value Alert</div>
                <div className="text-sm text-[#ccc]">Content Intelligence increased to <span className="text-white font-mono">$35.00 CPC</span></div>
              </div>
            </div>

            <div className="p-3 bg-[#00E054]/10 border border-[#00E054]/20 rounded flex items-start gap-3">
              <TrendingUp className="text-[#00E054] mt-0.5" size={16} />
              <div>
                <div className="text-[#00E054] text-xs font-bold uppercase mb-0.5">High Value Alert</div>
                <div className="text-sm text-[#ccc]">High Traffic Volume Opportunity: <span className="text-white font-mono">Generative AI</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Actionable Insight Feed (Top Right) */}
        <Card className="col-span-12 md:col-span-7 border-[#1F1F1F] bg-[#0A0A0A]">
          <CardHeader>
            <CardTitle>Actionable Insight Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "The AI Steps: 3 Titles to Create Now",
                "Top 5 Gemini's just updated their pricing page.",
                "The AI Content Audit: Your 2026 Platform",
                "Building an Generative SEO Stack"
              ].map((insight, i) => (
                <div key={i} className="flex items-center gap-3 p-3 hover:bg-[#111] rounded cursor-pointer transition-colors group">
                  <div className="h-6 w-6 rounded-full bg-[#1F1F1F] text-[#666] flex items-center justify-center text-xs font-mono group-hover:bg-[#00E054] group-hover:text-black transition-colors">
                    {i + 1}
                  </div>
                  <span className="text-sm text-[#ccc] group-hover:text-white">{insight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4. Strategic Gap Opportunities (Bar Chart) */}
        <Card className="col-span-12 md:col-span-6 border-[#1F1F1F] bg-[#0A0A0A]">
          <CardHeader>
            <CardTitle>Strategic Gap Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gapData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#333', color: '#fff' }}
                  itemStyle={{ color: '#00E054' }}
                />
                <Bar dataKey="value" fill="#00E054" radius={[4, 4, 0, 0]}>
                  {gapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 ? '#00E054' : '#1F1F1F'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-xs text-[#666] mt-2 text-center">Opportunity: 15 High-Value Gaps</div>
          </CardContent>
        </Card>

        {/* 5. Winning Concept Breakdown (Donut) */}
        <Card className="col-span-12 md:col-span-6 border-[#1F1F1F] bg-[#0A0A0A]">
          <CardHeader>
            <CardTitle>Winning Concept Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-between px-8">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={winningData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {winningData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-sm text-[#ccc]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00E054]"></div>
                <span>Video (40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1F1F1F]"></div>
                <span>Case Study (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#333333]"></div>
                <span>Guide (10%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Content Activity Tracker (Line Chart) */}
        <Card className="col-span-12 border-[#1F1F1F] bg-[#0A0A0A]">
          <CardHeader>
            <CardTitle>Content Activity Tracker</CardTitle>
            <CardDescription>Competitor Publishing Frequency (Last 90 Days)</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#333', color: '#fff' }}
                />
                <Line type="monotone" dataKey="count" stroke="#00E054" strokeWidth={2} dot={{ fill: '#00E054', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </AppHull>
  )
}