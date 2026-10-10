import type { Category, Seller, Job, Bid, Booking, Review, Conversation, Message, Notification, PlatformStats, SellerVerificationItem, Gig } from '../types';

// ─── CATEGORIES ────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { slug: 'electrician', name: 'Electrician', nameUr: 'الیکٹریشن', icon: '⚡', color: '#F59E0B', bgColor: '#FEF3C7', workerCount: 1240, isHot: true, subcategories: [{ slug: 'wiring', name: 'Wiring & Switchboard' }, { slug: 'ups', name: 'UPS & Inverter' }, { slug: 'fan', name: 'Fan Installation' }, { slug: 'meter', name: 'Meter & MCB' }, { slug: 'light', name: 'Light Fitting' }] },
  { slug: 'plumber', name: 'Plumber', nameUr: 'پلمبر', icon: '🔧', color: '#3B82F6', bgColor: '#DBEAFE', workerCount: 980, subcategories: [{ slug: 'leakage', name: 'Leakage Repair' }, { slug: 'tap', name: 'Tap & Fixture' }, { slug: 'pump', name: 'Water Pump' }, { slug: 'bathroom', name: 'Bathroom Fitting' }, { slug: 'drainage', name: 'Drainage & Sewage' }] },
  { slug: 'ac-technician', name: 'AC Technician', nameUr: 'اے سی ٹیکنیشن', icon: '❄️', color: '#06B6D4', bgColor: '#CFFAFE', workerCount: 720, subcategories: [{ slug: 'service', name: 'AC Servicing' }, { slug: 'repair', name: 'AC Repair' }, { slug: 'installation', name: 'AC Installation' }, { slug: 'gas', name: 'Gas Filling' }] },
  { slug: 'carpenter', name: 'Carpenter', nameUr: 'بڑھئی', icon: '🪵', color: '#92400E', bgColor: '#FDE68A', workerCount: 650, subcategories: [{ slug: 'furniture', name: 'Furniture Repair' }, { slug: 'door', name: 'Door & Lock' }, { slug: 'kitchen', name: 'Kitchen Cabinets' }, { slug: 'custom', name: 'Custom Work' }] },
  { slug: 'cleaning', name: 'Deep Cleaning', nameUr: 'صفائی', icon: '🧹', color: '#10B981', bgColor: '#D1FAE5', workerCount: 540, subcategories: [{ slug: 'house', name: 'House Cleaning' }, { slug: 'sofa', name: 'Sofa Cleaning' }, { slug: 'tank', name: 'Water Tank' }, { slug: 'carpet', name: 'Carpet & Curtain' }, { slug: 'office', name: 'Office Cleaning' }] },
  { slug: 'beautician', name: 'Home Beautician', nameUr: 'بیوٹیشن', icon: '💄', color: '#EC4899', bgColor: '#FCE7F3', workerCount: 890, subcategories: [{ slug: 'makeup', name: 'Makeup & Bridal' }, { slug: 'waxing', name: 'Waxing & Threading' }, { slug: 'facial', name: 'Facial & Skincare' }, { slug: 'mehndi', name: 'Mehndi Artist' }, { slug: 'mani', name: 'Mani/Pedi' }] },
  { slug: 'cook', name: 'Cook / Chef', nameUr: 'باورچی', icon: '👨‍🍳', color: '#F97316', bgColor: '#FFEDD5', workerCount: 420, subcategories: [{ slug: 'daily', name: 'Daily Cooking' }, { slug: 'event', name: 'Event Catering' }, { slug: 'baking', name: 'Baking & Desserts' }] },
  { slug: 'tutor', name: 'Home Tutor', nameUr: 'ٹیوٹر', icon: '📚', color: '#8B5CF6', bgColor: '#EDE9FE', workerCount: 1100, subcategories: [{ slug: 'primary', name: 'Primary School' }, { slug: 'secondary', name: 'Matric & FSc' }, { slug: 'oalevel', name: 'O/A Level' }, { slug: 'ielts', name: 'IELTS / CSS' }, { slug: 'quran', name: 'Quran Teacher' }] },
  { slug: 'driver', name: 'Driver', nameUr: 'ڈرائیور', icon: '🚗', color: '#1D4ED8', bgColor: '#DBEAFE', workerCount: 380, subcategories: [{ slug: 'personal', name: 'Personal Driver' }, { slug: 'school', name: 'School Run' }, { slug: 'outstation', name: 'Outstation' }] },
  { slug: 'maid', name: 'Maid / Maasi', nameUr: 'ماسی', icon: '🏠', color: '#065F46', bgColor: '#D1FAE5', workerCount: 670, subcategories: [{ slug: 'parttime', name: 'Part-time Daily' }, { slug: 'fulltime', name: 'Full-time Live-in' }, { slug: 'nanny', name: 'Nanny / Babysitter' }] },
  { slug: 'painter', name: 'Painter', nameUr: 'رنگساز', icon: '🎨', color: '#DC2626', bgColor: '#FEE2E2', workerCount: 310, subcategories: [{ slug: 'interior', name: 'Interior Painting' }, { slug: 'exterior', name: 'Exterior Painting' }, { slug: 'polish', name: 'Wood Polish' }] },
  { slug: 'shifting', name: 'Movers & Shifters', nameUr: 'شفٹنگ', icon: '📦', color: '#7C3AED', bgColor: '#EDE9FE', workerCount: 290, subcategories: [{ slug: 'house', name: 'House Shifting' }, { slug: 'furniture', name: 'Furniture Transport' }, { slug: 'packing', name: 'Packing Service' }] },
];

