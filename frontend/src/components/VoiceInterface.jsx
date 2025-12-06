<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import AgentTextInput from './AgentTextInput';
import { getConversationUrl } from '../services/api';

const VoiceInterface = ({ onTranscript, onResponse, codeRef, language }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Ready to start');
  const conversationRef = useRef(null);
  const shouldStayConnected = useRef(false);
  const reconnectTimeoutRef = useRef(null);
=======
import React, { useState } from 'react';
import { useConversation } from '@elevenlabs/react';

const VoiceInterface = ({ onTranscript, onResponse }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Ready to start');
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa

  const conversation = useConversation({
    apiKey: process.env.REACT_APP_ELEVENLABS_API_KEY,
    onConnect: () => {
      console.log('✅ Connected to ElevenLabs Agent');
      setIsConnected(true);
      setStatus('Connected - Listening');
<<<<<<< HEAD
      
      // Inject code context after connection stabilizes
      setTimeout(() => {
        const currentCode = codeRef?.current;
        const currentLanguage = language || 'python';
        
        if (currentCode && currentCode.trim() && !currentCode.includes('Your generated code will appear here')) {
          console.log('📤 Injecting code context into agent');
          
          // Send context through transcript handler (simulates voice input)
          const contextMessage = `Here is the code I want to discuss: ${currentCode}`;
          if (onTranscript) {
            onTranscript(contextMessage);
          }
        }
      }, 2000); // Wait for connection to fully stabilize
=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
    },
    onDisconnect: () => {
      console.log('❌ Disconnected from ElevenLabs');
      setIsConnected(false);
<<<<<<< HEAD
      
      // Auto-reconnect if user hasn't manually ended session
      if (shouldStayConnected.current) {
        console.log('🔄 Auto-reconnecting in 2 seconds...');
        setStatus('Reconnecting...');
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('🔄 Attempting to reconnect...');
          startConversation();
        }, 2000);
      } else {
        setStatus('Disconnected');
      }
=======
      setStatus('Disconnected');
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
    },
    onMessage: (message) => {
      console.log('📨 Full message object:', JSON.stringify(message, null, 2));
      
<<<<<<< HEAD
      // Handle user transcripts
      if (message.type === 'user_transcript' || message.source === 'user') {
        const transcript = message.message || message.text || message.content || '';
        console.log('👤 User transcript:', transcript);
        
=======
      // Try different message structures
      if (message.type === 'user_transcript' || message.source === 'user') {
        const transcript = message.message || message.text || message.content || '';
        console.log('👤 User transcript:', transcript);
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
        if (transcript && onTranscript) {
          onTranscript(transcript);
        }
      } 
<<<<<<< HEAD
      // Handle agent responses
=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
      else if (message.type === 'agent_response' || message.source === 'ai') {
        const response = message.message || message.text || message.content || '';
        console.log('🤖 Agent response:', response);
        if (response && onResponse) {
          onResponse(response);
        }
      }
<<<<<<< HEAD
      // Fallback message handling
=======
      // Fallback - check message.message structure
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
      else if (message.message) {
        if (message.message.role === 'user') {
          const transcript = message.message.content;
          console.log('👤 User said (fallback):', transcript);
          if (transcript && onTranscript) {
            onTranscript(transcript);
          }
        } else if (message.message.role === 'assistant') {
          const response = message.message.content;
          console.log('🤖 Agent said (fallback):', response);
          if (response && onResponse) {
            onResponse(response);
          }
        }
      }
    },
    onError: (error) => {
      console.error('❌ ElevenLabs error:', error);
<<<<<<< HEAD
      // Don't disconnect on minor errors
      if (error.message && !error.message.includes('WebSocket')) {
        setStatus(`Error: ${error.message || 'Connection failed'}`);
      }
=======
      setStatus(`Error: ${error.message || 'Connection failed'}`);
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
    },
  });

  const startConversation = async () => {
    try {
      setStatus('Connecting...');
      
      const agentId = process.env.REACT_APP_ELEVENLABS_AGENT_ID;
      const apiKey = process.env.REACT_APP_ELEVENLABS_API_KEY;
      
      if (!agentId) {
        alert('❌ Missing Agent ID. Check your .env file.');
        setStatus('Configuration error - No Agent ID');
        return;
      }
      
      if (!apiKey) {
        alert('❌ Missing API Key. Check your .env file.');
        setStatus('Configuration error - No API Key');
        return;
      }

      console.log('🚀 Starting with agent:', agentId);
      console.log('🔑 API Key present:', apiKey ? 'Yes' : 'No');

      // Request microphone permissions explicitly first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('✅ Microphone permission granted');
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error('❌ Microphone permission denied:', err);
        alert('Please allow microphone access to use voice features.');
        setStatus('Microphone access denied');
        return;
      }

<<<<<<< HEAD
      // Build context with current code from editor
      const context = {
        editor_code: codeRef?.current || '',
        language: language || 'python'
      };

      console.log('📝 Code in editor when connecting:', {
        hasCode: !!context.editor_code,
        codeLength: context.editor_code?.length,
        language: context.language
      });

      // Start the session normally (ElevenLabs SDK doesn't support passing context directly)
      // Context will be sent via text input after connection
      const session = await conversation.startSession({
        agentId: agentId
      });

      conversationRef.current = session;
      shouldStayConnected.current = true; // Enable auto-reconnect
      console.log('✅ Session started successfully with code context');
=======
      await conversation.startSession({
        agentId: agentId,
      });

      console.log('✅ Session started successfully');
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
      setStatus('Connected - Speak now!');
    } catch (error) {
      console.error('❌ Failed to start:', error);
      setStatus(`Failed: ${error.message}`);
      alert(`Connection failed: ${error.message}\n\nPlease check:\n1. Your internet connection\n2. ElevenLabs API key is valid\n3. Agent ID is correct`);
    }
  };

  const endConversation = async () => {
<<<<<<< HEAD
  try {
    shouldStayConnected.current = false; // Disable auto-reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (conversation.status === 'connected') {
      await conversation.endSession();
      conversationRef.current = null;
      setStatus('Session ended');
    }
  } catch (error) {
    console.error('Error ending session:', error);
    shouldStayConnected.current = false;
    setStatus('Session ended');
  }
};

  const sendTextToAgent = (text) => {
    if (isConnected) {
      // Send text directly to the transcript handler
      // This simulates user speech input
      console.log('📤 Sending text to agent:', text);
      if (onTranscript) {
        onTranscript(text);
      }
=======
    try {
      await conversation.endSession();
      setStatus('Session ended');
    } catch (error) {
      console.error('Error ending session:', error);
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>🎤 ElevenLabs Voice Agent</h3>
        <div style={styles.status}>
          <span style={{
            ...styles.statusDot,
            backgroundColor: isConnected ? '#10b981' : '#6b7280'
          }}></span>
          <span style={styles.statusText}>{status}</span>
        </div>
      </div>

      <div style={styles.controls}>
        {!isConnected ? (
          <button
            onClick={startConversation}
            style={{...styles.button, ...styles.startButton}}
            disabled={conversation.status === 'connecting'}
          >
            {conversation.status === 'connecting' ? '⏳ Connecting...' : '▶️ Start Agent'}
          </button>
        ) : (
<<<<<<< HEAD
          <>
            <button
              onClick={endConversation}
              style={{...styles.button, ...styles.endButton}}
            >
              ⏹️ End Session
            </button>
            <AgentTextInput onSend={sendTextToAgent} isConnected={isConnected} />
          </>
=======
          <button
            onClick={endConversation}
            style={{...styles.button, ...styles.endButton}}
          >
            ⏹️ End Session
          </button>
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
        )}
      </div>

      <div style={styles.info}>
        <div style={styles.infoBox}>
          {isConnected ? (
            <>
              <p style={styles.infoText}>
<<<<<<< HEAD
  🎙️ <strong>Session active!</strong> Keep talking - I remember our conversation.
</p>
<p style={styles.helpText}>
  Try saying:<br/>
  • "Generate a sorting function"<br/>
  • "Now edit it to sort descending"<br/>
  • "Explain what you just created"<br/>
  <br/>
  💡 <strong>Tip:</strong> Keep the session open to maintain context!
</p>
=======
                🎙️ <strong>Microphone is active!</strong>
              </p>
              <p style={styles.helpText}>
                Try saying:<br/>
                • "Generate a function to add two numbers"<br/>
                • "Create a Python function to reverse a string"<br/>
                • "Write code to check if a number is prime"
              </p>
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
            </>
          ) : (
            <p style={styles.infoText}>
              Click "Start Agent" and allow microphone access when prompted.
            </p>
          )}
        </div>
        
        <div style={styles.debug}>
          <small>SDK Status: {conversation.status || 'idle'}</small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  statusText: {
    fontSize: '14px',
    fontWeight: '500',
  },
  controls: {
    marginBottom: '20px',
  },
  button: {
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
<<<<<<< HEAD
    marginBottom: '12px',
=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  },
  startButton: {
    backgroundColor: '#10b981',
    color: '#fff',
  },
  endButton: {
    backgroundColor: '#ef4444',
    color: '#fff',
  },
  info: {
    backgroundColor: '#2d2d2d',
    borderRadius: '6px',
  },
  infoBox: {
    padding: '16px',
  },
  infoText: {
    margin: '0 0 12px 0',
    fontSize: '15px',
    color: '#e5e7eb',
  },
  helpText: {
    margin: 0,
    fontSize: '13px',
    color: '#9ca3af',
    lineHeight: '1.6',
  },
  debug: {
    padding: '8px 16px',
    borderTop: '1px solid #374151',
    color: '#6b7280',
    fontFamily: 'monospace',
    fontSize: '11px',
  },
};

export default VoiceInterface;