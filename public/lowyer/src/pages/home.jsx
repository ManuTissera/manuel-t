




function Home() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <header className="topbar">
        <div className="logo"></div>

        <nav className="nav">
          <a href="#">Quienes somos?</a>
          <a href="#">Attorney Information</a>
          <a href="#">Areas de Practica</a>
          <a href="#">Contactos</a>
        </nav>
      </header>

      <div className="hero-content">
        <h1>
          Mediacion &<br />
          Derechos de Familia
        </h1>

        <div className="specializations">
          <p>Áreas de Práctica</p>

          <div className="specializations-list">
            <span>Derecho de las Familias</span>
            <span>Mediaciones Civiles y Familiares</span>
            <span>Gestión de Propiedades</span>
            <span>Derecho Laboral</span>
          </div>
        </div>

        <a href="#" className="learn-more">
          Ver Mas <span>&rsaquo;</span>
        </a>
      </div>

      <footer className="hero-footer">
        <span>© 2024 Law Office of X. Present Beardsley, P.C.</span>

        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Attorney Information</a>
          <a href="#">Practice Areas</a>
          <a href="#">Representative Clients</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </section>
  );
}

export default Home;