export const CITIES = ['Lahore', 'Islamabad', 'Rawalpindi', 'Karachi', 'Multan', 'Faisalabad', 'Gujranwala', 'Sialkot', 'Peshawar', 'Quetta'];

export const LAHORE_AREAS = ['DHA Phase 1-6', 'Gulberg', 'Model Town', 'Johar Town', 'Bahria Town', 'Cantt', 'Allama Iqbal Town', 'Garden Town', 'Township', 'Faisal Town', 'Wapda Town', 'Cavalry Ground'];

// ─── SELLERS ───────────────────────────────────────────────────────────────

export const SELLERS: Seller[] = [
  {
    id: 's1', name: 'Ahmed Ali Khan', phone: '0300-1234567', city: 'Lahore', area: 'DHA Phase 5',
    initials: 'AK', color: 'from-emerald-500 to-teal-600',
    bio: 'Experienced master electrician with 10+ years in residential and commercial electrical work. Specialist in UPS systems, main switch repair, and complete wiring. BAZMEER top-rated professional.',
    categories: ['electrician'], subcategories: ['wiring', 'ups', 'fan', 'meter'],
    experience: 10, rating: 4.9, reviewCount: 127, jobsCompleted: 127,
    memberSince: 'Jan 2024', verificationTier: 3,
    badges: [
      { type: 'cnic', label: 'CNIC Verified', icon: '✅', color: 'text-emerald-700' },
      { type: 'bazmeer', label: 'BAZMEER Verified', icon: '🔵', color: 'text-blue-700' },
      { type: 'police', label: 'Police Verified', icon: '🛡️', color: 'text-indigo-700' },
    ],
    isOnline: true, responseTime: 'Usually within 30 min',
    startingPrice: 500, portfolio: [], areasServed: ['DHA', 'Gulberg', 'Cantt', 'Cavalry Ground'],
    isAvailableNow: true, distance: 1.2, lat: 31.4697, lng: 74.4113,
  },
  {
    id: 's2', name: 'Muhammad Rizwan', phone: '0311-7654321', city: 'Lahore', area: 'Johar Town',
    initials: 'MR', color: 'from-orange-400 to-red-500',
    bio: 'Professional electrician serving Johar Town and nearby areas for 5 years. Fast response, affordable rates, and quality work guaranteed. Available for urgent calls.',
    categories: ['electrician'], subcategories: ['wiring', 'light', 'fan'],
    experience: 5, rating: 4.7, reviewCount: 64, jobsCompleted: 64,
    memberSince: 'Mar 2024', verificationTier: 1,
    badges: [{ type: 'cnic', label: 'CNIC Verified', icon: '✅', color: 'text-emerald-700' }],
    isOnline: false, responseTime: 'Usually within 1 hour',
    startingPrice: 400, portfolio: [], areasServed: ['Johar Town', 'Township', 'Wapda Town'],
    isAvailableNow: false, distance: 2.8, lat: 31.4504, lng: 74.3587,
  },
  {
    id: 's3', name: 'Saleem Ahmad Chaudhry', phone: '0323-9876543', city: 'Lahore', area: 'Gulberg III',
    initials: 'SA', color: 'from-violet-500 to-purple-600',
    bio: 'BAZMEER Certified master electrician and AC technician. 12 years experience. 203 completed jobs with 5.0 star rating. Specialist in commercial and residential projects.',
    categories: ['electrician', 'ac-technician'], subcategories: ['wiring', 'ups', 'service', 'repair', 'installation'],
    experience: 12, rating: 5.0, reviewCount: 203, jobsCompleted: 203,
    memberSince: 'Dec 2023', verificationTier: 4,
    badges: [
      { type: 'cnic', label: 'CNIC Verified', icon: '✅', color: 'text-emerald-700' },
      { type: 'bazmeer', label: 'BAZMEER Verified', icon: '🔵', color: 'text-blue-700' },
      { type: 'police', label: 'Police Verified', icon: '🛡️', color: 'text-indigo-700' },
      { type: 'certified', label: 'BAZMEER Certified', icon: '⭐', color: 'text-amber-600' },
    ],
    isOnline: true, responseTime: 'Usually within 15 min',
    startingPrice: 800, portfolio: [], areasServed: ['Gulberg', 'Model Town', 'Garden Town', 'DHA'],
    isAvailableNow: true, distance: 3.1, lat: 31.5204, lng: 74.3587,
  },
  {
    id: 's4', name: 'Fatima Noor', phone: '0332-1122334', city: 'Lahore', area: 'Gulberg II',
    initials: 'FN', color: 'from-pink-400 to-rose-500',
    bio: 'Professional home beautician with 5 years of experience. Specializing in bridal makeup, mehndi, facials, and complete beauty packages. Female clients only. Hygiene guaranteed.',
    categories: ['beautician'], subcategories: ['makeup', 'mehndi', 'facial', 'waxing', 'mani'],
    experience: 5, rating: 4.8, reviewCount: 89, jobsCompleted: 89,
    memberSince: 'Feb 2024', verificationTier: 2,
    badges: [
      { type: 'cnic', label: 'CNIC Verified', icon: '✅', color: 'text-emerald-700' },
      { type: 'bazmeer', label: 'BAZMEER Verified', icon: '🔵', color: 'text-blue-700' },
    ],
    isOnline: true, responseTime: 'Usually within 45 min',
    startingPrice: 1500, portfolio: [], areasServed: ['Gulberg', 'Model Town', 'DHA', 'Cantt'],
    isAvailableNow: true, distance: 4.0, lat: 31.5072, lng: 74.3479,
  },
  {
    id: 's5', name: 'Tariq Hassan', phone: '0345-5566778', city: 'Lahore', area: 'Model Town',
    initials: 'TH', color: 'from-blue-500 to-cyan-500',
    bio: 'Expert plumber with 8 years in Lahore. Specialized in leakage repairs, bathroom fittings, and drainage systems. Fast, clean, and professional service.',
    categories: ['plumber'], subcategories: ['leakage', 'tap', 'bathroom', 'drainage'],
    experience: 8, rating: 4.6, reviewCount: 92, jobsCompleted: 92,
    memberSince: 'Jan 2024', verificationTier: 2,
    badges: [
      { type: 'cnic', label: 'CNIC Verified', icon: '✅', color: 'text-emerald-700' },
      { type: 'bazmeer', label: 'BAZMEER Verified', icon: '🔵', color: 'text-blue-700' },
    ],
    isOnline: false, responseTime: 'Usually within 1 hour',
    startingPrice: 600, portfolio: [], areasServed: ['Model Town', 'Allama Iqbal Town', 'Garden Town', 'Township'],
    isAvailableNow: false, distance: 5.5, lat: 31.4832, lng: 74.3378,
  },
  {
    id: 's6', name: 'Bilal Mahmood', phone: '0301-9988776', city: 'Lahore', area: 'Bahria Town',
    initials: 'BM', color: 'from-teal-500 to-emerald-600',
    bio: 'Certified AC technician and appliance repair specialist. 7 years experience. All brands serviced. Free diagnostic visit. Genuine parts used only.',
    categories: ['ac-technician'], subcategories: ['service', 'repair', 'installation', 'gas'],
    experience: 7, rating: 4.8, reviewCount: 143, jobsCompleted: 143,
    memberSince: 'Nov 2023', verificationTier: 3,
    badges: [
      { type: 'cnic', label: 'CNIC Verified', icon: '✅', color: 'text-emerald-700' },
      { type: 'bazmeer', label: 'BAZMEER Verified', icon: '🔵', color: 'text-blue-700' },
      { type: 'police', label: 'Police Verified', icon: '🛡️', color: 'text-indigo-700' },
    ],
    isOnline: true, responseTime: 'Usually within 20 min',
    startingPrice: 1200, portfolio: [], areasServed: ['Bahria Town', 'DHA', 'Cantt'],
    isAvailableNow: true, distance: 6.2, lat: 31.3655, lng: 74.1753,
  },
];

