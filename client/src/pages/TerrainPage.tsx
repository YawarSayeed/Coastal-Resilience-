import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { MOCK_GRAPH_NODES, MOCK_GRAPH_EDGES } from '@/lib/data';
import { ZoomIn, ZoomOut, Maximize, Filter, Play, Pause, SkipBack, SkipForward, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function TerrainPage() {
  const [zoom, setZoom] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeStep, setTimeStep] = useState(30);

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Main Canvas Area */}
        <div className="flex-1 relative bg-slate-50 overflow-hidden">
          
          {/* Canvas Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-white p-1.5 rounded-lg shadow-md border border-slate-200">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(z => Math.min(z + 10, 150))}>
              <ZoomIn className="w-4 h-4 text-slate-600" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(z => Math.max(z - 10, 50))}>
              <ZoomOut className="w-4 h-4 text-slate-600" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Maximize className="w-4 h-4 text-slate-600" />
            </Button>
          </div>

          <div className="absolute top-4 right-6 z-10">
             <Link href="/strategy">
                <Button className="shadow-lg bg-white text-primary hover:bg-slate-50 border border-primary/20">
                   Next: Strategy Selection
                </Button>
             </Link>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-6 left-4 z-10 bg-white/90 backdrop-blur px-4 py-3 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Node Types</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                <span className="text-xs font-medium text-slate-600">Established Fact</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
                <span className="text-xs font-medium text-slate-600">Hypothesis / Inference</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-amber-500 bg-amber-100"></div>
                <span className="text-xs font-medium text-slate-600">Disputed / Conflict</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-slate-300 border-dashed bg-slate-50"></div>
                <span className="text-xs font-medium text-slate-600">Unknown / Missing</span>
              </div>
            </div>
          </div>

          {/* Graph Visualization (Mock) */}
          <div className="w-full h-full flex items-center justify-center cursor-move bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
             <div className="relative w-[800px] h-[600px] transition-transform duration-300" style={{ transform: `scale(${zoom / 100})` }}>
                
                {/* Edges */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {MOCK_GRAPH_EDGES.map((edge, i) => {
                    const fromNode = MOCK_GRAPH_NODES.find(n => n.id === edge.from);
                    const toNode = MOCK_GRAPH_NODES.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    
                    return (
                      <line 
                        key={i}
                        x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                        stroke={edge.type === 'conflict' ? '#f59e0b' : '#cbd5e1'}
                        strokeWidth="2"
                        strokeDasharray={edge.type === 'hypothetical' ? '5,5' : '0'}
                      />
                    );
                  })}
                </svg>

                {/* Nodes */}
                {MOCK_GRAPH_NODES.map((node) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: parseInt(node.id) * 0.1 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div className={`
                      w-6 h-6 rounded-full transition-all duration-300 group-hover:scale-125
                      ${node.type === 'known' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : ''}
                      ${node.type === 'hypothesized' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : ''}
                      ${node.type === 'disputed' ? 'bg-amber-100 border-2 border-amber-500' : ''}
                      ${node.type === 'unknown' ? 'bg-white border-2 border-slate-300 border-dashed' : ''}
                    `}></div>
                    
                    <div className="mt-2 bg-white/90 backdrop-blur px-2 py-1 rounded border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 whitespace-nowrap z-20 pointer-events-none">
                       <p className="text-xs font-medium text-slate-800">{node.label}</p>
                       <p className="text-[10px] text-slate-500">Confidence: {(node.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </motion.div>
                ))}

             </div>
          </div>
        </div>

        {/* Right Sidebar: Analysis */}
        <aside className="w-80 bg-white border-l border-slate-200 shadow-xl shadow-slate-200/50 z-20 flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-display font-bold text-slate-800">Terrain Analysis</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Confidence Distribution */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase">Confidence Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>High Confidence</span>
                  <span>45%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[45%]"></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Uncertain / Hypothesized</span>
                  <span>30%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[30%]"></div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Active Dispute</span>
                  <span>25%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[25%]"></div>
                </div>
              </div>
            </div>

            {/* Missing Data */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                 <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                 <div>
                   <h5 className="text-sm font-semibold text-amber-800 mb-1">Knowledge Gap</h5>
                   <p className="text-xs text-amber-700 leading-relaxed">
                     Critical lack of data regarding <span className="font-medium">sub-surface soil stability</span> in the northern sector.
                   </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Time Slider */}
          <div className="p-5 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between mb-3">
               <span className="text-xs font-semibold text-slate-500 uppercase">Temporal Projection</span>
               <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  2024 - 20{30 + Math.floor(timeStep/2)}
               </span>
            </div>
            
            <Slider 
              defaultValue={[30]} 
              max={100} 
              step={1} 
              className="mb-4"
              onValueChange={(v) => setTimeStep(v[0])}
            />
            
            <div className="flex justify-center gap-2">
               <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <SkipBack className="w-3 h-3" />
               </Button>
               <Button 
                  size="icon" 
                  className={`h-8 w-8 rounded-full ${isPlaying ? 'bg-slate-900' : 'bg-primary'}`}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 pl-0.5" />}
               </Button>
               <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <SkipForward className="w-3 h-3" />
               </Button>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
