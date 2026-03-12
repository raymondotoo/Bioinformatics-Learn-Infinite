(function () {
  var content = document.getElementById('page-content');
  var tocList = document.getElementById('toc-list');
  var searchForm = document.getElementById('page-search-form');
  var searchInput = document.getElementById('page-search-input');
  var searchStatus = document.getElementById('page-search-status');
  if (!content || !tocList) return;

  // Pages that should NOT use the pane navigation system
  var excludedPaths = ['/', '/index.html', '/feedback/', '/blog/', '/hire-expert/', '/privacy-policy/'];
  var currentPath = window.location.pathname;
  var isExcludedPage = excludedPaths.some(function(path) {
    return currentPath === path || currentPath.endsWith(path);
  });

  // Determine if this is a learning path page (has multiple h2 sections and not excluded)
  var h2Headings = Array.from(content.querySelectorAll('h2'));
  var isLearningPath = !isExcludedPage && h2Headings.length >= 3;
  var headings = Array.from(content.querySelectorAll('h2, h3'));
  var tocItems = [];
  
  if (headings.length === 0) {
    var empty = document.createElement('li');
    empty.className = 'toc-item toc-empty';
    empty.textContent = 'No sections listed.';
    tocList.appendChild(empty);
    return;
  }

  var usedIds = new Set();
  var linkById = {};
  var pageKey = window.location.pathname.replace(/\//g, '_') || 'home';

  function slugify(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Progress tracking functions
  function getProgress() {
    try {
      var stored = localStorage.getItem('bioinfo_progress_' + pageKey);
      return stored ? JSON.parse(stored) : { completed: [], currentSection: 0 };
    } catch (e) {
      return { completed: [], currentSection: 0 };
    }
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem('bioinfo_progress_' + pageKey, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress');
    }
  }

  function resetProgress() {
    try {
      localStorage.removeItem('bioinfo_progress_' + pageKey);
      window.location.reload();
    } catch (e) {
      console.warn('Could not reset progress');
    }
  }

  // Section Pane System for Learning Paths
  var sectionPanes = [];
  var currentSectionIndex = 0;
  var progress = getProgress();

  if (isLearningPath) {
    setupSectionPanes();
  } else {
    setupStandardToc();
  }

  function setupSectionPanes() {
    // Find the first h1 (title) and content before first h2
    var firstH1 = content.querySelector('h1');
    var introContent = [];
    var currentElement = firstH1 ? firstH1.nextElementSibling : content.firstElementChild;
    
    while (currentElement && currentElement.tagName !== 'H2') {
      introContent.push(currentElement);
      currentElement = currentElement.nextElementSibling;
    }

    // Create progress bar
    var progressBar = document.createElement('div');
    progressBar.className = 'section-progress-bar';
    progressBar.innerHTML = 
      '<span class="section-progress-label">Progress</span>' +
      '<div class="section-progress-track"><div class="section-progress-fill" id="progress-fill"></div></div>' +
      '<span class="section-progress-text" id="progress-text">0 / ' + h2Headings.length + '</span>' +
      '<button class="reset-progress-btn" id="reset-progress-btn" title="Reset progress">Reset</button>';
    
    // Insert progress bar after intro content
    var insertPoint = introContent.length > 0 ? introContent[introContent.length - 1] : firstH1;
    if (insertPoint && insertPoint.nextSibling) {
      insertPoint.parentNode.insertBefore(progressBar, insertPoint.nextSibling);
    } else {
      content.appendChild(progressBar);
    }

    // Create section pane wrapper
    var paneWrapper = document.createElement('div');
    paneWrapper.className = 'section-pane-wrapper';
    paneWrapper.id = 'section-pane-wrapper';

    // Group content by h2 sections
    h2Headings.forEach(function(h2, index) {
      var pane = document.createElement('div');
      pane.className = 'section-pane';
      pane.dataset.sectionIndex = index;
      pane.dataset.sectionId = h2.id || slugify(h2.textContent) || 'section-' + index;
      
      // Clone the h2
      var clonedH2 = h2.cloneNode(true);
      if (!clonedH2.id) {
        var baseId = slugify(h2.textContent) || 'section-' + index;
        var id = baseId;
        var suffix = 2;
        while (usedIds.has(id)) {
          id = baseId + '-' + suffix;
          suffix++;
        }
        clonedH2.id = id;
        usedIds.add(id);
      } else {
        usedIds.add(clonedH2.id);
      }
      pane.appendChild(clonedH2);
      
      // Get all content until next h2
      var nextElement = h2.nextElementSibling;
      while (nextElement && nextElement.tagName !== 'H2') {
        var cloned = nextElement.cloneNode(true);
        // Handle h3 ids
        if (cloned.tagName === 'H3') {
          var h3BaseId = cloned.id || slugify(cloned.textContent) || 'subsection-' + index;
          var h3Id = h3BaseId;
          var h3Suffix = 2;
          while (usedIds.has(h3Id)) {
            h3Id = h3BaseId + '-' + h3Suffix;
            h3Suffix++;
          }
          cloned.id = h3Id;
          usedIds.add(h3Id);
        }
        pane.appendChild(cloned);
        nextElement = nextElement.nextElementSibling;
      }

      // Add completion button
      var completeBtn = document.createElement('button');
      completeBtn.className = 'section-complete-btn';
      completeBtn.dataset.sectionIndex = index;
      completeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg><span>Mark as Complete</span>';
      if (progress.completed.includes(index)) {
        completeBtn.classList.add('is-completed');
        completeBtn.querySelector('span').textContent = 'Completed';
      }
      pane.appendChild(completeBtn);

      sectionPanes.push({
        element: pane,
        id: clonedH2.id,
        title: h2.textContent,
        index: index
      });

      paneWrapper.appendChild(pane);
    });

    // Create navigation controls
    var navControls = document.createElement('div');
    navControls.className = 'section-nav-controls';
    navControls.innerHTML = 
      '<button class="section-nav-btn" id="prev-section-btn" disabled>' +
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>' +
        '<span>Previous</span>' +
      '</button>' +
      '<div class="section-nav-indicator" id="section-nav-indicator"></div>' +
      '<button class="section-nav-btn" id="next-section-btn">' +
        '<span>Next</span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>' +
      '</button>';
    paneWrapper.appendChild(navControls);

    // Build dot indicators
    var indicatorContainer = navControls.querySelector('#section-nav-indicator');
    sectionPanes.forEach(function(pane, idx) {
      var dot = document.createElement('button');
      dot.className = 'section-dot';
      dot.dataset.sectionIndex = idx;
      dot.title = pane.title;
      if (progress.completed.includes(idx)) {
        dot.classList.add('is-completed');
      }
      indicatorContainer.appendChild(dot);
    });

    // Remove original h2 sections from content (keep intro)
    h2Headings.forEach(function(h2) {
      var elementsToRemove = [h2];
      var nextEl = h2.nextElementSibling;
      while (nextEl && nextEl.tagName !== 'H2' && !nextEl.classList.contains('section-progress-bar')) {
        elementsToRemove.push(nextEl);
        nextEl = nextEl.nextElementSibling;
      }
      elementsToRemove.forEach(function(el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    });

    // Insert pane wrapper
    progressBar.parentNode.insertBefore(paneWrapper, progressBar.nextSibling);

    // Build TOC with checkmarks
    sectionPanes.forEach(function(pane, idx) {
      var item = document.createElement('li');
      item.className = 'toc-item toc-level-2 section-toc-item';
      
      var checkmark = document.createElement('span');
      checkmark.className = 'section-toc-check';
      checkmark.dataset.sectionIndex = idx;
      if (progress.completed.includes(idx)) {
        checkmark.classList.add('is-completed');
      }
      
      var link = document.createElement('a');
      link.href = '#' + pane.id;
      link.textContent = pane.title;
      link.dataset.sectionIndex = idx;

      item.appendChild(checkmark);
      item.appendChild(link);
      tocList.appendChild(item);
      linkById[pane.id] = link;
      tocItems.push({ item: item, text: pane.title.toLowerCase(), sectionIndex: idx });
    });

    // Initialize display
    currentSectionIndex = progress.currentSection || 0;
    if (currentSectionIndex >= sectionPanes.length) currentSectionIndex = 0;
    showSection(currentSectionIndex);
    updateProgressDisplay();

    // Event listeners
    document.getElementById('prev-section-btn').addEventListener('click', function() {
      if (currentSectionIndex > 0) {
        showSection(currentSectionIndex - 1);
      }
    });

    document.getElementById('next-section-btn').addEventListener('click', function() {
      if (currentSectionIndex < sectionPanes.length - 1) {
        showSection(currentSectionIndex + 1);
      }
    });

    document.getElementById('reset-progress-btn').addEventListener('click', function() {
      if (confirm('Reset all progress for this page?')) {
        resetProgress();
      }
    });

    // Dot navigation
    indicatorContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('section-dot')) {
        var idx = parseInt(e.target.dataset.sectionIndex, 10);
        showSection(idx);
      }
    });

    // Mark complete buttons
    paneWrapper.addEventListener('click', function(e) {
      var btn = e.target.closest('.section-complete-btn');
      if (btn) {
        var idx = parseInt(btn.dataset.sectionIndex, 10);
        toggleSectionComplete(idx, btn);
      }
    });

    // TOC link clicks
    tocList.addEventListener('click', function(e) {
      var link = e.target.closest('a[data-section-index]');
      if (link) {
        e.preventDefault();
        var idx = parseInt(link.dataset.sectionIndex, 10);
        showSection(idx);
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft' && currentSectionIndex > 0) {
        showSection(currentSectionIndex - 1);
      } else if (e.key === 'ArrowRight' && currentSectionIndex < sectionPanes.length - 1) {
        showSection(currentSectionIndex + 1);
      }
    });
  }

  function showSection(index) {
    currentSectionIndex = index;
    
    // Update pane visibility
    sectionPanes.forEach(function(pane, idx) {
      pane.element.classList.toggle('is-active', idx === index);
    });

    // Update nav buttons
    document.getElementById('prev-section-btn').disabled = index === 0;
    document.getElementById('next-section-btn').disabled = index === sectionPanes.length - 1;

    // Update dot indicators
    var dots = document.querySelectorAll('.section-dot');
    dots.forEach(function(dot, idx) {
      dot.classList.toggle('is-active', idx === index);
    });

    // Update TOC active state
    var tocLinks = tocList.querySelectorAll('a[data-section-index]');
    tocLinks.forEach(function(link, idx) {
      link.classList.toggle('is-current', idx === index);
    });

    // Scroll to top of content
    content.scrollTo({ top: 0, behavior: 'smooth' });

    // Save current position
    progress.currentSection = index;
    saveProgress(progress);
  }

  function toggleSectionComplete(index, btn) {
    var completedIndex = progress.completed.indexOf(index);
    if (completedIndex === -1) {
      progress.completed.push(index);
      btn.classList.add('is-completed');
      btn.querySelector('span').textContent = 'Completed';
    } else {
      progress.completed.splice(completedIndex, 1);
      btn.classList.remove('is-completed');
      btn.querySelector('span').textContent = 'Mark as Complete';
    }
    
    // Update dot and TOC checkmark
    var dot = document.querySelector('.section-dot[data-section-index="' + index + '"]');
    var checkmark = document.querySelector('.section-toc-check[data-section-index="' + index + '"]');
    if (dot) dot.classList.toggle('is-completed', progress.completed.includes(index));
    if (checkmark) checkmark.classList.toggle('is-completed', progress.completed.includes(index));
    
    saveProgress(progress);
    updateProgressDisplay();
  }

  function updateProgressDisplay() {
    var completed = progress.completed.length;
    var total = sectionPanes.length;
    var percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    var fill = document.getElementById('progress-fill');
    var text = document.getElementById('progress-text');
    
    if (fill) fill.style.width = percentage + '%';
    if (text) text.textContent = completed + ' / ' + total + ' (' + percentage + '%)';
  }

  function setupStandardToc() {
    headings.forEach(function (heading, index) {
      var baseId = heading.id || slugify(heading.textContent) || 'section-' + index;
      var id = baseId;
      var suffix = 2;

      while (usedIds.has(id)) {
        id = baseId + '-' + suffix;
        suffix += 1;
      }

      heading.id = id;
      usedIds.add(id);

      var item = document.createElement('li');
      item.className = 'toc-item ' + (heading.tagName.toLowerCase() === 'h3' ? 'toc-level-3' : 'toc-level-2');

      var link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = heading.textContent;
      link.dataset.targetId = id;

      item.appendChild(link);
      tocList.appendChild(item);
      linkById[id] = link;
      tocItems.push({ item: item, text: link.textContent.toLowerCase() });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          Object.values(linkById).forEach(function (link) {
            link.classList.remove('is-current');
          });

          var active = linkById[entry.target.id];
          if (active) active.classList.add('is-current');
        });
      },
      {
        root: content,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1
      }
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  if (!searchForm || !searchInput || !searchStatus) return;

  var searchableNodes = Array.from(content.querySelectorAll('h1, h2, h3, h4, p, li, td, th, blockquote, pre'));
  var activeHits = [];

  function clearHits() {
    activeHits.forEach(function (node) {
      node.classList.remove('search-hit');
      node.classList.remove('search-hit-current');
    });
    activeHits = [];
  }

  function filterToc(query) {
    tocItems.forEach(function (entry) {
      entry.item.style.display = !query || entry.text.indexOf(query) !== -1 ? '' : 'none';
    });
  }

  function runSearch() {
    var query = searchInput.value.trim().toLowerCase();
    clearHits();
    filterToc(query);

    if (!query) {
      searchStatus.textContent = '';
      return;
    }

    searchableNodes.forEach(function (node) {
      if ((node.textContent || '').toLowerCase().indexOf(query) !== -1) {
        node.classList.add('search-hit');
        activeHits.push(node);
      }
    });

    if (activeHits.length === 0) {
      searchStatus.textContent = 'No matches found.';
      return;
    }

    var first = activeHits[0];
    first.classList.add('search-hit-current');
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    searchStatus.textContent = 'Found ' + activeHits.length + ' match' + (activeHits.length === 1 ? '' : 'es') + '.';
  }

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    runSearch();
  });

  searchInput.addEventListener('input', function () {
    if (!searchInput.value.trim()) {
      clearHits();
      filterToc('');
      searchStatus.textContent = '';
    }
  });

  var quoteText = document.getElementById('quote-of-day-text');
  var quoteAuthor = document.getElementById('quote-of-day-author');
  if (quoteText && quoteAuthor) {
    var quotes = [
      { text: 'Science is not only a disciple of reason but, also, one of romance and passion.', author: 'Stephen Hawking' },
      { text: 'Somewhere, something incredible is waiting to be known.', author: 'Carl Sagan' },
      { text: 'Research is what I am doing when I do not know what I am doing.', author: 'Wernher von Braun' },
      { text: 'The important thing is to never stop questioning.', author: 'Albert Einstein' },
      { text: 'Science and everyday life cannot and should not be separated.', author: 'Rosalind Franklin' },
      { text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
      { text: 'The good thing about science is that it is true whether or not you believe in it.', author: 'Neil deGrasse Tyson' },
      { text: 'The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.', author: 'Stephen Hawking' },
      { text: 'Biology gives you a brain. Life turns it into a mind.', author: 'Jeffrey Eugenides' },
      { text: 'In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual.', author: 'Galileo Galilei' }
    ];

    var dayIndex = Math.floor(Date.now() / 86400000) % quotes.length;
    var quote = quotes[dayIndex];
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = '- ' + quote.author;
  }

  var tipTitle = document.getElementById('featured-tip-title');
  var tipText = document.getElementById('featured-tip-text');
  var tipLink = document.getElementById('featured-tip-link');
  if (tipTitle && tipText && tipLink) {
    var weeklyTips = [];
    var tipsData = document.getElementById('weekly-tips-data');

    if (tipsData && tipsData.textContent) {
      try {
        weeklyTips = JSON.parse(tipsData.textContent);
      } catch (error) {
        weeklyTips = [];
      }
    }

    if (Array.isArray(weeklyTips) && weeklyTips.length > 0) {
      var weekIndex = Math.floor(Date.now() / 604800000) % weeklyTips.length;
      var tip = weeklyTips[weekIndex];
      tipTitle.textContent = tip.title || '';
      tipText.textContent = tip.text || '';
      tipLink.href = tip.url || '#';
      tipLink.textContent = tip.link_label || 'Open this week\'s resource';
    }
  }

  // Sticky header shadow on scroll
  var topbar = document.querySelector('.topbar');
  if (topbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Copy link to clipboard
  var copyBtn = document.getElementById('copy-link-btn');
  var copyText = document.getElementById('copy-link-text');
  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', function() {
      var url = window.location.href;
      navigator.clipboard.writeText(url).then(function() {
        copyBtn.classList.add('copied');
        copyText.textContent = 'Copied!';
        setTimeout(function() {
          copyBtn.classList.remove('copied');
          copyText.textContent = 'Copy Link';
        }, 2000);
      }).catch(function() {
        // Fallback for older browsers
        var temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyBtn.classList.add('copied');
        copyText.textContent = 'Copied!';
        setTimeout(function() {
          copyBtn.classList.remove('copied');
          copyText.textContent = 'Copy Link';
        }, 2000);
      });
    });
  }
})();
