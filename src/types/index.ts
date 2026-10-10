// ─── AUTH & USER ───────────────────────────────────────────────────────────

export type UserRole = 'user' | 'seller' | 'admin';
export type Language = 'en' | 'ur';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  area?: string;
  avatar?: string;
  initials: string;
  memberSince: string;
  totalBookings: number;
  wallet: number;
}

// ─── SELLER ────────────────────────────────────────────────────────────────

export type VerificationTier = 0 | 1 | 2 | 3 | 4;
export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface VerificationBadge {
  type: 'phone' | 'cnic' | 'bazmeer' | 'police' | 'certified';
  label: string;
  icon: string;
  color: string;
}

export interface Seller {
  id: string;
  name: string;
  phone: string;
  city: string;
  area: string;
  avatar?: string;
  initials: string;
  color: string; // gradient color for avatar
  bio: string;
  categories: string[];
  subcategories: string[];
  experience: number; // years
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  memberSince: string;
  verificationTier: VerificationTier;
  badges: VerificationBadge[];
  isOnline: boolean;
  responseTime: string; // e.g. "Usually within 30 min"
  startingPrice: number; // PKR
  portfolio: string[]; // photo URLs (will be placeholders)
  areasServed: string[];
  isAvailableNow: boolean;
  distance?: number; // km (only in nearby mode)
  lat?: number;
  lng?: number;
}

// ─── CATEGORY ──────────────────────────────────────────────────────────────

export interface Subcategory {
  slug: string;
  name: string;
  nameUr?: string;
}

export interface Category {
  slug: string;
  name: string;
  nameUr: string;
  icon: string;
  color: string;
  bgColor: string;
  workerCount: number;
  subcategories: Subcategory[];
  isHot?: boolean;
}

// ─── JOB / BIDDING ─────────────────────────────────────────────────────────

export type JobStatus = 'open' | 'reviewing' | 'in_progress' | 'completed' | 'cancelled';
export type BookingMode = 'instant' | 'bidding';
export type WorkType = 'one_time' | 'daily' | 'weekly' | 'monthly';
export type BidDuration = '2h' | '6h' | '24h' | '3d';
export type BidStatus = 'pending' | 'accepted' | 'rejected' | 'countered' | 'expired';

export interface Job {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  photos: string[];
  city: string;
  area: string;
  budgetMin: number;
  budgetMax: number;
  preferredTime: string;
  workType: WorkType;
  bidDuration: BidDuration;
  status: JobStatus;
  postedAt: string;
  expiresAt: string;
  bidCount: number;
  userId: string;
}

export interface Bid {
  id: string;
  jobId: string;
  seller: Seller;
  amount: number;
  counterAmount?: number;
  message: string;
  estimatedTime: string;
  availability: string;
  portfolioPhoto?: string;
  status: BidStatus;
  submittedAt: string;
  isLowestBid?: boolean;
  isBestMatch?: boolean;
}

// ─── BOOKING ───────────────────────────────────────────────────────────────

export type BookingStatus = 'confirmed' | 'en_route' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';

export interface Booking {
  id: string;
  jobTitle: string;
  category: string;
  seller: Seller;
  user: User;
  amount: number;
  commission: number;
  sellerEarns: number;
  status: BookingStatus;
  scheduledAt: string;
  completedAt?: string;
  city: string;
  area: string;
  isEscrowHeld: boolean;
  isReviewed: boolean;
}

// ─── REVIEW ────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  sellerId: string;
  userId: string;
  userName: string;
  userInitials: string;
  rating: number;
  comment: string;
  category: string;
  date: string;
  isVerified: boolean;
  sellerResponse?: string;
}

// ─── CHAT ──────────────────────────────────────────────────────────────────

export type MessageType = 'text' | 'photo' | 'system';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'user' | 'seller';
  type: MessageType;
  content: string;
  sentAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  otherPartyId: string;
  otherPartyName: string;
  otherPartyInitials: string;
  otherPartyColor: string;
  otherPartyRole: 'user' | 'seller';
  jobTitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isOnline: boolean;
}

// ─── GIG ───────────────────────────────────────────────────────────────────

export interface GigPackage {
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  description: string;
  includes: string[];
  duration: string;
}

export interface Gig {
  id: string;
  sellerId: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  packages: GigPackage[];
  gallery: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  ordersCount: number;
  rating: number;
}

// ─── NOTIFICATION ──────────────────────────────────────────────────────────

export type NotificationType = 'new_bid' | 'bid_accepted' | 'bid_rejected' | 'message' | 'payment' | 'review' | 'job_update' | 'promo';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// ─── ADMIN ─────────────────────────────────────────────────────────────────

export interface PlatformStats {
  totalUsers: number;
  activeSellers: number;
  openJobs: number;
  todayBookings: number;
  todayGMV: number;
  pendingVerifications: number;
  openDisputes: number;
  platformRevenue: number;
  // trends (% vs yesterday)
  usersTrend: number;
  sellersTrend: number;
  bookingsTrend: number;
  gmvTrend: number;
}

export interface SellerVerificationItem {
  id: string;
  name: string;
  phone: string;
  city: string;
  category: string;
  submittedAt: string;
  daysWaiting: number;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
}
