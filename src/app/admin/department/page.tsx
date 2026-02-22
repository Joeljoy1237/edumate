"use client";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import Link from "next/link";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import Skeleton from "../../../common/components/Skeleton";

export default function DepartmentInternalPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "departments"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDepartments(list);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        toast.error("Failed to load departments");
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      await deleteDoc(doc(db, "departments", id));
      toast.success("Department deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const handleExport = () => {
    if (departments.length === 0) {
      toast.error("No data to export");
      return;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      departments.map((d) => ({
        Name: d.name,
        Code: d.code,
        HOD: d.hod,
        Status: d.status,
        Students: d.students,
        Courses: d.courses?.length || 0,
        Faculty: d.faculty?.length || 0,
      })),
    );
    XLSX.utils.book_append_sheet(wb, ws, "Departments");
    XLSX.writeFile(wb, "departments_data.xlsx");
    toast.success("Export successful!");
  };

  // Calculate Stats
  const totalFaculty = departments.reduce(
    (sum, d) => sum + (d.faculty?.length || 0),
    0,
  );
  const totalStudents = departments.reduce(
    (sum, d) => sum + (d.students || 0),
    0,
  );

  if (loading)
    return (
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="w-full">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>

          {/* Quick Actions Skeleton */}
          <div className="flex space-x-4 mb-6">
            <Skeleton className="h-10 w-48 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="flex space-x-4 w-full">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <Skeleton key={i} className="h-4 w-24" />
                ))}
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 border-b border-gray-100 flex justify-between items-center"
              >
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200 border-l-4 border-l-gray-300"
              >
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Departments
          </h1>
          <p className="text-gray-600 mt-2">
            Overview and management of academic departments within the
            institution.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4 mb-6">
          <Link href="/admin/department/add">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Add New Department
            </button>
          </Link>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Export Data
          </button>
        </div>

        {/* Departments Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {departments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No departments found. Create one to get started.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name & Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HOD
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {dept.name}
                      </div>
                      <div className="text-sm text-gray-500">{dept.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.hod || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {(dept.courses || []).length} Courses
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {(dept.faculty || []).length} Faculty
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(dept.students || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dept.status || "active")}`}
                      >
                        {(dept.status || "active").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link href={`/admin/department/edit/${dept.id}`}>
                        <button className="text-blue-600 hover:text-blue-900 mr-2">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="text-red-600 hover:text-red-900"
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
          <div className="bg-white p-6 rounded-lg border border-gray-200 border-l-4 border-l-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Departments
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {departments.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 border-l-4 border-l-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Active Departments
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {departments.filter((d) => d.status === "active").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 border-l-4 border-l-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Faculty
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {totalFaculty}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 border-l-4 border-l-blue-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Students
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {totalStudents}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
