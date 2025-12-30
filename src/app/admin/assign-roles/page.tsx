"use client"

import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const users = [
    {
      id: 'USR001',
      name: 'Admin User',
      type: 'Admin',
      role: 'Super Admin',
      permissions: ['Full Access', 'User Management', 'System Config'],
      modules: ['All Modules'],
      status: 'active',
      lastModified: '2025-12-28 14:30',
      modifiedBy: 'System',
    },
    {
      id: 'USR002',
      name: 'Dr. Alice Johnson',
      type: 'Faculty',
      role: 'Faculty',
      permissions: ['View Students', 'Grade Assignments', 'Update Attendance'],
      modules: ['Dashboard', 'Students', 'Subjects', 'Batches'],
      status: 'active',
      lastModified: '2025-12-29 09:15',
      modifiedBy: 'Admin User',
    },
    {
      id: 'USR003',
      name: 'John Doe',
      type: 'Student',
      role: 'Student',
      permissions: ['View Own Grades', 'Download Syllabus'],
      modules: ['Dashboard', 'Courses'],
      status: 'inactive',
      lastModified: '2025-12-25 11:20',
      modifiedBy: 'Admin User',
    },
    {
      id: 'USR004',
      name: 'Jane Smith (Parent)',
      type: 'Parent',
      role: 'Parent',
      permissions: ['View Child Progress', 'Attendance Reports'],
      modules: ['Dashboard', 'Reports'],
      status: 'active',
      lastModified: '2025-12-30 10:45',
      modifiedBy: 'Self',
    },
  ]

  const rolesConfig = [
    {
      role: 'Super Admin',
      permissions: ['All Permissions'],
      moduleAccess: 'All',
    },
    {
      role: 'Faculty',
      permissions: ['Read/Write: Students, Subjects, Attendance, Grades'],
      moduleAccess: 'Dashboard, Departments, Subjects, Faculty, Batches, Attendance',
    },
    {
      role: 'Student',
      permissions: ['Read: Own Data'],
      moduleAccess: 'Dashboard, Subjects',
    },
    {
      role: 'Parent',
      permissions: ['Read: Child Data'],
      moduleAccess: 'Dashboard, Reports',
    },
  ]

  const modificationHistory = [
    { id: 1, user: 'USR002', action: 'Role assigned to Faculty', timestamp: '2025-12-29 09:15', by: 'Admin User' },
    { id: 2, user: 'USR003', action: 'Account disabled', timestamp: '2025-12-25 11:20', by: 'Admin User' },
    { id: 3, user: 'USR004', action: 'Permission updated', timestamp: '2025-12-30 10:45', by: 'Self' },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Admin': return 'bg-blue-100 text-blue-800';
      case 'Faculty': return 'bg-green-100 text-green-800';
      case 'Student': return 'bg-purple-100 text-purple-800';
      case 'Parent': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New User
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Roles
      </button>
      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
        <option>Bulk Assign Role</option>
        <option>Enable All</option>
        <option>Disable All</option>
      </select>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assign Roles & Permissions</h1>
          <p className="text-gray-600 mt-2">Control permissions using Role-Based Access Control (RBAC).</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">User List & Role Assignment</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID & Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module Access</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.id}</div>
                    <div className="text-sm text-gray-500">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(user.type)}`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.permissions.slice(0, 2).join(', ')}</div>
                    <div className="text-xs text-gray-500">
                      {user.permissions.length > 2 ? `+${user.permissions.length - 2} more` : `${user.permissions.length} total`}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.modules.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Assign Role</button>
                    <select className="text-xs border border-gray-300 rounded px-2 py-1">
                      <option>Super Admin</option>
                      <option>Faculty</option>
                      <option>Student</option>
                      <option>Parent</option>
                    </select>
                    <button className={`text-${user.status === 'active' ? 'red' : 'green'}-600 hover:text-${user.status === 'active' ? 'red' : 'green'}-900`}>
                      {user.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role Configuration */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Permission Mapping & Module Access Configuration</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module Access</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rolesConfig.map((role, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{role.permissions}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{role.moduleAccess}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Save</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modification History */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Role Modification History</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {modificationHistory.map((history) => (
                <tr key={history.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{history.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Accounts</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{users.filter(u => u.status === 'active').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Defined Roles</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{rolesConfig.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Recent Modifications</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{modificationHistory.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}