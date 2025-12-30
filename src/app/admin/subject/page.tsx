"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const subjects = [
    {
      id: 1,
      name: 'Data Structures and Algorithms',
      code: 'CS-301',
      department: 'Computer Science',
      semester: '3rd Semester',
      credits: 4,
      type: 'Core',
      faculty: ['Prof. John Doe', 'Dr. Jane Smith'],
      syllabus: 'data-structures-syllabus.pdf',
      status: 'active',
    },
    {
      id: 2,
      name: 'Calculus II',
      code: 'MATH-202',
      department: 'Mathematics',
      semester: '2nd Semester',
      credits: 3,
      type: 'Core',
      faculty: ['Prof. Bob Smith'],
      syllabus: 'calculus-ii-syllabus.pdf',
      status: 'active',
    },
    {
      id: 3,
      name: 'Advanced Physics Lab',
      code: 'PHYS-305',
      department: 'Physics',
      semester: '5th Semester',
      credits: 2,
      type: 'Lab',
      faculty: ['Dr. Carol Davis'],
      syllabus: null,
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Introduction to Economics',
      code: 'ECON-101',
      department: 'Economics',
      semester: '1st Semester',
      credits: 3,
      type: 'Elective',
      faculty: ['Prof. Emily Wilson'],
      syllabus: 'economics-intro-syllabus.pdf',
      status: 'active',
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Core': return 'bg-blue-100 text-blue-800';
      case 'Elective': return 'bg-green-100 text-green-800';
      case 'Lab': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Subject
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Data
      </button>
      <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
        Upload Syllabus Template
        <input type="file" className="hidden" accept=".pdf" />
      </label>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Subjects</h1>
          <p className="text-gray-600 mt-2">Curriculum and subjects offered within the institution.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Subjects Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Syllabus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                    <div className="text-sm text-gray-500">{subject.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subject.department}</div>
                    <div className="text-sm text-gray-500">{subject.semester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(subject.type)}`}>
                      {subject.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{subject.faculty.slice(0, 2).join(', ')}</div>
                    <div className="text-xs text-gray-500">
                      {subject.faculty.length > 2 ? `+${subject.faculty.length - 2} more` : `${subject.faculty.length} total`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subject.syllabus ? (
                      <a href={`/uploads/${subject.syllabus}`} className="text-blue-600 hover:text-blue-900 text-sm underline">
                        Download PDF
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm">No Syllabus</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subject.status)}`}>
                      {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-green-600 hover:text-green-900">Upload Syllabus</button>
                    <button className={`text-${subject.status === 'active' ? 'red' : 'green'}-600 hover:text-${subject.status === 'active' ? 'red' : 'green'}-900`}>
                      {subject.status === 'active' ? 'Deactivate' : 'Activate'}
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
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Subjects</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{subjects.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Subjects</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{subjects.filter(s => s.status === 'active').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Credits</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {subjects.reduce((sum, s) => sum + s.credits, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Core Subjects</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {subjects.filter(s => s.type === 'Core').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}