// ─── JOBS ──────────────────────────────────────────────────────────────────

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1', title: 'Main Switch Trip & UPS Repair', category: 'electrician', subcategory: 'ups',
    description: 'Main switch trip ho raha hai aur UPS bhi repair chahiye. Puri house ki wiring check karni hai. Problem 2 din se hai. Ghar mein 2 UPS hain.',
    photos: [], city: 'Lahore', area: 'DHA Phase 5',
    budgetMin: 500, budgetMax: 3000, preferredTime: 'Today, After 4 PM',
    workType: 'one_time', bidDuration: '6h', status: 'open',
    postedAt: '2026-02-27T10:00:00Z', expiresAt: '2026-02-27T16:00:00Z',
    bidCount: 5, userId: 'u1',
  },
  {
    id: 'j2', title: 'Bathroom Leakage Repair', category: 'plumber', subcategory: 'leakage',
    description: 'Bathroom mein pani leak ho raha hai tile ke neeche se. Ek tap bhi theek karna hai. Jaldi chahiye kaam.',
    photos: [], city: 'Lahore', area: 'Gulberg III',
    budgetMin: 800, budgetMax: 5000, preferredTime: 'Tomorrow Morning',
    workType: 'one_time', bidDuration: '24h', status: 'open',
    postedAt: '2026-02-27T09:00:00Z', expiresAt: '2026-02-28T09:00:00Z',
    bidCount: 3, userId: 'u1',
  },
  {
    id: 'j3', title: 'Bridal Makeup for Wedding', category: 'beautician', subcategory: 'makeup',
    description: 'Shadi ke liye bridal makeup chahiye. Complete package required: makeup, hairstyle, and jewellery setting. Date: 5 March 2026.',
    photos: [], city: 'Lahore', area: 'Model Town',
    budgetMin: 5000, budgetMax: 15000, preferredTime: '5 March 2026, 8 AM',
    workType: 'one_time', bidDuration: '3d', status: 'open',
    postedAt: '2026-02-27T08:00:00Z', expiresAt: '2026-03-01T08:00:00Z',
    bidCount: 8, userId: 'u2',
  },
];

