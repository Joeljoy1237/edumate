import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function page() {
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900">
            Admissions Portal
          </h1>
          <p className="text-gray-500 font-light mt-2">
            Access the dedicated admissions management system.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Redirecting to Admissions System
          </h2>
          <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
            The admissions module operates as a separate dedicated system. Click
            the button below to be redirected securely.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Open Admissions Portal
            <FaExternalLinkAlt className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
