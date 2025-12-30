"use client"
import React, { useState } from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const college = {
    name: 'Example College',
    address: '123 Education Street, Academic City, State 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@examplecollege.edu',
    website: 'www.examplecollege.edu',
  }

  const accreditation = [
    { id: 1, body: 'NAAC', grade: 'A+', year: '2024', validity: '2029' },
    { id: 2, body: 'UGC', status: 'Recognized', year: '2023', validity: 'Permanent' },
    { id: 3, body: 'AICTE', status: 'Approved', year: '2024', validity: '2029' },
  ]

  const academicYears = [
    { id: 1, year: '2025-2026', startDate: 'Aug 1, 2025', endDate: 'May 31, 2026', semesters: 2, status: 'active' },
    { id: 2, year: '2024-2025', startDate: 'Aug 1, 2024', endDate: 'May 31, 2025', semesters: 2, status: 'completed' },
    { id: 3, year: '2026-2027', startDate: 'Aug 1, 2026', endDate: 'May 31, 2027', semesters: 2, status: 'upcoming' },
  ]

  const systemSettings = {
    maxCreditHours: 18,
    minCGPA: 2.0,
    attendanceThreshold: 75,
    gradingScale: '4.0',
    language: 'English',
  }

  const templates = [
    { id: 1, name: 'Transcript Certificate', type: 'PDF', lastUpdated: '2025-12-15', status: 'active' },
    { id: 2, name: 'Degree Certificate', type: 'PDF', lastUpdated: '2025-11-20', status: 'active' },
    { id: 3, name: 'ID Card Template', type: 'Image', lastUpdated: '2025-12-10', status: 'draft' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const handleEdit = (section: string) => {
    setEditingSection(editingSection === section ? null : section)
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Update College Info
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Upload Logo
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Settings
      </button>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">College Configuration</h1>
          <p className="text-gray-600 mt-2">Institution-level configuration and identity management.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* College Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">College Name & Address</h2>
            <button
              onClick={() => handleEdit('info')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              {editingSection === 'info' ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editingSection === 'info' ? (
            <div className="space-y-4">
              <input
                type="text"
                defaultValue={college.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="College Name"
              />
              <textarea
                defaultValue={college.address}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Address"
                rows={3}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="tel"
                  defaultValue={college.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone"
                />
                <input
                  type="email"
                  defaultValue={college.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                />
                <input
                  type="url"
                  defaultValue={college.website}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Website"
                />
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Save Changes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-lg text-gray-900">{college.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <p className="text-lg text-gray-900">{college.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-lg text-gray-900">{college.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-lg text-gray-900">{college.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <p className="text-lg text-gray-900">{college.website}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex items-center space-x-4">
                  <img src="/api/placeholder/100/100" alt="College Logo" className="w-16 h-16 rounded-full object-cover" />
                  <button className="text-blue-600 hover:text-blue-900">Change Logo</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accreditation Details */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Accreditation Details</h2>
            <button
              onClick={() => handleEdit('accreditation')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              {editingSection === 'accreditation' ? 'Cancel' : 'Add New'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade/Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accreditation.map((acc) => (
                  <tr key={acc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{acc.body}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{acc.grade || acc.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{acc.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{acc.validity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Year Configuration */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Academic Year Configuration</h2>
            <button
              onClick={() => handleEdit('academic')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              {editingSection === 'academic' ? 'Cancel' : 'Add Year'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semesters</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {academicYears.map((year) => (
                  <tr key={year.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{year.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{year.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{year.semesters}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(year.status)}`}>
                        {year.status.charAt(0).toUpperCase() + year.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Activate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System-Wide Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">System-Wide Settings</h2>
            <button
              onClick={() => handleEdit('settings')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              {editingSection === 'settings' ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editingSection === 'settings' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Credit Hours</label>
                  <input
                    type="number"
                    defaultValue={systemSettings.maxCreditHours}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    defaultValue={systemSettings.minCGPA}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Threshold (%)</label>
                  <input
                    type="number"
                    defaultValue={systemSettings.attendanceThreshold}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grading Scale</label>
                  <select
                    defaultValue={systemSettings.gradingScale}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>4.0</option>
                    <option>10.0</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
                <select
                  defaultValue={systemSettings.language}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Save Settings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Credit Hours per Semester</label>
                <p className="text-lg text-gray-900">{systemSettings.maxCreditHours}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum CGPA for Graduation</label>
                <p className="text-lg text-gray-900">{systemSettings.minCGPA}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Threshold</label>
                <p className="text-lg text-gray-900">{systemSettings.attendanceThreshold}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grading Scale</label>
                <p className="text-lg text-gray-900">{systemSettings.gradingScale}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
                <p className="text-lg text-gray-900">{systemSettings.language}</p>
              </div>
            </div>
          )}
        </div>

        {/* Document Templates */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Document Templates</h2>
            <button
              onClick={() => handleEdit('templates')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              {editingSection === 'templates' ? 'Cancel' : 'Add Template'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{template.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{template.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                        {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Download</button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Academic Years</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{academicYears.filter(y => y.status === 'active').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Accreditations</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{accreditation.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Templates</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{templates.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}