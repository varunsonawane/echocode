const express = require('express');
const router = express.Router();
const elevenLabsService = require('../services/elevenlabs-service');

/**
<<<<<<< HEAD
 * POST /api/elevenlabs/speak
 * Convert text to speech
 */
router.post('/speak', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        error: 'Text is required' 
      });
    }

    console.log(`🔊 Converting text to speech: ${text.substring(0, 50)}...`);
    
    const result = await elevenLabsService.textToSpeech(text, voiceId);
    
    if (result.success) {
      console.log('✅ TTS successful, sending audio...');
      res.set('Content-Type', 'audio/mpeg');
      // result.audio is already an arraybuffer, convert to Buffer
      const audioBuffer = Buffer.from(result.audio);
      console.log('📦 Audio buffer size:', audioBuffer.length);
      res.send(audioBuffer);
    } else {
      res.status(500).json({ 
        error: 'Failed to convert text to speech',
        message: result.error 
      });
    }
  } catch (error) {
    console.error('Error in TTS route:', error);
    res.status(500).json({ 
      error: 'Failed to convert text to speech',
      message: error.message 
    });
  }
});

/**
=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
 * POST /api/elevenlabs/create-agent
 * Create a new ElevenLabs conversational agent
 */
router.post('/create-agent', async (req, res) => {
  try {
    const { name, prompt, voiceId } = req.body;
    
    if (!name) {
      return res.status(400).json({ 
        error: 'Agent name is required' 
      });
    }

    console.log(`Creating ElevenLabs agent: ${name}`);
    
    const result = await elevenLabsService.createAgent(name, prompt, voiceId);
    
    res.json(result);
  } catch (error) {
    console.error('Error creating agent:', error);
    res.status(500).json({ 
      error: 'Failed to create agent',
      message: error.message 
    });
  }
});

/**
 * GET /api/elevenlabs/agents
 * List all available agents
 */
router.get('/agents', async (req, res) => {
  try {
    console.log('Fetching ElevenLabs agents...');
    
    const result = await elevenLabsService.listAgents();
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ 
      error: 'Failed to fetch agents',
      message: error.message 
    });
  }
});

/**
 * GET /api/elevenlabs/voices
 * List all available voices
 */
router.get('/voices', async (req, res) => {
  try {
    console.log('Fetching ElevenLabs voices...');
    
    const result = await elevenLabsService.listVoices();
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching voices:', error);
    res.status(500).json({ 
      error: 'Failed to fetch voices',
      message: error.message 
    });
  }
});

/**
 * POST /api/elevenlabs/text-to-speech
 * Convert text to speech
 */
router.post('/text-to-speech', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        error: 'Text is required' 
      });
    }

    console.log('Converting text to speech...');
    
    const result = await elevenLabsService.textToSpeech(text, voiceId);
    
    res.json(result);
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    res.status(500).json({ 
      error: 'Failed to convert text to speech',
      message: error.message 
    });
  }
});

/**
 * GET /api/elevenlabs/agent/:agentId
 * Get agent details
 */
router.get('/agent/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    
    console.log(`Fetching agent: ${agentId}`);
    
    const result = await elevenLabsService.getAgent(agentId);
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching agent:', error);
    res.status(500).json({ 
      error: 'Failed to fetch agent',
      message: error.message 
    });
  }
});

<<<<<<< HEAD
/**
 * POST /api/elevenlabs/conversation-url
 * Get signed URL for conversation with initial context (code + explanation)
 */
router.post('/conversation-url', async (req, res) => {
  try {
    const { agentId, context } = req.body;
    
    if (!agentId) {
      return res.status(400).json({ 
        error: 'Agent ID is required' 
      });
    }

    console.log('🔗 Getting conversation URL with context:', {
      agentId,
      hasCode: !!context?.editor_code,
      hasExplanation: !!context?.gemini_explanation,
      language: context?.language
    });
    
    const result = await elevenLabsService.getSignedConversationUrl(agentId, context);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ 
        error: 'Failed to get conversation URL',
        message: result.error 
      });
    }
  } catch (error) {
    console.error('Error getting conversation URL:', error);
    res.status(500).json({ 
      error: 'Failed to get conversation URL',
      message: error.message 
    });
  }
});

=======
>>>>>>> 8c83e63cec09531422586ac0b32cb21c6170b5fa
module.exports = router;