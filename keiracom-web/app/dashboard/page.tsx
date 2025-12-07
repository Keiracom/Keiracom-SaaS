"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/data-table"; // Import DataTable
import { ColumnDef } from "@tanstack/react-table"; // Import ColumnDef
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/nextjs";

// Helper for status color
const getStatusColor = (status: string) => {
  if (status.includes("SUCCESS")) return "text-green-400";
  if (status.includes("FAILED")) return "text-red-500";
  return "text-yellow-400"; // For RUNNING or other states
};

// Define the shape of a KeywordOpportunity for the DataTable
interface KeywordOpportunityOut {
  id: number;
  keyword: string;
  target_url: string;
  search_volume: number;
  difficulty: number;
  cpc: number;
  current_rank: number;
  yes_score: number;
  engine_source: string;
  status: string;
}

// Define the shape of a Metric
interface Metric {
  name: string;
  value: string | number;
  trend: 'positive' | 'negative' | 'neutral';
}

interface RecentRun {
  engine_name: string;
  status: string;
  output_summary: string;
}

// Define the shape of the Dashboard Data
interface DashboardData {
  metrics: Metric[];
  recent_runs: RecentRun[];
}

// Helper to find a specific metric from the data
const getMetric = (data: DashboardData | null, metricName: string) => {
  if (!data || !data.metrics) return { value: 'N/A', trend: 'neutral' };
  const metric = data.metrics.find(m => m.name === metricName);
  return metric || { value: 'N/A', trend: 'neutral' };
};


