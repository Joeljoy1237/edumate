"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const stats = {
    students: 1250,
    faculty: 85,
    departments: 12,
  }

  const attendanceSummary = {
    overall: '92%',
    present: 1140,
    absent: 110,
  }

  const upcomingEvents = [
    { type: 'Exam', title: 'Midterm - Calculus I', date: 'Jan 15, 2026' },
    { type: 'Assignment', title: 'Essay - Literature', date: 'Jan 10, 2026' },
    { type: 'Exam', title: 'Quiz - Physics', date: 'Jan 8, 2026' },
  ]

  const notifications = [
    { message: 'New student enrollment approved', time: '2 hours ago', type: 'info' },
    { message: 'Faculty meeting rescheduled', time: '1 day ago', type: 'warning' },
    { message: 'System maintenance tonight', time: '2 days ago', type: 'alert' },
  ]

  const activityLogs = [
    { action: 'User login', user: 'admin@uni.edu', timestamp: '2025-12-30 14:22' },
    { action: 'Grade update', user: 'prof.smith@uni.edu', timestamp: '2025-12-30 13:45' },
    { action: 'Course enrollment', user: 'student.john@uni.edu', timestamp: '2025-12-30 12:10' },
  ]

  const quickActions = [
    { label: 'Add Student', icon: '👤', path: '/admin/students/add' },
    { label: 'View Attendance', icon: '📊', path: '/admin/attendance' },
    { label: 'Manage Courses', icon: '📚', path: '/admin/courses' },
  ]

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Centralized overview of institutional operations</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.students.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Faculty</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.faculty.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Departments</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.departments}</p>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-blue-500">{attendanceSummary.overall}</p>
                <p className="text-gray-600">Overall Attendance</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-green-600">{attendanceSummary.present} Present</p>
                <p className="text-lg font-medium text-red-600">{attendanceSummary.absent} Absent</p>
              </div>
            </div>
          </div>

          {/* Upcoming Exams and Assignments */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams & Assignments</h3>
            <ul className="space-y-2">
              {upcomingEvents.map((event, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mr-2">
                      {event.type}
                    </span>
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notifications and Activity Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications & Alerts</h3>
            <ul className="space-y-3">
              {notifications.map((notif, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${notif.type === 'alert' ? 'bg-red-500' : notif.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                  <div>
                    <p className="text-sm text-gray-900">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Activity Logs</h3>
            <ul className="space-y-2">
              {activityLogs.map((log, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-900">{log.action} - {log.user}</span>
                  <span className="text-gray-500">{log.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick-Access Shortcuts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick-Access Shortcuts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                onClick={() => window.location.href = action.path} // Replace with actual navigation (e.g., Next.js router)
              >
                <span className="text-2xl mb-2">{action.icon}</span>
                <span className="text-sm font-medium text-blue-700 text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}