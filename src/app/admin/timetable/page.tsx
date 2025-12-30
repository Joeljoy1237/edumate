"use client"
import React, { useState } from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science')
  const [selectedBatch, setSelectedBatch] = useState('CSE 2022-26')

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Economics']
  const batches = ['CSE 2022-26', 'MATH 2023-27', 'PHYS 2021-25', 'ECON 2024-28']

  const schedules = [
    {
      id: 1,
      subject: 'Data Structures',
      faculty: 'Dr. Alice Johnson',
      batch: 'CSE 2022-26',
      department: 'Computer Science',
      day: 'Monday',
      time: '09:00 AM - 10:30 AM',
      room: 'Lab 101',
      status: 'scheduled',
      published: true,
    },
    {
      id: 2,
      subject: 'Calculus II',
      faculty: 'Prof. Bob Smith',
      batch: 'MATH 2023-27',
      department: 'Mathematics',
      day: 'Tuesday',
      time: '11:00 AM - 12:30 PM',
      room: 'Room 205',
      status: 'scheduled',
      published: true,
    },
    {
      id: 3,
      subject: 'Quantum Physics',
      faculty: 'Dr. Carol Davis',
      batch: 'PHYS 2021-25',
      department: 'Physics',
      day: 'Wednesday',
      time: '02:00 PM - 03:30 PM',
      room: 'Lab 302',
      status: 'conflict',
      published: false,
    },
    {
      id: 4,
      subject: 'Microeconomics',
      faculty: 'Dr. David Wilson',
      batch: 'ECON 2024-28',
      department: 'Economics',
      day: 'Thursday',
      time: '10:00 AM - 11:30 AM',
      room: 'Room 110',
      status: 'scheduled',
      published: true,
    },
    {
      id: 5,
      subject: 'Algorithms',
      faculty: 'Prof. John Doe',
      batch: 'CSE 2022-26',
      department: 'Computer Science',
      day: 'Friday',
      time: '01:00 PM - 02:30 PM',
      room: 'Lab 101',
      status: 'scheduled',
      published: true,
    },
  ]

  const filteredSchedules = schedules.filter(s => 
    s.department === selectedDepartment && s.batch === selectedBatch
  )

  const conflicts = schedules.filter(s => s.status === 'conflict').length
  const totalClasses = schedules.length
  const publishedClasses = schedules.filter(s => s.published).length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'conflict': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const timetableSlots = [
    { time: '09:00 AM - 10:30 AM', mon: 'Data Structures<br/>Dr. Alice Johnson<br/>Lab 101', tue: '', wed: '', thu: 'Microeconomics<br/>Dr. David Wilson<br/>Room 110', fri: '' },
    { time: '10:45 AM - 12:15 PM', mon: '', tue: 'Calculus II<br/>Prof. Bob Smith<br/>Room 205', wed: '', thu: '', fri: '' },
    { time: '01:00 PM - 02:30 PM', mon: '', tue: '', wed: 'Quantum Physics<br/>Dr. Carol Davis<br/>Lab 302', thu: '', fri: 'Algorithms<br/>Prof. John Doe<br/>Lab 101' },
    { time: '02:45 PM - 04:15 PM', mon: '', tue: '', wed: '', thu: '', fri: '' },
  ]

  const QuickActions = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Class
      </button>
      <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
        Detect Conflicts
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        Publish Timetable
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Schedule
      </button>
    </div>
  )

  const TimetableFilters = () => (
    <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <select 
          value={selectedDepartment} 
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          {departments.map(dept => (
            <option key={dept}>{dept}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
        <select 
          value={selectedBatch} 
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          {batches.map(batch => (
            <option key={batch}>{batch}</option>
          ))}
        </select>
      </div>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Schedules</h1>
          <p className="text-gray-600 mt-2">Plan and manage class schedules for departments and batches.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Filters */}
        <TimetableFilters />

        {/* Timetable Grid */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{selectedDepartment} - {selectedBatch} Timetable</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Monday</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tuesday</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Wednesday</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thursday</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timetableSlots.map((slot, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">{slot.time}</td>
                    <td className="px-4 py-4 text-center text-sm text-gray-700"><div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: slot.mon }} /></td>
                    <td className="px-4 py-4 text-center text-sm text-gray-700"><div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: slot.tue }} /></td>
                    <td className="px-4 py-4 text-center text-sm text-gray-700"><div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: slot.wed }} /></td>
                    <td className="px-4 py-4 text-center text-sm text-gray-700"><div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: slot.thu }} /></td>
                    <td className="px-4 py-4 text-center text-sm text-gray-700"><div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: slot.fri }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule Mappings Table */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Subject & Faculty Mapping</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch / Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room / Lab</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.faculty}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{schedule.batch}</div>
                      <div className="text-sm text-gray-500">{schedule.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.day}<br/>{schedule.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                        {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${schedule.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {schedule.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-blue-600 hover:text-blue-900">Reassign</button>
                      <button className={`text-${schedule.published ? 'red' : 'green'}-600 hover:text-${schedule.published ? 'red' : 'green'}-900`}>
                        {schedule.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Classes</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalClasses}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 {conflicts > 0 ? 'border-red-500' : 'border-blue-500'}">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Conflicts Detected</h3>
            <p className={`text-3xl font-bold mt-1 ${conflicts > 0 ? 'text-red-600' : 'text-gray-900'}`}>{conflicts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Published Classes</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{publishedClasses}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Rooms Allocated</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{new Set(schedules.map(s => s.room)).size}</p>
          </div>
        </div>
      </div>
    </div>
  )
}