# 🎙️ EchoCode - Voice-Driven Pair Programming

**EchoCode** is an innovative voice-powered coding assistant that enables developers to write, debug, and understand code using natural voice commands. Powered by ElevenLabs voice AI and Google's Gemini AI, EchoCode provides a hands-free coding experience that combines the power of conversational AI with intelligent code generation.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)

---

## 🌟 Features

- **🎤 Voice-Driven Interface**: Code using natural voice commands through ElevenLabs conversational AI
- **🤖 AI Code Generation**: Generate production-ready code in multiple programming languages using Google Gemini
- **🔍 Code Explanation**: Get AI-powered explanations of existing code with voice output
- **🐛 Intelligent Debugging**: Voice-activated debugging assistance and suggestions
- **✏️ Live Code Editor**: Integrated Monaco editor with syntax highlighting for multiple languages
- **💬 Chat History**: Track your conversation and code generation history
- **🔄 Real-Time Updates**: Synchronous updates between voice commands and code editor
- **🌐 Multi-Language Support**: Support for Python, JavaScript, TypeScript, Java, C++, and Go

---

## 🏗️ Architecture

EchoCode follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Voice UI     │  │ Code Editor  │  │ Chat History │      │
│  │ (ElevenLabs) │  │ (Monaco)     │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           │                │                  │              │
│           └────────────────┴──────────────────┘              │
│                            │                                 │
│                    ┌───────▼───────┐                         │
│                    │  API Service  │                         │
│                    └───────────────┘                         │
└────────────────────────────┬────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  REST API       │
                    │  (Express)      │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌──────▼──────┐
│  Gemini AI     │  │  ElevenLabs API │  │  Session    │
│  Service       │  │  (TTS)          │  │  Manager    │
│  (Code Gen)    │  │                 │  │             │
└────────────────┘  └─────────────────┘  └─────────────┘
```

### Technology Stack

#### Frontend
- **React 18.2+**: Modern UI framework with hooks
- **Monaco Editor**: VS Code-powered code editor
- **ElevenLabs React SDK**: Conversational voice interface
- **Axios**: HTTP client for API communication

#### Backend
- **Node.js & Express**: RESTful API server
- **Google Cloud Vertex AI**: Access to Gemini 2.5 Flash model
- **ElevenLabs API**: Text-to-speech and voice recognition
- **CORS & dotenv**: Security and configuration management

#### AI Models
- **Google Gemini 2.5 Flash**: Code generation, debugging, and explanation
- **ElevenLabs Conversational AI**: Voice input/output and natural language processing

---

## 📋 Prerequisites

Before installing EchoCode, ensure you have:

### System Requirements
- Node.js >= 18.0.0
- npm >= 9.0.0
- Google Chrome Browser (recommended for voice features)
- Internet connection (required for APIs)
- 4GB RAM minimum (8GB recommended)
- 500MB free storage for dependencies

### API Keys & Accounts

1. **Google Cloud Platform**
   - Active GCP account
   - Vertex AI API enabled
   - Service account with "Vertex AI User" role
   - Service account JSON key file

2. **ElevenLabs Account**
   - Active ElevenLabs account
   - API key with permissions:
     - ElevenLabs Agents (Write)
     - Speech to Text (Access)
     - Text to Speech (Access)
     - Voices (Read)
   - Conversational AI agent created

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/varunsonawane/echocode.git
cd echocode
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3001
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./vocoder-key.json
ELEVENLABS_API_KEY=your-elevenlabs-api-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Place your Google Cloud service account JSON key file at `backend/vocoder-key.json`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_ELEVENLABS_API_KEY=your-elevenlabs-api-key
REACT_APP_ELEVENLABS_AGENT_ID=your-elevenlabs-agent-id
```

### 4. Enable Google Cloud APIs

Enable the following APIs in your GCP project:
- Vertex AI API (`aiplatform.googleapis.com`)
- Cloud Firestore API (`firestore.googleapis.com`)

---

## 🎮 Usage

### Starting the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will open in your browser at `http://localhost:3000`

### Voice Commands

Once the application is running, you can use these voice commands:

#### Code Generation
- "Generate a function to sort an array"
- "Create a Python class for user authentication"
- "Write a function to calculate factorial"

#### Code Explanation
- "Explain this code" (when code is in the editor)
- "What does this code do?"
- "Explain the code in the editor"

#### Code Debugging
- "Debug this code"
- "Fix the error in this code"
- "What's wrong with this code?"

