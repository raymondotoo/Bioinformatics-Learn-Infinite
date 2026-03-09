---
layout: default
title: Bioinformatics Blog
description: Weekly discoveries and practical tips in bioinformatics.
permalink: /blog/
---

# Bioinformatics Blog

<section class="home-hero blog-hero">
  <h2>Weekly Discoveries and Practical Tips</h2>
  <p>This blog shares short, practical lessons from real bioinformatics workflows. Posts focus on methods you can apply quickly in proteomics, transcriptomics, and multimodal analysis projects.</p>
</section>

<section class="blog-list" aria-label="Blog posts">
  {% for post in site.posts %}
  <article class="blog-card">
    <p class="blog-card-date">{{ post.date | date: "%B %-d, %Y" }}</p>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    {% if post.summary %}
    <p>{{ post.summary }}</p>
    {% else %}
    <p>{{ post.excerpt | strip_html | truncatewords: 35 }}</p>
    {% endif %}
    <a class="blog-read-link" href="{{ post.url | relative_url }}">Read post</a>
  </article>
  {% endfor %}
</section>
