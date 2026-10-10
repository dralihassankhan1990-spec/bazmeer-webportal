import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import UserLayout from './components/layout/UserLayout';
import SellerLayout from './components/layout/SellerLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import SearchResultsPage from './pages/public/SearchResultsPage';
import NearbySearchPage from './pages/public/NearbySearchPage';
import ProviderProfilePage from './pages/public/ProviderProfilePage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import CategoryPage from './pages/public/CategoryPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserSearchPage from './pages/user/UserSearchPage';
import UserNearbyPage from './pages/user/UserNearbyPage';
import PostJobPage from './pages/user/PostJobPage';
import PostJobSuccessPage from './pages/user/PostJobSuccessPage';
import UserJobsPage from './pages/user/UserJobsPage';
import UserJobDetailPage from './pages/user/UserJobDetailPage';
import UserBookingsPage from './pages/user/UserBookingsPage';
import UserBookingDetailPage from './pages/user/UserBookingDetailPage';
import UserChatListPage from './pages/user/UserChatListPage';
import UserChatPage from './pages/user/UserChatPage';
import UserPaymentsPage from './pages/user/UserPaymentsPage';
import UserProfilePage from './pages/user/UserProfilePage';
import UserNotificationsPage from './pages/user/UserNotificationsPage';
import UserFavoritesPage from './pages/user/UserFavoritesPage';

// Seller Pages
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerRegisterWizard from './pages/seller/SellerRegisterWizard';
import SellerProfilePage from './pages/seller/SellerProfilePage';
import SellerGigsPage from './pages/seller/SellerGigsPage';
import CreateGigPage from './pages/seller/CreateGigPage';
import JobFeedPage from './pages/seller/JobFeedPage';
import JobFeedDetailPage from './pages/seller/JobFeedDetailPage';
import MyBidsPage from './pages/seller/MyBidsPage';
import SellerOrdersPage from './pages/seller/SellerOrdersPage';
import SellerChatListPage from './pages/seller/SellerChatListPage';
import SellerChatPage from './pages/seller/SellerChatPage';
import EarningsPage from './pages/seller/EarningsPage';
import SellerDocumentsPage from './pages/seller/SellerDocumentsPage';
import SellerSubscriptionPage from './pages/seller/SellerSubscriptionPage';
import SellerNotificationsPage from './pages/seller/SellerNotificationsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSellersPage from './pages/admin/AdminSellersPage';
import PendingVerificationPage from './pages/admin/PendingVerificationPage';
import AdminDisputesPage from './pages/admin/AdminDisputesPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Protected Route
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole: 'user' | 'seller' | 'admin' }) {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role !== requiredRole) {
    if (role === 'user') return <Navigate to="/user/dashboard" replace />;
    if (role === 'seller') return <Navigate to="/seller/dashboard" replace />;
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '500' } }} />
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/search/nearby" element={<NearbySearchPage />} />
          <Route path="/providers/:id" element={<ProviderProfilePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/services/:categorySlug" element={<CategoryPage />} />
        </Route>

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/seller" element={<SellerRegisterWizard />} />

        {/* USER */}
        <Route path="/user" element={<ProtectedRoute requiredRole="user"><UserLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="search" element={<UserSearchPage />} />
          <Route path="search/nearby" element={<UserNearbyPage />} />
          <Route path="post-job" element={<PostJobPage />} />
          <Route path="post-job/success" element={<PostJobSuccessPage />} />
          <Route path="jobs" element={<UserJobsPage />} />
          <Route path="jobs/:jobId" element={<UserJobDetailPage />} />
          <Route path="bookings" element={<UserBookingsPage />} />
          <Route path="bookings/:bookingId" element={<UserBookingDetailPage />} />
          <Route path="chat" element={<UserChatListPage />} />
          <Route path="chat/:conversationId" element={<UserChatPage />} />
          <Route path="payments" element={<UserPaymentsPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="notifications" element={<UserNotificationsPage />} />
          <Route path="favorites" element={<UserFavoritesPage />} />
        </Route>

        {/* SELLER */}
        <Route path="/seller" element={<ProtectedRoute requiredRole="seller"><SellerLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="profile" element={<SellerProfilePage />} />
          <Route path="gigs" element={<SellerGigsPage />} />
          <Route path="gigs/new" element={<CreateGigPage />} />
          <Route path="job-feed" element={<JobFeedPage />} />
          <Route path="job-feed/:jobId" element={<JobFeedDetailPage />} />
          <Route path="bids" element={<MyBidsPage />} />
          <Route path="orders" element={<SellerOrdersPage />} />
          <Route path="chat" element={<SellerChatListPage />} />
          <Route path="chat/:conversationId" element={<SellerChatPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="documents" element={<SellerDocumentsPage />} />
          <Route path="subscription" element={<SellerSubscriptionPage />} />
          <Route path="notifications" element={<SellerNotificationsPage />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="sellers" element={<AdminSellersPage />} />
          <Route path="sellers/pending" element={<PendingVerificationPage />} />
          <Route path="disputes" element={<AdminDisputesPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
