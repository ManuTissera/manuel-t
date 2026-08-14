import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import logoComplete from '../assets/asstes/logos/Logo-Complete.png';
import imagenBalanza from "../assets/asstes/imagen_balanza.png";
import img01 from "../assets/asstes/photo_01.png";
import img02 from "../assets/asstes/photo_02.png";
import img03 from "../assets/asstes/photo_03.png";

const attorneys = [
  {
    id: 1,
    image: img01,
    name: "Josefina Campos Quintanilla",
    role: "Abogada Familiar",
  },
  {
    id: 2,
    image: img02,
    name: "Cristina Morales",
    role: "Directora",
  },
  {
    id: 3,
    image: img03,
    name: "Lurdes Campos Quintanilla",
    role: "Abogada Penal",
  },
];

const HomeOne = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_6vpfhme',
      'template_ycy7cy7',
      form.current,
      'uTu5W6-uGRyVzbW9n'
    )
    .then(() => {
      alert('¡Mensaje enviado con éxito!');
      form.current.reset();
    })
    .catch((error) => {
      alert('Error al enviar: ' + error.text);
    });
  };

  return (
    <div className="juristo-page" >
      {/* ===== HEADER ===== */}
      <header className="juristo-header">
        <div className="juristo-container header-inner">


          <div className="header-logo-container">
            <img src={logoComplete} alt="Logo" />
          </div>


          <nav className="main-nav">
            <ul>
              <li className="active">
                <a href="#inicio-id">Inicio</a>
              </li>
              <li>
                <a href="/lawyer/about_us">Sobre Nosotros</a>
              </li>
              <li>
                <a href="/lawyer/home_01">Practicas</a>
              </li>
              {/* <li>
                <a href="/shop">Shop</a>
              </li> */}
              <li>
                <a href="/lawyer/home_01">Pages</a>
              </li>
              {/* <li>
                <a href="/blog">Blog</a>
              </li> */}
              <li>
                <a href="#contact-id" >Contacto</a>
              </li>
            </ul>
          </nav>


        {/* ------  ICONOS  DEL  PERFIL  ------- */}
        
          {/* <div className="header-icons">
            <button className="icon-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="icon-btn" aria-label="Cart">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="21" r="1" fill="currentColor" />
                <circle cx="18" cy="21" r="1" fill="currentColor" />
              </svg>
            </button>
          </div> */}
        </div>
      </header>
        
        
        {/* ==== SCROLL CONTAINER ==== */}
        <div style={{ 
          scrollSnapType: 'y mandatory', 
          overflowY: 'scroll', 
          height: '100vh' 
        }}>

                {/* ===== HERO ===== */}
              <section
                className="hero-section"
                // id="inicio-id" style={{ scrollMarginTop: '10px' }}
                id="inicio-id"
                style={{ 
                  backgroundImage: `url(${imagenBalanza})`,
                  scrollSnapAlign: 'start',
                  scrollMarginTop: '100px' 
                  // height: '100vh' 
                }}
              >
                  <div className="hero-overlay" />
                  <div className="juristo-container hero-content">
                  <h1>Experiencia en familia y patrimonio</h1>
                  <h4>Trato personal y sin intermediarios</h4>
                  <a href="#contact-id" className="hero-link" >Hacenos tu consulta</a>
                    {/* <p className="breadcrumb">
                      <a href="/">Home</a> <span>&gt;</span> <span>Attorneys</span>
                    </p> */}
                  </div>
                </section>
                    
                {/* ===== MEET OUR EXPERTS ===== */}
                <section className="experts-section" style={{ scrollSnapAlign: 'start', height: '100vh' }}>
                  <div className="juristo-container">
                    <div className="experts-header">
                      <div>
                        <span className="eyebrow">Expriencia Calificada</span>
                        <h2>Nuestro Equipo</h2>
                      </div>
                    
                      {/* <div className="experts-nav">
                        <button className="nav-arrow" aria-label="Previous">
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              d="M15 18l-6-6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button className="nav-arrow" aria-label="Next">
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              d="M9 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div> */}
                    </div>
                      
                    <div className="experts-grid">
                      {attorneys.map((attorney) => (
                        <div className="expert-card" key={attorney.id}>
                          <div className="expert-image">
                            <img src={attorney.image} alt={attorney.name} />
                          </div>
                          <div className="expert-info">
                            <h3>{attorney.name}</h3>
                            <span className="expert-role">{attorney.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                    
                    
                {/* ==== FORM ==== */}
                <section id="contact-id" style={{ scrollMarginTop: '50px', scrollSnapAlign: 'start', height: '150vh' }} className="container">     
     
                <div className="contact-container">
                  <h2 className="contact-title">Contacto</h2>
                    
                  <div className="contact-grid">
                    {/* ===== LEFT: GET IN TOUCH ===== */}
                    <div className="contact-info">
                      <h3>Datos de contacto</h3>
                      <span className="contact-underline" />
                    
                      <ul className="contact-list">
                        <li>
                          <span className="contact-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="12" cy="9.5" r="2.4" fill="currentColor" />
                            </svg>
                          </span>
                          <span>J. Martí 117, X5151 La Calera, Córdoba</span>
                        </li>
                    
                        <li>
                          <span className="contact-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <rect
                                x="3"
                                y="5"
                                width="18"
                                height="14"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <path
                                d="M3 7l9 6 9-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>negra@gmail.com</span>
                        </li>
                    
                        <li>
                          <span className="contact-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>(+255) 9032 - 228 - 12</span>
                        </li>
                    
                        <li>
                          <span className="contact-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M20.5 12a8.5 8.5 0 1 1-3.9-7.15L20 3l-1.05 3.65A8.47 8.47 0 0 1 20.5 12z"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 8.8s.5-1 1.3-.8c.6.15 1 .9 1.3 1.4.25.4.1.7-.1 1-.3.4-.6.6-.4 1s1.5 2.1 2.6 2.6c.4.2.6-.1 1-.4.3-.2.6-.35 1-.1.5.3 1.25.7 1.4 1.3.2.8-.8 1.3-.8 1.3-1.2.7-2.7-.1-4.1-1.1-1.4-1-2.5-2.2-3.1-3.4-.6-1.2-.7-2.1-.1-2.8z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                          <span>(+250) 7102 - 339 - 05</span>
                        </li>
                    
                        <li>
                          <span className="contact-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="5"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                              />
                              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                            </svg>
                          </span>
                          <span>@estudiomoralesyasoc</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* ===== RIGHT: FORM ===== */}
                    <form ref={form} className="contact-form" onSubmit={sendEmail}>
                      <input type="text" name="nombre" placeholder="Nombre" required />
                      <input type="tel" name="telefono" placeholder="Numero" />
                      <input type="email" name="email" placeholder="Email" required />
                      <textarea name="mensaje" placeholder="Contanos tu situación" rows="6" required />

                      <button type="submit" className="contact-submit">
                        Enviar Mensaje
                      </button>
                    </form>
                  </div>

                  {/* ===== GOOGLE MAPS ===== */}
                  <div className="contact-map">
                    <iframe
                      title="Ubicación del estudio"
                      
                      src="https://www.google.com/maps?q=J.+Marti+117,+La+Calera,+Cordoba,+Argentina&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                    
                  <p className="contact-powered">
                    <span className="contact-dot" /> Powered by Juristo
                  </p>
                </div>
              </section>





      {/* ===== FOOTER ===== */}
      <footer className="juristo-footer" style={{ scrollMarginTop: '50px', scrollSnapAlign: 'start', height: '150vh' }}>
        <div className="juristo-container footer-grid">
          <div className="footer-col footer-about">
            <a href="/" className="logo footer-logo">
              <span className="logo-icon">⚖</span>
              <span className="logo-text">Juristo</span>
            </a>
            <p>
              Programa una visita hoy mismo para explorar nuestro acogedor
              espacio, conectar con nuestro equipo y descubrir los beneficios de
              unirte a nosotros.
            </p>
            <div className="social-icons">
              <a href="/" aria-label="Facebook">
                f
              </a>
              <a href="/" aria-label="Twitter">
                t
              </a>
              <a href="/" aria-label="LinkedIn">
                in
              </a>
              <a href="/" aria-label="Pinterest">
                p
              </a>
            </div>
          </div>
          
          
          <div className="footer-col">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li>
                <a href="/about">Nosotros</a>
              </li>
              <li>
                <a href="/cases">Casos</a>
              </li>
              <li>
                <a href="/practice">Áreas de Práctica</a>
              </li>
              <li>
                <a href="/pricing">Precios</a>
              </li>
              <li>
                <a href="/contact">Contacto</a>
              </li>
            </ul>
          </div>


          <div className="footer-col">
            <h4>Áreas de Práctica</h4>
            <ul>
              <li>
                <a href="/business-law">Derecho Empresarial</a>
              </li>
              <li>
                <a href="/family-law">Derecho de Familia</a>
              </li>
              <li>
                <a href="/criminal-law">Derecho Penal</a>
              </li>
              <li>
                <a href="/personal-injury">Lesiones Personales</a>
              </li>
              <li>
                <a href="/education-law">Derecho Educativo</a>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-newsletter">
            <h4>Newsletter</h4>
              <p>Recibirás una notificación cuando aparezca algo nuevo.</p>            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address *" />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <a href="/" className="theme-link">
              www.Morales&Asociados.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Copyright 2023 | Juristo - Lawyer WordPress Theme | All right reserved.</p>
        </div>
      </footer>

      </div>





    </div>
  );
};

export default HomeOne;