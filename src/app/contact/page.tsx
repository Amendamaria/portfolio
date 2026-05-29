import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Amenda Maria Johnson",
  description:
    "Get in touch with Amenda Maria Johnson, Product Designer open to global product design roles.",
};

export default function Contact() {
  return (
    <main>
      {/* CONTACT CONTENT */}
      <section className="contact-page">
        <div className="container contact-grid">
          
          {/* LEFT INFO PANEL */}
          <div className="contact-left reveal">
            <span className="section-label">Contact</span>
            <h1 className="contact-title">Let’s build something meaningful together.</h1>
            <p className="contact-desc">
              Open to global product design roles, design consulting, and collaborations on AI-driven systems or early-stage
              products.
            </p>

            <div className="contact-links">
              <a href="mailto:amendamariajohn@gmail.com" className="contact-email-link">
                amendamariajohn@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/amenda-maria-johnson/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="/Amenda Maria Johnson.pdf" target="_blank" download>
                Download Resume
              </a>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="contact-right reveal delay-1">
            <form className="contact-form" id="contact-form" action="https://formspree.io/f/xvonzpge" method="POST">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your name" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="_replyto" required placeholder="your.email@example.com" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={5}
                  placeholder="Tell me about your project or role..."
                />
              </div>

              <button type="submit" className="form-btn">Send Message</button>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
