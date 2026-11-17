import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import AuthModal from './components/auth/AuthModal';

// Pages
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import BulkOrderPage from './pages/BulkOrderPage';
import CollaborationPage from './pages/CollaborationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-vedic-cream text-vedic-charcoal">
          <Navbar />
          <AuthModal />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage title="Collections / Shop" />} />
              <Route
                path="/new-arrivals"
                element={<CollectionsPage title="New Arrivals" isNewArrival={true} />}
              />
              <Route
                path="/gifting"
                element={<CollectionsPage title="Luxury Gifting" category="Gifting" />}
              />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/bulk-orders" element={<BulkOrderPage />} />
              <Route path="/collaboration" element={<CollaborationPage />} />
              <Route path="/track-order" element={<OrderTrackingPage />} />
            </Routes>
          </main>

          <WhatsAppButton />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;