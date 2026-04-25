import { useState } from 'react'
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
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [intake, setIntake] = useState({
    firstName: '',
    phone: '',
    email: '',
    requestType: '',
    message: '',
  })

  const updateField = (event) => {
    const { name, value } = event.target
    setIntake((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
    if (submitMessage) {
      setSubmitMessage('')
      setSubmitStatus('idle')
    }
  }

  const nextStep = () => {
    if (step === 1) {
      if (!intake.firstName.trim() || !intake.phone.trim() || !intake.email.trim()) {
        setError('Please fill in first name, phone number, and email to continue.')
        return
      }
    }

    if (step === 2 && !intake.requestType) {
      setError('Please select Wheels or Fuel to continue.')
      return
    }

    setStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setError('')
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const submitIntake = async () => {
    if (step !== 3 || submitStatus === 'loading') return

    setSubmitStatus('loading')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(intake),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to send intake right now.')
      }

      setSubmitStatus('success')
      setSubmitMessage('Intake sent successfully. We will reach out shortly.')
      setStep(1)
      setIntake({
        firstName: '',
        phone: '',
        email: '',
        requestType: '',
        message: '',
      })
    } catch (submitError) {
      setSubmitStatus('error')
      setSubmitMessage(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to send intake right now.',
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (step < 3) {
      nextStep()
      return
    }
    submitIntake()
  }

  return (
    <div className="site">
      <header className="topbar">
        <a href="#home" className="brand" aria-label="M Racing home">
          <img src="/media/M-Racing-Logo-no-tag.png" alt="M Racing" />
        </a>
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
              <article className={`product-card product-card--${product.id}`} key={product.id}>
                <div className="product-media">
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
                </div>
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
            <h2>Ready to go faster?</h2>
            <p>
              Complete the quick intake below and we will contact you with the
              right fuel or wheel recommendation.
            </p>
            <form className="intake-form" onSubmit={handleSubmit}>
              <div className="intake-steps" aria-label="Intake form steps">
                <span className={step >= 1 ? 'active' : ''}>1. Contact</span>
                <span className={step >= 2 ? 'active' : ''}>2. Product</span>
                <span className={step >= 3 ? 'active' : ''}>3. Message</span>
              </div>

              {step === 1 && (
                <div className="intake-panel">
                  <label>
                    First Name
                    <input
                      type="text"
                      name="firstName"
                      value={intake.firstName}
                      onChange={updateField}
                      placeholder="John"
                    />
                  </label>
                  <label>
                    Phone Number
                    <input
                      type="tel"
                      name="phone"
                      value={intake.phone}
                      onChange={updateField}
                      placeholder="(555) 555-5555"
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      value={intake.email}
                      onChange={updateField}
                      placeholder="name@example.com"
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="intake-panel">
                  <p className="field-label">What do you need?</p>
                  <label className="choice">
                    <input
                      type="radio"
                      name="requestType"
                      value="Wheels"
                      checked={intake.requestType === 'Wheels'}
                      onChange={updateField}
                    />
                    Wheels
                  </label>
                  <label className="choice">
                    <input
                      type="radio"
                      name="requestType"
                      value="Fuel"
                      checked={intake.requestType === 'Fuel'}
                      onChange={updateField}
                    />
                    Fuel
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="intake-panel">
                  <label>
                    Message
                    <textarea
                      name="message"
                      value={intake.message}
                      onChange={updateField}
                      placeholder="Tell us your platform, goals, and timeline..."
                      rows={5}
                    />
                  </label>
                </div>
              )}

              {error && <p className="form-error">{error}</p>}

              <div className="intake-actions">
                {step > 1 && (
                  <button
                    type="button"
                    className="btn-secondary-form"
                    onClick={prevStep}
                    disabled={submitStatus === 'loading'}
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    className="btn-primary-form"
                    onClick={nextStep}
                    disabled={submitStatus === 'loading'}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary-form"
                    onClick={submitIntake}
                    disabled={submitStatus === 'loading'}
                  >
                    {submitStatus === 'loading' ? 'Sending...' : 'Submit Intake'}
                  </button>
                )}
              </div>
              {submitMessage && (
                <p className={`submit-note submit-note--${submitStatus}`}>
                  {submitMessage}
                </p>
              )}
            </form>
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
