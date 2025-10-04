import { useState } from 'react';
import { mockCompetitors } from '../data/mockData';
import { Plus, Trash2, Bell, Mail, Calendar } from 'lucide-react';

export const Settings = () => {
  const [competitors, setCompetitors] = useState(mockCompetitors);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState('Daily');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    website: '',
    industry: '',
  });

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(false);
    setNewCompetitor({ name: '', website: '', industry: '' });
  };

  const handleToggleCompetitor = (id: string) => {
    setCompetitors(
      competitors.map((c) =>
        c.id === id ? { ...c, isActive: !c.isActive } : c
      )
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage competitors, notifications, and account preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tracked Competitors</h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {competitors.filter((c) => c.isActive).length}
          </div>
          <div className="text-sm text-gray-600">
            out of {competitors.length} total
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Settings</h2>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">
              {emailNotifications ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="text-sm text-gray-600">{notificationFrequency} updates</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Collection</h2>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">Active</span>
          </div>
          <div className="text-sm text-gray-600">Last updated: Today</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Manage Competitors</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add Competitor</span>
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddCompetitor}
            className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-blue-200"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Add New Competitor</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Company Name"
                value={newCompetitor.name}
                onChange={(e) =>
                  setNewCompetitor({ ...newCompetitor, name: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="url"
                placeholder="Website URL"
                value={newCompetitor.website}
                onChange={(e) =>
                  setNewCompetitor({ ...newCompetitor, website: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Industry"
                value={newCompetitor.industry}
                onChange={(e) =>
                  setNewCompetitor({ ...newCompetitor, industry: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Competitor
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {competitors.map((competitor) => (
            <div
              key={competitor.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                competitor.isActive
                  ? 'bg-white border-gray-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={competitor.logoUrl}
                  alt={competitor.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                  <p className="text-sm text-gray-600">{competitor.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {competitor.industry}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {competitor.fundingStage}
                    </span>
                    <span className="text-xs text-gray-500">{competitor.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={competitor.isActive}
                    onChange={() => handleToggleCompetitor(competitor.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {competitor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </label>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Notifications</h3>
                <p className="text-sm text-gray-600">
                  Receive updates about competitor activities via email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Update Frequency</h3>
                <p className="text-sm text-gray-600">How often you receive digest emails</p>
              </div>
            </div>
            <select
              value={notificationFrequency}
              onChange={(e) => setNotificationFrequency(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Real-time">Real-time</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Weekly Report</h3>
                <p className="text-sm text-gray-600">
                  Get a comprehensive weekly summary every Monday
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-700 mb-4">
          Contact our support team or check out our documentation for guides on tracking
          competitors effectively.
        </p>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Contact Support
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
