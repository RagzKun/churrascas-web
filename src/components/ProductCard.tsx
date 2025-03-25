
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Product, ProductExtra, useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  openModal: (product: Product) => void;
}

const ProductCard = ({ product, openModal }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-churrasca-100 card-hover">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-churrasca-900">{product.name}</h3>
          <span className="text-lg font-bold text-churrasca-700">
            ${product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-churrasca-700/80 mt-2 h-12 overflow-hidden">
          {product.description}
        </p>
        
        <button
          onClick={() => openModal(product)}
          className="w-full mt-4 flex items-center justify-center bg-churrasca-100 text-churrasca-900 py-3 px-4 rounded-lg 
          font-medium transition-all duration-300 hover:bg-churrasca-600 hover:text-white"
        >
          <Plus className="h-5 w-5 mr-2" />
          Personalizar y Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
