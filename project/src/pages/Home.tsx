import { TrendingUp, Users, AlertCircle, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { mockProjects, mockCompetitors, mockInsights } from '../data/mockData';

export const Home = () => {
  const recentProjects = mockProjects.slice(0, 5);
  const criticalInsights = mockInsights.filter(i => i.priority === 'Critical' || i.priority === 'High').slice(0, 3);

  const stats = [
    {
      label: 'Active Competitors',
      value: mockCompetitors.filter(c => c.isActive).length,
      change: '+2',
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Updates This Month',
      value: mockProjects.length,
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: 'green',
    },
    {
      label: 'Critical Insights',
      value: mockInsights.filter(i => i.priority === 'Critical').length,
      change: '+1',
      trend: 'up',
      icon: AlertCircle,
      color: 'red',
    },
    {
      label: 'Market Growth Rate',
      value: '35%',
      change: '+3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your competitors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;

          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorMap[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Competitor Activity</h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                <img
                  src={project.competitorLogo}
                  alt={project.competitorName}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      project.category === 'Product' ? 'bg-blue-100 text-blue-700' :
                      project.category === 'Funding' ? 'bg-green-100 text-green-700' :
                      project.category === 'Partnership' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{project.competitorName}</span>
                    <span>•</span>
                    <span>{new Date(project.publishedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Priority Insights</h2>
          <div className="space-y-4">
            {criticalInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.priority === 'Critical'
                    ? 'bg-red-50 border-red-500'
                    : 'bg-orange-50 border-orange-500'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{insight.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                    insight.priority === 'Critical'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {insight.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{insight.content}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight.insightType === 'Opportunity'
                      ? 'bg-green-100 text-green-700'
                      : insight.insightType === 'Risk'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {insight.insightType}
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
