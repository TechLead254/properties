import React, { useState, useEffect } from "react";
import { fallbackServices } from "../data/dashboardFallback";

export default function AdminPanel({ onRouteToHome }) {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  // Load leads from LocalStorage
  const loadLeads = () => {
    try {
      const stored = localStorage.getItem("techdon_leads");
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        // Seed initial dummy leads if empty
        const initialSeed = [
          {
            id: "seed-1",
            name: "Dr. Florence Kamau",
            email: "f.kamau@edusuite.test",
            service: "software-dev",
            budget: "Custom (Negotiated)",
            details: "Need system to solve manual attendance tracking and MPESA statement reconciliation mismatch.",
            date: "May 22, 2026",
            status: "Closed"
          },
          {
            id: "seed-2",
            name: "Alex Mwangi",
            email: "alex@nexuscargo.test",
            service: "ai-auto",
            budget: "$3,499",
            details: "Looking to automate warehouse scheduling updates sent out via WhatsApp API.",
            date: "May 24, 2026",
            status: "New"
          }
        ];
        localStorage.setItem("techdon_leads", JSON.stringify(initialSeed));
        setLeads(initialSeed);
      }
    } catch (err) {
      console.error("Local storage load failed:", err);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Update lead status
  const updateStatus = (leadId, nextStatus) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: nextStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem("techdon_leads", JSON.stringify(updated));
  };

  // Delete lead
  const deleteLead = (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead record?")) return;
    const filtered = leads.filter(l => l.id !== leadId);
    setLeads(filtered);
    localStorage.setItem("techdon_leads", JSON.stringify(filtered));
  };

  // Inject a simulated testing lead (adds testing efficiency for users)
  const handleSimulateLead = () => {
    const names = ["Gabriel Kiprop", "Halima Omar", "Peter Njoroge", "Emma Wambui"];
    const emails = ["gabriel@kipropsoft.test", "halima@omardigital.test", "peter@njorogeadvocates.test", "emma@wambuischools.test"];
    const services = ["web-dev", "ai-auto", "seo-growth", "software-dev"];
    const budgets = ["$1,499", "$3,499", "Custom (Negotiated)"];
    const problems = [
      "Experiencing high teacher workload and slow report cards compiling.",
      "Need Google Page 1 ranking for logistics keywords. Technical SEO audit needed.",
      "Manual bank statement checks are stalling client onboarding. Need automated Stripe webhook.",
      "Seeking a high-converting landing page inspired by Apple. Need UI designs."
    ];

    const idx = Math.floor(Math.random() * names.length);
    const newLead = {
      id: "sim-" + Date.now(),
      name: names[idx],
      email: emails[idx],
      service: services[idx],
      budget: budgets[Math.floor(Math.random() * budgets.length)],
      details: problems[idx],
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      status: "New"
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem("techdon_leads", JSON.stringify(updated));
  };

  // Export filtered leads to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No lead entries matching filters to export.");
      return;
    }

    const headers = ["Inquiry ID", "Client Name", "Email Address", "Service", "Budget", "Details", "Date Submitted", "Status"];
    const rows = filteredLeads.map(l => {
      const serviceLabel = fallbackServices.find(s => s.id === l.service)?.title || l.service;
      // Clean string details for safe CSV nesting
      const cleanDetails = l.details.replace(/"/g, '""');
      return [
        l.id,
        `"${l.name}"`,
        `"${l.email}"`,
        `"${serviceLabel}"`,
        `"${l.budget}"`,
        `"${cleanDetails}"`,
        `"${l.date}"`,
        `"${l.status}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `techdon_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesService = serviceFilter === "all" || l.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate Metrics summaries
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === "New").length;
  const contactedLeadsCount = leads.filter(l => l.status === "Contacted").length;
  const closedLeadsCount = leads.filter(l => l.status === "Closed").length;

  return (
    <div className="admin-view-container">
      {/* Background Decorative Glow */}
      <div className="glow-orb" style={{ top: "10%", right: "15%" }}></div>

      {/* Admin header */}
      <div className="admin-header-row">
        <div>
          <span className="section-tag">Internal Tools</span>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
            Techdon Client CRM
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Review customer proposals, automate communication updates, and track lead scoring status.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-secondary" onClick={onRouteToHome}>
            ← Go to main site
          </button>
          <button className="btn-primary" onClick={handleSimulateLead} style={{ background: "var(--gradient-purple-cyan)" }}>
            + Simulate lead entry
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="admin-stats-strip">
        <div className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start", background: "var(--bg-card)" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>Total inquiries logged</span>
          <span style={{ fontSize: "2rem", fontWeight: "800" }}>{totalLeadsCount}</span>
        </div>
        <div className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start", background: "var(--bg-card)" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>Pending Action</span>
          <span style={{ fontSize: "2rem", fontWeight: "800", color: "#60a5fa" }}>{newLeadsCount}</span>
        </div>
        <div className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start", background: "var(--bg-card)" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>In Progress / Contacted</span>
          <span style={{ fontSize: "2rem", fontWeight: "800", color: "#fbbf24" }}>{contactedLeadsCount}</span>
        </div>
        <div className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start", background: "var(--bg-card)" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>Closed Wins</span>
          <span style={{ fontSize: "2rem", fontWeight: "800", color: "#34d399" }}>{closedLeadsCount}</span>
        </div>
      </div>

      {/* CRM Actions Bar */}
      <div className="admin-filter-bar">
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            className="leads-search-input"
            placeholder="Search leads name or detail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="leads-search-input"
            style={{ width: "160px", background: "var(--bg-obsidian)" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="New">Status: New</option>
            <option value="Contacted">Status: Contacted</option>
            <option value="Closed">Status: Closed</option>
          </select>

          <select
            className="leads-search-input"
            style={{ width: "200px", background: "var(--bg-obsidian)" }}
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="all">All Services</option>
            {fallbackServices.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        <button className="btn-secondary" onClick={handleExportCSV} style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Export CSV</span>
        </button>
      </div>

      {/* Leads Table Container */}
      <div className="glass-card" style={{ padding: "0", overflowX: "auto" }}>
        {filteredLeads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            No leads found matching current filter constraints.
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client details</th>
                <th>Requested Service</th>
                <th>Est. Budget</th>
                <th>Business Pain/Specs</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const matchedService = fallbackServices.find(s => s.id === lead.service)?.title || lead.service;
                return (
                  <tr key={lead.id}>
                    <td style={{ whiteSpace: "nowrap", color: "var(--text-muted)" }}>
                      {lead.date}
                    </td>
                    <td>
                      <div style={{ fontWeight: "600", color: "white" }}>{lead.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lead.email}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.85rem", color: "var(--accent-indigo)" }}>{matchedService}</span>
                    </td>
                    <td style={{ fontWeight: "600" }}>
                      {lead.budget}
                    </td>
                    <td style={{ maxWidth: "260px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                      {lead.details}
                    </td>
                    <td>
                      <span className={`lead-status-pill ${
                        lead.status === "New" ? "lead-status-new" :
                        lead.status === "Contacted" ? "lead-status-contacted" :
                        "lead-status-closed"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <select
                          className="leads-search-input"
                          style={{ width: "115px", padding: "4px 8px", minHeight: "auto", fontSize: "0.75rem", background: "var(--bg-obsidian)" }}
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                        >
                          <option value="New">Set: New</option>
                          <option value="Contacted">Set: Contacted</option>
                          <option value="Closed">Set: Closed</option>
                        </select>
                        
                        <button
                          className="crm-action-btn"
                          title="Delete inquiry entry"
                          onClick={() => deleteLead(lead.id)}
                          style={{ color: "#f87171", borderColor: "rgba(248, 113, 113, 0.2)" }}
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
