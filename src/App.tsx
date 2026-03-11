import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart4, 
  History, 
  FileText, 
  Settings, 
  Search, 
  Database, 
  Shuffle, 
  Upload, 
  Settings2, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Terminal, 
  Copy,
  Activity,
  CheckCircle2,
  Filter,
  ArrowRight,
  Zap,
  Shield,
  Cloud,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlgorithmType, SearchAlgorithmType, SortingStep, QueryLog } from './types';
import { bubbleSort, quickSort, mergeSort } from './lib/algorithms';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type View = 'landing' | 'dashboard' | 'query';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900 font-sans selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('dashboard')} onQuery={() => setView('query')} />
        ) : (
          <div key="app" className="flex flex-col h-screen overflow-hidden">
            <Header view={view} setView={setView} />
            <div className="flex flex-1 overflow-hidden">
              {view === 'dashboard' && <Dashboard />}
              {view === 'query' && <QueryAnalysis />}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Components ---

function Header({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shrink-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={() => setView('landing')}>
          <BarChart4 className="w-8 h-8 font-bold" />
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">AlgoSort</h2>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setView('dashboard')}
            className={cn(
              "text-sm font-medium transition-colors pb-1 border-b-2",
              view === 'dashboard' ? "text-primary border-primary font-semibold" : "text-slate-500 border-transparent hover:text-primary"
            )}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setView('query')}
            className={cn(
              "text-sm font-medium transition-colors pb-1 border-b-2",
              view === 'query' ? "text-primary border-primary font-semibold" : "text-slate-500 border-transparent hover:text-primary"
            )}
          >
            Query Analysis
          </button>
          <button className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">History</button>
          <button className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">Documentation</button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            className="w-64 pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50" 
            placeholder="Search algorithms..." 
          />
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 cursor-pointer overflow-hidden">
          <img 
            alt="Profile" 
            src="https://picsum.photos/seed/user/100/100" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}

function LandingPage({ onStart, onQuery }: { onStart: () => void; onQuery: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      <header className="flex items-center justify-between px-6 md:px-20 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white">
            <BarChart4 className="w-6 h-6" />
          </div>
          <h2 className="text-slate-900 text-xl font-bold tracking-tight">DataSort Pro</h2>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#">Home</a>
            <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#">Sorting</a>
            <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#">Query</a>
          </nav>
          <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-sm">
            Sign Up
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-6 md:px-20 py-12 md:py-24 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  v2.4 Engine Active
                </div>
                <h1 className="text-slate-900 text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                  Efficient Data Sorting & <span className="text-primary">Query Processing</span> System
                </h1>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl">
                  Experience lightning-fast data organization and retrieval with our advanced algorithmic engine. Optimized for large-scale datasets.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onStart}
                  className="min-w-[200px] bg-primary text-white h-14 px-8 rounded-xl font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center"
                >
                  Start Sorting System
                </button>
                <button 
                  onClick={onQuery}
                  className="min-w-[200px] bg-white border border-slate-200 text-slate-900 h-14 px-8 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  Open Query Processing
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center p-8 border border-white/50 shadow-2xl overflow-hidden">
                <div className="w-full h-full rounded-2xl bg-slate-900 shadow-inner overflow-hidden border border-slate-700 p-6 font-mono text-xs text-emerald-400">
                  <div className="space-y-3">
                    <p className="text-primary">&gt; Initializing Quicksort Algorithm...</p>
                    <p className="text-slate-500">Processing partition 0..4096</p>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '66%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-primary" 
                      />
                    </div>
                    <p>&gt; Buffer allocation successful</p>
                    <p>&gt; Hash map index built in 14ms</p>
                    <p className="text-white">&gt; Querying database: SELECT * FROM nodes WHERE weight &gt; 0.8</p>
                    <div className="grid grid-cols-4 gap-2 pt-4">
                      {[40, 100, 30, 75].map((h, i) => (
                        <div key={i} className="h-16 bg-primary/20 border border-primary/40 rounded flex items-end p-1">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' }}
                            className="w-full bg-primary rounded-sm" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-20 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 mb-12">
              <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Core Algorithms</h2>
              <div className="h-1.5 w-20 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Merge Sort', desc: 'Stable O(n log n) sorting for linked structures.', icon: <Shuffle className="w-6 h-6" /> },
                { title: 'Quick Sort', desc: 'Highly efficient cache-friendly partitioning.', icon: <Zap className="w-6 h-6" /> },
                { title: 'Binary Search', desc: 'Logarithmic time complexity retrieval.', icon: <Search className="w-6 h-6" /> },
                { title: 'Hashing', desc: 'Constant time lookup using optimized hash functions.', icon: <Database className="w-6 h-6" /> },
              ].map((algo, i) => (
                <div key={i} className="group bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-primary transition-all hover:shadow-xl cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {algo.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{algo.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{algo.desc}</p>
                  <div className="flex items-center text-primary text-xs font-bold gap-1">
                    <span>VIEW LOGIC</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-20 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary aspect-square rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center shadow-lg shadow-primary/20">
                <Zap className="w-10 h-10 mb-2" />
                <span className="text-3xl font-bold">14ms</span>
                <span className="text-xs uppercase font-semibold opacity-80">Avg Response</span>
              </div>
              <div className="bg-slate-900 aspect-square rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center">
                <Database className="w-10 h-10 mb-2" />
                <span className="text-3xl font-bold">PB</span>
                <span className="text-xs uppercase font-semibold opacity-80">Scalability</span>
              </div>
              <div className="bg-slate-200 aspect-square rounded-2xl flex flex-col items-center justify-center text-slate-900 p-6 text-center">
                <Shield className="w-10 h-10 mb-2" />
                <span className="text-3xl font-bold">AES</span>
                <span className="text-xs uppercase font-semibold opacity-80">Data Security</span>
              </div>
              <div className="bg-emerald-500 aspect-square rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center shadow-lg shadow-emerald-500/20">
                <Cloud className="w-10 h-10 mb-2" />
                <span className="text-3xl font-bold">99.9%</span>
                <span className="text-xs uppercase font-semibold opacity-80">Uptime SLA</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-slate-900 text-4xl font-bold tracking-tight">Key Features</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our system is built for the modern data stack, ensuring your operations remain efficient as your data volume grows.
                </p>
              </div>
              <ul className="space-y-6">
                {[
                  'Real-time Parallel Processing',
                  'Intensive Memory Management',
                  'Custom Query Language'
                ].map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{feature}</h4>
                      <p className="text-slate-600 text-sm">Optimized for high-speed relational data retrieval and zero-bottleneck performance.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 md:px-20 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-white">
              <BarChart4 className="w-4 h-4" />
            </div>
            <span className="text-slate-900 font-bold">DataSort Pro</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Documentation</a>
          </div>
          <div className="text-slate-400 text-sm">
            © 2026 DataSort Systems Inc.
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function Dashboard() {
  const [numElements, setNumElements] = useState(25);
  const [speed, setSpeed] = useState(85);
  const [isStepByStep, setIsStepByStep] = useState(false);
  const [activeAlgo, setActiveAlgo] = useState<AlgorithmType>('merge');
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: numElements }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArray);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    setTimeElapsed(0);
  };

  useEffect(() => {
    generateRandomArray();
  }, [numElements]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      const delay = 1000 - (speed * 10);
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
        setTimeElapsed(prev => prev + Math.floor(Math.random() * 10) + 5);
      }, delay);
    } else if (currentStepIdx >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps, speed]);

  const handleStart = () => {
    if (steps.length === 0) {
      let newSteps: SortingStep[] = [];
      if (activeAlgo === 'bubble') newSteps = bubbleSort(array);
      if (activeAlgo === 'quick') newSteps = quickSort(array);
      if (activeAlgo === 'merge') newSteps = mergeSort(array);
      setSteps(newSteps);
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const currentStep = steps[currentStepIdx] || { array, comparing: [], swapping: [], sorted: [], message: 'Ready to sort' };

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-72 border-r border-slate-200 bg-white overflow-y-auto p-6 flex flex-col gap-6 shrink-0">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Database className="w-4 h-4" /> Dataset Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Number of Elements</label>
              <input 
                className="w-full rounded-lg border-slate-200 bg-slate-50 focus:ring-primary focus:border-primary text-sm" 
                type="number" 
                value={numElements}
                onChange={(e) => setNumElements(Math.min(100, Math.max(5, parseInt(e.target.value) || 5)))}
              />
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={generateRandomArray}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow-sm"
              >
                <Shuffle className="w-4 h-4" /> Generate Random
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-all">
                <Upload className="w-4 h-4" /> Upload CSV
              </button>
            </div>
          </div>
        </div>
        <hr className="border-slate-100" />
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Settings2 className="w-4 h-4" /> Control Panel
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500">Visualization Speed</span>
                <span className="text-primary font-bold">{speed}%</span>
              </div>
              <input 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                type="range" 
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2">
              <input 
                className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" 
                id="step-by-step" 
                type="checkbox" 
                checked={isStepByStep}
                onChange={(e) => setIsStepByStep(e.target.checked)}
              />
              <label className="text-sm text-slate-700" htmlFor="step-by-step">Enable Step-by-Step</label>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Algorithm Library</h3>
            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">4 Algorithms Loaded</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'merge', title: 'Merge Sort', complexity: 'O(n log n)', type: 'Divide & Conquer', icon: <Shuffle className="w-5 h-5" /> },
              { id: 'quick', title: 'Quick Sort', complexity: 'O(n log n)', type: 'In-place Sorting', icon: <Zap className="w-5 h-5" /> },
              { id: 'bubble', title: 'Bubble Sort', complexity: 'O(n²)', type: 'Simple Exchange', icon: <History className="w-5 h-5" /> },
              { id: 'heap', title: 'Heap Sort', complexity: 'O(n log n)', type: 'Priority Queue', icon: <Database className="w-5 h-5" /> },
            ].map((algo) => (
              <button 
                key={algo.id}
                onClick={() => {
                  setActiveAlgo(algo.id as AlgorithmType);
                  setSteps([]);
                  setCurrentStepIdx(0);
                  setIsPlaying(false);
                }}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden group",
                  activeAlgo === algo.id 
                    ? "bg-white border-primary shadow-md" 
                    : "bg-white border-slate-200 hover:border-primary/50"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activeAlgo === algo.id ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500 group-hover:text-primary"
                  )}>
                    {algo.icon}
                  </div>
                  {activeAlgo === algo.id && (
                    <span className="text-[10px] font-bold uppercase text-primary">Active</span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900">{algo.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{algo.complexity} - {algo.type}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[450px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-slate-800">Sorting Visualization</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-tight">Time</span>
                  <span className="text-sm font-mono text-primary font-bold">{timeElapsed}ms</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    disabled={currentStepIdx === 0}
                    onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors disabled:opacity-30"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleStart}
                    className="p-3 bg-primary text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button 
                    disabled={currentStepIdx >= steps.length - 1 && steps.length > 0}
                    onClick={() => {
                      if (steps.length === 0) {
                        let newSteps: SortingStep[] = [];
                        if (activeAlgo === 'bubble') newSteps = bubbleSort(array);
                        if (activeAlgo === 'quick') newSteps = quickSort(array);
                        if (activeAlgo === 'merge') newSteps = mergeSort(array);
                        setSteps(newSteps);
                        setCurrentStepIdx(1);
                      } else {
                        setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1));
                      }
                    }}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors disabled:opacity-30"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-8 flex items-end justify-between gap-1 overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              {currentStep.array.map((val, idx) => {
                const isComparing = currentStep.comparing.includes(idx);
                const isSwapping = currentStep.swapping.includes(idx);
                const isSorted = currentStep.sorted.includes(idx);

                return (
                  <motion.div 
                    layout
                    key={idx}
                    className={cn(
                      "w-full rounded-t-sm transition-colors duration-200",
                      isComparing ? "bg-primary shadow-[0_0_15px_rgba(0,123,255,0.4)]" :
                      isSwapping ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" :
                      isSorted ? "bg-emerald-500" : "bg-primary/40"
                    )}
                    style={{ height: `${val}%` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm border border-slate-800 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-slate-400 text-xs uppercase font-bold tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Output Buffer
              </h4>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="text-emerald-400 leading-relaxed h-32 overflow-y-auto scrollbar-hide">
              <div className="flex gap-2">
                <span className="text-slate-500 select-none">$</span>
                <span>{activeAlgo}_sort([{array.slice(0, 5).join(', ')}, ...])</span>
              </div>
              {steps.slice(Math.max(0, currentStepIdx - 5), currentStepIdx + 1).map((step, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-500 select-none">[Step {Math.max(0, currentStepIdx - 5) + i + 1}]</span>
                  <span>{step.message}</span>
                </div>
              ))}
              {currentStepIdx === steps.length - 1 && steps.length > 0 && (
                <div className="flex gap-2 font-bold">
                  <span className="text-emerald-500">[Final]</span>
                  <span>[{currentStep.array.join(', ')}]</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function QueryAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [algorithm, setAlgorithm] = useState<SearchAlgorithmType>('binary');
  const [logs, setLogs] = useState<QueryLog[]>([
    { id: '1', queryId: 'UID_10294', algorithm: 'binary', time: 0.012, comparisons: 12, status: 'found', timestamp: '2 mins ago' },
    { id: '2', queryId: 'UID_88273', algorithm: 'hashing', time: 0.002, comparisons: 1, status: 'found', timestamp: '14 mins ago' },
    { id: '3', queryId: 'UID_00291', algorithm: 'binary', time: 0.034, comparisons: 28, status: 'not_found', timestamp: '22 mins ago' },
  ]);

  const performanceData = [
    { name: 'Iter 1', binary: 0.1, hashing: 0.01 },
    { name: 'Iter 5', binary: 0.15, hashing: 0.012 },
    { name: 'Iter 10', binary: 0.12, hashing: 0.009 },
    { name: 'Iter 15', binary: 0.25, hashing: 0.011 },
    { name: 'Iter 20', binary: 0.22, hashing: 0.01 },
    { name: 'Iter 25', binary: 0.35, hashing: 0.012 },
    { name: 'Iter 30', binary: 0.3, hashing: 0.011 },
  ];

  const handleSearch = () => {
    if (!searchTerm) return;
    const newLog: QueryLog = {
      id: Date.now().toString(),
      queryId: searchTerm,
      algorithm: algorithm,
      time: algorithm === 'binary' ? Math.random() * 0.05 : Math.random() * 0.005,
      comparisons: algorithm === 'binary' ? Math.floor(Math.random() * 20) + 5 : 1,
      status: Math.random() > 0.2 ? 'found' : 'not_found',
      timestamp: 'Just now'
    };
    setLogs([newLog, ...logs]);
    setSearchTerm('');
  };

  return (
    <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
      <section className="space-y-2">
        <h1 className="text-slate-900 text-3xl font-black tracking-tight">Query Processing Analysis</h1>
        <p className="text-slate-500 text-lg">Real-time performance benchmarking and search algorithm optimization</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-slate-900 text-xl font-bold mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" /> Search Interface
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Enter Search Term (Unique ID)</label>
              <div className="flex gap-3">
                <input 
                  className="flex-1 rounded-lg border border-slate-200 bg-white text-slate-900 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary" 
                  placeholder="e.g. UID_99281" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  onClick={handleSearch}
                  className="bg-primary text-white px-8 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                >
                  Execute Search
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Algorithm Selection</label>
              <div className="flex bg-slate-100 p-1.5 rounded-xl">
                <button 
                  onClick={() => setAlgorithm('binary')}
                  className={cn(
                    "flex-1 flex items-center justify-center py-2.5 rounded-lg cursor-pointer transition-all font-bold text-sm",
                    algorithm === 'binary' ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  Binary Search (O(log n))
                </button>
                <button 
                  onClick={() => setAlgorithm('hashing')}
                  className={cn(
                    "flex-1 flex items-center justify-center py-2.5 rounded-lg cursor-pointer transition-all font-bold text-sm",
                    algorithm === 'hashing' ? "bg-white shadow-sm text-primary" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  Hashing (O(1) Avg)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <h2 className="text-slate-900 text-xl font-bold mb-4">Latest Results</h2>
          <div className="space-y-4 flex-1">
            <div className={cn(
              "flex items-center justify-between p-3 border rounded-lg",
              logs[0]?.status === 'found' ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"
            )}>
              <span className="font-medium">Status</span>
              <span className="flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-4 h-4" /> {logs[0]?.status === 'found' ? 'Found' : 'Not Found'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Comparisons</p>
                <p className="text-2xl font-black text-slate-900">{logs[0]?.comparisons || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Execution Time</p>
                <p className="text-2xl font-black text-primary">{logs[0]?.time.toFixed(3) || '0.000'}ms</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Download Report
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-slate-900 text-xl font-bold">Performance Comparison</h2>
            <p className="text-slate-500 text-sm">Execution time trends over multiple query iterations</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs font-semibold text-slate-600 uppercase">Binary Search</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <span className="text-xs font-semibold text-slate-600 uppercase">Hashing</span>
            </div>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorBinary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007bff" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#007bff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                tickFormatter={(val) => `${val}ms`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="binary" 
                stroke="#007bff" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorBinary)" 
              />
              <Area 
                type="monotone" 
                dataKey="hashing" 
                stroke="#94a3b8" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                fill="transparent" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-slate-900 text-lg font-bold">Historical Query Logs</h2>
          <button className="text-primary text-sm font-bold flex items-center gap-1">
            <Filter className="w-4 h-4" /> Filter Logs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Query ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Algorithm</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time (ms)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Comparisons</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-slate-600">{log.queryId}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 capitalize">{log.algorithm} Search</td>
                  <td className="px-6 py-4 text-slate-600">{log.time.toFixed(3)}</td>
                  <td className="px-6 py-4 text-slate-600">{log.comparisons}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-black uppercase",
                      log.status === 'found' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {log.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
