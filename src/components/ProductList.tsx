import React from "react";
import ProductCard from "./ProductCard";
import CommentsSection from "./CommentsSection";
import { Product } from "../context/CartContext";
import { products } from "../lib/productData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface ProductListProps {
  openModal: (product: Product) => void;
}

const ProductList = ({ openModal }: ProductListProps) => {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="section-padding bg-white animate-on-scroll"
    >
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-churrasca-100 text-churrasca-800 rounded-full text-sm font-medium mb-3">
            NUESTRO MENÚ
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-churrasca-900">
            Churrascas Artesanales
          </h2>
          <p className="mt-4 text-churrasca-700 max-w-2xl mx-auto">
            Todas nuestras churrascas son elaboradas diariamente con
            ingredientes frescos y de alta calidad, siguiendo recetas
            tradicionales del sur de Chile.
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

        {/* Comments Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-churrasca-900">
              Opiniones de Clientes
            </h2>
            <p className="mt-2 text-churrasca-700">
              Comparte tu experiencia con nuestras churrascas
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <CommentsSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
