import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import IntentPage from "@/pages/IntentPage";
import TerrainPage from "@/pages/TerrainPage";
import StrategyPage from "@/pages/StrategyPage";
import ReasoningPage from "@/pages/ReasoningPage";
import DecisionPage from "@/pages/DecisionPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={IntentPage} />
      <Route path="/terrain" component={TerrainPage} />
      <Route path="/strategy" component={StrategyPage} />
      <Route path="/reasoning" component={ReasoningPage} />
      <Route path="/decision" component={DecisionPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
