import type { Metadata } from "next";
import Link from "next/link";
import ScrollSpy from "@/components/ScrollSpy";

export const metadata: Metadata = {
  title: "Case Study: NeuUX AI — Amenda Maria Johnson",
  description:
    "Designing an AI-powered UX system that transforms raw product ideas into structured UX thinking — reducing friction in early-stage design workflows.",
};

export default function NeuuxCS() {
  return (
    <main>
      <ScrollSpy />
      
      {/* CASE STUDY HERO */}
      <section className="cs-detail-hero">
        <div className="container">
          <p className="cs-detail-meta">Case Study 01 / 04</p>
          <h1 className="cs-detail-title">NeuUX AI</h1>
          <p className="cs-detail-subtitle">
            Designing an AI-powered UX system that transforms raw product ideas into structured UX thinking — reducing
            friction in early-stage design workflows.
          </p>

          <div className="cs-meta-strip">
            <div className="cs-meta-item">
              <span>Role</span>
              <p>Designer | Developer</p>
            </div>
            <div className="cs-meta-item">
              <span>Timeline</span>
              <p>2 Months</p>
            </div>
            <div className="cs-meta-item">
              <span>Focus</span>
              <p>AI Integration & System Workflows</p>
            </div>
            <div className="cs-meta-item">
              <span>Context</span>
              <p>UX Intelligence Platform</p>
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
                In early-stage product development, teams struggle to convert raw ideas into structured UX outputs like
                personas, journeys, and strategy documents. This creates delays, misalignment, and repeated iterations.
                Designers are often bogged down by artifact generation rather than focused on strategic thinking.
              </p>
            </div>

            <div id="problem" className="cs-content-section reveal">
              <h2>Problem</h2>
              <p>
                UX workflows are fragmented and manual. Designers spend significant time translating ideas into structured
                artifacts, slowing down decision-making and reducing focus on actual problem-solving. This manual overhead
                creates operational drag when speed-to-market is critical.
              </p>
            </div>

            <div id="opportunity" className="cs-content-section reveal">
              <h2>Opportunity</h2>
              <p>
                If AI could assist in structuring thinking — not just generating layout mockups — it could reduce repetitive
                documentation and enable designers to focus on high-level strategic decisions, concept refinement, and user
                research validation.
              </p>
            </div>

            <div id="approach" className="cs-content-section reveal">
              <h2>Approach</h2>
              <p>
                I designed NeuUX AI as a comprehensive system, not just an isolated feature. The focus was on creating a
                guided, conversational flow that translates a simple project brief into structured UX outputs.
              </p>

              <div className="cs-image-container">
                <img src="/Corrected User Level DFD – NeuUX AI (User on Right).png" alt="NeuUX AI flow diagram" />
                <div className="cs-image-caption">
                  User-Level Data Flow Diagram: Showing how the system transforms user briefs into modular, editable UX
                  structures.
                </div>
              </div>
            </div>

            <div id="solution" className="cs-content-section reveal">
              <h2>Solution</h2>
              <p>
                NeuUX AI acts as a UX intelligence assistant that supports the entire early design phase. Instead of
                treating AI as an oracle, the system co-creates with the designer:
              </p>
              <ul>
                <li><strong>AI-generated project overview</strong> and problem framing from raw text prompts.</li>
                <li><strong>Dynamic Persona generation</strong> with interactive, editable attributes.</li>
                <li><strong>Journey map creation</strong> based on selected personas, updating in real time.</li>
                <li><strong>Conversational refinement</strong> allowing the designer to chat with outputs to adjust them.
                </li>
                <li><strong>Structured storage</strong> to export and reuse outputs across design tools like Figma.</li>
              </ul>
              <p>
                The system is designed to support thinking, not replace it — keeping the designer in control.
              </p>

              <div className="cs-image-container">
                <img src="/NeuUX AI (5).png" alt="NeuUX AI Interface" />
                <div className="cs-image-caption">
                  Product Interface Layout: High-fidelity concept presenting the modular workspace and sidebar adjustments.
                </div>
              </div>
            </div>

            <div id="decisions" className="cs-content-section reveal">
              <h2>Key Decisions</h2>
              <p>
                Throughout the project, I prioritized product scaling and human-AI collaboration over auto-generation:
              </p>
              <ul>
                <li><strong>Shifted focus:</strong> Switched from &quot;AI generates final UI mockups&quot; to &quot;AI structures UX
                  thinking.&quot;</li>
                <li><strong>Modular outputs:</strong> Designed discrete, interconnected cards rather than monolithic text
                  blocks.</li>
                <li><strong>Conversational UI:</strong> Integrated side drawers for direct tweaking, avoiding complicated
                  settings screens.</li>
                <li><strong>Editable states:</strong> Ensured every output remains text-editable, reinforcing designer
                  ownership.</li>
              </ul>
            </div>

            <div id="tradeoffs" className="cs-content-section reveal">
              <h2>Trade-offs</h2>
              <p>
                Designing in a fast-paced environment required critical prioritizing:
              </p>
              <ul>
                <li><strong>Reduced feature scope:</strong> We deferred custom style generators to keep the user focused on
                  logical mapping.</li>
                <li><strong>Preserving friction:</strong> We intentionally left some steps manual (e.g., verifying user pain
                  points) to avoid hallucinated personas.</li>
                <li><strong>Context boundaries:</strong> Focused on early-stage UX instead of mapping out the entire
                  software development lifecycle.</li>
              </ul>
            </div>

            <div id="impact" className="cs-content-section reveal">
              <h2>Impact</h2>
              <p>
                NeuUX AI reduces the time required to move from raw idea to structured UX outputs, helping designers and
                cross-functional teams align faster.
              </p>
              <blockquote>
                &quot;By transforming UX research into a system-driven process, we enabled teams to complete validation tasks 4x
                faster.&quot;
              </blockquote>
              <p>
                This system-driven framework creates a highly repeatable, scalable approach to early-stage product design.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY NAVIGATOR */}
      <section className="next-cs-nav">
        <div className="container">
          <span>Next Project</span>
          <Link href="/case-studies/medico">MEDICO</Link>
        </div>
      </section>
    </main>
  );
}
