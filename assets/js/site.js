(function () {
  var content = document.getElementById('page-content');
  var tocList = document.getElementById('toc-list');
  if (!content || !tocList) return;

  var headings = Array.from(content.querySelectorAll('h2, h3'));
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
})();
