---
layout: default
title: Hire a Bioinformatics Expert
description: Connect with vetted bioinformatics experts for your research and analysis projects.
permalink: /hire-expert/
---

<style>
.expert-hero {
  text-align: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, #0f2238 0%, #1f4f8f 100%);
  color: #ffffff;
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.expert-hero h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem;
  color: #ffffff;
}

.expert-hero p {
  font-size: 1.15rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.7;
}

.expert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.expert-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.expert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(31, 79, 143, 0.15);
}

.expert-card.featured {
  border: 2px solid var(--accent);
  position: relative;
}

.expert-card.featured::before {
  content: "FEATURED";
  position: absolute;
  top: 1rem;
  right: -2rem;
  background: var(--accent);
  color: white;
  padding: 0.3rem 2.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transform: rotate(45deg);
}

.expert-header {
  background: linear-gradient(135deg, #eaf1ff 0%, #d6e3f8 100%);
  padding: 2rem;
  text-align: center;
}

.expert-photo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.expert-photo-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-soft) 0%, var(--border) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.expert-photo-placeholder svg {
  width: 60px;
  height: 60px;
  opacity: 0.4;
}

.expert-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.3rem;
}

.expert-title {
  font-size: 0.95rem;
  color: var(--ink-soft);
  margin: 0;
}

.expert-body {
  padding: 1.5rem 2rem 2rem;
}

.expertise-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  margin-bottom: 0.6rem;
}

.expertise-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.expertise-tag {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
}

