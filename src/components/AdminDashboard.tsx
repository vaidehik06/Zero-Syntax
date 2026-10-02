import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { 
  ShieldAlert, Activity, Users, CheckCircle2, 
  AlertTriangle, Clock, Map as MapIcon, History, 
  Bell, LogOut, Gamepad2, Search
} from 'lucide-react';
import EmergencyMap from './EmergencyMap';
import { formatDistanceToNow } from '../utils/date';

export default function AdminDashboard() {
  const { 
    setRole, emergencies, updateEmergencyStatus, 
    simulateEmergency, notifications, markNotificationsRead 
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  const [showNotifications, setShowNotifications] = useState(false);

  const activeEmergencies = emergencies.filter(e => e.status !== 'RESOLVED');
  const resolvedEmergencies = emergencies.filter(e => e.status === 'RESOLVED');

  const totalAffected = activeEmergencies.reduce((acc, curr) => acc + curr.peopleAffected, 0);
  const totalSafe = activeEmergencies.reduce((acc, curr) => acc + curr.safeCount, 0);
  const totalNotConfirmed = activeEmergencies.reduce((acc, curr) => acc + curr.notConfirmedCount, 0);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold">Control Center</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('live')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'live' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium">Live Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'history' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <History className="w-5 h-5" />
            <span className="font-medium">Emergency History</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <button 
            onClick={simulateEmergency}
            className="w-full flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-xl transition shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>SIMULATE EMERGENCY</span>
          </button>
          
          <button 
            onClick={() => setRole(null)}
            className="w-full flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-slate-900/50 backdrop-blur border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-40">
          <h1 className="text-2xl font-bold">{activeTab === 'live' ? 'Live Dashboard' : 'History'}</h1>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markNotificationsRead();
                }}
                className="relative p-2 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-3 border-b border-slate-700 bg-slate-900 flex justify-between items-center">
                    <span className="font-semibold text-white">Notifications</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-500">No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-slate-700/50 hover:bg-slate-700 transition ${!n.read ? 'bg-slate-700/30' : ''}`}>
                          <p className="font-bold text-red-400 text-sm mb-1">{n.title}</p>
                          <p className="text-slate-300 text-sm">{n.message}</p>
                          <p className="text-slate-500 text-xs mt-2">{formatDistanceToNow(n.time)} ago</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                AD
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-slate-400">Security Officer</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'live' ? (
            <div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-xl border-t-4 border-t-red-500">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-400 text-sm font-medium">Active Emergencies</span>
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-3xl font-bold text-white">{activeEmergencies.length}</span>
                </div>
                
                <div className="glass-panel p-4 rounded-xl border-t-4 border-t-blue-500">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-400 text-sm font-medium">People Affected</span>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-3xl font-bold text-white">{totalAffected}</span>
                </div>
                
                <div className="glass-panel p-4 rounded-xl border-t-4 border-t-emerald-500">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-400 text-sm font-medium">Confirmed Safe</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-3xl font-bold text-white">{totalSafe}</span>
                </div>
                
                <div className="glass-panel p-4 rounded-xl border-t-4 border-t-amber-500">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-400 text-sm font-medium">Not Confirmed</span>
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-3xl font-bold text-white">{totalNotConfirmed}</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Active Emergencies List */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-lg font-bold flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    <span>Live Emergency Panel</span>
                  </h2>
                  
                  {activeEmergencies.length === 0 ? (
                    <div className="glass-panel p-8 rounded-xl text-center flex flex-col items-center justify-center">
                      <ShieldAlert className="w-12 h-12 text-emerald-500 mb-3 opacity-50" />
                      <p className="text-slate-400 font-medium">No active emergencies</p>
                      <p className="text-slate-500 text-sm mt-1">Campus is safe and secure.</p>
                    </div>
                  ) : (
                    activeEmergencies.map(em => (
                      <div key={em.id} className="glass-panel p-5 rounded-xl space-y-4 relative overflow-hidden group">
                        {em.status === 'ACTIVE' && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_10px_red]"></div>
                        )}
                        {em.status === 'RESPONDING' && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 shadow-[0_0_10px_orange]"></div>
                        )}
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-white">{em.type}</h3>
                            <p className="text-slate-400 text-sm flex items-center space-x-1 mt-1">
                              <MapIcon className="w-4 h-4" />
                              <span>{em.location}</span>
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${
                            em.status === 'ACTIVE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {em.status}
                          </span>
                        </div>
                        
                        <p className="text-slate-300 text-sm bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                          {em.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-slate-800/50 p-2 rounded text-center">
                            <p className="text-[10px] text-slate-500 uppercase">Affected</p>
                            <p className="font-bold">{em.peopleAffected}</p>
                          </div>
                          <div className="bg-emerald-500/10 p-2 rounded text-center border border-emerald-500/20">
                            <p className="text-[10px] text-emerald-500 uppercase">Safe</p>
                            <p className="font-bold text-emerald-400">{em.safeCount}</p>
                          </div>
                          <div className="bg-amber-500/10 p-2 rounded text-center border border-amber-500/20">
                            <p className="text-[10px] text-amber-500 uppercase">Unknown</p>
                            <p className="font-bold text-amber-400">{em.notConfirmedCount}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800">
                          <span>Reported {formatDistanceToNow(em.timeReported)} ago</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          {em.status === 'ACTIVE' && (
                            <button 
                              onClick={() => updateEmergencyStatus(em.id, 'RESPONDING')}
                              className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 rounded-lg text-sm transition"
                            >
                              Mark Responding
                            </button>
                          )}
                          <button 
                            onClick={() => updateEmergencyStatus(em.id, 'RESOLVED')}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg text-sm transition"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Map View */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-lg font-bold flex items-center space-x-2">
                    <MapIcon className="w-5 h-5 text-indigo-400" />
                    <span>Campus Map Overview</span>
                  </h2>
                  <EmergencyMap emergencies={emergencies} />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
               <h2 className="text-lg font-bold flex items-center space-x-2 mb-6">
                <History className="w-5 h-5 text-indigo-400" />
                <span>Emergency History Logs</span>
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glass-panel p-4 rounded-xl">
                  <span className="text-slate-400 text-sm block mb-1">Total Emergencies</span>
                  <span className="text-2xl font-bold">{emergencies.length}</span>
                </div>
                <div className="glass-panel p-4 rounded-xl">
                  <span className="text-slate-400 text-sm block mb-1">Resolved</span>
                  <span className="text-2xl font-bold text-emerald-400">{resolvedEmergencies.length}</span>
                </div>
                <div className="glass-panel p-4 rounded-xl">
                  <span className="text-slate-400 text-sm block mb-1">Average Response</span>
                  <span className="text-2xl font-bold text-blue-400">1.2 mins</span>
                </div>
              </div>

              <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 border-b border-slate-700">
                      <tr>
                        <th className="p-4 text-sm font-semibold text-slate-400">Type</th>
                        <th className="p-4 text-sm font-semibold text-slate-400">Location</th>
                        <th className="p-4 text-sm font-semibold text-slate-400">Time Reported</th>
                        <th className="p-4 text-sm font-semibold text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {emergencies.map(em => (
                        <tr key={em.id} className="hover:bg-slate-800/30 transition">
                          <td className="p-4 font-medium">{em.type}</td>
                          <td className="p-4 text-slate-300">{em.location}</td>
                          <td className="p-4 text-slate-400 text-sm">
                            {em.timeReported.toLocaleTimeString()} - {em.timeReported.toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                              em.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400' :
                              em.status === 'RESPONDING' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {em.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}