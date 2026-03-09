(function () {
  var content = document.getElementById('page-content');
  var tocList = document.getElementById('toc-list');
  var searchForm = document.getElementById('page-search-form');
  var searchInput = document.getElementById('page-search-input');
  var searchStatus = document.getElementById('page-search-status');
  var feedbackForm = document.getElementById('feedback-form');
  var feedbackMessage = document.getElementById('feedback-message');
  var feedbackWordCount = document.getElementById('feedback-word-count');
  var feedbackError = document.getElementById('feedback-error');
  if (!content || !tocList) return;

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

  function slugify(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

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

  if (!feedbackForm || !feedbackMessage || !feedbackWordCount || !feedbackError) return;

  var maxWords = parseInt(feedbackForm.dataset.maxWords || '120', 10);

  function countWords(text) {
    var cleaned = (text || '').trim();
    if (!cleaned) return 0;
    return cleaned.split(/\s+/).length;
  }

  function updateFeedbackState() {
    var words = countWords(feedbackMessage.value);
    feedbackWordCount.textContent = words + ' / ' + maxWords + ' words';

    if (words > maxWords) {
      feedbackError.textContent = 'Please shorten your feedback to ' + maxWords + ' words or fewer.';
      return false;
    }

    feedbackError.textContent = '';
    return true;
  }

  feedbackMessage.addEventListener('input', updateFeedbackState);

  feedbackForm.addEventListener('submit', function (event) {
    if (!updateFeedbackState()) {
      event.preventDefault();
    }
  });

  updateFeedbackState();
})();
