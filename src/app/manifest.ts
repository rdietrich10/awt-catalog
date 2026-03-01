import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AW Therapeutics | Advanced Therapeutics",
    short_name: "AW Therapeutics",
    description:
      "Medical Grade compounds for weight management, recovery, longevity, and hormonal health.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/brand/monogram-v1-white-on-black.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/brand/monogram-v1-white-on-black.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
