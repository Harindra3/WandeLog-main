# WanderLog 🌍

> Your Travel Bucket List, Powered by Real-World Data

A single-page React application where authenticated users explore countries, search and filter them, view rich details, and build a personal travel bucket list.

🌐 Deployed Application

https://wanderlog-siddharth.vercel.app

## 🚀 How to Run Locally

```bash
# Clone and install
git clone <your-repo-url>
cd WanderLog
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Test Credentials

Use the Reqres mock auth API with these credentials:

- **Email:** `eve.holt@reqres.in`
- **Password:** `cityslicka` (any password works)

> Note: Reqres only accepts a [fixed set of test emails](https://reqres.in/). Other emails will return an error — this is handled gracefully in the UI.

## 🏗️ Tech Stack

- **React 18** (JSX, no TypeScript) + **Vite**
- **React Router v6** — protected routes, nested layouts
- **Plain CSS** with CSS variables (no Tailwind)
- **REST Countries API** — `https://restcountries.com/v3.1`
- **Reqres.in** — mock authentication

## ✨ Features

1. **Authentication** — Login + Signup with real API calls to Reqres.in
2. **Protected Routes** — Unauthenticated users redirected to `/login`
3. **Session Persistence** — Token stored in `localStorage`, survives refresh
4. **API Fetching** — ~250 countries from REST Countries with loading skeletons and error states
5. **Country Detail** — Flag, stats grid, neighbouring countries chips
6. **Bucket List & Visited** — Per-user lists persisted in `localStorage`, world-coverage stat
7. **Search + Filter + Sort** — By name/capital, region filter, and sort by name/population/area
8. **Responsive Layout** — Works on desktop (mobile optimization possible)

## 🔮 What I'd Improve With More Time

- Add a map view using Leaflet to visualise bucket list countries geographically
- Implement drag-to-reorder bucket list with native HTML5 drag events
- Add dark mode toggle persisted in `localStorage`
- Add optimistic UI updates and better error retry logic
- Build a "World Coverage" dashboard with charts (population %, continents visited)


