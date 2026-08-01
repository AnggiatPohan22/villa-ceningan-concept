import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

function getCmsImageOrigin() {
  if (!process.env.NEXT_PUBLIC_CMS_URL) {
    return null;
  }

  try {
    return new URL(process.env.NEXT_PUBLIC_CMS_URL);
  } catch {
    return null;
  }
}

const cmsImageOrigin = getCmsImageOrigin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/api/media/file/**",
      },
      ...(cmsImageOrigin
        ? [
            {
              protocol: cmsImageOrigin.protocol.replace(":", ""),
              hostname: cmsImageOrigin.hostname,
              port: cmsImageOrigin.port,
              pathname: "/api/media/file/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
