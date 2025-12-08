"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useUser, SignInButton } from "@clerk/nextjs"
import {
    BarChart3,
    LayoutDashboard,
    Settings,
    Search,
    Menu,
    ShieldCheck,
    Zap,
    Globe,
    RefreshCcw,
    Swords
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface AppHullProps {
    children: React.ReactNode
}

const NAV_ITEMS = [
    { label: "Command Center", icon: LayoutDashboard, href: "/" },
    { label: "Assets (Strike List)", icon: BarChart3, href: "/assets" },
    { label: "Freshness Attack", icon: RefreshCcw, href: "/engines/freshness" },
    { label: "Cannibalization", icon: Swords, href: "/engines/cannibalization" },
    { label: "Engines", icon: Zap, href: "/engines" },
    { label: "Competitors", icon: Globe, href: "/competitors" },
    { label: "Settings", icon: Settings, href: "/settings" },
]

// OLED Dark Mode Sidebar Component (moved outside to avoid React error)
interface SidebarContentProps {
    pathname: string
    isLoaded: boolean | undefined
    isSignedIn: boolean | undefined
    user: unknown
}

const SidebarContent = ({ pathname, isLoaded, isSignedIn, user }: SidebarContentProps) => (
    <div className="flex flex-col h-full bg-[#050505] border-r border-[#1F1F1F] text-[#E0E0E0]">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
            <div className="h-8 w-8 bg-[#00E054] rounded-sm flex items-center justify-center">
                <span className="font-mono font-bold text-black text-xs">K3</span>
            </div>
            <span className="font-mono font-bold text-lg tracking-tight text-white">KEIRACOM</span>
        </div>

        <Separator className="bg-[#1F1F1F]" />

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive
                            ? "bg-[#1F1F1F] text-[#00E054] border border-[#333]"
                            : "text-[#666666] hover:text-white hover:bg-[#0A0A0A]"
                            }`}
                    >
                        <item.icon size={18} />
                        {item.label}
                        {item.label === "Engines" && <Badge variant="outline" className="ml-auto text-[10px] border-[#333] text-[#666666]">6</Badge>}
                    </Link>
                )
            })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-[#1F1F1F]">
            <div className="flex items-center gap-3 px-2 py-2">
                {isLoaded && isSignedIn ? (
                    <>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-8 w-8 ring-2 ring-[#1F1F1F]",
                                    userButtonPopoverCard: "bg-[#0A0A0A] border-[#1F1F1F] text-white"
                                }
                            }}
                        />
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-white truncate max-w-[120px]">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {(user as any)?.fullName || (user as any)?.username}
                            </span>
                            <span className="text-xs text-[#666666] truncate">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {(user as any)?.primaryEmailAddress?.emailAddress}
                            </span>
                        </div>
                    </>
                ) : (
                    <SignInButton mode="modal">
                        <Button variant="outline" className="w-full border-[#333] bg-transparent text-[#666666] hover:text-white hover:bg-[#1F1F1F]">
                            Sign In
                        </Button>
                    </SignInButton>
                )}
            </div>
        </div>
    </div>
)

export function AppHull({ children }: AppHullProps) {
    const pathname = usePathname()
    const { isLoaded, isSignedIn, user } = useUser()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-black text-white font-sans selection:bg-[#00E054] selection:text-black">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
                <SidebarContent pathname={pathname} isLoaded={isLoaded} isSignedIn={isSignedIn} user={user} />
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#1F1F1F] px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-[#00E054] rounded-sm flex items-center justify-center">
                        <span className="font-mono font-bold text-black text-[10px]">K3</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-white">KEIRACOM</span>
                </div>

                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-[#1F1F1F]">
                            <Menu size={20} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 bg-[#050505] border-r border-[#1F1F1F] text-white w-64">
                        <SidebarContent pathname={pathname} isLoaded={isLoaded} isSignedIn={isSignedIn} user={user} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-h-screen bg-black relative">
                {/* Top Bar (Search / Stats) */}
                <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-sm border-b border-[#1F1F1F] h-16 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[#666666] text-sm">
                        <ShieldCheck size={16} className="text-[#00E054]" />
                        <span>System Status: <span className="text-white font-mono">ONLINE</span></span>
                        <Separator orientation="vertical" className="h-4 bg-[#333]" />
                        <span className="font-mono text-xs">v3.0.1-beta</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search mock */}
                        <div className="relative hidden md:flex items-center bg-[#0A0A0A] border border-[#1F1F1F] rounded-full px-3 py-1.5 w-64 transition-all focus-within:border-[#333] focus-within:w-72">
                            <Search size={14} className="text-[#666666] mr-2" />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                className="bg-transparent border-none outline-none text-sm text-white placeholder-[#444] w-full font-mono"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
