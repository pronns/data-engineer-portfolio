/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Keep resume links shared before the rename working
    return [
      {
        source: "/Pronnoy%20Dutta%20Resume.pdf",
        destination: "/Pronnoy_Dutta_Resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
