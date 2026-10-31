# AmmoBrowser - Complete Documentation

## 🚀 Quick Start

### 1. Setup (First Time)
```bash
# Install dependencies
npm install

# Create environment file
cp env.example .env

# Update .env with your values:
# - VITE_GOOGLE_LOGIN_CLIENT_ID
# - VITE_SITE_URL (your domain)
```

### 2. Development
```bash
npm run dev              # Start SSR server (http://localhost:5173)
npm run dev:client       # Client-only (no SSR, if needed)
```

### 3. Production
```bash
npm run build            # Build everything (client + server + sitemap)
npm run preview          # Test production build locally
```

---

## 📚 Table of Contents

- [What's Included](#whats-included)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [SSR Architecture](#ssr-architecture)
- [Sitemap & SEO](#sitemap--seo)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## ✨ What's Included

### React 19 SSR
- **Server-Side Rendering** with Express
- **App Shell Pattern** - Fast initial load with smooth loader
- **SEO-Friendly** - Pre-rendered HTML structure
- **No Hydration Issues** - Uses `createRoot` for clean client rendering

### Sitemap System
- **Auto-Generated** - Runs on every build
- **9 Static Routes** - All public pages included
- **Dynamic Routes Ready** - Can add product pages
- **robots.txt** - Proper crawler instructions

### Modern Stack
- React 19 + Vite
- Express.js server
- React Router v7
- Redux Toolkit + TanStack Query
- Tailwind CSS

---

## ⚙️ Environment Setup

### Required Variables

Create `.env` file:

```env
# API
VITE_API_URL=https://api.yourdomain.com/api
VITE_API_BASE_URL=https://api.yourdomain.com

# Google OAuth
VITE_GOOGLE_LOGIN_CLIENT_ID=your_google_client_id

# Site
VITE_SITE_URL=https://www.yourdomain.com

# Server
NODE_ENV=development
PORT=5173
```

### Update Sitemap URL

In `scripts/generate-sitemap-ssr.js`, update:
```javascript
const WEBSITE_URL = process.env.VITE_SITE_URL || 'https://www.yourdomain.com';
```

Or just set `VITE_SITE_URL` in `.env` (recommended).

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | **Start SSR dev server** (port 5173) |
| `npm run dev:client` | Client-only dev (no SSR) |
| `npm run build` | **Full production build** |
| `npm run build:client` | Build client bundle only |
| `npm run build:server` | Build server bundle only |
| `npm run preview` | Preview production build |
| `npm run generate-sitemap` | Manually generate sitemap |
| `npm run lint` | Run ESLint |

---

## 🏗️ SSR Architecture

### How It Works

```
1. Server (Express)
   ├── Serves HTML shell
   ├── Injects loader overlay
   └── Serves sitemap.xml & robots.txt

2. Client (React)
   ├── Sees loader immediately
   ├── Downloads React bundle
   ├── Renders app (createRoot)
   └── Loader slides up when ready
```

### Key Files

- `server.js` - Express server for SSR
- `src/entry-server.jsx` - Server entry (returns loader HTML)
- `src/entry-client.jsx` - Client entry (renders React app)
- `public/loader.css` - Loader styles

### Why This Approach?

- ✅ **No Hydration Errors** - Empty server HTML, client renders fresh
- ✅ **Fast Initial Load** - Loader shows instantly
- ✅ **SEO Benefits** - HTML structure + meta tags
- ✅ **Router Compatible** - Works with React Router v7
- ✅ **Simple** - Easier than full SSR

---

## 🎯 Sitemap & SEO

### Sitemap Features

- **Auto-generated** on build
- **9 static routes** included
- **Served** at `/sitemap.xml`
- **Extended schema** support

### Routes Included

```
/ (home)
/ammo
/contact
/faq
/wishlist
/privacy
/cookies
/terms-and-condition
```

### Add Dynamic Product Pages

Edit `scripts/generate-sitemap-ssr.js`:

```javascript
const fetchDynamicRoutes = async () => {
  const apiUrl = process.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/products`);
  const products = await response.json();
  
  return products.map(product => ({
    path: `/product-details/${product.id}`,
    lastmod: product.updated_at,
    changefreq: 'weekly',
    priority: '0.8'
  }));
};
```

Then uncomment the function call in the script.

### Verify Sitemap

After deployment:
1. Visit `https://yourdomain.com/sitemap.xml`
2. Submit to [Google Search Console](https://search.google.com/search-console)
3. Submit to [Bing Webmaster](https://www.bing.com/webmasters)

---

## 🚀 Deployment

### Option 1: PM2 (Recommended)

```bash
# Build
npm run build

# Install PM2
npm install -g pm2

# Start
pm2 start server.js --name ammobrowser

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Option 2: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist
COPY public ./public
COPY server.js ./
EXPOSE 5173
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

```bash
docker build -t ammobrowser .
docker run -p 3000:5173 ammobrowser
```

### Option 3: Direct Node

```bash
npm run build
NODE_ENV=production PORT=3000 node server.js
```

### Deploy Checklist

- [ ] Update `.env` with production values
- [ ] Update `VITE_SITE_URL` in sitemap script
- [ ] Run `npm run build`
- [ ] Upload `dist/`, `public/`, `server.js`, `package.json`
- [ ] Install dependencies: `npm ci --production`
- [ ] Start server
- [ ] Verify sitemap: `/sitemap.xml`
- [ ] Submit sitemap to search engines

---

## 🔧 Troubleshooting

### "operation not permitted, open '.env'"

**Solution**: Create the `.env` file first
```bash
cp env.example .env
```

### Port Already in Use

**Solution**: Change port in `.env` or:
```bash
PORT=3000 npm run dev
```

### Loader Not Disappearing

**Cause**: JavaScript error preventing app load

**Solution**: 
1. Check browser console for errors
2. The loader auto-removes after 5 seconds anyway

### Sitemap Not Found

**Solution**: Generate it
```bash
npm run generate-sitemap
```

### Build Errors

**Solution**: Clean rebuild
```bash
rm -rf dist/ node_modules/.vite/
npm install
npm run build
```

### React Router Errors

✅ **Fixed** - Using simplified SSR approach. If issues persist, use:
```bash
npm run dev:client  # Client-only mode
```

---

## 📁 Project Structure

```
ammo_react_frontend/
├── server.js                 # Express SSR server
├── vite.config.js           # Vite + SSR config
├── package.json             # Scripts & dependencies
├── public/                  # Static assets
│   ├── sitemap.xml         # Auto-generated
│   ├── robots.txt          # Crawler instructions
│   └── loader.css          # Loader styles
├── src/
│   ├── entry-client.jsx    # Client entry
│   ├── entry-server.jsx    # Server entry
│   ├── App.jsx             # Main app
│   ├── router/router.jsx   # Routes
│   ├── pages/              # Page components
│   └── components/         # Reusable components
├── scripts/
│   └── generate-sitemap-ssr.js  # Sitemap generator
└── dist/                   # Build output (after build)
    ├── client/             # Client bundle
    └── server/             # Server bundle
```

---

## 🎨 Customization

### Change Loader

Edit `public/loader.css` to customize:
- Background color
- Spinner size/color
- Animation speed
- Slide direction

### Add Routes

1. Add to `src/router/router.jsx`
2. Add to `scripts/generate-sitemap-ssr.js`
3. Regenerate sitemap: `npm run generate-sitemap`

### Update SEO

Edit `src/config/seo.config.js` for meta tags and SEO settings.

---

## 📊 Performance

Expected metrics with SSR:
- **TTFB**: < 600ms
- **FCP**: < 1.8s
- **LCP**: < 2.5s
- **Lighthouse SEO**: 95+

---

## 🆘 Getting Help

1. Check this documentation
2. Review console errors
3. Try `npm run dev:client` for client-only mode
4. Check that `.env` file exists

---

## 📄 License

Proprietary software.

---

**Built with React 19 SSR + Vite + Express**

*Last Updated: January 2026*

