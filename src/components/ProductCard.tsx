import React, { useState, useEffect } from 'react';
import { Plus, LockIcon } from 'lucide-react';
import { Product, ProductExtra, useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  openModal: (product: Product) => void;
}

const ProductCard = ({ product, openModal }: ProductCardProps) => {
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Check store status from localStorage
  useEffect(() => {
    const checkStoreStatus = () => {
      const storeStatus = localStorage.getItem('storeStatus');
      setIsStoreOpen(storeStatus !== 'closed');
    };
    
    checkStoreStatus();
    
    // Listen for store status changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'storeStatus') {
        setIsStoreOpen(e.newValue !== 'closed');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleProductClick = () => {
    if (isStoreOpen) {
      openModal(product);
    }
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border border-churrasca-100 card-hover 
      ${!isStoreOpen ? 'opacity-75' : ''}`}>
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isStoreOpen ? 'hover:scale-110' : 'grayscale-[30%]'}`}
        />
        
        {/* Store closed overlay */}
        {!isStoreOpen && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
            <LockIcon className="h-10 w-10 mb-2" />
            <p className="font-medium text-center px-4">Tienda Cerrada</p>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold leading-snug tracking-wide text-churrasca-900">{product.name}</h3>
          <span className="text-lg font-bold text-churrasca-700">
            ${product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-churrasca-700/80 mt-2 h-12 overflow-hidden">
          {product.description}
        </p>  
        
        <button
          onClick={handleProductClick}
          disabled={!isStoreOpen}
          className={`w-full mt-4 flex items-center justify-center py-3 px-4 rounded-lg
          font-medium transition-all duration-300 
          ${isStoreOpen 
            ? 'bg-churrasca-100 text-churrasca-900 hover:bg-churrasca-600 hover:text-white' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          {isStoreOpen ? (
            <>
              <Plus className="h-5 w-5 mr-2" />
              Personalizar y Agregar
            </>
          ) : (
            <>
              <LockIcon className="h-5 w-5 mr-2" />
              No Disponible
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
