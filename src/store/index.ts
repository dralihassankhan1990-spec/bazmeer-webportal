import { create } from 'zustand';
import type { User, Seller, UserRole, Language, Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

// ─── AUTH STORE ────────────────────────────────────────────────────────────

interface AuthState {
  role: UserRole | null;
  isAuthenticated: boolean;
  user: User | null;
  seller: Seller | null;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const MOCK_USER: User = {
  id: 'u1', name: 'Usman Malik', phone: '0300-1234567',
  email: 'usman@example.com', city: 'Lahore', area: 'DHA Phase 5',
  initials: 'UM', memberSince: 'Jan 2025', totalBookings: 5, wallet: 1500,
};

const MOCK_SELLER: Seller = {
  id: 's1', name: 'Ahmed Ali Khan', phone: '0300-1234567',
  city: 'Lahore', area: 'DHA Phase 5', initials: 'AK',
  color: 'from-emerald-500 to-teal-600',
  bio: 'Experienced electrician with 10+ years.',
  categories: ['electrician'], subcategories: ['wiring', 'ups'],
  experience: 10, rating: 4.9, reviewCount: 127, jobsCompleted: 127,
  memberSince: 'Jan 2024', verificationTier: 3,
  badges: [
    { type: 'cnic', label: 'CNIC Verified', icon: '✅', color: 'text-emerald-700' },
    { type: 'bazmeer', label: 'BAZMEER Verified', icon: '🔵', color: 'text-blue-700' },
    { type: 'police', label: 'Police Verified', icon: '🛡️', color: 'text-indigo-700' },
  ],
  isOnline: true, responseTime: 'Usually within 30 min',
  startingPrice: 500, portfolio: [], areasServed: ['DHA', 'Gulberg', 'Cantt'],
  isAvailableNow: true,
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  isAuthenticated: false,
  user: null,
  seller: null,

  login: (role) => set({
    role,
    isAuthenticated: true,
    user: role === 'user' ? MOCK_USER : null,
    seller: role === 'seller' ? MOCK_SELLER : null,
  }),

  logout: () => set({ role: null, isAuthenticated: false, user: null, seller: null }),

  switchRole: (role) => set({
    role,
    isAuthenticated: true,
    user: role === 'user' ? MOCK_USER : null,
    seller: role === 'seller' ? MOCK_SELLER : null,
  }),
}));

// ─── LOCATION STORE ────────────────────────────────────────────────────────

interface LocationState {
  selectedCity: string;
  selectedArea: string;
  userCoords: { lat: number; lng: number } | null;
  isLocating: boolean;
  setCity: (city: string) => void;
  setArea: (area: string) => void;
  detectLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedCity: 'Lahore',
  selectedArea: '',
  userCoords: null,
  isLocating: false,

  setCity: (city) => set({ selectedCity: city, selectedArea: '' }),
  setArea: (area) => set({ selectedArea: area }),

  detectLocation: () => {
    set({ isLocating: true });
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => set({ userCoords: { lat: pos.coords.latitude, lng: pos.coords.longitude }, isLocating: false }),
        () => set({ isLocating: false }),
        { timeout: 8000 }
      );
    } else {
      set({ isLocating: false });
    }
  },
}));

// ─── UI STORE ──────────────────────────────────────────────────────────────

interface UIState {
  language: Language;
  isRTL: boolean;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  activeModal: string | null;
  setLanguage: (lang: Language) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  language: 'en',
  isRTL: false,
  sidebarOpen: true,
  mobileMenuOpen: false,
  activeModal: null,

  setLanguage: (lang) => {
    set({ language: lang, isRTL: lang === 'ur' });
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  },

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));

// ─── NOTIFICATION STORE ────────────────────────────────────────────────────

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Notification) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length,

  addNotification: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    })),

  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
}));

// ─── SEARCH STORE ──────────────────────────────────────────────────────────

interface SearchState {
  query: string;
  selectedCategory: string;
  selectedSubcategory: string;
  sortBy: 'rating' | 'distance' | 'price' | 'newest';
  filterVerified: boolean;
  filterFemale: boolean;
  filterAvailable: boolean;
  minRating: number;
  setQuery: (q: string) => void;
  setCategory: (cat: string) => void;
  setSubcategory: (sub: string) => void;
  setSortBy: (sort: 'rating' | 'distance' | 'price' | 'newest') => void;
  setFilter: (key: 'filterVerified' | 'filterFemale' | 'filterAvailable', val: boolean) => void;
  setMinRating: (r: number) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  selectedCategory: '',
  selectedSubcategory: '',
  sortBy: 'rating',
  filterVerified: false,
  filterFemale: false,
  filterAvailable: false,
  minRating: 0,

  setQuery: (query) => set({ query }),
  setCategory: (selectedCategory) => set({ selectedCategory, selectedSubcategory: '' }),
  setSubcategory: (selectedSubcategory) => set({ selectedSubcategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFilter: (key, val) => set({ [key]: val }),
  setMinRating: (minRating) => set({ minRating }),
  reset: () => set({ query: '', selectedCategory: '', selectedSubcategory: '', sortBy: 'rating', filterVerified: false, filterFemale: false, filterAvailable: false, minRating: 0 }),
}));
