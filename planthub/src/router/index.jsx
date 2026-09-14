import { createBrowserRouter } from 'react-router';
import PageLayout from '../components/layout/PageLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import LandingPage from '../pages/LandingPage';
import ShopPage from '../pages/ShopPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import ManagerLoginPage from '../pages/ManagerLoginPage';
import AgentLoginPage from '../pages/AgentLoginPage';
import SignupPage from '../pages/SignupPage';
import ContactPage from '../pages/ContactPage';
import FeedbackPage from '../pages/FeedbackPage';
import AdminDashboard from '../pages/AdminDashboard';
import ManagerDashboard from '../pages/ManagerDashboard';
import SupportPage from '../pages/SupportPage';
import AgentDashboard from '../pages/AgentDashboard';
import PrivacyPolicy from '../pages/policies/PrivacyPolicy';
import ReturnPolicy from '../pages/policies/ReturnPolicy';
import CookiePolicy from '../pages/policies/CookiePolicy';
import TermsAndConditions from '../pages/policies/TermsAndConditions';
import AuthCallback from '../features/auth/AuthCallback';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'cart', element: <CartPage /> },
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
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'admin-login', element: <AdminLoginPage /> },
      { path: 'manager-login', element: <ManagerLoginPage /> },
      { path: 'agent-login', element: <AgentLoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'auth/callback', element: <AuthCallback /> },
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
      <ProtectedRoute role="admin">
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
      <ProtectedRoute role="manager">
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
      <ProtectedRoute role="agent">
        <DashboardLayout role="agent" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AgentDashboard /> },
    ],
  },
]);
