# EduBot Auth Update

## 🔄 Changes

The `EduBot` component has been updated to enforce authentication.

### 🚫 Non-Logged In Users

- **Behavior**: The chatbot is completely hidden.
- **Implementation**: Added a check `if (!currentUser) return null;` before the render.
- **Cleanup**: Removed the "Guest Mode" welcome message logic.

### ✅ Logged In Users

- **Behavior**: The chatbot appears and functions as before.
- **Personalization**: Continues to use `currentUser` to personalize the experience.

## 📝 File Modified

- `src/common/components/EduBot.tsx`

## 🔍 Verification

- Log out of the application -> Chatbot icon should disappear.
- Log in -> Chatbot icon should appear.
