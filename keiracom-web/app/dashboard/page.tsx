"use client"

import Link from "next/link"
import { AppHull } from "@/components/layout/AppHull"
import { Shield, Crosshair, Zap, GitBranch, AlertTriangle, Ghost } from "lucide-react"

export default function DashboardPage() {
  return (
    <AppHull>
      <div className="p-4 bg-transparent max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Engine Control Center</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Real-time status of all 6 proprietary engines</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Engine 1: Revenue Shield */}
          <Link href="/engines/revenue" className="group bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-4 hover:shadow-xl transition-all hover:border-green-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Shield className="text-green-600" width={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Revenue Shield</h3>
                  <p className="text-xs text-gray-500">Portfolio Manager</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs font-bold">ACTIVE</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Assets</div>
                <div className="text-xl font-bold dark:text-white">247</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">YES</div>
                <div className="text-xl font-bold text-green-600">8.7</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Swaps</div>
                <div className="text-xl font-bold text-yellow-500">3</div>
              </div>
            </div>
            <div className="h-12 flex items-end gap-1">
              {[60, 75, 55, 85, 100].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t ${i === 4 ? 'bg-green-400 dark:bg-green-500' : 'bg-green-200 dark:bg-green-700'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-1">Portfolio value (5 days)</div>
          </Link>

          {/* Engine 2: Freshness Attack */}
          <Link href="/engines/freshness" className="group bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-4 hover:shadow-xl transition-all hover:border-blue-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Crosshair className="text-blue-600" width={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Freshness Attack</h3>
                  <p className="text-xs text-gray-500">Content Sniper</p>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold">SCANNING</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Stale</div>
                <div className="text-xl font-bold text-red-500">18</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Thin</div>
                <div className="text-xl font-bold text-yellow-500">12</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Vuln</div>
                <div className="text-xl font-bold text-orange-500">7</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">ahrefs.com</span>
                <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-1 rounded">92</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">moz.com</span>
                <span className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 px-1 rounded">84</span>
              </div>
            </div>
          </Link>

          {/* Engine 3: Strike Distance */}
          <Link href="/engines/strike" className="group bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-4 hover:shadow-xl transition-all hover:border-yellow-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Zap className="text-yellow-600" width={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Strike Distance</h3>
                  <p className="text-xs text-gray-500">Page 1 Accelerator</p>
                </div>
              </div>
              <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded text-xs font-bold">12 OPP</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Rank</div>
                <div className="text-xl font-bold dark:text-white">#14.2</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Gain</div>
                <div className="text-xl font-bold text-green-600">+3.2k</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Wins</div>
                <div className="text-xl font-bold text-purple-500">5</div>
              </div>
            </div>
            <div className="flex gap-2 items-center mb-1">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '60%' }}></div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">60%</span>
            </div>
            <div className="text-xs text-gray-500">Content optimization progress</div>
          </Link>

          {/* Engine 4: Authority Architect */}
          <Link href="/engines/authority" className="group bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-4 hover:shadow-xl transition-all hover:border-purple-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <GitBranch className="text-purple-600" width={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Authority Architect</h3>
                  <p className="text-xs text-gray-500">Topic Gaps</p>
                </div>
              </div>
              <span className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded text-xs font-bold">3 GAPS</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Covered</div>
                <div className="text-xl font-bold text-green-600">12</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                <div className="text-xs text-gray-500">Missing</div>
                <div className="text-xl font-bold text-red-500">3</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="w-full h-8 bg-green-200 dark:bg-green-700 rounded"></div>
              <div className="w-full h-8 bg-green-200 dark:bg-green-700 rounded"></div>
              <div className="w-full h-8 bg-red-200 dark:bg-red-700 rounded animate-pulse"></div>
              <div className="w-full h-8 bg-green-200 dark:bg-green-700 rounded"></div>
            </div>
          </Link>

          {/* Engine 5: Cannibalization */}
          <Link href="/engines/cannibalization" className="group bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-4 hover:shadow-xl transition-all hover:border-red-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center relative">
                  <AlertTriangle className="text-red-600" width={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Cannibalization</h3>
                  <p className="text-xs text-gray-500">Conflicts</p>
                </div>
              </div>
              <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded text-xs font-bold">4 CRIT</span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="bg-red-50 dark:bg-red-900/20 rounded p-2 text-center">
                <div className="text-lg font-bold text-red-600">4</div>
                <div className="text-[10px] text-gray-500">Crit</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-2 text-center">
                <div className="text-lg font-bold text-yellow-600">8</div>
                <div className="text-[10px] text-gray-500">Warn</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2 text-center">
                <div className="text-lg font-bold text-purple-600">2.4k</div>
                <div className="text-[10px] text-gray-500">Lost</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 text-center">
                <div className="text-lg font-bold text-green-600">12</div>
                <div className="text-[10px] text-gray-500">Fixed</div>
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs">
              <span className="font-mono">"best seo tools 2024"</span> • 2 URLs
            </div>
          </Link>

          {/* Engine 6: SERP Heist */}
          <Link href="/engines/heist" className="group bg-white dark:bg-dd-panel border border-dd-light-border dark:border-dd-border rounded-lg p-4 hover:shadow-xl transition-all hover:border-purple-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Ghost className="text-purple-600" width={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">SERP Heist</h3>
                  <p className="text-xs text-gray-500">Snippet Thief</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                RUN
              </span>
            </div>
            <div className="bg-black rounded p-3 font-mono text-xs text-green-500 mb-3 h-24 overflow-hidden">
              <div>[+] Target: ahrefs.com</div>
              <div>[!] Weak snippet detected</div>
              <div className="text-purple-400">[✓] Generated</div>
              <div className="animate-pulse">_</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div>
                <div className="text-gray-500">Queue</div>
                <div className="font-bold dark:text-white">2</div>
              </div>
              <div>
                <div className="text-gray-500">Active</div>
                <div className="font-bold text-blue-600">1</div>
              </div>
              <div>
                <div className="text-gray-500">Done</div>
                <div className="font-bold text-green-600">1</div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </AppHull>
  )
}