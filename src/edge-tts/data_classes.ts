/**
 * Data models for edge-tts.
 */

export class TTSConfig {
  /**
   * Represents the internal TTS configuration for edge-tts's Communicate class.
   */
  public voice: string
  public rate: string
  public volume: string
  public pitch: string
  public boundary: 'WordBoundary' | 'SentenceBoundary'

  constructor(
    voice: string,
    rate: string,
    volume: string,
    pitch: string,
    boundary: 'WordBoundary' | 'SentenceBoundary',
  ) {
    this.voice = voice
    this.rate = rate
    this.volume = volume
    this.pitch = pitch
    this.boundary = boundary

    this.postInit()
  }

  public static validateStringParam(
    paramName: string,
    paramValue: string,
    pattern: string,
  ): string {
    /**
     * Validates the given string parameter based on type and pattern.
     */
    if (typeof paramValue !== 'string') {
      throw new TypeError(`${paramName} must be a string`)
    }
    const regex = new RegExp(pattern)
    if (!regex.test(paramValue)) {
      throw new Error(`Invalid ${paramName} '${paramValue}'.`)
    }
    return paramValue
  }

  private postInit(): void {
    /**
     * Validates the TTSConfig object after initialization.
     */
    if (typeof this.voice !== 'string') {
      throw new TypeError('voice must be a string')
    }

    const match = this.voice.match(/^([a-z]{2,})-([A-Z]{2,})-(.+Neural)$/)
    if (match) {
      const lang = match[1]
      let region = match[2]
      let name = match[3] || ''
      const hyphenIndex = name.indexOf('-')
      if (hyphenIndex !== -1) {
        region = `${region}-${name.substring(0, hyphenIndex)}`
        name = name.substring(hyphenIndex + 1)
      }
      this.voice =
        `Microsoft Server Speech Text to Speech Voice` +
        ` (${lang}-${region}, ${name})`
    }

    TTSConfig.validateStringParam(
      'voice',
      this.voice,
      '^Microsoft Server Speech Text to Speech Voice \\(.+,.+\\)$',
    )
    TTSConfig.validateStringParam('rate', this.rate, '^[+-]\\d+%$')
    TTSConfig.validateStringParam('volume', this.volume, '^[+-]\\d+%$')
    TTSConfig.validateStringParam('pitch', this.pitch, '^[+-]\\d+Hz$')
  }
}

export interface UtilArgs {
  /**
   * CLI arguments.
   */
  text: string
  file: string
  voice: string
  listVoices: boolean
  rate: string
  volume: string
  pitch: string
  writeMedia: string
  writeSubtitles: string
  proxy: string
}
