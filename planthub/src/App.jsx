import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './hooks/useCart';
import { SupportProvider } from './context/SupportContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SupportProvider>
          <RouterProvider router={router} />
        </SupportProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
