import { useState } from 'react';
import { mockCompetitors, mockSWOTAnalyses } from '../data/mockData';
import { Shield, AlertTriangle, Target, TrendingUp } from 'lucide-react';

export const ComparativeAnalysis = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState(mockCompetitors[0].id);

  const currentAnalysis = mockSWOTAnalyses.find(
    (analysis) => analysis.competitorId === selectedCompetitor
  );

  const ourCompany = {
    name: 'Our Company',
    strengths: [
      'User-friendly interface and intuitive UX',
      'Strong customer support and satisfaction',
      'Competitive pricing for SMB market',
      'Fast feature iteration and deployment',
    ],
    weaknesses: [
      'Smaller brand presence compared to competitors',
      'Limited enterprise features',
      'Fewer integration partnerships',
      'Smaller sales and marketing budget',
    ],
    opportunities: [
      'Expand into underserved SMB market',
      'Develop mobile-first strategy',
      'Build strategic partnerships',
      'Launch vertical-specific solutions',
    ],
    threats: [
      'Well-funded competitors with aggressive expansion',
      'Economic downturn affecting budgets',
      'Privacy regulations requiring compliance investment',
      'Potential price wars in the market',
    ],
  };

  const selectedCompany = mockCompetitors.find((c) => c.id === selectedCompetitor);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Comparative Analysis</h1>
        <p className="text-gray-600">
          Side-by-side SWOT analysis comparing our position with competitors
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Competitor to Compare
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {mockCompetitors.map((competitor) => (
            <button
              key={competitor.id}
              onClick={() => setSelectedCompetitor(competitor.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                selectedCompetitor === competitor.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <img
                src={competitor.logoUrl}
                alt={competitor.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <span className="text-sm font-medium text-gray-900 text-center">
                {competitor.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
            <h2 className="text-2xl font-bold">Our Company</h2>
            <p className="text-blue-100 mt-1">Your competitive position</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {ourCompany.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Weaknesses</h3>
              </div>
              <ul className="space-y-2">
                {ourCompany.weaknesses.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">✗</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Opportunities</h3>
              </div>
              <ul className="space-y-2">
                {ourCompany.opportunities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">→</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Threats</h3>
              </div>
              <ul className="space-y-2">
                {ourCompany.threats.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-600 mt-1">!</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-xl">
            <h2 className="text-2xl font-bold">{selectedCompany?.name}</h2>
            <p className="text-purple-100 mt-1">{selectedCompany?.description}</p>
          </div>
          <div className="p-6">
            {currentAnalysis ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {currentAnalysis.strengths.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Weaknesses</h3>
                  </div>
                  <ul className="space-y-2">
                    {currentAnalysis.weaknesses.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-red-600 mt-1">✗</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Opportunities</h3>
                  </div>
                  <ul className="space-y-2">
                    {currentAnalysis.opportunities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">→</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Threats</h3>
                  </div>
                  <ul className="space-y-2">
                    {currentAnalysis.threats.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-orange-600 mt-1">!</span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>SWOT analysis not available for this competitor yet.</p>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  Generate Analysis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">SWOT Matrix Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-800 mb-3 text-lg">Strengths (Internal + Positive)</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-green-700 mb-1">Our Advantages:</div>
                <div className="text-sm text-gray-700">
                  Strong UX, customer support, competitive SMB pricing
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="font-bold text-red-800 mb-3 text-lg">Weaknesses (Internal + Negative)</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-red-700 mb-1">Areas to Improve:</div>
                <div className="text-sm text-gray-700">
                  Limited brand presence, fewer enterprise features
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">Opportunities (External + Positive)</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-blue-700 mb-1">Market Openings:</div>
                <div className="text-sm text-gray-700">
                  SMB market expansion, mobile-first strategy, vertical solutions
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
            <h3 className="font-bold text-orange-800 mb-3 text-lg">Threats (External + Negative)</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-orange-700 mb-1">External Challenges:</div>
                <div className="text-sm text-gray-700">
                  Well-funded competitors, economic uncertainty, regulatory changes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
