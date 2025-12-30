"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const university = {
    name: 'Example University',
    code: 'EXU',
  }

  const affiliatedColleges = [
    { id: 1, name: 'Central College', location: 'Main Campus', status: 'active' },
    { id: 2, name: 'Northern Branch', location: 'North City', status: 'active' },
    { id: 3, name: 'Southern Institute', location: 'South Town', status: 'inactive' },
  ]

  const academicRegulations = [
    'Minimum CGPA of 2.0 required for graduation.',
    'Maximum 18 credit hours per semester.',
    'Academic probation if GPA below 1.5.',
    'Plagiarism policy strictly enforced.',
  ]

  const semesterStructure = [
    { semester: 'Fall', start: 'Aug 25, 2026', end: 'Dec 18, 2026', duration: '16 weeks' },
    { semester: 'Spring', start: 'Jan 12, 2027', end: 'May 7, 2027', duration: '16 weeks' },
    { semester: 'Summer', start: 'Jun 1, 2027', end: 'Aug 15, 2027', duration: '10 weeks' },
  ]

  const gradingSystem = [
    { grade: 'A', points: 4.0, range: '90-100%' },
    { grade: 'B', points: 3.0, range: '80-89%' },
    { grade: 'C', points: 2.0, range: '70-79%' },
    { grade: 'D', points: 1.0, range: '60-69%' },
    { grade: 'F', points: 0.0, range: 'Below 60%' },
  ]

  const examinationRules = [
    'Exams must be proctored; no electronic devices allowed.',
    'Late submissions penalized by 10% per day.',
    'Retake policy: One retake per course, fee applies.',
    'Final exam weight: 40% of total grade.',
  ]

  const academicCalendar = [
    { event: 'Spring Semester Start', date: 'Jan 12, 2026' },
    { event: 'Midterm Exams', date: 'Feb 23 - Mar 2, 2026' },
    { event: 'Spring Break', date: 'Mar 9-13, 2026' },
    { event: 'Final Exams', date: 'Apr 27 - May 7, 2026' },
    { event: 'Commencement', date: 'May 15, 2026' },
  ]

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">University Configuration</h1>
          <p className="text-gray-600 mt-2">Define and manage university-level academic configuration.</p>
        </div>

        {/* University Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">University Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-lg text-gray-900">{university.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
              <p className="text-lg text-gray-900">{university.code}</p>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Edit University Info
          </button>
        </div>

        {/* Affiliated Colleges Table */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Affiliated Colleges</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {affiliatedColleges.map((college) => (
                <tr key={college.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{college.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(college.status)}`}>
                      {college.status.charAt(0).toUpperCase() + college.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 bg-gray-50">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Add Affiliated College
            </button>
          </div>
        </div>

        {/* Grid for Other Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Academic Regulations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Regulations</h2>
            <ul className="space-y-2">
              {academicRegulations.map((reg, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p className="text-gray-700">{reg}</p>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Edit Regulations
            </button>
          </div>

          {/* Semester Structure */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Semester Structure</h2>
            <ul className="space-y-3">
              {semesterStructure.map((sem, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="font-medium text-gray-900">{sem.semester}</div>
                  <div className="text-sm text-gray-600">Start: {sem.start} | End: {sem.end}</div>
                  <div className="text-sm text-gray-500">Duration: {sem.duration}</div>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Edit Structure
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grading System */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Grading System</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Range</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gradingSystem.map((grade, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900">{grade.grade}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{grade.points}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">{grade.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Edit Grading
            </button>
          </div>

          {/* Examination Rules */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Examination Rules</h2>
            <ul className="space-y-2">
              {examinationRules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p className="text-gray-700">{rule}</p>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Edit Rules
            </button>
          </div>
        </div>

        {/* Academic Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Calendar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicCalendar.map((event, index) => (
              <div key={index} className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <div className="font-medium text-gray-900">{event.event}</div>
                <div className="text-sm text-gray-600">{event.date}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Edit Calendar
          </button>
        </div>
      </div>
    </div>
  )
}