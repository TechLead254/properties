import React, { useState, useEffect } from "react";
import {
  fallbackServices,
  fallbackProjects,
  fallbackPricing,
  fallbackFAQs,
  fallbackTestimonials,
  fallbackArticles
} from "../data/dashboardFallback";

export default function PublicSite({ onRouteToAdmin }) {
  const [filter, setFilter] = useState("all");
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("software-dev");
  const [formBudget, setFormBudget] = useState("$2,000 - $5,000");
  const [formDetails, setFormDetails] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryLead, setInquiryLead] = useState(null);

  // Dynamic Chart Value Simulation (to make dashboard visual feel alive)
  const [chartTrigger, setChartTrigger] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setChartTrigger((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Pricing trigger to select package and scroll to form
  const handleSelectPackage = (packageName, price) => {
    let matchedService = "software-dev";
    if (packageName.toLowerCase().includes("seo")) matchedService = "seo-growth";
    if (packageName.toLowerCase().includes("startup")) matchedService = "web-dev";
    if (packageName.toLowerCase().includes("growth")) matchedService = "software-dev";
    if (packageName.toLowerCase().includes("enterprise")) matchedService = "cloud-devops";
    
    setFormService(matchedService);
    setFormBudget(packageName === "Enterprise Custom" ? "Custom (Negotiated)" : `$${price}`);
    setFormDetails(`I am interested in getting started with the '${packageName}' package (${price}).`);
    
    // Scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    const newLead = {
      id: Date.now().toString(),
      name: formName,
      email: formEmail,
      service: formService,
      budget: formBudget,
      details: formDetails,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      status: "New"
    };

    // Save to LocalStorage
    try {
      const existing = localStorage.getItem("techdon_leads");
      const leads = existing ? JSON.parse(existing) : [];
      leads.unshift(newLead);
      localStorage.setItem("techdon_leads", JSON.stringify(leads));
    } catch (err) {
      console.error("Local storage lead write failed:", err);
    }

    setInquiryLead(newLead);
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormService("software-dev");
    setFormBudget("$2,000 - $5,000");
    setFormDetails("");
    setFormSubmitted(false);
    setInquiryLead(null);
  };

  // Pre-filled WhatsApp link generator
  const getWhatsAppLink = () => {
    if (!inquiryLead) return "#";
    const phone = "254700000000"; // Techdon support phone
    const serviceLabel = fallbackServices.find(s => s.id === inquiryLead.service)?.title || inquiryLead.service;
    const text = encodeURIComponent(
      `Hello Techdon Solutions!\n\nI have just submitted a proposal request on your website.\n\n*Name:* ${inquiryLead.name}\n*Email:* ${inquiryLead.email}\n*Requested Service:* ${serviceLabel}\n*Est. Budget:* ${inquiryLead.budget}\n*Project Details:* ${inquiryLead.details}\n\nI would love to get a custom proposal and discuss the next steps.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  // Icons Helper
  const renderIcon = (name) => {
    switch (name) {
      case "code":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "cpu":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="15" x2="23" y2="15" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="15" x2="4" y2="15" />
          </svg>
        );
      case "palette":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5 21.5 11 21 11H18.5C17.6716 11 17 10.3284 17 9.5C17 9.08 17.17 8.7 17.44 8.44C17.78 8.1 18 7.6 18 7C18 5.89543 14.866 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 22 12 22Z" />
            <circle cx="7.5" cy="10.5" r="1.5" />
            <circle cx="11.5" cy="7.5" r="1.5" />
            <circle cx="16.5" cy="9.5" r="1.5" />
          </svg>
        );
      case "trending-up":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        );
      case "search":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        );
      case "cloud":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredProjects = filter === "all"
    ? fallbackProjects
    : fallbackProjects.filter(p => p.category === filter);

  return (
    <div className="app-container">
      {/* Background Decorative Glow Orbs */}
      <div className="glow-orb" style={{ top: "10%", left: "5%" }}></div>
      <div className="glow-orb-cyan" style={{ top: "40%", right: "5%" }}></div>
      <div className="glow-orb" style={{ bottom: "10%", left: "10%" }}></div>

      {/* Header / Navbar */}
      <header className="navbar">
        <a href="#top" className="nav-logo">
          <div className="logo-glow-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span>Techdon</span>
        </a>

        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Navigation">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <nav className={`nav-links ${isMobileMenuOpen ? "active-mobile" : ""}`}>
          <a href="#services" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#portfolio" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Showcase</a>
          <a href="#testimonials" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
          <a href="#pricing" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a href="#about" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Company</a>
          <a href="#faq" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
          <a href="#blog" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Articles</a>
          <button onClick={() => { onRouteToAdmin(); setIsMobileMenuOpen(false); }} className="nav-item" style={{ background: "none", border: "none", cursor: "pointer" }}>CRM Login</button>
          <a href="#contact" className="nav-cta-btn" onClick={() => setIsMobileMenuOpen(false)}>Get Proposal</a>
        </nav>
      </header>

      {/* CSS injection for mobile drawer fallback */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links.active-mobile {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: var(--header-height);
            left: 0;
            right: 0;
            background: rgba(5, 8, 17, 0.98);
            border-bottom: 1px solid var(--border-mute);
            padding: 30px;
            gap: 20px;
            z-index: 999;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section" id="top">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span style={{ color: "var(--text-secondary)" }}>Pioneering Digital Transformation</span>
          </div>
          <h1 className="hero-title">
            We Build <span className="text-gradient">Autonomous Software</span> & High-Converting Digital Platforms
          </h1>
          <p className="hero-desc">
            Techdon Solutions designs elite web design, custom software, AI automation pipelines, and scalable marketing systems that streamline your operations and maximize conversions.
          </p>
          <div className="hero-actions-container">
            <a href="#contact" className="btn-primary">
              <span>Request Free Proposal</span>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#portfolio" className="btn-secondary">
              <span>View Case Studies</span>
            </a>
          </div>
          
          <div className="trust-elements">
            <div className="trust-avatars">
              <div className="trust-avatar" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80')` }}></div>
              <div className="trust-avatar" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80')` }}></div>
              <div className="trust-avatar" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80')` }}></div>
            </div>
            <div className="trust-text">
              Trusted by <strong>40+ founders</strong>. Average conversion lift of <strong>+35%</strong>.
            </div>
          </div>
        </div>

        {/* Dashboard Visual Mockup Panel */}
        <div className="hero-visual-panel">
          <div className="dashboard-mockup">
            <div className="dashboard-header">
              <div className="window-dots">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
              </div>
              <div className="dashboard-title">OPERATIONS CONTROL PANEL</div>
              <div className="dashboard-status">SYSTEMS ONLINE</div>
            </div>

            <div className="dashboard-grid">
              <div className="metric-box">
                <span className="metric-label">Auto-Attendance Sync</span>
                <span className="metric-value">99.8%</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Fee Reconciliation Speed</span>
                <span className="metric-value" style={{ color: "var(--accent-cyan)", textShadow: "0 0 10px rgba(6, 182, 212, 0.2)" }}>Instant</span>
              </div>
              
              <div className="chart-box">
                <div className="chart-header">
                  <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>Monthly Administrative Time Slashing</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-cyan)" }}>-85% Friction</span>
                </div>
                <div className="chart-bars">
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: chartTrigger ? "100px" : "80px" }}></div>
                    <span className="chart-label">Wk 1</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: chartTrigger ? "110px" : "90px" }}></div>
                    <span className="chart-label">Wk 2</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar secondary" style={{ height: chartTrigger ? "40px" : "30px" }}></div>
                    <span className="chart-label">Wk 3</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar secondary" style={{ height: chartTrigger ? "20px" : "15px" }}></div>
                    <span className="chart-label">Wk 4</span>
                  </div>
                </div>
              </div>

              <div className="live-activity-feed">
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Auto-logs:</span>
                <div className="feed-item">
                  <span className="feed-project">EduSuite School Portal</span>
                  <span className="feed-tag">Attendance Synced</span>
                </div>
                <div className="feed-item">
                  <span className="feed-project">FitGrowth Billing</span>
                  <span className="feed-tag" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#22d3ee" }}>Stripe callback matched</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ background: "rgba(5, 8, 17, 0.6)" }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="section-tag">SERVICES</span>
          <h2 className="section-title">High-Converting Digital Engines</h2>
          <p className="section-subtitle">We design and develop tailor-made pipelines addressing critical operational barriers to accelerate market positioning.</p>
        </div>

        <div className="services-grid">
          {fallbackServices.map((service) => (
            <div key={service.id} className="glass-card service-card">
              <div className="service-icon">
                {renderIcon(service.icon)}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              
              <ul className="service-features-list">
                {service.features.map((feat, index) => (
                  <li key={index} className="service-feature-item">
                    <span className="service-feature-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase / Portfolio Section */}
      <section id="portfolio">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <span className="section-tag">PORTFOLIO</span>
          <h2 className="section-title">Proof in Action: Case Studies</h2>
          <p className="section-subtitle">Read how our engineered designs solve massive operational hurdles, from attendance bottlenecks to conversion deficits.</p>
          
          <div className="portfolio-filter-bar">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All projects</button>
            <button className={`filter-btn ${filter === "software" ? "active" : ""}`} onClick={() => setFilter("software")}>Custom Software</button>
            <button className={`filter-btn ${filter === "web" ? "active" : ""}`} onClick={() => setFilter("web")}>Websites</button>
            <button className={`filter-btn ${filter === "branding" ? "active" : ""}`} onClick={() => setFilter("branding")}>Identity</button>
          </div>
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-img-container">
                <img src={project.image} alt={project.title} className="portfolio-img" />
                <div className="portfolio-overlay">
                  <a href="#contact" className="portfolio-overlay-btn">
                    <span>Inquire About This Service</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="portfolio-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="portfolio-tag">{project.tag}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{project.timeline}</span>
                </div>
                <h3 className="portfolio-title">{project.title}</h3>
                
                {project.isFlagship && (
                  <div className="flagship-badge">FLAGSHIP CASE STUDY</div>
                )}
                
                <p className="portfolio-desc">{project.summary}</p>
                
                {project.isFlagship ? (
                  <div style={{ marginTop: "12px", borderTop: "1px solid var(--border-mute)", paddingTop: "16px" }}>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "#f87171" }}>Critical Pain Points Addressed:</h4>
                    <div className="flagship-bullets">
                      {project.challenges.map((challenge, cIndex) => (
                        <div key={cIndex} className="flagship-bullet-item">
                          <span className="bullet-icon-red">✕</span>
                          <span>{challenge}</span>
                        </div>
                      ))}
                    </div>

                    <h4 style={{ fontSize: "0.95rem", marginTop: "20px", marginBottom: "12px", color: "var(--accent-cyan)" }}>Engineered Solutions Implemented:</h4>
                    <div className="flagship-bullets">
                      {project.solutions.map((solution, sIndex) => (
                        <div key={sIndex} className="flagship-bullet-item">
                          <span className="bullet-icon-cyan" style={{ color: "var(--accent-cyan)", marginRight: "8px", fontWeight: "bold" }}>⚡</span>
                          <span>{solution}</span>
                        </div>
                      ))}
                    </div>

                    <h4 style={{ fontSize: "0.95rem", marginTop: "20px", marginBottom: "12px", color: "#34d399" }}>Our Custom Platform Outcomes:</h4>
                    <div className="flagship-bullets">
                      {project.outcomes.map((outcome, oIndex) => (
                        <div key={oIndex} className="flagship-bullet-item">
                          <span className="bullet-icon-green">✓</span>
                          <strong>{outcome}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      <strong>Client:</strong> {project.client}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      <strong>Key Outcome:</strong> {project.outcomes[0]}
                    </div>
                    {project.solutions && (
                      <div style={{ marginTop: "6px", borderTop: "1px solid var(--border-mute)", paddingTop: "10px" }}>
                        <h4 style={{ fontSize: "0.85rem", marginBottom: "8px", color: "var(--accent-cyan)" }}>Engineered Solutions:</h4>
                        <div className="flagship-bullets" style={{ gap: "4px" }}>
                          {project.solutions.map((solution, sIndex) => (
                            <div key={sIndex} className="flagship-bullet-item" style={{ fontSize: "0.8rem" }}>
                              <span style={{ color: "var(--accent-cyan)", marginRight: "6px" }}>⚡</span>
                              <span>{solution}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ background: "rgba(5, 8, 17, 0.6)", overflow: "hidden" }}>
        <span className="section-tag" style={{ display: "block", margin: "0 auto 16px", width: "fit-content" }}>TESTIMONIALS</span>
        <h2 className="section-title" style={{ textAlign: "center" }}>Loved by Innovators & School Groups</h2>
        <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto 60px" }}>See how Techdon Solutions unlocks hours and converts leads for enterprises globally.</p>

        <div className="testimonials-container">
          {fallbackTestimonials.map((t, idx) => (
            <div key={idx} className="glass-card testimonial-card">
              <div style={{ display: "flex", gap: "4px", color: "#fbbf24" }}>
                {"★★★★★".split("").map((star, sIdx) => (
                  <span key={sIdx}>{star}</span>
                ))}
              </div>
              <p className="testimonial-quote">{t.quote}</p>
              
              <div className="testimonial-author">
                <img src={t.image} alt={t.author} className="author-img" />
                <div className="author-info">
                  <h4>{t.author}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing packages section */}
      <section id="pricing">
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="section-tag">PRICING PACKAGES</span>
          <h2 className="section-title">Transparent Engineering Tiers</h2>
          <p className="section-subtitle">No guessing games. Select a baseline scope below to automatically configure your inquiry portal.</p>
        </div>

        <div className="pricing-grid">
          {fallbackPricing.map((tier) => (
            <div key={tier.id} className={`glass-card pricing-card ${tier.popular ? "popular" : ""}`}>
              {tier.popular && <span className="popular-badge">Most Requested</span>}
              
              <div className="pricing-header">
                <h3>{tier.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{tier.desc}</p>
              </div>

              <div className="pricing-price">
                {tier.price !== "Custom" && <span className="price-currency">$</span>}
                <span className="price-amount">{tier.price}</span>
                {tier.price !== "Custom" && <span className="price-period">/project baseline</span>}
              </div>

              <ul className="pricing-features">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="pricing-feature-item">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" strokeWidth="3" fill="none" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className="btn-primary pricing-btn"
                style={{ background: tier.popular ? "var(--gradient-tech)" : "rgba(255, 255, 255, 0.05)" }}
                onClick={() => handleSelectPackage(tier.name, tier.price)}
              >
                Select {tier.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Company section */}
      <section id="about" style={{ background: "rgba(5, 8, 17, 0.6)" }}>
        <div className="about-container">
          <div>
            <span className="section-tag">ABOUT US</span>
            <h2 className="section-title">Pioneering High-Conversions & Smart Automation</h2>
            <p style={{ marginBottom: "20px", color: "var(--text-secondary)" }}>
              Techdon Solutions was founded on the philosophy that modern business systems should not be bottlenecked by outdated administrative tasks. 
            </p>
            <p style={{ marginBottom: "20px", color: "var(--text-secondary)" }}>
              We merge high-fidelity branding design with deep enterprise software engineering. By implementing automated attendance, central databases, instant reconciliation systems, and advanced SEO keywords, we transform passive business processes into highly automated assets.
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              Our clients aren't buying codes or wireframes; they are investing in compounding time savings, safety, and business conversions.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">40+</div>
              <div className="stat-label">Digital Pipelines Deployed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">8.5K+</div>
              <div className="stat-label">Daily Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Automated Workflows</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">API Integration Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Answering Common Questions</h2>
          <p className="section-subtitle">Clarifying our software build pipelines, automation triggers, and project integrations.</p>
        </div>

        <div className="faq-grid">
          {fallbackFAQs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeFaq === index ? "active" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ background: "rgba(5, 8, 17, 0.4)" }}>
        <div className="contact-container">
          <div className="contact-info-panel">
            <div>
              <span className="section-tag">CONTACT US</span>
              <h2 className="section-title" style={{ marginBottom: "16px" }}>Let's Scope Your Platform</h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Submit your specific operations metrics (or pain points) to receive a custom wireframe overview and system proposal within 24 hours.
              </p>
            </div>

            <div className="contact-method-card">
              <div className="contact-method-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem" }}>Direct Email</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>hello@techdonsolutions.com</p>
              </div>
            </div>

            <div className="contact-method-card">
              <div className="contact-method-icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.012.261 2.001.761 2.871l-.811 2.96 3.029-.794c.834.455 1.77.695 2.721.696h.003c3.181 0 5.768-2.586 5.768-5.767 0-3.18-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.749.771-1.034.821-.285.05-.638.08-1.042-.05-.256-.083-.585-.183-1.011-.363-1.745-.733-2.875-2.506-2.961-2.62-.087-.115-.705-.934-.705-1.782 0-.847.444-1.264.603-1.433.159-.168.347-.211.463-.211.116 0 .232.001.332.005.105.004.246-.04.385.295.145.348.492 1.201.535 1.29.043.088.072.19.014.307-.058.117-.087.19-.174.292-.087.102-.183.228-.261.307-.087.088-.178.183-.077.357.102.174.452.746.969 1.206.666.593 1.229.777 1.402.864.174.088.275.073.377-.044.101-.117.434-.506.55-.681.116-.174.232-.146.39-.087.159.058 1.012.477 1.186.565.174.088.29.131.333.204.043.073.043.424-.103.835zm-3.39 9.667C5.584 24 .25 18.666.25 12.083.25 9.987.797 7.94 1.838 6.136L.25 0l6.333 1.662c1.746-.953 3.71-1.455 5.703-1.458h.005c6.554 0 11.89 5.335 11.892 11.893a11.821 11.821 0 01-3.48 8.413 11.783 11.783 0 01-8.413 3.486z" />
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem" }}>Instant WhatsApp chat</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>+254 700 000 000</p>
              </div>
            </div>
          </div>

          {/* Form Lead Capture */}
          <div className="glass-card">
            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div className="form-toast">
                  <span>✓</span>
                  <span><strong>Lead Captured successfully!</strong> Your proposal request has been logged.</span>
                </div>
                <h3 style={{ fontSize: "1.4rem", margin: "24px 0 12px" }}>Instant WhatsApp Delivery</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "28px", fontSize: "0.95rem" }}>
                  To fast-track your proposal review, tap the WhatsApp button below to push these exact specifications straight to our response team.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ background: "#10b981", justifyContent: "center", width: "100%" }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.012.261 2.001.761 2.871l-.811 2.96 3.029-.794c.834.455 1.77.695 2.721.696h.003c3.181 0 5.768-2.586 5.768-5.767 0-3.18-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.749.771-1.034.821-.285.05-.638.08-1.042-.05-.256-.083-.585-.183-1.011-.363-1.745-.733-2.875-2.506-2.961-2.62-.087-.115-.705-.934-.705-1.782 0-.847.444-1.264.603-1.433.159-.168.347-.211.463-.211.116 0 .232.001.332.005.105.004.246-.04.385.295.145.348.492 1.201.535 1.29.043.088.072.19.014.307-.058.117-.087.19-.174.292-.058.117-.087.19-.174.292-.087.102-.183.228-.261.307-.087.088-.178.183-.077.357.102.174.452.746.969 1.206.666.593 1.229.777 1.402.864.174.088.275.073.377-.044.101-.117.434-.506.55-.681.116-.174.232-.146.39-.087.159.058 1.012.477 1.186.565.174.088.29.131.333.204.043.073.043.424-.103.835zm-3.39 9.667C5.584 24 .25 18.666.25 12.083.25 9.987.797 7.94 1.838 6.136L.25 0l6.333 1.662c1.746-.953 3.71-1.455 5.703-1.458h.005c6.554 0 11.89 5.335 11.892 11.893a11.821 11.821 0 01-3.48 8.413 11.783 11.783 0 01-8.413 3.486z" />
                    </svg>
                    <span>Send details to WhatsApp</span>
                  </a>
                  <button onClick={resetForm} className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="client-name">Your name</label>
                    <input
                      id="client-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. John Doe"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="client-email">Business email</label>
                    <input
                      id="client-email"
                      type="email"
                      className="form-input"
                      placeholder="e.g. john@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="client-service">Required Service</label>
                    <select
                      id="client-service"
                      className="form-input"
                      style={{ background: "#111827" }}
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                    >
                      <option value="web-dev">Web Design & Dev</option>
                      <option value="software-dev">Custom Software Engineering</option>
                      <option value="ai-auto">AI & Workflow Automation</option>
                      <option value="ui-ux">Branding & UI/UX</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="seo-growth">Technical SEO</option>
                      <option value="cloud-devops">Cloud operations</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="client-budget">Project budget baseline</label>
                    <select
                      id="client-budget"
                      className="form-input"
                      style={{ background: "#111827" }}
                      value={formBudget}
                      onChange={(e) => setFormBudget(e.target.value)}
                    >
                      <option value="$1,499">$1,499 (Startup Core)</option>
                      <option value="$3,499">$3,499 (Growth Suite)</option>
                      <option value="Custom (Negotiated)">Custom Enterprise Scope</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="client-details">Describe your business processes & friction (e.g., manual attendance, fee reconciliations)</label>
                  <textarea
                    id="client-details"
                    className="form-input"
                    style={{ minHeight: "120px", resize: "vertical" }}
                    placeholder="Provide details about your operational blockages..."
                    value={formDetails}
                    onChange={(e) => setFormDetails(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                  <span>Submit Inquiry Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Blog / Resources Section */}
      <section id="blog" style={{ background: "rgba(5, 8, 17, 0.6)" }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="section-tag">SEO BLOG & RESOURCES</span>
          <h2 className="section-title">Knowledge Engine for Business Scale</h2>
          <p className="section-subtitle">Read technical walkthroughs on AI agents, ERP pipelines, and UI/UX conversion optimizations.</p>
        </div>

        <div className="blog-grid">
          {fallbackArticles.map((article) => (
            <article key={article.id} className="blog-card" onClick={() => setActiveArticle(article)}>
              <div className="blog-img-box">
                <img src={article.image} alt={article.title} className="blog-img" />
              </div>
              <div className="blog-card-body">
                <div className="blog-meta-row">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="blog-heading">{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>
                <span className="blog-read-more">
                  <span>Read full walkthrough</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Main Footer */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="footer-brand-column">
            <a href="#top" className="footer-logo">
              <div className="logo-glow-icon" style={{ width: "32px", height: "32px", borderRadius: "8px" }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="2.5" fill="none">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                </svg>
              </div>
              <span>Techdon Solutions</span>
            </a>
            <p className="footer-desc">
              Building next-generation software platforms, transparent pricing tiers, and AI automation.
            </p>
            <div className="footer-social-row">
              <a href="#" className="social-icon-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#services" className="footer-link">Software Engineering</a></li>
              <li><a href="#services" className="footer-link">AI Automation</a></li>
              <li><a href="#services" className="footer-link">UI/UX Design</a></li>
              <li><a href="#services" className="footer-link">SEO Optimization</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#about" className="footer-link">About Techdon</a></li>
              <li><a href="#portfolio" className="footer-link">Showcase Portfolio</a></li>
              <li><a href="#pricing" className="footer-link">Pricing Tiers</a></li>
              <li><a href="#faq" className="footer-link">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Inquiries</h4>
            <ul className="footer-links">
              <li style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Nairobi HQ, Kenya</li>
              <li style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>hello@techdonsolutions.com</li>
              <li style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>+254 700 000 000</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Techdon Solutions. All rights reserved.</span>
          <span>Designed with Apple & Stripe aesthetics.</span>
        </div>
      </footer>

      {/* FULL ARTICLE READING MODE OVERLAY */}
      {activeArticle && (
        <div className="article-overlay" onClick={() => setActiveArticle(null)}>
          <div className="article-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-article-btn" onClick={() => setActiveArticle(null)} aria-label="Close Article">
              ✕
            </button>
            <img src={activeArticle.image} alt={activeArticle.title} className="article-hero-img" />
            <span className="portfolio-tag" style={{ display: "block", marginBottom: "12px" }}>Walkthrough Resource</span>
            <h2 className="article-title">{activeArticle.title}</h2>
            <div className="article-meta">
              <span>By {activeArticle.author}</span>
              <span>•</span>
              <span>Published {activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
