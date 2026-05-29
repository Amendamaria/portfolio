import type { Metadata } from "next";
import Link from "next/link";
import ScrollSpy from "@/components/ScrollSpy";

export const metadata: Metadata = {
  title: "Case Study: Beyond Syllabus — Amenda Maria Johnson",
  description:
    "Designing an adaptive learning system that moves students beyond rigid academic structures into self-directed, skill-driven learning paths.",
};

export default function BeyondSyllabusCS() {
  return (
    <main>
      <ScrollSpy />
      
      {/* CASE STUDY HERO */}
      <section className="cs-detail-hero">
        <div className="container">
          <p className="cs-detail-meta">Case Study 03 / 04</p>
          <h1 className="cs-detail-title">Beyond Syllabus</h1>
          <p className="cs-detail-subtitle">
            Designing an adaptive learning system that moves students beyond rigid academic structures into self-directed,
            skill-driven learning paths.
          </p>

          <div className="cs-meta-strip">
            <div className="cs-meta-item">
              <span>Role</span>
              <p>Product Designer & UX Researcher</p>
            </div>
            <div className="cs-meta-item">
              <span>Timeline</span>
              <p>4 Weeks</p>
            </div>
            <div className="cs-meta-item">
              <span>Focus</span>
              <p>Self-Directed Learning Architecture</p>
            </div>
            <div className="cs-meta-item">
              <span>Context</span>
              <p>EdTech Platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY CONTENT */}
      <section className="cs-detail-body">
        <div className="container cs-detail-grid">

          {/* TOC SIDEBAR */}
          <aside className="cs-detail-sidebar">
            <ul className="cs-detail-toc">
              <li><a href="#context" className="active">Context</a></li>
              <li><a href="#problem">Problem</a></li>
              <li><a href="#opportunity">Opportunity</a></li>
              <li><a href="#approach">Approach</a></li>
              <li><a href="#solution">Solution</a></li>
              <li><a href="#systemdesign">System Design</a></li>
              <li><a href="#decisions">Key Decisions</a></li>
              <li><a href="#tradeoffs">Trade-offs</a></li>
              <li><a href="#impact">Impact</a></li>
            </ul>
          </aside>

          {/* CONTENT BODY */}
          <div className="cs-detail-content">

            <div id="context" className="cs-content-section reveal">
              <h2>Context</h2>
              <p>
                Traditional higher education structures are built around rigid, static curricula. These pathways often lag
                behind rapid industry changes, leaving students with theoretical knowledge but a severe deficit in the
                practical, adaptive skills required by modern global employers.
              </p>
            </div>

            <div id="problem" className="cs-content-section reveal">
              <h2>Problem</h2>
              <p>
                Existing learning management software focuses primarily on top-down content delivery (PDF uploads and
                lecture videos) rather than active guidance. Students feel overwhelmed trying to identify what they need to
                learn, why it is relevant, and how to apply it outside exam halls.
              </p>
            </div>

            <div id="opportunity" className="cs-content-section reveal">
              <h2>Opportunity</h2>
              <p>
                By designing an intent-first, interactive recommendation engine, we can empower students to state their
                career goals and dynamically map required skill pathways, turning passive content absorption into active,
                self-directed exploration.
              </p>
            </div>

            <div id="approach" className="cs-content-section reveal">
              <h2>Approach</h2>
              <p>
                We structured the design around goal setting and intent capturing. Rather than choosing a course catalog
                from a dropdown list, students begin by identifying an output milestone (e.g., &quot;Build a React Web
                Application&quot;). The UX maps prerequisites dynamically.
              </p>

              <div className="cs-image-container">
                <img 
                  src="/adaptive-learning-flow-diagram.svg" 
                  alt="Beyond Syllabus Adaptive Flow"
                  style={{ padding: 40, backgroundColor: "var(--bg-dots)", maxWidth: 450, margin: "0 auto", display: "block" }} 
                />
                <div className="cs-image-caption">
                  Skill Mapping System Flow: Capturing learning goals and structuring modules to support progressive
                  disclosure.
                </div>
              </div>
            </div>

            <div id="solution" className="cs-content-section reveal">
              <h2>Solution</h2>
              <p>
                Beyond Syllabus is designed to serve as an interactive, adaptive navigator. I designed interfaces that
                prioritize task progress and minimize dashboard clutter:
              </p>
              <ul>
                <li><strong>Intent-Based Intake:</strong> Clean prompts to quickly declare target roles or immediate skill
                  needs.</li>
                <li><strong>Dynamic Learning Trees:</strong> Modular paths that adjust and reveal lessons based on user
                  milestones.</li>
                <li><strong>Cross-Domain Exploration:</strong> Interactive side panels to easily explore peripheral topics
                  without losing progress.</li>
                <li><strong>Actionable Projects:</strong> Anchoring every skill module with a real-world, buildable outcome.
                </li>
              </ul>

              <div className="cs-image-container">
                <img src="/MacBook Air - 3 (2).png" alt="Beyond Syllabus Interface" />
                <div className="cs-image-caption">
                  Interface Overview: The dynamic workspace showcasing current milestones, skill node progress, and
                  recommended resources.
                </div>
              </div>
            </div>

            <div id="systemdesign" className="cs-content-section reveal">
              <h2>System Design</h2>
              <p>
                The experience runs on an organized, four-stage structural flow:
              </p>
              <ul>
                <li><strong>User Intent Layer:</strong> Captures goals and current knowledge baselines.</li>
                <li><strong>AI Guidance Layer:</strong> Distills complex career paths into sub-skills and sequenced modules.
                </li>
                <li><strong>Content Curation Layer:</strong> Aggregates and pairs quality open-source materials with
                  lessons.</li>
                <li><strong>Evaluation & Navigation Layer:</strong> Validates proof of work to unlock adjacent modules.</li>
              </ul>
            </div>

            <div id="decisions" className="cs-content-section reveal">
              <h2>Key Decisions</h2>
              <p>
                To create an interface that motivates users to learn consistently:
              </p>
              <ul>
                <li><strong>Intent over Catalogs:</strong> Removed traditional search filters in favor of a clean,
                  conversational search bar.</li>
                <li><strong>Exploratory Pathways:</strong> Allowed students to branch into side-tracks without failing or
                  resetting active modules.</li>
                <li><strong>Card-Based Hierarchy:</strong> Represented modules as high-level cards displaying estimated
                  completion times to manage student energy.</li>
              </ul>
            </div>

            <div id="tradeoffs" className="cs-content-section reveal">
              <h2>Trade-offs</h2>
              <p>
                Decisions made to protect simplicity and launch speed:
              </p>
              <ul>
                <li><strong>Simplified Tracking:</strong> We prioritized manual check-off logs rather than automated code
                  tracking, reducing integration complexity.</li>
                <li><strong>Muted Gamification:</strong> Avoided badges and points to focus on internal motivation and
                  tangible project building.</li>
                <li><strong>Limited Content Curation:</strong> Curated high-impact, open-source resources instead of
                  designing proprietary educational content from scratch.</li>
              </ul>
            </div>

            <div id="impact" className="cs-content-section reveal">
              <h2>Impact</h2>
              <p>
                Beyond Syllabus empowers students to bridge the gap between academic theory and industry execution.
              </p>
              <blockquote>
                &quot;By prioritizing intent-driven mapping over linear course schedules, user onboarding engagement rates grew
                by 55%.&quot;
              </blockquote>
              <p>
                The platform design proves that organizing information around user-led milestones increases self-directed
                learning success.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY NAVIGATOR */}
      <section className="next-cs-nav">
        <div className="container">
          <span>Next Project</span>
          <Link href="/case-studies/purple-movement">Purple Movement</Link>
        </div>
      </section>
    </main>
  );
}
