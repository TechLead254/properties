// Techdon Solutions Fallback & Static Content

export const fallbackServices = [
  {
    id: "web-dev",
    title: "Software & Web Development",
    icon: "code",
    desc: "Engineered for speed, security, and infinite scalability. We build high-performance web applications and enterprise systems that turn operations into growth engines.",
    features: ["Custom React & Next.js Apps", "High-Availability Cloud APIs", "Database Engineering", "Robust Security Audits"]
  },
  {
    id: "ai-auto",
    title: "AI & Workflow Automation",
    icon: "cpu",
    desc: "Automate repetitive tasks, integrate smart LLMs, and optimize your business logic. Save hundreds of operational hours per week with automated workflows.",
    features: ["Custom AI Chatbots & Agents", "Workflow Integrations (Make/Zapier)", "Internal Data Wrangling AI", "Auto-reporting Pipelines"]
  },
  {
    id: "ui-ux",
    title: "UI/UX & Branding Design",
    icon: "palette",
    desc: "Premium, trustworthy design inspired by Apple and Stripe. We craft design systems and branding guides that command higher product margins.",
    features: ["Framer Interactive Prototyping", "Design System Engineering", "Corporate Branding & Logos", "Interactive High-Fidelity Mockups"]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Growth",
    icon: "trending-up",
    desc: "Connect your solutions with buyers. We execute data-driven digital ad campaigns and marketing funnels built around core conversion metrics.",
    features: ["Paid Social & Search Ads", "Conversion Rate Optimization", "Funnel Analytics & Tracking", "Email Marketing Sequences"]
  },
  {
    id: "seo-growth",
    title: "SEO & Content Systems",
    icon: "search",
    desc: "Dominate organic search indexes. We build technical SEO skeletons and content pipelines that capture qualified commercial search intent.",
    features: ["Technical SEO Site Audits", "Keyword Cluster Strategies", "Structured Schema Markup", "High-Velocity Content Writing"]
  },
  {
    id: "cloud-devops",
    title: "Cloud Operations",
    icon: "cloud",
    desc: "Migrate safely to AWS or Google Cloud. We set up robust CI/CD, auto-scaling clusters, and monitoring tools to ensure zero-downtime operations.",
    features: ["AWS/GCP Architecture Design", "Docker & Kubernetes setup", "CI/CD Auto-deployments", "Server Cost Optimizations"]
  }
];

export const fallbackProjects = [
  {
    id: "edusuite-erp",
    title: "EduSuite Portal: School ERP & Learning Platform",
    tag: "Software Engineering & UI/UX",
    category: "software",
    isFlagship: true,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    client: "EduSuite Academic Group",
    timeline: "5 Months",
    summary: "A centralized digital ecosystem designed to resolve administrative chaos, parent communication gaps, and heavy workload bottlenecks for a large regional school network.",
    challenges: [
      "Manual, error-prone attendance tracking causing security anxiety.",
      "Delayed parent communication regarding grades, events, and issues.",
      "Difficult, disjointed fee reconciliation processes leading to financial leakages.",
      "Time-consuming academic report generation taking teachers weeks.",
      "Limited academic performance analytics with no early-intervention indicators.",
      "Heavy teacher administrative workloads shifting focus away from instruction.",
      "Poor data centralization leading to duplicated or lost student records.",
      "Limited student and teacher access to digital learning resources."
    ],
    solutions: [
      "RFID & Biometric automated attendance scanner synced to the cloud.",
      "Real-time Automated Parent Portal with SMS & WhatsApp triggers.",
      "Centralized fee reconciliation dashboard integrated with MPESA, Stripe, and bank APIs.",
      "One-click academic report card PDF compiler with custom layouts.",
      "AI-driven Student Risk Indicator analytics showing learning regressions.",
      "Intuitive teacher interface containing automatic grading sheets and class planners.",
      "Highly secure, centralized relational database in AWS with automated backups.",
      "Digital resource library hosting assignments, instructional videos, and textbooks."
    ],
    outcomes: [
      "94% reduction in fee reconciliation cycles (from 7 days to instant auto-matches).",
      "Teacher admin workload slashed by 18 hours per week.",
      "99% delivery rate on real-time parent-teacher safety notifications.",
      "Instant access to learning materials for over 8,500 active students."
    ]
  },
  {
    id: "fitgrowth-saas",
    title: "FitGrowth: Modern SaaS Web Platform",
    tag: "Web Design & Development",
    category: "web",
    isFlagship: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    client: "FitGrowth LLC",
    timeline: "3 Months",
    summary: "Built a Stripe-grade marketing landing page and dynamic dashboard portal for a health-tech subscription company, resulting in a 42% conversion spike.",
    challenges: [
      "Outdated website layout causing high bounce rates.",
      "Clunky billing controls leading to customer support tickets.",
      "No dashboard analytics showing subscribers their workout trends."
    ],
    solutions: [
      "Redesigned using Apple/Stripe design aesthetics (glassmorphism details).",
      "Created sleek subscriber dashboard with responsive chart visuals.",
      "Integrated Stripe Billing portal for self-serve management."
    ],
    outcomes: [
      "42% increase in sales conversion within the first 30 days.",
      "60% drop in billing-related customer service inquiries.",
      "Sub-second load times across mobile devices."
    ]
  },
  {
    id: "pulseai-brand",
    title: "PulseAI: Brand Identity & Strategy",
    tag: "Branding & Design System",
    category: "branding",
    isFlagship: false,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    client: "PulseAI Technologies",
    timeline: "6 Weeks",
    summary: "Formulated a futuristic corporate brand system, logo mark, and interactive design system for an AI operations platform.",
    challenges: [
      "Generic styling failing to convey advanced AI capabilities.",
      "Inconsistent marketing collateral across departments.",
      "No centralized guidelines for developers."
    ],
    solutions: [
      "Created futuristic dark-mode inspired design system.",
      "Designed vector logo mark representing data pulsing through nodes.",
      "Packaged design assets into an online brand handbook."
    ],
    outcomes: [
      "Successful Series A funding round raising $14M.",
      "Consistent product rollout across 4 frontend developer teams.",
      "Instant brand recognition at international tech events."
    ]
  }
];

