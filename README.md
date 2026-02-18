# 🔥 DockerJudge - Advanced Online Coding Platform

A professional LeetCode-style coding platform with secure Docker-based execution, user profiles, solved problem tracking, and modern SaaS-level UI.

## ✨ Latest Features (v2.0)

### 🎯 User Profile System
- **Animated Profile Page** (`/profile`) with user stats and progress tracking
- **Solved Problems Tracking** - Automatic marking when submissions are ACCEPTED
- **Progress Visualization** - Animated progress bars and counters
- **Account Management** - Change password, delete account, logout functionality

### 🏆 Enhanced Problem Tracking
- **Real-time Solved Badges** - Green checkmarks on solved problems
- **Dynamic Counters** - "Solved: X / Total" with smooth animations
- **Persistent Progress** - Solved problems saved in localStorage
- **Visual Indicators** - Color-coded problem states

### 🎨 Professional UI/UX
- **SaaS-Level Design** - Linear/Vercel-inspired modern interface
- **Framer Motion Animations** - Smooth page transitions and micro-interactions
- **Consistent Backgrounds** - Animated gradient backgrounds across all pages
- **Responsive Design** - Perfect on desktop, tablet, and mobile

## 🚀 Core Platform Features

### 💻 Coding Environment
- **Monaco Code Editor** - Full-featured editor with syntax highlighting
- **Multi-language Support** - Java and Python with more coming
- **Secure Execution** - Docker-based sandboxed code execution
- **Real-time Feedback** - Instant submission results with detailed metrics

### 🔒 Security & Isolation
- **Container Isolation** - Each execution in isolated Docker containers
- **No Network Access** - Containers completely offline
- **Resource Limits** - CPU, memory, and time constraints enforced
- **Automatic Cleanup** - Containers destroyed after execution
- **Hidden Testcases** - Users never see actual test inputs/outputs

### 📊 Problem Management
- **52+ Coding Problems** - Curated collection across all difficulty levels
- **Difficulty Filtering** - Easy, Medium, Hard problem categories
- **Search Functionality** - Find problems by title or keywords
- **Progress Tracking** - Visual indicators for attempted/solved problems

## 🏗️ Architecture

```
Frontend (React + Vite + Framer Motion)
├── Landing Page (Animated Hero)
├── Problems Page (52+ Problems)
├── Problem Detail (Monaco Editor)
├── Profile Page (User Stats)
├── Auth Pages (Login/Signup)
└── Solved Tracking System

Backend (Node.js + Express)
├── Problem Management API
├── Submission Judging API
├── Docker Execution Engine
└── User Authentication

Storage
├── localStorage (User Data)
├── Problem Definitions (JSON)
└── Hidden Testcases (Server-side)
```

## 📁 Project Structure

```
DockerJudge/
├── frontend/                    # React frontend with animations
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx         # Animated hero page
│   │   │   ├── ProblemsPage.jsx        # 52+ problems with solved tracking
│   │   │   ├── ProblemDetailPage.jsx   # Monaco editor + submission
│   │   │   ├── ProfilePage.jsx         # User profile with stats
│   │   │   ├── LoginPage.jsx           # Authentication
│   │   │   └── SignupPage.jsx          # User registration
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx          # Monaco editor wrapper
│   │   │   ├── SubmissionResult.jsx    # Animated verdict display
│   │   │   └── Navbar.jsx              # Navigation with user dropdown
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx         # User auth + solved tracking
│   │   │   └── ThemeContext.jsx        # Dark/light theme
│   │   └── utils/
│   │       └── api.js                  # API communication
├── backend/                     # Node.js backend
│   ├── problems/               # 52+ problem definitions
│   │   ├── two-sum.json
│   │   ├── longest-substring.json
│   │   └── ... (50+ more problems)
│   ├── services/
│   │   ├── judgeService.js     # Docker execution engine
│   │   └── problemService.js   # Problem management
│   └── server.js
└── docker/                     # Container configurations
```

## 🎯 User Experience Flow

### 1. Landing Experience
- **Animated Hero Section** with gradient backgrounds
- **Feature Showcase** with interactive cards
- **Call-to-Action** buttons leading to problems or judge

### 2. Problem Solving
- **Browse 52+ Problems** with difficulty badges
- **Real-time Search & Filter** functionality
- **Monaco Code Editor** with syntax highlighting
- **Instant Submission Results** with animated verdicts

### 3. Progress Tracking
- **Automatic Solved Marking** when submissions are ACCEPTED
- **Profile Dashboard** with animated stats and progress bars
- **Persistent Progress** across browser sessions
- **Visual Achievement System** with badges and counters

### 4. Account Management
- **Secure Authentication** with localStorage persistence
- **Profile Customization** with user stats
- **Account Controls** (password change, account deletion)
- **Session Management** with proper logout handling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Docker Desktop
- Modern web browser

