import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import MerchantDashboard from './pages/MerchantDashboard';
import MarketerDashboard from './pages/MarketerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProductPage from './pages/ProductPage';

type Page = 'landing' | 'merchant' | 'marketer' | 'admin' | 'product';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'merchant':
        return <MerchantDashboard onNavigate={setCurrentPage} onProductClick={navigateToProduct} />;
      case 'marketer':
        return <MarketerDashboard onNavigate={setCurrentPage} onProductClick={navigateToProduct} />;
      case 'admin':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case 'product':
        return <ProductPage productId={selectedProductId} onBack={() => setCurrentPage('marketer')} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

export default App;
