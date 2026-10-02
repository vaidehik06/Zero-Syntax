import React from 'react';
import { Shield, ShieldAlert, Users, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function Landing() {
  const { setRole } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="p-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3 text-red-500">
          <ShieldAlert className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight text-white">SafeCampus</span>
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => setRole('student')}
            className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition"
          >
            Enter as Student
          </button>
          <button 
            onClick={() => setRole('admin')}
            className="px-4 py-2 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Enter as Admin
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
          One Click. Immediate Help.
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-12">
          The ultimate smart campus emergency management platform. Report incidents in seconds, confirm your safety, and let administrators respond instantly.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="bg-red-500/20 p-4 rounded-full mb-6">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. REPORT</h3>
            <p className="text-slate-400">Report an emergency instantly with exact location and details.</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="bg-indigo-500/20 p-4 rounded-full mb-6">
              <Users className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. RESPOND</h3>
            <p className="text-slate-400">Admins receive the alert, monitor the situation, and dispatch help.</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="bg-emerald-500/20 p-4 rounded-full mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. CONFIRM SAFETY</h3>
            <p className="text-slate-400">Students in the affected area confirm they are safe, updating live counters.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
