import { Home, Users, TrendingUp, BarChart3, AlertTriangle, Settings as SettingsIcon, LogOut, TrendingDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Sidebar = ({ currentPage, setCurrentPage }: SidebarProps) => {
  const { logout, user } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'competitors', label: 'Competitors', icon: Users },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'analysis', label: 'Comparative Analysis', icon: BarChart3 },
    { id: 'insights', label: 'Opportunities & Risks', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrendingDown className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">CompeteTrack</span>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 mb-6">
          <div className="text-sm text-gray-400 mb-1">Signed in as</div>
          <div className="font-medium truncate">{user?.email}</div>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
