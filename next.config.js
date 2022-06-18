/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')
const withImages = require('next-images')
const { withPlaiceholder } = require("@plaiceholder/next");
const nextConfig = {
  images: {

    domains: ['s2.loli.net',
              'link.jscdn.cn',
              'link.jscdn.cn/sharepoint',
              'i5jrjg.bn.files.1drv.com',
              'bn1304files.storage.live.com',
              'unpkg.com',
              'p1.music.126.net',
              'p2.music.126.net',
              'bkimg.cdn.bcebos.com',
              's1.ax1x.com'],

  },
  reactStrictMode:false,
  i18n: {
    locales: ['en', 'cn'],
    defaultLocale: 'cn',
  },
  experimental: { 
    nftTracing: true 
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      path:false,
      net:false,
    };

    return config;
  },
}


module.exports = withPlaiceholder(withImages(withVideos(nextConfig)))