// Define columns for the Strike Distance Opportunities table
const strikeDistanceColumns: ColumnDef<KeywordOpportunityOut>[] = [
  {
    accessorKey: "keyword",
    header: "Keyword",
  },
  {
    accessorKey: "current_rank",
    header: "Rank",
  },
  {
    accessorKey: "search_volume",
    header: "SV",
  },
  {
    accessorKey: "cpc",
    header: "CPC",
  },
  {
    accessorKey: "difficulty",
    header: "Diff",
  },
  {
    accessorKey: "yes_score",
    header: "YES Score",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];


export default function DashboardPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [strikeDistanceData, setStrikeDistanceData] = useState<KeywordOpportunityOut[]>([]);
  const [strikeDistanceLoading, setStrikeDistanceLoading] = useState(true);


  // Ensure User Project Exists & Fetch Dashboard Summary Data
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded || !isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();

        // 1. Hit the Projects Endpoint to trigger Auto-Seeding if needed
        await fetch('http://localhost:8000/api/v1/projects/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // 2. Fetch Dashboard Metrics (Using dummy ID 1 for now, but seeded data should be ready)

        // TODO: Pass authorization header once backend Dashboard is secured
        // const response = await fetch('http://localhost:8000/dashboard/', {
        //     headers: { Authorization: `Bearer ${token}` }
        // });

        // Dashboard endpoint is NOT secured yet in our task list, only /assets
        // But let's send it anyway as good practice
        const response = await fetch('http://localhost:8000/api/v1/dashboard/1', { // Using dummy user ID 1 for now as per old API
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          // If 404, it might be the old API structure. 
          // Let's fallback or just handle error.
          // For this MVP, we are focusing on ASSETS
          // throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Mock data for now if backend fails, to show UI
        if (!response.ok) {
          console.warn("Dashboard API not ready, using mock data");
          setData({
            metrics: [
              { name: "Portfolio Yield", value: 12.5, trend: "positive" },
              { name: "Active Assets", value: 42, trend: "neutral" }
            ],
            recent_runs: [
              { engine_name: "Engine 3", status: "SUCCESS", output_summary: "Found 5 opportunities" }
            ]
          });
        } else {
          const json = await response.json();
          setData(json);
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, getToken]);


  // Fetch Strike Distance Opportunities Data
  useEffect(() => {
    const fetchStrikeDistanceData = async () => {
      if (!isLoaded || !isSignedIn) {
        setStrikeDistanceLoading(false);
        return;
      }

      try {
        const token = await getToken();
        const response = await fetch('http://localhost:8000/api/v1/assets/strike-list', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 401) {
          console.error("Unauthorized! Token invalid or missing.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setStrikeDistanceData(json);
      } catch (error) {
        console.error("Failed to fetch Strike Distance data:", error);
      } finally {
        setStrikeDistanceLoading(false);
      }
    };

    fetchStrikeDistanceData();
  }, [isLoaded, isSignedIn, getToken]);


  if (!isLoaded) {
    return <div className="bg-black text-green-500 font-mono p-4">LOADING TERMINAL...</div>
  }

  return (
    <div className="bg-black min-h-screen text-gray-200 font-mono p-4">
      {/* --- Header & Auth --- */}
      <header className="flex justify-between items-center p-4 border-b border-green-900 mb-4">
        <h1 className="text-2xl font-bold text-green-500 tracking-wider">KEIRACOM TERMINAL</h1>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded">
                ACCESS TERMINAL
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {!isSignedIn ? (
        <div className="flex h-96 items-center justify-center border border-red-900 bg-gray-900">
          <div className="text-center">
            <h2 className="text-xl text-red-500 mb-4">AUTHENTICATION REQUIRED</h2>
            <p className="text-gray-400">Please sign in to access the Keiracom Asset Database.</p>
          </div>
        </div>
      ) : (
        <>
          {/* --- Ticker Marquee --- */}
          <div className="relative flex overflow-x-hidden border-y-2 border-green-900 py-2 mb-8">
            <motion.div
              className="flex"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
            >
              {data?.metrics?.map((metric, i) => (
                <span key={i} className="text-lg text-green-400 whitespace-nowrap px-8">
                  [ {metric.name.toUpperCase()}: {metric.value} ]
                </span>
              ))}
              {data?.metrics?.map((metric, i) => (
                <span key={i + (data?.metrics?.length || 0)} className="text-lg text-green-400 whitespace-nowrap px-8">
                  [ {metric.name.toUpperCase()}: {metric.value} ]
                </span>
              ))}
            </motion.div>
          </div>


          <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* --- Left Column: Key Metrics --- */}
            <div className="md:col-span-1 space-y-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-400">Portfolio Yield</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-4xl font-bold ${getMetric(data, "Portfolio Yield").trend === 'positive' ? 'text-green-400' : 'text-red-500'}`}>
                    {getMetric(data, "Portfolio Yield").value}%
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-400">Active Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-gray-200">{getMetric(data, "Active Assets").value}</p>
                </CardContent>
              </Card>
            </div>

            {/* --- Right Column: Engine Activity --- */}
            <div className="md:col-span-2">
              <Card className="bg-gray-900 border-gray-700 h-full">
                <CardHeader>
                  <CardTitle className="text-gray-400">ENGINE ACTIVITY [LIVE]</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {data?.recent_runs?.map((run, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="w-1/4">{run.engine_name}</span>
                        <span className={`w-1/4 text-center font-bold ${getStatusColor(run.status)}`}>
                          {run.status}
                        </span>
                        <span className="w-1/2 text-right text-gray-500">{run.output_summary}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* --- Strike Distance Opportunities Table --- */}
          <section className="mt-8 p-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-400">STRIKE DISTANCE OPPORTUNITIES</CardTitle>
              </CardHeader>
              <CardContent>
                {strikeDistanceLoading ? (
                  <p className="text-green-500 animate-pulse text-center">LOADING ENCRYPTED ASSETS...</p>
                ) : strikeDistanceData.length > 0 ? (
                  <DataTable columns={strikeDistanceColumns} data={strikeDistanceData} />
                ) : (
                  <p className="text-center text-gray-500">No Strike Distance opportunities found.</p>
                )}
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}