/**
 * Configuration options for the RealtimeClient
 */
export interface RealtimeClientSettings {
  /** WebSocket endpoint URL */
  url: string;
  /** API key for authentication */
  apiKey: string;
  /** Whether to allow API key usage in browser (not recommended for production) */
  dangerouslyAllowAPIKeyInBrowser?: boolean;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Tool definition for registering tools with the client
 */
export interface ToolDefinition {
  /** Name of the tool */
  name: string;
  /** Description of what the tool does */
  description: string;
  /** JSON Schema for the tool parameters */
  parameters: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

/**
 * Tool registration type combining definition and handler
 */
export interface ToolRegistration {
  definition: ToolDefinition;
  handler: Function;
}

/**
 * Model configuration settings
 */
export interface TicosModelConfig {
  /** Model provider (e.g., 'tiwater') */
  provider: string;
  /** Model name (e.g., 'stardust-2.5-turbo') */
  name: string;
  /** Supported modalities */
  modalities: string[];
  /** System instructions */
  instructions: string;
  /** Available tools */
  tools: ToolDefinition[];
  /** Tool choice strategy */
  tool_choice: 'auto' | 'none' | 'required' | { type: 'function'; name: string };
  /** Temperature for response generation */
  temperature: number;
  /** Maximum tokens in responses */
  max_response_output_tokens: number | 'inf';
}

/**
 * Audio configuration settings
 */
export interface AudioConfig {
  /** Voice ID for audio responses */
  voice: string;
  /** Format of audio input */
  input_audio_format: string;
  /** Format of audio output */
  output_audio_format: string;
  /** Configuration for audio transcription */
  input_audio_transcription: any | null;
  /** Settings for conversation turn detection */
  turn_detection: any | null;
}

/**
 * Vision configuration settings
 */
export interface VisionConfig {
  /** Enable face detection */
  enable_face_detection?: boolean;
  /** Enable object detection */
  enable_object_detection?: boolean;
  /** Enable face identification */
  enable_face_identification?: boolean;
  /** Target classes for object detection */
  object_detection_target_classes?: string[];
}

/**
 * Knowledge configuration settings
 */
export interface KnowledgeConfig {
  /** Available scripts for conversation */
  scripts?: ScriptConfig[];
}

/**
 * Script configuration for predefined dialogues
 */
export interface ScriptConfig {
  /** Unique identifier */
  id: string;
  /** Script name */
  name: string;
  /** Script description */
  description: string;
  /** Priority level */
  priority?: number;
  /** Categorization tags */
  tags: string[];
  /** Predefined dialogues */
  dialogues: Dialogue[];
}

/**
 * Dialogue structure for scripted responses
 */
export interface Dialogue {
  /** Unique identifier */
  id: string;
  /** Input prompts that trigger this dialogue */
  prompts: string[];
  /** Possible responses */
  responses: DialogueResponse[];
}

/**
 * Response types in dialogues
 */
export type DialogueResponse = MessageResponse | FunctionResponse;

/**
 * Message response in dialogues
 */
export interface MessageResponse {
  /** Unique identifier */
  id: string;
  /** Response type */
  type: 'message';
  /** Message content */
  message: string;
}

/**
 * Function response in dialogues
 */
export interface FunctionResponse {
  /** Unique identifier */
  id: string;
  /** Response type */
  type: 'function';
  /** Function to execute */
  function: string;
}

/**
 * Complete Ticos configuration
 */
export interface TicosConfigOptions {
  /** Model configuration */
  model: TicosModelConfig;
  /** Speech configuration */
  speech: Partial<AudioConfig>;
  /** Hearing configuration */
  hearing: Partial<AudioConfig>;
  /** Vision configuration */
  vision?: VisionConfig;
  /** Knowledge configuration */
  knowledge?: KnowledgeConfig;
}

/**
 * Audio transcription configuration
 */
export type AudioTranscriptionType = {
  provider: string;
  language?: string;
  model?: string;
};

/**
 * Turn detection configuration using server VAD
 */
export type TurnDetectionServerVadType = {
  provider: string;
  min_silence_duration?: number;
  silence_threshold?: number;
}; 