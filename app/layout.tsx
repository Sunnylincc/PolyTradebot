import "./globals.css";
import Link from "next/link";
import { Activity, Bot, Brain, Home, LineChart, Settings2, TestTube2 } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/agent-studio", label: "Agent Studio", icon: Bot },
  { href: "/trading-monitor", label: "Trading Monitor", icon: Activity },
  { href: "/memory", label: "Memory Explorer", icon: Brain },
  { href: "/backtest", label: "Backtest / Replay", icon: TestTube2 },
  { href: "/evolution", label: "Evolution Lab", icon: LineChart },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen grid grid-cols-[250px_1fr]">
          <aside className="border-r border-white/10 p-5 bg-black/30">
            <h1 className="font-display text-3xl text-accent">Polysage</h1>
            <p className="text-xs text-white/60 tracking-[0.2em] mt-1">AI-NATIVE POLYMARKET OPS</p>
            <nav className="mt-8 space-y-2">
              {nav.map((item) => (
                <Link key={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/80 hover:text-white" href={item.href}>
                  <item.icon size={16} /> {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
