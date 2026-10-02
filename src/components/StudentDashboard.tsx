import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, User, Bell, LogOut, ArrowLeft, Camera, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function StudentDashboard() {
  const { setRole, isSafe, markSafe, reportEmergency, emergencies } = useAppContext();
  const [reporting, setReporting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('Medical Emergency');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const activeEmergency = emergencies[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportEmergency({
      type,
      location,
      description,
      peopleAffected: Math.floor(Math.random() * 20) + 5,
    });
    setReporting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2 text-red-500">
            <ShieldAlert className="w-6 h-6" />
            <span className="text-xl font-bold text-white">SafeCampus</span>
          </div>
          <button onClick={() => setRole(null)} className="text-slate-400 hover:text-white">
            <LogOut className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
          <div className="bg-emerald-500/20 p-6 rounded-full mb-6 animate-pulse">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Emergency Reported Successfully</h2>
          <p className="text-slate-400 text-center mb-8">Help has been notified and is on the way. Please stay calm and follow campus safety protocols.</p>
          
          <div className="glass-panel w-full p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">Emergency Details</h3>
            <div className="flex justify-between">
              <span className="text-slate-400">Type</span>
              <span className="text-white font-medium">{activeEmergency?.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Location</span>
              <span className="text-white font-medium">{activeEmergency?.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">
                {activeEmergency?.status}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setSubmitted(false)}
            className="mt-8 text-slate-400 hover:text-white flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  if (reporting) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col p-4 md:p-8">
        <header className="flex items-center mb-8">
          <button onClick={() => setReporting(false)} className="text-slate-400 hover:text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white">Report Emergency</h2>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 max-w-lg mx-auto w-full space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Emergency Type</label>
            <div className="grid grid-cols-2 gap-3">
              {['Medical Emergency', 'Fire', 'Unsafe Situation', 'Other Emergency'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`p-4 rounded-xl border text-sm font-medium transition ${
                    type === t ? 'border-red-500 bg-red-500/20 text-white' : 'border-slate-700 bg-slate-900 text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Current Location / Classroom</label>
            <input 
              required
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Science Building, Room 102"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Short Description</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe what is happening..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 h-32 resize-none"
            ></textarea>
          </div>

          <button 
            type="button"
            className="w-full bg-slate-900 border border-dashed border-slate-700 rounded-xl p-4 text-slate-400 flex items-center justify-center space-x-2 hover:bg-slate-800 transition"
          >
            <Camera className="w-5 h-5" />
            <span>Upload Image (Optional)</span>
          </button>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-red-900/50 transition-transform active:scale-95 text-lg"
          >
            SUBMIT EMERGENCY
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-4 md:p-8">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-2 text-red-500">
          <ShieldAlert className="w-8 h-8" />
          <span className="text-2xl font-bold text-white hidden md:block">SafeCampus</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-slate-400 hover:text-white relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-3 bg-slate-900 py-2 px-4 rounded-full border border-slate-800">
            <User className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-medium text-white">Alex Student (Mock)</span>
          </div>
          <button onClick={() => setRole(null)} className="text-slate-400 hover:text-white ml-2">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full space-y-8">
        
        <button 
          onClick={() => setReporting(true)}
          className="relative group w-full aspect-square max-w-[320px] rounded-full bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(239,68,68,0.4)] hover:scale-105 transition-all duration-300"
        >
          <ShieldAlert className="w-24 h-24 text-white mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-white font-bold text-2xl tracking-wide">REPORT</span>
          <span className="text-red-100 font-medium text-lg">EMERGENCY</span>
        </button>

        <div className="w-full border-t border-slate-800 my-4 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-slate-950 px-4 text-slate-500 text-sm font-medium">OR</span>
        </div>

        <button 
          onClick={markSafe}
          disabled={isSafe}
          className={`w-full py-6 rounded-2xl flex items-center justify-center space-x-3 text-xl font-bold transition-all ${
            isSafe 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-900/30'
          }`}
        >
          {isSafe ? (
            <>
              <ShieldCheck className="w-7 h-7" />
              <span>YOU ARE MARKED AS SAFE</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-7 h-7" />
              <span>I'M SAFE</span>
            </>
          )}
        </button>

      </main>
    </div>
  );
}
