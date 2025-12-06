import React, { useEffect, useRef } from 'react';

const ChatHistory = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

<<<<<<< HEAD
  const speakText = (text) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  const formatMessage = (content) => {
    // Simple formatting for better readability
    return content
      .split('\n')
      .map((line, i) => {
        // Bold text (wrapped in **)
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <div key={i} style={{ fontWeight: '600', marginTop: i > 0 ? '8px' : 0, marginBottom: '4px' }}>
              {parts.map((part, j) => 
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
              )}
            </div>
          );
        }
        // Bullet points (• or 🔹)
        if (line.trim().startsWith('•') || line.trim().startsWith('🔹')) {
          return (
            <div key={i} style={{ marginLeft: '16px', marginTop: '4px' }}>
              {line}
            </div>
          );
        }
        // Checkmarks and arrows
        if (line.trim().startsWith('✅') || line.trim().startsWith('📝') || 
            line.trim().startsWith('❌') || line.trim().startsWith('💡') ||
            line.trim().startsWith('🔧')) {
          return (
            <div key={i} style={{ marginTop: '8px', marginBottom: '4px' }}>
              {line}
            </div>
          );
        }
        // Empty lines
        if (line.trim() === '') {
          return <br key={i} />;
        }
        // Regular lines
        return <div key={i} style={{ marginTop: '2px' }}>{line}</div>;
      });
  };

=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>💬 Conversation History</h3>
      <div style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.type === 'user' ? styles.userMessage : styles.aiMessage),
              }}
            >
              <div style={styles.messageHeader}>
                <span style={styles.messageType}>
                  {msg.type === 'user' ? '👤 You' : '🤖 AI'}
                </span>
                <span style={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
<<<<<<< HEAD
              <div style={styles.messageContent}>
                {formatMessage(msg.content)}
              </div>
              {msg.type === 'ai' && msg.content.length > 20 && (
                <button 
                  onClick={() => speakText(msg.content)}
                  style={styles.speakButton}
                  title="Read aloud"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                >
                  🔊 Speak
                </button>
              )}
=======
              <div style={styles.messageContent}>{msg.content}</div>
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    padding: '20px',
    color: '#fff',
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
<<<<<<< HEAD
    paddingRight: '8px',
=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#666',
  },
  message: {
<<<<<<< HEAD
    padding: '12px 16px',
    borderRadius: '8px',
    maxWidth: '85%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
=======
    padding: '12px',
    borderRadius: '8px',
    maxWidth: '80%',
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  },
  userMessage: {
    backgroundColor: '#2563eb',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  aiMessage: {
    backgroundColor: '#374151',
    alignSelf: 'flex-start',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '12px',
    opacity: 0.8,
  },
  messageType: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: '11px',
  },
  messageContent: {
    fontSize: '14px',
<<<<<<< HEAD
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  speakButton: {
    marginTop: '10px',
    padding: '6px 14px',
    backgroundColor: '#10b981',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
=======
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  },
};

export default ChatHistory;