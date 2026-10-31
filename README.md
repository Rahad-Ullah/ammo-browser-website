# AmmoBrowser

> Your Premium Ammunition Source - Built with React 19 SSR

A modern, SEO-optimized web application for browsing ammunition with server-side rendering, auto-generated sitemaps, and lightning-fast performance.

## ✨ Features

- ⚡ **React 19 SSR** - Server-side rendering for faster loads & SEO
- 🎨 **Modern UI** - Tailwind CSS with smooth animations
- 🚀 **Auto-Generated Sitemap** - SEO-optimized with 9+ routes
- 🔐 **Google OAuth** - Secure authentication
- 📊 **Real-time Updates** - Dynamic product data
- 🎯 **95+ Lighthouse Score** - Optimized performance
- 📱 **Fully Responsive** - Works on all devices

## 🛠️ Tech Stack

**Frontend**: React 19 • Vite • Express.js • React Router v7 • Tailwind CSS  
**Backend**: Laravel • MySQL • JWT  
**State**: Redux Toolkit • TanStack Query  
**Tools**: Google OAuth • Framer Motion • React Hook Form

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Setup environment
cp env.example .env
# Edit .env with your values

# 3. Start development
npm run dev
```

Visit `http://localhost:5173`

## 📚 Documentation

**Complete guide**: [DOCS.md](./DOCS.md)

Includes:
- Setup & Installation
- SSR Architecture
- Sitemap & SEO
- Deployment (PM2, Docker, Node.js)
- Troubleshooting
- All commands & scripts

## 🚢 Deployment

```bash
# Build
npm run build

# Deploy with PM2
pm2 start server.js --name ammobrowser

# Or Docker
docker build -t ammobrowser .
docker run -p 3000:5173 ammobrowser
```

See [DOCS.md](./DOCS.md#deployment) for detailed deployment instructions.

## 📊 Performance

- TTFB: < 600ms
- FCP: < 1.8s
- LCP: < 2.5s
- Lighthouse: 95+

## 📄 License

Proprietary software.