// ─── BIDS ──────────────────────────────────────────────────────────────────

export const MOCK_BIDS: Bid[] = [
  {
    id: 'b1', jobId: 'j1', seller: SELLERS[0],
    amount: 1200, message: 'Main aaj 4 baje available hoon. 10+ saal ka experience hai UPS aur main switches ka. Kaam 1.5 ghante mein complete karunga. Quality guaranteed.',
    estimatedTime: '1.5 hours', availability: 'Today, 4-7 PM',
    status: 'pending', submittedAt: '2026-02-27T10:15:00Z', isBestMatch: true,
  },
  {
    id: 'b2', jobId: 'j1', seller: SELLERS[1],
    amount: 900, message: 'PKR 900 mein karta hoon. Kal subah 10 baje available hoon. Main Johar Town se hoon lekin DHA bhi aata hoon. Free diagnosis bhi karunga.',
    estimatedTime: '2 hours', availability: 'Tomorrow, 10 AM - 1 PM',
    status: 'pending', submittedAt: '2026-02-27T10:45:00Z', isLowestBid: true,
  },
  {
    id: 'b3', jobId: 'j1', seller: SELLERS[2],
    amount: 1500, message: 'Professional service with 12 years experience. Main aaj bhi aa sakta hoon agar urgent hai. Genuine parts use karta hoon. 6 month warranty on work.',
    estimatedTime: '1 hour', availability: 'Today anytime, or Tomorrow',
    status: 'pending', submittedAt: '2026-02-27T11:00:00Z',
  },
];

