"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const departments = [
    {
      id: 1,
      name: 'Computer Science',
      code: 'CS',
      hod: 'Dr. Alice Johnson',
      courses: ['Data Structures', 'Algorithms', 'Machine Learning', 'Web Development'],
      faculty: ['Prof. John Doe', 'Dr. Jane Smith', 'Prof. Mike Johnson'],
      students: 300,
      status: 'active',
    },
    {
      id: 2,
      name: 'Mathematics',
      code: 'MATH',
      hod: 'Prof. Bob Smith',
      courses: ['Calculus I', 'Linear Algebra', 'Statistics', 'Discrete Math'],
      faculty: ['Dr. Emily Davis', 'Prof. Robert Wilson'],
      students: 250,
      status: 'active',
    },
    {
      id: 3,
      name: 'Physics',
      code: 'PHYS',
      hod: 'Dr. Carol Davis',
      courses: ['Classical Mechanics', 'Quantum Physics', 'Electromagnetism'],
      faculty: ['Prof. David Brown', 'Dr. Lisa Green'],
      students: 180,
      status: 'inactive',
    },
  ]

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Department
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Data
      </button>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Departments</h1>
          <p className="text-gray-600 mt-2">Overview and management of academic departments within the institution.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Departments Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HOD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                    <div className="text-sm text-gray-500">{dept.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.hod}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{dept.courses.slice(0, 2).join(', ')}</div>
                    <div className="text-xs text-gray-500">
                      {dept.courses.length > 2 ? `+${dept.courses.length - 2} more` : `${dept.courses.length} total`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{dept.faculty.slice(0, 2).join(', ')}</div>
                    <div className="text-xs text-gray-500">
                      {dept.faculty.length > 2 ? `+${dept.faculty.length - 2} more` : `${dept.faculty.length} total`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.students.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dept.status)}`}>
                      {dept.status.charAt(0).toUpperCase() + dept.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Departments</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{departments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Departments</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{departments.filter(d => d.status === 'active').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Faculty</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {departments.reduce((sum, d) => sum + d.faculty.length, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {departments.reduce((sum, d) => sum + d.students, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}