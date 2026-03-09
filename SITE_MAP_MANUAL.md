# Bioinformatics Learn Infinite
## Site Map and Update Manual (PDF-Style)

Version date: March 9, 2026

---

## Table of Contents

1. [Purpose of This Manual](#1-purpose-of-this-manual)
2. [Website Map](#2-website-map)
3. [Project Folder Map](#3-project-folder-map)
4. [How the Site Works](#4-how-the-site-works)
5. [Update Learning Path Content](#5-update-learning-path-content)
6. [Add a New Learning Path](#6-add-a-new-learning-path)
7. [Update the Blog](#7-update-the-blog)
8. [Homepage Updates](#8-homepage-updates)
9. [Update Weekly Tip and Quote Areas](#9-update-weekly-tip-and-quote-areas)
10. [Update Navigation, Branding, and Theme](#10-update-navigation-branding-and-theme)
11. [Feedback Form Management](#11-feedback-form-management)
12. [Run and Preview Locally](#12-run-and-preview-locally)
13. [Publish Changes](#13-publish-changes)
14. [Content Quality Checklist](#14-content-quality-checklist)
15. [Quick Templates](#15-quick-templates)
16. [Export This Manual as PDF](#16-export-this-manual-as-pdf)

---

## 1. Purpose of This Manual

This manual explains where everything lives in your site and how to safely update:

- Learning pathway pages
- Blog posts
- Homepage sections
- Weekly featured tips
- Navigation and styling
- Feedback links

Use this as your operating guide whenever you edit content.

---

## 2. Website Map

Main public routes:

- `/` -> Homepage
- `/blog/` -> Blog landing page (lists all posts)
- `/introduction-to-bioinformatics/`
- `/biology-fundamentals-for-bioinformatics/`
- `/statistical-analysis-and-inference/`
- `/bioinformatics-core-skills/`
- `/bioinformatics-data-analysis-focused-ngs/`
- `/machine-learning/`
- `/multiomics-data-integration/`

Legacy redirect/notice route:

- `/neuro-imaging-data-analysis/` -> points users to Multi-Omics page

---

## 3. Project Folder Map

Core files you will edit most often:

- `index.md` -> Homepage content
- `blog.md` -> Blog listing page
- `_posts/` -> Blog post files
- `_data/tutorials.yml` -> Learning-path nav list
- `_data/weekly_tips.yml` -> Weekly rotating tip data
- `_layouts/default.html` -> Global layout (header, footer, search pane)
- `_includes/top-nav.html` -> Tutorial chips/links under top bar
- `assets/js/site.js` -> TOC, search, quote-of-day, weekly tip rotation
- `style.css` -> Site styling
- `_config.yml` -> Jekyll settings, feedback form URL
- `assets/banners/*.svg` -> Path and homepage banners

Learning-path source pages:

- `introduction-to-bioinformatics.md`
- `biology-fundamentals-for-bioinformatics.md`
- `statistical-analysis-and-inference.md`
- `bioinformatics-core-skills.md`
- `bioinformatics-data-analysis-focused-ngs.md`
- `machine-learning.md`
- `multiomics-data-integration.md`

---

## 4. How the Site Works

- This is a Jekyll site.
- Pages are Markdown files with front matter (`layout`, `title`, `permalink`).
- Blog posts are in `_posts/` and follow `YYYY-MM-DD-title.md` naming.
- Header/footer/search/TOC are shared globally from layout + JS.
- Homepage has custom sections in `index.md`.

---

## 5. Update Learning Path Content

1. Open the target `.md` path file.
2. Keep front matter intact:

```yaml
---
layout: default
title: ...
description: ...
permalink: /.../
---
```

3. Keep this structure for consistency:
- `# Page Title`
- Banner image
- `## Learning Goals`
- `<section class="learning-goals-card" markdown="1"> ... </section>`
- Main tutorial sections
- Code blocks in fenced format

4. Use fenced code blocks for copy-ready commands:

```bash
# command here
```

```r
# R code here
```

```python
# Python code here
```

5. Save and preview.

---

## 6. Add a New Learning Path

1. Create a new Markdown page in repo root, e.g. `single-cell-analysis.md`.
2. Add front matter with a unique permalink.
3. Add a banner in `assets/banners/` and reference it in page.
4. Add route entry to `_data/tutorials.yml`.
5. Add item to homepage list in `index.md` under "Learning Paths".
6. Build and test navigation.

---

## 7. Update the Blog

### 7.1 Add a New Blog Post

1. Create file in `_posts/` with this format:
- `YYYY-MM-DD-short-title.md`

2. Use this template:

```yaml
---
layout: default
title: "Your Post Title"
description: One-line description
summary: Short preview text for homepage/blog cards
permalink: /blog/your-post-slug/
---

# Your Post Title

## Section 1
Content...
```

3. Save file. Blog list (`/blog/`) updates automatically.
4. Homepage "Latest from the Blog" updates automatically to newest date.

### 7.2 Edit Existing Blog Post

- Open the target file in `_posts/`.
- Update content.
- Keep permalink stable if already shared publicly.

---

## 8. Homepage Updates

Edit `index.md`.

Homepage blocks currently include:

- Intro panel
- Learning paths list
- About Author
- Connect with Us
- Quote of the Day
- Featured Resource of the Week
- Latest from the Blog
- External resources table

If you update links or section names, keep the IDs and script data blocks intact.

---

## 9. Update Weekly Tip and Quote Areas

### Weekly tip (recommended update method)

- Edit `_data/weekly_tips.yml`.
- Each item has:
  - `title`
  - `text`
  - `url`
  - `link_label`

Rotation is automatic (weekly) via `assets/js/site.js`.

### Quote of the Day

- Quotes are currently stored in `assets/js/site.js`.
- Search for `var quotes = [` and edit/add entries.
- Rotation is daily.

---

## 10. Update Navigation, Branding, and Theme

### Header links (Home, Blog)

- File: `_layouts/default.html`

### Tutorial nav chips

- Data source: `_data/tutorials.yml`
- Markup renderer: `_includes/top-nav.html`

### Logo and favicon

- `bioinf_logo.png`
- Referenced in `_layouts/default.html`

### Styling

- File: `style.css`
- Main areas:
  - top bar/nav
  - content pane and TOC pane
  - homepage cards
  - blog cards
  - feedback section

---

## 11. Feedback Form Management

Your feedback button uses a Google Form URL from:

- `_config.yml` -> `feedback.form_url`

To change form destination:

1. Open `_config.yml`
2. Update:

```yaml
feedback:
  form_url: "https://docs.google.com/forms/..."
```

3. Rebuild site.

---

## 12. Run and Preview Locally

From repo root:

```bash
bundle install
bundle exec jekyll serve
```

Then open local URL shown in terminal (usually `http://127.0.0.1:4000`).

To run one build check:

```bash
bundle exec jekyll build
```

---

## 13. Publish Changes

Typical Git flow:

```bash
git add .
git commit -m "Update content"
git push
```

If GitHub Pages is enabled for this repo, deployment happens automatically after push.

---

## 14. Content Quality Checklist

Before publishing:

- Titles match page topic
- Numbering is sequential
- Code blocks are fenced and runnable
- Internal links open correctly
- Banner displays correctly
- TOC entries are clean and meaningful
- Search works on updated page
- Mobile view still readable

---

## 15. Quick Templates

### 15.1 Learning Goals box template

```md
## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. Goal one.
2. Goal two.
3. Goal three.
4. Goal four.
</section>
```

### 15.2 Blog post template

````md
---
layout: default
title: "Post title"
description: One-line description
summary: Short preview for cards
permalink: /blog/post-slug/
---

# Post title

## Why this matters

...

## Practical steps

```bash
# commands
```
````

## 16. Export This Manual as PDF

Option A (from GitHub editor/preview):

1. Open `SITE_MAP_MANUAL.md`.
2. Use browser print (`Cmd+P` on Mac or `Ctrl+P` on Windows/Linux).
3. Destination: `Save as PDF`.
4. Layout: Portrait.
5. Margins: Default or Narrow.

Option B (from local Jekyll preview):

1. Run `bundle exec jekyll serve`.
2. Open the rendered page in browser.
3. Print to PDF with browser print dialog.

---

End of manual.
