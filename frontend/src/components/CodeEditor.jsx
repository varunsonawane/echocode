<<<<<<< HEAD
import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, language, onChange, readOnly = false }) => {
  useEffect(() => {
    console.log('📝 CodeEditor received new code:', code?.substring(0, 100));
    console.log('📏 Code length:', code?.length);
  }, [code]);

  const handleEditorChange = (value, event) => {
    console.log('🔄 Editor changed, calling onChange');
    console.log('📝 New value length:', value?.length || 0);
    if (onChange) {
      onChange(value);
    }
  };

=======
import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, language, onChange, readOnly = false }) => {
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        language={language || 'javascript'}
        value={code}
<<<<<<< HEAD
        onChange={handleEditorChange}
=======
        onChange={onChange}
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          readOnly: readOnly,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;