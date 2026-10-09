import { ogAlt, ogCard } from "../og-card";

export const alt = ogAlt("en");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard("en");
}
