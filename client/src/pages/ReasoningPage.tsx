import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PERSPECTIVES } from '@/lib/data';
import { ChevronDown, MessageSquare, AlertTriangle, GitMerge, ArrowRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

export default function ReasoningPage() {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-display font-bold text-slate-900">Multi-Perspective Reasoning</h1>
            <p className="text-sm text-slate-500">Synthesizing insights across distinct epistemic agents</p>
          </div>
          <Link href="/decision">
             <Button>Review Trade-offs <ArrowRight className="ml-2 w-4 h-4" /></Button>
          </Link>
        </div>

        <div className="flex-1 overflow-x-auto p-6 bg-slate-50/50">
          <div className="min-w-[1200px] grid grid-cols-4 gap-6 h-full">
            {PERSPECTIVES.map((perspective) => (
              <div key={perspective.id} className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                
                {/* Header */}
                <div className={cn("p-4 border-b border-slate-100 bg-opacity-30", perspective.bg)}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-white border shadow-sm", perspective.color)}>
                      {perspective.avatar}
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{perspective.name}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full w-3/4 rounded-full", perspective.color.replace('border', 'bg'))} />
                  </div>
                </div>

                {/* Body - Reasoning Chain */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
                    <span>Reasoning Chain</span>
                    <span>Confidence</span>
                  </div>

                  {perspective.reasoning.map((step, idx) => {
                    const stepId = `${perspective.id}-${idx}`;
                    const isExpanded = expandedSteps[stepId];
                    
                    return (
                      <div key={idx} className="relative pl-4 border-l-2 border-slate-100 last:border-0">
                        {/* Connecting Line */}
                        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-100"></div>

                        <div className="bg-white rounded-lg border border-slate-200 p-3 hover:border-slate-300 transition-colors group">
                          <div className="flex justify-between items-start mb-2">
                             <span className={cn(
                               "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border",
                               step.type === 'evidence' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                               step.type === 'risk' ? "bg-red-50 text-red-700 border-red-100" :
                               "bg-slate-50 text-slate-600 border-slate-200"
                             )}>
                               {step.type}
                             </span>
                             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="p-1 hover:bg-slate-100 rounded text-slate-400" title="Challenge Assumption">
                                 <AlertTriangle className="w-3 h-3" />
                               </button>
                               <button className="p-1 hover:bg-slate-100 rounded text-slate-400" title="View Source">
                                 <MessageSquare className="w-3 h-3" />
                               </button>
                             </div>
                          </div>
                          
                          <p className="text-sm text-slate-800 leading-snug font-medium mb-2">
                            {step.text}
                          </p>

                          <div 
                             className="flex items-center text-xs text-slate-400 hover:text-primary cursor-pointer mt-2"
                             onClick={() => toggleStep(stepId)}
                          >
                             {isExpanded ? "Collapse evidence" : "View evidence & context"}
                             <ChevronDown className={cn("ml-1 w-3 h-3 transition-transform", isExpanded ? "rotate-180" : "")} />
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-slate-50 text-xs text-slate-500 bg-slate-50 -mx-3 -mb-3 p-3 rounded-b-lg">
                               <div className="mb-1 font-medium text-slate-700">Source:</div>
                               <div className="mb-2">Internal Policy Doc v2.4 (Section 4)</div>
                               <div className="mb-1 font-medium text-slate-700">Assumptions:</div>
                               <div>Assumes funding continuity through 2026.</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  <Button variant="ghost" className="w-full border border-dashed border-slate-300 text-slate-400 hover:text-primary hover:border-primary/50 text-xs h-8">
                     <GitMerge className="w-3 h-3 mr-2" /> Merge & Synthesize Path
                  </Button>
                </div>

                {/* Footer - Open Questions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs">
                   <div className="font-semibold text-slate-600 mb-1">Open Questions</div>
                   <div className="text-slate-500 italic">"How does this impact local fisheries?"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
