# 🎬 FlixBaba Clone — High-Speed Streaming Web App

A full-featured clone of [FlixBaba](https://flixbaba.com.lv/) built with **React + Vite** and powered by free **TMDB API** and free **video embed streams**.

---

## 📸 Screenshots & Showcase

- **Homepage**: Hero billboard carousel with match %, TMDB rating, age rating, and 4K badges.
- **Top 10 Section**: Giant stylized rank numbers (1 to 10) integrated with movie thumbnails.
- **Content Carousels**: Smooth scrolling rows for Trending Now, New Releases, and Binge-Worthy TV Series.
- **Embedded Video Player**:
  - **Server 1 (VidSrc Pro)** — 4K / 1080p
  - **Server 2 (VidSrc XYZ)** — Multi-Language Subtitles
  - **Server 3 (EmbedSu)** — Low Ads, High Speed
  - **Server 4 (VidLink)** — Fast Global CDN
  - **Server 5 (MultiEmbed)** — Mirror
  - **Server 6 (2Embed)** — Backup
  - Season & Episode switcher for TV shows
- **Instant Search**: Live search across movies and TV series.
- **Dedicated Pages**: `/movies`, `/tv`, `/trending`, `/top10`, `/faqs`, `/search`.

---

## 💰 How This Runs at Near-Zero Cost ($0 Hosting + ~$10/yr Domain)

| Service | Provider | Cost |
|---------|----------|------|
| **Hosting** | Cloudflare Pages or Vercel | **$0 / month** (Free tier) |
| **Movie Catalog** | The Movie Database (TMDB API) | **$0 / month** (Free API) |
| **Video Streams** | VidSrc / EmbedSu / VidLink / 2Embed | **$0 / month** (Embedded free mirrors) |
| **SSL & DDoS Protection** | Cloudflare | **$0 / month** (Free) |
| **Domain Name** | Porkbun / Namecheap | **~$10 - $12 / year** |
| **Total Cost** | | **~$1 / month** (Just domain amortized) |

---

## 🚀 Quick Start (Local Development)

```bash
# Navigate into the project
cd flixbaba

# Install dependencies (already installed)
npm install

# Start local development server
npm run dev
```

Visit: `http://localhost:5173/`

---

## 🌐 Deploy to Your Domain & Host for Free

### Option 1: Cloudflare Pages (Recommended - 100% Free, Unlimited Bandwidth)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "FlixBaba streaming app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/flixbaba.git
   git push -u origin main
   ```
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository.
4. Set build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click **Save and Deploy**.
6. **Add your custom domain**: Under the project's **Custom domains** tab, add your purchased domain (e.g. `yourmoviesite.com`). Cloudflare automatically provisions free SSL!

---

### Option 2: Vercel (1-Click Deployment)
1. Push to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect **Vite**.
5. Click **Deploy**.
6. Go to **Settings** → **Domains** to connect your domain.

---

### Option 3: Shared Web Hosting (cPanel / Apache / Hostinger / GoDaddy)
If you already bought a standard cPanel / shared web hosting plan:
1. Run the build command:
   ```bash
   npm run build
   ```
2. Open the created `dist/` folder.
3. Upload all files inside `dist/` directly to your server's `public_html/` via cPanel File Manager or FTP.
4. Ensure your server handles SPA routes with this simple `.htaccess` file inside `public_html/`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 🔑 TMDB API Key Setup (Optional)
A pre-configured demo key is included so the site works immediately.
To use your personal key:
1. Register for free at [themoviedb.org](https://www.themoviedb.org/signup).
2. Go to **Settings** → **API** → generate a free Developer Key.
3. Click the **Settings icon (⚙️)** in the FlixBaba header and paste your key.

---

## ⚠️ Legal Note
This project operates as a search index and embed player aggregator. It does not host video files on your server. Streaming third-party copyright content may carry legal restrictions in certain countries. Consider adding your DMCA takedown contact email in the footer.
