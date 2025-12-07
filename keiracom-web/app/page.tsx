"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Check, ArrowRight, TrendingUp, Shield, Zap, Map, FileCode, Search, BarChart3, AlertCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
    const [reviewFormVisible, setReviewFormVisible] = useState(false);

    const reviews = [
        {
            name: "Sarah Chen",
            role: "Melbourne Tech Startup",
            content: "We stopped guessing what to update. Keiracom simply tells us 'Page X is decaying, here is the new outline'. We just follow the instructions and traffic recovers."
        },
        {
            name: "Marcus Webb",
            role: "Brisbane Agency Owner",
            content: "The 'Quick Wins' feature paid for the subscription in week one. It found 50+ keywords sticking on Page 2 and gave us the exact semantic updates to push them to Page 1."
        }
    ];

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! Your field report has been submitted for verification.");
        setReviewFormVisible(false);
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">

            {/* --- Header / Hero Section (Terminal Style) --- */}
            <header className="bg-slate-950 text-white relative overflow-hidden">
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />

                {/* Nav */}
                <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">K</div>
                        <div className="text-xl font-bold tracking-tight">KEIRACOM</div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Link href="#features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium hidden sm:block">Logic</Link>
                        <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium hidden sm:block">Pricing</Link>
                        <Link href="/dashboard">
                            <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white hover:text-slate-950 transition-all backdrop-blur-sm">
                                Terminal Login
                            </Button>
                        </Link>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 px-6 pt-20 pb-32 md:pt-32 md:pb-48 max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-medium mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        System Online: v3.0 Active
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight animate-fade-in delay-100">
                        The Automated <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">SEO Analyst.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200 text-balance">
                        Stop analyzing manually. Keiracom monitors your traffic, competitors, and <strong className="text-white">Traffic Value</strong> 24/7—correcting asset decay before it costs you money.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
                        <Link href="#pricing">
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold h-14 px-8 text-lg w-full sm:w-auto rounded-lg shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
                                Protect My Traffic Value
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 h-14 px-8 text-lg w-full sm:w-auto rounded-lg border border-transparent hover:border-white/10">
                                How It Works
                            </Button>
                        </Link>
                    </div>

                    {/* Social Proof (Above Fold) */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-500 text-sm font-medium animate-fade-in delay-300">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" /> $4.2M Ad Spend Saved
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-blue-500" /> 850+ Assets Monitored
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" /> 12k Quick Wins Applied
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Bento Grid / Logic Section --- */}
            <section id="features" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">The Core Difference</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Don't hire a Mechanic.<br />Hire an Asset Manager.</h3>
                        <p className="text-xl text-slate-600 text-balance mb-8">
                            Most tools act like <strong>Mechanics</strong>: they fix 500 random "errors" that generate $0.
                            <br className="hidden md:block" />
                            Keiracom acts like a <strong>Hedge Fund</strong>: we ignore 90% of the noise to focus on the <strong>High-Yield Assets</strong> that actually drive revenue.
                        </p>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                        {/* 1. Value Shield (Hero Box) - Spans 2 cols, 2 rows */}
                        <div className="md:col-span-3 lg:col-span-2 md:row-span-2 glass-card rounded-2xl p-8 flex flex-col justify-between bg-gradient-to-br from-white to-blue-50/50">
                            <div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Value Shield</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    We watch your high-CPC pages like a financial asset. If rankings dip on a "money keyword", you lose equivalent ad spend. We alert you immediately with a fix.
                                </p>
                            </div>
                            <div className="bg-white border ./border-slate-100 rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Activity Log</div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div> -4% Traffic (Key Page)
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> Diagnosed: Cannibalization
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Quick Wins (Medium Box) */}
                        <div className="md:col-span-3 lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-center">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded uppercase">High ROI</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Quick Wins</h3>
                            <p className="text-slate-600 text-sm">
                                Keywords ranking #11-#20 are invisible. We find them and generate semantic updates to push them to Page 1.
                            </p>
                        </div>

                        {/* 3. Content Refreshing (Medium Box) */}
                        <div className="md:col-span-3 lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-center">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded uppercase">Traffic</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Content Refreshing</h3>
                            <p className="text-slate-600 text-sm">
                                Content decays. We flag posts &gt;18mo old that are losing relevance and prescribe a "Skyscraper" refresh.
                            </p>
                        </div>

                        {/* 4. Conflict Resolver (Small Box) */}
                        <div className="md:col-span-2 lg:col-span-1 glass-card rounded-2xl p-6">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                                <FileCode className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Conflict Resolver</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">
                                Fix cannibalization where 2 pages fight for 1 keyword. Merge authority.
                            </p>
                        </div>

                        {/* 5. Authority Architect (Small Box) */}
                        <div className="md:col-span-2 lg:col-span-1 glass-card rounded-2xl p-6">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                                <Map className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Topical Authority</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">
                                Fill "missing nodes" in your topic graph that competitors cover.
                            </p>
                        </div>

                        {/* 6. Snippet Optimization (Small Box) */}
                        <div className="md:col-span-2 lg:col-span-2 glass-card rounded-2xl p-6 flex flex-row items-center gap-6">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex-shrink-0 flex items-center justify-center text-indigo-600">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Snippet Optimization</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Steal Position 0. We analyze the Featured Snippet and rewrite your content to win the box.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Review Section (Social Proof) --- */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 tracking-tight">Verified Field Reports</h2>

                    <div className="grid gap-8">
                        {reviews.map((review, i) => (
                            <div key={i} className="glass-card p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                                <div className="text-6xl text-blue-100 font-serif -mt-4">"</div>
                                <div>
                                    <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
                                        {review.content}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-lg">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{review.name}</div>
                                            <div className="text-sm text-slate-500">{review.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Review Submission --- */}
                    <div className="mt-16 text-center">
                        <Button
                            onClick={() => setReviewFormVisible(!reviewFormVisible)}
                            variant="outline"
                            className="border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-900"
                        >
                            {reviewFormVisible ? "Close Submission Form" : "Submit Your Own Report"}
                        </Button>

                        {reviewFormVisible && (
                            <div className="mt-8 bg-slate-50 p-8 rounded-xl text-left max-w-xl mx-auto border border-slate-200 shadow-inner animate-fade-in">
                                <h3 className="text-lg font-bold text-slate-900 mb-6">Submit Field Report</h3>
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Agent Name</label>
                                        <input required className="w-full p-2 border border-slate-200 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Industry</label>
                                        <input required className="w-full p-2 border border-slate-200 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Outcome</label>
                                        <textarea required className="w-full p-2 border border-slate-200 rounded h-32 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white w-full">Verify & Submit</Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- Pricing Cards --- */}
            <section id="pricing" className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Asset Protection</h2>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Pricing & Deliverables</h2>
                        <p className="text-lg text-slate-600">Choose the level of protection your portfolio needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Startup */}
                        <div className="glass-card rounded-2xl p-8 flex flex-col hover:border-blue-300">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">Startup</h3>
                                <p className="text-sm text-slate-500 mt-2 font-medium">Protect Traffic Value</p>
                            </div>
                            <div className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">$297<span className="text-lg font-normal text-slate-400">/mo</span></div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>25 Key Pages Monitored</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>Basic "Value Shield"</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>Weekly "Refresh" Briefs</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 text-slate-900 h-12">Select Plan</Button>
                        </div>

                        {/* Growth */}
                        <div className="glass-card rounded-2xl p-8 flex flex-col border-blue-500 ring-4 ring-blue-500/10 relative shadow-2xl scale-105 z-10">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                Most Popular
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">Growth</h3>
                                <p className="text-sm text-blue-600 mt-2 font-bold">Increase Traffic Value</p>
                            </div>
                            <div className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">$697<span className="text-lg font-normal text-slate-400">/mo</span></div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>100 Key Pages Monitored</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>"Quick Wins" (Page 2 &rarr; 1)</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>Competitor Gap Analysis</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>Monthly Strategy Ticket</span>
                                </div>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-md shadow-lg shadow-blue-200">Start Growing</Button>
                        </div>

                        {/* Enterprise */}
                        <div className="glass-card rounded-2xl p-8 flex flex-col hover:border-slate-400">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">Enterprise</h3>
                                <p className="text-sm text-slate-500 mt-2 font-medium">Dominate Traffic Share</p>
                            </div>
                            <div className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">$1,297<span className="text-lg font-normal text-slate-400">/mo</span></div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>500 Key Pages Monitored</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>Full "Cannibalization" Audit</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>"Snippet Optimization"</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3" /></div>
                                    <span>White-label Reports</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white h-12">Contact Sales</Button>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="bg-slate-950 text-slate-400 py-16 px-6 text-center text-sm border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-left">
                        <div className="text-white font-bold text-lg mb-2">KEIRACOM</div>
                        <p className="text-slate-500">Automated Intelligence for SEO Assets.</p>
                    </div>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <p className="text-slate-600">© 2025 Keiracom Pty Ltd.</p>
                </div>
            </footer>
        </div>
    );
}
