"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const batches = [
    {
      id: 1,
      name: 'CSE 2022-26',
      department: 'Computer Science',
      semester: '4th Semester',
      tutor: 'Ms. Alice Johnson',
      students: ['John Doe', 'Jane Smith', 'Mike Wilson', 'Emily Davis'],
      strength: 60,
      academicYear: '2022-2026',
      status: 'active',
    },
    {
      id: 2,
      name: 'MATH 2023-27',
      department: 'Mathematics',
      semester: '2nd Semester',
      tutor: 'Prof. Bob Smith',
      students: ['Robert Lee', 'Sarah Brown'],
      strength: 45,
      academicYear: '2023-2027',
      status: 'active',
    },
    {
      id: 3,
      name: 'PHYS 2021-25',
      department: 'Physics',
      semester: '6th Semester',
      tutor: 'Dr. Carol Davis',
      students: ['David Green', 'Lisa Taylor'],
      strength: 35,
      academicYear: '2021-2025',
      status: 'completed',
    },
    {
      id: 4,
      name: 'ECON 2024-28',
      department: 'Economics',
      semester: '1st Semester',
      tutor: 'Prof. David Wilson',
      students: ['Anna White', 'Tom Black', 'Nina Grey'],
      strength: 50,
      academicYear: '2024-2028',
      status: 'active',
    },
  ]

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Batch
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Data
      </button>
    </div>
  )

  const totalStudents = batches.reduce((sum, b) => sum + b.strength, 0)

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Batches</h1>
          <p className="text-gray-600 mt-2">Group students for academic operations and management.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Batches Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Tutor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strength</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{batch.department}</div>
                    <div className="text-sm text-gray-500">{batch.semester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.tutor}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{batch.students.slice(0, 3).join(', ')}</div>
                    <div className="text-xs text-gray-500">
                      {batch.students.length > 3 ? `+${batch.students.length - 3} more` : `${batch.students.length} total`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.strength}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.academicYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.status)}`}>
                      {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-green-600 hover:text-green-900">Add Student</button>
                    <button className={`text-${batch.status === 'active' ? 'red' : 'blue'}-600 hover:text-${batch.status === 'active' ? 'red' : 'blue'}-900`}>
                      {batch.status === 'active' ? 'Complete' : 'Reactivate'}
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
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Batches</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{batches.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Batches</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{batches.filter(b => b.status === 'active').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalStudents.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Departments Covered</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {new Set(batches.map(b => b.department)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}