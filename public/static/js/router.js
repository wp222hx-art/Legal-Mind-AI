// Router - SPA-like navigation (Anti-flicker version)
let currentPage = 'home';
const pageCache = {};

function initRouter(initialPage) {
  currentPage = initialPage;
  updateActiveNav();

  // Prefetch all API data immediately so page switches are instant
  const apiMap = {
    'home': '/api/dashboard',
    'agent': '/api/agent',
    'rag': '/api/rag',
    'vector_db': '/api/vector-db',
    'knowledge_graph': '/api/knowledge-graph',
    'learning': '/api/learning',
    'thesis': '/api/thesis',
    'moot_court': '/api/moot-court',
    'career': '/api/career',
  };

  // Load current page first, then prefetch others
  const currentKey = currentPage.replace(/-/g, '_');
  const currentUrl = apiMap[currentKey];

  if (currentUrl) {
    fetch(currentUrl)
      .then(r => r.json())
      .then(data => {
        pageCache[currentKey] = data;
        renderPage(currentPage, data);
        revealApp();
        // Prefetch other pages in background
        prefetchAll(apiMap, currentKey);
      })
      .catch(() => {
        renderPage(currentPage, null);
        revealApp();
      });
  } else {
    revealApp();
  }

  // Handle navigation clicks
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page !== currentPage) {
        navigateTo(page, link.href);
      }
      if (window.innerWidth < 1024) toggleSidebar();
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      currentPage = e.state.page;
      updateActiveNav();
      const key = currentPage.replace(/-/g, '_');
      renderPage(currentPage, pageCache[key] || null);
    }
  });
}

function revealApp() {
  // Remove loading spinner, show app
  const loader = document.getElementById('app-loader');
  const app = document.getElementById('app');
  if (loader) loader.classList.add('loaded');
  if (app) app.classList.add('ready');
  // Remove loader from DOM after animation
  setTimeout(() => { if (loader) loader.remove(); }, 400);
}

function navigateTo(page, href) {
  const container = document.getElementById('page-content');
  const key = page.replace(/-/g, '_');
  
  // Smooth transition: fade out → swap → fade in
  container.style.opacity = '0';
  container.style.transform = 'translateY(6px)';
  
  setTimeout(() => {
    currentPage = page;
    history.pushState({ page }, '', href);
    updateActiveNav();
    
    const data = pageCache[key];
    if (data) {
      renderPage(page, data);
    } else {
      // Rare case: data not prefetched yet
      const apiMap = {
        'home': '/api/dashboard', 'agent': '/api/agent', 'rag': '/api/rag',
        'vector_db': '/api/vector-db', 'knowledge_graph': '/api/knowledge-graph',
        'learning': '/api/learning', 'thesis': '/api/thesis',
        'moot_court': '/api/moot-court', 'career': '/api/career',
      };
      fetch(apiMap[key]).then(r => r.json()).then(d => {
        pageCache[key] = d;
        renderPage(page, d);
      });
    }
    
    // Fade in
    requestAnimationFrame(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });
  }, 150); // Brief fade-out duration
}

function renderPage(page, data) {
  const container = document.getElementById('page-content');
  const key = page.replace(/-/g, '_');
  const renderer = window[`render_${key}`];
  
  if (renderer && data) {
    container.innerHTML = renderer(data);
    // Init charts - handle async Chart.js loading
    const chartInit = window[`initCharts_${key}`];
    if (chartInit) {
      if (window._chartReady) {
        setTimeout(() => chartInit(data), 30);
      } else {
        window._pendingChartInit = () => {
          setTimeout(() => chartInit(data), 30);
        };
      }
    }
  } else if (renderer) {
    container.innerHTML = '<div class="flex items-center justify-center h-64"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
  }
}

function prefetchAll(apiMap, skipKey) {
  Object.entries(apiMap).forEach(([key, url]) => {
    if (key !== skipKey && !pageCache[key]) {
      fetch(url).then(r => r.json()).then(d => { pageCache[key] = d; }).catch(() => {});
    }
  });
}

function updateActiveNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === currentPage);
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('hidden');
}

// Utility functions
function formatNumber(num) {
  if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿';
  if (num >= 10000) return (num / 10000).toFixed(1) + '万';
  if (num >= 1000) return num.toLocaleString();
  return num;
}

function getHeatColor(value) {
  if (value >= 90) return 'bg-emerald-500 text-white';
  if (value >= 80) return 'bg-emerald-400 text-white';
  if (value >= 70) return 'bg-blue-400 text-white';
  if (value >= 60) return 'bg-amber-300 text-amber-900';
  if (value >= 50) return 'bg-orange-300 text-orange-900';
  return 'bg-red-300 text-red-900';
}
