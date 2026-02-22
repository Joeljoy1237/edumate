"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";
import { auth, db } from "../../config/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickAction {
  label: string;
  action: string;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  uid: string;
  regNumber?: string;
  department?: string;
  batch?: string;
  semester?: string;
}

export default function EduBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch current user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("🔐 User logged in:", user.email);
        try {
          // Try to get user document by UID first (more reliable)
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("✅ User data found by UID:", userData);
            setCurrentUser({
              name: userData.name || user.displayName || "User",
              email: user.email || "",
              role: userData.role || "student",
              uid: user.uid,
              regNumber: userData.regNumber,
              department: userData.department,
              batch: userData.batch,
              semester: userData.semester,
            });
          } else {
            // Fallback: Check by email in users collection
            console.log("⚠️ User doc not found by UID, trying email query...");
            const usersRef = collection(db, "users");
            const qUsers = query(usersRef, where("email", "==", user.email));
            const userSnap = await getDocs(qUsers);

            if (!userSnap.empty) {
              const userData = userSnap.docs[0].data();
              console.log("✅ User data found by email:", userData);
              setCurrentUser({
                name: userData.name || user.displayName || "User",
                email: user.email || "",
                role: userData.role || "student",
                uid: user.uid,
                regNumber: userData.regNumber,
                department: userData.department,
                batch: userData.batch,
                semester: userData.semester,
              });
            } else {
              // Check in admins collection
              console.log("⚠️ Not in users collection, checking admins...");
              const adminsRef = collection(db, "admins");
              const qAdmins = query(
                adminsRef,
                where("email", "==", user.email),
              );
              const adminSnap = await getDocs(qAdmins);

              if (!adminSnap.empty) {
                const adminData = adminSnap.docs[0].data();
                console.log("✅ Admin data found:", adminData);
                setCurrentUser({
                  name: adminData.name || user.displayName || "Admin",
                  email: user.email || "",
                  role: "admin",
                  uid: user.uid,
                });
              } else {
                // Check in parents collection
                console.log("⚠️ Not in admins, checking parents...");
                const parentsRef = collection(db, "parents");
                const qParents = query(
                  parentsRef,
                  where("email", "==", user.email),
                );
                const parentSnap = await getDocs(qParents);

                if (!parentSnap.empty) {
                  const parentData = parentSnap.docs[0].data();
                  console.log("✅ Parent data found:", parentData);
                  setCurrentUser({
                    name: parentData.name || user.displayName || "Parent",
                    email: user.email || "",
                    role: "parent",
                    uid: user.uid,
                  });
                } else {
                  // Fallback: Use Firebase Auth data
                  console.log(
                    "⚠️ No Firestore data found, using Auth data as fallback",
                  );
                  setCurrentUser({
                    name:
                      user.displayName || user.email?.split("@")[0] || "User",
                    email: user.email || "",
                    role: "student",
                    uid: user.uid,
                  });
                }
              }
            }
          }
        } catch (error) {
          console.error("❌ Error fetching user data:", error);
          // Fallback to basic auth data
          setCurrentUser({
            name: user.displayName || user.email?.split("@")[0] || "User",
            email: user.email || "",
            role: "student",
            uid: user.uid,
          });
        }
      } else {
        console.log("👤 No user logged in, Chatbot will be hidden");
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Set welcome message when user is loaded or for guest mode
  useEffect(() => {
    if (messages.length === 0) {
      if (currentUser) {
        const roleGreeting =
          currentUser.role === "admin"
            ? "your administrative assistant"
            : currentUser.role === "faculty"
              ? "your teaching assistant"
              : currentUser.role === "parent"
                ? "your child's educational assistant"
                : "your personalized educational assistant";

        const welcomeMessage: Message = {
          id: "welcome",
          text: `Hello ${currentUser.name}! 👋 I'm EduBot, ${roleGreeting}. How can I help you today?`,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [currentUser, isLoading, messages.length]);

  const quickActions: QuickAction[] =
    currentUser?.role === "admin"
      ? [
          { label: "👥 Student Info", action: "student_info" },
          { label: "📊 Department Stats", action: "dept_stats" },
          { label: "📝 Pending Approvals", action: "approvals" },
          { label: "📅 Today's Schedule", action: "schedule" },
          { label: "📈 Analytics", action: "analytics" },
          { label: "🔔 Notifications", action: "notifications" },
        ]
      : currentUser?.role === "faculty"
        ? [
            { label: "👥 My Classes", action: "my_classes" },
            { label: "📝 Assignments", action: "assignments_faculty" },
            { label: "📊 Student Performance", action: "student_performance" },
            { label: "📅 My Schedule", action: "schedule" },
            { label: "🔔 Announcements", action: "announcements" },
            { label: "📈 Class Analytics", action: "class_analytics" },
          ]
        : currentUser?.role === "parent"
          ? [
              { label: "👦 Child's Attendance", action: "child_attendance" },
              { label: "📝 Child's Assignments", action: "child_assignments" },
              { label: "📊 Child's Results", action: "child_results" },
              { label: "📅 Child's Schedule", action: "child_schedule" },
              { label: "💰 Fee Status", action: "fees" },
              { label: "📞 Contact Teacher", action: "contact_teacher" },
            ]
          : [
              { label: "📚 My Attendance", action: "attendance" },
              { label: "📝 My Assignments", action: "assignments" },
              { label: "📊 My Results", action: "results" },
              { label: "📅 My Timetable", action: "timetable" },
              { label: "💰 Fee Status", action: "fees" },
              { label: "📖 Library", action: "library" },
            ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fetch student data by registration number or name
  const fetchStudentData = async (identifier: string) => {
    try {
      const usersRef = collection(db, "users");
      let q;

      // Check if identifier is a registration number or name
      if (identifier.match(/^\d+/)) {
        q = query(usersRef, where("regNumber", "==", identifier));
      } else {
        q = query(usersRef, where("name", "==", identifier));
      }

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const studentData = snapshot.docs[0].data();
        return {
          name: studentData.name,
          regNumber: studentData.regNumber,
          email: studentData.email,
          department: studentData.department,
          batch: studentData.batch,
          semester: studentData.semester,
          attendance: studentData.attendance || "85%",
          cgpa: studentData.cgpa || "8.5",
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return null;
    }
  };

  const getBotResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();

    // Admin-specific queries
    if (currentUser?.role === "admin") {
      if (
        lowerMessage.includes("student") &&
        (lowerMessage.includes("info") || lowerMessage.includes("details"))
      ) {
        const words = userMessage.split(" ");
        const identifier = words[words.length - 1];

        if (identifier && identifier !== "info" && identifier !== "details") {
          const studentData = await fetchStudentData(identifier);
          if (studentData) {
            return (
              `📋 **Student Information**\n\n` +
              `👤 Name: ${studentData.name}\n` +
              `🎓 Reg No: ${studentData.regNumber}\n` +
              `📧 Email: ${studentData.email}\n` +
              `🏢 Department: ${studentData.department}\n` +
              `📚 Batch: ${studentData.batch}\n` +
              `📖 Semester: ${studentData.semester}\n` +
              `📊 Attendance: ${studentData.attendance}\n` +
              `🎯 CGPA: ${studentData.cgpa}\n\n` +
              `What else would you like to know?`
            );
          } else {
            return `❌ Student not found. Please provide a valid registration number or full name.\n\nExample: "Show student info 2022CSE001"`;
          }
        }
        return `Please specify the student's registration number or name.\n\nExample: "Show student info 2022CSE001"`;
      }

      if (
        lowerMessage.includes("department") ||
        lowerMessage.includes("dept")
      ) {
        return (
          `📊 **Department Statistics**\n\n` +
          `🏢 Total Departments: 5\n` +
          `👥 Total Students: 1,250\n` +
          `👨🏫 Total Faculty: 85\n\n` +
          `**Top Departments:**\n` +
          `1. Computer Science - 450 students\n` +
          `2. Electronics - 320 students\n` +
          `3. Mechanical - 280 students\n` +
          `4. Civil - 150 students\n` +
          `5. Mathematics - 50 students\n\n` +
          `Need specific department details?`
        );
      }

      if (
        lowerMessage.includes("approval") ||
        lowerMessage.includes("pending")
      ) {
        return (
          `📝 **Pending Approvals**\n\n` +
          `🔴 Urgent (5):\n` +
          `• Leave applications: 3\n` +
          `• Fee waivers: 2\n\n` +
          `🟡 Normal (12):\n` +
          `• Assignment extensions: 7\n` +
          `• Certificate requests: 5\n\n` +
          `Would you like to review them?`
        );
      }

      if (lowerMessage.includes("analytic")) {
        return (
          `📈 **System Analytics**\n\n` +
          `**Today's Overview:**\n` +
          `✅ Active Users: 850/1,250\n` +
          `📚 Classes Conducted: 45/50\n` +
          `📝 Assignments Submitted: 320/400\n` +
          `💰 Fee Collection: 75%\n\n` +
          `**This Week:**\n` +
          `📊 Average Attendance: 87%\n` +
          `🎯 Assignment Completion: 80%\n` +
          `⭐ Student Satisfaction: 4.5/5`
        );
      }
    }

    // Faculty-specific queries
    if (currentUser?.role === "faculty") {
      if (lowerMessage.includes("class") || lowerMessage.includes("my class")) {
        return (
          `👥 **Your Classes**\n\n` +
          `👨🏫 ${currentUser.name}\n\n` +
          `**Today's Classes:**\n` +
          `1. 🕐 9:00 AM - 10:30 AM\n` +
          `   📚 Mathematics - Semester 5\n` +
          `   🏢 Room 301 | 👥 45 students\n\n` +
          `2. 🕐 11:00 AM - 12:30 PM\n` +
          `   📊 Statistics - Semester 3\n` +
          `   🏢 Room 205 | 👥 38 students\n\n` +
          `3. 🕑 2:00 PM - 3:30 PM\n` +
          `   🔢 Calculus - Semester 1\n` +
          `   🏢 Room 108 | 👥 52 students\n\n` +
          `📊 Overall Attendance: 87%`
        );
      }

      if (lowerMessage.includes("performance")) {
        return (
          `📊 **Student Performance Overview**\n\n` +
          `**Your Classes Average:**\n` +
          `📈 Class Average: 78.5%\n` +
          `🎯 Pass Rate: 92%\n` +
          `⭐ Top Performers: 15 students\n` +
          `⚠️ Need Attention: 8 students\n\n` +
          `**Subject-wise:**\n` +
          `• Mathematics: 82% avg\n` +
          `• Statistics: 76% avg\n` +
          `• Calculus: 77% avg\n\n` +
          `Would you like detailed reports?`
        );
      }

      if (lowerMessage.includes("assignment")) {
        return (
          `📝 **Assignment Status**\n\n` +
          `**Pending Review:**\n` +
          `• Calculus Assignment 3: 45 submissions\n` +
          `• Statistics Project: 32 submissions\n` +
          `• Math Quiz 5: 38 submissions\n\n` +
          `**Upcoming Deadlines:**\n` +
          `• Math Assignment 4: Jan 25\n` +
          `• Statistics Quiz: Jan 28\n\n` +
          `Total pending reviews: 115`
        );
      }
    }

    // Parent-specific queries
    if (currentUser?.role === "parent") {
      if (
        lowerMessage.includes("child") &&
        lowerMessage.includes("attendance")
      ) {
        return (
          `📚 **Your Child's Attendance**\n\n` +
          `👦 Student: Rahul Sharma\n` +
          `🎓 Class: 10th Grade\n` +
          `📊 Overall Attendance: 88% ✅\n\n` +
          `**Subject-wise:**\n` +
          `• Mathematics: 92% ✅\n` +
          `• Science: 85% ✅\n` +
          `• English: 90% ✅\n` +
          `• Social Studies: 82% ✅\n` +
          `• Hindi: 86% ✅\n\n` +
          `⚠️ Minimum required: 75%\n` +
          `Your child is doing well! 🎉`
        );
      }

      if (lowerMessage.includes("child") && lowerMessage.includes("result")) {
        return (
          `📊 **Your Child's Results**\n\n` +
          `👦 Student: Rahul Sharma\n` +
          `🎓 Class: 10th Grade\n\n` +
          `**Latest Exam Results:**\n` +
          `• Mathematics: 88/100 (A) 🌟\n` +
          `• Science: 82/100 (B+) 📈\n` +
          `• English: 90/100 (A+) 🎉\n` +
          `• Social Studies: 85/100 (A) ✨\n` +
          `• Hindi: 87/100 (A) 💪\n\n` +
          `**Overall:**\n` +
          `🎯 Percentage: 86.4%\n` +
          `🏆 Class Rank: 8/60\n\n` +
          `Great performance! Keep encouraging! 👏`
        );
      }

      if (
        lowerMessage.includes("teacher") ||
        lowerMessage.includes("contact")
      ) {
        return (
          `📞 **Contact Teachers**\n\n` +
          `**Class Teacher:**\n` +
          `👩🏫 Mrs. Priya Patel\n` +
          `📧 priya.patel@school.edu\n` +
          `📱 +91 98765 43210\n` +
          `⏰ Available: Mon-Fri, 2-4 PM\n\n` +
          `**Subject Teachers:**\n` +
          `📐 Math: Mr. Rajesh Kumar\n` +
          `🔬 Science: Dr. Anjali Singh\n` +
          `📚 English: Ms. Sarah Johnson\n\n` +
          `Would you like to schedule a meeting?`
        );
      }

      if (
        lowerMessage.includes("child") &&
        lowerMessage.includes("assignment")
      ) {
        return (
          `📝 **Your Child's Assignments**\n\n` +
          `👦 Student: Rahul Sharma\n\n` +
          `**Pending:**\n` +
          `1. 🔴 Math - Algebra Problems\n` +
          `   Due: Tomorrow | Status: Not Started\n\n` +
          `2. 🟡 Science - Lab Report\n` +
          `   Due: Jan 25 | Status: In Progress\n\n` +
          `3. 🟢 English - Essay\n` +
          `   Due: Jan 30 | Status: Not Started\n\n` +
          `**Completed This Week:** 4\n` +
          `💡 Please remind about urgent ones!`
        );
      }
    }

    // Student-specific queries
    if (currentUser?.role === "student") {
      if (lowerMessage.includes("attendance")) {
        return (
          `📚 **Your Attendance Report**\n\n` +
          `👤 ${currentUser.name}\n` +
          `🎓 ${currentUser.regNumber}\n\n` +
          `**Overall Attendance: 85%** ✅\n\n` +
          `**Subject-wise:**\n` +
          `• Mathematics: 90% ✅\n` +
          `• Physics: 82% ✅\n` +
          `• Chemistry: 88% ✅\n` +
          `• English: 78% ⚠️\n` +
          `• Programming: 92% ✅\n\n` +
          `⚠️ Minimum required: 75%\n` +
          `You're doing great! Keep it up! 🎉`
        );
      }

      if (
        lowerMessage.includes("assignment") ||
        lowerMessage.includes("homework")
      ) {
        return (
          `📝 **Your Pending Assignments**\n\n` +
          `👤 ${currentUser.name}\n\n` +
          `**Urgent (Due Soon):**\n` +
          `1. 🔴 Mathematics - Calculus Problems\n` +
          `   Due: Tomorrow (Jan 23)\n` +
          `   Status: Not Started\n\n` +
          `2. 🟡 Physics - Lab Report\n` +
          `   Due: Jan 25\n` +
          `   Status: In Progress (50%)\n\n` +
          `3. 🟢 English - Essay Writing\n` +
          `   Due: Jan 30\n` +
          `   Status: Not Started\n\n` +
          `💡 Tip: Start with the urgent ones!`
        );
      }

      if (
        lowerMessage.includes("result") ||
        lowerMessage.includes("marks") ||
        lowerMessage.includes("grade")
      ) {
        return (
          `📊 **Your Latest Results**\n\n` +
          `👤 ${currentUser.name}\n` +
          `🎓 ${currentUser.regNumber}\n` +
          `📚 Semester: ${currentUser.semester || "5"}\n\n` +
          `**Mid-term Exam Results:**\n` +
          `• Mathematics: 85/100 (A) 🌟\n` +
          `• Physics: 78/100 (B+) 📈\n` +
          `• Chemistry: 92/100 (A+) 🎉\n` +
          `• English: 88/100 (A) ✨\n` +
          `• Programming: 95/100 (A+) 🚀\n\n` +
          `**Overall Performance:**\n` +
          `🎯 CGPA: 8.76/10\n` +
          `📊 Percentage: 87.6%\n` +
          `🏆 Class Rank: 5/120\n\n` +
          `Excellent work! Keep it up! 💪`
        );
      }

      if (
        lowerMessage.includes("timetable") ||
        lowerMessage.includes("schedule") ||
        lowerMessage.includes("class")
      ) {
        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });
        return (
          `📅 **Your Timetable - ${today}**\n\n` +
          `👤 ${currentUser.name}\n` +
          `🏢 ${currentUser.department}\n` +
          `📚 Semester ${currentUser.semester}\n\n` +
          `**Today's Classes:**\n` +
          `⏰ 9:00 AM - 10:30 AM\n` +
          `   📖 Mathematics (Room 301)\n` +
          `   👨🏫 Dr. Sarah Johnson\n\n` +
          `⏰ 10:45 AM - 12:15 PM\n` +
          `   🔬 Physics Lab (Lab 2)\n` +
          `   👨🏫 Prof. Michael Chen\n\n` +
          `⏰ 12:15 PM - 1:00 PM\n` +
          `   🍽️ Lunch Break\n\n` +
          `⏰ 1:00 PM - 2:30 PM\n` +
          `   🧪 Chemistry (Room 205)\n` +
          `   👩🏫 Dr. Emily Davis\n\n` +
          `⏰ 2:45 PM - 4:15 PM\n` +
          `   📚 English (Room 108)\n` +
          `   👩🏫 Ms. Rachel Green`
        );
      }

      if (
        lowerMessage.includes("fee") ||
        lowerMessage.includes("payment") ||
        lowerMessage.includes("dues")
      ) {
        return (
          `💰 **Your Fee Status**\n\n` +
          `👤 ${currentUser.name}\n` +
          `🎓 ${currentUser.regNumber}\n\n` +
          `**Current Semester Fee:**\n` +
          `💵 Total Fee: ₹50,000\n` +
          `✅ Paid: ₹30,000\n` +
          `⏳ Pending: ₹20,000\n` +
          `📅 Due Date: February 15, 2026\n\n` +
          `**Payment Options:**\n` +
          `• Online Payment Portal\n` +
          `• Bank Transfer\n` +
          `• Visit Accounts Office\n\n` +
          `⚠️ Late fee of ₹500 applies after due date`
        );
      }
    }

    // Common queries for all users
    if (lowerMessage.includes("library") || lowerMessage.includes("book")) {
      return currentUser?.role === "student"
        ? `📖 **Your Library Status**\n\n` +
            `👤 ${currentUser.name}\n\n` +
            `**Currently Borrowed:**\n` +
            `1. "Data Structures" - Due: Jan 28\n` +
            `2. "Physics Fundamentals" - Due: Jan 28\n\n` +
            `**Library Info:**\n` +
            `📚 Books Available: 50,000+\n` +
            `💺 Study Rooms: Available\n` +
            `⏰ Timings: 8 AM - 8 PM\n` +
            `🆕 New Arrivals: 15 books in CS\n\n` +
            `Would you like to renew your books?`
        : `📖 **Library Overview**\n\n` +
            `📚 Total Books: 50,000+\n` +
            `📖 Books Issued: 1,250\n` +
            `📕 Overdue: 45\n` +
            `💺 Study Rooms: 8 (6 occupied)\n` +
            `🆕 New Arrivals This Month: 150\n\n` +
            `Need specific information?`;
    }

    // Help/Support queries
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      if (currentUser?.role === "admin") {
        return (
          `🤝 **Admin Help Menu**\n\n` +
          `I can help you with:\n` +
          `👥 Student information lookup\n` +
          `📊 Department statistics\n` +
          `📝 Pending approvals\n` +
          `📈 System analytics\n` +
          `📅 Schedule management\n` +
          `🔔 Notifications\n\n` +
          `**Examples:**\n` +
          `• "Show student info 2022CSE001"\n` +
          `• "Department statistics"\n` +
          `• "Pending approvals"\n` +
          `• "Show analytics"`
        );
      } else if (currentUser?.role === "faculty") {
        return (
          `🤝 **Faculty Help Menu**\n\n` +
          `I can help you with:\n` +
          `👥 Your classes\n` +
          `📝 Assignment management\n` +
          `📊 Student performance\n` +
          `📅 Your schedule\n` +
          `🔔 Announcements\n` +
          `📈 Class analytics\n\n` +
          `Just ask me anything!`
        );
      } else if (currentUser?.role === "parent") {
        return (
          `🤝 **Parent Help Menu**\n\n` +
          `I can help you with:\n` +
          `👦 Your child's attendance\n` +
          `📝 Your child's assignments\n` +
          `📊 Your child's results\n` +
          `📅 Your child's schedule\n` +
          `💰 Fee status\n` +
          `📞 Contact teachers\n\n` +
          `Just ask me anything!`
        );
      } else {
        return (
          `🤝 **Student Help Menu**\n\n` +
          `I can help you with:\n` +
          `📚 Your attendance\n` +
          `📝 Your assignments\n` +
          `📊 Your results\n` +
          `📅 Your timetable\n` +
          `💰 Fee status\n` +
          `📖 Library services\n\n` +
          `Just ask me anything!`
        );
      }
    }

    // Greeting responses
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return `Hello ${currentUser?.name || "there"}! 👋 How can I assist you today?`;
    }

    // Thank you responses
    if (lowerMessage.includes("thank")) {
      return `You're welcome, ${currentUser?.name || "there"}! Feel free to ask if you need anything else. Have a great day! 😊`;
    }

    // Default response based on role
    if (currentUser?.role === "admin") {
      return (
        `I can help you with:\n` +
        `👥 Student information (e.g., "Show student info 2022CSE001")\n` +
        `📊 Department statistics\n` +
        `📝 Pending approvals\n` +
        `📈 Analytics\n\n` +
        `What would you like to know?`
      );
    } else if (currentUser?.role === "faculty") {
      return (
        `I can help you with:\n` +
        `👥 Your classes\n` +
        `📝 Assignments\n` +
        `📊 Student performance\n` +
        `📅 Your schedule\n\n` +
        `What would you like to know?`
      );
    } else if (currentUser?.role === "parent") {
      return (
        `I can help you with:\n` +
        `👦 Your child's attendance\n` +
        `📝 Your child's assignments\n` +
        `📊 Your child's results\n` +
        `📅 Your child's schedule\n` +
        `💰 Fee status\n\n` +
        `What would you like to know?`
      );
    } else {
      return (
        `I can help you with:\n` +
        `📚 Your attendance\n` +
        `📝 Your assignments\n` +
        `📊 Your results\n` +
        `📅 Your timetable\n` +
        `💰 Fee status\n\n` +
        `What would you like to know?`
      );
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Get bot response
    try {
      const botResponse = await getBotResponse(textToSend);
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error getting bot response:", error);
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: { [key: string]: string } = {
      // Student actions
      attendance: "What's my attendance?",
      assignments: "Show me my assignments",
      results: "What are my results?",
      timetable: "Show me today's timetable",
      fees: "What's my fee status?",
      library: "Tell me about library",
      // Admin actions
      student_info: "Show student information",
      dept_stats: "Show department statistics",
      approvals: "Show pending approvals",
      schedule: "Show today's schedule",
      analytics: "Show analytics",
      notifications: "Show notifications",
      // Faculty actions
      my_classes: "Show my classes",
      assignments_faculty: "Show assignment status",
      student_performance: "Show student performance",
      class_analytics: "Show class analytics",
      announcements: "Show announcements",
      // Parent actions
      child_attendance: "Show my child's attendance",
      child_assignments: "Show my child's assignments",
      child_results: "Show my child's results",
      child_schedule: "Show my child's schedule",
      contact_teacher: "How to contact teacher",
    };

    handleSendMessage(actionMessages[action]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentUser) return null;

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="Open EduBot"
        >
          <FaRobot
            size={28}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            AI
          </span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[450px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FaRobot size={20} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg">EduBot</h3>
                <p className="text-xs text-white/80">
                  {!currentUser
                    ? "Guest Mode"
                    : currentUser.role === "admin"
                      ? "Admin Assistant"
                      : currentUser.role === "faculty"
                        ? "Faculty Assistant"
                        : currentUser.role === "parent"
                          ? "Parent Assistant"
                          : "Your Personal Assistant"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-b from-blue-50 to-white p-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-2 font-medium">
              Quick Actions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "bot"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <FaRobot size={16} />
                  ) : (
                    <FaUser size={16} />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 shadow-sm border border-gray-200 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center">
                  <FaRobot size={16} />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Send message"
              >
                <FaPaperPlane size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {currentUser
                ? `Personalized for ${currentUser.name} • ${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}`
                : "Guest Mode • Please login for personalized experience"}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
