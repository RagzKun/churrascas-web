
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

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
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
      aria-label="Navegación principal"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#hero" 
          className="flex items-center focus-visible-ring rounded-md"
          aria-label="Volver al inicio"
        >
          <span className={`font-display text-2xl font-normal ${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}>
            Churrascas<span className="text-churrasca-600">101</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="#productos" 
            className={`${isScrolled ? 'text-black dark:text-white' : 'text-white'} hover:text-churrasca-600 transition-colors font-medium focus-visible-ring rounded-md`}
          >
            Menú
          </a>
          <a 
            href="#ubicacion" 
            className={`${isScrolled ? 'text-black dark:text-white' : 'text-white'} hover:text-churrasca-600 transition-colors font-medium focus-visible-ring rounded-md`}
          >
            Ubicación
          </a>
          <a 
            href="#faq" 
            className={`${isScrolled ? 'text-black dark:text-white' : 'text-white'} hover:text-churrasca-600 transition-colors font-medium focus-visible-ring rounded-md`}
          >
            FAQ
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart Button */}
          <button 
            onClick={toggleCart}
            className="relative flex items-center bg-churrasca-100 dark:bg-churrasca-900 text-black dark:text-white px-4 py-2 rounded-full hover:bg-churrasca-200 dark:hover:bg-churrasca-800 transition-colors focus-visible-ring"
            aria-label={`Ver carrito de compras: ${itemCount} artículos`}
          >
            <ShoppingCart className="h-5 w-5 mr-2" aria-hidden="true" />
            <span>Carrito</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-churrasca-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center" aria-hidden="true">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          <button 
            onClick={toggleCart}
            className={`relative mx-3 ${isScrolled ? 'text-black dark:text-white' : 'text-white'} p-1 focus-visible-ring rounded-md`}
            aria-label={`Abrir carrito: ${itemCount} artículos`}
          >
            <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-churrasca-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" aria-hidden="true">
                {itemCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? 'text-black dark:text-white' : 'text-white'} p-1 focus-visible-ring rounded-md`}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? 
              <X className="h-6 w-6" aria-hidden="true" /> : 
              <Menu className="h-6 w-6" aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-white dark:bg-gray-900 border-t border-churrasca-100 dark:border-churrasca-800 animate-fade-in"
          id="mobile-menu"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a 
              href="#productos" 
              className="text-black dark:text-white py-2 hover:text-churrasca-600 transition-colors focus-visible-ring rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menú
            </a>
            <a 
              href="#ubicacion" 
              className="text-black dark:text-white py-2 hover:text-churrasca-600 transition-colors focus-visible-ring rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ubicación
            </a>
            <a 
              href="#faq" 
              className="text-black dark:text-white py-2 hover:text-churrasca-600 transition-colors focus-visible-ring rounded-md"
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
