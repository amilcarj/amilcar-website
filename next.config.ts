import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      { destination: "/", permanent: true, source: "/home" },
      {
        destination: "/Amilcar%20Javier%20Resume.pdf",
        permanent: true,
        source: "/s/Amilcar-Javier-Film-Television-Theater-Resume.pdf",
      },
      {
        destination: "/gallery",
        permanent: true,
        source: "/s/Amilcar-Javier-2.jpg",
      },
    ];
  },
};

export default nextConfig;
