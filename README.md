# 📚 Booked - Book Tracking & Reading Timer App

A comprehensive mobile-first book tracking application with reading timers, progress tracking, reviews, and AI-powered chat assistance.

## ✨ Features

### 📖 Core Functionality
- **Personal Library** - Track your reading progress with a visual book collection
- **Reading Timer** - Full-screen timer with session tracking and statistics
- **Weekly Reading Goals** - Set and track custom weekly reading targets
- **Calendar Integration** - Track reading sessions by date with visual indicators

### 🔍 Discovery & Planning
- **Discover Books** - Browse books by genre with filtering
- **Book Details** - View comprehensive book information with ratings
- **Weekly Schedule** - Plan your reading time with a weekly planner

### ✍️ Reviews & Social
- **Written Reviews** - Create and browse text reviews with star ratings
- **Video Reviews** - Record and watch video book reviews
- **Comments & Likes** - Engage with reviews through likes and comments
- **Review Navigation** - Seamlessly browse between written and video reviews

### 🤖 AI Assistant
- **Chat Support** - AI-powered reading recommendations and assistance
- **Chat History** - Persistent conversation tracking
- **Context-Aware** - Understands your reading preferences and history

### 👤 Profile & Settings
- **User Statistics** - Track books read, reading time, and reviews written
- **Customizable Profile** - Edit your reading preferences and bio
- **Favorite Management** - Add/remove favorite authors, genres, and books
- **Goal Setting** - Customize your weekly reading goals

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **pnpm**
- A modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NityaAddanki/Booked.git
   cd Booked
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   OR
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   OR
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   
   Navigate to the URL shown in your terminal (eg.`http://localhost:5173/`).

## 📱 Usage Guide

### Testing the App

The app is designed as a **mobile experience** (430px width) and centers on larger screens.

#### Home Screen
- View your current book collection
- See reading progress for each book
- Edit weekly reading goal (click the pencil icon)
- Quick access to continue reading with the timer

#### Track Screen
- View calendar with reading session indicators (green dots)
- Click dates to see reading sessions
- Start new reading sessions with the timer
- View reading statistics and streaks

#### Reading Timer
- Full-screen immersive reading experience
- Start/pause/reset functionality
- Automatic session saving
- Return to track screen when complete

#### Discover Screen
- Browse books by genre (Fiction, Non-Fiction, Mystery, etc.)
- Filter by "All", "Popular", or "New Releases"
- Click books to view details
- Add books to your library from detail pages

#### Plan Screen
- Weekly reading schedule view
- Drag and drop to organize reading sessions
- Visual time blocks for reading planning

#### Profile Screen
- View reading statistics
- See your reviews and activity
- Edit profile (name, bio, preferences)
- Manage favorite authors, genres, and books
- Adjust weekly reading goals

#### Reviews
- Browse written reviews with star ratings
- Watch video reviews from other readers
- Create your own written reviews from book details
- Record video reviews (simulated)
- Like and comment on reviews

#### AI Chat
- Get reading recommendations
- Ask questions about books
- Receive personalized suggestions
- Chat history persists across sessions

## 🛠️ Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation and routing
- **Tailwind CSS v4** - Styling
- **React Context** - State management
- **Lucide React** - Icons
- **Vite** - Build tool and dev server

## 📂 Project Structure

```
Booked/
├── src/
│   ├── app/
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # React Context providers
│   │   ├── routes.tsx      # Route configuration
│   │   └── App.tsx         # Main app component
│   ├── styles/
│   │   ├── theme.css       # Design tokens and theme
│   │   └── fonts.css       # Font imports
│   └── main.tsx            # App entry point
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## 🎨 Key Features for Testing

### Interactive Elements
- ✅ Working reading timer with start/pause/reset
- ✅ Calendar date selection and navigation
- ✅ Genre filtering in discover section
- ✅ Star rating system for reviews
- ✅ Like and comment functionality
- ✅ Editable weekly reading goals
- ✅ Add/remove favorite authors, genres, and books
- ✅ Progress tracking for books
- ✅ AI chat with conversation history

### Navigation Flow
- Home → Book Detail → Start Reading → Timer
- Discover → Filter by Genre → Book Detail → Add to Library
- Track → Calendar → View Session Details
- Profile → Edit Profile → Update Preferences
- Reviews → Watch Video → Comment → Like
- Chat → Ask Questions → Get Recommendations

### State Management
All data persists during your session using React Context:
- Reading sessions and timer data
- Liked videos and written reviews
- Comments on reviews
- Chat conversation history
- User preferences and favorites
- Weekly reading goals

## 🧪 Sample Data

The app includes pre-populated sample data for testing:
- 20+ books across multiple genres
- Sample written and video reviews
- Pre-configured user profile
- Example reading sessions
- Sample chat conversations

## 📝 Notes

- This is a **frontend prototype** designed for testing and demonstration
- All data is stored in React Context (resets on page refresh)
- Video recording is simulated (no actual video capture)
- AI chat responses are predefined examples
- Optimized for mobile viewport (430px width)


**Happy Reading! 📚✨**
