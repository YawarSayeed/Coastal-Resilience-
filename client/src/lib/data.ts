export const SCENARIO = {
  topic: "Coastal Resilience Strategy: Harborview District",
  context: "Developing a 50-year adaptation plan for a historic coastal district facing sea-level rise and economic transition.",
  lastUpdated: "Today, 10:42 AM"
};

export const MOCK_GRAPH_NODES = [
  { id: '1', x: 50, y: 50, type: 'known', label: 'Sea Level Rise Data (NOAA)', confidence: 0.95 },
  { id: '2', x: 70, y: 30, type: 'hypothesized', label: 'Econ. Impact of Seawall', confidence: 0.6 },
  { id: '3', x: 30, y: 60, type: 'disputed', label: 'Managed Retreat Feasibility', confidence: 0.4 },
  { id: '4', x: 60, y: 70, type: 'unknown', label: 'Long-term Salt Intrusion', confidence: 0.1 },
  { id: '5', x: 40, y: 20, type: 'known', label: 'Historic Zoning Laws', confidence: 0.98 },
  { id: '6', x: 80, y: 60, type: 'hypothesized', label: 'Tourism Shift Pattern', confidence: 0.55 },
];

export const MOCK_GRAPH_EDGES = [
  { from: '1', to: '4', type: 'causal' },
  { from: '1', to: '2', type: 'influence' },
  { from: '5', to: '3', type: 'conflict' },
  { from: '3', to: '2', type: 'tradeoff' },
  { from: '6', to: '2', type: 'correlation' },
];

export const FORAGING_MODES = [
  {
    id: 'breadth',
    title: 'Breadth Scan',
    description: 'Rapidly map adjacent domains and stakeholder concerns.',
    icon: 'Scan',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'depth',
    title: 'Depth Drill',
    description: 'Isolate critical uncertainties and vertically probe evidence chains.',
    icon: 'Drill',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'contradiction',
    title: 'Contradiction Hunt',
    description: 'Seek out epistemic conflicts and data anomalies.',
    icon: 'Zap',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'wisdom',
    title: 'Wisdom Lens',
    description: 'Integrate long-term systemic effects and ethical constraints.',
    icon: 'Eye',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
];

export const PERSPECTIVES = [
  {
    id: 'tech',
    name: 'Scientific / Technical',
    avatar: 'T',
    color: 'border-blue-500',
    bg: 'bg-blue-50',
    reasoning: [
      { step: 1, text: 'NOAA 2024 projections indicate +2ft rise by 2050.', type: 'evidence', confidence: 'high' },
      { step: 2, text: 'Hard infrastructure (seawall) provides max protection.', type: 'inference', confidence: 'medium' },
      { step: 3, text: 'Cost-benefit ratio favorable for 20 years.', type: 'claim', confidence: 'medium' }
    ]
  },
  {
    id: 'policy',
    name: 'Policy / Institutional',
    avatar: 'P',
    color: 'border-slate-500',
    bg: 'bg-slate-50',
    reasoning: [
      { step: 1, text: 'Current zoning forbids new permanent coastal structures.', type: 'constraint', confidence: 'high' },
      { step: 2, text: 'Federal funding requires "nature-based" solutions.', type: 'constraint', confidence: 'high' },
      { step: 3, text: 'Seawall likely permit-denied.', type: 'inference', confidence: 'high' }
    ]
  },
  {
    id: 'indigenous',
    name: 'Indigenous / Experiential',
    avatar: 'I',
    color: 'border-amber-500',
    bg: 'bg-amber-50',
    reasoning: [
      { step: 1, text: 'Oral history: The marsh "breathes" with tides.', type: 'evidence', confidence: 'high' },
      { step: 2, text: 'Static walls kill the estuary nursery.', type: 'inference', confidence: 'high' },
      { step: 3, text: 'Protect the "living edge", not just property.', type: 'claim', confidence: 'high' }
    ]
  },
  {
    id: 'systems',
    name: 'Systems / Ecological',
    avatar: 'S',
    color: 'border-emerald-500',
    bg: 'bg-emerald-50',
    reasoning: [
      { step: 1, text: 'Loss of marsh increases storm surge velocity.', type: 'evidence', confidence: 'high' },
      { step: 2, text: 'Seawall creates "bathtub effect" in heavy rain.', type: 'risk', confidence: 'medium' },
      { step: 3, text: 'Hybrid "living shoreline" offers resilience + adaptation.', type: 'hypothesis', confidence: 'medium' }
    ]
  }
];

export const TIMELINE_EVENTS = [
  { id: 1, date: '2023-01', label: 'Initial Scoping', status: 'resolved' },
  { id: 2, date: '2023-06', label: 'Data Gathering', status: 'resolved' },
  { id: 3, date: '2023-09', label: 'Stakeholder Conflict', status: 'unresolved' },
  { id: 4, date: '2024-02', label: 'Hypothesis: Living Shoreline', status: 'active' },
];
