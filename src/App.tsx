import { useEffect, useState } from 'react';
import { CheckCircle2, Server, Cpu, Layers, RefreshCw, AlertCircle } from 'lucide-react';

interface HealthData {
  status: string;
  kernel: string;
  role: string;
  version: string;
  environment: string;
  serverTime: string;
  uptimeSeconds: number;
  landingPadReady: boolean;
  runtime?: {
    node: string;
    platform: string;
  };
}

export default function App() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data: HealthData = await res.json();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased">
      <main className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Landing Pad Kernel
              </span>
              <span className="text-xs text-slate-500 font-mono">v0.1.0</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mt-1.5">
              OB / NBE Regulatory Reporting
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Full-Stack Application Landing Environment
            </p>
          </div>

          <button
            onClick={fetchHealth}
            disabled={loading}
            className="self-start sm:self-center inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
            title="Refresh status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </header>

        {/* Status Notification */}
        <div className="my-6 p-4 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
          <div className="mt-0.5 shrink-0 text-indigo-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-indigo-100">Ready for Project Import</p>
            <p className="text-indigo-300/80 text-xs mt-0.5">
              This kernel is active and awaits the authoritative OB/NBE application source ZIP. No business features or mock reports are loaded.
            </p>
          </div>
        </div>

        {/* Subsystem Grid */}
        <section aria-label="System Components" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-400 mb-1.5">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium">Node.js Server</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {loading ? 'Checking...' : error ? 'Degraded' : 'Active (Express)'}
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              /api/health 200 OK
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-400 mb-1.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium">Client Runtime</span>
            </div>
            <p className="text-sm font-semibold text-white">React 19 + TS</p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">Vite SPA pipeline</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-400 mb-1.5">
              <Layers className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium">Target Context</span>
            </div>
            <p className="text-sm font-semibold text-white">OB / NBE</p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">Regulatory Reporting</p>
          </div>
        </section>

        {/* Health Diagnostics Panel */}
        <section aria-label="Runtime Telemetry" className="rounded-lg bg-slate-950/80 border border-slate-800/80 p-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Kernel Telemetry</span>
            <span className="text-[10px] text-slate-600">GET /api/health</span>
          </div>

          {loading && !health ? (
            <div className="py-6 flex items-center justify-center text-xs text-slate-500 font-mono">
              Connecting to kernel server...
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 py-3 px-2 text-xs text-rose-400 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : health ? (
            <div className="font-mono text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between py-0.5 border-b border-slate-900">
                <span className="text-slate-500">Status</span>
                <span className="text-emerald-400 font-medium">{health.status}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-900">
                <span className="text-slate-500">Landing Pad Ready</span>
                <span className="text-emerald-400">{health.landingPadReady ? 'true' : 'false'}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-900">
                <span className="text-slate-500">Environment</span>
                <span className="text-slate-300">{health.environment}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-900">
                <span className="text-slate-500">Uptime</span>
                <span className="text-slate-300">{health.uptimeSeconds}s</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-900">
                <span className="text-slate-500">Node Runtime</span>
                <span className="text-slate-300">{health.runtime?.node ?? 'unknown'} ({health.runtime?.platform})</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-500">Server Time</span>
                <span className="text-slate-400 text-[11px]">{health.serverTime}</span>
              </div>
            </div>
          ) : null}
        </section>

        {/* Footer */}
        <footer className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>AI Studio Build Mode • Clean Landing Kernel</span>
          <span className="font-mono">Ready for application source import</span>
        </footer>
      </main>
    </div>
  );
}
