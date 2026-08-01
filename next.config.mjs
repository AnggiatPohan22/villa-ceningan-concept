import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const cmsImageOrigin = process.env.NEXT_PUBLIC_CMS_URL ? new URL(process.env.NEXT_PUBLIC_CMS_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: cmsImageOrigin
      ? [
          {
            protocol: cmsImageOrigin.protocol.replace(":", ""),
            hostname: cmsImageOrigin.hostname,
            port: cmsImageOrigin.port,
            pathname: "/**"
          }
        ]
      : []
  }
};

export default nextConfig;

initOpenNextCloudflareForDev();
