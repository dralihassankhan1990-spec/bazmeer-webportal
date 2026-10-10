# BAZMEER — Frontend React App

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:5173
```

## 🔑 Demo Login

After running, go to `/login` and click "Sign In" with any credentials to log in as:
- **Customer (User)** → sees user dashboard, post jobs, bookings
- **Worker (Seller)** → sees seller dashboard, job feed, bidding
- **Admin** → sees admin panel, verification queue, analytics

## 📁 Project Structure

```
src/
├── App.tsx                    # All 54 routes defined
├── main.tsx                   # Entry point
├── components/
│   ├── layout/               # PublicLayout, UserLayout, SellerLayout, AdminLayout
│   ├── search/               # ProviderCard, SearchBar
│   └── common/               # PageHeader, EmptyState
├── pages/
│   ├── public/               # HomePage, SearchResults, Nearby, ProviderProfile, etc.
│   ├── auth/                 # Login, Register
│   ├── user/                 # All 15 user screens
│   ├── seller/               # All 16 seller screens
│   └── admin/                # All 9 admin screens
├── store/                    # Zustand: auth, location, ui, notifications, search
├── data/mockData.ts           # All mock data — no backend needed
└── types/index.ts             # TypeScript interfaces
```

## ⚡ Features Built

### Feature 1: Search & Contact
- Homepage search bar with city selector
- "Near Me" GPS-based nearby search
- Search results with filters (verified, available, female, rating)
- Sort by: Rating / Distance / Price / Newest
- Provider profiles with badges, reviews, gigs

### Feature 2: Post Job & Bidding  
- 4-step job posting wizard
- Real-time bid display (mocked)
- Accept bid with payment method selection (JazzCash/EasyPaisa/Card)
- Counter-offer system
- Escrow payment flow

### All 3 Portals
- **User Portal**: Dashboard, Search, Post Job, Bookings, Chat, Wallet, Notifications
- **Seller Portal**: Dashboard, Job Feed, Bids, Orders, Gigs, Earnings, Documents, Subscription
- **Admin Portal**: Dashboard, Users, Sellers, Verification Queue, Disputes, Analytics

## 🔌 Adding a Backend

All API calls are currently mocked via `src/data/mockData.ts`. To connect a real backend:

1. Create `src/services/api.ts` with Axios instance
2. Replace `MOCK_JOBS`, `MOCK_BIDS`, etc. with actual API calls
3. Add JWT auth in Axios interceptors (see Frontend Plan document)
4. Connect Socket.io for real-time bids and chat

## 📱 Mobile

The app is fully mobile-responsive with bottom navigation for User and Seller portals.

## 🌐 Urdu/RTL

Toggle language in Profile → Language → اردو. Uses `react-i18next` (strings pending).

---
Built with: React 18 + TypeScript + Vite + Tailwind CSS + Zustand + React Router v6

---
By **Muhammad Bilal**
