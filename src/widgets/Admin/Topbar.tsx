import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

// Define searchable admin routes for quick access
const adminSearchRoutes = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "Manage Students", link: "/admin/student" },
  { title: "Add Student", link: "/admin/student/add" },
  { title: "Manage Faculty", link: "/admin/faculty" },
  { title: "Add Faculty", link: "/admin/faculty/add" },
  { title: "Departments", link: "/admin/department" },
  { title: "Add Department", link: "/admin/department/add" },
  { title: "Subjects", link: "/admin/subject" },
  { title: "Add Subject", link: "/admin/subject/add" },
  { title: "Batches", link: "/admin/batches" },
  { title: "Add Batch", link: "/admin/batches/add" },
  { title: "Time Table", link: "/admin/timetable" },
  { title: "Exams & Assignments", link: "/admin/exams-assignments" },
  { title: "Transportation", link: "/admin/transportation" },
  { title: "Hostel", link: "/admin/hostel" },
  { title: "Profile", link: "/admin/profile" },
  { title: "Notifications", link: "/admin/notifications" },
];

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof adminSearchRoutes>(
    [],
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  const [avatar, setAvatar] = useState("/assets/profile.png");

  // Fetch real-time profile avatar
  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "admins", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.avatar) setAvatar(data.avatar);
        }
      });
      return () => unsub();
    }
  }, [user]);

  // Fetch real-time notifications
  useEffect(() => {
    // Only fetch last 20 notifications for performance
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc"),
      limit(20),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Convert timestamp to readable time string (simplified)
          time: doc.data().createdAt
            ? new Date(doc.data().createdAt).toLocaleString()
            : "",
        }));
        setNotifications(list);
      },
      (error) => {
        console.error("Notification Error:", error);
      },
    );

    return () => unsubscribe();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = async () => {
    const unreadDocs = notifications.filter((n) => !n.read);
    const updatePromises = unreadDocs.map((n) =>
      updateDoc(doc(db, "notifications", n.id), { read: true }),
    );

    try {
      await Promise.all(updatePromises);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error updating notifications", error);
    }
  };

  const handleCreateTestNotification = async () => {
    // Temporary helper for testing
    const { addDoc } = await import("firebase/firestore");
    await addDoc(collection(db, "notifications"), {
      title: "Test Notification",
      message:
        "This is a test notification generated at " +
        new Date().toLocaleTimeString(),
      createdAt: new Date().toISOString(),
      read: false,
      type: "info",
    });
  };

  // Handle Search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    } else {
      const lowerQ = searchQuery.toLowerCase();
      const results = adminSearchRoutes.filter((route) =>
        route.title.toLowerCase().includes(lowerQ),
      );
      setSearchResults(results);
    }
  }, [searchQuery]);

  const handleSearchSelect = (link: string) => {
    router.push(link);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setSearchResults([]);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-16 lg:h-[11vh] fixed bg-white/80 backdrop-blur-md w-full lg:w-[82vw] lg:left-[17vw] flex flex-row items-center justify-between px-4 sm:px-6 lg:px-[2vw] shadow-sm z-50 border-b border-gray-100/50">
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-10 flex-1">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <FiMenu className="text-2xl text-gray-700" />
        </button>

        <span className="font-bold text-base sm:text-lg lg:text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent truncate">
          Welcome, Admin👋
        </span>

        {/* Search Bar - Hidden on small mobile */}
        <div
          className="relative group hidden sm:block flex-1 max-w-md lg:max-w-lg"
          ref={searchRef}
        >
          <div
            className={`flex items-center bg-gray-50/80 hover:bg-white border text-gray-600 rounded-full px-4 lg:px-5 py-2 lg:py-2.5 w-full transition-all duration-300 ease-in-out
                ${searchResults.length > 0 || searchQuery ? "bg-white shadow-lg ring-2 ring-blue-500/10 border-blue-100" : "border-transparent hover:shadow-md hover:border-gray-200"}
            `}
          >
            <FaSearch
              className={`mr-2 lg:mr-3 text-base lg:text-lg transition-colors flex-shrink-0 ${searchResults.length > 0 ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500"}`}
            />
            <input
              type="text"
              placeholder="Quick Search..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400/80 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-14 left-0 w-full bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="p-2 bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4">
                Search Results
              </div>
              <div className="max-h-[350px] overflow-y-auto py-1">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearchSelect(result.link)}
                    className="px-4 py-3 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between group transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100/50 text-blue-600 flex items-center justify-center text-xs group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <FaSearch className="text-sm" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                        {result.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 border border-gray-100 px-2 py-0.5 rounded-full group-hover:border-blue-200 group-hover:text-blue-500 transition-all">
                      Jump to ↵
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
                <span className="text-[10px] text-gray-400">
                  Press Esc to close
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-3 sm:gap-4 lg:gap-5 items-center">
        {/* Notification Icon */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors outline-none"
          >
            <IoIosNotificationsOutline className="text-2xl sm:text-[26px] lg:text-[30px] text-primary" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Wrapper for Dropdown to ensure it sits above other content */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200 transform origin-top-right">
              <div className="p-3 sm:p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                  Notifications
                </h3>
                <span
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 cursor-pointer hover:underline"
                >
                  Mark all as read
                </span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 sm:p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.read ? "bg-blue-50/50" : ""}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span
                          className={`font-medium text-xs sm:text-sm ${!notif.read ? "text-gray-900" : "text-gray-700"}`}
                        >
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                          {notif.time
                            ? new Date(notif.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No new notifications
                    {/* <button onClick={handleCreateTestNotification} className="mt-2 text-xs text-blue-500 underline block w-full">Generate Test</button> */}
                  </div>
                )}
              </div>
              <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
                <a
                  href="/admin/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-medium text-primary hover:text-blue-700 transition-colors block w-full"
                >
                  View All Notifications
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <Link
          href="/admin/profile"
          className="rounded-full p-0.5 sm:p-1 border-2 border-primary cursor-pointer hover:border-blue-500 transition-colors"
        >
          <img
            src={avatar || user?.photoURL || "/assets/profile.png"}
            alt="Profile"
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
