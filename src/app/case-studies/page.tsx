import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies — Amenda Maria Johnson",
  description:
    "Explore product design case studies focusing on AI UX systems, medical workflows, adaptive learning, and community platforms.",
};

export default function CaseStudies() {
  return (
    <main>
      {/* PORTAL HERO */}
      <section className="cs-portal-hero">
        <div className="container reveal">
          <h1 className="cs-portal-headline">Selected Case Studies</h1>
          <p className="cs-portal-subtitle">
            Detailed breakdowns of systems thinking, UX research, operational workflow mapping, and human-AI interaction
            designs.
          </p>
        </div>
      </section>

      {/* CASE STUDIES PORTAL GRID */}
      <section className="cs-portal-body">
        <div className="container">
          <div className="cs-portal-grid">
            
            {/* CARD 01: NeuUX AI */}
            <article className="cs-card reveal">
              <div className="cs-card-img-wrapper">
                <img src="/NeuUX AI (5).png" alt="NeuUX AI Case Study Mockup" />
              </div>
              <div className="cs-card-body">
                <div className="cs-card-meta">
                  <span>AI System</span>
                  <span>UX Research</span>
                  <span>2 Months</span>
                </div>
                <h2 className="cs-card-title">NeuUX AI</h2>
                <p className="cs-card-excerpt">
                  Designing an AI assistant that structures raw ideas into editable UX deliverables, shifting AI focus from
                  generating visuals to supporting core logic.
                </p>
                <Link href="/case-studies/neuux" className="cs-card-link">
                  View Case Study
                </Link>
              </div>
            </article>

            {/* CARD 02: MEDICO */}
            <article className="cs-card reveal">
              <div className="cs-card-img-wrapper">
                <img src="/Screenshot 2025-11-11 004900.png" alt="MEDICO Hospital Queue Case Study Mockup" />
              </div>
              <div className="cs-card-body">
                <div className="cs-card-meta">
                  <span>Service Design</span>
                  <span>Healthcare</span>
                  <span>3 Months</span>
                </div>
                <h2 className="cs-card-title">MEDICO</h2>
                <p className="cs-card-excerpt">
                  Building a structured, multi-layer outpatient management queue system that bridges physical clinic spaces
                  with digital status trackers.
                </p>
                <Link href="/case-studies/medico" className="cs-card-link">
                  View Case Study
                </Link>
              </div>
            </article>

            {/* CARD 03: Beyond Syllabus */}
            <article className="cs-card reveal">
              <div className="cs-card-img-wrapper">
                <img src="/MacBook Air - 3 (2).png" alt="Beyond Syllabus Learning Platform Mockup" />
              </div>
              <div className="cs-card-body">
                <div className="cs-card-meta">
                  <span>EdTech</span>
                  <span>Adaptive UX</span>
                  <span>4 Weeks</span>
                </div>
                <h2 className="cs-card-title">Beyond Syllabus</h2>
                <p className="cs-card-excerpt">
                  Designing an intent-first, interactive learning roadmap platform that moves students away from static
                  curricula toward outcome-based skills.
                </p>
                <Link href="/case-studies/beyond-syllabus" className="cs-card-link">
                  View Case Study
                </Link>
              </div>
            </article>

            {/* CARD 04: Purple Movement */}
            <article className="cs-card reveal">
              <div className="cs-card-img-wrapper">
                <img src="/MacBook Air - 13 (4).png" alt="Purple Movement Civic Platform Mockup" />
              </div>
              <div className="cs-card-body">
                <div className="cs-card-meta">
                  <span>Social Impact</span>
                  <span>Identity Design</span>
                  <span>2 Months</span>
                </div>
                <h2 className="cs-card-title">Purple Movement</h2>
                <p className="cs-card-excerpt">
                  Redesigning a civic engagement community platform, building action-oriented pathways that translate
                  philosophy into active campaign volunteers.
                </p>
                <Link href="/case-studies/purple-movement" className="cs-card-link">
                  View Case Study
                </Link>
              </div>
            </article>

          </div>
        </div>
      </section>
    </main>
  );
}
