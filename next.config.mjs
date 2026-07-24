/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export", // 👈 Tells Next.js to generate static HTML/CSS/JS files
  images: {
    unoptimized: true, // Required because standard Next images need a Node server
  },
};

export default nextConfig;