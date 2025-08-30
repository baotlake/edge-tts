# edge-tts.js

`edge-tts.js` is a Node.js module that lets you use Microsoft Edge's online text-to-speech service. You can use it in your JavaScript code or via the provided `edge-tts.js` command-line tool.

---

## Installation

To install the package, run one of the following commands:

```bash
$ npm install edge-tts.js
```

Or, to use it as a command-line tool without a local installation, you can use `npx`:

```bash
$ npx edge-tts.js
```

---

## Usage

### Basic Usage

```bash
$ npm i edge-tts.js
```

```TypeScript
import { listVoices, Communicate } from 'edge-tts.js'

// List available voices
const voices = await listVoices()
console.log('Available voices:', voices)

// Create a new Communicate instance
const communicate = new Communicate("即使才能不足，但只要有热情，孜孜以求，成绩可以不亚于人。", "zh-CN-XiaoxiaoNeural")
await communicate.save("hello.mp3")
```

▶️ Streaming Audio Example
[Online Playground](https://observablehq.com/d/ac6a8b2979f1d3b6)


To use the `edge-tts.js` command, simply run it with your desired text.

```bash
$ npx edge-tts.js --text "Hello, world!" --write-media hello.mp3 --write-subtitles hello.srt
```

### Changing the Voice

You can change the voice for the text-to-speech service using the `--voice` option. To see a list of all available voices, use the `--list-voices` option.

```bash
$ npx edge-tts.js --list-voices
```

This will output a list of voices similar to this:

```
┌───────────────────────────────────┬────────┬───────────────────────┬────────────────────────────────────────┐
│ Name                              │ Gender │ ContentCategories     │ VoicePersonalities                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ af-ZA-AdriNeural                  │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ az-AZ-BanuNeural                  │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ bg-BG-BorislavNeural              │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ bn-IN-TanishaaNeural              │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ bs-BA-GoranNeural                 │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ ca-ES-EnricNeural                 │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ cs-CZ-AntoninNeural               │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ cy-GB-NiaNeural                   │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ da-DK-ChristelNeural              │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ de-AT-IngridNeural                │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ el-GR-AthinaNeural                │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-AU-WilliamMultilingualNeural   │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-CA-ClaraNeural                 │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-CA-LiamNeural                  │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-GB-LibbyNeural                 │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-GB-RyanNeural                  │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-GB-SoniaNeural                 │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-GB-ThomasNeural                │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-SG-LunaNeural                  │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-SG-WayneNeural                 │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-TZ-ImaniNeural                 │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-AnaNeural                   │ Female │ Cartoon, Conversation │ Cute                                   │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-AndrewMultilingualNeural    │ Male   │ Conversation, Copilot │ Warm, Confident, Authentic, Honest     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-AndrewNeural                │ Male   │ Conversation, Copilot │ Warm, Confident, Authentic, Honest     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-AriaNeural                  │ Female │ News, Novel           │ Positive, Confident                    │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-AvaMultilingualNeural       │ Female │ Conversation, Copilot │ Expressive, Caring, Pleasant, Friendly │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-AvaNeural                   │ Female │ Conversation, Copilot │ Expressive, Caring, Pleasant, Friendly │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-BrianMultilingualNeural     │ Male   │ Conversation, Copilot │ Approachable, Casual, Sincere          │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-BrianNeural                 │ Male   │ Conversation, Copilot │ Approachable, Casual, Sincere          │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-ChristopherNeural           │ Male   │ News, Novel           │ Reliable, Authority                    │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-EmmaMultilingualNeural      │ Female │ Conversation, Copilot │ Cheerful, Clear, Conversational        │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-EmmaNeural                  │ Female │ Conversation, Copilot │ Cheerful, Clear, Conversational        │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-EricNeural                  │ Male   │ News, Novel           │ Rational                               │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-GuyNeural                   │ Male   │ News, Novel           │ Passion                                │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-JennyNeural                 │ Female │ General               │ Friendly, Considerate, Comfort         │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-MichelleNeural              │ Female │ News, Novel           │ Friendly, Pleasant                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-RogerNeural                 │ Male   │ News, Novel           │ Lively                                 │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ en-US-SteffanNeural               │ Male   │ News, Novel           │ Rational                               │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ es-PA-RobertoNeural               │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ es-UY-ValentinaNeural             │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ es-VE-PaolaNeural                 │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ et-EE-KertNeural                  │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ fa-IR-DilaraNeural                │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ fi-FI-HarriNeural                 │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ fil-PH-AngeloNeural               │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ fr-BE-CharlineNeural              │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ fr-FR-EloiseNeural                │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ fr-FR-RemyMultilingualNeural      │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ fr-FR-VivienneMultilingualNeural  │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ ga-IE-ColmNeural                  │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ ga-IE-OrlaNeural                  │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ gl-ES-RoiNeural                   │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ ...                               │ ...    │ ...                   │ ...                                    │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ ...                               │ ...    │ ...                   │ ...                                    │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-liaoning-XiaobeiNeural      │ Female │ Dialect               │ Humorous                               │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-shaanxi-XiaoniNeural        │ Female │ Dialect               │ Bright                                 │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-XiaoxiaoNeural              │ Female │ News, Novel           │ Warm                                   │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-XiaoyiNeural                │ Female │ Cartoon, Novel        │ Lively                                 │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-YunjianNeural               │ Male   │ Sports, Novel         │ Passion                                │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-YunxiaNeural                │ Male   │ Cartoon, Novel        │ Cute                                   │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-YunxiNeural                 │ Male   │ Novel                 │ Lively, Sunshine                       │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-CN-YunyangNeural               │ Male   │ News                  │ Professional, Reliable                 │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-HK-HiuGaaiNeural               │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-HK-HiuMaanNeural               │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-HK-WanLungNeural               │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-TW-HsiaoChenNeural             │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-TW-HsiaoYuNeural               │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zh-TW-YunJheNeural                │ Male   │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zu-ZA-ThandoNeural                │ Female │ General               │ Friendly, Positive                     │
├───────────────────────────────────┼────────┼───────────────────────┼────────────────────────────────────────┤
│ zu-ZA-ThembaNeural                │ Male   │ General               │ Friendly, Positive                     │
└───────────────────────────────────┴────────┴───────────────────────┴────────────────────────────────────────┘
```

To specify a voice, use the `--voice` flag:

```bash
$ npx edge-tts.js --voice ar-EG-SalmaNeural --text "مرحبا كيف حالك؟" --write-media hello_in_arabic.mp3 --write-subtitles hello_in_arabic.srt
```

### Custom SSML

`edge-tts.js` supports custom SSML, but it's important to note that Microsoft's service has limitations. It only allows a single `<voice>` tag with a single `<prosody>` tag inside. Any customization options that can be used within the `<prosody>` tag are already available through the library or command-line options.

### Adjusting Rate, Volume, and Pitch

You can control the rate, volume, and pitch of the generated speech with the `--rate`, `--volume`, and `--pitch` options. When using a negative value, you need to use the format `--[option]=-50%` to prevent the option from being interpreted as a separate argument.

```bash
$ npx edge-tts.js --rate=-50% --text "Hello, world!" --write-media hello_rate.mp3
$ npx edge-tts.js --volume=-50% --text "Hello, world!" --write-media hello_volume.mp3
$ npx edge-tts.js --pitch=-50Hz --text "Hello, world!" --write-media hello_pitch.mp3
```

---

## JavaScript Module

You can also use the `edge-tts.js` module directly within your JavaScript code. 
For usage examples, check out the following link: [example code link](https://observablehq.com/d/ac6a8b2979f1d3b6)
