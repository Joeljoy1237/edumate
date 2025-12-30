"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const students = [
    {
      id: 'STU001',
      regNumber: '2022CSE001',
      name: 'John Doe',
      email: 'john.doe@uni.edu',
      phone: '+1 (555) 111-2222',
      dob: '2003-05-15',
      department: 'Computer Science',
      batch: 'CSE 2022-26',
      semester: '4th Semester',
      parent: { name: 'Mr. Richard Doe', phone: '+1 (555) 333-4444', email: 'richard.doe@email.com' },
      attendance: '95%',
      status: 'active',
      lastLogin: '2025-12-29 15:30',
    },
    {
      id: 'STU002',
      regNumber: '2023MATH001',
      name: 'Jane Smith',
      email: 'jane.smith@uni.edu',
      phone: '+1 (555) 222-3333',
      dob: '2004-08-20',
      department: 'Mathematics',
      batch: 'MATH 2023-27',
      semester: '2nd Semester',
      parent: { name: 'Ms. Emily Smith', phone: '+1 (555) 444-5555', email: 'emily.smith@email.com' },
      attendance: '88%',
      status: 'active',
      lastLogin: '2025-12-30 10:15',
    },
    {
      id: 'STU003',
      regNumber: '2021PHYS001',
      name: 'Mike Wilson',
      email: 'mike.wilson@uni.edu',
      phone: '+1 (555) 333-4444',
      dob: '2002-12-10',
      department: 'Physics',
      batch: 'PHYS 2021-25',
      semester: '6th Semester',
      parent: { name: 'Mr. David Wilson', phone: '+1 (555) 555-6666', email: 'david.wilson@email.com' },
      attendance: '92%',
      status: 'withdrawn',
      lastLogin: '2025-11-15 09:45',
    },
    {
      id: 'STU004',
      regNumber: '2024ECON001',
      name: 'Anna Green',
      email: 'anna.green@uni.edu',
      phone: '+1 (555) 444-5555',
      dob: '2005-03-25',
      department: 'Economics',
      batch: 'ECON 2024-28',
      semester: '1st Semester',
      parent: { name: 'Ms. Lisa Green', phone: '+1 (555) 666-7777', email: 'lisa.green@email.com' },
      attendance: '97%',
      status: 'active',
      lastLogin: '2025-12-30 14:20',
    },
  ]

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Student
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Data
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Reset Credentials
      </button>
    </div>
  )

  const totalActive = students.filter(s => s.status === 'active').length
  const totalAttendanceAvg = students.reduce((sum, s) => sum + parseFloat(s.attendance), 0) / students.length

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
          <p className="text-gray-600 mt-2">Records and academic profiles for enrolled students.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg No & Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personal Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Batch / Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent/Guardian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Credentials</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.regNumber}</div>
                    <div className="text-sm text-gray-500">{student.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{student.email}</div>
                    <div className="text-sm text-gray-500">{student.phone}</div>
                    <div className="text-xs text-gray-400">DOB: {student.dob}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.department}</div>
                    <div className="text-sm text-gray-500">{student.batch}</div>
                    <div className="text-xs text-gray-400">{student.semester}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{student.parent.name}</div>
                    <div className="text-xs text-gray-500">{student.parent.phone}</div>
                    <div className="text-xs text-gray-400">{student.parent.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{student.attendance}</div>
                    <button className="text-xs text-blue-600 hover:text-blue-900 underline">View Details</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Last Login: {student.lastLogin}</div>
                    <button className="text-xs text-blue-600 hover:text-blue-900 underline">Reset Password</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-green-600 hover:text-green-900">Assign Parent</button>
                    <button className={`text-${student.status === 'active' ? 'red' : 'green'}-600 hover:text-${student.status === 'active' ? 'red' : 'green'}-900`}>
                      {student.status === 'active' ? 'Withdraw' : 'Re-enroll'}
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
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{students.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalActive}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Attendance</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalAttendanceAvg.toFixed(1)}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Departments</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {new Set(students.map(s => s.department)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}