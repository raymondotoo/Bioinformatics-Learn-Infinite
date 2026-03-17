---
layout: default
title: Bioinformatics Learn Infinite
description: Bioinformatics tutorials from fundamentals to advanced data analysis.
permalink: /
disable_progress: true
---

<style>
/* Enhanced Homepage Styles */
.hero-section {
  background: linear-gradient(135deg, #0a1628 0%, #1a365d 40%, #234e8a 100%);
  color: #ffffff;
  padding: 3rem 2.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(10, 22, 40, 0.25);
  z-index: 0;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse 60% 50% at 85% 50%, rgba(74, 144, 226, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 15% 80%, rgba(56, 189, 248, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.hero-section::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cdefs%3E%3ClinearGradient id='dna' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%234ade80;stop-opacity:0.3'/%3E%3Cstop offset='100%25' style='stop-color:%2322d3ee;stop-opacity:0.3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M320 30 Q340 50 320 70 Q300 90 320 110 Q340 130 320 150 Q300 170 320 190' fill='none' stroke='url(%23dna)' stroke-width='3' opacity='0.4'/%3E%3Cpath d='M360 30 Q340 50 360 70 Q380 90 360 110 Q340 130 360 150 Q380 170 360 190' fill='none' stroke='url(%23dna)' stroke-width='3' opacity='0.4'/%3E%3Cline x1='323' y1='40' x2='357' y2='40' stroke='%2322d3ee' stroke-width='2' opacity='0.25'/%3E%3Cline x1='313' y1='70' x2='367' y2='70' stroke='%234ade80' stroke-width='2' opacity='0.25'/%3E%3Cline x1='323' y1='100' x2='357' y2='100' stroke='%2322d3ee' stroke-width='2' opacity='0.25'/%3E%3Cline x1='313' y1='130' x2='367' y2='130' stroke='%234ade80' stroke-width='2' opacity='0.25'/%3E%3Cline x1='323' y1='160' x2='357' y2='160' stroke='%2322d3ee' stroke-width='2' opacity='0.25'/%3E%3Ccircle cx='80' cy='40' r='4' fill='%234ade80' opacity='0.2'/%3E%3Ccircle cx='120' cy='160' r='6' fill='%2322d3ee' opacity='0.15'/%3E%3Ccircle cx='250' cy='180' r='3' fill='%234ade80' opacity='0.2'/%3E%3C/svg%3E");
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 50% auto;
  opacity: 0.8;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.hero-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 211, 238, 0.2));
  color: #a7f3d0;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(74, 222, 128, 0.25);
  letter-spacing: 0.02em;
}

.hero-title {
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.15;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.15rem;
  opacity: 0.92;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4ade80, #22d3ee);
  color: #0a1628;
  padding: 0.9rem 1.75rem;
  border-radius: 0.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s;
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 222, 128, 0.4);
  filter: brightness(1.05);
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), #4ade80);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(31, 79, 143, 0.12);
}

.stat-card:hover::after {
  transform: scaleX(1);
}

.stat-icon {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.section-header h2 {
  margin: 0;
  border: none;
  padding: 0;
}

.path-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.path-card {
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.path-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
}

.path-card-image-wrapper {
  position: relative;
  overflow: hidden;
  background: var(--card-header-bg);
  height: 140px;
}

.path-card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #02b3e4 0%, #02ccba 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.path-card-badge svg {
  width: 18px;
  height: 18px;
  fill: #ffffff;
}

.path-card-content {
  padding: 1.25rem 1.25rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.path-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--purple);
  margin: 0 0 0.5rem;
  line-height: 1.35;
}

.path-desc {
  font-size: 0.88rem;
  color: var(--ink-soft);
  margin: 0;
  line-height: 1.55;
  flex: 1;
}

.path-card-footer {
  padding: 0.85rem 1.25rem;
  background: var(--surface-soft);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.path-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--purple);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.path-tag svg {
  width: 12px;
  height: 12px;
  fill: currentColor;
}

.path-meta {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.75rem;
  color: var(--ink-soft);
}

.path-meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.path-meta-item svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  opacity: 0.7;
}

.path-new-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #00c853, #00a844);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 10px rgba(0, 200, 83, 0.3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  padding: 1.75rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), #4ade80);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(31, 79, 143, 0.12);
  border-color: var(--accent-soft);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.15);
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.5rem;
}

