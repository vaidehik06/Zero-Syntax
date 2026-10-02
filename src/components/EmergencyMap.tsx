import React from 'react';
import { Emergency } from '../types';
import { MapPin, ShieldAlert, HeartPulse, Building } from 'lucide-react';

interface MapProps {
  emergencies: Emergency[];
}

export default function EmergencyMap({ emergencies }: MapProps) {
  // A completely mock map using CSS grid/absolute positioning for a Hackathon demo
  return (
    <div className="relative w-full h-[400px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
      {/* Mock Map Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Campus Buildings */}
      <div className="absolute top-[20%] left-[10%] w-[25%] h-[30%] bg-slate-800 rounded-lg flex items-center justify-center opacity-80 border border-slate-600">
        <span className="text-slate-500 font-bold text-sm">Library West Wing</span>
      </div>
      <div className="absolute top-[10%] right-[15%] w-[30%] h-[20%] bg-slate-800 rounded-lg flex items-center justify-center opacity-80 border border-slate-600">
        <span className="text-slate-500 font-bold text-sm">Science Lab 3</span>
      </div>
      <div className="absolute bottom-[15%] left-[20%] w-[40%] h-[25%] bg-slate-800 rounded-lg flex items-center justify-center opacity-80 border border-slate-600">
        <span className="text-slate-500 font-bold text-sm">Cafeteria</span>
      </div>
      <div className="absolute bottom-[20%] right-[10%] w-[20%] h-[40%] bg-slate-800 rounded-lg flex items-center justify-center opacity-80 border border-slate-600">
        <span className="text-slate-500 font-bold text-sm">Dormitory B</span>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur border border-slate-700 rounded-lg p-3 space-y-2 z-10">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-slate-300">Emergency</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-slate-300">Safe Zone</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-300">First Aid</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-slate-300">Assembly Point</span>
        </div>
      </div>

      {/* Static safe/first-aid markers */}
      <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-emerald-500 p-2 rounded-full shadow-lg shadow-emerald-500/50">
          <Building className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="absolute bottom-[30%] right-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-blue-500 p-2 rounded-full shadow-lg shadow-blue-500/50">
          <HeartPulse className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Render Active Emergencies */}
      {emergencies.filter(e => e.status !== 'RESOLVED').map((em) => (
        <div 
          key={em.id}
          className="absolute flex flex-col items-center z-20 group"
          style={{ 
            // Pseudo-random mapping of lat/lng to percentage on screen
            top: `${(Math.abs(em.lat || 40.712) % 0.01) * 10000}%`, 
            left: `${(Math.abs(em.lng || -74.006) % 0.01) * 10000}%` 
          }}
        >
          <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping"></div>
          <div className="relative bg-red-600 p-2 rounded-full shadow-lg shadow-red-500/50 cursor-pointer hover:scale-110 transition">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          
          <div className="absolute top-10 bg-slate-900 border border-red-500/30 rounded-lg p-2 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
            <p className="font-bold text-white text-sm">{em.type}</p>
            <p className="text-slate-400 text-xs">{em.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
