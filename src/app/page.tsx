import type { Metadata } from "next";
import HeroAvatar from "@/components/HeroAvatar";

export const metadata: Metadata = {
  title: "Amenda Maria Johnson — Product Designer",
  description:
    "Product Designer crafting scalable digital experiences across AI, healthcare, and learning platforms — turning complexity into clarity.",
};

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section id="hero" className="hero">
        <div className="container hero-grid">
          <div className="hero-text-block">
            <p className="hero-eyebrow reveal">Product Designer • India → Global</p>

            <h1 className="hero-headline reveal delay-1">
              Designing systems that solve real-world complexity
            </h1>

            <p className="hero-sub reveal delay-2">
              I design scalable digital experiences across AI, healthcare, and learning platforms — turning complex workflows
              into intuitive, user-centered systems.
            </p>

            <div className="hero-cta reveal delay-3">
              <a href="/case-studies" className="btn-link">View Case Studies</a>
              <a href="/Amenda Maria Johnson.pdf" className="btn-link" download>Download Resume</a>
            </div>
          </div>

          <HeroAvatar />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">About</span>
            <hr className="rule" />
          </div>

          <div className="about-wrapper">
            <div className="about-image reveal">
              <img src="/profile.png" alt="Amenda Maria Johnson" />
            </div>

            <div className="about-content reveal delay-1">
              <h2 className="about-heading">
                Turning complexity into clarity through design.
              </h2>
              <p>
                I'm a Product Designer focused on solving real-world problems through structured thinking and system-driven
                design.
              </p>
              <p>
                My work sits at the intersection of AI, healthcare, and learning — domains where clarity, efficiency, and
                usability directly impact people’s lives.
              </p>
              <p>
                I approach design beyond visuals — defining flows, simplifying decisions, and building scalable systems that
                work in real environments, not just screens.
              </p>
              <p>
                With a strong understanding of both design and development, I create solutions that are not only meaningful
                but also practical to build and scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="work">
        <div className="container">
          <div className="section-header reveal section-header-no-line">
            <span className="section-label">Selected Work</span>
          </div>

          <div className="work-grid">
            {/* ITEM 01 */}
            <a href="/case-studies/neuux" className="work-item reveal">
              <p className="work-num">01</p>
              <h2 className="work-title">NeuUX AI</h2>
              <p className="work-desc">
                Building an AI-powered UX system that transforms raw ideas into structured design outputs, reducing manual
                effort and improving decision-making.
              </p>
              <span className="work-arrow">View Case Study</span>
            </a>

            {/* ITEM 02 */}
            <a href="/case-studies/medico" className="work-item reveal delay-1">
              <p className="work-num">02</p>
              <h2 className="work-title">MEDICO</h2>
              <p className="work-desc">
                Redesigning hospital OP workflows into a streamlined digital system, improving patient flow and reducing
                operational friction.
              </p>
              <span className="work-arrow">View Case Study</span>
            </a>

            {/* ITEM 03 */}
            <a href="/case-studies/beyond-syllabus" className="work-item reveal">
              <p className="work-num">03</p>
              <h2 className="work-title">Beyond Syllabus</h2>
              <p className="work-desc">
                Creating a learning experience that bridges academic gaps through structured, accessible, and engaging
                digital design.
              </p>
              <span className="work-arrow">View Case Study</span>
            </a>

            {/* ITEM 04 */}
            <a href="/case-studies/purple-movement" className="work-item reveal delay-1">
              <p className="work-num">04</p>
              <h2 className="work-title">Purple Movement</h2>
              <p className="work-desc">
                Designing a digital identity that transforms community purpose into clear, engaging user experiences.
              </p>
              <span className="work-arrow">View Case Study</span>
            </a>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY / HOW I DESIGN */}
      <section className="hid">
        <div className="container hid-wrap">
          <div className="hid-side reveal">
            <span className="section-label">How I Design</span>
          </div>

          <div className="hid-main">
            <div className="reveal">
              <h2 className="hid-title">
                I design by turning complexity into structured, usable systems.
              </h2>
              <p className="hid-sub">
                Every decision is driven by clarity, usability, and real-world impact.
              </p>
            </div>

            <div className="hid-list">
              <div className="principle reveal">
                <span className="p-no">01</span>
                <div className="p-content">
                  <h3>Structure before screens</h3>
                  <p>I define user flows, operational systems, and internal logic before designing surface interfaces.</p>
                </div>
              </div>

              <div className="principle reveal">
                <span className="p-no">02</span>
                <div className="p-content">
                  <h3>Clarity over complexity</h3>
                  <p>I simplify interactions, reduce administrative overhead, and remove unnecessary user friction.</p>
                </div>
              </div>

              <div className="principle reveal">
                <span className="p-no">03</span>
                <div className="p-content">
                  <h3>Systems, not pages</h3>
                  <p>I build scalable design tokens, components, and design systems instead of static screens.</p>
                </div>
              </div>

              <div className="principle reveal">
                <span className="p-no">04</span>
                <div className="p-content">
                  <h3>AI as a co-creator</h3>
                  <p>Leveraging AI to assist early design stages, structure thinking, and optimize workflows.</p>
                </div>
              </div>

              <div className="principle reveal">
                <span className="p-no">05</span>
                <div className="p-content">
                  <h3>Design as thinking</h3>
                  <p>Good product design comes from deep understanding, testing, and clarity, not styling decorations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section" id="skills">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Skills</span>
            <hr className="rule" />
          </div>

          <div className="skills-grid">
            <div className="skill-card reveal">
              <h3>UX Thinking</h3>
              <ul>
                <li>User Research</li>
                <li>Problem Framing</li>
                <li>User Journey Mapping</li>
                <li>Interaction Design</li>
              </ul>
            </div>

            <div className="skill-card reveal delay-1">
              <h3>UI Execution</h3>
              <ul>
                <li>Visual Hierarchy</li>
                <li>Design Systems</li>
                <li>Prototyping</li>
                <li>Responsive Layouts</li>
              </ul>
            </div>

            <div className="skill-card reveal delay-2">
              <h3>Product Strategy</h3>
              <ul>
                <li>AI-assisted UX</li>
                <li>Workflow System Design</li>
                <li>Data-informed Flows</li>
                <li>Cross-functional Alignment</li>
              </ul>
            </div>

            <div className="skill-card reveal delay-3">
              <h3>Tools</h3>
              <ul>
                <li>Figma</li>
                <li>FigJam</li>
                <li>Notion</li>
                <li>Framer / Webflow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience-section">
        <div className="container exp-container">
          <div className="exp-left reveal">
            <p className="exp-label">Experience & Recognition</p>
          </div>

          <div className="exp-right">
            {/* ITEM 01 */}
            <div className="exp-item highlight reveal">
              <h3>UI/UX Intern — Foodo.ai (UK)</h3>
              <p>
                Designed user experiences for food-technology platforms, focusing on interface usability, operations
                dashboard efficiency, and active product workflows.
              </p>
            </div>

            {/* ITEM 02 */}
            <div className="exp-item reveal">
              <h3>Designer — The Purple Movement</h3>
              <p>
                Contributed to social impact initiatives by establishing platform interface architectures, layouts, and
                public-facing digital assets.
              </p>
            </div>

            {/* ITEM 03 */}
            <div className="exp-item reveal">
              <h3>UI/UX Intern — µLearn</h3>
              <p>
                Improved student onboarding engagement rates within a large-scale skill development platform and digital
                learning ecosystem.
              </p>
            </div>

            {/* ITEM 04 */}
            <div className="exp-item reveal">
              <h3>AI + Compassion — Social Media Design</h3>
              <p>
                Supported global outreach initiatives by leading digital design campaigns across 50+ countries.
              </p>
            </div>

            {/* ITEM 05 */}
            <div className="exp-item reveal">
              <h3>Social Designer — Vijnana Keralam (K-DISC)</h3>
              <p>
                Created design campaigns for a Kerala State Government innovation board, contributing to state-wide
                communication campaigns.
              </p>
            </div>

            {/* ITEM 06 */}
            <div className="exp-item highlight reveal">
              <h3>Featured — The Times of India</h3>
              <p>
                Recognized and featured for significant design contributions during the regional HR Elevate event.
              </p>
            </div>

            {/* ITEM 07 */}
            <div className="exp-item reveal">
              <h3>Workshops & Design Education</h3>
              <p>
                Conducted UI/UX career bootcamps for engineering college students and introductory design workshops for
                secondary school students.
              </p>
            </div>

            {/* ITEM 08 */}
            <div className="exp-item reveal">
              <h3>IEDC Coordinator — Innovation & Design</h3>
              <p>
                Served as active member and coordinator for 3 years, driving entrepreneurial projects and applying product
                design to real startup ideas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
