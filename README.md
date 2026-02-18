# DockerJudge - LeetCode-Style Coding Platform

A complete LeetCode-style coding platform with secure Docker-based code execution, problem management, and automated judging system.

## 🚀 Features

### Core Platform Features
- **Problem Management**: Browse coding problems with difficulty levels, descriptions, and examples
- **Secure Code Execution**: Docker-based sandboxed execution for Java and Python
- **Automated Judging**: Run hidden testcases and return verdicts (ACCEPTED, WRONG ANSWER, etc.)
- **LeetCode-Style UI**: Professional interface with Monaco editor and animated components
- **Real-time Feedback**: Instant submission results with execution time and memory usage

### Security Features
- **Container Isolation**: Each code execution runs in isolated Docker containers
- **No Network Access**: Containers have no internet connectivity
- **Resource Limits**: CPU and memory limits enforced
- **Automatic Cleanup**: Containers destroyed after execution
- **Hidden Testcases**: Users never see actual test inputs/outputs

## 🏗️ Architecture

```
Frontend (React + Vite)
├── Problems List Page
├── Problem Detail Page  
├── Monaco Code Editor
└── Submission Results

Backend (Node.js + Express)
├── Problem Management API
├── Submission Judging API
└── Docker Execution Engine

Docker Containers
├── Java Runtime Environment
└── Python Runtime Environment
```

## 📁 Project Structure

```
DockerJudge/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ProblemsPage.jsx      # Problems list
│   │   │   └── ProblemDetailPage.jsx # Problem solving interface
│   │   ├── components/
│   │   │   └── SubmissionResult.jsx  # Verdict display
│   │   └── utils/
│   │       └── api.js               # API calls
│   └── package.json
├── backend/                  # Node.js backend
│   ├── problems/            # Problem definitions
│   │   ├── two-sum.json
│   │   ├── reverse-string.json
│   │   └── valid-parentheses.json
│   ├── services/
│   │   ├── judgeService.js  # Core judging logic
│   │   └── problemService.js # Problem management
│   ├── routes/
│   │   ├── problems.js      # Problem APIs
│   │   └── submit.js        # Submission API
│   └── server.js
├── docker/                  # Docker configurations
└── start.bat               # Windows startup script
```

## 🧪 How the Judge Works

### 1. Problem Structure
Each problem contains:
- **Public Data**: Title, description, examples, constraints
- **Hidden Testcases**: Input/output pairs never shown to users
- **Code Templates**: Starting code for different languages

### 2. Judging Process
1. User submits code for a problem
2. System fetches hidden testcases for that problem
3. For each testcase:
   - Code runs in isolated Docker container
   - Input is provided via stdin
   - Output captured from stdout
   - Execution time and memory tracked
4. Output comparison (exact match after trimming)
5. Verdict determined based on results

### 3. Verdict Rules
| Condition | Verdict |
|-----------|---------|
| All testcases pass | ACCEPTED |
| Any output mismatch | WRONG ANSWER |
| Execution timeout | TIME LIMIT EXCEEDED |
| Runtime crash/exception | RUNTIME ERROR |
| Compilation failure | COMPILE ERROR |

### 4. Security Measures
- **No Testcase Exposure**: Users never see actual test inputs
- **Container Isolation**: Each execution in fresh container
- **Resource Limits**: CPU/memory/time constraints
- **Network Disabled**: No internet access from containers
- **Automatic Cleanup**: Containers removed after execution

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Docker Desktop
- Windows (for start.bat)

### Installation & Startup
```bash
# Clone and start the platform
git clone <repository>
cd DockerJudge
start.bat
```

The script will:
1. Install all dependencies
2. Start backend server (port 3000)
3. Start frontend dev server (port 5173)
4. Open both in separate command windows

### Manual Startup
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 📝 Sample Problems

### Two Sum
- **Difficulty**: Easy
- **Testcases**: 5 hidden testcases
- **Languages**: Java, Python
- **Time Limit**: 2 seconds

### Reverse String
- **Difficulty**: Easy  
- **Testcases**: 4 hidden testcases
- **Languages**: Java, Python
- **Time Limit**: 1 second

### Valid Parentheses
- **Difficulty**: Easy
- **Testcases**: 6 hidden testcases
- **Languages**: Java, Python
- **Time Limit**: 1 second

## 🔧 API Endpoints

### Problems API
```
GET /api/problems           # Get all problems (no testcases)
GET /api/problems/:id       # Get single problem (no testcases)
```

### Submission API
```
POST /api/submit
{
  "problemId": "two-sum",
  "language": "java",
  "code": "..."
}

Response:
{
  "verdict": "ACCEPTED",
  "passed": 5,
  "total": 5,
  "time_ms": 120,
  "memory_kb": 1024
}
```

## 🎨 Frontend Features

### LeetCode-Style Interface
- **Split Layout**: Problem description | Code editor
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Language Selection**: Java and Python support
- **Animated UI**: Smooth transitions and loading states
- **Responsive Design**: Works on desktop and mobile

### Problem List
- **Difficulty Badges**: Color-coded difficulty levels
- **Search & Filter**: Find problems quickly
- **Hover Animations**: Interactive problem cards
- **Progress Tracking**: Visual indicators for solved problems

### Submission Results
- **Animated Verdicts**: Green/red/yellow verdict displays
- **Execution Stats**: Time and memory usage
- **Testcase Count**: Passed/total without revealing inputs
- **Error Messages**: Helpful debugging information

## 🐳 Docker Integration

### Supported Languages
- **Java**: OpenJDK runtime with compilation
- **Python**: Python 3.x interpreter

### Container Security
- **Isolated Execution**: Each run in fresh container
- **No Persistence**: Containers destroyed after execution
- **Resource Limits**: CPU, memory, and time constraints
- **No Network**: Containers cannot access internet

### Execution Flow
1. Code submitted via API
2. Docker container created with language runtime
3. Code executed with testcase input
4. Output captured and container destroyed
5. Results compared and verdict returned

## 🔒 Security Considerations

### Code Execution Safety
- All code runs in isolated Docker containers
- No access to host filesystem
- No network connectivity
- Automatic resource cleanup
- Time and memory limits enforced

### Testcase Protection
- Testcases stored server-side only
- Never transmitted to frontend
- Hidden from all API responses
- Only used internally for judging

## 🛠️ Development

### Adding New Problems
1. Create JSON file in `backend/problems/`
2. Include testcases with input/output pairs
3. Add code templates for supported languages
4. Problem automatically available via API

### Adding New Languages
1. Create Docker image with language runtime
2. Update `dockerExecutor.js` with language support
3. Add language option to frontend selector
4. Update problem templates

## 📊 Performance

### Execution Limits
- **Time Limit**: 1-5 seconds per testcase
- **Memory Limit**: 128MB per container
- **CPU Limit**: Single core usage
- **Container Timeout**: 10 seconds maximum

### Scalability
- Stateless architecture
- Horizontal scaling possible
- Docker container pooling
- Async execution handling

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Ensure Docker security compliance
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues
- **Docker not running**: Ensure Docker Desktop is started
- **Port conflicts**: Check ports 3000 and 5173 are available
- **Container failures**: Verify Docker has sufficient resources
- **Build errors**: Run `npm install` in both frontend and backend

### Debug Mode
Set `DEBUG=true` in backend environment for detailed logging.

---

**Built with ❤️ for competitive programming and coding education**