import './App.css'

const products = [
  {
    id: 'ethanol',
    title: 'Ethanol',
    subtitle: 'Power that stays consistent pull after pull.',
    description:
      'Race-proven ethanol fuel built for repeatable performance in boosted and high-compression platforms.',
    image: '/media/ETHANOL-bg-scaled.png',
    button: 'Explore Ethanol',
  },
  {
    id: 'wheels',
    title: 'Wheels',
    subtitle: 'Forgeline fitment with motorsport intent.',
    description:
      'Forged wheel options engineered for track abuse while still looking elite on the street and at events.',
    image: '/media/wheels-bg-scaled.png',
    button: 'Explore Wheels',
  },
]

function App() {
  return (
    <div className="site">
      <header className="topbar">
        <a href="#home" className="brand" aria-label="M Racing home">
          <img src="/media/M-Racing-Logo-no-tag.png" alt="M Racing" />
        </a>
        <nav className="nav">
          <a href="#products">Products</a>
          <a href="#record">Record</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <video
            className="hero-video"
            src="/media/M-Racing-home.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-overlay" />
          <div className="hero-content container">
            <p className="eyebrow">The Speed of Winning</p>
            <h1>World's Quickest Huracan. Built by M Racing.</h1>
            <p className="lead">
              We build Lamborghini performance systems that break records, back
              it up with data, and dominate when it matters.
            </p>
            <div className="cta-row">
              <a href="#products" className="btn btn-primary">
                Build Your Setup
              </a>
              <a href="#contact" className="btn btn-secondary">
                Talk to the Team
              </a>
            </div>
          </div>
        </section>

        <section id="record" className="record container">
          <div className="record-copy">
            <p className="eyebrow">Record-Breaking Performance</p>
            <h2>Purpose-built twin turbo engineering.</h2>
            <p>
              From fabrication and calibration to track validation, every M
              Racing package is developed for fast, stable, repeatable results.
            </p>
            <div className="stats">
              <article>
                <h3>1/4 Mile</h3>
                <p>World benchmark setting pass.</p>
              </article>
              <article>
                <h3>In-House</h3>
                <p>Fabrication and tuning under one roof.</p>
              </article>
              <article>
                <h3>Data-Driven</h3>
                <p>Calibrations built for consistency, not dyno bragging.</p>
              </article>
            </div>
          </div>
          <div className="record-media">
            <img src="/media/Group-15-scaled.png" alt="M Racing engineered supercar" />
          </div>
        </section>

        <section id="products" className="products container">
          <p className="eyebrow">Performance Systems</p>
          <h2>Choose your weapon.</h2>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />
                <div className="product-card-content">
                  <h3>{product.title}</h3>
                  <p className="sub">{product.subtitle}</p>
                  <p>{product.description}</p>
                  <a href="#contact" className="text-link">
                    {product.button}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="split-media">
          <div className="split-item">
            <video
              src="/media/M-Racing-Wheels.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="split-caption">Forgeline Wheel Program</div>
          </div>
          <div className="split-item">
            <img src="/media/OneEthanolR.jpg" alt="Ethanol One fuel product" />
            <div className="split-caption">Ethanol One Fuel Delivery</div>
          </div>
        </section>

        <section id="about" className="about container">
          <div className="about-badge">
            <img
              src="/media/M-Racing-Logo-no-tag-white-vertical-2.png"
              alt="M Racing vertical logo"
            />
          </div>
          <div>
            <p className="eyebrow">About M Racing</p>
            <h2>Built by racers for racers.</h2>
            <p>
              M Racing blends motorsport fabrication, track development, and ECU
              strategy into complete systems for exotic and high-horsepower
              platforms. Every part we offer is selected to perform when
              conditions are real and pressure is high.
            </p>
            <div className="chip-row">
              <span>Twin Turbo Platforms</span>
              <span>Track Validation</span>
              <span>Custom Calibration</span>
              <span>Street + Strip Reliability</span>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <img
            className="contact-bg"
            src="/media/contact-bg-scaled.png"
            alt=""
            aria-hidden="true"
          />
          <div className="contact-overlay" />
          <div className="contact-content container">
            <p className="eyebrow">Ready to go faster?</p>
            <h2>Let's build your next record run.</h2>
            <p>
              Tell us your platform, power goals, and timeline. We will map the
              right setup for your build.
            </p>
            <a className="btn btn-primary" href="mailto:info@mracing.biz">
              Contact M Racing
            </a>
            <address>
              M Racing LLC
              <br />
              1234 State Street
              <br />
              Rockford, IL 61107
            </address>
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src="/media/flag_sleeve-6.png" alt="" aria-hidden="true" />
        <p>M Racing LLC - All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
