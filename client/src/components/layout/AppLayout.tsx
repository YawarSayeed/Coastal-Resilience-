import React from 'react';
import { useLocation, Link } from 'wouter';
import { 
  Compass, Map, Crosshair, Users, 
  Scale, FileText, Settings, History,
  Info, Shield, Globe, Clock, FileCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SCENARIO } from '@/lib/data';

interface AppLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { path: '/', label: 'Epistemic Intent', icon: Compass },
  { path: '/terrain', label: 'Knowledge Terrain', icon: Map },
  { path: '/strategy', label: 'Foraging Strategy', icon: Crosshair },
  { path: '/reasoning', label: 'Multi-Perspective', icon: Users },
  { path: '/decision', label: 'Decision Surface', icon: Scale },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Left Navigation Rail */}
      <aside className="w-20 lg:w-64 border-r border-slate-200 bg-white flex flex-col z-20 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
            C
          </div>
          <span className="font-display font-bold text-lg hidden lg:block text-slate-900 tracking-tight">Cognisee</span>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                  "flex items-center px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium shadow-sm ring-1 ring-primary/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}>
                  <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
                  <span className="ml-3 hidden lg:block">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary hidden lg:block" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center text-slate-400 hover:text-slate-600 cursor-pointer mb-4 px-3">
            <History className="w-5 h-5" />
            <span className="ml-3 hidden lg:block text-sm">History</span>
          </div>
          <div className="flex items-center text-slate-400 hover:text-slate-600 cursor-pointer px-3">
            <Settings className="w-5 h-5" />
            <span className="ml-3 hidden lg:block text-sm">Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 z-10 sticky top-0">
          <div>
            <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wider text-xs mb-0.5">Active Inquiry</h1>
            <div className="flex items-center gap-2">
              <span className="font-display font-medium text-slate-900">{SCENARIO.topic}</span>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded-full font-medium border border-emerald-200">Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Longitudinal Timeline Mini-view */}
            <div className="hidden md:flex items-center bg-slate-100/50 rounded-full px-4 py-1.5 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-slate-300 mr-2"></div>
              <div className="w-8 h-0.5 bg-slate-300 mr-2"></div>
              <div className="w-2 h-2 rounded-full bg-slate-300 mr-2"></div>
              <div className="w-8 h-0.5 bg-slate-300 mr-2"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/20 animate-pulse"></div>
              <span className="ml-3 text-xs font-medium text-slate-600">State: Exploring</span>
            </div>
            
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <Info className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">
              JS
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/50">
          {children}
          
          {/* Bottom Spacer for Provenance Overlay */}
          <div className="h-24"></div>
        </div>

        {/* Provenance & Sovereignty Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3 z-30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
              <FileCheck className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Last Insight Provenance</div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                 <span className="font-medium">NOAA Sea Level Rise Report 2024</span>
                 <span className="text-slate-300">•</span>
                 <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                    <Users className="w-3 h-3" /> Federal Agency
                 </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pr-4">
             <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium">JURISDICTION</span>
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                   <Globe className="w-3 h-3 text-slate-400" /> US Federal / State
                </span>
             </div>
             <div className="w-px h-8 bg-slate-100"></div>
             <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium">RIGHTS</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                   <Shield className="w-3 h-3" /> Public Domain
                </span>
             </div>
             <div className="w-px h-8 bg-slate-100"></div>
             <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium">CAPTURED</span>
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                   <Clock className="w-3 h-3 text-slate-400" /> {SCENARIO.lastUpdated}
                </span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