export const fallbackPricing = [
  {
    id: "startup",
    name: "Startup Core",
    price: "1,499",
    desc: "Perfect for early-stage companies needing high-impact digital presence.",
    features: [
      "High-Converting Landing Page",
      "Core Branding Assets (Logo, Fonts)",
      "Standard Technical SEO Skeleton",
      "Inquiry Contact Form Integration",
      "Responsive Mobile-First Codebase",
      "WhatsApp Chat Widget Integration"
    ],
    popular: false
  },
  {
    id: "scaleup",
    name: "Growth Suite",
    price: "3,499",
    desc: "For fast-growing companies requiring custom software and advanced marketing.",
    features: [
      "Multi-Page Interactive App",
      "Custom Software Dashboard Features",
      "AI Automations (e.g. Chatbots, Syncs)",
      "Advanced Funnel & Lead Analytics",
      "Advanced SEO (Keyword Clustering)",
      "CRM Lead Management Panel Setup",
      "Priority 24/7 Slack Support"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    price: "Custom",
    desc: "Bespoke engineering for high-volume networks, schools, and scale ups.",
    features: [
      "Enterprise Grade Portal (ERP/CRM)",
      "Centralized Multi-source Databases",
      "Deep Integration (MPESA, Stripe, Bank APIs)",
      "Custom AI agents with custom training",
      "Full DevOps setup & Cloud Migration",
      "Dedicated engineer & SLA support"
    ],
    popular: false
  }
];

export const fallbackFAQs = [
  {
    question: "What services does Techdon Solutions specialize in?",
    answer: "We specialize in software development, high-converting web design, corporate branding, AI workflow automation (eliminating manual tasks), SEO content campaigns, and digital marketing strategies for startups and companies."
  },
  {
    question: "How does the custom software process work?",
    answer: "We begin with a thorough scoping phase to identify bottlenecks (e.g., manual attendance, delayed reporting, fee mismatches). Then, we build high-fidelity wireframes, construct the application using modern stacks (React, Node, CloudDBs), connect third-party APIs, run strict QA audits, and launch."
  },
  {
    question: "Can you build integrations for local payment systems like MPESA or Stripe?",
    answer: "Absolutely. We specialize in financial integrations, including automated M-PESA C2B/B2C callbacks, Stripe checkout portals, and custom bank statements scraping to automate your entire fee or invoice reconciliation cycle."
  },
  {
    question: "How do your AI automation services save us money?",
    answer: "We build custom LLM workflows and integrations using tools like Make, Zapier, and Python scripts. By automating tasks like lead scoring, parent updates, and document parsing, we frequently save our clients 15-20 administrative hours per employee every single week."
  },
  {
    question: "What is your typical project timeline?",
    answer: "For standard landing pages and branding, we deploy in 2-3 weeks. Complex software solutions, school portals, or custom ERP systems typically take 8-16 weeks depending on the range of integrations and databases required."
  }
];

export const fallbackTestimonials = [
  {
    quote: "Techdon Solutions built our central system. They solved our delayed parent notifications and automated our massive fee reconciliation sheet. Our admin workload went from 20 hours a week down to under 15 minutes. Pure magic!",
    author: "Dr. Florence Kamau",
    role: "Director of Operations, EduSuite Group",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The design aesthetics they delivered matched Stripe and Apple. Our conversion rate increased by 42% on the first month. Their team acts as a premium tech partner rather than just code-monkeys.",
    author: "Marcus Thorne",
    role: "CEO, FitGrowth LLC",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Their AI automation service restructured our entire customer intake. What used to require three staff members to coordinate is now entirely driven by a custom AI agent they built. The ROI was clear in 10 days.",
    author: "Elena Rostova",
    role: "VP Growth, PulseAI",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  }
];

export const fallbackArticles = [
  {
    id: "ai-scale-2026",
    title: "5 AI Automation Strategies to Scale Your Business in 2026",
    excerpt: "Discover how fast-growing tech startups are leveraging automated workflows and artificial intelligence agents to slash operational friction and 10x their outputs.",
    date: "May 18, 2026",
    readTime: "6 min read",
    author: "Donald Orone, Founder",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>AI automation is no longer a luxury for tech enterprises—it has become the defining operational edge for modern startups. In 2026, companies that scale successfully are doing so by automating their core workflows instead of hiring brute-force admin labor.</p>
      
      <h3>1. Auto-Scoring Leads</h3>
      <p>Instead of manually parsing contact inquiries, forward-thinking startups use custom LLMs to categorize inbound messages, rank their financial budgets, and prioritize response targets instantly.</p>
      
      <h3>2. Centralizing Communication Channels</h3>
      <p>Automating reminders through instant WhatsApp API push notifications ensures parent, client, and team communication remains real-time. Delayed responses lead to customer attrition.</p>
      
      <h3>3. Automated Invoice & Reconciliation</h3>
      <p>reconciling bank ledgers and digital payments (such as Stripe or local mobile monies) used to require hours of daily tracking. In 2026, webhooks automate ledger balance matching immediately upon payment capture.</p>
      
      <h3>4. Autonomous Content Pipelines</h3>
      <p>Using AI systems to outline, verify technical accuracy, and upload SEO documents to blogs creates constant organic indexing signals. This compounds search engine traffic with minimal intervention.</p>
      
      <h3>Conclusion</h3>
      <p>By implementing these integrations, founders can focus on high-leverage product development and customer retention, while operations run autonomously in the cloud background.</p>
    `
  },
  {
    id: "school-erp-operational-chaos",
    title: "Building Centralized Operations: The Power of Modern ERPs",
    excerpt: "How modern educational platforms solve manual attendance, difficult fee reconciliation, and heavy teacher administrative workloads in one sweep.",
    date: "April 28, 2026",
    readTime: "8 min read",
    author: "Sarah Jenkins, EdTech Architect",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Schools and training organizations represent one of the most operationally dense sectors. Managing thousands of student profiles, recording daily attendance, tracking tuition payments, and compiling complex report cards creates a mountain of administration.</p>
      
      <h3>The Pain of Manual Processes</h3>
      <p>When attendance is handled via manual paper sheets, tracking safety becomes slow. When billing records exist on disjointed spreadsheets, fee reconciliation is a nightmare. Teachers spend up to 40% of their schedules on grading cards, leaving less time for actual instruction.</p>
      
      <h3>Modern Centralized Solutions</h3>
      <p>An integrated School ERP (Enterprise Resource Planning) platform solves these issues by creating a single database structure. For instance:</p>
      <ul>
        <li><strong>Automated Attendance:</strong> Biometric scanners record check-ins and immediately alert parents.</li>
        <li><strong>Instant Payments:</strong> Automated payment notifications sync directly into the accounts dashboard, mapping student accounts.</li>
        <li><strong>One-Click PDF Reports:</strong> Digital grade books calculate cumulative averages and compile report sheets in real-time.</li>
      </ul>
      
      <h3>The Operational Result</h3>
      <p>Moving from manual methods to a unified portal frees teachers from administrative workloads, restores financial transparency, and establishes real-time trust with parents.</p>
    `
  },
  {
    id: "premium-ux-conversions",
    title: "Why Premium UI/UX Increases Conversions by 200%",
    excerpt: "A clean, modern design inspired by industry leaders like Apple and Stripe is not just a cosmetic asset—it is a critical trust signal that drives customer conversions.",
    date: "March 15, 2026",
    readTime: "5 min read",
    author: "Felix Kiprop, Lead Designer",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>When a prospective client lands on your website, you have less than 3 seconds to establish trust. In that tiny window, their brain evaluates your professionalism based on visual aesthetic and interface speed.</p>
      
      <h3>Visual Clarity Equals Professional Competence</h3>
      <p>If your website relies on standard browser defaults or generic, basic styling, visitors assume your underlying technology is equally basic. In contrast, premium interfaces with glassmorphic depth, harmonized color palettes, and outfit typography communicate premium value.</p>
      
      <h3>Friction Reduction is Revenue Optimization</h3>
      <p>UX design is the science of removing obstacles. By structuring clear navigation, hover highlights, and mobile-optimized layouts, you guide user action seamlessly toward your lead capture forms. This visual ease translates directly into increased lead generation.</p>
    `
  }
];
