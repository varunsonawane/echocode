<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import VoiceInterface from './components/VoiceInterface';
import CodeEditor from './components/CodeEditor';
import ChatHistory from './components/ChatHistory';
import { createSession, generateCode, debugCode, explainCode, speakText } from './services/api';
import './App.css';

function App() {
  const [code, setCode] = useState('// Your generated code will appear here\n// Say "generate a function to..." to start coding!\n');
  const [language, setLanguage] = useState('python');
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer] = useState(new Audio());

  // Add ref to track current code in real-time
  const codeRef = useRef(code);

  // Update ref whenever code changes
  useEffect(() => {
    codeRef.current = code;
    console.log('🔄 Code state updated, ref now has:', code.substring(0, 100));
  }, [code]);

=======
import MicrophoneTest from './components/MicrophoneTest';
import React, { useState, useEffect } from 'react';
import VoiceInterface from './components/VoiceInterface';
import CodeEditor from './components/CodeEditor';
import ChatHistory from './components/ChatHistory';
import { createSession, generateCode, debugCode, explainCode } from './services/api';
import './App.css';

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState('// Your generated code will appear here\n// Say "generate a function to..." to start coding!\n');
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);

  // Create session on mount
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await createSession(language);
        setSessionId(response.sessionId);
        console.log('Session created:', response.sessionId);
<<<<<<< HEAD
        addMessage('👋 Welcome to EchoCode!\n\n📌 Quick Start:\n• Say "generate a function to add numbers"\n• Paste code in the editor → Say "explain this code"\n• Change language using dropdown above editor\n\nLet\'s start coding with your voice! 🎤', 'ai');
