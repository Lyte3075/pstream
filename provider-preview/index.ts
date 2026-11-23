/* Preview-only compatibility shim.
 * The upstream provider package is unavailable, so this package intentionally
 * exposes types/API shapes without implementing any scraping or playback.
 */
export type ScrapeMedia = any;
export type Stream = any;
export type RunOutput = any;
export type MetaOutput = any;
export type EmbedOutput = any;
export type SourcererOutput = any;

export type FullScraperEvents = {
  init?: (event: any) => void;
  start?: (event: any) => void;
  update?: (event: any) => void;
  discoverEmbeds?: (event: any) => void;
};

export type Fetcher = (...args: any[]) => Promise<any>;

export interface ProviderControls {
  runAll: (options: any) => Promise<RunOutput | null>;
  runSourceScraper: (options: any) => Promise<SourcererOutput>;
  runEmbedScraper: (options: any) => Promise<EmbedOutput>;
  listSources: () => MetaOutput[];
}

export class NotFoundError extends Error {
  constructor(message = "No streaming providers are available in this frontend-only preview.") {
    super(message);
    this.name = "NotFoundError";
  }
}

const previewUnavailable = async (): Promise<never> => {
  throw new Error(
    "Streaming is disabled in this frontend-only preview. A separately configured, authorized provider/backend is required.",
  );
};

export function makeProviders(_options: any): ProviderControls {
  return {
    listSources: () => [],
    runAll: previewUnavailable,
    runSourceScraper: previewUnavailable,
    runEmbedScraper: previewUnavailable,
  };
}

export function makeStandardFetcher(_fetch: typeof fetch): Fetcher {
  return async (..._args: any[]) => {
    throw new Error("Provider fetching is disabled in preview mode.");
  };
}

export function makeSimpleProxyFetcher(
  _proxyUrl: string,
  _fetcher?: (...args: any[]) => Promise<any>,
): Fetcher {
  return async (..._args: any[]) => {
    throw new Error("Provider fetching is disabled in preview mode.");
  };
}

export function setM3U8ProxyUrl(_url: string): void {
  // Intentionally disabled in preview mode.
}

export const targets = {
  NATIVE: "native",
  BROWSER_EXTENSION: "browser-extension",
  BROWSER: "browser",
} as const;

/**
 * Minimal language-label conversion used by the subtitle UI.
 * This is local formatting support only, not a streaming provider.
 */
const languageCodes: Record<string, string> = {
  arabic: "ar",
  chinese: "zh",
  czech: "cs",
  danish: "da",
  dutch: "nl",
  english: "en",
  finnish: "fi",
  french: "fr",
  german: "de",
  greek: "el",
  hebrew: "he",
  hindi: "hi",
  hungarian: "hu",
  indonesian: "id",
  italian: "it",
  japanese: "ja",
  korean: "ko",
  norwegian: "no",
  polish: "pl",
  portuguese: "pt",
  romanian: "ro",
  russian: "ru",
  spanish: "es",
  swedish: "sv",
  thai: "th",
  turkish: "tr",
  ukrainian: "uk",
  vietnamese: "vi",
};

export function labelToLanguageCode(label: string): string | undefined {
  const normalized = label.trim().toLowerCase().replace(/\\s*\\([^)]*\\)$/, "");
  if (/^[a-z]{2,3}(-[a-z]{2})?$/i.test(normalized)) {
    return normalized.slice(0, 2).toLowerCase();
  }
  return languageCodes[normalized];
}

export const Qualities = {
  UNKNOWN: "unknown",
  P360: "360",
  P480: "480",
  P720: "720",
  P1080: "1080",
  P4K: "4k",
} as const;
