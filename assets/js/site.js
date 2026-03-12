(function () {
  var content = document.getElementById('page-content');
  var tocList = document.getElementById('toc-list');
  var searchForm = document.getElementById('page-search-form');
  var searchInput = document.getElementById('page-search-input');
  var searchStatus = document.getElementById('page-search-status');
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
