"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const faculties = [
    {
      id: 'FAC001',
      name: 'Dr. Alice Johnson',
      email: 'alice.johnson@uni.edu',
      phone: '+1 (555) 123-4567',
      department: 'Computer Science',
      designation: 'Professor',
      subjects: ['Data Structures', 'Algorithms'],
      batches: ['Batch A-2025', 'Batch B-2025'],
      role: 'Faculty',
      accessStatus: 'active',
      lastLogin: '2025-12-29 10:30 AM',
    },
    {
      id: 'FAC002',
      name: 'Prof. Bob Smith',
      email: 'bob.smith@uni.edu',
      phone: '+1 (555) 987-6543',
      department: 'Mathematics',
      designation: 'Associate Professor',
      subjects: ['Calculus I', 'Linear Algebra'],
      batches: ['Batch C-2025'],
      role: 'Coordinator',
      accessStatus: 'active',
      lastLogin: '2025-12-30 09:15 AM',
    },
    {
      id: 'FAC003',
      name: 'Ms. Carol Davis',
      email: 'carol.davis@uni.edu',
      phone: '+1 (555) 456-7890',
      department: 'Physics',
      designation: 'Tutor',
      subjects: ['Physics Lab'],
      batches: [],
      role: 'Tutor',
      accessStatus: 'inactive',
      lastLogin: '2025-12-20 14:45 PM',
    },
    {
      id: 'FAC004',
      name: 'Dr. David Wilson',
      email: 'david.wilson@uni.edu',
      phone: '+1 (555) 321-0987',
      department: 'Economics',
      designation: 'Assistant Professor',
      subjects: ['Microeconomics', 'Macroeconomics'],
      batches: ['Batch D-2025', 'Batch E-2025'],
      role: 'Faculty',
      accessStatus: 'active',
      lastLogin: '2025-12-30 11:20 AM',
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Faculty': return 'bg-blue-100 text-blue-800';
      case 'Tutor': return 'bg-green-100 text-green-800';
      case 'Coordinator': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Faculty
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Data
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Reset Credentials
      </button>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Faculty</h1>
          <p className="text-gray-600 mt-2">Accounts and academic responsibilities for faculty members.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Faculty Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID & Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects Handled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Batches</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faculties.map((faculty) => (
                <tr key={faculty.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{faculty.id}</div>
                    <div className="text-sm text-gray-500">{faculty.name}</div>
                    <div className="text-xs text-gray-400">{faculty.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{faculty.department}</div>
                    <div className="text-sm text-gray-500">{faculty.designation}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{faculty.subjects.slice(0, 2).join(', ')}</div>
                    <div className="text-xs text-gray-500">
                      {faculty.subjects.length > 2 ? `+${faculty.subjects.length - 2} more` : `${faculty.subjects.length} total`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{faculty.batches.slice(0, 2).join(', ')}</div>
                    <div className="text-xs text-gray-500">
                      {faculty.batches.length > 2 ? `+${faculty.batches.length - 2} more` : `${faculty.batches.length} total`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(faculty.accessStatus)}`}>
                      {faculty.accessStatus.charAt(0).toUpperCase() + faculty.accessStatus.slice(1)}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">Last Login: {faculty.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(faculty.role)}`}>
                      {faculty.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-green-600 hover:text-green-900">Assign Subject</button>
                    <button className={`text-${faculty.accessStatus === 'active' ? 'red' : 'green'}-600 hover:text-${faculty.accessStatus === 'active' ? 'red' : 'green'}-900`}>
                      {faculty.accessStatus === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Faculty</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{faculties.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Faculty</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{faculties.filter(f => f.accessStatus === 'active').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Faculty Roles</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {faculties.filter(f => f.role === 'Faculty').length} Faculty
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Departments Covered</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {new Set(faculties.map(f => f.department)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}