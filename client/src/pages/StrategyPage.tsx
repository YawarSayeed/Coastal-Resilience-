import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { FORAGING_MODES } from '@/lib/data';
import { ArrowRight, Scan, Drill, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

// Helper to map icon string to component
const ICONS = {
  Scan, Drill, Zap, Eye
};

export default function StrategyPage() {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-3">Select Foraging Strategy</h1>
          <p className="text-slate-500 max-w-2xl">
            How should Cognisee traverse the knowledge graph? Your choice will shape the depth and breadth of the reasoning process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FORAGING_MODES.map((mode) => {
            const Icon = ICONS[mode.icon as keyof typeof ICONS];
            const isSelected = selected === mode.id;

            return (
              <div 
                key={mode.id}
                onClick={() => setSelected(mode.id)}
                className={cn(
                  "relative p-6 rounded-2xl border-2 transition-all cursor-pointer h-full flex flex-col group",
                  isSelected 
                    ? `border-primary bg-primary/5 shadow-xl shadow-primary/10` 
                    : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
                  mode.color,
                  isSelected ? "bg-white ring-2 ring-primary/20" : ""
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-primary transition-colors">{mode.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
                  {mode.description}
                </p>

                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center absolute top-6 right-6 transition-colors",
                  isSelected ? "border-primary bg-primary text-white" : "border-slate-200"
                )}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Link href="/reasoning">
            <Button 
              size="lg" 
              disabled={!selected}
              className="text-base px-8 h-12 bg-primary hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              Initiate Epistemic Foraging <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
