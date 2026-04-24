import './App.css'

const products = [
  {
    id: 'ethanol',
    title: 'Ethanol',
    subtitle: 'Power that stays consistent pull after pull.',
    description:
      'Race-proven ethanol fuel supplied for repeatable performance in boosted and high-compression platforms.',
    media: '/media/OneEthanolR.jpg',
    mediaType: 'image',
    button: 'Explore Ethanol',
  },
  {
    id: 'wheels',
    title: 'Wheels',
    subtitle: 'Forgeline fitment with motorsport intent.',
    description:
      'Forged wheel options supplied for track abuse while still looking elite on the street and at events.',
    media: '/media/M-Racing-Wheels.mp4',
    mediaType: 'video',
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
            <h1>World's Quickest Huracan. Powered by M Racing Supply.</h1>
            <p className="lead">
              We supply elite racing fuel and forged wheels trusted by teams
              setting world records when it matters most.
            </p>
            <p className="lead about-inline">
              M Racing is a performance supplier specializing in premium racing
              fuel and forged wheels for exotic and high-horsepower platforms.
            </p>
          </div>
        </section>

        <section id="record" className="record container">
          <div className="record-copy">
            <p className="eyebrow">Record-Breaking Performance</p>
            <h2>Proven products behind world-class passes.</h2>
            <p>
              From drag strips to high-speed events, M Racing supplies ethanol
              and wheel packages that support fast, stable, repeatable results.
            </p>
            <div className="stats">
              <article>
                <h3>1/4 Mile</h3>
                <p>World benchmark setting pass.</p>
              </article>
              <article>
                <h3>Supplier Grade</h3>
                <p>Premium fuel and wheel inventory ready to deliver.</p>
              </article>
              <article>
                <h3>Track-Proven</h3>
                <p>Products trusted by championship and record-level teams.</p>
              </article>
            </div>
          </div>
          <div className="record-media">
            <img src="/media/Group-15-scaled.png" alt="World-record supercar using M Racing products" />
          </div>
        </section>

        <section id="products" className="products container">
          <p className="eyebrow">Performance Systems</p>
          <h2>Choose your weapon.</h2>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                {product.mediaType === 'video' ? (
                  <video
                    src={product.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={product.title}
                  />
                ) : (
                  <img src={product.media} alt={product.title} />
                )}
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
            <h2>Let's supply your next record run.</h2>
            <p>
              Tell us your platform, power goals, and timeline. We will match
              you with the right fuel and wheel setup.
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
