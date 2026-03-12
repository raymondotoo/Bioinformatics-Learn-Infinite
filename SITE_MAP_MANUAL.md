# Bioinformatics Learn Infinite
## Site Map and Update Manual (PDF-Style)

Version date: March 11, 2026

---

## Table of Contents

1. [Purpose of This Manual](#1-purpose-of-this-manual)
2. [Quick Start - Dashboard](#2-quick-start---dashboard)
3. [Website Map](#3-website-map)
4. [Project Folder Map](#4-project-folder-map)
5. [How the Site Works](#5-how-the-site-works)
6. [Using the Content Dashboard](#6-using-the-content-dashboard)
7. [Update Learning Path Content](#7-update-learning-path-content)
8. [Add a New Learning Path](#8-add-a-new-learning-path)
9. [Update the Blog](#9-update-the-blog)
10. [Manage Images](#10-manage-images)
11. [Homepage Updates](#11-homepage-updates)
12. [Update Weekly Tip and Quote Areas](#12-update-weekly-tip-and-quote-areas)
13. [Update Navigation, Branding, and Theme](#13-update-navigation-branding-and-theme)
14. [Feedback Form Management](#14-feedback-form-management)
15. [Run and Preview Locally](#15-run-and-preview-locally)
16. [Publish Changes](#16-publish-changes)
17. [Content Quality Checklist](#17-content-quality-checklist)
18. [Quick Templates](#18-quick-templates)
19. [Troubleshooting](#19-troubleshooting)
20. [Export This Manual as PDF](#20-export-this-manual-as-pdf)

---

## 1. Purpose of This Manual

This manual explains where everything lives in your site and how to safely update:

- Learning pathway pages
- Blog posts
- Homepage sections
- Images and media
- Weekly featured tips
- Navigation and styling
- Feedback links

**Two ways to update your site:**
1. **Dashboard** (Recommended) - Visual editor at `http://localhost:3030`
2. **Direct file editing** - Edit Markdown files directly in VS Code

---

## 2. Quick Start - Dashboard

The fastest way to update your site:

### Start the Dashboard

```bash
cd dashboard
node server.js
```

Open **http://localhost:3030** in your browser.

### What You Can Do

| Action | How |
|--------|-----|
| Edit learning paths | Click "Learning Paths" → Select page → Edit → Save |
| Edit blog posts | Click "Blog" → Select post → Edit → Save |
| Add new blog post | Click "Blog" → "New Post" button |
| Upload images | Click "Images" → "Upload" button |
| Insert image in content | In editor, click 🖼️ button → Select image |
| Publish to GitHub | Click "Publish" → Add commit message → Publish |

---

## 3. Website Map

Main public routes:

| URL | Description |
|-----|-------------|
| `/` | Homepage |
| `/blog/` | Blog listing (all posts) |
| `/introduction-to-bioinformatics/` | Intro learning path |
| `/biology-fundamentals-for-bioinformatics/` | Biology fundamentals |
| `/statistical-analysis-and-inference/` | Statistics path |
| `/bioinformatics-core-skills/` | Core skills path |
| `/bioinformatics-data-analysis-focused-ngs/` | NGS analysis |
| `/machine-learning/` | ML for bioinformatics |
| `/multiomics-data-integration/` | Multi-omics path |
| `/single-cell-and-spatial-omics-analysis/` | Single-cell analysis |
| `/agentic-ai-bioinformatics/` | AI agents path |
| `/hire-expert/` | Hire expert page |
| `/feedback/` | Feedback form |

---

## 4. Project Folder Map

### Files You'll Edit Most Often

| File/Folder | Purpose | How to Update |
|-------------|---------|---------------|
| `index.md` | Homepage content | Dashboard or direct edit |
| `blog.md` | Blog listing page | Direct edit |
| `_posts/` | Blog post files | Dashboard → Blog |
| `_data/tutorials.yml` | Learning path nav list | Direct edit |
| `_data/weekly_tips.yml` | Weekly rotating tips | Direct edit |
| `assets/images/` | Content images | Dashboard → Images |
| `assets/banners/` | Banner images | Dashboard → Images |

### Layout & Style Files

| File | Purpose |
|------|---------|
| `_layouts/default.html` | Global layout (header, footer) |
| `_includes/top-nav.html` | Tutorial navigation chips |
| `assets/js/site.js` | TOC, search, quotes, tips logic |
| `style.css` | Site styling |
| `_config.yml` | Jekyll settings |

### Learning Path Pages (root folder)

- `introduction-to-bioinformatics.md`
- `biology-fundamentals-for-bioinformatics.md`
- `statistical-analysis-and-inference.md`
- `bioinformatics-core-skills.md`
- `bioinformatics-data-analysis-focused-ngs.md`
- `machine-learning.md`
- `multiomics-data-integration.md`
- `single-cell-and-spatial-omics-analysis.md`
- `agentic-ai-bioinformatics.md`

### Dashboard Files (do not edit manually)

| Folder | Contains |
|--------|----------|
| `dashboard/` | Content management system |
| `dashboard/server.js` | Backend API server |
| `dashboard/public/` | Dashboard UI files |

---

## 5. How the Site Works

### Technology Stack

| Component | Technology |
|-----------|------------|
| Static site generator | Jekyll |
| Page format | Markdown with YAML front matter |
| Styling | CSS with custom variables |
| Interactivity | Vanilla JavaScript |
| Hosting | GitHub Pages |
| Dashboard | Node.js + Express |

### Page Structure

Every page has front matter at the top:

```yaml
---
layout: default
title: Page Title
description: SEO description
permalink: /page-url/
---
```

Content below front matter is written in Markdown.

### Automatic Features

- **Table of Contents** - Generated from headings (assets/js/site.js)
- **Search** - Full-text search across all pages
- **Quote of the Day** - Rotates daily from quotes array
- **Weekly Tip** - Rotates weekly from _data/weekly_tips.yml
- **Share Buttons** - Auto-appear on blog posts and learning paths

---

## 6. Using the Content Dashboard

### Starting the Dashboard

```bash
cd dashboard
node server.js
```

Dashboard runs at: **http://localhost:3030**

### Dashboard Views

| View | Purpose | Actions Available |
|------|---------|-------------------|
| **Learning Paths** | Edit tutorial content | Edit, Preview, Save |
| **Blog** | Manage blog posts | Edit, Preview, Save, New Post |
| **Images** | Manage media files | View, Upload, Delete, Copy Path |

### Editing Content

1. Select a view (Learning Paths or Blog)
2. Click on any file to open editor
3. Use the toolbar for formatting:
   - **B** - Bold
   - **I** - Italic
   - **H** - Heading
   - **🔗** - Insert link
   - **📝** - Code block
   - **🖼️** - Insert image
   - **👁️** - Preview

4. Click **Save** to save locally
5. Click **Publish** to push to GitHub

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + S` | Save file |
| `Cmd/Ctrl + P` | Toggle preview |
| `Cmd/Ctrl + B` | Bold text |
| `Cmd/Ctrl + I` | Italic text |

### Publishing Changes

1. Click **Publish** button (top right)
2. Enter a commit message describing your changes
3. Click **Publish to GitHub**
4. Changes deploy automatically via GitHub Pages

---

## 7. Update Learning Path Content

## 7. Update Learning Path Content

### Using Dashboard (Recommended)

1. Open **http://localhost:3030**
2. Click **Learning Paths** in sidebar
3. Select the page to edit
4. Edit in the visual editor
5. Click **Save**
6. Click **Publish** to push to GitHub

### Direct File Editing

1. Open the `.md` file in root folder (e.g., `machine-learning.md`)
2. Keep front matter intact:

```yaml
---
layout: default
title: Machine Learning for Bioinformatics
description: Learn ML techniques...
permalink: /machine-learning/
---
```

3. Edit content below front matter
4. Save and commit to Git

### Content Structure Template

```markdown
# Page Title

<!-- Banner image -->
<img src="{{ '/assets/banners/banner-name.svg' | relative_url }}" alt="Banner" class="banner-image">

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. First goal
2. Second goal
3. Third goal
</section>

## Section Title

Your content here...

### Subsection

More details...

```bash
# Code example
command --flag
```
```

### Adding Code Blocks

Use fenced code blocks with language identifier:

````markdown
```python
import pandas as pd
df = pd.read_csv("data.csv")
```
````

Supported languages: `python`, `r`, `bash`, `javascript`, `yaml`, `json`

---

## 8. Add a New Learning Path

### Step-by-Step

| Step | Action | File/Location |
|------|--------|---------------|
| 1 | Create new Markdown file | Root folder (e.g., `new-topic.md`) |
| 2 | Add front matter | See template below |
| 3 | Create banner image | `assets/banners/new-topic-banner.svg` |
| 4 | Add to navigation | `_data/tutorials.yml` |
| 5 | Add to homepage | `index.md` (Learning Paths section) |
| 6 | Test and publish | Run Jekyll, then Git push |

### Front Matter Template

```yaml
---
layout: default
title: "Your New Topic"
description: "One-line SEO description"
permalink: /your-new-topic/
---
```

### Add to Navigation

Edit `_data/tutorials.yml`:

```yaml
- name: "Your New Topic"
  url: "/your-new-topic/"
  icon: "📊"  # Optional emoji
```

### Add to Homepage

Edit `index.md` and add to the learning paths section:

```html
<a href="{{ '/your-new-topic/' | relative_url }}" class="learning-path-card">
  <div class="path-icon">📊</div>
  <div class="path-content">
    <h3>Your New Topic</h3>
    <p>Short description of what users will learn.</p>
  </div>
</a>
```

---

## 9. Update the Blog

### Add a New Blog Post

#### Using Dashboard (Recommended)

1. Open **http://localhost:3030**
2. Click **Blog** in sidebar
3. Click **New Post** button
4. Fill in title and slug
5. Write your content
6. Click **Save**, then **Publish**

#### Direct File Creation

1. Create file in `_posts/` folder
2. Filename format: `YYYY-MM-DD-short-title.md`
   - Example: `2026-03-11-my-new-post.md`

3. Use this template:

```yaml
---
layout: default
title: "Your Post Title"
description: "One-line description for SEO"
summary: "Short preview text for blog cards"
permalink: /blog/your-post-slug/
---

# Your Post Title

Introduction paragraph...

## Section 1

Content with **bold** and *italic* text.

```python
# Code example
print("Hello World")
```

## Conclusion

Wrap-up content...
```

4. Save and commit to Git

### Edit Existing Blog Post

| Method | Steps |
|--------|-------|
| Dashboard | Blog → Select post → Edit → Save → Publish |
| Direct | Open `_posts/YYYY-MM-DD-title.md` → Edit → Git commit |

### Blog Post Features

- **Share buttons** - Automatically added (Twitter, LinkedIn, Facebook, Copy Link)
- **Auto-listing** - Posts appear on `/blog/` page automatically
- **Homepage feature** - Latest post shows on homepage

---

## 10. Manage Images

### Using Dashboard (Recommended)

#### View All Images

1. Open **http://localhost:3030**
2. Click **Images** in sidebar
3. Browse images by folder (All / Content / Banners)

#### Upload New Images

1. Click **Upload** button
2. Drag & drop images or click to select
3. Choose destination folder (images or banners)
4. Click **Upload**

#### Insert Image in Content

1. While editing any page, click 🖼️ in toolbar
2. Browse or search for image
3. Click image to select
4. Double-click or press Enter to insert

#### Delete Image

1. In Images view, find the image
2. Click **Delete** button
3. Confirm deletion

#### Copy Image Path

1. Click **Copy** button on any image
2. Paste in your content: `{{ '/assets/images/filename.png' | relative_url }}`

### Direct File Management

| Task | Location | Format |
|------|----------|--------|
| Content images | `assets/images/` | PNG, JPG, SVG, GIF |
| Banner images | `assets/banners/` | SVG (recommended) |

### Using Images in Markdown

```markdown
<!-- Simple image -->
![Alt text]({{ '/assets/images/my-image.png' | relative_url }})

<!-- Image with caption -->
<figure>
  <img src="{{ '/assets/images/my-image.png' | relative_url }}" alt="Description">
  <figcaption>Figure 1: Caption text</figcaption>
</figure>

<!-- Banner image -->
<img src="{{ '/assets/banners/my-banner.svg' | relative_url }}" alt="Banner" class="banner-image">
```

---

## 11. Homepage Updates

Edit `index.md` to update homepage content.

### Homepage Sections

| Section | Location in index.md | What to Edit |
|---------|---------------------|--------------|
| Hero/Intro | Top of file | Main headline and description |
| Learning Paths | `.learning-paths-grid` | Add/remove path cards |
| About Author | `.about-section` | Bio and photo |
| Connect | `.connect-section` | Social links |
| Quote of Day | Auto-generated | Edit quotes in `assets/js/site.js` |
| Weekly Tip | Auto-generated | Edit `_data/weekly_tips.yml` |
| Latest Blog | Auto-generated | Pulls from newest `_posts/` file |
| Resources | `.resources-table` | External links table |

### Edit Learning Path Cards

Find and edit this structure:

```html
<div class="learning-paths-grid">
  <a href="{{ '/path-url/' | relative_url }}" class="learning-path-card">
    <div class="path-icon">🧬</div>
    <div class="path-content">
      <h3>Path Title</h3>
      <p>Description text</p>
    </div>
  </a>
  <!-- More cards... -->
</div>
```

### Edit Resources Table

```html
<table class="resources-table">
  <tr>
    <td><a href="https://...">Resource Name</a></td>
    <td>Description</td>
  </tr>
</table>
```

---

## 12. Update Weekly Tip and Quote Areas

### Weekly Tips

**File:** `_data/weekly_tips.yml`

**Format:**

```yaml
- title: "Tip Title"
  text: "Detailed tip explanation..."
  url: "https://link-to-resource.com"
  link_label: "Learn More"

- title: "Another Tip"
  text: "Another explanation..."
  url: "https://another-link.com"
  link_label: "Read Guide"
```

Tips rotate automatically each week (controlled by `assets/js/site.js`).

### Quote of the Day

**File:** `assets/js/site.js`

**Find and edit the quotes array:**

```javascript
var quotes = [
  "First quote here.",
  "Second quote here.",
  "Third quote here."
];
```

Quotes rotate daily automatically.

---

## 13. Update Navigation, Branding, and Theme

### Navigation Components

| Component | File | What to Edit |
|-----------|------|--------------|
| Header (Home, Blog links) | `_layouts/default.html` | Header nav section |
| Tutorial chips | `_data/tutorials.yml` | Add/remove/reorder items |
| Tutorial chip renderer | `_includes/top-nav.html` | Change chip styling |
| Sidebar TOC | `assets/js/site.js` | Auto-generated from headings |

### Edit Tutorial Navigation Chips

**File:** `_data/tutorials.yml`

```yaml
- name: "Introduction to Bioinformatics"
  url: "/introduction-to-bioinformatics/"

- name: "Biology Fundamentals"
  url: "/biology-fundamentals-for-bioinformatics/"

# Add new entries here
```

### Change Logo

1. Replace `bioinf_logo.png` in root folder
2. Or edit path in `_layouts/default.html`:

```html
<img src="{{ '/bioinf_logo.png' | relative_url }}" alt="Logo">
```

### Change Theme Colors

**File:** `style.css` - edit the `:root` block:

```css
:root {
  --bg: #f8fdf8;           /* Page background */
  --surface: #ffffff;       /* Card backgrounds */
  --surface-soft: #e8f5e9;  /* Subtle backgrounds */
  --border: #b8d4ba;        /* Border color */
  --ink: #1a2e1a;           /* Main text */
  --ink-soft: #4a6a4a;      /* Secondary text */
  --accent: #2d7d32;        /* Links, buttons */
  --accent-soft: #c8e6c9;   /* Hover states */
}
```

### Example: Blue Theme

```css
:root {
  --bg: #f3f8ff;
  --surface: #ffffff;
  --surface-soft: #e4efff;
  --border: #a8c5ee;
  --ink: #0f2238;
  --ink-soft: #3d5773;
  --accent: #1f5ea8;
  --accent-soft: #cddff9;
}
```

---

## 14. Feedback Form Management

### Change Form URL

**File:** `_config.yml`

```yaml
feedback:
  form_url: "https://docs.google.com/forms/d/e/YOUR-FORM-ID/viewform"
```

After editing, rebuild site:

```bash
bundle exec jekyll build
```

### Feedback Responses

Responses are stored in: `_data/feedback/responses.csv`

---

## 15. Run and Preview Locally

### Start Jekyll Site

```bash
bundle install           # First time only
bundle exec jekyll serve --port 4001
```

Open: **http://localhost:4001**

### Start Content Dashboard

```bash
cd dashboard
node server.js
```

Open: **http://localhost:3030**

### Build Without Serving

```bash
bundle exec jekyll build
```

Output goes to `_site/` folder.

### Run Both Together

Terminal 1:
```bash
bundle exec jekyll serve --port 4001
```

Terminal 2:
```bash
cd dashboard && node server.js
```

---

## 16. Publish Changes

### Using Dashboard (Recommended)

1. Make your edits and save
2. Click **Publish** button (top right)
3. See list of changed files
4. Enter commit message
5. Click **Publish to GitHub**
6. Changes deploy automatically

### Using Git Command Line

```bash
git add .
git commit -m "Your commit message"
git push
```

### GitHub Pages Deployment

- Deployment is automatic after push
- Usually takes 1-2 minutes
- Check status at: GitHub repo → Actions tab

---

## 17. Content Quality Checklist

### Before Publishing

| Check | Status |
|-------|--------|
| ☐ Title matches page topic |  |
| ☐ Front matter is complete (layout, title, description, permalink) |  |
| ☐ Headings are hierarchical (h1 → h2 → h3) |  |
| ☐ Code blocks have language identifiers |  |
| ☐ Images load correctly |  |
| ☐ Internal links work |  |
| ☐ TOC generates properly |  |
| ☐ Mobile view is readable |  |
| ☐ Share buttons appear (blog/learning paths) |  |
| ☐ Commit message is descriptive |  |

### Common Issues

| Problem | Solution |
|---------|----------|
| Page not showing | Check permalink in front matter |
| Broken layout | Ensure `layout: default` in front matter |
| Code not formatting | Add language to code fence: ` ```python ` |
| Image not loading | Use `{{ '/path' \| relative_url }}` syntax |
| TOC missing entries | Use proper heading levels (##, ###) |

---

## 18. Quick Templates

### Learning Path Page

```markdown
---
layout: default
title: "Topic Name"
description: "One-line description for SEO"
permalink: /topic-name/
---

# Topic Name

<img src="{{ '/assets/banners/topic-banner.svg' | relative_url }}" alt="Banner" class="banner-image">

## Learning Goals

<section class="learning-goals-card" markdown="1">
By the end of this chapter, you should be able to:

1. First learning objective
2. Second learning objective
3. Third learning objective
</section>

## Section 1

Content here...

### Subsection 1.1

More details...

## Section 2

Additional content...

```python
# Code example
import pandas as pd
```
```

### Blog Post

````markdown
---
layout: default
title: "Post Title"
description: "SEO description"
summary: "Preview text for cards"
permalink: /blog/post-slug/
---

# Post Title

Introduction paragraph explaining the topic...

## Why This Matters

Context and importance...

## Key Concepts

### Concept 1

Explanation...

### Concept 2

Explanation...

## Practical Example

```python
# Working code
result = process_data(input)
```

## Summary

Key takeaways...
````

### Weekly Tip Entry

```yaml
- title: "Tip Title Here"
  text: "Detailed explanation of the tip. Can be multiple sentences."
  url: "https://link-to-resource.com"
  link_label: "Learn More"
```

### Tutorial Navigation Entry

```yaml
- name: "Display Name"
  url: "/page-permalink/"
```

---

## 19. Troubleshooting

### Dashboard Won't Start

```bash
# Check if port is in use
lsof -i :3030

# Kill existing process
pkill -f "node server.js"

# Restart
cd dashboard && node server.js
```

### Jekyll Build Errors

```bash
# Check for syntax errors
bundle exec jekyll build --verbose

# Common fix: reinstall dependencies
bundle install
```

### Images Not Uploading

1. Check `assets/images/` folder permissions
2. Ensure `multer` package is installed: `cd dashboard && npm install`
3. Restart dashboard server

### Git Push Failing

```bash
# Check remote URL
git remote -v

# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### Page Shows 404

1. Check permalink in front matter
2. Ensure file extension is `.md`
3. Rebuild site: `bundle exec jekyll build`

---

## 20. Export This Manual as PDF

### From VS Code

1. Install "Markdown PDF" extension
2. Open this file
3. `Cmd+Shift+P` → "Markdown PDF: Export (pdf)"

### From Browser

1. Open `SITE_MAP_MANUAL.md` on GitHub
2. `Cmd+P` (Mac) or `Ctrl+P` (Windows)
3. Destination: "Save as PDF"
4. Layout: Portrait
5. Margins: Default

### From Jekyll Preview

1. Run `bundle exec jekyll serve --port 4001`
2. Open `/SITE_MAP_MANUAL/` in browser
3. Print to PDF

---

## Quick Reference Card

| Task | Method |
|------|--------|
| **Edit learning path** | Dashboard → Learning Paths → Select → Edit → Save |
| **Add blog post** | Dashboard → Blog → New Post → Write → Save |
| **Upload image** | Dashboard → Images → Upload |
| **Insert image** | Editor → 🖼️ button → Select → Insert |
| **Preview changes** | Editor → 👁️ button |
| **Publish to GitHub** | Publish button → Commit message → Publish |
| **Change theme color** | Edit `:root` in `style.css` |
| **Add weekly tip** | Edit `_data/weekly_tips.yml` |
| **Add navigation item** | Edit `_data/tutorials.yml` |
| **Start local preview** | `bundle exec jekyll serve --port 4001` |
| **Start dashboard** | `cd dashboard && node server.js` |

---

**Site URL:** https://www.bioinfolearninfinite.com

**Dashboard URL (local):** http://localhost:3030

**Jekyll Preview (local):** http://localhost:4001

---

End of manual.