.feature-text {
  font-size: 0.92rem;
  color: var(--ink-soft);
  margin: 0;
  line-height: 1.6;
}

.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.panel-enhanced {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  padding: 1.75rem;
  transition: all 0.3s ease;
}

.panel-enhanced:hover {
  box-shadow: 0 8px 24px rgba(31, 79, 143, 0.08);
}

.panel-enhanced.paths-section {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f8ff 100%);
  border: 1px solid #dce5f5;
  padding: 2rem;
  margin-bottom: 2rem;
}

.panel-enhanced.paths-section:hover {
  box-shadow: none;
}

.panel-enhanced h2 {
  margin: 0 0 1rem;
  padding: 0;
  border: none;
  font-size: 1.25rem;
}

.author-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.author-photo-enhanced {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-soft);
  flex-shrink: 0;
}

.author-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.author-bio {
  font-size: 0.88rem;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0;
}

.author-info h3 {
  margin: 0 0 0.25rem;
  font-size: 1.15rem;
  color: var(--ink);
}

.author-role {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.7rem;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 0.4rem;
  color: var(--ink);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
}

.social-link:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

.resources-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.resources-table th,
.resources-table td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.resources-table th {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  font-weight: 700;
  color: #ffffff;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.resources-table td {
  font-size: 0.95rem;
}

.resources-table tbody tr {
  transition: background 0.2s ease;
}

.resources-table tbody tr:hover td {
  background: var(--accent-soft);
}

.resources-table a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.resources-table a:hover {
  text-decoration: underline;
}

