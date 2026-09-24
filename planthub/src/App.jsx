import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './hooks/useCart';
import { SupportProvider } from './context/SupportContext';
import { WishlistProvider } from './hooks/useWishlist';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <SupportProvider>
            <RouterProvider router={router} />
          </SupportProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
