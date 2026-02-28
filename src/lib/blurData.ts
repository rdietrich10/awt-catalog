import { BLUR_DATA } from "@/data/blurPlaceholders";

/**
 * Returns the base64 blur data URL for an image path, or undefined if not found.
 * Image paths should match the public-relative format, e.g. "/images/products/semaglutide.png"
 */
export function getBlurDataURL(imagePath: string): string | undefined {
  return BLUR_DATA.get(imagePath);
}
