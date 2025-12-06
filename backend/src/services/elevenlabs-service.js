const axios = require('axios');

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY;
    this.baseUrl = 'https://api.elevenlabs.io/v1';
    
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Create a conversational AI agent
   */
  async createAgent(name, prompt, voiceId) {
    try {
      const response = await this.axiosInstance.post('/convai/agents/create', {
        name: name,
        prompt: prompt || 'You are a helpful pair programming assistant.',
        voice_id: voiceId || 'default'
      });
      
      return {
        success: true,
        agent: response.data
      };
    } catch (error) {
      console.error('Error creating agent:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  /**
<<<<<<< HEAD
   * Convert text to speech
   */
  async textToSpeech(text, voiceId = 'EXAVITQu4vr4xnSDxMaL') {
    try {
      console.log(`🎙️ Using voice ID: ${voiceId}`);
      const response = await this.axiosInstance.post(
        `/text-to-speech/${voiceId}`,
        {
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        },
        {
          responseType: 'arraybuffer'
        }
      );
      
      console.log('✅ TTS API returned audio, size:', response.data.byteLength);
      return {
        success: true,
        audio: response.data
      };
    } catch (error) {
      console.error('❌ Error in TTS:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  /**
=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
   * List all agents
   */
  async listAgents() {
    try {
      const response = await this.axiosInstance.get('/convai/agents');
      
      return {
        success: true,
        agents: response.data
      };
    } catch (error) {
      console.error('Error listing agents:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  /**
   * Get agent details
   */
  async getAgent(agentId) {
    try {
      const response = await this.axiosInstance.get(`/convai/agents/${agentId}`);
      
      return {
        success: true,
        agent: response.data
      };
    } catch (error) {
      console.error('Error getting agent:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  /**
   * List all available voices
   */
  async listVoices() {
    try {
      const response = await this.axiosInstance.get('/voices');
      
      return {
        success: true,
        voices: response.data.voices
      };
    } catch (error) {
      console.error('Error listing voices:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

<<<<<<< HEAD


  /**
   * Get a signed URL for agent conversation with initial context
   * This allows passing code and explanation context to the agent
   */
  async getSignedConversationUrl(agentId, initialContext = {}) {
    try {
      // Build initial context message that the agent will see
      let contextMessage = '';
      
      if (initialContext.editor_code) {
        contextMessage += `[CURRENT CODE IN EDITOR - ${initialContext.language || 'python'}]\n\`\`\`${initialContext.language || 'python'}\n${initialContext.editor_code}\n\`\`\`\n\n`;
      }
      
      if (initialContext.gemini_explanation) {
        contextMessage += `[GEMINI'S ANALYSIS]\n${initialContext.gemini_explanation}\n\n`;
      }
      
      console.log('🔗 Getting signed URL with context:', {
        agentId,
        hasCode: !!initialContext.editor_code,
        hasExplanation: !!initialContext.gemini_explanation,
        contextLength: contextMessage.length
      });
      
      // Get signed URL for conversation (ElevenLabs API endpoint)
      const response = await this.axiosInstance.post(
        `/convai/conversations/get-signed-url`,
        {
          agent_id: agentId,
          // Pass initial context as first message if available
          ...(contextMessage && {
            first_message: contextMessage
          })
        }
      );
      
      return {
        success: true,
        signedUrl: response.data.signed_url,
        conversationId: response.data.conversation_id
      };
    } catch (error) {
      console.error('Error getting signed URL:', error.response?.data || error.message);
=======
  /**
   * Convert text to speech
   */
  async textToSpeech(text, voiceId = 'EXAVITQu4vr4xnSDxMaL') {
    try {
      const response = await this.axiosInstance.post(
        `/text-to-speech/${voiceId}`,
        {
          text: text,
          model_id: 'eleven_monolingual_v1'
        },
        {
          responseType: 'arraybuffer'
        }
      );
      
      // Convert audio to base64
      const audioBase64 = Buffer.from(response.data).toString('base64');
      
      return {
        success: true,
        audio: audioBase64
      };
    } catch (error) {
      console.error('Error in text-to-speech:', error.response?.data || error.message);
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }
}

// Export a singleton instance
module.exports = new ElevenLabsService();