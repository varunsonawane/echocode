const { VertexAI } = require('@google-cloud/vertexai');

class GeminiService {
  constructor() {
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    this.location = 'us-central1';
    this.model = 'gemini-2.5-flash';
    
    // Initialize Vertex AI
    this.vertexAI = new VertexAI({
      project: this.projectId,
      location: this.location
    });
    
    this.generativeModel = this.vertexAI.getGenerativeModel({
      model: this.model,
    });
  }

  /**
   * Generate code based on user's voice description
   */
<<<<<<< HEAD
  async generateCode(prompt, language = 'javascript', existingCode = null) {
  try {
    let enhancedPrompt = '';
    
    if (existingCode) {
      // User wants to modify existing code
      enhancedPrompt = `You are a code generator. Generate ONLY code, no explanations.

Current code:
\`\`\`${language}
${existingCode}
\`\`\`

User request: ${prompt}

CRITICAL RULES:
- Generate the COMPLETE updated code
- ONLY output code, nothing else
- NO markdown, NO explanations, NO comments unless explicitly requested
- If user says "without comments", generate code with ZERO comments`;
    } else {
      // User wants new code
      enhancedPrompt = `You are a code generator. Generate ONLY code, no explanations.

User request: ${prompt}

Language: ${language}

CRITICAL RULES:
- Generate clean, working ${language} code
- ONLY output code, nothing else
- NO markdown code fences (no \`\`\`)
- NO explanations before or after the code
- If user says "without comments", generate ZERO comments
- If user says "simple" or "basic", keep it minimal
- Default: Include helpful comments unless told not to`;
    }

    const result = await this.generativeModel.generateContent(enhancedPrompt);
    const response = result.response;
    let text = response.candidates[0].content.parts[0].text;
    
    // Clean up any markdown that slipped through
    text = text.replace(/```(?:python|javascript|typescript|java|cpp|go)?\n?/g, '');
    text = text.replace(/```$/g, '');
    text = text.trim();
    
    return {
      success: true,
      code: text,
      language: language
    };
  } catch (error) {
    console.error('Error generating code:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
=======
  async generateCode(prompt, language = 'javascript') {
    try {
      const enhancedPrompt = `You are an expert pair programming assistant. 
The user wants to: ${prompt}

Generate clean, well-commented ${language} code that:
1. Follows best practices
2. Includes error handling
3. Is production-ready
4. Has helpful comments

Provide ONLY the code, no explanations before or after.`;

      const result = await this.generativeModel.generateContent(enhancedPrompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      
      return {
        success: true,
        code: text,
        language: language
      };
    } catch (error) {
      console.error('Error generating code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa

  /**
   * Debug code and provide suggestions
   */
  async debugCode(code, errorMessage, language = 'javascript') {
    try {
      const prompt = `You are debugging ${language} code.

CODE:
${code}

ERROR:
${errorMessage}

Provide:
1. What's wrong
2. How to fix it
3. The corrected code

Format your response clearly.`;

      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      
      return {
        success: true,
        suggestion: text
      };
    } catch (error) {
      console.error('Error debugging code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Explain code functionality
   */
  async explainCode(code, language = 'javascript') {
    try {
      const prompt = `Explain this ${language} code in simple terms:

${code}

Provide:
1. What it does overall
2. Key parts explained
3. Any potential issues`;

      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      
      return {
        success: true,
        explanation: text
      };
    } catch (error) {
      console.error('Error explaining code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Discuss architecture and design
   */
  async discussArchitecture(description) {
    try {
      const prompt = `As a software architect, discuss this system design:

${description}

Provide:
1. Recommended architecture
2. Technology choices
3. Potential challenges
4. Best practices`;

      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      
      return {
        success: true,
        advice: text
      };
    } catch (error) {
      console.error('Error discussing architecture:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export a singleton instance
module.exports = new GeminiService();