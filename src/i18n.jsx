import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export const translations = {
  nav_inicio: { es: 'Inicio', en: 'Home' },
  nav_servicios: { es: 'Servicios', en: 'Services' },
  nav_portafolio: { es: 'Portafolio', en: 'Portfolio' },
  nav_contacto: { es: 'Contacto', en: 'Contact' },
  hero_cta: { es: '', en: '' },
  services_title: { es: 'Nuestros Servicios', en: 'Our Services' },
  services_subtitle: { es: 'Creamos soluciones digitales que impulsan tu negocio hacia adelante', en: 'We create digital solutions that propel your business forward' },
  service_landing_desc: { es: 'Sitios web profesionales de una sola página diseñados para convertir visitantes en clientes con diseño atractivo y llamadas a la acción claras.', en: 'Professional one-page websites designed to convert visitors into customers with attractive design and clear calls to action.' },
  service_landing_features: { es: 'Diseño Responsivo|Carga Rápida|SEO Optimizado|Enfoque en Conversión', en: 'Responsive Design|Fast Loading|SEO Optimized|Conversion Focused' },
  service_full_desc: { es: 'Sitios web completos de múltiples páginas con funcionalidad personalizada, perfectos para empresas que necesitan una presencia online integral.', en: 'Full multi-page websites with custom functionality, perfect for businesses needing a comprehensive online presence.' },
  service_full_features: { es: 'Diseño Multi-página|Funciones Personalizadas|Optimizado para Móvil', en: 'Multi-page Design|Custom Features|Mobile Optimized' },
  service_blog_desc: { es: 'Plataformas de blog dinámicas con sistemas de gestión de contenido, perfectas para compartir tu experiencia y construir tu audiencia.', en: 'Dynamic blog platforms with content management systems, perfect for sharing expertise and building your audience.' },
  service_blog_features: { es: 'Integración CMS|Compartir en Redes|Sistema de Comentarios|SEO Preparado', en: 'CMS Integration|Social Sharing|Comment System|SEO Ready' },
  service_ecom_desc: { es: 'Tiendas online completas con procesamiento seguro de pagos, gestión de inventario y sistemas de cuentas de clientes.', en: 'Complete online stores with secure payment processing, inventory management and customer accounts.' },
  service_ecom_features: { es: 'Pasarela de Pago|Sistema de Inventario|Gestión de Pedidos|Cuentas de Clientes', en: 'Payment Gateway|Inventory System|Order Management|Customer Accounts' },
  service_price_from: { es: 'Desde', en: 'From' },
  portfolio_title: { es: 'Nuestro Portafolio', en: 'Our Portfolio' },
  portfolio_subtitle: { es: 'Descubre nuestros últimos trabajos y proyectos exitosos', en: 'Discover our latest work and successful projects' },
  portfolio_item_ecom_desc: { es: 'Tienda online moderna con integración de pagos', en: 'Modern online shop with payment integration' },
  portfolio_item_site_desc: { es: 'Sitio web empresarial profesional con CMS', en: 'Professional corporate website with CMS' },
  portfolio_item_blog_desc: { es: 'Sistema de gestión de contenido con editor avanzado', en: 'Content management system with advanced editor' },
  portfolio_item_landing_desc: { es: 'Diseño de página de aterrizaje de alta conversión', en: 'High conversion landing page design' },
  portfolio_view_project: { es: 'Ver Proyecto →', en: 'View Project →' },
  contact_title: { es: 'Contáctanos', en: 'Contact Us' },
  contact_subtitle: { es: '¿Listo para dar vida a tu visión? Hablemos sobre tu proyecto y creemos algo increíble juntos.', en: 'Ready to bring your vision to life? Let’s talk about your project and build something amazing together.' },
  contact_location: { es: 'Ubicación', en: 'Location' },
  contact_location_val: { es: 'Remoto y Local\nDisponible en Todo el Mundo', en: 'Remote & Local\nAvailable Worldwide' },
  contact_email: { es: 'Email', en: 'Email' },
  contact_email_val: { es: 'pxgnsolutions@gmail.com\nRespuesta rápida garantizada', en: 'pxgnsolutions@gmail.com\nFast response guaranteed' },
  contact_phone: { es: 'Teléfono', en: 'Phone' },
  contact_phone_val: { es: '+(52) 222-332-5067\nLun - Sab, 9AM - 6PM', en: '+(52) 222-332-5067\nMon - Sat, 9AM - 6PM' },
  contact_availability: { es: 'Disponibilidad', en: 'Availability' },
  contact_availability_val: { es: 'Soporte 24/7\nEntrega rápida', en: '24/7 Support\nFast delivery' },
  contact_full_name: { es: 'Nombre Completo *', en: 'Full Name *' },
  contact_full_name_ph: { es: 'Ingresa tu nombre completo', en: 'Enter your full name' },
  contact_email_label: { es: 'Correo Electrónico *', en: 'Email *' },
  contact_email_ph: { es: 'tu.correo@ejemplo.com', en: 'your.email@example.com' },
  contact_phone_label: { es: 'Número de Teléfono *', en: 'Phone Number *' },
  contact_phone_ph: { es: '+(52) 123-456-7890', en: '+(52) 123-456-7890' },
  contact_service_label: { es: 'Servicio de Interés *', en: 'Service of Interest *' },
  contact_service_select: { es: 'Selecciona un servicio', en: 'Select a service' },
  contact_service_lp: { es: 'Landing Page', en: 'Landing Page' },
  contact_service_fw: { es: 'Full web', en: 'Full web' },
  contact_service_blog: { es: 'Blog', en: 'Blog' },
  contact_service_ecom: { es: 'E-commerce', en: 'E-commerce' },
  contact_service_maint: { es: 'Mantenimiento Web', en: 'Web Maintenance' },
  contact_service_other: { es: 'Otro', en: 'Other' },
  contact_project_details: { es: 'Detalles del Proyecto', en: 'Project Details' },
  contact_project_details_ph: { es: 'Cuéntanos sobre tu proyecto, cronograma y cualquier requisito específico...', en: 'Tell us about your project, timeline and any specific requirements...' },
  contact_btn_sending: { es: 'Enviando...', en: 'Sending...' },
  contact_btn_send: { es: 'Enviar Mensaje', en: 'Send Message' },
  contact_success: { es: '✅ ¡Gracias! Tu mensaje ha sido enviado exitosamente. Nos contactaremos contigo pronto.', en: '✅ Thank you! Your message has been sent successfully. We will contact you soon.' },
  contact_error: { es: '❌ Algo salió mal. Por favor intenta de nuevo.', en: '❌ Something went wrong. Please try again.' },
  lang_es: { es: 'Español', en: 'Spanish' },
  lang_en: { es: 'English', en: 'Inglés' },
  lang_switch_hint: { es: 'Idioma', en: 'Language' }
};

const LanguageContext = createContext({ lang: 'es', setLang: () => {}, t: (k) => k });

export const LanguageProvider = ({ initial = 'es', children }) => {
  const [lang, setLang] = useState(initial);
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar idioma de la URL al cargar
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langFromUrl = pathSegments[0];
    
    if (langFromUrl === 'en' || langFromUrl === 'es') {
      setLang(langFromUrl);
    } else {
      setLang('es'); // Español por defecto
    }
  }, [location.pathname]);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    if (newLang === 'es') {
      navigate('/', { replace: true });
    } else {
      navigate(`/${newLang}`, { replace: true });
    }
  };

  const t = useCallback((key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.es || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useI18n = () => useContext(LanguageContext);
