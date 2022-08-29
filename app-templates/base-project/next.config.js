/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@baseapp-frontend/core','@baseapp-frontend/design-system-mui'])

module.exports = withTM({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
})
