import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TourModal } from '@/components/onboarding/TourModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLocation } from 'wouter';
import { Sparkles, ArrowRight, HelpCircle, AlertTriangle } from 'lucide-react';
import { SCENARIO } from '@/lib/data';

export default function IntentPage() {
  const [showTour, setShowTour] = useState(true);
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState(SCENARIO.topic);

  return (
    <AppLayout>
      <TourModal open={showTour} onClose={() => setShowTour(false)} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Start your epistemic journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
            What defines your inquiry?
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Cognisee helps you navigate the unknown. Start by framing your intent, and we'll help you map the knowledge terrain.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3 ml-1">Core Epistemic Question</label>
              <div className="relative">
                <textarea 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-2xl font-light text-slate-800 border-0 border-b-2 border-slate-100 focus:border-primary focus:ring-0 px-0 py-4 resize-none transition-colors bg-transparent placeholder:text-slate-300 min-h-[100px]"
                  placeholder="e.g. How might we adapt our coastal infrastructure..."
                />
                <div className="absolute right-0 bottom-4 text-xs text-slate-400 font-medium">
                  {query.length} chars
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" /> Known Unknowns
                </h3>
                <div className="space-y-3">
                   {['Identify disputed facts', 'Flag missing data', 'Highlight contradictions'].map((item, i) => (
                     <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                       <Checkbox id={`check-${i}`} defaultChecked />
                       <Label htmlFor={`check-${i}`} className="font-normal text-slate-600 cursor-pointer">{item}</Label>
                     </div>
                   ))}
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4 text-amber-500" /> Risk Stakes
                </h3>
                 <div className="space-y-3">
                   {['High cost of error', 'Irreversible outcome', 'Multi-stakeholder conflict'].map((item, i) => (
                     <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                       <Checkbox id={`risk-${i}`} defaultChecked={i === 1} />
                       <Label htmlFor={`risk-${i}`} className="font-normal text-slate-600 cursor-pointer">{item}</Label>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-50">
              <Button 
                size="lg" 
                className="text-base px-8 h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                onClick={() => setLocation('/terrain')}
              >
                Map Knowledge Terrain <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="bg-slate-50 px-10 py-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <InfoIcon className="w-3.5 h-3.5" />
            <span>AI will use these parameters to seed the initial foraging graph.</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function InfoIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
