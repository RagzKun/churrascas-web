
import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Edit, ArrowRight } from 'lucide-react';
import { useCart, CartItem, Product } from '../context/CartContext';
import { businessInfo } from '../lib/productData';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  editProduct: (product: Product) => void;
}

const Cart = ({ isOpen, onClose, editProduct }: CartProps) => {
  const { items, removeFromCart, getCartTotal, updateQuantity } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const cartTotal = getCartTotal();

  // Format cart items for WhatsApp message
  const formatCartForWhatsApp = () => {
    if (items.length === 0) return '';
    
    let message = `🧾 *PEDIDO - Churrascas Las Delicias 101*\n\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📱 *Teléfono:* ${phone}\n\n`;
    message += `*Productos:*\n`;
    
    items.forEach((item) => {
      message += `▪️ ${item.quantity}x ${item.product.name} - $${(item.product.price * item.quantity).toLocaleString()}\n`;
      
      if (item.selectedExtras.length > 0) {
        message += `  *Extras:*\n`;
        item.selectedExtras.forEach((extra) => {
          message += `  ▫️ ${extra.name} - $${extra.price.toLocaleString()}\n`;
        });
      }
      
      if (item.notes) {
        message += `  *Nota:* ${item.notes}\n`;
      }
      
      message += '\n';
    });
    
    message += `\n*Total:* $${cartTotal.toLocaleString()}\n`;
    message += `*Método de pago:* ${paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}\n\n`;
    
    if (paymentMethod === 'transfer') {
      message += `*Datos de transferencia:*\n`;
      message += `Nombre: Yanet Caroca Elgueta\n`;
      message += `Banco: Banco Estado\n`;
      message += `Cuenta: Cuenta Rut\n`;
      message += `RUT: 12.376.376-9\n`;
      // message += `Email: pagos@churrascasdelicicias.cl\n\n`;
    }
    
    // message += `*Horario de retiro:* ${businessInfo.hours}\n`;
    message += `📍 *Ubicación:* ${businessInfo.address}`;
    
    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    if (items.length === 0 || !isStoreOpen) return;
    if (!name || !phone) {
      console.error('Por favor ingresa tu nombre y teléfono');
      return;
    }
    
    const message = formatCartForWhatsApp();
    const whatsappUrl = `https://wa.me/${businessInfo.phone.replace(/\+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEditItem = (item: CartItem) => {
    if (!isStoreOpen) return;
    editProduct(item.product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      onClick={onClose}
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>
      
      <div 
        className="w-full max-w-md h-full bg-white shadow-xl overflow-y-auto animate-slide-in z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-4 border-b border-churrasca-100 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-churrasca-900 flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-churrasca-600" />
              Tu Pedido
            </h2>
            <button 
              onClick={onClose}
              className="text-churrasca-700 hover:text-churrasca-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Cart content */}
        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-churrasca-200 mb-4" />
              <h3 className="text-xl font-medium text-churrasca-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-churrasca-700 mb-6">Agrega algunos productos para comenzar tu pedido</p>
              <button 
                onClick={onClose}
                className="bg-churrasca-600 text-white px-6 py-3 rounded-lg font-medium 
                transition-all duration-300 hover:bg-churrasca-700"
              >
                Ver Menú
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                {items.map((item) => {
                  const itemExtrasTotal = item.selectedExtras.reduce(
                    (sum, extra) => sum + extra.price, 
                    0
                  );
                  const itemTotal = (item.product.price + itemExtrasTotal) * item.quantity;
                  
                  return (
                    <div 
                      key={`${item.product.id}-${item.selectedExtras.map(e => e.id).join('-')}`}
                      className="flex border border-churrasca-100 rounded-lg overflow-hidden"
                    >
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover"
                      />
                      
                      <div className="flex-1 p-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-churrasca-900">{item.product.name}</h4>
                          <span className="font-semibold text-churrasca-900">${itemTotal.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center mt-1 text-sm text-churrasca-700">
                          <span>Cantidad: {item.quantity}</span>
                          {item.selectedExtras.length > 0 && (
                            <span className="ml-2">
                              • Extras: {item.selectedExtras.length}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex space-x-3 mt-2">
                          <button 
                            onClick={() => handleEditItem(item)}
                            className={`text-xs flex items-center ${isStoreOpen 
                              ? 'text-churrasca-600 hover:text-churrasca-700' 
                              : 'text-gray-400 cursor-not-allowed'}`}
                            disabled={!isStoreOpen}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </button>
                          
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-xs flex items-center text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-churrasca-100 pt-4 mb-6">
                <div className="flex justify-between py-2">
                  <span className="text-churrasca-700">Subtotal</span>
                  <span className="font-medium">${cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-2 border-t border-churrasca-100">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">${cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="bg-churrasca-50 p-3 rounded-lg mt-4 text-sm text-churrasca-700">
                  <p>Horario de retiro: {businessInfo.hours}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-churrasca-900 mb-3">Tus datos</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-churrasca-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ingresa tu nombre"
                      className="w-full p-3 border border-churrasca-200 text-churrasca-900 rounded-lg"
                      required
                      disabled={!isStoreOpen}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-churrasca-700 mb-1">
                      Teléfono (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ingresa tu número"
                      className="w-full p-3 border border-churrasca-200 text-churrasca-900 rounded-lg"
                      required
                      disabled={!isStoreOpen}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-churrasca-900 mb-3">Método de pago</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    disabled={!isStoreOpen}
                    className={`p-3 border rounded-lg flex items-center justify-center transition-colors
                      ${paymentMethod === 'cash' 
                        ? 'border-churrasca-600 bg-churrasca-50 text-churrasca-900'
                        : 'border-churrasca-200 text-churrasca-700 hover:bg-churrasca-50'
                      } ${!isStoreOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="font-medium">Efectivo</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    disabled={!isStoreOpen}
                    className={`p-3 border rounded-lg flex items-center justify-center transition-colors
                      ${paymentMethod === 'transfer' 
                        ? 'border-churrasca-600 bg-churrasca-50 text-churrasca-900'
                        : 'border-churrasca-200 text-churrasca-700 hover:bg-churrasca-50'
                      } ${!isStoreOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="font-medium">Transferencia</span>
                  </button>
                </div>
                
                {paymentMethod === 'transfer' && (
                  <div className="mt-4 bg-churrasca-50 p-3 rounded-lg text-sm">
                    <p className="font-medium text-churrasca-900 mb-1">Datos de transferencia:</p>
                    <p className="text-churrasca-700">Nombre: Yanet Caroca Elgueta</p>
                    <p className="text-churrasca-700">Banco: Banco Estado</p>
                    <p className="text-churrasca-700">Cuenta: Cuenta Rut</p>
                    <p className="text-churrasca-700">RUT: 12.376.376-9</p>
                    {/* <p className="text-churrasca-700">Email: pagos@churrascasdelicicias.cl</p> */}
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={!name || !phone || !isStoreOpen}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center
                transition-all duration-300 
                ${isStoreOpen && name && phone
                  ? 'bg-churrasca-600 text-white hover:bg-churrasca-700 hover:shadow-md' 
                  : 'bg-gray-400 text-white cursor-not-allowed'}`}
              >
                Confirmar Pedido <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <p className="text-xs text-center text-churrasca-700 mt-2">
                Al confirmar serás redirigido a WhatsApp para finalizar tu pedido
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
