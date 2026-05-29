import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-left reveal">
          <p className="footer-name">Amenda Maria Johnson</p>
          <p className="footer-note">
            Product Designer crafting systems that bring clarity, efficiency, and real-world impact.
          </p>
        </div>
        <div className="footer-links reveal delay-1">
          <Link href="/#work">Work</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/#about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-right reveal delay-2">
          <p className="footer-meta">
            Let’s build meaningful digital products.<br />
            Open to global opportunities.
          </p>
          <p className="footer-copy">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
