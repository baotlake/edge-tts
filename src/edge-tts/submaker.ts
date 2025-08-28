import { Subtitle, compose } from './srt_composer'
import { TTSChunk } from './typing'

/**
 * SubMaker is used to generate subtitles from WordBoundary and SentenceBoundary messages.
 */
export class SubMaker {
  private cues: Subtitle[] = []
  private type: 'WordBoundary' | 'SentenceBoundary' | null = null

  /**
   * Feed a WordBoundary or SentenceBoundary message to the SubMaker object.
   *
   * @param msg The WordBoundary or SentenceBoundary message.
   */
  public feed(msg: TTSChunk): void {
    if (msg.type !== 'WordBoundary' && msg.type !== 'SentenceBoundary') {
      throw new Error(
        "Invalid message type, expected 'WordBoundary' or 'SentenceBoundary'.",
      )
    }

    if (this.type === null) {
      this.type = msg.type
    } else if (this.type !== msg.type) {
      throw new Error(
        `Expected message type '${this.type}', but got '${msg.type}'.`,
      )
    }

    // The offset and duration are in ticks (100-nanosecond units).
    // To convert to milliseconds, we divide by 10,000.
    const startTimeMs = msg.offset / 10000
    const endTimeMs = (msg.offset + msg.duration) / 10000

    this.cues.push(
      new Subtitle(this.cues.length + 1, startTimeMs, endTimeMs, msg.text),
    )
  }

  /**
   * Get the SRT formatted subtitles from the SubMaker object.
   *
   * @returns The SRT formatted subtitles.
   */
  public getSrt(): string {
    return compose(this.cues)
  }

  /**
   * Get the SRT formatted subtitles. This is an alias for getSrt().
   *
   * @returns The SRT formatted subtitles.
   */
  public toString(): string {
    return this.getSrt()
  }
}
