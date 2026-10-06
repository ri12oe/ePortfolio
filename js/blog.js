(() => {
  const posts = (window.BLOG_POSTS || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const author = window.BLOG_AUTHOR || {};
  const feed = document.getElementById('blogFeed');
  const tabsEl = document.getElementById('blogTabs');
  const topicsEl = document.getElementById('blogTopics');
  const searchEl = document.getElementById('blogSearch');
  const toast = document.getElementById('blogToast');
  if (!feed) return;

  const LIKES_KEY = 'blog-likes';
  const readLikes = () => {
    try {
      return new Set(JSON.parse(localStorage.getItem(LIKES_KEY)) || []);
    } catch {
      return new Set();
    }
  };
  const likes = readLikes();
  const saveLikes = () => {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify([...likes]));
    } catch {
      // storage can be blocked; likes just won't persist
    }
  };

  const state = { tag: 'All', query: '' };
  const tags = ['All', ...new Set(posts.map((p) => p.tag))];

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const svg = (paths) => {
    const wrap = document.createElement('span');
    wrap.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    return wrap.firstChild;
  };
  const HEART = '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"></path>';
  const SHARE = '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="m16 6-4-4-4 4"></path><path d="M12 2v13"></path>';
  const EXPAND = '<path d="M15 3h6v6"></path><path d="m21 3-7 7"></path><path d="m3 21 7-7"></path><path d="M9 21H3v-6"></path>';

  const timeAgo = (iso) => {
    const seconds = Math.max(0, (Date.now() - new Date(iso)) / 1000);
    const units = [
      ['y', 31536000],
      ['mo', 2592000],
      ['w', 604800],
      ['d', 86400],
      ['h', 3600],
      ['m', 60],
    ];
    for (const [label, size] of units) {
      if (seconds >= size) return `${Math.floor(seconds / size)}${label}`;
    }
    return 'now';
  };

  const fullDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const likeCount = (post) => (post.likes || 0) + (likes.has(post.id) ? 1 : 0);

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
  };

  const copyLink = async (post) => {
    const url = `${location.origin}${location.pathname}#post-${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied');
    } catch {
      showToast('Copy not available here');
    }
  };

  const buildPost = (post) => {
    const article = el('article', 'post');
    article.id = `post-${post.id}`;

    const avatar = el('img', 'avatar');
    avatar.src = author.avatar || 'images/me.jpg';
    avatar.alt = '';
    article.appendChild(avatar);

    const body = el('div', 'post__body');

    const head = el('div', 'post__head');
    head.append(el('span', 'name', author.name || ''), el('span', 'handle', author.handle || ''));
    head.append(el('span', 'dot', '·'));
    const time = el('time', 'time', timeAgo(post.date));
    time.dateTime = post.date;
    time.title = fullDate(post.date);
    head.appendChild(time);
    const tag = el('button', 'post__tag', post.tag);
    tag.type = 'button';
    tag.addEventListener('click', () => selectTag(post.tag));
    head.appendChild(tag);
    body.appendChild(head);

    body.appendChild(el('p', 'post__text', post.text));

    if (post.link) {
      const link = el('a', 'post__link', post.link.label || post.link.url);
      link.href = post.link.url;
      if (/^https?:/.test(post.link.url)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      body.appendChild(link);
    }

    if (post.image) {
      const media = el('div', 'post-media');
      const img = el('img', 'card-img');
      img.src = post.image;
      img.alt = post.alt || '';
      img.loading = 'lazy';
      const expand = el('button', 'expand-btn');
      expand.type = 'button';
      expand.setAttribute('aria-label', `View full image: ${post.alt || post.id}`);
      expand.appendChild(svg(EXPAND));
      media.append(img, expand);
      body.appendChild(media);
    }

    const actions = el('div', 'post__actions');
    const like = el('button', 'action action--like');
    like.type = 'button';
    like.appendChild(svg(HEART));
    const count = el('span', 'count', String(likeCount(post)));
    like.appendChild(count);
    const sync = () => {
      const liked = likes.has(post.id);
      like.classList.toggle('is-liked', liked);
      like.setAttribute('aria-pressed', liked);
      like.setAttribute('aria-label', liked ? 'Unlike' : 'Like');
      count.textContent = likeCount(post);
    };
    sync();
    like.addEventListener('click', () => {
      likes.has(post.id) ? likes.delete(post.id) : likes.add(post.id);
      saveLikes();
      sync();
    });

    const share = el('button', 'action action--share');
    share.type = 'button';
    share.setAttribute('aria-label', 'Copy link to post');
    share.appendChild(svg(SHARE));
    share.addEventListener('click', () => copyLink(post));

    actions.append(like, share);
    body.appendChild(actions);
    article.appendChild(body);
    return article;
  };

  const matches = (post) => {
    if (state.tag !== 'All' && post.tag !== state.tag) return false;
    const q = state.query.trim().toLowerCase();
    if (!q) return true;
    return `${post.text} ${post.tag} ${post.alt || ''}`.toLowerCase().includes(q);
  };

  const renderFeed = () => {
    feed.replaceChildren();
    const visible = posts.filter(matches);
    if (!visible.length) {
      const empty = el('div', 'blog-empty');
      empty.append(el('p', 'blog-empty__title', 'No posts found'), el('p', '', 'Try a different search or topic.'));
      feed.appendChild(empty);
      return;
    }
    visible.forEach((post) => feed.appendChild(buildPost(post)));
  };

  const renderTabs = () => {
    tabsEl.replaceChildren();
    tags.forEach((tag) => {
      const tab = el('button', 'blog-tab', tag);
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', tag === state.tag);
      tab.classList.toggle('is-active', tag === state.tag);
      tab.addEventListener('click', () => selectTag(tag));
      tabsEl.appendChild(tab);
    });
  };

  const renderTopics = () => {
    if (!topicsEl) return;
    topicsEl.replaceChildren();
    tags.slice(1).forEach((tag) => {
      const total = posts.filter((p) => p.tag === tag).length;
      const row = el('button', 'blog-topic');
      row.type = 'button';
      row.append(el('strong', '', `#${tag}`), el('small', '', `${total} post${total === 1 ? '' : 's'}`));
      row.addEventListener('click', () => selectTag(tag));
      topicsEl.appendChild(row);
    });
  };

  function selectTag(tag) {
    state.tag = tag;
    renderTabs();
    renderFeed();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      state.query = searchEl.value;
      renderFeed();
    });
  }

  renderTabs();
  renderTopics();
  renderFeed();

  if (location.hash.startsWith('#post-')) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ block: 'center' });
      target.classList.add('is-target');
    }
  }
})();