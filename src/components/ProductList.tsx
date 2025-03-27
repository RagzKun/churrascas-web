
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../context/CartContext';
import { products } from '../lib/productData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProductListProps {
  openModal: (product: Product) => void;
}

const ProductList = ({ openModal }: ProductListProps) => {
  const sectionRef = useScrollAnimation<HTMLDivElement>();
  
  return (
    <section 
      id="productos" 
      ref={sectionRef} 
      className="section-padding bg-churrasca-50 animate-on-scroll"
    >
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-churrasca-100 text-churrasca-800 rounded-full text-sm font-medium mb-3">
            NUESTRO MENÚ
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-churrasca-900">
            Churrascas Artesanales
          </h2>
          <p className="mt-4 text-black max-w-2xl mx-auto">
            Todas nuestras churrascas son elaboradas diariamente con ingredientes frescos y de alta calidad, 
            siguiendo recetas tradicionales del sur de Chile.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              openModal={openModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
