"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../config/firebaseConfig";
import toast from "react-hot-toast";
import Image from "next/image";
import Skeleton from "../../../common/components/Skeleton";
import {
  IoCameraOutline,
  IoSaveOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function AdminProfilePage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    role: "Administrator",
    department: "",
    bio: "",
    avatar: "/assets/profile.png", // Default
  });

  const [sessionInfo, setSessionInfo] = useState({
    ip: "Loading...",
    browser: "Unknown",
    os: "Unknown",
  });

  useEffect(() => {
    // Simple User Agent Parser
    const ua = window.navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";

    if (ua.indexOf("Firefox") > -1) browser = "Mozilla Firefox";
    else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
    else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1)
      browser = "Opera";
    else if (ua.indexOf("Trident") > -1)
      browser = "Microsoft Internet Explorer";
    else if (ua.indexOf("Edge") > -1) browser = "Microsoft Edge";
    else if (ua.indexOf("Chrome") > -1) browser = "Google Chrome";
    else if (ua.indexOf("Safari") > -1) browser = "Apple Safari";

    if (ua.indexOf("Win") > -1) os = "Windows";
    else if (ua.indexOf("Mac") > -1) os = "MacOS";
    else if (ua.indexOf("Linux") > -1) os = "Linux";
    else if (ua.indexOf("Android") > -1) os = "Android";
    else if (ua.indexOf("like Mac") > -1) os = "iOS";

    setSessionInfo((prev) => ({ ...prev, browser, os }));

    // Fetch IP
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setSessionInfo((prev) => ({ ...prev, ip: data.ip })))
      .catch(() => setSessionInfo((prev) => ({ ...prev, ip: "Unavailable" })));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, "admins", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile({ ...profile, ...docSnap.data() });
          } else {
            // Init profile if not exists
            setProfile((p) => ({
              ...p,
              name: user.displayName || "Admin",
              email: user.email,
            }));
          }
        } catch (error) {
          console.error("Error fetching profile", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await setDoc(
        doc(db, "admins", user.uid),
        {
          ...profile,
          email: user.email, // Ensure email stays synced
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const storageRef = ref(storage, `admin_avatars/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setProfile((prev) => ({ ...prev, avatar: downloadURL }));

      // Auto update in Firestore
      await setDoc(
        doc(db, "admins", user.uid),
        {
          avatar: downloadURL,
        },
        { merge: true },
      );

      toast.success("Profile picture updated");
    } catch (error) {
      console.error("Upload error", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white min-h-screen">
        {/* Header Skeleton */}
        <div className="h-48 bg-gray-100 relative">
          <Skeleton className="w-full h-full" />
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
              <Skeleton className="w-full h-full rounded-full" />
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          {/* Info Header Skeleton */}
          <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Personal Info Skeleton */}
            <div className="space-y-8">
              <div>
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-24 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Info Skeleton */}
            <div className="space-y-8">
              <div>
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <Skeleton className="h-48 w-full rounded-lg mt-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-full">
        <div className="bg-white overflow-hidden">
          {/* Cover / Header */}
          <div className="h-48 bg-gradient-to-r from-slate-700 to-slate-900 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  <Image
                    src={profile.avatar || "/assets/profile.png"}
                    alt="Profile"
                    width={128}
                    height={128}
                    className={`object-cover w-full h-full ${
                      uploading ? "opacity-50" : ""
                    }`}
                  />
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 bg-black/80 text-white rounded-full hover:bg-black transition-colors cursor-pointer"
                  title="Change Profile Picture"
                >
                  <IoCameraOutline />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded hover:bg-white/20 transition-colors text-sm font-medium border border-white/20"
              >
                <IoLogOutOutline className="mr-2 text-lg" />
                Logout
              </button>
            </div>
          </div>

          <div className="pt-20 px-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-gray-100 pb-6">
              <div>
                <h1 className="text-3xl font-light text-gray-900 mb-1">
                  {profile.name || "Admin User"}
                </h1>
                <p className="text-gray-500 font-light">{user?.email}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className={`flex items-center px-6 py-2.5 rounded text-sm font-medium transition-all ${
                    isEditing
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <IoSaveOutline className="mr-2 text-lg" />
                      Save Changes
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Personal Info */}
              <div className="space-y-8">
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-0 py-2 border-b border-gray-200 focus:border-black focus:ring-0 bg-transparent disabled:text-gray-500 transition-colors placeholder-gray-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-0 py-2 border-b border-gray-200 focus:border-black focus:ring-0 bg-transparent disabled:text-gray-500 transition-colors placeholder-gray-300"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Bio
                    </label>
                    <textarea
                      disabled={!isEditing}
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      rows={4}
                      placeholder="Write a short bio..."
                      className="w-full px-3 py-2 rounded bg-gray-50 border-0 focus:ring-1 focus:ring-gray-300 disabled:text-gray-500 transition-all resize-none text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Job Info */}
              <div className="space-y-8">
                <h3 className="text-lg font-medium text-gray-900">
                  Role & Department
                </h3>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value={profile.role}
                        className="w-full px-0 py-2 border-b border-gray-200 bg-transparent text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.department}
                      onChange={(e) =>
                        setProfile({ ...profile, department: e.target.value })
                      }
                      placeholder="e.g. Administration"
                      className="w-full px-0 py-2 border-b border-gray-200 focus:border-black focus:ring-0 bg-transparent disabled:text-gray-500 transition-colors placeholder-gray-300"
                    />
                  </div>

                  <div className="border border-gray-100 rounded p-6 mt-8">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Account Status
                    </h4>
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-gray-600">Active</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span className="text-gray-400">IP Address</span>
                        <span className="font-mono">{sessionInfo.ip}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span className="text-gray-400">Device</span>
                        <span>
                          {sessionInfo.os} - {sessionInfo.browser}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span className="text-gray-400">Last Login</span>
                        <span>
                          {new Date().toLocaleDateString()}{" "}
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
