import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const DATA = [
  { subject: 'Cost', A: 120, B: 110, fullMark: 150 },
  { subject: 'Resilience', A: 98, B: 130, fullMark: 150 },
  { subject: 'Ecology', A: 86, B: 130, fullMark: 150 },
  { subject: 'Social', A: 99, B: 100, fullMark: 150 },
  { subject: 'Political', A: 85, B: 90, fullMark: 150 },
  { subject: 'Speed', A: 65, B: 85, fullMark: 150 },
];

export default function DecisionPage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-slate-900">Decision Surface</h1>
          <p className="text-slate-500">Evaluate generated options against key constraints and trade-offs.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Options Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Option A */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
               <div className="ml-2">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="text-xl font-bold text-slate-800">Option A: Enhanced Seawall + Drainage</h3>
                     <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Status Quo Alignment</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-slate-700">68%</span>
                      <span className="text-xs text-slate-400">Score</span>
                   </div>
                 </div>
                 
                 <p className="text-slate-600 mb-6">
                   Rapid implementation of hard infrastructure to protect key assets. High short-term protection but potential long-term ecological debt.
                 </p>

                 <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-700">T</div>
                      <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-700">P</div>
                   </div>
                   <span className="text-xs text-slate-400">Supported by Technical & Policy</span>
                   <div className="flex-1"></div>
                   <Button variant="outline" size="sm">Explore Details</Button>
                 </div>
               </div>
            </div>

            {/* Option B */}
            <div className="bg-white rounded-xl border-2 border-primary/20 p-6 shadow-xl shadow-primary/5 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
               <div className="ml-2">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <h3 className="text-xl font-bold text-slate-800">Option B: Hybrid Living Shoreline</h3>
                       <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Recommended</span>
                     </div>
                     <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Adaptive Resilience</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">92%</span>
                      <span className="text-xs text-slate-400">Score</span>
                   </div>
                 </div>
                 
                 <p className="text-slate-600 mb-6">
                   Phased restoration of marshlands combined with elevated walkways and retreat zones. Maximizes ecological health and long-term viability.
                 </p>

                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-50 rounded p-3 border border-emerald-100">
                      <div className="text-xs font-bold text-emerald-700 uppercase mb-1">Top Benefit</div>
                      <div className="text-sm text-emerald-900">Restores local fisheries (+$2M/yr)</div>
                    </div>
                    <div className="bg-amber-50 rounded p-3 border border-amber-100">
                      <div className="text-xs font-bold text-amber-700 uppercase mb-1">Key Risk</div>
                      <div className="text-sm text-amber-900">Requires 30% private land buy-back</div>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-700">S</div>
                      <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-xs font-bold text-amber-700">I</div>
                   </div>
                   <span className="text-xs text-slate-400">Supported by Systems & Indigenous</span>
                   <div className="flex-1"></div>
                   <Button className="bg-primary hover:bg-primary/90">Select this Path</Button>
                 </div>
               </div>
            </div>
            
          </div>

          {/* Right Column: Trade-offs Chart */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-amber-500" /> Trade-off Analysis
               </h3>
               
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={DATA}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                      <Radar
                        name="Option A"
                        dataKey="A"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        fill="#cbd5e1"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Option B"
                        dataKey="B"
                        stroke="#0f766e"
                        strokeWidth={2}
                        fill="#0f766e"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>
               
               <div className="flex justify-center gap-6 mt-4 text-xs font-medium">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded bg-slate-300"></div>
                     <span className="text-slate-600">Option A</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded bg-primary/60"></div>
                     <span className="text-slate-600">Option B (Hybrid)</span>
                  </div>
               </div>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
              <h4 className="text-sm font-bold text-slate-800 mb-3">What would change this?</h4>
              <ul className="space-y-3">
                 <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                    <p className="text-xs text-slate-600">If <span className="font-semibold">Federal Grant #402</span> is approved, Option B becomes cost-neutral.</p>
                 </li>
                 <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <p className="text-xs text-slate-600">If <span className="font-semibold">Sea Level Rise &gt; 3ft</span>, Option A fails by 2040.</p>
                 </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
