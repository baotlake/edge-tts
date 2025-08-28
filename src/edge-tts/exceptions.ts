/**
 * Custom exceptions for the edge-tts package.
 */

export class EdgeTTSException extends Error {
  /** Base exception for the edge-tts package. */
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'EdgeTTSException'
  }
}

export class UnknownResponse extends EdgeTTSException {
  /** Raised when an unknown response is received from the server. */
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'UnknownResponse'
  }
}

export class UnexpectedResponse extends EdgeTTSException {
  /**
   * Raised when an unexpected response is received from the server.
   * This hasn't happened yet, but it's possible that the server will
   * change its response format in the future.
   */
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'UnexpectedResponse'
  }
}

export class NoAudioReceived extends EdgeTTSException {
  /** Raised when no audio is received from the server. */
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'NoAudioReceived'
  }
}

export class WebSocketError extends EdgeTTSException {
  /** Raised when a WebSocket error occurs. */
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'WebSocketError'
  }
}

export class SkewAdjustmentError extends EdgeTTSException {
  /** Raised when an error occurs while adjusting the clock skew. */
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'SkewAdjustmentError'
  }
}
