import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { LRUCache } from 'lru-cache';
import { handleClientError } from './error-handling.js';

/**
 * Returns an Anthropic client instance for MCP, handling potential errors.
 * Uses an LRU cache to reuse clients for the same session ID if available.
 * @param {object} session - The MCP session object.
 * @param {object} log - Logger instance.
 * @returns {Anthropic} The Anthropic client instance.
 * @throws {Error} If the API key is missing or client creation fails.
 */
export function getAnthropicClientForMCP(session, log = console) {
  // ... existing implementation ...
}

/**
 * Returns an OpenAI client instance configured for Perplexity API for MCP, handling potential errors.
 * Uses an LRU cache to reuse clients for the same session ID if available.
 * @param {object} session - The MCP session object.
 * @param {object} log - Logger instance.
 * @returns {OpenAI} The OpenAI client instance for Perplexity.
 * @throws {Error} If the Perplexity API key is missing or client creation fails.
 */
export function getPerplexityClientForMCP(session, log = console) {
  // ... existing implementation ...
}

// Add the new Ark client function
function getArkClientForMCP(session, log) {
  try {
    // 检查环境变量中是否有ARK_API_KEY
    const apiKey = process.env.ARK_API_KEY;
    if (!apiKey) {
      throw new Error('ARK_API_KEY not found in environment variables');
    }

    // 创建新的OpenAI客户端实例，使用方舟API
    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3",
    });

    return client;
  } catch (error) {
    handleClientError(error, log); // Assuming handleClientError can handle generic errors or needs update
    throw error;
  }
}

/**
 * Returns an OpenAI client instance for MCP, handling potential errors.
 * Uses an LRU cache to reuse clients for the same session ID if available.
 * @param {object} session - The MCP session object.
 * @param {object} log - Logger instance.
 * @returns {OpenAI} The OpenAI client instance.
 * @throws {Error} If the API key is missing or client creation fails.
 */
export function getOpenAIClientForMCP(session, log = console) {
  // ... existing implementation ...
}

/**
 * Generates text completion using the Anthropic API.
 * @param {Anthropic} client - The Anthropic client instance.
 * @param {string} prompt - The prompt for the completion.
 * @param {object} options - Additional options (model, maxTokens, temperature).
 * @returns {Promise<string>} The generated text content.
 * @throws {Error} If the API call fails.
 */
export async function generateAnthropicCompletion(client, prompt, options = {}) {
  // ... existing implementation ...
}

/**
 * Generates text completion using the Perplexity API.
 * @param {OpenAI} client - The OpenAI client instance configured for Perplexity.
 * @param {string} prompt - The prompt for the completion.
 * @param {object} options - Additional options (model, maxTokens, temperature).
 * @returns {Promise<string>} The generated text content.
 * @throws {Error} If the API call fails.
 */
export async function generatePerplexityCompletion(client, prompt, options = {}) {
 // ... existing implementation ...
}

/**
 * Determines the best available AI model and client based on configuration and requirements.
 * Prioritizes Anthropic, then Perplexity for research, then OpenAI.
 * @param {object} session - The MCP session object.
 * @param {object} options - Options object, potentially including `requiresResearch`.
 * @returns {object} An object containing the provider name, model name, and client instance.
 * @throws {Error} If no suitable API key is found or client creation fails.
 */
