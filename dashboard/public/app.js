// State
let currentView = 'posts';
let contentData = { posts: [], pages: [], data: [] };
let currentFile = null;
let imagesData = [];
let selectedImage = null;
let pendingUploads = [];
let imageInsertCallback = null;

// DOM Elements
const viewTitle = document.getElementById('view-title');
const contentArea = document.getElementById('content');
const navItems = document.querySelectorAll('.nav-item[data-view]');
const gitIndicator = document.getElementById('git-indicator');
const toastContainer = document.getElementById('toast-container');

// Modals
const editorModal = document.getElementById('editor-modal');
const newPostModal = document.getElementById('new-post-modal');
const publishModal = document.getElementById('publish-modal');
const imageBrowserModal = document.getElementById('image-browser-modal');
const uploadModal = document.getElementById('upload-modal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  checkGitStatus();
  setupEventListeners();
  setInterval(checkGitStatus, 30000); // Check git status every 30 seconds
});

// Event Listeners
function setupEventListeners() {
  // Navigation
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.dataset.view;
      switchView(view);
    });
  });

  // Header buttons
  document.getElementById('refresh-btn').addEventListener('click', loadContent);
  document.getElementById('new-post-btn').addEventListener('click', openNewPostModal);
  document.getElementById('publish-btn').addEventListener('click', openPublishModal);

  // Editor modal
  document.getElementById('editor-close').addEventListener('click', closeEditorModal);
  document.getElementById('editor-cancel').addEventListener('click', closeEditorModal);
  document.getElementById('editor-save').addEventListener('click', saveFile);
  document.getElementById('editor-content').addEventListener('input', updatePreview);

  // Editor toolbar
  document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => handleToolbarAction(btn.dataset.action));
  });

  // New post modal
  document.getElementById('new-post-close').addEventListener('click', closeNewPostModal);
  document.getElementById('new-post-cancel').addEventListener('click', closeNewPostModal);
  document.getElementById('new-post-create').addEventListener('click', createNewPost);

  // Publish modal
  document.getElementById('publish-close').addEventListener('click', closePublishModal);
  document.getElementById('publish-cancel').addEventListener('click', closePublishModal);
  document.getElementById('publish-confirm').addEventListener('click', publishChanges);

  // Image browser modal
  document.getElementById('image-browser-close').addEventListener('click', closeImageBrowser);
  document.getElementById('image-browser-cancel').addEventListener('click', closeImageBrowser);
  document.querySelectorAll('.image-browser-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => filterImages(btn.dataset.folder));
  });
  document.getElementById('image-browser-upload').addEventListener('change', handleBrowserUpload);

  // Upload modal
  document.getElementById('upload-btn').addEventListener('click', openUploadModal);
  document.getElementById('upload-close').addEventListener('click', closeUploadModal);
  document.getElementById('upload-cancel').addEventListener('click', closeUploadModal);
  document.getElementById('upload-confirm').addEventListener('click', uploadFiles);
  
  const dropzone = document.getElementById('upload-dropzone');
  dropzone.addEventListener('click', () => document.getElementById('upload-input').click());
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', handleFileDrop);
  document.getElementById('upload-input').addEventListener('change', handleFileSelect);

  // Close modals on outside click
  [editorModal, newPostModal, publishModal, imageBrowserModal, uploadModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [editorModal, newPostModal, publishModal].forEach(modal => {
        modal.classList.remove('active');
      });
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && editorModal.classList.contains('active')) {
      e.preventDefault();
      saveFile();
    }
  });
}

// API Functions
async function loadContent() {
  showLoading();
  try {
    const response = await fetch('/api/content');
    contentData = await response.json();
    renderCurrentView();
  } catch (error) {
    showToast('Failed to load content', 'error');
    console.error(error);
  }
}

async function checkGitStatus() {
  try {
    const response = await fetch('/api/git/status');
    const status = await response.json();
    updateGitIndicator(status);
    return status;
  } catch (error) {
    console.error('Failed to check git status:', error);
  }
}

