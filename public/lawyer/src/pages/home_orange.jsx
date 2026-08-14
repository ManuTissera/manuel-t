







export default function HomeOrange() {
  const practiceAreas = [
    "DERECHO FAMILIAR",
    "PENAL",
    "LABORAL",
    "INMOBILIARIA",
    "ACCIDENTES",
    "ART",
  ];

  return (
    <div className="home-law">
      <header className="topbar">
        {/* <div className="topbar-overlay"></div> */}

        <nav className="navbar">
          <div className="logo"></div>

          <ul className="nav-links">
            <li><a href="#about">Quienes somos?</a></li>
            <li><a href="#practice">Areas Practicas</a></li>
            <li><a href="#contact">Contacto</a></li>
            <li><a href="#other">Otro</a></li>
          </ul>
        </nav>
      </header>

      <main className="hero-section">
        <button className="hero-arrow hero-arrow-left">{`<`}</button>

        <div className="hero-content">
          <div className="hero-icon">⚖</div>
          <p className="hero-subtitle">We are experts in</p>
          <h1 className="hero-title">Business litigation</h1>
          <p className="hero-description">
            WITH OVER 35 YEARS OF LAW PRACTICE IN USA COURTS
          </p>
          <button className="hero-btn">CONTACT US NOW</button>
        </div>

        <button className="hero-arrow hero-arrow-right">{`>`}</button>
      </main>

      <section className="services-bar">
        {practiceAreas.map((item, index) => (
          <div className="service-item" key={index}>
            <div className="service-icon">◎</div>
            <span>{item}</span>
          </div>
        ))}
      </section>
    </div>
  );
}