"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const hostels = [
    {
      id: 1,
      block: 'Block A (Boys)',
      warden: 'Mr. Rajesh Kumar',
      capacity: 200,
      occupied: 180,
      availability: 20,
      contact: '+1 (555) 100-200',
      status: 'active',
    },
    {
      id: 2,
      block: 'Block B (Girls)',
      warden: 'Ms. Priya Sharma',
      capacity: 150,
      occupied: 145,
      availability: 5,
      contact: '+1 (555) 200-300',
      status: 'active',
    },
    {
      id: 3,
      block: 'Block C (PG)',
      warden: 'Dr. Amit Patel',
      capacity: 100,
      occupied: 0,
      availability: 100,
      contact: '+1 (555) 300-400',
      status: 'maintenance',
    },
  ]

  const rooms = [
    {
      id: 'A-101',
      block: 'Block A (Boys)',
      roomType: 'Double',
      capacity: 2,
      occupied: 2,
      availability: 0,
      students: ['John Doe (STU001)', 'Mike Wilson (STU003)'],
      fees: '$500/month',
    },
    {
      id: 'B-205',
      block: 'Block B (Girls)',
      roomType: 'Triple',
      capacity: 3,
      occupied: 3,
      availability: 0,
      students: ['Jane Smith (STU002)', 'Anna Green (STU004)', 'Lisa Taylor'],
      fees: '$400/month',
    },
    {
      id: 'C-301',
      block: 'Block C (PG)',
      roomType: 'Single',
      capacity: 1,
      occupied: 0,
      availability: 1,
      students: [],
      fees: '$600/month',
    },
  ]

  const allocations = [
    {
      id: 1,
      student: 'John Doe (STU001)',
      regNumber: '2022CSE001',
      block: 'Block A (Boys)',
      room: 'A-101',
      checkIn: '2025-08-15',
      checkOut: null,
      status: 'active',
    },
    {
      id: 2,
      student: 'Jane Smith (STU002)',
      regNumber: '2023MATH001',
      block: 'Block B (Girls)',
      room: 'B-205',
      checkIn: '2025-08-15',
      checkOut: null,
      status: 'active',
    },
    {
      id: 3,
      student: 'Mike Wilson (STU003)',
      regNumber: '2021PHYS001',
      block: 'Block A (Boys)',
      room: 'A-102',
      checkIn: '2025-08-15',
      checkOut: '2025-12-20',
      status: 'checked_out',
    },
  ]

  const fees = [
    {
      id: 1,
      student: 'John Doe (STU001)',
      block: 'Block A (Boys)',
      amount: '$500',
      dueDate: '2026-01-10',
      status: 'paid',
      paymentDate: '2025-12-15',
    },
    {
      id: 2,
      student: 'Jane Smith (STU002)',
      block: 'Block B (Girls)',
      amount: '$400',
      dueDate: '2026-01-10',
      status: 'pending',
      paymentDate: null,
    },
    {
      id: 3,
      student: 'Anna Green (STU004)',
      block: 'Block B (Girls)',
      amount: '$400',
      dueDate: '2026-01-10',
      status: 'overdue',
      paymentDate: null,
    },
  ]

  const rules = [
    'Quiet hours: 10 PM - 6 AM',
    'No visitors after 8 PM',
    'Room cleaning every Friday',
    'Report maintenance issues within 24 hours',
    'No cooking in rooms',
  ]

  const notices = [
    { title: 'Winter Break Check-out', date: 'Dec 20, 2025', message: 'All students must check-out by Dec 20 for winter break.' },
    { title: 'Fee Reminder', date: 'Dec 15, 2025', message: 'January fees due by Jan 10. Late fee: $50.' },
    { title: 'Maintenance Schedule', date: 'Dec 10, 2025', message: 'Block C under maintenance from Dec 15-20.' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'checked_out': return 'bg-gray-100 text-gray-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Hostel Block
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Allocate Room
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Records
      </button>
    </div>
  )

  const totalCapacity = hostels.reduce((sum, h) => sum + h.capacity, 0)
  const totalOccupied = hostels.reduce((sum, h) => sum + h.occupied, 0)
  const totalAvailability = totalCapacity - totalOccupied
  const totalStudents = allocations.filter(a => a.status === 'active').length

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Hostel</h1>
          <p className="text-gray-600 mt-2">Student accommodation and room allocation management.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Hostel Blocks Overview */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Hostel Blocks & Warden Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warden</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hostels.map((hostel) => (
                  <tr key={hostel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hostel.block}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hostel.warden}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hostel.capacity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hostel.occupied}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${hostel.availability > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {hostel.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hostel.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(hostel.status)}`}>
                        {hostel.status.charAt(0).toUpperCase() + hostel.status.slice(1)}
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
          </div>
        </div>

        {/* Room Details & Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Rooms */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Room Details & Availability</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block / Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{room.block}</div>
                        <div className="text-sm text-gray-500">{room.roomType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.occupied}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.fees}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Allocate</button>
                        <button className="text-blue-600 hover:text-blue-900">View Students</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Allocation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Student Hostel Allocation & Check-in/Check-out</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block / Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allocations.map((allocation) => (
                    <tr key={allocation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.student}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.regNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{allocation.block}</div>
                        <div className="text-sm text-gray-500">{allocation.room}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.checkIn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.checkOut || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(allocation.status)}`}>
                          {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Check-in</button>
                        <button className="text-red-600 hover:text-red-900">Check-out</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Hostel Fees */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Hostel Fees</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.student}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.block}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fee.status)}`}>
                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.paymentDate || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Pay Now</button>
                      <button className="text-blue-600 hover:text-blue-900">Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rules & Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hostel Rules</h2>
            <ul className="space-y-2">
              {rules.map((rule, index) => (
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

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Notices</h2>
            <ul className="space-y-3">
              {notices.map((notice, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="font-medium text-gray-900">{notice.title}</div>
                  <div className="text-sm text-gray-500">{notice.date}</div>
                  <p className="text-sm text-gray-700 mt-1">{notice.message}</p>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Add Notice
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Capacity</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalCapacity}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Occupied Rooms</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalOccupied}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Available Beds</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalAvailability}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalStudents}</p>
          </div>
        </div>
      </div>
    </div>
  )
}