async function loadFile(filePath) {
  try {
    const response = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`);
    return await response.json();
  } catch (error) {
    showToast('Failed to load file', 'error');
    throw error;
  }
}

async function saveFileContent(filePath, content) {
  try {
    const response = await fetch('/api/file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: filePath, content })
    });
    const result = await response.json();
    if (result.success) {
      showToast('File saved successfully', 'success');
      checkGitStatus();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    showToast('Failed to save file', 'error');
    throw error;
  }
}

async function deleteFile(filePath) {
  if (!confirm(`Are you sure you want to delete this file?\n\n${filePath}`)) {
    return;
  }
  try {
    const response = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
      showToast('File deleted', 'success');
      loadContent();
      checkGitStatus();
    }
  } catch (error) {
    showToast('Failed to delete file', 'error');
  }
}

async function createPost(title, description, content) {
  try {
    const response = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, content })
    });
    const result = await response.json();
    if (result.success) {
      showToast('Post created successfully', 'success');
      loadContent();
      checkGitStatus();
    }
    return result;
  } catch (error) {
    showToast('Failed to create post', 'error');
    throw error;
  }
}

async function publishToGitHub(message) {
  try {
    const response = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const result = await response.json();
    if (result.success) {
      showToast('Changes published to GitHub!', 'success');
      checkGitStatus();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    showToast('Failed to publish: ' + error.message, 'error');
    throw error;
  }
}

async function getGitLog() {
  try {
    const response = await fetch('/api/git/log');
    return await response.json();
  } catch (error) {
    console.error('Failed to get git log:', error);
    return [];
  }
}

// View Functions
function switchView(view) {
  currentView = view;
  
  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.view === view);
  });

  const titles = {
    posts: 'Blog Posts',
    pages: 'Pages',
    images: 'Images',
    data: 'Data Files',
    git: 'Git Status'
  };
  viewTitle.textContent = titles[view] || view;
  
  // Show/hide buttons based on view
  document.getElementById('new-post-btn').style.display = view === 'posts' ? '' : 'none';
  document.getElementById('upload-btn').style.display = view === 'images' ? '' : 'none';

  renderCurrentView();
}

function renderCurrentView() {
  if (currentView === 'git') {
    renderGitView();
  } else if (currentView === 'images') {
    renderImagesView();
  } else {
    renderContentList();
  }
}

function renderContentList() {
  const items = contentData[currentView] || [];
  
  if (items.length === 0) {
    contentArea.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
        <h3>No ${currentView} found</h3>
        <p>Create your first ${currentView === 'posts' ? 'blog post' : 'content'} to get started.</p>
        ${currentView === 'posts' ? '<button class="btn btn-primary" onclick="openNewPostModal()">Create Post</button>' : ''}
      </div>
    `;
    return;
  }

  let html = '<div class="content-grid">';
  items.forEach(item => {
    html += `
      <div class="content-card">
        <div class="content-card-info">
          <div class="content-card-title">${escapeHtml(item.title || item.filename)}</div>
          <div class="content-card-meta">${item.date || item.path || ''}</div>
        </div>
        <div class="content-card-actions">
          <button class="action-btn" onclick="openEditor('${escapeHtml(item.path)}')" title="Edit">
            <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="action-btn delete" onclick="deleteFile('${escapeHtml(item.path)}')" title="Delete">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  contentArea.innerHTML = html;
}

async function renderGitView() {
  showLoading();
  const status = await checkGitStatus();
  const log = await getGitLog();

  let changesHtml = '';
  const hasChanges = !status.isClean;

  if (hasChanges) {
    if (status.modified.length > 0) {
      changesHtml += status.modified.map(f => `
        <div class="change-item">
          <span class="change-badge modified">Modified</span>
          <span>${escapeHtml(f)}</span>
        </div>
      `).join('');
    }
    if (status.created.length > 0) {
      changesHtml += status.created.map(f => `
        <div class="change-item">
          <span class="change-badge created">New</span>
          <span>${escapeHtml(f)}</span>
        </div>
      `).join('');
    }
    if (status.deleted.length > 0) {
      changesHtml += status.deleted.map(f => `
        <div class="change-item">
          <span class="change-badge deleted">Deleted</span>
          <span>${escapeHtml(f)}</span>
        </div>
      `).join('');
    }
  } else {
    changesHtml = `
      <div class="no-changes">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <p>All changes are committed. Working directory is clean.</p>
      </div>
    `;
  }

  const logHtml = log.map(commit => `
    <div class="commit-item">
      <span class="commit-hash">${commit.hash.substring(0, 7)}</span>
      <span class="commit-message">${escapeHtml(commit.message)}</span>
      <span class="commit-date">${new Date(commit.date).toLocaleDateString()}</span>
    </div>
  `).join('');

  contentArea.innerHTML = `
    <div class="git-section">
      <div class="git-section-header">Pending Changes</div>
      <div class="git-section-body">
        ${changesHtml}
      </div>
    </div>
    ${hasChanges ? `
      <div style="margin-bottom: 1.5rem;">
        <button class="btn btn-success" onclick="openPublishModal()">
          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          Publish Changes
        </button>
      </div>
    ` : ''}
    <div class="git-section">
      <div class="git-section-header">Recent Commits</div>
      <div class="git-section-body">
        ${logHtml || '<p style="color: var(--ink-soft)">No commits found</p>'}
      </div>
    </div>
  `;
}

// Editor Functions
async function openEditor(filePath) {
  currentFile = filePath;
  try {
    const file = await loadFile(filePath);
    document.getElementById('editor-title').textContent = filePath;
    document.getElementById('editor-content').value = file.raw;
    updatePreview();
    editorModal.classList.add('active');
    document.getElementById('editor-content').focus();
  } catch (error) {
    console.error(error);
  }
}

function closeEditorModal() {
  editorModal.classList.remove('active');
  currentFile = null;
}

async function saveFile() {
  if (!currentFile) return;
  const content = document.getElementById('editor-content').value;
  try {
    await saveFileContent(currentFile, content);
    closeEditorModal();
    loadContent();
  } catch (error) {
    console.error(error);
  }
}

function updatePreview() {
  const content = document.getElementById('editor-content').value;
  // Simple markdown to HTML (basic conversion)
  let html = content
    // Remove frontmatter for preview
    .replace(/^---[\s\S]*?---\n*/m, '')
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  html = '<p>' + html + '</p>';
  document.getElementById('editor-preview').innerHTML = html;
}

function handleToolbarAction(action) {
  const textarea = document.getElementById('editor-content');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selected = text.substring(start, end);

  let insert = '';
  let cursorOffset = 0;

  switch (action) {
    case 'bold':
      insert = `**${selected || 'bold text'}**`;
      cursorOffset = selected ? 0 : -2;
      break;
    case 'italic':
      insert = `*${selected || 'italic text'}*`;
      cursorOffset = selected ? 0 : -1;
      break;
    case 'heading':
      insert = `## ${selected || 'Heading'}`;
      break;
    case 'link':
      insert = `[${selected || 'link text'}](url)`;
      cursorOffset = selected ? -1 : -5;
      break;
    case 'image':
      openImageBrowser((imagePath) => {
        const altText = selected || 'image description';
        insertTextAtCursor(`![${altText}]({{ '/${imagePath}' | relative_url }})`);
      });
      return; // Don't continue with normal insert flow
    case 'code':
      if (selected.includes('\n')) {
        insert = "```\n" + selected + "\n```";
      } else {
        insert = '`' + (selected || 'code') + '`';
        cursorOffset = selected ? 0 : -1;
      }
      break;
    case 'list':
      insert = selected.split('\n').map(line => `- ${line}`).join('\n') || '- item';
      break;
  }

  textarea.value = text.substring(0, start) + insert + text.substring(end);
  textarea.focus();
  const newPos = start + insert.length + cursorOffset;
  textarea.setSelectionRange(newPos, newPos);
  updatePreview();
}

// New Post Functions
function openNewPostModal() {
  document.getElementById('post-title').value = '';
  document.getElementById('post-description').value = '';
  document.getElementById('post-content').value = '';
  newPostModal.classList.add('active');
  document.getElementById('post-title').focus();
}

function closeNewPostModal() {
  newPostModal.classList.remove('active');
}

async function createNewPost() {
  const title = document.getElementById('post-title').value.trim();
  const description = document.getElementById('post-description').value.trim();
  const content = document.getElementById('post-content').value.trim();

  if (!title) {
    showToast('Please enter a title', 'error');
    return;
  }

  try {
    await createPost(title, description, content || '# ' + title + '\n\nStart writing here...');
    closeNewPostModal();
  } catch (error) {
    console.error(error);
  }
}

// Publish Functions
async function openPublishModal() {
  const status = await checkGitStatus();
  
  let html = '';
  if (status.isClean) {
    html = `
      <div class="no-changes">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <p>No changes to publish</p>
      </div>
    `;
    document.getElementById('publish-confirm').disabled = true;
  } else {
    if (status.modified.length > 0) {
      html += status.modified.map(f => `
        <div class="change-item">
          <span class="change-badge modified">Modified</span>
          <span>${escapeHtml(f)}</span>
        </div>
      `).join('');
    }
    if (status.created.length > 0) {
      html += status.created.map(f => `
        <div class="change-item">
          <span class="change-badge created">New</span>
          <span>${escapeHtml(f)}</span>
        </div>
      `).join('');
    }
    if (status.deleted.length > 0) {
      html += status.deleted.map(f => `
        <div class="change-item">
          <span class="change-badge deleted">Deleted</span>
          <span>${escapeHtml(f)}</span>
        </div>
      `).join('');
    }
    document.getElementById('publish-confirm').disabled = false;
  }

  document.getElementById('publish-changes').innerHTML = html;
  document.getElementById('commit-message').value = '';
  publishModal.classList.add('active');
}

function closePublishModal() {
  publishModal.classList.remove('active');
}

async function publishChanges() {
  const message = document.getElementById('commit-message').value.trim();
  const btn = document.getElementById('publish-confirm');
  
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;"></span> Publishing...';

  try {
    await publishToGitHub(message);
    closePublishModal();
  } catch (error) {
    console.error(error);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Push to GitHub';
  }
}

// UI Helpers
function updateGitIndicator(status) {
  const dot = gitIndicator.querySelector('.git-dot');
  const text = gitIndicator.querySelector('.git-text');
  
  if (status.isClean) {
    dot.className = 'git-dot clean';
    text.textContent = 'All synced';
  } else {
    const count = status.modified.length + status.created.length + status.deleted.length;
    dot.className = 'git-dot dirty';
    text.textContent = `${count} change${count !== 1 ? 's' : ''}`;
  }
}

// ==================== IMAGE FUNCTIONS ====================

// Load images from server
async function loadImages() {
  try {
    const response = await fetch('/api/images');
    imagesData = await response.json();
    return imagesData;
  } catch (error) {
    showToast('Failed to load images', 'error');
    return [];
  }
}

// Render images gallery view
async function renderImagesView() {
  showLoading();
  await loadImages();
  
  if (imagesData.length === 0) {
    contentArea.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        <h3>No images found</h3>
        <p>Upload images to use in your content.</p>
        <button class="btn btn-primary" onclick="openUploadModal()">Upload Images</button>
      </div>
    `;
    return;
  }

  let html = `
    <div class="images-header">
      <div class="images-filter">
        <button class="filter-btn active" data-folder="all">All (${imagesData.length})</button>
        <button class="filter-btn" data-folder="images">Content (${imagesData.filter(i => i.folder === 'images').length})</button>
        <button class="filter-btn" data-folder="banners">Banners (${imagesData.filter(i => i.folder === 'banners').length})</button>
      </div>
    </div>
    <div class="image-gallery" id="images-gallery">
  `;

  imagesData.forEach(img => {
    const sizeKB = (img.size / 1024).toFixed(1);
    html += `
      <div class="gallery-item" data-folder="${img.folder}">
        <div class="gallery-item-preview">
          <img src="${img.url}" alt="${escapeHtml(img.name)}" loading="lazy">
        </div>
        <div class="gallery-item-info">
          <div class="gallery-item-name" title="${escapeHtml(img.name)}">${escapeHtml(img.name)}</div>
          <div class="gallery-item-meta">${sizeKB} KB • ${img.folder}</div>
        </div>
        <div class="gallery-item-actions">
          <button onclick="copyImagePath('${escapeHtml(img.path)}')" title="Copy path">📋 Copy</button>
          <button class="delete" onclick="deleteImage('${escapeHtml(img.path)}')" title="Delete">🗑️ Delete</button>
        </div>
      </div>
    `;
  });

  html += '</div>';
  contentArea.innerHTML = html;

  // Add filter event listeners
  document.querySelectorAll('.images-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.images-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterGallery(btn.dataset.folder);
    });
  });
}

function filterGallery(folder) {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (folder === 'all' || item.dataset.folder === folder) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Image Browser Modal (for inserting into editor)
async function openImageBrowser(callback) {
  imageInsertCallback = callback;
  selectedImage = null;
  await loadImages();
  renderImageBrowserGrid('all');
  imageBrowserModal.classList.add('active');
}

function closeImageBrowser() {
  imageBrowserModal.classList.remove('active');
  imageInsertCallback = null;
  selectedImage = null;
}

function filterImages(folder) {
  document.querySelectorAll('.image-browser-tabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.folder === folder);
  });
  renderImageBrowserGrid(folder);
}

function renderImageBrowserGrid(folder) {
  const grid = document.getElementById('image-browser-grid');
  const filtered = folder === 'all' ? imagesData : imagesData.filter(img => img.folder === folder);
  
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color: var(--ink-soft); text-align: center; padding: 2rem;">No images in this folder</p>';
    return;
  }

  grid.innerHTML = filtered.map(img => `
    <div class="image-item ${selectedImage === img.path ? 'selected' : ''}" 
         onclick="selectImage('${escapeHtml(img.path)}')"
         ondblclick="insertSelectedImage()">
      <img src="${img.url}" alt="${escapeHtml(img.name)}" loading="lazy">
      <div class="image-item-name">${escapeHtml(img.name)}</div>
      <div class="image-item-actions">
        <button class="image-item-btn copy" onclick="event.stopPropagation(); copyImagePath('${escapeHtml(img.path)}')" title="Copy path">
          <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function selectImage(path) {
  selectedImage = path;
  document.querySelectorAll('.image-item').forEach(item => {
    item.classList.toggle('selected', item.querySelector('img').src.includes(path.split('/').pop()));
  });
  // Double-click to insert
}

function insertSelectedImage() {
  if (selectedImage && imageInsertCallback) {
    imageInsertCallback(selectedImage);
    closeImageBrowser();
  }
}

function insertTextAtCursor(text) {
  const textarea = document.getElementById('editor-content');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  textarea.value = value.substring(0, start) + text + value.substring(end);
  textarea.focus();
  const newPos = start + text.length;
  textarea.setSelectionRange(newPos, newPos);
  updatePreview();
}

// Upload Modal
function openUploadModal() {
  pendingUploads = [];
  document.getElementById('upload-preview').innerHTML = '';
  document.getElementById('upload-confirm').disabled = true;
  uploadModal.classList.add('active');
}

function closeUploadModal() {
  uploadModal.classList.remove('active');
  pendingUploads = [];
}

function handleFileDrop(e) {
  e.preventDefault();
  document.getElementById('upload-dropzone').classList.remove('dragover');
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  addFilesToUpload(files);
}

function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  addFilesToUpload(files);
  e.target.value = '';
}

function handleBrowserUpload(e) {
  const file = e.target.files[0];
  if (file) {
    uploadSingleFile(file);
  }
  e.target.value = '';
}

function addFilesToUpload(files) {
  files.forEach(file => {
    if (!pendingUploads.find(f => f.name === file.name)) {
      pendingUploads.push(file);
    }
  });
  renderUploadPreview();
}

function removeFromUpload(index) {
  pendingUploads.splice(index, 1);
  renderUploadPreview();
}

function renderUploadPreview() {
  const container = document.getElementById('upload-preview');
  container.innerHTML = pendingUploads.map((file, i) => `
    <div class="upload-preview-item">
      <img src="${URL.createObjectURL(file)}" alt="${escapeHtml(file.name)}">
      <button class="remove-btn" onclick="removeFromUpload(${i})">&times;</button>
    </div>
  `).join('');
  document.getElementById('upload-confirm').disabled = pendingUploads.length === 0;
}

async function uploadFiles() {
  const folder = document.getElementById('upload-folder').value;
  const btn = document.getElementById('upload-confirm');
  btn.disabled = true;
  btn.textContent = 'Uploading...';

  let success = 0;
  for (const file of pendingUploads) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`/api/images/upload?folder=${folder}`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) success++;
    } catch (error) {
      console.error('Upload failed:', file.name, error);
    }
  }

  showToast(`Uploaded ${success} of ${pendingUploads.length} images`, success === pendingUploads.length ? 'success' : 'error');
  closeUploadModal();
  
  if (currentView === 'images') {
    renderImagesView();
  }
  checkGitStatus();
}

