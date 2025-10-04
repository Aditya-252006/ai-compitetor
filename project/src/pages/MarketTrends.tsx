import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, ExternalLink, Calendar } from 'lucide-react';
import { mockMarketTrends, mockMarketGrowthData, mockCategoryDistribution, mockSentimentTrend } from '../data/mockData';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const MarketTrends = () => {
  const trendingKeywords = [
    { keyword: 'AI', count: 45, growth: '+20%' },
    { keyword: 'Real-Time', count: 38, growth: '+15%' },
    { keyword: 'Analytics', count: 52, growth: '+10%' },
    { keyword: 'Enterprise', count: 28, growth: '+25%' },
    { keyword: 'Machine Learning', count: 35, growth: '+18%' },
    { keyword: 'Cloud', count: 30, growth: '+12%' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Trends</h1>
        <p className="text-gray-600">
          Track industry growth, emerging technologies, and market opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Market Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMarketGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ourGrowth"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Our Growth"
              />
              <Line
                type="monotone"
                dataKey="marketGrowth"
                stroke="#10B981"
                strokeWidth={2}
                name="Market Growth"
              />
              <Line
                type="monotone"
                dataKey="competitorAvg"
                stroke="#F59E0B"
                strokeWidth={2}
                name="Competitor Avg"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Activity by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockCategoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {mockCategoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sentiment Analysis Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockSentimentTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="positive" fill="#10B981" name="Positive" />
            <Bar dataKey="neutral" fill="#6B7280" name="Neutral" />
            <Bar dataKey="negative" fill="#EF4444" name="Negative" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Keywords</h2>
          <div className="grid grid-cols-2 gap-4">
            {trendingKeywords.map((item) => (
              <div
                key={item.keyword}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{item.keyword}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {item.growth}
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{item.count}</div>
                <div className="text-xs text-gray-600">mentions</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Market News</h2>
          <div className="space-y-4">
            {mockMarketTrends.map((trend) => (
              <div
                key={trend.id}
                className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm flex-1">
                    {trend.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      trend.impactLevel === 'High'
                        ? 'bg-red-100 text-red-700'
                        : trend.impactLevel === 'Medium'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {trend.impactLevel} Impact
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {trend.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(trend.publishedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {trend.trendType}
                    </span>
                  </div>
                  <a
                    href={trend.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                  >
                    <span>Read</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Market Opportunity Alert</h3>
            <p className="text-blue-100 mb-4">
              The AI-powered analytics market is projected to reach $50B by 2026, growing at 25%
              CAGR. SMB segment shows particularly strong demand for affordable solutions.
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              View Full Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