=======
        addMessage('Welcome to EchoCode! I can help you generate code, debug issues, or explain code. Try saying "generate a function to add two numbers"!', 'ai');
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
      } catch (error) {
        console.error('Failed to create session:', error);
      }
    };
    initSession();
  }, []);

  const addMessage = (content, type = 'user') => {
<<<<<<< HEAD
    setMessages((prev) => [...prev, {
      content,
      type,
      timestamp: Date.now()
    }]);
  };

  // Function to speak text using ElevenLabs TTS
  const speakExplanation = async (text) => {
    try {
      console.log('🔊 Speaking explanation...', text.substring(0, 100));
      const audioBlob = await speakText(text);
      
      if (!audioBlob) {
        console.error('❌ No audio blob received');
        return;
      }
      
      console.log('✅ Received audio blob, size:', audioBlob.size);
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('🎵 Created audio URL:', audioUrl);
      
      // Create a new audio element each time (more reliable than reusing)
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      
      // Add event listeners for debugging
      audio.onloadeddata = () => console.log('✅ Audio loaded successfully');
      audio.onplay = () => console.log('▶️ Audio playback started');
      audio.onended = () => {
        console.log('✅ Audio playback finished');
        URL.revokeObjectURL(audioUrl); // Clean up
      };
      audio.onerror = (e) => console.error('❌ Audio playback error:', e);
      
      // Play the audio
      await audio.play();
      console.log('🎙️ Audio is now playing...');
    } catch (error) {
      console.error('❌ Error in speakExplanation:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
  };

  const handleTranscript = async (transcript) => {
    console.log('👂 User said:', transcript);
    addMessage(transcript, 'user');

    setIsLoading(true);
    
    try {
      const lowerTranscript = transcript.toLowerCase();
      
      // Use REF to get current code (always up-to-date, not async like state)
      const currentCode = codeRef.current;
      const hasCodeInEditor = currentCode && 
                              currentCode.trim().length > 20 && 
                              !currentCode.includes('Your generated code will appear here');
      
      console.log('📋 Current code from REF:', currentCode.substring(0, 100));
      console.log('📊 Has code in editor?', hasCodeInEditor);
      
      // PRIORITY 1: Explain code that's in the editor
      if ((lowerTranscript.includes('explain') && 
           (lowerTranscript.includes('code') || lowerTranscript.includes('this') || 
            lowerTranscript.includes('editor') || lowerTranscript.includes('pasted'))) && 
          hasCodeInEditor) {
        
        console.log('💡 EXPLAINING code from editor');
        console.log('📝 Sending code to Gemini:', currentCode.substring(0, 200));
        
        const response = await explainCode(currentCode, language);
        
        if (response.success) {
          const explanation = response.explanation;
          addMessage('💡 **Explanation:**\n\n' + explanation, 'ai');
          
          // Speak the explanation using TTS
          console.log('🎙️ Now speaking the explanation...');
          await speakExplanation(explanation);
        } else {
          addMessage(`❌ Error: ${response.error}`, 'ai');
        }
      }
      
      // PRIORITY 2: Debug code in editor
      else if ((lowerTranscript.includes('debug') || lowerTranscript.includes('fix') || 
                lowerTranscript.includes('error') || lowerTranscript.includes('problem')) && 
               hasCodeInEditor) {
        
        console.log('🔧 DEBUGGING code from editor');
        const response = await debugCode(currentCode, transcript, language);
        
        if (response.success) {
          addMessage('🔧 **Debug Analysis:**\n\n' + response.suggestion, 'ai');
        } else {
          addMessage(`❌ Error: ${response.error}`, 'ai');
        }
      }
      
      // PRIORITY 3: Edit existing code in editor
      else if ((lowerTranscript.includes('edit') || lowerTranscript.includes('modify') ||
                lowerTranscript.includes('change') || lowerTranscript.includes('update')) && 
               hasCodeInEditor) {
        
        console.log('✏️ EDITING code in editor');
        const modifyPrompt = `Modify this ${language} code: ${transcript}\n\nCurrent code:\n${currentCode}`;
        const response = await generateCode(modifyPrompt, language);
        
        if (response.success) {
          const cleanCode = response.code.replace(/```(?:python|javascript|typescript|java|cpp|go)?\n?/g, '').replace(/```$/g, '').trim();
          console.log('✅ Setting edited code:', cleanCode.substring(0, 100));
          setCode(cleanCode);
          codeRef.current = cleanCode; // Update ref immediately
          addMessage('✅ Code updated in editor!', 'ai');
        } else {
          addMessage(`❌ Error: ${response.error}`, 'ai');
        }
      }
      
      // PRIORITY 4: Generate NEW code
else if (lowerTranscript.includes('generate') || lowerTranscript.includes('create') ||
         lowerTranscript.includes('write') || lowerTranscript.includes('make') ||
         lowerTranscript.includes('build') || lowerTranscript.includes('code for') ||
         lowerTranscript.includes('code to') || lowerTranscript.includes('function') ||
         (lowerTranscript.includes('can you') && lowerTranscript.includes('code'))) {
  
  console.log('⚙️ GENERATING new code');
  console.log('📝 Prompt:', transcript);
  console.log('🔤 Language:', language);
  
  // Prevent double generation
  if (isLoading) {
    console.log('⏸️ Already loading, skipping duplicate request');
    return;
  }
  
  const response = await generateCode(transcript, language);
  console.log('📥 Backend response:', response);
  
  if (response.success) {
    const cleanCode = response.code.replace(/```(?:python|javascript|typescript|java|cpp|go)?\n?/g, '').replace(/```$/g, '').trim();
    
    console.log('📝 Clean code length:', cleanCode.length);
    console.log('📝 Clean code preview:', cleanCode.substring(0, 200));
    
    setCode(cleanCode);
    codeRef.current = cleanCode;
    console.log('✅ setCode called with clean code');
    
    addMessage('✅ Code generated! Check the editor →', 'ai');
  } else {
    console.error('❌ Generation failed:', response.error);
    addMessage(`❌ Error: ${response.error}`, 'ai');
  }
}
      
    } catch (error) {
      console.error('❌ Error:', error);
      addMessage('❌ Error: Something went wrong', 'ai');
=======
    const message = {
      content,
      type,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleTranscript = async (transcript) => {
    console.log('User said:', transcript);
    addMessage(transcript, 'user');

    // Determine intent and call appropriate API
    setIsLoading(true);
    try {
      if (transcript.toLowerCase().includes('generate') || 
          transcript.toLowerCase().includes('create') ||
          transcript.toLowerCase().includes('write') ||
          transcript.toLowerCase().includes('make') ||
          transcript.toLowerCase().includes('build')) {
        // Generate code
        const response = await generateCode(transcript, language);
        if (response.success) {
          setCode(response.code);
          addMessage(`I've generated the code for you!`, 'ai');
        } else {
          addMessage(`Sorry, I couldn't generate the code: ${response.error}`, 'ai');
        }
      } else if (transcript.toLowerCase().includes('debug') || 
                 transcript.toLowerCase().includes('fix') ||
                 transcript.toLowerCase().includes('error')) {
        // Debug code
        const response = await debugCode(code, transcript, language);
        if (response.success) {
          addMessage(response.suggestion, 'ai');
        } else {
          addMessage(`Sorry, I couldn't debug the code: ${response.error}`, 'ai');
        }
      } else if (transcript.toLowerCase().includes('explain') || 
                 transcript.toLowerCase().includes('what does')) {
        // Explain code
        const response = await explainCode(code, language);
        if (response.success) {
          addMessage(response.explanation, 'ai');
        } else {
          addMessage(`Sorry, I couldn't explain the code: ${response.error}`, 'ai');
        }
      } else {
        // General response
        addMessage('I can help you generate code, debug issues, or explain code. Try saying "generate a function" or "explain this code"!', 'ai');
      }
    } catch (error) {
      console.error('Error processing request:', error);
      addMessage('Sorry, something went wrong. Please try again.', 'ai');
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = (response) => {
<<<<<<< HEAD
    console.log('🤖 Agent said:', response);
    
    // List of phrases that indicate agent is trying to explain code (BAD)
    const badPhrases = [
      'this code',
      'sorts a list',
      'sorting',
      'factorial',
      'function',
      'calculates',
      'returns',
      'the code does',
      'it works by',
      'generates that code',
      "i'll generate",
      "i'll update",
      "i'll explain",
      "i can explain",
      'could you please confirm',
      'tell me what code',
      'what changes would you like',
      'i need you to provide',
      'i do not have access',
      'cannot fulfill that request',
    ];
    
    const lowerResponse = response.toLowerCase();
    const isBad = badPhrases.some(phrase => lowerResponse.includes(phrase));
    
    // Only add response if it's short acknowledgment
    if (!isBad && response && response.trim().length < 50) {
      addMessage(response, 'ai');
    }
  };

  const handleCodeChange = (newCode) => {
    console.log('✏️ User edited code in editor');
    console.log('📝 New code length:', newCode?.length || 0);
    console.log('📝 New code preview:', newCode?.substring(0, 100) || 'empty');
    const cleanCode = newCode || '';
    setCode(cleanCode);
    codeRef.current = cleanCode; // Update ref immediately for instant access
=======
    console.log('AI responded:', response);
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  };

  return (
    <div className="App">
      <header className="App-header">
<<<<<<< HEAD
        <h1>🎙️ EchoCode - Voice Pair Programming</h1>
        <div className="language-selector">
          <label>Language: </label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
          </select>
        </div>
      </header>

      <div className="main-container">
        <div className="left-panel">
          <VoiceInterface 
            onTranscript={handleTranscript} 
            onResponse={handleResponse}
            codeRef={codeRef}
            language={language}
          />
          <ChatHistory messages={messages} />
        </div>

        <div className="right-panel">
          <div className="editor-header">
            <h3>📝 Code Editor</h3>
          </div>
          <CodeEditor 
            code={code}
            language={language}
            onChange={handleCodeChange}
          />
=======
        <h1>🎙️ EchoCode - Voice-Driven Pair Programming</h1>
        <p>Powered by ElevenLabs & Google Gemini</p>
      </header>

      <div className="main-container">
        {/* Left Panel - Voice & Chat */}
        <div className="left-panel">
  <MicrophoneTest />
  <VoiceInterface
    onTranscript={handleTranscript}
    onResponse={handleResponse}
  />
  <div className="chat-container">
    <ChatHistory messages={messages} />
  </div>
</div>

        {/* Right Panel - Code Editor */}
        <div className="right-panel">
          <div className="editor-header">
            <h3>📝 Code Editor</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-selector"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
            </select>
          </div>
          <div className="editor-container">
            {isLoading ? (
              <div className="loading">
                <p>🤔 Thinking...</p>
              </div>
            ) : (
              <CodeEditor
                code={code}
                language={language}
                onChange={(value) => setCode(value)}
              />
            )}
          </div>
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
        </div>
      </div>
    </div>
  );
}

export default App;