.expert-bio {
  font-size: 0.95rem;
  color: var(--ink-soft);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.expert-contact {
  display: flex;
  gap: 0.75rem;
}

.contact-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.contact-btn.primary {
  background: var(--accent);
  color: #ffffff;
}

.contact-btn.primary:hover {
  background: #163d73;
}

.contact-btn.secondary {
  background: var(--surface-soft);
  color: var(--accent);
  border: 1px solid var(--border);
}

.contact-btn.secondary:hover {
  background: var(--accent-soft);
}

.contact-btn svg {
  width: 18px;
  height: 18px;
}

.placeholder-card .expert-body {
  opacity: 0.7;
}

.placeholder-notice {
  background: var(--surface-soft);
  border: 1px dashed var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.cta-section {
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  margin-top: 2rem;
}

.cta-section h2 {
  margin: 0 0 1rem;
  color: var(--ink);
}

.cta-section p {
  color: var(--ink-soft);
  max-width: 600px;
  margin: 0 auto 1.5rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent);
  color: #ffffff;
  padding: 0.9rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
}

.cta-btn:hover {
  background: #163d73;
}

.trust-badges {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.trust-badge {
  text-align: center;
}

.trust-badge-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
}

.trust-badge-label {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

@media (max-width: 768px) {
  .expert-hero h1 {
    font-size: 1.8rem;
  }
  
  .expert-grid {
    grid-template-columns: 1fr;
  }
  
  .trust-badges {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>

<section class="expert-hero">
  <h1>Hire a Bioinformatics Expert</h1>
  <p>Connect with vetted bioinformatics specialists for your research projects. Our experts bring deep domain expertise in omics analysis, machine learning, and translational research.</p>
</section>

<div class="expert-grid">

  <!-- Featured Expert: Dr. Raymond Otoo -->
  <article class="expert-card featured">
    <div class="expert-header">
      <img src="{{ '/author.png' | relative_url }}" alt="Dr. Raymond Otoo" class="expert-photo">
      <h3 class="expert-name">Dr. Raymond Otoo, Ph.D.</h3>
      <p class="expert-title">Senior Bioinformatics Scientist</p>
    </div>
    <div class="expert-body">
      <p class="expertise-label">Areas of Expertise</p>
      <div class="expertise-tags">
        <span class="expertise-tag">Multi-omics Integration</span>
        <span class="expertise-tag">Transcriptomics</span>
        <span class="expertise-tag">Proteomics</span>
        <span class="expertise-tag">Microbiomics</span>
        <span class="expertise-tag">GWAS</span>
      </div>
      <p class="expert-bio">
        Dr. Raymond Otoo is a Bioinformatics Scientist with 5+ years of experience at the intersection of bioinformatics research and machine learning. He specializes in integrative multimodal omics analytics, leveraging AI-driven approaches to advance translational discovery and enhance disease modeling.
      </p>
      <div class="expert-contact">
        <a href="https://www.linkedin.com/in/raymondotoo" class="contact-btn primary" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          Connect on LinkedIn
        </a>
      </div>
    </div>
  </article>

  <!-- Placeholder Expert 2 -->
  <article class="expert-card placeholder-card">
    <div class="expert-header">
      <div class="expert-photo-placeholder">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
      </div>
      <h3 class="expert-name">Expert Position Available</h3>
      <p class="expert-title">Bioinformatics Specialist</p>
    </div>
    <div class="expert-body">
      <p class="expertise-label">Seeking Expertise In</p>
      <div class="expertise-tags">
        <span class="expertise-tag">Single-Cell Analysis</span>
        <span class="expertise-tag">Spatial Omics</span>
        <span class="expertise-tag">scRNA-seq</span>
      </div>
      <div class="placeholder-notice">
        <p><strong>Are you an expert in this field?</strong><br>We're looking for qualified specialists to join our network. Apply below to be featured.</p>
      </div>
    </div>
  </article>

  <!-- Placeholder Expert 3 -->
  <article class="expert-card placeholder-card">
    <div class="expert-header">
      <div class="expert-photo-placeholder">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
      </div>
      <h3 class="expert-name">Expert Position Available</h3>
      <p class="expert-title">Computational Biologist</p>
    </div>
    <div class="expert-body">
      <p class="expertise-label">Seeking Expertise In</p>
      <div class="expertise-tags">
        <span class="expertise-tag">Machine Learning</span>
        <span class="expertise-tag">Deep Learning</span>
        <span class="expertise-tag">Drug Discovery</span>
      </div>
      <div class="placeholder-notice">
        <p><strong>Are you an expert in this field?</strong><br>We're looking for qualified specialists to join our network. Apply below to be featured.</p>
      </div>
    </div>
  </article>

  <!-- Placeholder Expert 4 -->
  <article class="expert-card placeholder-card">
    <div class="expert-header">
      <div class="expert-photo-placeholder">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
      </div>
      <h3 class="expert-name">Expert Position Available</h3>
      <p class="expert-title">Genomics Specialist</p>
    </div>
    <div class="expert-body">
      <p class="expertise-label">Seeking Expertise In</p>
      <div class="expertise-tags">
        <span class="expertise-tag">Variant Analysis</span>
        <span class="expertise-tag">Clinical Genomics</span>
        <span class="expertise-tag">WGS/WES</span>
      </div>
      <div class="placeholder-notice">
        <p><strong>Are you an expert in this field?</strong><br>We're looking for qualified specialists to join our network. Apply below to be featured.</p>
      </div>
    </div>
  </article>

</div>

<section class="cta-section">
  <h2>Are You a Bioinformatics Expert?</h2>
  <p>Join our network of vetted specialists and connect with clients seeking your expertise. We carefully review all applications to ensure quality.</p>
  <a href="mailto:raymondotoo115@gmail.com?subject=Expert Application - Bioinformatics Learn Infinite" class="cta-btn">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
    Apply to Join Our Network
  </a>
  
  <div class="trust-badges">
    <div class="trust-badge">
      <div class="trust-badge-number">5+</div>
      <div class="trust-badge-label">Years Experience Required</div>
    </div>
    <div class="trust-badge">
      <div class="trust-badge-number">100%</div>
      <div class="trust-badge-label">Vetted Experts</div>
    </div>
    <div class="trust-badge">
      <div class="trust-badge-number">24h</div>
      <div class="trust-badge-label">Response Time</div>
    </div>
  </div>
</section>
