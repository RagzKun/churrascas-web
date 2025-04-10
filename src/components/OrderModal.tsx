import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Check, AlertCircle } from 'lucide-react';
import { Product, ProductExtra, useCart } from '../context/CartContext';

interface OrderModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const OrderModal = ({ isOpen, product, onClose }: OrderModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const { addToCart } = useCart();
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  
  useEffect(() => {
    const checkStoreStatus = () => {
      const storeStatus = localStorage.getItem('storeStatus');
      setIsStoreOpen(storeStatus !== 'closed');
    };
    
    checkStoreStatus();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'storeStatus') {
        setIsStoreOpen(e.newValue !== 'closed');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedExtras([]);
      setNotes('');
      updateTotalPrice(product, 1, []);
    }
  }, [isOpen, product]);

  const updateTotalPrice = (
    currentProduct: Product | null, 
    qty: number, 
    extras: ProductExtra[]
  ) => {
    if (!currentProduct) return;
    
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
    setTotalPrice((currentProduct.price + extrasTotal) * qty);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateTotalPrice(product, newQuantity, selectedExtras);
  };

  const decrementQuantity = () => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateTotalPrice(product, newQuantity, selectedExtras);
  };

  const toggleExtra = (extra: ProductExtra) => {
    let newExtras;
    
    if (selectedExtras.some(e => e.id === extra.id)) {
      newExtras = selectedExtras.filter(e => e.id !== extra.id);
    } else {
      newExtras = [...selectedExtras, extra];
    }
    
    setSelectedExtras(newExtras);
    updateTotalPrice(product, quantity, newExtras);
  };

  const handleAddToCart = () => {
    if (!product || !isStoreOpen) return;
    
    addToCart({
      product,
      quantity,
      selectedExtras,
      notes: notes.trim() || undefined
    });
    
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-churrasca-900 hover:text-churrasca-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="relative h-48 w-full">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
          <h2 className="absolute bottom-4 left-6 text-2xl font-semibold text-white">
            {product.name}
          </h2>
        </div>
        
        <div className="p-6">
          {/* Product description */}
          {!isStoreOpen && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>Lo sentimos, la tienda está cerrada. No se pueden realizar pedidos en este momento.</p>
            </div>
          )}
          <p className="text-churrasca-700 mb-6">
            {product.description}
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-churrasca-900 mb-3">Cantidad</h3>
            <div className="flex items-center">
              <button 
                onClick={decrementQuantity}
                disabled={quantity <= 1 || !isStoreOpen}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-churrasca-200 
                text-churrasca-700 disabled:opacity-50 hover:bg-churrasca-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="mx-4 text-xl text-churrasca-700 font-medium w-8 text-center">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                disabled={!isStoreOpen}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-churrasca-200 
                text-churrasca-700 hover:bg-churrasca-50 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {product.extras && product.extras.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-churrasca-900 mb-3">Agregar extras</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.extras.map((extra) => (
                  <button 
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    disabled={!isStoreOpen}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors
                    ${selectedExtras.some(e => e.id === extra.id) 
                      ? 'border-churrasca-600 bg-churrasca-50' 
                      : 'border-churrasca-200 hover:bg-churrasca-50'
                    } ${!isStoreOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="text-churrasca-900">{extra.name}</span>
                    <div className="flex items-center">
                      <span className="text-churrasca-700 mr-2">${extra.price}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center
                        ${selectedExtras.some(e => e.id === extra.id)
                          ? 'bg-churrasca-600 text-white'
                          : 'border border-churrasca-300'
                        }`}
                      >
                        {selectedExtras.some(e => e.id === extra.id) && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-churrasca-900 mb-3">Instrucciones especiales</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin sal, más cocido, etc."
              className="w-full p-3 border border-churrasca-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-churrasca-600"
              rows={2}
              disabled={!isStoreOpen}
            />
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-sm text-churrasca-700">Precio total</p>
              <p className="text-2xl font-bold text-churrasca-900">${totalPrice.toLocaleString()}</p>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={!isStoreOpen}
              className={`${isStoreOpen 
                ? 'bg-churrasca-600 hover:bg-churrasca-700 hover:shadow-md' 
                : 'bg-gray-400 cursor-not-allowed'} 
                text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300`}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