### Installation & Startup
```bash
# Clone the repository
git clone https://github.com/SaravanaKrishnan16/Docker-Judge.git
cd DockerJudge

# Start the platform (Windows)
start.bat

# Or manually:
# Backend
cd backend && npm install && npm start

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

### First Time Setup
1. Visit `http://localhost:5173`
2. Create account via "Sign Up"
3. Start solving problems!
4. Check your progress in Profile page

## 🎨 UI/UX Features

### Modern Design System
- **Glassmorphism Effects** - Backdrop blur and transparency
- **Gradient Animations** - Moving background gradients
- **Micro-interactions** - Hover effects and button animations
- **Consistent Spacing** - Professional layout system

### Animation Library
- **Page Transitions** - Smooth enter/exit animations
- **Loading States** - Skeleton screens and spinners
- **Success Feedback** - Celebration animations for solved problems
- **Progress Animations** - Count-up effects and progress bars

### Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Touch-Friendly** - Large tap targets and gestures
- **Adaptive Layout** - Flexible grid systems
- **Cross-Browser** - Tested on Chrome, Firefox, Safari, Edge

## 🏆 Problem Collection

### Difficulty Distribution
- **Easy Problems**: 20+ problems for beginners
- **Medium Problems**: 25+ problems for intermediate
- **Hard Problems**: 7+ problems for advanced

### Popular Problems Included
- Two Sum, Add Two Numbers, Longest Substring
- Valid Parentheses, Merge Two Lists, Binary Search
- Container With Most Water, 3Sum, Letter Combinations
- And 40+ more carefully curated problems!

### Problem Features
- **Detailed Descriptions** with examples and constraints
- **Hidden Testcases** for secure judging
- **Multiple Languages** (Java, Python)
- **Time/Memory Limits** for performance optimization

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/login     # User login
POST /api/auth/signup    # User registration
POST /api/auth/logout    # User logout
```

### Problems
```
GET /api/problems        # Get all problems (no testcases)
GET /api/problems/:id    # Get single problem details
```

### Submissions
```
POST /api/submit
{
  "problemId": "two-sum",
  "language": "java",
  "code": "public class Solution { ... }"
}

Response:
{
  "verdict": "ACCEPTED",
  "passed": 5,
  "total": 5,
  "time_ms": 120,
  "memory_kb": 1024,
  "message": "All test cases passed!"
}
```

## 🔒 Security & Performance

### Code Execution Security
- **Docker Isolation** - Each submission in fresh container
- **Resource Limits** - CPU/memory/time constraints
- **No Network Access** - Containers completely offline
- **Automatic Cleanup** - No persistent data between runs

### User Data Protection
- **Client-side Storage** - No sensitive data on servers
- **Secure Authentication** - Proper password handling
- **Session Management** - Automatic logout on browser close
- **Data Validation** - Input sanitization and validation

### Performance Optimization
- **Lazy Loading** - Components loaded on demand
- **Code Splitting** - Optimized bundle sizes
- **Caching Strategy** - Efficient data fetching
- **Animation Performance** - GPU-accelerated animations

## 🛠️ Development

### Adding New Problems
1. Create JSON file in `backend/problems/`
2. Include hidden testcases with input/output pairs
3. Add code templates for supported languages
4. Problem automatically appears in frontend

### Customizing UI
1. Modify theme colors in `ThemeContext.jsx`
2. Update animations in component files
3. Add new Framer Motion variants
4. Test across different screen sizes

### Extending Features
1. Add new language support in backend
2. Create new page components
3. Extend AuthContext for new user features
4. Update API endpoints as needed

## 📊 Analytics & Metrics

### User Engagement
- **Problem Solve Rate** - Track completion percentages
- **Session Duration** - Monitor user engagement time
- **Popular Problems** - Identify most attempted problems
- **Success Patterns** - Analyze solving strategies

### Performance Metrics
- **Execution Times** - Monitor code performance
- **Memory Usage** - Track resource consumption
- **Error Rates** - Identify common issues
- **Response Times** - API performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow React best practices
- Use TypeScript for new components
- Add proper error handling
- Include responsive design
- Test on multiple browsers

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support & Troubleshooting

### Common Issues
- **Docker not running**: Start Docker Desktop
- **Port conflicts**: Check ports 3000, 5173 are free
- **Build errors**: Clear node_modules and reinstall
- **Animation lag**: Check GPU acceleration in browser

### Getting Help
- Check GitHub Issues for known problems
- Create new issue with detailed description
- Include browser console errors
- Provide steps to reproduce

---

**🚀 Built with modern web technologies for the next generation of coding education**

**Tech Stack**: React 18, Vite, Framer Motion, Tailwind CSS, Node.js, Express, Docker, Monaco Editor

**Live Demo**: [Your deployment URL here]
**Repository**: https://github.com/SaravanaKrishnan16/Docker-Judge.git