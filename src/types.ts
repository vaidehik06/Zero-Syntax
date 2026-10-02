export type Role = 'student' | 'admin' | null;

export type EmergencyStatus = 'ACTIVE' | 'RESPONDING' | 'RESOLVED';

export interface Emergency {
  id: string;
  type: string;
  location: string;
  description: string;
  status: EmergencyStatus;
  timeReported: Date;
  peopleAffected: number;
  safeCount: number;
  notConfirmedCount: number;
  assignedResponder?: string;
  lat?: number;
  lng?: number;
}

export interface Student {
  id: string;
  name: string;
  isSafe: boolean;
}
