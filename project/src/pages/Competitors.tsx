import { useState } from 'react';
import { Search, Filter, ExternalLink, Calendar, Tag } from 'lucide-react';
import { mockProjects } from '../data/mockData';

export const Competitors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sentimentFilter, setSentimentFilter] = useState<string>('All');

  const categories = ['All', 'Product', 'Funding', 'Partnership', 'Marketing', 'Acquisition'];
  const sentiments = ['All', 'Positive', 'Neutral', 'Negative'];

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.competitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;
    const matchesSentiment = sentimentFilter === 'All' || project.sentiment === sentimentFilter;

    return matchesSearch && matchesCategory && matchesSentiment;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Competitor Tracker</h1>
        <p className="text-gray-600">
          Monitor competitor activities, product launches, and strategic moves
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, competitors, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-11 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {sentiments.map((sent) => (
                <option key={sent} value={sent}>
                  {sent} Sentiment
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredProjects.length}</span> of{' '}
          <span className="font-semibold">{mockProjects.length}</span> projects
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Competitor
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Project / Update
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Sentiment
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.competitorLogo}
                        alt={project.competitorName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        {project.competitorName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="max-w-md">
                      <div className="font-semibold text-gray-900 mb-1">{project.title}</div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                      {project.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <Tag className="w-3 h-3 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        project.category === 'Product'
                          ? 'bg-blue-100 text-blue-700'
                          : project.category === 'Funding'
                          ? 'bg-green-100 text-green-700'
                          : project.category === 'Partnership'
                          ? 'bg-purple-100 text-purple-700'
                          : project.category === 'Marketing'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        project.sentiment === 'Positive'
                          ? 'bg-green-100 text-green-700'
                          : project.sentiment === 'Negative'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {project.sentiment}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <span>View</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
