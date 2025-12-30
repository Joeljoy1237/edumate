"use client"
import React from 'react'

export default function page() {
  // Sample data - in a real app, this would come from an API
  const routes = [
    {
      id: 1,
      routeNumber: 'RT-01',
      name: 'City Center Route',
      stops: ['Main Gate', 'City Mall', 'Railway Station', 'Airport Road'],
      distance: '15 km',
      duration: '45 min',
      status: 'active',
    },
    {
      id: 2,
      routeNumber: 'RT-02',
      name: 'Suburban Route',
      stops: ['Main Gate', 'Green Park', 'Lake View', 'Hill Top'],
      distance: '20 km',
      duration: '60 min',
      status: 'active',
    },
    {
      id: 3,
      routeNumber: 'RT-03',
      name: 'Express Route',
      stops: ['Main Gate', 'Highway Junction', 'Industrial Area'],
      distance: '10 km',
      duration: '30 min',
      status: 'maintenance',
    },
  ]

  const schedules = [
    {
      id: 1,
      routeNumber: 'RT-01',
      departure: '07:00 AM',
      arrival: '07:45 AM',
      vehicle: 'Bus-101',
      driver: 'Mr. Rajesh Singh',
      capacity: 50,
      booked: 45,
      status: 'scheduled',
    },
    {
      id: 2,
      routeNumber: 'RT-01',
      departure: '04:30 PM',
      arrival: '05:15 PM',
      vehicle: 'Bus-102',
      driver: 'Ms. Priya Mehta',
      capacity: 50,
      booked: 42,
      status: 'scheduled',
    },
    {
      id: 3,
      routeNumber: 'RT-02',
      departure: '07:15 AM',
      arrival: '08:15 AM',
      vehicle: 'Bus-103',
      driver: 'Mr. Amit Kumar',
      capacity: 40,
      booked: 38,
      status: 'scheduled',
    },
  ]

  const drivers = [
    {
      id: 1,
      name: 'Mr. Rajesh Singh',
      license: 'DL-12345678',
      contact: '+1 (555) 111-2222',
      vehicle: 'Bus-101',
      routes: ['RT-01'],
      status: 'active',
    },
    {
      id: 2,
      name: 'Ms. Priya Mehta',
      license: 'DL-87654321',
      contact: '+1 (555) 222-3333',
      vehicle: 'Bus-102',
      routes: ['RT-01'],
      status: 'active',
    },
    {
      id: 3,
      name: 'Mr. Amit Kumar',
      license: 'DL-11223344',
      contact: '+1 (555) 333-4444',
      vehicle: 'Bus-103',
      routes: ['RT-02'],
      status: 'leave',
    },
  ]

  const vehicles = [
    {
      id: 'Bus-101',
      type: 'AC Bus',
      capacity: 50,
      registration: 'MH-12-AB-101',
      maintenanceDue: '2026-02-15',
      status: 'operational',
    },
    {
      id: 'Bus-102',
      type: 'Non-AC Bus',
      capacity: 50,
      registration: 'MH-12-AB-102',
      maintenanceDue: '2026-01-20',
      status: 'operational',
    },
    {
      id: 'Bus-103',
      type: 'Mini Bus',
      capacity: 40,
      registration: 'MH-12-AB-103',
      maintenanceDue: '2026-03-10',
      status: 'under_maintenance',
    },
  ]

  const allocations = [
    {
      id: 1,
      student: 'John Doe (STU001)',
      regNumber: '2022CSE001',
      routeNumber: 'RT-01',
      stop: 'Main Gate',
      status: 'allocated',
      startDate: '2025-08-15',
    },
    {
      id: 2,
      student: 'Jane Smith (STU002)',
      regNumber: '2023MATH001',
      routeNumber: 'RT-02',
      stop: 'Green Park',
      status: 'allocated',
      startDate: '2025-08-15',
    },
    {
      id: 3,
      student: 'Mike Wilson (STU003)',
      regNumber: '2021PHYS001',
      routeNumber: 'RT-01',
      stop: 'City Mall',
      status: 'deallocated',
      startDate: '2025-08-15',
    },
  ]

  const fees = [
    {
      id: 1,
      student: 'John Doe (STU001)',
      routeNumber: 'RT-01',
      amount: '$200/month',
      dueDate: '2026-01-10',
      status: 'paid',
      paymentDate: '2025-12-15',
    },
    {
      id: 2,
      student: 'Jane Smith (STU002)',
      routeNumber: 'RT-02',
      amount: '$250/month',
      dueDate: '2026-01-10',
      status: 'pending',
      paymentDate: null,
    },
    {
      id: 3,
      student: 'Anna Green (STU004)',
      routeNumber: 'RT-01',
      amount: '$200/month',
      dueDate: '2026-01-10',
      status: 'overdue',
      paymentDate: null,
    },
  ]

  const tripLogs = [
    {
      id: 1,
      date: '2025-12-29',
      routeNumber: 'RT-01',
      vehicle: 'Bus-101',
      driver: 'Mr. Rajesh Singh',
      departureTime: '07:00 AM',
      arrivalTime: '07:45 AM',
      studentsBoarded: 45,
      status: 'completed',
    },
    {
      id: 2,
      date: '2025-12-29',
      routeNumber: 'RT-02',
      vehicle: 'Bus-103',
      driver: 'Mr. Amit Kumar',
      departureTime: '07:15 AM',
      arrivalTime: '08:15 AM',
      studentsBoarded: 38,
      status: 'completed',
    },
    {
      id: 3,
      date: '2025-12-30',
      routeNumber: 'RT-01',
      vehicle: 'Bus-102',
      driver: 'Ms. Priya Mehta',
      departureTime: '04:30 PM',
      arrivalTime: '05:15 PM',
      studentsBoarded: 42,
      status: 'in_progress',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'scheduled':
      case 'operational':
      case 'allocated':
      case 'paid':
      case 'completed': return 'bg-green-100 text-green-800';
      case 'maintenance':
      case 'under_maintenance':
      case 'leave':
      case 'deallocated':
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'overdue':
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const QuickActions = () => (
    <div className="flex space-x-4 mb-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Add New Route
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Allocate Student
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Export Data
      </button>
    </div>
  )

  const totalRoutes = routes.length
  const totalVehicles = vehicles.length
  const totalStudentsAllocated = allocations.filter(a => a.status === 'allocated').length
  const totalFeesPending = fees.filter(f => f.status === 'pending' || f.status === 'overdue').length

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Transportation</h1>
          <p className="text-gray-600 mt-2">Student transportation facilities and route management.</p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Bus Routes & Stops */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Bus Routes & Stop Locations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.routeNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{route.stops.slice(0, 2).join(', ')}{route.stops.length > 2 ? ` +${route.stops.length - 2} more` : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.distance}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(route.status)}`}>
                        {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
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

        {/* Bus Schedules */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Bus Schedules</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked / Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.routeNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.departure}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.arrival}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.vehicle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.driver}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.booked}/{schedule.capacity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                        {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Track</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Driver & Vehicle Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Drivers */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Driver Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Routes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {drivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{driver.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.license}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.vehicle}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{driver.routes.join(', ')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver.status)}`}>
                          {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Assign</button>
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vehicles */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Vehicle Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.registration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.maintenanceDue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Assign</button>
                        <button className="text-blue-600 hover:text-blue-900">Maintenance</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Student Route Allocation & Fees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Allocation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Student Route Allocation</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route / Stop</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
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
                        <div className="text-sm text-gray-900">{allocation.routeNumber}</div>
                        <div className="text-sm text-gray-500">{allocation.stop}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(allocation.status)}`}>
                          {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className={`text-${allocation.status === 'allocated' ? 'red' : 'green'}-600 hover:text-${allocation.status === 'allocated' ? 'red' : 'green'}-900`}>
                          {allocation.status === 'allocated' ? 'Deallocate' : 'Allocate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fees */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Transport Fees</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.routeNumber}</td>
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
        </div>

        {/* Trip Logs (Optional) */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Attendance / Trip Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle / Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure / Arrival</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students Boarded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tripLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.routeNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.vehicle}</div>
                      <div className="text-sm text-gray-500">{log.driver}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.departureTime} / {log.arrivalTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.studentsBoarded}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View Log</button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
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
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Routes</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalRoutes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Vehicles</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalVehicles}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Allocated Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalStudentsAllocated}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pending Fees</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalFeesPending}</p>
          </div>
        </div>
      </div>
    </div>
  )
}