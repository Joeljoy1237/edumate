"use client"
import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../../../../config/firebaseConfig'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function EditFaculty() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [departments, setDepartments] = useState<string[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    uid: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    role: 'Faculty',
    accessStatus: 'active',
  })

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch Departments
            const deptSnapshot = await getDocs(collection(db, "departments"));
            const deptNames = deptSnapshot.docs.map(doc => doc.data().name);
            setDepartments(deptNames);

            // Fetch Faculty Data
            if (id) {
                const docRef = doc(db, "faculty", id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        name: data.name || '',
                        uid: data.uid || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        department: data.department || '',
                        designation: data.designation || '',
                        role: data.role || 'Faculty',
                        accessStatus: data.accessStatus || 'active',
                    });
                } else {
                    toast.error("Faculty not found");
                    router.push('/admin/faculty');
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load details");
        } finally {
            setFetching(false);
        }
    }
    fetchData();
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'uid' ? value.toUpperCase() : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
        if(!formData.name || !formData.email) {
            throw new Error("Name and Email are required")
        }

        const docRef = doc(db, "faculty", id);
        
        // Update Firestore Document
        await updateDoc(docRef, {
           name: formData.name,
           uid: formData.uid,
           // Email usually shouldn't be changed here without auth update, but allowing consistent DB update
           email: formData.email, 
           phone: formData.phone,
           department: formData.department,
           designation: formData.designation,
           role: formData.role,
           accessStatus: formData.accessStatus,
           updatedAt: new Date().toISOString()
        });
        
        toast.success("Faculty profile updated successfully!")
        router.push('/admin/faculty')

    } catch (error: any) {
        console.error(error)
        toast.error(error.message || "Failed to update profile")
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
            <h1 className="text-2xl font-bold text-gray-900">Edit Faculty Profile</h1>
            <Link href="/admin/faculty" className="text-sm text-gray-500 hover:text-gray-700">
                Cancel
            </Link>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Dr. John Doe"
                    />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Faculty ID (UID)</label>
                    <input 
                        name="uid"
                        value={formData.uid}
                        readOnly // Often ID shouldn't change
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        name="email"
                        value={formData.email}
                        readOnly // Email change requires Auth update complexity
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Email cannot be changed directly.</p>
                </div>
                
                {/* Note: Password field removed for Edit view */}

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input 
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Associate Professor"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="Faculty">Faculty</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Coordinator">Coordinator</option>
                         <option value="HOD">HOD</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                        name="accessStatus"
                        value={formData.accessStatus}
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
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-blue-500/30"
                >
                    {loading ? (
                         <>
                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Updating Profile...
                        </>
                    ) : 'Update Faculty Member'}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}
