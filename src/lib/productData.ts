
import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: "churrasca-tradicional",
    name: "Churrasca Tradicional",
    description: "Nuestra churrasca clásica, hecha con receta tradicional del sur de Chile, con un toque de mantequilla.",
    price: 2500,
    image: "/assets/churrasca-tradicional.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "jamon", name: "Jamón", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-integral",
    name: "Churrasca Integral",
    description: "Versión saludable hecha con harina integral, ideal para quienes buscan una opción más nutritiva.",
    price: 2800,
    image: "/assets/churrasca-integral.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "jamon", name: "Jamón", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-ajo",
    name: "Churrasca de Ajo",
    description: "Con un delicioso toque de ajo y hierbas, perfecta para acompañar cualquier comida.",
    price: 2700,
    image: "/assets/churrasca-ajo.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "jamon", name: "Jamón", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-queso",
    name: "Churrasca con Queso",
    description: "Nuestra churrasca tradicional con queso derretido en su interior, simplemente irresistible.",
    price: 3000,
    image: "/assets/churrasca-queso.jpg",
    extras: [
      { id: "jamon", name: "Jamón", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "pack-familiar",
    name: "Pack Familiar",
    description: "Ideal para compartir en familia: 6 churrascas tradicionales a un precio especial.",
    price: 12000,
    image: "/assets/pack-familiar.jpg",
    extras: [
      { id: "queso-pack", name: "Queso (todas)", price: 2500 },
      { id: "jamon-pack", name: "Jamón (todas)", price: 2500 },
      { id: "palta-pack", name: "Palta (todas)", price: 3500 }
    ]
  },
  {
    id: "pack-mixto",
    name: "Pack Mixto",
    description: "Variedad para todos los gustos: 2 tradicionales, 2 integrales y 2 de ajo.",
    price: 13500,
    image: "/assets/pack-mixto.jpg",
    extras: [
      { id: "queso-pack", name: "Queso (todas)", price: 2500 },
      { id: "jamon-pack", name: "Jamón (todas)", price: 2500 },
      { id: "palta-pack", name: "Palta (todas)", price: 3500 }
    ]
  }
];

// FAQs
export const faqs = [
  {
    question: "¿Cómo puedo realizar mi pedido?",
    answer: "Puedes personalizar tu pedido directamente en nuestra página y al finalizar serás redirigido a WhatsApp para confirmar los detalles."
  },
  {
    question: "¿Cuánto tiempo de anticipación necesito para hacer un pedido?",
    answer: "Recomendamos hacer tu pedido con al menos 2 horas de anticipación para garantizar disponibilidad."
  },
  {
    question: "¿Tienen opciones para personas con restricciones alimentarias?",
    answer: "Sí, ofrecemos opciones integrales y puedes consultar por versiones sin gluten o veganas."
  },
  {
    question: "¿Hacen entregas a domicilio?",
    answer: "En este momento solo trabajamos con retiro en tienda. Estamos evaluando implementar delivery en el futuro."
  },
  {
    question: "¿Puedo hacer pedidos para eventos o cantidades grandes?",
    answer: "¡Claro! Para pedidos de más de 50 unidades, contáctanos directamente por WhatsApp para obtener precios especiales."
  }
];

// Business information
export const businessInfo = {
  name: "Churrascas Las Delicias 101",
  address: "Av. Las Delicias 101, Santiago",
  phone: "+56912345678",
  email: "contacto@churrascasdelicicias.cl",
  hours: "Lunes a Domingo, 10:00 - 20:00 hrs",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0104550457257!2d-70.6045235!3d-33.4377764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzE2LjAiUyA3MMKwMzYnMTYuMyJX!5e0!3m2!1ses!2scl!4v1573859783585!5m2!1ses!2scl",
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#"
  }
};
