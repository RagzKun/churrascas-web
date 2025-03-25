
import React, { useState } from 'react';
import { CartProvider, Product } from '../context/CartContext';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import OrderModal from '../components/OrderModal';
import Cart from '../components/Cart';
import LocationInfo from '../components/LocationInfo';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Handle product selection
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar toggleCart={toggleCart} />
        
        <main className="flex-1">
          <Hero />
          <ProductList openModal={openProductModal} />
          <LocationInfo />
          <FAQSection />
        </main>

        <Footer />
        
        {/* Modal and cart */}
        <OrderModal 
          isOpen={isModalOpen} 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
        />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          editProduct={(product) => {
            setSelectedProduct(product);
            setIsCartOpen(false);
            setIsModalOpen(true);
          }} 
        />
        
        {/* Floating WhatsApp button */}
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
};

export default Index;
