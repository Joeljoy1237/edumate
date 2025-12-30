"use client"
import React, { useState } from 'react'

interface MarkRecord {
  regNumber: string;
  name: string;
  subject: string;
  marks: number;
  semester: string;
}

interface MigrationLog {
  id: number;
  action: string;
  timestamp: string;
  status: 'Success' | 'Error' | 'Rollback';
  details: string;
}

export default function page() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<MarkRecord[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [isValidated, setIsValidated] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [showRollback, setShowRollback] = useState(false)

  // Sample data - in a real app, this would come from API or file parsing
  const sampleParsedData: MarkRecord[] = [
    {
      regNumber: '2022CSE001',
      name: 'John Doe',
      subject: 'Data Structures',
      marks: 85,
      semester: 'Fall 2024',
    },
    {
      regNumber: '2023MATH001',
      name: 'Jane Smith',
      subject: 'Calculus II',
      marks: 92,
      semester: 'Fall 2024',
    },
    {
      regNumber: '2021PHYS001',
      name: 'Mike Wilson',
      subject: 'Quantum Physics',
      marks: 78,
      semester: 'Fall 2024',
    },
  ]

  const sampleErrors: string[] = [
    'Invalid registration number in row 5: ABC123',
    'Missing marks for student John Doe in subject Algorithms',
    'Duplicate entry for regNumber 2022CSE002',
  ]

  const sampleLogs: MigrationLog[] = [
    {
      id: 1,
      action: 'File Upload',
      timestamp: '2025-12-29 14:30',
      status: 'Success',
      details: 'marks_fall2024.csv uploaded successfully',
    },
    {
      id: 2,
      action: 'Validation',
      timestamp: '2025-12-29 14:35',
      status: 'Error',
      details: '3 errors found during validation',
    },
    {
      id: 3,
      action: 'Import',
      timestamp: '2025-12-29 15:00',
      status: 'Success',
      details: '150 records imported',
    },
    {
      id: 4,
      action: 'Rollback',
      timestamp: '2025-12-29 15:10',
      status: 'Success',
      details: 'Rollback completed for batch Fall 2024',
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setUploadedFile(file)
    if (file) {
      // Simulate parsing
      setTimeout(() => {
        setParsedData(sampleParsedData)
        setErrors(sampleErrors)
        setIsValidated(false)
      }, 1000)
    }
  }

  const handleValidate = () => {
    setIsValidated(true)
    // Simulate validation
  }

  const handleApproveImport = () => {
    setIsApproved(true)
    // Simulate import
  }

  const handleRollback = () => {
    setShowRollback(false)
    // Simulate rollback
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Rollback': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Previous Mark Migration</h1>
          <p className="text-gray-600 mt-2">Import historical academic records from legacy systems.</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Previous Semester Marks</h2>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <span className="text-sm text-gray-500">Supports CSV/Excel formats</span>
          </div>
          {uploadedFile && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">File uploaded: {uploadedFile.name}</p>
            </div>
          )}
        </div>

        {/* Mapping Configuration */}
        {parsedData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Student–Subject Mapping</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parsedData.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.regNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.marks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.semester}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Map</button>
                        <button className="text-red-600 hover:text-red-900">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!isValidated ? (
              <div className="p-6 bg-gray-50">
                <button
                  onClick={handleValidate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Validate Data
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* Validation and Error Reports */}
        {isValidated && errors.length > 0 && (
          <div className="bg-white rounded-lg shadow-md mb-8 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Validation Errors</h2>
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <p className="text-sm text-gray-700">{error}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={() => setIsValidated(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors mr-2"
              >
                Re-validate
              </button>
              <button
                onClick={handleApproveImport}
                disabled={errors.length > 0}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
              >
                Approve & Import
              </button>
            </div>
          </div>
        )}

        {/* Approval Section */}
        {isApproved && (
          <div className="bg-white rounded-lg shadow-md mb-8 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Approved</h2>
            <p className="text-green-600 mb-4">Migration completed successfully. Records have been imported.</p>
            <button
              onClick={() => setShowRollback(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Rollback Import
            </button>
          </div>
        )}

        {/* Migration Logs */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Migration Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rollback Modal */}
        {showRollback && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Rollback</h3>
              <p className="text-sm text-gray-600 mb-6">This will revert the imported marks. Are you sure?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRollback(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRollback}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Rollback
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Records Parsed</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{parsedData.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Validation Errors</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{errors.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Logs Entries</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{sampleLogs.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}