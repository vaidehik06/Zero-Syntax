import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Role, Emergency, EmergencyStatus, Student } from './types';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  emergencies: Emergency[];
  reportEmergency: (emergency: Omit<Emergency, 'id' | 'status' | 'timeReported' | 'safeCount' | 'notConfirmedCount'>) => void;
  updateEmergencyStatus: (id: string, status: EmergencyStatus) => void;
  simulateEmergency: () => void;
  isSafe: boolean;
  markSafe: () => void;
  notifications: Notification[];
  markNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [emergencies, setEmergencies] = useState<Emergency[]>([
    {
      id: 'mock-1',
      type: 'Medical Emergency',
      location: 'Room 204',
      description: 'Student collapsed in the middle of lecture.',
      status: 'ACTIVE',
      timeReported: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
      peopleAffected: 32,
      safeCount: 18,
      notConfirmedCount: 14,
      lat: 40.7128,
      lng: -74.0060,
    }
  ]);
  const [isSafe, setIsSafe] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      title: 'NEW EMERGENCY',
      message: 'Medical emergency reported in Room 204.',
      time: new Date(Date.now() - 1000 * 60 * 2),
      read: false
    }
  ]);

  const reportEmergency = (data: Omit<Emergency, 'id' | 'status' | 'timeReported' | 'safeCount' | 'notConfirmedCount'>) => {
    const newEmergency: Emergency = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'ACTIVE',
      timeReported: new Date(),
      safeCount: 0,
      notConfirmedCount: data.peopleAffected,
    };
    setEmergencies([newEmergency, ...emergencies]);
    
    setNotifications([{
      id: Math.random().toString(36).substr(2, 9),
      title: 'NEW EMERGENCY',
      message: `${data.type} reported in ${data.location}.`,
      time: new Date(),
      read: false
    }, ...notifications]);
  };

  const updateEmergencyStatus = (id: string, status: EmergencyStatus) => {
    setEmergencies(emergencies.map(e => e.id === id ? { ...e, status } : e));
  };

  const markSafe = () => {
    if (isSafe) return;
    setIsSafe(true);
    // Simulate updating the most recent active emergency
    setEmergencies(emergencies.map((e, index) => {
      if (index === 0 && e.notConfirmedCount > 0) {
        return {
          ...e,
          safeCount: e.safeCount + 1,
          notConfirmedCount: e.notConfirmedCount - 1
        };
      }
      return e;
    }));
  };

  const simulateEmergency = () => {
    const types = ['Fire', 'Security Threat', 'Medical Emergency', 'Unsafe Situation'];
    const locations = ['Library West Wing', 'Cafeteria', 'Science Lab 3', 'Dormitory B'];
    
    reportEmergency({
      type: types[Math.floor(Math.random() * types.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      description: 'Simulated emergency for demonstration purposes.',
      peopleAffected: Math.floor(Math.random() * 50) + 10,
      lat: 40.7128 + (Math.random() - 0.5) * 0.01,
      lng: -74.0060 + (Math.random() - 0.5) * 0.01,
    });
  };

  const markNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      emergencies, reportEmergency, updateEmergencyStatus,
      simulateEmergency,
      isSafe, markSafe,
      notifications, markNotificationsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
