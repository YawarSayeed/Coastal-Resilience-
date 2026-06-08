import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TourModalProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    title: "Welcome to Cognisee",
    desc: "A platform for navigable uncertainty. We help you map complex problems where facts are disputed or unknown."
  },
  {
    title: "Map the Knowledge Terrain",
    desc: "Don't just search for answers. Visualize the landscape of what is known, disputed, and hypothesized."
  },
  {
    title: "Multi-Perspective Foraging",
    desc: "Break silos by viewing the problem through distinct epistemic lenses: Technical, Policy, Indigenous, and Systems."
  },
  {
    title: "Sovereignty Aware",
    desc: "Every insight tracks its provenance, jurisdiction, and rights status, ensuring ethical knowledge usage."
  }
];

export function TourModal({ open, onClose }: TourModalProps) {
  const [step, setStep] = React.useState(0);

  if (!open) return null;

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100"
        >
          <div className="h-2 bg-gradient-to-r from-primary to-indigo-500" />
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                {step + 1}
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-3">{STEPS[step].title}</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              {STEPS[step].desc}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-primary' : 'w-1.5 bg-slate-200'}`}
                  />
                ))}
              </div>
              <Button onClick={handleNext} className="group">
                {step === STEPS.length - 1 ? "Start Foraging" : "Next"}
                {step === STEPS.length - 1 ? (
                   <Check className="ml-2 w-4 h-4" />
                ) : (
                   <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