export function getBestAvailableAIModel(session, options = {}) {
  const { requiresResearch = false } = options;
  const log = options.log || console; // Ensure log is available

  // Get preferred provider from environment, default to anthropic
  const preferredProvider = process.env.PREFERRED_PROVIDER || 'anthropic';

  // --- Start Modification ---
  if (preferredProvider === 'ark' && process.env.ARK_API_KEY) {
     log.info('Preferred provider set to Ark. Using Ark API.');
     return {
       provider: 'ark',
       model: process.env.ARK_MODEL || '{TEMPLATE_ENDPOINT_ID}', // User needs to replace {TEMPLATE_ENDPOINT_ID}
       client: getArkClientForMCP(session, log)
     };
  } else if (preferredProvider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
    log.info('Preferred provider set to Anthropic. Using Anthropic API.');
    const client = getAnthropicClientForMCP(session, log);
    // Determine the best Anthropic model (existing logic)
    const useSonnet = process.env.ANTHROPIC_USE_SONNET === 'true';
    const model = useSonnet ? 'claude-3-sonnet-20240229' : 'claude-3-opus-20240229';
     return { provider: 'anthropic', model: model, client: client };
  } else if (preferredProvider === 'perplexity' && process.env.PERPLEXITY_API_KEY) {
      log.info('Preferred provider set to Perplexity. Using Perplexity API.');
     return {
       provider: 'perplexity',
       model: 'llama-3-sonar-large-32k-online', // Default Perplexity model
       client: getPerplexityClientForMCP(session, log)
     };
  } else if (preferredProvider === 'openai' && process.env.OPENAI_API_KEY) {
    log.info('Preferred provider set to OpenAI. Using OpenAI API.');
    const client = getOpenAIClientForMCP(session, log);
    const model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'; // Or your preferred default
     return { provider: 'openai', model: model, client: client };
  }
  // --- End Modification ---

  // Fallback logic if preferred provider is unavailable or not set, or if research is required
  if (requiresResearch && process.env.PERPLEXITY_API_KEY) {
    log.info('Research required. Using Perplexity API.');
    return {
      provider: 'perplexity',
      model: 'llama-3-sonar-large-32k-online', // Default Perplexity model
      client: getPerplexityClientForMCP(session, log)
    };
  } else if (process.env.ANTHROPIC_API_KEY) {
    log.info('Falling back to Anthropic API.');
    const client = getAnthropicClientForMCP(session, log);
    // Determine the best Anthropic model (existing logic repeated for fallback)
    const useSonnet = process.env.ANTHROPIC_USE_SONNET === 'true';
    const model = useSonnet ? 'claude-3-sonnet-20240229' : 'claude-3-opus-20240229';
    return { provider: 'anthropic', model: model, client: client };
 } else if (process.env.OPENAI_API_KEY) {
    log.info('Falling back to OpenAI API.');
    const client = getOpenAIClientForMCP(session, log);
    const model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
    return { provider: 'openai', model: model, client: client };
 } else if (process.env.PERPLEXITY_API_KEY) {
     // Fallback to Perplexity even if research not explicitly required, if it's the only key available
     log.info('Falling back to Perplexity API (only key available).');
     return {
       provider: 'perplexity',
       model: 'llama-3-sonar-large-32k-online',
       client: getPerplexityClientForMCP(session, log)
     };
  } else if (process.env.ARK_API_KEY) { // Add Ark as a final fallback
     log.info('Falling back to Ark API (only key available).');
     return {
       provider: 'ark',
       model: process.env.ARK_MODEL || '{TEMPLATE_ENDPOINT_ID}',
       client: getArkClientForMCP(session, log)
     };
  }

  // If no keys are found
  log.error('No suitable AI API key found in environment variables.');
  throw new Error('No suitable AI API key found. Please configure ANTHROPIC_API_KEY, OPENAI_API_KEY, PERPLEXITY_API_KEY, or ARK_API_KEY in your .env file.');
}

// Add the Ark error handling function
function handleArkApiError(error, log) {
  // 日志记录错误
  if (log) {
    log.error('Ark API error:', error);
  }

  // 提取错误信息
  let errorMessage = 'Unknown error occurred with Ark API';

  if (error.response) {
    // 处理API响应错误
    errorMessage = `Ark API error: ${error.response.status} - ${error.response.data?.error || 'Unknown error'}`; // Added optional chaining
  } else if (error.request) {
    // 处理请求错误
    errorMessage = 'Ark API request failed. Please check your network connection and API endpoint.';
  } else {
    // 处理其他错误
    errorMessage = `Ark API error: ${error.message}`;
  }

  return {
    code: 'ARK_API_ERROR',
    message: errorMessage,
    details: error
  };
}

// Make sure new functions are exported if needed elsewhere, though they seem internally used for now
export { getArkClientForMCP, handleArkApiError }; // Exporting new functions, removed generateArkCompletion 