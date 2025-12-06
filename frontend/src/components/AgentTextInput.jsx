import React, { useState } from 'react';

const AgentTextInput = ({ onSend, isConnected }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && isConnected) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isConnected ? "Type to agent..." : "Connect agent first"}
          disabled={!isConnected}
          style={{
            ...styles.input,
            opacity: isConnected ? 1 : 0.5
          }}
        />
        <button 
          type="submit" 
          disabled={!isConnected || !input.trim()}
          style={{
            ...styles.button,
            opacity: (isConnected && input.trim()) ? 1 : 0.5
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '12px',
  },
  form: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default AgentTextInput;