.cta-final {
  text-align: center;
  padding: 3rem 2.5rem;
  background: linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #2d4a7c 100%);
  border: none;
  border-radius: 1rem;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.cta-final::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse 50% 50% at 80% 50%, rgba(74, 222, 128, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 20% 70%, rgba(34, 211, 238, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.cta-final h2 {
  margin: 0 0 0.75rem;
  border: none;
  padding: 0;
  color: #ffffff;
  position: relative;
  z-index: 1;
}

.cta-final p {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

.cta-btn-primary {
  display: inline-block;
  background: linear-gradient(135deg, #4ade80, #22d3ee);
  color: #0a1628;
  padding: 0.95rem 2.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.25s;
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
  position: relative;
  z-index: 1;
}
}

.cta-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 222, 128, 0.4);
  filter: brightness(1.05);
}

@media (max-width: 900px) {
  .path-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    margin-bottom: 1.5rem;
  }
  .hero-section::after {
    display: none;
  }
  .hero-title {
    font-size: 1.8rem;
  }
  .path-grid {
    grid-template-columns: 1fr;
  }
  .path-card-image {
    height: 140px;
  }
  .two-col-grid {
    grid-template-columns: 1fr;
  }
  .author-card {
    flex-direction: column;
    text-align: center;
  }
  .author-photo-enhanced {
    margin: 0 auto;
  }
  .social-links {
    justify-content: center;
    flex-wrap: wrap;
  }
  .panel-enhanced {
    position: relative;
    z-index: 1;
  }
  .stats-bar {
    position: relative;
    z-index: 1;
  }
}
</style>

<!-- Hero Section -->
<section class="hero-section">
  <div class="hero-content">
    <span class="hero-badge">🧬 Free Bioinformatics Education</span>
    <h1 class="hero-title">Master Bioinformatics from Zero to Expert</h1>
    <p class="hero-subtitle">A comprehensive, industry-aligned curriculum covering everything from biology fundamentals to cutting-edge AI-driven analysis. Join thousands of learners transforming their careers in computational biology.</p>
    <a href="{{ '/introduction-to-bioinformatics/' | relative_url }}" class="hero-cta">
      Start Learning Now →
    </a>
  </div>
</section>

<!-- Stats Bar -->
<div class="stats-bar">
  <div class="stat-card">
    <div class="stat-icon">📚</div>
    <div class="stat-number">9</div>
    <div class="stat-label">Learning Paths</div>
  </div>
  <div class="stat-card">
    <div class="stat-icon">💻</div>
    <div class="stat-number">500+</div>
    <div class="stat-label">Code Examples</div>
  </div>
  <div class="stat-card">
    <div class="stat-icon">🔬</div>
    <div class="stat-number">50+</div>
    <div class="stat-label">Hands-on Tutorials</div>
  </div>
  <div class="stat-card">
    <div class="stat-icon">🌍</div>
    <div class="stat-number">Free</div>
    <div class="stat-label">Forever</div>
  </div>
</div>

<!-- Learning Paths -->
<section class="panel-enhanced paths-section">
  <div class="section-header">
    <h2>📖 Learning Paths</h2>
    <span style="font-size: 0.9rem; color: var(--ink-soft);">Follow in order for best results</span>
  </div>
  
  <div class="path-grid">
    <a href="{{ '/introduction-to-bioinformatics/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Introduction to Bioinformatics</h3>
        <p class="path-desc">Start here. Understand the field, career paths, and fundamental concepts that form the foundation.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Beginner
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            8 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/biology-fundamentals-for-bioinformatics/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Biology Fundamentals</h3>
        <p class="path-desc">Essential molecular biology, genetics, and biochemistry concepts every bioinformatician needs.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Beginner
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            12 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/statistical-analysis-and-inference/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Statistics & Inference</h3>
        <p class="path-desc">Hypothesis testing, FDR correction, and statistical modeling for biological data analysis.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Intermediate
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            15 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/bioinformatics-core-skills/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Core Skills</h3>
        <p class="path-desc">Linux, Python, R, Git, and reproducible research practices for computational biology.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Beginner
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            20 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/bioinformatics-data-analysis-focused-ngs/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">NGS Data Analysis</h3>
        <p class="path-desc">RNA-seq, DNA-seq, variant calling, and ChIP-seq workflows from raw data to results.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Intermediate
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            25 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/machine-learning/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Machine Learning</h3>
        <p class="path-desc">Classification, clustering, deep learning, and neural networks for biological data.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Advanced
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            30 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/multiomics-data-integration/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Multi-Omics Integration</h3>
        <p class="path-desc">MOFA+, DIABLO, and cross-platform data integration methods for comprehensive analysis.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Advanced
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            22 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/single-cell-and-spatial-omics-analysis/' | relative_url }}" class="path-card">
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Single-Cell & Spatial Omics</h3>
        <p class="path-desc">scRNA-seq, Visium, Xenium, and spatial analysis workflows at single-cell resolution.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Advanced
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            28 hours
          </span>
        </div>
      </div>
    </a>
    
    <a href="{{ '/agentic-ai-bioinformatics/' | relative_url }}" class="path-card">
      <span class="path-new-badge">NEW</span>
      <div class="path-card-image-wrapper">
        <span class="path-card-badge">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
        </span>

      </div>
      <div class="path-card-content">
        <h3 class="path-title">Agentic AI for Bioinformatics</h3>
        <p class="path-desc">Build AI agents that automate analysis pipelines from raw data to biological interpretation.</p>
      </div>
      <div class="path-card-footer">
        <span class="path-tag">
          <svg viewBox="0 0 24 24"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>
          LEARNING PATH
        </span>
        <div class="path-meta">
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Advanced
          </span>
          <span class="path-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            35 hours
          </span>
        </div>
      </div>
    </a>
  </div>
</section>

<!-- Why This Platform -->
<section class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">🎯</div>
    <h3 class="feature-title">Industry-Aligned</h3>
    <p class="feature-text">Curriculum designed by working bioinformatics scientists using real-world tools and workflows.</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">🔧</div>
    <h3 class="feature-title">Hands-On Code</h3>
    <p class="feature-text">Every concept includes working code examples in Python, R, and Bash that you can run immediately.</p>
  </div>
  <div class="feature-card">
    <div class="feature-icon">📈</div>
    <h3 class="feature-title">Zero to Expert</h3>
    <p class="feature-text">Progressive learning path from absolute beginner to advanced multi-omics and AI integration.</p>
  </div>
</section>

<!-- Two Column: Author + Blog -->
<div class="two-col-grid">
  <article class="panel-enhanced">
    <h2>👨‍🔬 Meet the Author</h2>
    <div class="author-card">
      <img src="{{ '/author.png' | relative_url }}" alt="Dr. Raymond Otoo" class="author-photo-enhanced">
      <div class="author-info">
        <h3>Dr. Raymond Otoo, Ph.D.</h3>
        <p class="author-role">Senior Bioinformatics Scientist</p>
        <p class="author-bio">5+ years advancing translational research through integrative multi-omics and AI-driven analytics at the Barrow Neuroanalytics Center.</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/raymondotoo" class="social-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
          <a href="https://twitter.com/BioLnInfinite" class="social-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter
          </a>
          <a href="mailto:raymondotoo115@gmail.com" class="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            Email
          </a>
        </div>
      </div>
    </div>
  </article>

  <article class="panel-enhanced">
    <h2>📝 Latest from the Blog</h2>
    {% assign latest_post = site.posts.first %}
    {% if latest_post %}
    <article style="margin-bottom: 1rem;">
      <p style="font-size: 0.85rem; color: var(--ink-soft); margin: 0 0 0.5rem;">{{ latest_post.date | date: "%B %-d, %Y" }}</p>
      <h3 style="margin: 0 0 0.5rem; font-size: 1.1rem;"><a href="{{ latest_post.url | relative_url }}" style="color: var(--ink); text-decoration: none;">{{ latest_post.title }}</a></h3>
      <p style="font-size: 0.92rem; color: var(--ink-soft); margin: 0 0 1rem; line-height: 1.6;">{{ latest_post.excerpt | strip_html | truncatewords: 30 }}</p>
      <a href="{{ latest_post.url | relative_url }}" style="color: var(--accent); font-weight: 600; text-decoration: none;">Read more →</a>
    </article>
    {% else %}
    <p style="color: var(--ink-soft);">Blog posts coming soon.</p>
    {% endif %}
    
    <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1rem;">
      <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--ink);">💡 Tip of the Week</h4>
      <p style="font-size: 0.9rem; color: var(--ink-soft); margin: 0; line-height: 1.6;"><strong>Always check library sizes before normalization.</strong> Samples with very low read counts may need to be excluded or handled differently in your analysis.</p>
    </div>
  </article>
