import React from 'react';
import { AppProvider, useAppContext } from './AppContext';
import Landing from './components/Landing';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const { role } = useAppContext();

  if (role === 'student') return <StudentDashboard />;
  if (role === 'admin') return <AdminDashboard />;
  return <Landing />;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
