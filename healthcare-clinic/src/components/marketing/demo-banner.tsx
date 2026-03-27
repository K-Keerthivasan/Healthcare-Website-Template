"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BACK_URL = "https://k2digitalmedia.ca";
const LOGO_URL = "https://k2digitalmedia.ca/Logo.png";

export function DemoBanner() {
  const navRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [sideOpen, setSideOpen] = useState(true);

  useEffect(() => {
    const body = document.body;
    const syncOffsets = () => {
      const navHeight = navRef.current?.offsetHeight ?? 34;
      const footerHeight = footerRef.current?.offsetHeight ?? 30;

      body.style.setProperty("--k2-demo-strip-height", `${navHeight}px`);
      body.style.setProperty("--k2-demo-footer-height", `${footerHeight}px`);
    };

    syncOffsets();
    body.classList.add("k2-demo-active");

    const resizeObserver = new ResizeObserver(syncOffsets);
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    window.addEventListener("resize", syncOffsets);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncOffsets);
      body.classList.remove("k2-demo-active");
      body.style.removeProperty("--k2-demo-strip-height");
      body.style.removeProperty("--k2-demo-footer-height");
    };
  }, []);

  return (
    <>
      <div id="k2-nav-strip" ref={navRef}>
        <span className="k2-dot" aria-hidden="true" />
        <span>This is a demo site built by</span>
        <a id="k2-nav-brand" href={BACK_URL} target="_blank" rel="noopener noreferrer">
          K2 Digital Media
        </a>
        <span className="k2-divider" aria-hidden="true">
          -
        </span>
        <a
          id="k2-nav-back"
          className="k2-back-btn"
          href={BACK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go Back
        </a>
      </div>

      <div id="k2-side-wrap" data-open={sideOpen}>
        <button
          id="k2-side-tab"
          type="button"
          onClick={() => setSideOpen((open) => !open)}
          aria-label={sideOpen ? "Collapse demo panel" : "Expand demo panel"}
          aria-expanded={sideOpen}
          aria-controls="k2-side-panel"
        >
          <span className="k2-arrow" aria-hidden="true">
            {sideOpen ? ">" : "<"}
          </span>
          Demo
        </button>
        <div id="k2-side-panel" className={sideOpen ? "" : "k2-closed"}>
          <div className="k2-logo-wrap">
            <Image src={LOGO_URL} alt="K2 Digital Media" width={48} height={48} />
          </div>
          <div className="k2-badge">
            <span className="k2-badge-dot" aria-hidden="true" />
            Demo Site
          </div>
          <p className="k2-text">
            This is a demo built by <strong>K2 Digital Media</strong>
          </p>
          <a
            id="k2-side-cta"
            className="k2-cta"
            href={BACK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Back to K2DM
          </a>
        </div>
      </div>

      <div id="k2-footer-strip" ref={footerRef}>
        <Image id="k2-footer-logo" src={LOGO_URL} alt="K2 Digital Media" width={18} height={18} />
        <span>Demo by</span>
        <a
          id="k2-footer-brand"
          className="k2-f-brand"
          href={BACK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          K2 Digital Media
        </a>
        <span className="k2-f-divider" aria-hidden="true">
          |
        </span>
        <a
          id="k2-footer-link"
          className="k2-f-link"
          href={BACK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Main Site
        </a>
      </div>
    </>
  );
}