</div>

<!-- External Resources -->
<section class="panel-enhanced">
  <h2>🔗 Recommended External Resources</h2>
  <table class="resources-table">
    <thead>
      <tr><th>Topic</th><th>Description</th><th>Resource</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Bulk RNA-seq</td>
        <td>Complete differential expression workflow</td>
        <td><a href="https://hbctraining.github.io/DGE_workshop/lessons/01_DGE_setup_and_overview.html" target="_blank" rel="noopener">Harvard Chan Bioinformatics Core</a></td>
      </tr>
      <tr>
        <td>Single-Cell RNA-seq</td>
        <td>PBMC 3k tutorial with Seurat</td>
        <td><a href="https://satijalab.org/seurat/articles/pbmc3k_tutorial.html" target="_blank" rel="noopener">Seurat Tutorial</a></td>
      </tr>
      <tr>
        <td>Proteomics</td>
        <td>Quantification and preprocessing</td>
        <td><a href="https://statomics.github.io/PDA21/pda_quantification_preprocessing.html" target="_blank" rel="noopener">StatOmics</a></td>
      </tr>
      <tr>
        <td>Microbiome</td>
        <td>16S rRNA analysis pipeline</td>
        <td><a href="https://github.com/tanyabrown9/Resilient_vs_Susceptible_Mcapitata" target="_blank" rel="noopener">GitHub Repository</a></td>
      </tr>
      <tr>
        <td>Variant Annotation</td>
        <td>ANNOVAR, VEP, and SnpEff guides</td>
        <td><a href="https://annovar.openbioinformatics.org/en/latest/" target="_blank" rel="noopener">ANNOVAR Documentation</a></td>
      </tr>
      <tr>
        <td>Galaxy Platform</td>
        <td>Web-based analysis for non-coders</td>
        <td><a href="https://usegalaxy.org/" target="_blank" rel="noopener">UseGalaxy.org</a></td>
      </tr>
    </tbody>
  </table>
</section>

<!-- Final CTA -->
<section class="cta-final">
  <h2>Ready to Start Your Journey?</h2>
  <p>Begin with the fundamentals and work your way to advanced analysis techniques.</p>
  <a href="{{ '/introduction-to-bioinformatics/' | relative_url }}" class="cta-btn-primary">Begin Module 1 →</a>
</section>
