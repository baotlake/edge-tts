/**
 * This module contains functions to list all available voices and a class to find the
 * correct voice based on their attributes.
 */

import {
  SEC_MS_GEC_VERSION,
  VOICE_HEADERS,
  VOICE_LIST,
} from "./constants";
import { DRM } from "./drm";
import { Voice, VoicesManagerFind, VoicesManagerVoice } from "./typing";

// --- Private Helper Function ---

/**
 * A custom error class to handle HTTP responses that are not OK.
 * This helps in differentiating fetch errors from other exceptions.
 */
class HttpResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(`HTTP Error: ${response.status} ${response.statusText}`);
    this.name = "HttpResponseError";
    this.response = response;
  }
}

/**
 * Private function that makes the request to the voice list URL and parses the JSON response.
 * @private
 */
async function _listVoices(proxy?: string): Promise<Voice[]> {
  const url = new URL(VOICE_LIST);
  url.searchParams.append("Sec-MS-GEC", DRM.generateSecMsGec());
  url.searchParams.append("Sec-MS-GEC-Version", SEC_MS_GEC_VERSION);

  // Per instructions, prepend the proxy URL to the target URL.
  const finalUrl = proxy ? proxy + url.toString() : url.toString();

  const response = await fetch(finalUrl, {
    headers: VOICE_HEADERS,
  });

  if (!response.ok) {
    throw new HttpResponseError(response);
  }

  const data = (await response.json()) as Voice[];

  // Clean up whitespace from categories and personalities.
  return data.map((voice) => {
    voice.VoiceTag.ContentCategories = voice.VoiceTag.ContentCategories.map(
      (category) => category.trim() as typeof category
    );
    voice.VoiceTag.VoicePersonalities = voice.VoiceTag.VoicePersonalities.map(
      (personality) => personality.trim() as typeof personality
    );
    return voice;
  });
}

// --- Public API ---

/**
 * Lists all available voices and their attributes by fetching them from Microsoft's service.
 *
 * @param proxy Optional. The proxy server URL to use for the request.
 * @returns A promise that resolves to a list of voices and their attributes.
 */
export async function listVoices(proxy?: string): Promise<Voice[]> {
  try {
    return await _listVoices(proxy);
  } catch (error) {
    if (error instanceof HttpResponseError && error.response.status === 403) {
      // If we get a 403, it might be due to an expired token.
      // Handle the error (e.g., refresh token) and retry the request once.
      DRM.handleClientResponseError(error);
      return await _listVoices(proxy);
    }
    // For any other error, re-throw it.
    throw error;
  }
}

/**
 * A class to easily find voices based on their attributes.
 */
export class VoicesManager {
  public voices: VoicesManagerVoice[] = [];
  private calledCreate: boolean = false;

  // A private constructor ensures that instances are only created via the async `create` method.
  private constructor() {}

  /**
   * Asynchronously creates and initializes a VoicesManager instance.
   *
   * @param customVoices Optional. A pre-existing list of voices to use instead of fetching them.
   * @returns A promise that resolves to a fully initialized VoicesManager instance.
   */
  public static async create(
    customVoices?: Voice[]
  ): Promise<VoicesManager> {
    const manager = new VoicesManager();
    const voices = customVoices ?? (await listVoices());

    // Augment voice data with a top-level 'Language' property for easier filtering.
    manager.voices = voices.map((voice) => ({
      ...voice,
      Language: voice.Locale.split("-")[0] as string,
    }));

    manager.calledCreate = true;
    return manager;
  }

  /**
   * Finds all matching voices based on the provided filter attributes.
   *
   * @param filters An object containing the criteria to filter voices by (e.g., { Gender: 'Male', Language: 'en' }).
   * @returns A list of voices that match the criteria.
   */
  public find(filters: VoicesManagerFind): VoicesManagerVoice[] {
    if (!this.calledCreate) {
      throw new Error(
        "VoicesManager.find() was called before VoicesManager.create() completed."
      );
    }

    const filterEntries = Object.entries(filters);
    if (filterEntries.length === 0) {
      return this.voices; // Return all voices if no filters are provided.
    }

    return this.voices.filter((voice) => {
      // The voice is a match if it satisfies every provided filter criterion.
      return filterEntries.every(([key, value]) => {
        // Ensure we are comparing against properties that exist on the voice object.
        return voice[key as keyof VoicesManagerVoice] === value;
      });
    });
  }
}