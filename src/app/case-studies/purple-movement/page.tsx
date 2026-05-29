import type { Metadata } from "next";
import Link from "next/link";
import ScrollSpy from "@/components/ScrollSpy";

export const metadata: Metadata = {
  title: "Case Study: Purple Movement — Amenda Maria Johnson",
  description:
    "Designing a community platform that translates broad social purpose into clear, actionable, and structured digital user engagement.",
};

export default function PurpleMovementCS() {
  return (
    <main>
      <ScrollSpy />
      
      {/* CASE STUDY HERO */}
      <section className="cs-detail-hero">
        <div className="container">
          <p className="cs-detail-meta">Case Study 04 / 04</p>
          <h1 className="cs-detail-title">Purple Movement</h1>
          <p className="cs-detail-subtitle">
            Designing a community platform that translates broad social purpose into clear, actionable, and structured
            digital user engagement.
          </p>

          <div className="cs-meta-strip">
            <div className="cs-meta-item">
              <span>Role</span>
              <p>Product & Identity Designer</p>
            </div>
            <div className="cs-meta-item">
              <span>Timeline</span>
              <p>2 Months</p>
            </div>
            <div className="cs-meta-item">
              <span>Focus</span>
              <p>Community Building & Identity Design</p>
            </div>
            <div className="cs-meta-item">
              <span>Context</span>
              <p>Social Impact Platform</p>
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
              <li><a href="#experience">Experience Design</a></li>
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
                Purpose-driven, grassroots communities often suffer from communication gaps. While their vision is
                inspiring, translating that vision into specific, digital actions (such as sign-ups, donations, or local
                organizing) is often complex and hard to navigate for new visitors.
              </p>
            </div>

            <div id="problem" className="cs-content-section reveal">
              <h2>Problem</h2>
              <p>
                The Purple Movement web platform was historically disorganized, presenting wall-of-text manifestos without
                structural categorization. Consequently, bounce rates were high and registration for local community
                initiatives remained low, despite strong initial user intent.
              </p>
            </div>

            <div id="opportunity" className="cs-content-section reveal">
              <h2>Opportunity</h2>
              <p>
                By reorganizing content hierarchies and introducing clear participation pipelines, we can transform the
                platform from an informational catalog into an active engine for community recruitment and storytelling.
              </p>
            </div>

            <div id="approach" className="cs-content-section reveal">
              <h2>Approach</h2>
              <p>
                I approached this project by conducting user interviews with existing community volunteers to map their
                journey from discovery to active engagement. The insight was clear: volunteers needed immediate clarity on
                &quot;How can I help today?&quot; rather than abstract philosophy.
              </p>

              <div className="cs-image-container">
                <img src="/MacBook Air - 13 (4).png" alt="Purple Movement Platform Design" />
                <div className="cs-image-caption">
                  Platform Interface: The landing UI featuring clear call-to-action blocks, upcoming local events, and
                  community metrics.
                </div>
              </div>
            </div>

            <div id="solution" className="cs-content-section reveal">
              <h2>Solution</h2>
              <p>
                The final redesign presents a structured platform built around action-oriented navigation blocks:
              </p>
              <ul>
                <li><strong>Clear Initiatives Portal:</strong> Simple cards grouping community projects by focus area (e.g.,
                  Environment, Welfare).</li>
                <li><strong>Optimized Scan Patterns:</strong> Grid-based systems with high visual contrast to separate core
                  text from supportive images.</li>
                <li><strong>Integrated Action Flows:</strong> A unified sign-up drawer that takes users from reading an
                  initiative to volunteering in two clicks.</li>
                <li><strong>Cohesive Brand Identity:</strong> Rich accents and custom typographic hierarchy aligned with the
                  movement’s voice.</li>
              </ul>
            </div>

            <div id="experience" className="cs-content-section reveal">
              <h2>Experience Design</h2>
              <p>
                We structured the complete volunteer experience across three psychological stages:
              </p>
              <ul>
                <li><strong>Discover:</strong> Easy, card-driven landing headers to outline &quot;what we do&quot; within 10 seconds.
                </li>
                <li><strong>Connect:</strong> Human-centric testimonials and community metrics showing direct social impact.
                </li>
                <li><strong>Participate:</strong> Inline calendar events and direct checkouts to immediately join active
                  campaigns.</li>
              </ul>
            </div>

            <div id="decisions" className="cs-content-section reveal">
              <h2>Key Decisions</h2>
              <p>
                To transform motivation into concrete action:
              </p>
              <ul>
                <li><strong>Action-First Layout:</strong> Put campaign sign-up cards directly alongside narrative content
                  rather than burying them on sub-pages.</li>
                <li><strong>Cognitive Offloading:</strong> Replaced complex registration questionnaires with a simple,
                  single-field email check-in.</li>
                <li><strong>Storytelling Focus:</strong> Leveraged visual quote blocks to build immediate emotional
                  connection with readers.</li>
              </ul>
            </div>

            <div id="tradeoffs" className="cs-content-section reveal">
              <h2>Trade-offs</h2>
              <p>
                Key scoping choices during the process:
              </p>
              <ul>
                <li><strong>Minimal Experimental Layouts:</strong> We favored conventional grid patterns over experimental
                  horizontal scrolls to keep navigation intuitive for less tech-savvy volunteers.</li>
                <li><strong>No Local Forums:</strong> We chose not to build custom chat channels, instead routing users to
                  existing WhatsApp groups to save development effort.</li>
                <li><strong>Text Scoping:</strong> Trimmed descriptive historical text in favor of larger, bold action
                  headers.</li>
              </ul>
            </div>

            <div id="impact" className="cs-content-section reveal">
              <h2>Impact</h2>
              <p>
                The Purple Movement redesign creates a welcoming digital ecosystem that bridges social intent and civic
                action.
              </p>
              <blockquote>
                &quot;Following the launch of the action-oriented initiative cards, active volunteer registrations increased by
                65% in the first quarter.&quot;
              </blockquote>
              <p>
                The case study proves that clean, minimal service layout can significantly improve civic engagement and
                volunteer retention.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY NAVIGATOR */}
      <section className="next-cs-nav">
        <div className="container">
          <span>Next Project</span>
          <Link href="/case-studies/neuux">NeuUX AI</Link>
        </div>
      </section>
    </main>
  );
}