// ─── BOOKINGS ──────────────────────────────────────────────────────────────

const MOCK_USER: any = { id: 'u1', name: 'Usman Malik', phone: '0300-0000001', city: 'Lahore', area: 'DHA', initials: 'UM', memberSince: 'Jan 2025', totalBookings: 5, wallet: 1500 };

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk1', jobTitle: 'Main Switch Repair', category: 'Electrician',
    seller: SELLERS[0], user: MOCK_USER,
    amount: 1200, commission: 144, sellerEarns: 1056,
    status: 'in_progress', scheduledAt: '2026-02-27T16:00:00Z',
    city: 'Lahore', area: 'DHA Phase 5', isEscrowHeld: true, isReviewed: false,
  },
  {
    id: 'bk2', jobTitle: 'AC Service (2 Units)', category: 'AC Technician',
    seller: SELLERS[5], user: MOCK_USER,
    amount: 2800, commission: 336, sellerEarns: 2464,
    status: 'completed', scheduledAt: '2026-02-20T10:00:00Z', completedAt: '2026-02-20T12:30:00Z',
    city: 'Lahore', area: 'DHA Phase 5', isEscrowHeld: false, isReviewed: true,
  },
  {
    id: 'bk3', jobTitle: 'Deep House Cleaning (5 Marla)', category: 'Cleaning',
    seller: SELLERS[1], user: MOCK_USER,
    amount: 3500, commission: 420, sellerEarns: 3080,
    status: 'confirmed', scheduledAt: '2026-03-01T09:00:00Z',
    city: 'Lahore', area: 'DHA Phase 5', isEscrowHeld: true, isReviewed: false,
  },
];

// ─── REVIEWS ───────────────────────────────────────────────────────────────

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', sellerId: 's1', userId: 'u1', userName: 'Usman M.', userInitials: 'UM', rating: 5, comment: 'Bahut acha kaam kiya. Time pe aaye, kaam jaldi kiya. Main zaroor dobara call karunga. Highly recommended!', category: 'Electrician', date: '2026-02-20', isVerified: true },
  { id: 'r2', sellerId: 's1', userId: 'u2', userName: 'Sara A.', userInitials: 'SA', rating: 5, comment: 'Professional and clean work. UPS installation was perfect. Very polite and knowledgeable.', category: 'Electrician', date: '2026-02-15', isVerified: true },
  { id: 'r3', sellerId: 's1', userId: 'u3', userName: 'Kamran H.', userInitials: 'KH', rating: 4, comment: 'Good work overall. Took a bit longer than estimated but quality was good. Would use again.', category: 'Electrician - UPS', date: '2026-02-10', isVerified: true },
  { id: 'r4', sellerId: 's1', userId: 'u4', userName: 'Amina B.', userInitials: 'AB', rating: 5, comment: 'Excellent service! Fixed our main switch issue in 45 minutes. Very affordable too.', category: 'Electrician', date: '2026-02-05', isVerified: true, sellerResponse: 'Shukriya! Aage bhi zaroor call karein.' },
];

