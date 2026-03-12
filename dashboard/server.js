const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const simpleGit = require('simple-git');
const matter = require('gray-matter');
const multer = require('multer');

const app = express();
const PORT = 3030;
const SITE_ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(SITE_ROOT, 'assets', 'images');
const BANNERS_DIR = path.join(SITE_ROOT, 'assets', 'banners');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.query.folder === 'banners' ? BANNERS_DIR : IMAGES_DIR;
    // Ensure directory exists
    if (!fsSync.existsSync(folder)) {
      fsSync.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Clean filename - remove spaces and special chars
    const cleanName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9.-]/g, '');
    cb(null, cleanName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|svg|webp)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));
// Serve site assets for image previews
app.use('/site-assets', express.static(path.join(SITE_ROOT, 'assets')));

// Initialize git
const git = simpleGit(SITE_ROOT);

// Get all content files
app.get('/api/content', async (req, res) => {
  try {
    const content = {
      posts: [],
      pages: [],
      data: []
    };

    // Get posts
    const postsDir = path.join(SITE_ROOT, '_posts');
    try {
      const postFiles = await fs.readdir(postsDir);
      for (const file of postFiles.filter(f => f.endsWith('.md'))) {
        const filePath = path.join(postsDir, file);
        const raw = await fs.readFile(filePath, 'utf-8');
        const { data: frontmatter } = matter(raw);
        content.posts.push({
          filename: file,
          path: `_posts/${file}`,
          title: frontmatter.title || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', ''),
          date: frontmatter.date || file.substring(0, 10),
          description: frontmatter.description || ''
        });
      }
    } catch (e) { /* no posts dir */ }

    // Get pages (root .md files)
    const rootFiles = await fs.readdir(SITE_ROOT);
    for (const file of rootFiles.filter(f => f.endsWith('.md') && !['README.md', 'SITE_MAP_MANUAL.md'].includes(f))) {
      const filePath = path.join(SITE_ROOT, file);
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data: frontmatter } = matter(raw);
      content.pages.push({
        filename: file,
        path: file,
        title: frontmatter.title || file.replace('.md', ''),
        description: frontmatter.description || ''
      });
    }

    // Get data files
    const dataDir = path.join(SITE_ROOT, '_data');
    try {
      const dataFiles = await fs.readdir(dataDir);
      for (const file of dataFiles.filter(f => f.endsWith('.yml') || f.endsWith('.yaml') || f.endsWith('.json'))) {
        content.data.push({
          filename: file,
          path: `_data/${file}`
        });
      }
    } catch (e) { /* no data dir */ }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single file content
app.get('/api/file', async (req, res) => {
  try {
    const filePath = path.join(SITE_ROOT, req.query.path);
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(content);
    res.json({
      frontmatter: parsed.data,
      content: parsed.content,
      raw: content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save file
app.post('/api/file', async (req, res) => {
  try {
    const { path: filePath, content } = req.body;
    const fullPath = path.join(SITE_ROOT, filePath);
    await fs.writeFile(fullPath, content, 'utf-8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new post
app.post('/api/post', async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    const filename = `${date}-${slug}.md`;
    const filePath = path.join(SITE_ROOT, '_posts', filename);

    const frontmatter = `---
layout: default
title: "${title}"
description: ${description}
permalink: /blog/${slug}/
---

${content}`;

    await fs.writeFile(filePath, frontmatter, 'utf-8');
    res.json({ success: true, filename });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete file
app.delete('/api/file', async (req, res) => {
  try {
    const filePath = path.join(SITE_ROOT, req.query.path);
    await fs.unlink(filePath);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Git status
app.get('/api/git/status', async (req, res) => {
  try {
    const status = await git.status();
    res.json({
      modified: status.modified,
      created: status.not_added.concat(status.created),
      deleted: status.deleted,
      staged: status.staged,
      isClean: status.isClean()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Publish (git add, commit, push)
app.post('/api/publish', async (req, res) => {
  try {
    const { message } = req.body;
    const commitMessage = message || `Content update - ${new Date().toLocaleString()}`;
    
    await git.add('.');
    await git.commit(commitMessage);
    await git.push();
    
    res.json({ success: true, message: 'Changes published successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get git log
app.get('/api/git/log', async (req, res) => {
  try {
    const log = await git.log({ maxCount: 10 });
    res.json(log.all);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Discard changes
app.post('/api/git/discard', async (req, res) => {
  try {
    const { path: filePath } = req.body;
    if (filePath) {
      await git.checkout(['--', filePath]);
    } else {
      await git.checkout(['--', '.']);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== IMAGE MANAGEMENT ====================

// Get all images
app.get('/api/images', async (req, res) => {
  try {
    const images = [];
    
    // Get images from assets/images
    try {
      const imageFiles = await fs.readdir(IMAGES_DIR);
      for (const file of imageFiles) {
        if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
          const stat = await fs.stat(path.join(IMAGES_DIR, file));
          images.push({
            name: file,
            path: `assets/images/${file}`,
            url: `/site-assets/images/${file}`,
            folder: 'images',
            size: stat.size,
            modified: stat.mtime
          });
        }
      }
    } catch (e) { /* no images dir */ }

    // Get images from assets/banners
    try {
      const bannerFiles = await fs.readdir(BANNERS_DIR);
      for (const file of bannerFiles) {
        if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
          const stat = await fs.stat(path.join(BANNERS_DIR, file));
          images.push({
            name: file,
            path: `assets/banners/${file}`,
            url: `/site-assets/banners/${file}`,
            folder: 'banners',
            size: stat.size,
            modified: stat.mtime
          });
        }
      }
    } catch (e) { /* no banners dir */ }

    // Sort by modified date (newest first)
    images.sort((a, b) => new Date(b.modified) - new Date(a.modified));
    
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload image
app.post('/api/images/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const folder = req.query.folder === 'banners' ? 'banners' : 'images';
    const imagePath = `assets/${folder}/${req.file.filename}`;
    res.json({
      success: true,
      image: {
        name: req.file.filename,
        path: imagePath,
        url: `/site-assets/${folder}/${req.file.filename}`,
        folder
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete image
app.delete('/api/images', async (req, res) => {
  try {
    const imagePath = req.query.path;
    if (!imagePath || !imagePath.startsWith('assets/')) {
      return res.status(400).json({ error: 'Invalid image path' });
    }
    const fullPath = path.join(SITE_ROOT, imagePath);
    await fs.unlink(fullPath);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rename image
app.post('/api/images/rename', async (req, res) => {
  try {
    const { oldPath, newName } = req.body;
    if (!oldPath || !newName) {
      return res.status(400).json({ error: 'Missing path or new name' });
    }
    const dir = path.dirname(path.join(SITE_ROOT, oldPath));
    const cleanName = newName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9.-]/g, '');
    const newPath = path.join(dir, cleanName);
    await fs.rename(path.join(SITE_ROOT, oldPath), newPath);
    res.json({
      success: true,
      newPath: oldPath.replace(path.basename(oldPath), cleanName)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🧬 Bioinformatics Learn Infinite - Content Dashboard       ║
║                                                              ║
║   Dashboard running at: http://localhost:${PORT}               ║
║                                                              ║
║   Press Ctrl+C to stop                                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});
