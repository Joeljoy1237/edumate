"use client"
import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../config/firebaseConfig'
import Link from 'next/link'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'
import { FaGraduationCap, FaArrowUp } from 'react-icons/fa'

export default function BatchesPage() {
  const [batches, setBatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<any>(null)
  const [newSemester, setNewSemester] = useState('')

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "batches"), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setBatches(list)
        setLoading(false)
    }, (error) => {
        console.error(error)
        toast.error("Failed to load batches")
        setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this batch?")) return;
    try {
        await deleteDoc(doc(db, "batches", id))
        toast.success("Batch deleted")
    } catch (error) {
        toast.error("Failed to delete")
    }
  }

  const handleExport = () => {
     if (batches.length === 0) {
         toast.error("No data to export");
         return;
     }
     const wb = XLSX.utils.book_new();
     const ws = XLSX.utils.json_to_sheet(batches.map(b => ({
         Name: b.name,
         Department: b.department,
         Semester: b.semester,
         Tutor: b.tutor,
         AcademicYear: b.academicYear,
         Status: b.status
     })));
     XLSX.utils.book_append_sheet(wb, ws, "Batches");
     XLSX.writeFile(wb, "batches_data.xlsx");
     toast.success("Export successful!");
   }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  const openUpgradeModal = (batch: any) => {
      setSelectedBatch(batch);
      // Auto-suggest next semester
      const currentSem = batch.semester;
      const match = currentSem.match(/\d+/); // Extract number
      if (match) {
          const num = parseInt(match[0]);
          setNewSemester(currentSem.replace(/\d+/, num + 1));
      } else {
          setNewSemester(currentSem + " (Next)");
      }
      setUpgradeModalOpen(true);
  }

  const handleUpgradeSemester = async () => {
      if (!selectedBatch || !newSemester) return;
      
      try {
          await updateDoc(doc(db, "batches", selectedBatch.id), {
              semester: newSemester,
              lastUpdated: new Date().toISOString()
          });
          toast.success(`Batch upgraded to ${newSemester}`);
          setUpgradeModalOpen(false);
          setSelectedBatch(null);
      } catch (error) {
          console.error(error);
          toast.error("Failed to upgrade semester");
      }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Batches</h1>
          <p className="text-gray-600 mt-2">Group students for academic operations and management.</p>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4 mb-6">
            <Link href="/admin/batches/add">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Add New Batch
                </button>
            </Link>
            <button 
                onClick={handleExport}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
                Export Data
            </button>
        </div>

        {/* Batches Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
         {batches.length === 0 ? (
             <div className="p-8 text-center text-gray-500">
                No batches found. Add one to get started.
             </div>
          ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Tutor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{batch.department}</div>
                    <div className="text-sm font-bold text-blue-600">{batch.semester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.tutor || 'Not Assigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.academicYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.status || 'active')}`}>
                      {(batch.status || 'active').charAt(0).toUpperCase() + (batch.status || 'active').slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-3">
                    <button 
                        onClick={() => openUpgradeModal(batch)}
                        title="Upgrade Semester"
                        className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1.5 rounded transition-colors"
                    >
                         <FaArrowUp />
                    </button>
                    <Link href={`/admin/batches/edit/${batch.id}`}>
                        <button className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-1.5 rounded transition-colors">Edit</button>
                    </Link>
                    <button 
                        onClick={() => handleDelete(batch.id)} 
                        className="text-red-600 hover:text-red-900 hover:bg-red-50 p-1.5 rounded transition-colors"
                    >
                        Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Batches</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{batches.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Batches</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{batches.filter(b => b.status === 'active').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{batches.filter(b => b.status === 'completed').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Departments Covered</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {new Set(batches.map(b => b.department)).size}
            </p>
          </div>
        </div>

        {/* Upgrade Modal */}
        {upgradeModalOpen && selectedBatch && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-[400px] animate-in zoom-in-95 duration-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Upgrade Semester</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Promote <strong>{selectedBatch.name}</strong> to the next semester.
                    </p>
                    
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Semester</label>
                        <div className="text-gray-900 font-medium mb-3">{selectedBatch.semester}</div>

                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Semester Name</label>
                        <input 
                            type="text" 
                            value={newSemester}
                            onChange={(e) => setNewSemester(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button 
                            onClick={() => setUpgradeModalOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                         <button 
                            onClick={handleUpgradeSemester}
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <FaArrowUp className="text-sm"/>
                            Confirm Upgrade
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}