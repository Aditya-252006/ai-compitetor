import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Competitors } from './pages/Competitors';
import { MarketTrends } from './pages/MarketTrends';
import { ComparativeAnalysis } from './pages/ComparativeAnalysis';
import { Insights } from './pages/Insights';
import { Settings } from './pages/Settings';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'competitors':
        return <Competitors />;
      case 'trends':
        return <MarketTrends />;
      case 'analysis':
        return <ComparativeAnalysis />;
      case 'insights':
        return <Insights />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 overflow-y-auto">
        {renderPage()}
      </div>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