// ─── CONVERSATIONS ─────────────────────────────────────────────────────────

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: 'c1', otherPartyId: 's1', otherPartyName: 'Ahmed Ali Khan', otherPartyInitials: 'AK', otherPartyColor: 'from-emerald-500 to-teal-600', otherPartyRole: 'seller', jobTitle: 'Main Switch Repair', lastMessage: 'Main 4 baje pohonch jaunga insha Allah', lastMessageAt: '2026-02-27T11:30:00Z', unreadCount: 1, isOnline: true },
  { id: 'c2', otherPartyId: 's5', otherPartyName: 'Bilal Mahmood', otherPartyInitials: 'BM', otherPartyColor: 'from-teal-500 to-emerald-600', otherPartyRole: 'seller', jobTitle: 'AC Service', lastMessage: 'Done! Please confirm job complete.', lastMessageAt: '2026-02-20T12:45:00Z', unreadCount: 0, isOnline: false },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', conversationId: 'c1', senderId: 'u1', senderName: 'You', senderRole: 'user', type: 'text', content: 'Assalam o Alaikum, kab aa sakte hain?', sentAt: '2026-02-27T11:00:00Z', isRead: true },
  { id: 'm2', conversationId: 'c1', senderId: 's1', senderName: 'Ahmed Ali', senderRole: 'seller', type: 'text', content: 'Walaikum Assalam! Main 4 baje pohonch jaunga insha Allah. Address confirm kar dein please.', sentAt: '2026-02-27T11:15:00Z', isRead: true },
  { id: 'm3', conversationId: 'c1', senderId: 'u1', senderName: 'You', senderRole: 'user', type: 'text', content: 'DHA Phase 5, Street 12, House 34. Gate pe ring karen.', sentAt: '2026-02-27T11:20:00Z', isRead: true },
  { id: 'm4', conversationId: 'c1', senderId: 's1', senderName: 'Ahmed Ali', senderRole: 'seller', type: 'text', content: 'Main 4 baje pohonch jaunga insha Allah', sentAt: '2026-02-27T11:30:00Z', isRead: false },
];

// ─── NOTIFICATIONS ─────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'new_bid', title: 'New Bid Received!', body: 'Ahmed Ali Khan offered PKR 1,200 for "Main Switch Repair"', link: '/user/jobs/j1', isRead: false, createdAt: '2026-02-27T10:15:00Z' },
  { id: 'n2', type: 'new_bid', title: 'New Bid Received!', body: 'Muhammad Rizwan offered PKR 900 for "Main Switch Repair"', link: '/user/jobs/j1', isRead: false, createdAt: '2026-02-27T10:45:00Z' },
  { id: 'n3', type: 'message', title: 'New Message', body: 'Ahmed Ali: Main 4 baje pohonch jaunga insha Allah', link: '/user/chat/c1', isRead: false, createdAt: '2026-02-27T11:30:00Z' },
  { id: 'n4', type: 'payment', title: 'Payment Confirmed', body: 'PKR 1,200 held in escrow for booking #BK2026001', link: '/user/bookings/bk1', isRead: true, createdAt: '2026-02-27T09:00:00Z' },
  { id: 'n5', type: 'review', title: 'Review Reminder', body: 'How was your AC Service with Bilal Mahmood? Leave a review!', link: '/user/bookings/bk2', isRead: true, createdAt: '2026-02-20T13:00:00Z' },
];

// ─── PLATFORM STATS ────────────────────────────────────────────────────────

export const PLATFORM_STATS: PlatformStats = {
  totalUsers: 12480, activeSellers: 3240, openJobs: 186, todayBookings: 94, todayGMV: 1240000,
  pendingVerifications: 23, openDisputes: 7, platformRevenue: 148800,
  usersTrend: 12.4, sellersTrend: 8.2, bookingsTrend: 18.6, gmvTrend: 22.1,
};

