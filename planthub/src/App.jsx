import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './hooks/useCart';
import { SupportProvider } from './context/SupportContext';
import AuthGate from './components/auth/AuthGate';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SupportProvider>
          <AuthGate>
            <RouterProvider router={router} />
          </AuthGate>
        </SupportProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
