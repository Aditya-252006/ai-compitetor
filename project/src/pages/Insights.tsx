import { useState } from 'react';
import { mockInsights, mockCompetitors } from '../data/mockData';
import { AlertTriangle, TrendingUp, Lightbulb, Filter } from 'lucide-react';

export const Insights = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');

  const filteredInsights = mockInsights.filter((insight) => {
    const matchesType = filterType === 'All' || insight.insightType === filterType;
    const matchesPriority = filterPriority === 'All' || insight.priority === filterPriority;
    return matchesType && matchesPriority;
  });

  const getCompetitorName = (competitorId?: string) => {
    if (!competitorId) return null;
    return mockCompetitors.find((c) => c.id === competitorId)?.name;
  };

  const riskHeatmapData = [
    { category: 'Price Competition', impact: 'High', likelihood: 'High', score: 9 },
    { category: 'Technology Gap', impact: 'High', likelihood: 'Medium', score: 7 },
    { category: 'Market Saturation', impact: 'Medium', likelihood: 'High', score: 6 },
    { category: 'Regulatory Changes', impact: 'High', likelihood: 'Low', score: 5 },
    { category: 'Talent Acquisition', impact: 'Medium', likelihood: 'Medium', score: 5 },
    { category: 'Customer Churn', impact: 'Medium', likelihood: 'Low', score: 3 },
  ];

  const opportunityScores = [
    { opportunity: 'SMB Market Expansion', score: 85, potential: '$5M ARR' },
    { opportunity: 'CompeteIQ Customer Migration', score: 75, potential: '500-1000 customers' },
    { opportunity: 'Strategic Partnership', score: 70, potential: 'Enterprise access' },
    { opportunity: 'Mobile-First Product', score: 65, potential: 'New segment' },
    { opportunity: 'Vertical Solutions', score: 60, potential: '$2M ARR' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Opportunities & Risks</h1>
        <p className="text-gray-600">
          AI-generated insights, risk assessment, and actionable recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6">
          <TrendingUp className="w-12 h-12 mb-4 opacity-80" />
          <div className="text-3xl font-bold mb-2">
            {mockInsights.filter((i) => i.insightType === 'Opportunity').length}
          </div>
          <div className="text-green-100">Opportunities Identified</div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-sm p-6">
          <AlertTriangle className="w-12 h-12 mb-4 opacity-80" />
          <div className="text-3xl font-bold mb-2">
            {mockInsights.filter((i) => i.insightType === 'Risk').length}
          </div>
          <div className="text-red-100">Risks to Monitor</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <Lightbulb className="w-12 h-12 mb-4 opacity-80" />
          <div className="text-3xl font-bold mb-2">
            {mockInsights.filter((i) => i.insightType === 'Recommendation').length}
          </div>
          <div className="text-blue-100">Recommendations</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="Opportunity">Opportunities</option>
              <option value="Risk">Risks</option>
              <option value="Recommendation">Recommendations</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredInsights.map((insight) => {
            const Icon =
              insight.insightType === 'Opportunity'
                ? TrendingUp
                : insight.insightType === 'Risk'
                ? AlertTriangle
                : Lightbulb;

            const competitorName = getCompetitorName(insight.relatedCompetitorId);

            return (
              <div
                key={insight.id}
                className={`border-l-4 rounded-lg p-6 ${
                  insight.insightType === 'Opportunity'
                    ? 'bg-green-50 border-green-500'
                    : insight.insightType === 'Risk'
                    ? 'bg-red-50 border-red-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      insight.insightType === 'Opportunity'
                        ? 'bg-green-100'
                        : insight.insightType === 'Risk'
                        ? 'bg-red-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        insight.insightType === 'Opportunity'
                          ? 'text-green-600'
                          : insight.insightType === 'Risk'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            insight.priority === 'Critical'
                              ? 'bg-red-100 text-red-700'
                              : insight.priority === 'High'
                              ? 'bg-orange-100 text-orange-700'
                              : insight.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {insight.priority}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            insight.status === 'New'
                              ? 'bg-blue-100 text-blue-700'
                              : insight.status === 'Reviewed'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {insight.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{insight.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
                        {competitorName && (
                          <>
                            <span>•</span>
                            <span className="font-medium">Related: {competitorName}</span>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          Mark Reviewed
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Heatmap</h2>
          <div className="space-y-3">
            {riskHeatmapData.map((risk) => (
              <div key={risk.category} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{risk.category}</span>
                    <span className="text-sm text-gray-600">
                      {risk.impact} Impact • {risk.likelihood} Likelihood
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        risk.score >= 8
                          ? 'bg-red-500'
                          : risk.score >= 6
                          ? 'bg-orange-500'
                          : risk.score >= 4
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(risk.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <div
                  className={`text-lg font-bold ${
                    risk.score >= 8
                      ? 'text-red-600'
                      : risk.score >= 6
                      ? 'text-orange-600'
                      : risk.score >= 4
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  {risk.score}/10
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Opportunities</h2>
          <div className="space-y-4">
            {opportunityScores.map((opp, index) => (
              <div key={opp.opportunity} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                    index === 0
                      ? 'bg-yellow-500'
                      : index === 1
                      ? 'bg-gray-400'
                      : index === 2
                      ? 'bg-orange-600'
                      : 'bg-blue-500'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900">{opp.opportunity}</span>
                    <span className="text-sm font-medium text-gray-700">{opp.score}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex-1 mr-3">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${opp.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{opp.potential}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
