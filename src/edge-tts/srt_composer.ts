const MULTI_WS_REGEX = /\n\n+/g
const ZERO_TIMEDELTA = 0 // Represents timedelta in milliseconds

type SubtitleSkipCondition = {
  reason: string
  test: (sub: Subtitle) => boolean
}

const SUBTITLE_SKIP_CONDITIONS: SubtitleSkipCondition[] = [
  { reason: 'No content', test: (sub) => !sub.content.trim() },
  {
    reason: 'Start time < 0 seconds',
    test: (sub) => sub.start < ZERO_TIMEDELTA,
  },
  {
    reason: 'Subtitle start time >= end time',
    test: (sub) => sub.start >= sub.end,
  },
]

const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60
const MICROSECONDS_IN_MILLISECOND = 1000

class ShouldSkipError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ShouldSkipError'
  }
}

export class Subtitle {
  public index: number | null
  public start: number // milliseconds
  public end: number // milliseconds
  public content: string

  constructor(
    index: number | null,
    start: number,
    end: number,
    content: string,
  ) {
    this.index = index
    this.start = start
    this.end = end
    this.content = content
  }

  public equals(other: unknown): boolean {
    if (!(other instanceof Subtitle)) {
      return false
    }
    return (
      this.index === other.index &&
      this.start === other.start &&
      this.end === other.end &&
      this.content === other.content
    )
  }

  public toSrt(eol = '\n'): string {
    const outputContent = makeLegalContent(this.content).replace(/\n/g, eol)

    const template = `{idx}${eol}{start} --> {end}${eol}{content}${eol}${eol}`
    return template
      .replace('{idx}', (this.index ?? 0).toString())
      .replace('{start}', timedeltaToSrtTimestamp(this.start))
      .replace('{end}', timedeltaToSrtTimestamp(this.end))
      .replace('{content}', outputContent)
      .replace(new RegExp(eol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), eol) // Ensure consistent EOL
  }
}

export function makeLegalContent(content: string): string {
  if (content && content[0] !== '\n' && !content.includes('\n\n')) {
    return content
  }
  return content.trim().replace(MULTI_WS_REGEX, '\n')
}

export function timedeltaToSrtTimestamp(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const msecs = ms % 1000

  const hrs = Math.floor(totalSeconds / SECONDS_IN_HOUR)
  const mins = Math.floor((totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
  const secs = totalSeconds % SECONDS_IN_MINUTE

  const pad = (num: number, len = 2) => num.toString().padStart(len, '0')

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},${pad(msecs, 3)}`
}

function _shouldSkipSub(subtitle: Subtitle): void {
  for (const condition of SUBTITLE_SKIP_CONDITIONS) {
    if (condition.test(subtitle)) {
      throw new ShouldSkipError(condition.reason)
    }
  }
}

interface SortAndReindexOptions {
  startIndex?: number
  inPlace?: boolean
  skip?: boolean
}

export function sortAndReindex(
  subtitles: Subtitle[],
  { startIndex = 1, inPlace = false, skip = true }: SortAndReindexOptions = {},
): Subtitle[] {
  const sortedSubs = [...subtitles].sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start
    if (a.end !== b.end) return a.end - b.end
    return (a.index ?? 0) - (b.index ?? 0)
  })

  const result: Subtitle[] = []
  let skippedCount = 0

  for (let i = 0; i < sortedSubs.length; i++) {
    let subtitle = sortedSubs[i]
    const subNum = startIndex + i

    if (!inPlace) {
      subtitle = new Subtitle(
        subtitle.index,
        subtitle.start,
        subtitle.end,
        subtitle.content,
      )
    }

    if (skip) {
      try {
        _shouldSkipSub(subtitle)
      } catch (e) {
        if (e instanceof ShouldSkipError) {
          const idx =
            subtitle.index === null ? 'no index' : `index ${subtitle.index}`
          console.info(`Skipped subtitle with ${idx}: ${e.message}`)
          skippedCount++
          continue
        }
        throw e
      }
    }

    subtitle.index = subNum - skippedCount
    result.push(subtitle)
  }

  return result
}

interface ComposeOptions {
  reindex?: boolean
  startIndex?: number
  eol?: string
  inPlace?: boolean
}

export function compose(
  subtitles: Subtitle[],
  {
    reindex = true,
    startIndex = 1,
    eol = '\n',
    inPlace = false,
  }: ComposeOptions = {},
): string {
  let subsToProcess = subtitles

  if (reindex) {
    subsToProcess = sortAndReindex(subtitles, { startIndex, inPlace })
  }

  return subsToProcess.map((subtitle) => subtitle.toSrt(eol)).join('')
}