async function uploadSingleFile(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/images/upload?folder=images', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    if (result.success) {
      showToast('Image uploaded', 'success');
      await loadImages();
      renderImageBrowserGrid(document.querySelector('.image-browser-tabs .tab-btn.active').dataset.folder);
      checkGitStatus();
    }
  } catch (error) {
    showToast('Upload failed', 'error');
  }
}

function copyImagePath(path) {
  const markdownPath = `{{ '/${path}' | relative_url }}`;
  navigator.clipboard.writeText(markdownPath).then(() => {
    showToast('Path copied to clipboard', 'success');
  }).catch(() => {
    // Fallback
    const temp = document.createElement('input');
    temp.value = markdownPath;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showToast('Path copied to clipboard', 'success');
  });
}

async function deleteImage(path) {
  if (!confirm(`Delete this image?\n\n${path}`)) return;
  
  try {
    const response = await fetch(`/api/images?path=${encodeURIComponent(path)}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
      showToast('Image deleted', 'success');
      if (currentView === 'images') {
        renderImagesView();
      }
      checkGitStatus();
    }
  } catch (error) {
    showToast('Failed to delete image', 'error');
  }
}

// UI Helpers
function showLoading() {
  contentArea.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Global function exports for inline onclick handlers
window.openEditor = openEditor;
window.deleteFile = deleteFile;
window.openNewPostModal = openNewPostModal;
window.openPublishModal = openPublishModal;
// Image functions
window.deleteImage = deleteImage;
window.copyImagePath = copyImagePath;
window.selectImage = selectImage;
window.insertSelectedImage = insertSelectedImage;
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.removeFromUpload = removeFromUpload;
window.uploadFiles = uploadFiles;
window.handleFileDrop = handleFileDrop;
window.handleFileSelect = handleFileSelect;
window.handleBrowserUpload = handleBrowserUpload;
window.filterImages = filterImages;
window.openImageBrowser = openImageBrowser;
window.closeImageBrowser = closeImageBrowser;