export const VERIFICATION_QUEUE: SellerVerificationItem[] = [
  { id: 'v1', name: 'Zafar Iqbal', phone: '0300-1111222', city: 'Lahore', category: 'Plumber', submittedAt: '2026-02-25T09:00:00Z', daysWaiting: 2, status: 'pending' },
  { id: 'v2', name: 'Nasreen Bibi', phone: '0311-3334444', city: 'Islamabad', category: 'Home Beautician', submittedAt: '2026-02-25T14:00:00Z', daysWaiting: 2, status: 'pending' },
  { id: 'v3', name: 'Imran Malik', phone: '0323-5556666', city: 'Lahore', category: 'Electrician', submittedAt: '2026-02-26T08:00:00Z', daysWaiting: 1, status: 'under_review' },
  { id: 'v4', name: 'Rashid Ahmad', phone: '0345-7778888', city: 'Rawalpindi', category: 'AC Technician', submittedAt: '2026-02-26T11:00:00Z', daysWaiting: 1, status: 'pending' },
  { id: 'v5', name: 'Saba Khalid', phone: '0301-9990000', city: 'Lahore', category: 'Maid/Domestic Staff', submittedAt: '2026-02-27T07:00:00Z', daysWaiting: 0, status: 'pending' },
];

// ─── GMV CHART DATA ────────────────────────────────────────────────────────

export const GMV_DATA_7D = [
  { day: 'Mon', gmv: 980000, revenue: 117600 },
  { day: 'Tue', gmv: 1120000, revenue: 134400 },
  { day: 'Wed', gmv: 890000, revenue: 106800 },
  { day: 'Thu', gmv: 1350000, revenue: 162000 },
  { day: 'Fri', gmv: 1580000, revenue: 189600 },
  { day: 'Sat', gmv: 1820000, revenue: 218400 },
  { day: 'Today', gmv: 1240000, revenue: 148800 },
];

// ─── GIGS ──────────────────────────────────────────────────────────────────

export const MOCK_GIGS: Gig[] = [
  {
    id: 'g1', sellerId: 's1', title: 'Electrical Repair & Wiring Service', category: 'electrician', subcategory: 'wiring',
    description: 'Professional electrical repair and wiring service for residential and commercial properties. All work done safely with genuine parts.',
    packages: [
      { name: 'Basic', price: 500, description: 'Minor repair (1 issue)', includes: ['1 electrical issue', 'Diagnosis', 'Basic tools'], duration: '1-2 hours' },
      { name: 'Standard', price: 1200, description: 'Multiple repairs + inspection', includes: ['Up to 3 issues', 'Full inspection', 'Minor wiring', 'Report'], duration: '2-4 hours' },
      { name: 'Premium', price: 2500, description: 'Complete wiring overhaul', includes: ['Unlimited issues', 'Full wiring check', 'MCB/DB work', '30-day warranty'], duration: '4-8 hours' },
    ],
    gallery: [], tags: ['electrician', 'wiring', 'repair'],
    isActive: true, createdAt: '2024-01-15', ordersCount: 127, rating: 4.9,
  },
];

// ─── MARKET RATE DATA ──────────────────────────────────────────────────────

export const MARKET_RATES: Record<string, { min: number; max: number; typical: number }> = {
  electrician: { min: 400, max: 5000, typical: 1200 },
  plumber: { min: 500, max: 8000, typical: 1500 },
  'ac-technician': { min: 1000, max: 15000, typical: 2500 },
  carpenter: { min: 800, max: 12000, typical: 2000 },
  cleaning: { min: 1500, max: 8000, typical: 3000 },
  beautician: { min: 1500, max: 20000, typical: 4000 },
  cook: { min: 1000, max: 10000, typical: 2500 },
  tutor: { min: 3000, max: 15000, typical: 6000 },
  driver: { min: 800, max: 5000, typical: 1500 },
  maid: { min: 5000, max: 25000, typical: 10000 },
  painter: { min: 5000, max: 80000, typical: 15000 },
};
