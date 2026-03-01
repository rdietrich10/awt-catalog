export interface CookiePreferences {
  essential: true;
  analytics: boolean;
}

const COOKIE_NAME = "aw_cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
};

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));

  if (!match) return null;

  try {
    const value = decodeURIComponent(match.split("=")[1]);
    const parsed = JSON.parse(value);
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return null;
  }
}

export function setCookiePreferences(prefs: CookiePreferences): void {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(prefs));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
}

export function hasConsentBeenGiven(): boolean {
  return getCookiePreferences() !== null;
}
