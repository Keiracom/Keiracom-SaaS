"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useUser, SignInButton } from "@clerk/nextjs"
import {
    Activity, LayoutGrid, Shield, Crosshair, Zap, GitBranch, AlertTriangle, Ghost, Sun, Moon, Menu
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AppHullProps {
    children: React.ReactNode
}

const NAV_ITEMS = [
    { label: "Dashboards", icon: LayoutGrid, href: "/dashboard" },
    { label: "Revenue Shield", icon: Shield, href: "/engines/revenue" },
    { label: "Freshness Attack", icon: Crosshair, href: "/engines/freshness" },
    { label: "Strike Distance", icon: Zap, href: "/engines/strike" },
    { label: "Authority Architect", icon: GitBranch, href: "/engines/authority" },
    { label: "Cannibalization", icon: AlertTriangle, href: "/engines/cannibalization" },
    { label: "SERP Heist", icon: Ghost, href: "/engines/heist" },
]

export function AppHull({ children }: AppHullProps) {
    const pathname = usePathname()
    const { isLoaded, isSignedIn } = useUser()
    // Forced Light Mode
    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, [])

    const SidebarIcons = () => (
        <div className="flex flex-col items-center py-4 gap-4 w-full">
            {NAV_ITEMS.map((item, index) => {
                // Dashboard is home, others are engines
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))

                return (
                    <React.Fragment key={item.href}>
                        <Link
                            href={item.href}
                            className={`p-2 rounded transition-colors ${isActive
                                ? "bg-green-100 dark:bg-green-900/20 text-green-600"
                                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                }`}
                            title={item.label}
                        >
                            <item.icon width={20} />
                        </Link>
                        {index === 0 && <div className="w-8 h-px bg-gray-200 dark:bg-dd-border" />}
                    </React.Fragment>
                )
            })}
        </div>
    )

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-dd-light-bg text-dd-light-text font-sans transition-colors duration-300">
            {/* Header */}
            <header className="flex h-12 bg-white border-b border-dd-light-border shrink-0 z-20">
                <div className="w-14 flex items-center justify-center bg-[#50248F]">
                    <Activity className="text-white" width={24} />
                </div>
                <div className="flex-1 flex items-center justify-between px-4">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-gray-900 tracking-wide text-sm">KEIRACOM</span>
                            <span className="font-mono text-[10px] text-gray-500 font-bold">AGENCY OPS</span>
                        </div>

                        <nav className="hidden md:flex gap-1 text-xs font-semibold">
                            <Link href="/dashboard" className="px-3 py-1.5 rounded bg-gray-100 text-gray-900">
                                Dashboards
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4 text-xs">


                        <div className="h-8 w-8 flex items-center justify-center">
                            {isLoaded && isSignedIn ? (
                                <UserButton appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }} />
                            ) : (
                                <SignInButton mode="modal">
                                    <Button size="sm" variant="ghost">Sign In</Button>
                                </SignInButton>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex w-14 bg-white border-r border-dd-light-border flex-col items-center shrink-0 z-10">
                    <SidebarIcons />
                </aside>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="absolute top-2 right-16 text-white">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-20 p-0 bg-white dark:bg-dd-dark border-r border-dd-border">
                            <SidebarIcons />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto grid-bg-light relative">
                    {children}
                </main>
            </div>
        </div>
    )
}
