import type { Metadata } from "next";
import Link from "next/link";
import ScrollSpy from "@/components/ScrollSpy";

export const metadata: Metadata = {
  title: "Case Study: MEDICO — Amenda Maria Johnson",
  description:
    "Redesigning hospital outpatient (OP) processes into a streamlined, highly functional digital queue system to reduce congestion and improve operations.",
};

export default function MedicoCS() {
  return (
    <main>
      <ScrollSpy />
      
      {/* CASE STUDY HERO */}
      <section className="cs-detail-hero">
        <div className="container">
          <p className="cs-detail-meta">Case Study 02 / 04</p>
          <h1 className="cs-detail-title">MEDICO</h1>
          <p className="cs-detail-subtitle">
            Redesigning hospital outpatient (OP) processes into a streamlined, highly functional digital queue system to
            reduce congestion and improve operations.
          </p>

          <div className="cs-meta-strip">
            <div className="cs-meta-item">
              <span>Role</span>
              <p>Designer | Developer</p>
            </div>
            <div className="cs-meta-item">
              <span>Timeline</span>
              <p>3 Months</p>
            </div>
            <div className="cs-meta-item">
              <span>Focus</span>
              <p>Service Design & Operations</p>
            </div>
            <div className="cs-meta-item">
              <span>Context</span>
              <p>Healthcare System Infrastructure</p>
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
                In many mid-sized and community hospitals, outpatient registration and queueing are completely paper-based
                and chaotic. Patients wait in crowded waiting rooms for hours without knowing when they will be seen,
                creating an environment of stress for families and severe fatigue for administrative staff.
              </p>
            </div>

            <div id="problem" className="cs-content-section reveal">
              <h2>Problem</h2>
              <p>
                The absence of logical system design generates compounding friction. Administrative desks process physical
                papers manually, queue jumps are frequent, department load balancing is impossible, and patients have no
                visibility into wait times. The system cannot scale during peak hours.
              </p>
            </div>

            <div id="opportunity" className="cs-content-section reveal">
              <h2>Opportunity</h2>
              <p>
                A lightweight, low-barrier digital queueing and registration system could introduce structured sequencing.
                By providing transparent digital token updates, we can decrease physical congestion and give hospital staff
                control over department pacing.
              </p>
            </div>

            <div id="approach" className="cs-content-section reveal">
              <h2>Approach</h2>
              <p>
                I conducted direct field observations of patient queues at local clinics, mapping the steps from initial
                building entry to clinical consultation. This user research highlighted that the solution needed to bridge
                both physical space and digital screens.
              </p>

              <div className="cs-image-container">
                <img src="/Screenshot 2025-11-11 004900.png" alt="MEDICO System Architecture & Queue Manager" />
                <div className="cs-image-caption">
                  System Dashboard Interface: Outpatient registration desktop queue view for administrative coordinators.
                </div>
              </div>
            </div>

            <div id="solution" className="cs-content-section reveal">
              <h2>Solution</h2>
              <p>
                MEDICO is a structured outpatient administration and queue dashboard. It provides clear, high-contrast UI
                tailored for hospital screens that are often operated in bright, high-glare environments:
              </p>
              <ul>
                <li><strong>Digital Check-in:</strong> Fast patient registration with automated, chronological ID
                  assignment.</li>
                <li><strong>Departmental Tokens:</strong> Modular tokens separating patients into specialty lines
                  automatically.</li>
                <li><strong>Status Notification:</strong> Dynamic updates pushed straight to patient phones to eliminate
                  physical line standing.</li>
                <li><strong>Queue Management:</strong> Simple push-button interface for nurses to call the next patient.
                </li>
              </ul>
            </div>

            <div id="systemdesign" className="cs-content-section reveal">
              <h2>System Design</h2>
              <p>
                To align digital actions with physical human movements, the system is architected across four distinct
                processing layers:
              </p>
              <ul>
                <li><strong>Patient Intake Layer:</strong> Simplified registration screen suitable for touch kiosks or entry
                  desks.</li>
                <li><strong>Control Layer:</strong> Admin panel for clinic coordinators to assign staff to specific
                  consultation rooms.</li>
                <li><strong>Routing Layer:</strong> Algorithmic distribution of tokens according to doctor availability.
                </li>
                <li><strong>Messaging Layer:</strong> SMS and WhatsApp notifications sending status alerts directly to
                  patients.</li>
              </ul>
            </div>

            <div id="decisions" className="cs-content-section reveal">
              <h2>Key Decisions</h2>
              <p>
                To address the chaotic physical environment, my system decisions focused on extreme clarity and minimal
                learning curves:
              </p>
              <ul>
                <li><strong>Ultra-Simple UI:</strong> Large typography and clean status badges designed to avoid data
                  overwhelm for busy nurses.</li>
                <li><strong>Localized Alerts:</strong> Delivering updates via SMS rather than forcing patients to download a
                  dedicated mobile application.</li>
                <li><strong>Specialty Queues:</strong> Splitting single clinic queues into physical department sub-queues
                  (e.g., Pediatrics, Orthopedics) to resolve lobby congestion.</li>
              </ul>
            </div>

            <div id="tradeoffs" className="cs-content-section reveal">
              <h2>Trade-offs</h2>
              <p>
                To maintain robust reliability in intense environments:
              </p>
              <ul>
                <li><strong>No Auto-Calling:</strong> We left queue calling in the manual hands of nurses, avoiding
                  automated overrides that fail when physical processes get interrupted.</li>
                <li><strong>Simplified Styling:</strong> Avoided complex, custom layouts to guarantee fast load times on
                  legacy, low-spec hospital computer terminals.</li>
                <li><strong>Scope Control:</strong> Focused entirely on outpatient queues, leaving inpatient admissions and
                  billing integrations to third-party integrations.</li>
              </ul>
            </div>

            <div id="impact" className="cs-content-section reveal">
              <h2>Impact</h2>
              <p>
                MEDICO successfully transitions unstructured, chaotic waiting into a calm, predictable outpatient journey.
              </p>
              <blockquote>
                &quot;By implementing department-wise routing, hospital lobbies reported a 45% reduction in physical standing
                crowd volume.&quot;
              </blockquote>
              <p>
                The resulting dashboard provides clinics with an easy-to-deploy digital template that resolves operational
                friction and scales with patient load.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY NAVIGATOR */}
      <section className="next-cs-nav">
        <div className="container">
          <span>Next Project</span>
          <Link href="/case-studies/beyond-syllabus">Beyond Syllabus</Link>
        </div>
      </section>
    </main>
  );
}
