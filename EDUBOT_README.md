# EduBot - Personalized AI Chatbot for Edumate

## 🤖 Overview

EduBot is an intelligent, role-based chatbot integrated into the Edumate educational management system. It provides personalized assistance to different user types: **Students**, **Faculty**, **Parents**, and **Admins**.

## ✨ Features

### 🎯 Role-Based Personalization

The chatbot automatically detects the logged-in user's role and provides customized responses and quick actions:

#### 👨‍🎓 **Student Features**

- View attendance reports
- Check pending assignments
- Access exam results and grades
- View timetable/schedule
- Check fee status
- Library information
- General academic queries

#### 👨‍🏫 **Faculty Features**

- View assigned classes
- Check assignment submissions
- Monitor student performance
- Access teaching schedule
- Class analytics
- Announcements management

#### 👨‍👩‍👦 **Parent Features**

- Monitor child's attendance
- Track child's assignments
- View child's results
- Check child's schedule
- Fee payment status
- Contact teachers

#### 👨‍💼 **Admin Features**

- Student information lookup
- Department statistics
- Pending approvals
- System analytics
- Schedule management
- Notifications

### 🚀 Key Capabilities

1. **Real-time User Detection**: Automatically identifies user role from Firebase Authentication
2. **Personalized Greetings**: Welcomes users by name with role-specific messages
3. **Quick Actions**: One-click buttons for common queries
4. **Smart Responses**: Context-aware responses based on user role
5. **Beautiful UI**: Modern gradient design with smooth animations
6. **Guest Mode**: Works even when users are not logged in
7. **Firebase Integration**: Fetches real data from Firestore collections

## 🛠️ Technical Implementation

### File Structure

```
src/
├── common/
│   └── components/
│       └── EduBot.tsx          # Main chatbot component
├── config/
│   └── firebaseConfig.ts       # Firebase configuration
└── app/
    └── layout.tsx              # Root layout (chatbot integrated here)
```

### Technologies Used

- **React** (with TypeScript)
- **Firebase** (Authentication & Firestore)
- **React Icons** (FaRobot, FaTimes, FaPaperPlane, FaUser)
- **Tailwind CSS** (for styling)
- **Next.js 15** (App Router)

### Firebase Collections Used

```
users/          # Student and faculty data
admins/         # Admin user data
parents/        # Parent user data
attendance/     # Attendance records
assignments/    # Assignment data
results/        # Exam results
departments/    # Department information
```

## 📦 Installation

The chatbot is already integrated into your Edumate project. No additional installation required!

### Dependencies (Already Installed)

```json
{
  "react-icons": "^5.5.0",
  "firebase": "^12.3.0",
  "react": "^18",
  "react-dom": "^18"
}
```

## 🎨 UI Components

### Chatbot Button

- Fixed position at bottom-right corner
- Gradient background (blue to purple)
- Animated robot icon
- "AI" badge indicator
- Hover effects with scale animation

### Chat Window

- Responsive design (mobile & desktop)
- Gradient header with user role indicator
- Quick action buttons
- Message bubbles with timestamps
- Typing indicator animation
- Auto-scroll to latest message

## 💬 Usage Examples

### For Students:

```
User: "What's my attendance?"
Bot: Shows detailed attendance report with subject-wise breakdown

User: "Show my assignments"
Bot: Lists pending assignments with due dates and status

User: "What are my results?"
Bot: Displays latest exam results with CGPA and rank
```

### For Faculty:

```
User: "Show my classes"
Bot: Lists today's classes with room numbers and student count

User: "Student performance"
Bot: Shows class average, pass rate, and top performers

User: "Assignment status"
Bot: Displays pending reviews and upcoming deadlines
```

### For Parents:

```
User: "My child's attendance"
Bot: Shows child's attendance with subject-wise details

User: "Contact teacher"
Bot: Provides teacher contact information and availability

User: "My child's results"
Bot: Displays child's exam results and class rank
```

### For Admins:

```
User: "Show student info 2022CSE001"
Bot: Fetches and displays complete student information

User: "Department statistics"
Bot: Shows department-wise student and faculty count

User: "Show analytics"
Bot: Displays system-wide analytics and metrics
```

## 🔧 Customization

### Adding New Responses

Edit `src/common/components/EduBot.tsx` and add your custom logic in the `getBotResponse` function:

```typescript
const getBotResponse = async (userMessage: string): Promise<string> => {
  const lowerMessage = userMessage.toLowerCase();

  // Add your custom response logic here
  if (lowerMessage.includes("your_keyword")) {
    return "Your custom response";
  }

  // ... existing code
};
```

### Adding New Quick Actions

Update the `quickActions` array for each role:

```typescript
const quickActions: QuickAction[] =
  currentUser?.role === "student"
    ? [
        { label: "📚 My Attendance", action: "attendance" },
        { label: "🆕 Your New Action", action: "your_action" },
        // ... more actions
      ]
    : // ... other roles
```

### Styling Customization

The chatbot uses Tailwind CSS classes. You can customize colors, sizes, and animations by modifying the className attributes in `EduBot.tsx`.

## 🔐 Security & Privacy

- **Authentication Required**: User data is only fetched for authenticated users
- **Role-Based Access**: Users can only access data relevant to their role
- **Firebase Security Rules**: Ensure proper Firestore security rules are configured
- **No Sensitive Data Exposure**: API keys are stored in environment variables

## 🌐 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🐛 Troubleshooting

### Chatbot not appearing?

- Check if `EduBot` is imported in `src/app/layout.tsx`
- Verify Firebase configuration is correct
- Check browser console for errors

### User data not loading?

- Ensure user is logged in
- Verify Firestore collections exist
- Check Firebase security rules
- Look for console errors in browser DevTools

### TypeScript errors?

- Ensure `@/*` path is configured in `tsconfig.json`
- Run `npm run dev` to restart the development server

## 📱 Responsive Design

The chatbot is fully responsive:

- **Desktop**: 450px width, fixed bottom-right
- **Mobile**: 95vw width, full-screen experience
- **Tablet**: Adaptive sizing

## 🎯 Future Enhancements

Potential improvements:

- [ ] Integration with AI APIs (Gemini, OpenAI)
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Chat history persistence
- [ ] File upload support
- [ ] Rich media responses (images, videos)
- [ ] Sentiment analysis
- [ ] Automated notifications

## 📄 License

Part of the Edumate project.

## 👨‍💻 Developer

Created for Edumate Educational Management System

---

**Need Help?** Contact your system administrator or check the Firebase console for data issues.
