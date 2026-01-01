"use client"
import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../../../../config/firebaseConfig'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function EditSubject() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [departments, setDepartments] = useState<string[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    semester: '',
    credits: '',
    type: 'Core',
    status: 'active',
  })

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch Departments
            const deptSnapshot = await getDocs(collection(db, "departments"));
            const deptNames = deptSnapshot.docs.map(doc => doc.data().name);
            setDepartments(deptNames);

            // Fetch Subject
            if (id) {
                const docRef = doc(db, "subjects", id)
                const docSnap = await getDoc(docRef)
                
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setFormData({
                        name: data.name || '',
                        code: data.code || '',
                        department: data.department || '',
                        semester: data.semester || '',
                        credits: data.credits || '',
                        type: data.type || 'Core',
                        status: data.status || 'active',
                    })
                } else {
                    toast.error("Subject not found")
                    router.push('/admin/subject')
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load data")
        } finally {
            setFetching(false)
        }
    }
    fetchData()
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'code' ? value.toUpperCase() : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
        if(!formData.name || !formData.code) {
            throw new Error("Subject Name and Code are required")
        }

       const docRef = doc(db, "subjects", id)
       await updateDoc(docRef, {
        ...formData,
        credits: Number(formData.credits),
        updatedAt: new Date().toISOString()
       })

       toast.success("Subject updated successfully!")
       router.push('/admin/subject')

    } catch (error: any) {
        console.log(error)
        toast.error(error.message || "Failed to update subject")
    } finally {
        setLoading(false)
    }
  }

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )

  return (
    <div className="mt-[100px] p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Edit Subject</h1>
            <Link href="/admin/subject" className="text-sm text-gray-500 hover:text-gray-700">
                Cancel
            </Link>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Data Structures and Algorithms"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
                    <input 
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        type="text" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. CS-301"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select 
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                    <select 
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">Select Semester</option>
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="4th Semester">4th Semester</option>
                        <option value="5th Semester">5th Semester</option>
                        <option value="6th Semester">6th Semester</option>
                        <option value="7th Semester">7th Semester</option>
                        <option value="8th Semester">8th Semester</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                    <input 
                        name="credits"
                        value={formData.credits}
                        onChange={handleChange}
                        type="number" 
                        required
                        min="1"
                        max="10"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. 4"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select 
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="Core">Core</option>
                        <option value="Elective">Elective</option>
                        <option value="Lab">Lab</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {loading ? 'Saving...' : 'Update Subject'}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}
