"use client"
import React, { useState } from 'react'

interface Exam {
  id: number;
  type: string;
  name: string;
  date: string;
  time: string;
  department: string;
  batch: string;
  faculty: string;
  room: string;
  status: string;
  published: boolean;
}

interface Assignment {
  id: number;
  name: string;
  deadline: string;
  subject: string;
  department: string;
  batch: string;
  faculty: string;
  submissions: number;
  evaluated: number;
  status: string;
}

type ExamOrAssignment = Exam | Assignment;

export default function page() {
  // Sample data - in a real app, this would come from an API
  const [selectedType, setSelectedType] = useState< 'Exam' | 'Assignment' >('Exam') // 'Exam' or 'Assignment'

  const exams: Exam[] = [
    {
      id: 1,
      type: 'Internal',
      name: 'Midterm - Calculus I',
      date: 'Jan 15, 2026',
      time: '10:00 AM - 12:00 PM',
      department: 'Mathematics',
      batch: 'MATH 2023-27',
      faculty: 'Prof. Bob Smith',
      room: 'Room 205',
      status: 'Scheduled',
      published: true,
    },
    {
      id: 2,
      type: 'External',
      name: 'Final Exam - Data Structures',
      date: 'Feb 20, 2026',
      time: '09:00 AM - 11:00 AM',
      department: 'Computer Science',
      batch: 'CSE 2022-26',
      faculty: 'Dr. Alice Johnson',
      room: 'Hall A',
      status: 'Published',
      published: true,
    },
    {
      id: 3,
      type: 'Internal',
      name: 'Quiz - Physics',
      date: 'Jan 8, 2026',
      time: '02:00 PM - 03:00 PM',
      department: 'Physics',
      batch: 'PHYS 2021-25',
      faculty: 'Dr. Carol Davis',
      room: 'Lab 302',
      status: 'Draft',
      published: false,
    },
  ]

  const assignments: Assignment[] = [
    {
      id: 1,
      name: 'Essay - Literature Review',
      deadline: 'Jan 10, 2026, 11:59 PM',
      subject: 'Research Methods',
      department: 'Computer Science',
      batch: 'CSE 2022-26',
      faculty: 'Prof. John Doe',
      submissions: 45,
      evaluated: 30,
      status: 'Open',
    },
    {
      id: 2,
      name: 'Problem Set - Linear Algebra',
      deadline: 'Jan 12, 2026, 11:59 PM',
      subject: 'Mathematics',
      department: 'Mathematics',
      batch: 'MATH 2023-27',
      faculty: 'Prof. Bob Smith',
      submissions: 38,
      evaluated: 38,
      status: 'Closed',
    },
    {
      id: 3,
      name: 'Lab Report - Experiment 3',
      deadline: 'Jan 5, 2026, 11:59 PM',
      subject: 'Physics Lab',
      department: 'Physics',
      batch: 'PHYS 2021-25',
      faculty: 'Dr. Carol Davis',
      submissions: 25,
      evaluated: 10,
      status: 'Open',
    },
  ]

  const data: ExamOrAssignment[] = selectedType === 'Exam' ? exams : assignments

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'published':
      case 'closed': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-red-100 text-red-800';
    }
  }

  const QuickActions = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Create New {selectedType}
      </button>
      <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
        Bulk Assign Faculty
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        Publish Results
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Data
      </button>
    </div>
  )

  const TypeSelector = () => (
    <div className="flex mb-6 bg-white p-4 rounded-lg shadow-md">
      <button
        onClick={() => setSelectedType('Exam')}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          selectedType === 'Exam'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Exams
      </button>
      <button
        onClick={() => setSelectedType('Assignment')}
        className={`ml-2 px-6 py-2 rounded-lg font-medium transition-colors ${
          selectedType === 'Assignment'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Assignments
      </button>
    </div>
  )

  const totalItems = data.length
  const publishedItems = selectedType === 'Exam' 
    ? exams.filter(item => item.published).length 
    : assignments.filter(item => item.status === 'Closed').length
  const avgSubmissions = selectedType === 'Assignment' ? Math.round(assignments.reduce((sum, a) => sum + a.submissions, 0) / assignments.length) : 0
  const evaluated = selectedType === 'Assignment' ? Math.round(assignments.reduce((sum, a) => sum + a.evaluated, 0) / assignments.length) : 0

  const renderRow = (item: ExamOrAssignment) => {
    if (selectedType === 'Exam') {
      const examItem = item as Exam;
      return (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              examItem.type === 'Internal' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {examItem.type}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{examItem.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{examItem.date}<br/>{examItem.time}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{examItem.department}</div>
            <div className="text-sm text-gray-500">{examItem.batch}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{examItem.faculty}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{examItem.room}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(examItem.status)}`}>
              {examItem.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              examItem.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {examItem.published ? 'Yes' : 'No'}
            </span>
          </td>
        </>
      );
    } else {
      const assignmentItem = item as Assignment;
      return (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignmentItem.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignmentItem.deadline}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{assignmentItem.subject}</div>
            <div className="text-sm text-gray-500">{assignmentItem.department} / {assignmentItem.batch}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignmentItem.faculty}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignmentItem.submissions}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignmentItem.evaluated}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignmentItem.status)}`}>
              {assignmentItem.status}
            </span>
          </td>
        </>
      );
    }
  };

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exams & Assignments</h1>
          <p className="text-gray-600 mt-2">Manage assessments and evaluations for academic progress.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Type Selector */}
        <TypeSelector />

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedType}s Management
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {selectedType === 'Exam' ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Batch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject / Department / Batch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {renderRow(item)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Track Submissions</button>
                      {selectedType === 'Exam' && (
                        <button className={`text-${(item as Exam).published ? 'red' : 'green'}-600 hover:text-${(item as Exam).published ? 'red' : 'green'}-900`}>
                          {(item as Exam).published ? 'Unpublish' : 'Publish'}
                        </button>
                      )}
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
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total {selectedType}s</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalItems}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Published / Closed</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{publishedItems}</p>
          </div>
          {selectedType === 'Assignment' ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Submissions</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{avgSubmissions}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Evaluated</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{evaluated}</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Internal Exams</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{exams.filter(e => e.type === 'Internal').length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">External Exams</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{exams.filter(e => e.type === 'External').length}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}