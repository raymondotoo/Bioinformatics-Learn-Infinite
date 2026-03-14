---
layout: default
title: Submit Feedback
description: Help us improve Bioinformatics Learn Infinite with your feedback.
permalink: /feedback/
---

<style>
/* Feedback Page Styles */
.feedback-hero {
  background: linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #234e8a 100%);
  color: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.feedback-hero h1 {
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.feedback-hero p {
  margin: 0;
  font-size: 1.05rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.feedback-container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}

.feedback-form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
}

.feedback-form-card h2 {
  margin: 0 0 0.5rem;
  padding: 0;
  border: none;
  font-size: 1.35rem;
  color: var(--ink);
}

.feedback-form-card .form-intro {
  margin: 0 0 1.5rem;
  color: var(--ink-soft);
  font-size: 0.95rem;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group label .required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-group label .optional {
  color: var(--ink-soft);
  font-weight: 400;
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-family: inherit;
  background: var(--surface);
  color: var(--ink);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* Star Rating */
.rating-group {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 0.25rem;
}

.rating-group input {
  display: none;
}

.rating-group label {
  cursor: pointer;
  font-size: 1.75rem;
  color: #d1d5db;
  transition: color 0.15s;
  margin: 0;
}

.rating-group label:hover,
.rating-group label:hover ~ label,
.rating-group input:checked ~ label {
  color: #fbbf24;
}

/* Checkbox group */
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-item input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
  cursor: pointer;
}

.checkbox-item span {
  font-size: 0.9rem;
  color: var(--ink);
}

/* Submit Button */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem 1.5rem;
  background: linear-gradient(135deg, var(--accent), #2563eb);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(31, 79, 143, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Sidebar */
.feedback-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sidebar-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  padding: 1.5rem;
}

.sidebar-card h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

.sidebar-card ul {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
}

.sidebar-card li {
  font-size: 0.88rem;
  color: var(--ink-soft);
  margin-bottom: 0.35rem;
  line-height: 1.5;
}

.privacy-note {
  background: linear-gradient(135deg, #f0fdf4, #ecfeff);
  border-color: #86efac;
}

.alt-contact {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.alt-contact a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.alt-contact a:hover {
  text-decoration: underline;
}

/* Success/Error Messages */
.form-message {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  display: none;
}

.form-message.success {
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #166534;
}

.form-message.error {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  color: #991b1b;
}

.form-message.show {
  display: block;
}

/* Loading spinner */
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 900px) {
  .feedback-container {
    grid-template-columns: 1fr;
  }
  
  .feedback-sidebar {
    order: -1;
  }
}

@media (max-width: 600px) {
  .feedback-form-card {
    padding: 1.5rem;
  }
  
  .feedback-hero {
    padding: 2rem 1.5rem;
  }
  
  .feedback-hero h1 {
    font-size: 1.6rem;
  }
}
</style>

<!-- Hero -->
<section class="feedback-hero">
  <h1>📬 Share Your Feedback</h1>
  <p>Your input helps us improve these tutorials. Whether it's a suggestion, bug report, or just a thank you—we'd love to hear from you!</p>
</section>

<div class="feedback-container">
  <!-- Main Form -->
  <div class="feedback-form-card">
    <h2>Feedback Form</h2>
    <p class="form-intro">All fields marked with <span style="color: #ef4444;">*</span> are required. Your feedback will be submitted as a GitHub issue for tracking.</p>
    
    <div id="form-message" class="form-message"></div>
    
    <form id="feedback-form" action="https://formspree.io/f/mojklkow" method="POST">
      <!-- Feedback Type -->
      <div class="form-group">
        <label for="feedback-type">Type of Feedback<span class="required">*</span></label>
        <select id="feedback-type" class="form-select" required>
          <option value="">Select feedback type...</option>
          <option value="suggestion">💡 Suggestion / Feature Request</option>
          <option value="bug">🐛 Bug Report / Error</option>
          <option value="content">📝 Content Improvement</option>
          <option value="praise">🌟 Praise / What Worked Well</option>
          <option value="question">❓ Question</option>
          <option value="other">📌 Other</option>
        </select>
      </div>
      
      <!-- Tutorial/Page Reference -->
      <div class="form-group">
        <label for="page-ref">Related Tutorial or Page<span class="optional">(optional)</span></label>
        <input type="text" id="page-ref" class="form-input" placeholder="e.g., NGS Data Analysis, Single-Cell Tutorial">
      </div>
      
      <!-- Main Feedback -->
      <div class="form-group">
        <label for="feedback-text">Your Feedback<span class="required">*</span></label>
        <textarea id="feedback-text" class="form-textarea" placeholder="Please describe your feedback in detail. What worked? What could be improved? What would you like to see?" required></textarea>
      </div>
      
      <!-- Rating -->
      <div class="form-group">
        <label>Overall Experience<span class="optional">(optional)</span></label>
        <div class="rating-group">
          <input type="radio" id="star5" name="rating" value="5">
          <label for="star5" title="Excellent">★</label>
          <input type="radio" id="star4" name="rating" value="4">
          <label for="star4" title="Very Good">★</label>
          <input type="radio" id="star3" name="rating" value="3">
          <label for="star3" title="Good">★</label>
          <input type="radio" id="star2" name="rating" value="2">
          <label for="star2" title="Fair">★</label>
          <input type="radio" id="star1" name="rating" value="1">
          <label for="star1" title="Poor">★</label>
        </div>
      </div>
      
      <!-- Expertise Level -->
      <div class="form-group">
        <label for="expertise">Your Bioinformatics Experience<span class="optional">(optional)</span></label>
        <select id="expertise" class="form-select">
          <option value="">Select your level...</option>
          <option value="beginner">Beginner (just starting)</option>
          <option value="intermediate">Intermediate (some experience)</option>
          <option value="advanced">Advanced (working professional)</option>
          <option value="expert">Expert (5+ years)</option>
        </select>
      </div>
      
      <!-- Topics interested in -->
      <div class="form-group">
        <label>Topics You're Interested In<span class="optional">(optional)</span></label>
        <div class="checkbox-group">
          <label class="checkbox-item">
            <input type="checkbox" name="topics" value="RNA-seq">
            <span>RNA-seq</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" name="topics" value="Single-cell">
            <span>Single-cell</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" name="topics" value="Proteomics">
            <span>Proteomics</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" name="topics" value="Machine Learning">
            <span>Machine Learning</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" name="topics" value="Multi-omics">
            <span>Multi-omics</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" name="topics" value="Spatial Omics">
            <span>Spatial Omics</span>
          </label>
        </div>
      </div>
      
      <!-- Email (optional) -->
      <div class="form-group">
        <label for="email">Your Email<span class="optional">(optional - for follow-up)</span></label>
        <input type="email" id="email" class="form-input" placeholder="your.email@example.com">
      </div>
      
      <!-- Submit -->
      <button type="submit" class="submit-btn" id="submit-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        Submit Feedback
      </button>
    </form>
  </div>
  
  <!-- Sidebar -->
  <aside class="feedback-sidebar">
    <div class="sidebar-card privacy-note">
      <h3>🔒 Privacy First</h3>
      <p>Your feedback is submitted as a GitHub issue. No personal data is stored beyond what you provide. Email is optional and only used if you'd like a response.</p>
    </div>
    
    <div class="sidebar-card">
      <h3>📋 What We're Looking For</h3>
      <ul>
        <li>Tutorials that need more detail</li>
        <li>Confusing explanations</li>
        <li>Code errors or typos</li>
        <li>New topics you'd like covered</li>
        <li>What's working well</li>
      </ul>
    </div>
    
    <div class="sidebar-card">
      <h3>⚡ Quick Feedback?</h3>
      <p>For brief comments, you can also reach out directly:</p>
      <div class="alt-contact">
        <a href="mailto:raymondotoo115@gmail.com">📧 Email Us</a><br>
        <a href="https://twitter.com/BioLnInfinite" target="_blank" rel="noopener">🐦 Twitter/X</a>
      </div>
    </div>
  </aside>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
rating: ${rating}
expertise: ${expertise}
topics: ${topics}
email: ${email}
timestamp: ${new Date().toISOString()}
  // Remove custom JS for GitHub issue creation, let Formspree handle submission
  // Optionally, you can add a simple handler to show a success message
  const form = document.getElementById('feedback-form');
  const submitBtn = document.getElementById('submit-btn');
  const messageDiv = document.getElementById('form-message');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    const formData = new FormData(form);
    fetch('https://formspree.io/f/mojklkow', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        messageDiv.className = 'form-message success show';
        messageDiv.innerHTML = `
          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <span style="font-size: 2rem;">✅</span>
            <div>
              <strong style="font-size: 1.1rem;">Thank you for your feedback!</strong>
              <p style="margin: 0.5rem 0 0; line-height: 1.6;">Your submission was received successfully. We appreciate your input and will use it to improve the site.</p>
            </div>
          </div>
        `;
        submitBtn.disabled = false;
        submitBtn.innerHTML = '✓ Submit Another';
        form.reset();
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        return response.json().then(data => {
          throw new Error(data.error || 'Submission failed');
        });
      }
    })
    .catch(error => {
      messageDiv.className = 'form-message error show';
      messageDiv.innerHTML = `<strong>Error:</strong> ${error.message || 'Could not submit feedback. Please try again later.'}`;
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit Feedback';
    });
  });
</script>
