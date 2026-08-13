import React from "react";


import logoComplete from '../assets/asstes/logos/Logo-Complete.png';

import img01 from "../assets/asstes/photo_01.png";
import img02 from "../assets/asstes/photo_02.png";
import img03 from "../assets/asstes/photo_03.png";

const lawyers = [
  {
    id: 1,
    image: img01,
    name: "Cristina Morales",
    title: "Abogada Penalista",
    bio: [
      "Con más de 12 años de trayectoria, Jerome se especializa en derecho penal, defendiendo casos complejos con una estrategia meticulosa y un profundo conocimiento del sistema judicial.",
      "Su enfoque combina firmeza en la sala de audiencias con un trato cercano hacia cada cliente, asegurando que sus derechos sean protegidos en todo momento.",
    ],
  },
  {
    id: 2,
    image: img02,
    name: "Josefina Campos Quintanilla",
    title: "Abogado Criminalista",
    bio: [
      "Josefina es reconocida por su capacidad analítica y su experiencia en litigios de alto perfil, habiendo representado a clientes en más de 200 casos con resultados favorables.",
      "Quiso cobrar un choque por el valor de un auto y perdio el jucio.",
    ],
  },
  {
    id: 3,
    image: img03,
    name: "Lourdes Campos Quintanilla",
    title: "Abogada de Familia",
    bio: [
      "Lourdes acompaña a sus clientes en los momentos más delicados de su vida personal, ofreciendo asesoría en divorcios, custodias y acuerdos patrimoniales con empatía y profesionalismo.",
      "Cree firmemente en la mediación como herramienta para resolver conflictos familiares de manera justa y humana, evitando procesos innecesariamente desgastantes.",
    ],
  },
];

const AboutUs = () => {
  return (
    <div className="juristo-page">
      {/* ===== HEADER ===== */}
      <header className="juristo-header">
        <div className="juristo-container header-inner">

          <div className="header-logo-container">
            <img src={logoComplete} alt="Logo" />
          </div>


          <nav className="main-nav">
            <ul>
              <li className="active">
                <a href="/home_01">Inicio</a>
              </li>
              <li>
                <a href="/about_us">Sobre Nosotros</a>
              </li>
              <li>
                <a href="/home_01">Practicas</a>
              </li>
              {/* <li>
                <a href="/shop">Shop</a>
              </li> */}
              <li>
                <a href="/home_01">Pages</a>
              </li>
              {/* <li>
                <a href="/blog">Blog</a>
              </li> */}
              <li>
                <a href="/home_01#contact-id" >Contacto</a>
              </li>
            </ul>
          </nav>


        </div>
      </header>

      {/* ===== ABOUT SECTIONS ===== */}
      <main>
        {lawyers.map((lawyer, index) => (
          <section
            className={`lawyer-section ${
              index % 2 === 1 ? "lawyer-section--reverse" : ""
            }`}
            key={lawyer.id}
          >
            <div className="lawyer-image">
              <img src={lawyer.image} alt={lawyer.name} />
            </div>

            <div className="lawyer-content">
              <span className="lawyer-eyebrow">Nuestro Equipo</span>
              <h2 className="lawyer-name">{lawyer.name}</h2>
              <span className="lawyer-title">{lawyer.title}</span>
              <span className="lawyer-underline" />

              {lawyer.bio.map((paragraph, i) => (
                <p className="lawyer-bio" key={i}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </main>



      {/* ===== FOOTER ===== */}
      <footer className="juristo-footer">
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
  );
};

export default AboutUs;
