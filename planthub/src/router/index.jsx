import { createBrowserRouter } from 'react-router';
import PageLayout from '../components/layout/PageLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import LandingPage from '../pages/LandingPage';
import ShopPage from '../pages/ShopPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import BlogPage from '../pages/BlogPage';
import BlogPostPage from '../pages/BlogPostPage';
import PlantMatcherPage from '../pages/PlantMatcherPage';
import PlantDoctorPage from '../pages/PlantDoctorPage';
import SubscriptionsPage from '../pages/SubscriptionsPage';
import BuilderPage from '../pages/BuilderPage';
import GiftingPage from '../pages/GiftingPage';
import TrackOrderPage from '../pages/TrackOrderPage';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import ProfilePage from '../pages/ProfilePage';
import ContactPage from '../pages/ContactPage';
import FeedbackPage from '../pages/FeedbackPage';
import AdminDashboard from '../pages/AdminDashboard';
import ManagerDashboard from '../pages/ManagerDashboard';
import SupportPage from '../pages/SupportPage';
import AgentDashboard from '../pages/AgentDashboard';
import CRMDashboard from '../components/admin/CRMDashboard';
import SignupPage from '../pages/SignupPage';
import SellerSignupPage from '../pages/SellerSignupPage';
import LoginPage from '../pages/LoginPage';
import PrivacyPolicy from '../pages/policies/PrivacyPolicy';
import ReturnPolicy from '../pages/policies/ReturnPolicy';
import CookiePolicy from '../pages/policies/CookiePolicy';
import TermsAndConditions from '../pages/policies/TermsAndConditions';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'seller-signup', element: <SellerSignupPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'builder', element: <BuilderPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:id', element: <BlogPostPage /> },
      { path: 'plant-matcher', element: <PlantMatcherPage /> },
      { path: 'plant-doctor', element: <PlantDoctorPage /> },
      { path: 'subscriptions', element: <SubscriptionsPage /> },
      { path: 'gifting', element: <GiftingPage /> },
      { path: 'track-order', element: <TrackOrderPage /> },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: 'contact', element: <ContactPage /> },
      {
        path: 'feedback',
        element: (
          <ProtectedRoute>
            <FeedbackPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'support',
        element: (
          <ProtectedRoute>
            <SupportPage />
          </ProtectedRoute>
        ),
      },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'return-policy', element: <ReturnPolicy /> },
      { path: 'cookie-policy', element: <CookiePolicy /> },
      { path: 'terms-and-conditions', element: <TermsAndConditions /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout role="admin" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
  {
    path: '/manager',
    element: (
      <ProtectedRoute requiredRole="manager">
        <DashboardLayout role="manager" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ManagerDashboard /> },
    ],
  },
  {
    path: '/agent',
    element: (
      <ProtectedRoute requiredRole="agent">
        <DashboardLayout role="agent" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AgentDashboard /> },
    ],
  },
]);