#### Code Editing
- "Modify this function to handle edge cases"
- "Update the code to use async/await"
- "Change this code to use TypeScript"

---

## 📁 Project Structure

```
echocode/
├── backend/                      # Node.js backend server
│   ├── src/
│   │   ├── routes/              # API route handlers
│   │   │   ├── gemini.js        # Gemini AI endpoints
│   │   │   ├── session.js       # Session management
│   │   │   └── elevenlabs.js    # ElevenLabs TTS endpoints
│   │   ├── services/            # Business logic services
│   │   │   ├── gemini-service.js      # Gemini AI integration
│   │   │   └── elevenlabs-service.js  # ElevenLabs integration
│   │   └── server.js            # Express server entry point
│   ├── package.json             # Backend dependencies
│   └── .env                     # Backend environment variables
│
├── frontend/                     # React frontend application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── VoiceInterface.jsx    # Voice input/output UI
│   │   │   ├── CodeEditor.jsx        # Monaco code editor
│   │   │   ├── ChatHistory.jsx       # Message history display
│   │   │   ├── MicrophoneTest.jsx    # Mic testing utility
│   │   │   └── AgentTextInput.jsx    # Text input alternative
│   │   ├── services/            # API client services
│   │   │   └── api.js           # Backend API calls
│   │   ├── App.js               # Main application component
│   │   ├── App.css              # Application styles
│   │   └── index.js             # React entry point
│   ├── package.json             # Frontend dependencies
│   └── .env                     # Frontend environment variables
│
├── REQUIREMENTS.txt              # Detailed requirements document
├── LICENSE.txt                   # MIT license
└── README.md                     # This file
```

---

## 🔌 API Endpoints

### Session Management

#### Create Session
```http
POST /api/session/create
Content-Type: application/json

{
  "language": "javascript"
}
```

#### Get Session
```http
GET /api/session/:sessionId
```

### Gemini AI Endpoints

#### Generate Code
```http
POST /api/gemini/generate-code
Content-Type: application/json

{
  "prompt": "Create a function to sort an array",
  "language": "javascript"
}
```

#### Debug Code
```http
POST /api/gemini/debug
Content-Type: application/json

{
  "code": "function example() { ... }",
  "errorMessage": "TypeError: undefined is not a function",
  "language": "javascript"
}
```

#### Explain Code
```http
POST /api/gemini/explain
Content-Type: application/json

{
  "code": "function example() { ... }",
  "language": "javascript"
}
```

### ElevenLabs Endpoints

#### Text-to-Speech
```http
POST /api/elevenlabs/speak
Content-Type: application/json

{
  "text": "This is the explanation of your code"
}
```

---

## 🛠️ Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Style

The project follows standard JavaScript/React conventions:
- ESLint for linting
- Prettier for code formatting
- Consistent naming conventions

### Development Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

---

## 🔒 Security Considerations

- **API Keys**: Never commit `.env` files or API keys to version control
- **Service Accounts**: Store GCP service account keys securely
- **CORS**: Configure CORS_ORIGIN to restrict access to trusted domains
- **Environment**: Use different credentials for development and production

---

## �� Troubleshooting

### Voice Not Working
- Ensure microphone permissions are granted in browser
- Use Google Chrome for best compatibility
- Check ElevenLabs API key is valid

### Code Not Generating
- Verify Google Cloud credentials are correct
- Ensure Vertex AI API is enabled in GCP
- Check backend logs for error messages

### Connection Issues
- Verify backend is running on port 3001
- Check frontend environment variables
- Ensure CORS settings allow frontend origin

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

---

## 👥 Authors

**The Code Talkers Team**

---

## 🙏 Acknowledgments

- **Google Cloud Platform** for Gemini AI and Vertex AI
- **ElevenLabs** for conversational AI and voice technology
- **Monaco Editor** for the powerful code editing experience
- **React Community** for the excellent ecosystem

---

## 📞 Support

For issues, questions, or contributions, please:
- Open an issue on GitHub
- Check existing documentation in [REQUIREMENTS.txt](REQUIREMENTS.txt)
- Review API documentation above

---

## 🗺️ Roadmap

Future enhancements planned:
- [ ] Support for more programming languages
- [ ] Code snippet library and templates
- [ ] Multi-file project support
- [ ] Git integration for version control
- [ ] Collaborative coding sessions
- [ ] Custom voice command training
- [ ] Code execution and testing environment
- [ ] Firestore integration for persistent sessions

---

**Happy Voice Coding! 🎤💻**
