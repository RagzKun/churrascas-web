
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ 
  toggleCart 
}: { 
  toggleCart: () => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="font-display text-2xl font-normal text-churrasca-900">
            Churrascas<span className="text-churrasca-600">101</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#productos" className="text-churrasca-900 hover:text-churrasca-600 transition-colors font-medium">
            Menú
          </a>
          <a href="#ubicacion" className="text-churrasca-900 hover:text-churrasca-600 transition-colors font-medium">
            Ubicación
          </a>
          <a href="#faq" className="text-churrasca-900 hover:text-churrasca-600 transition-colors font-medium">
            FAQ
          </a>

          {/* Cart Button */}
          <button 
            onClick={toggleCart}
            className="relative flex items-center bg-churrasca-100 text-churrasca-900 px-4 py-2 rounded-full hover:bg-churrasca-200 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span>Carrito</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-churrasca-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleCart}
            className="relative mr-4 text-churrasca-900 p-1"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-churrasca-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-churrasca-900 p-1"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-churrasca-100 animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a 
              href="#productos" 
              className="text-churrasca-900 py-2 hover:text-churrasca-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menú
            </a>
            <a 
              href="#ubicacion" 
              className="text-churrasca-900 py-2 hover:text-churrasca-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ubicación
            </a>
            <a 
              href="#faq" 
              className="text-churrasca-900 py-2 hover:text-churrasca-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
