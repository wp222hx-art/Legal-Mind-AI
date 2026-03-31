// Router - SPA-like navigation
let currentPage = 'home';
const pageCache = {};

function initRouter(initialPage) {
  currentPage = initialPage;
  updateActiveNav();
  loadPage(currentPage);

  // Handle navigation clicks
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page !== currentPage) {
        currentPage = page;
        history.pushState({ page }, '', link.href);
        updateActiveNav();
        loadPage(page);
      }
      // Close mobile sidebar
      if (window.innerWidth < 1024) toggleSidebar();
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      currentPage = e.state.page;
      updateActiveNav();
      loadPage(currentPage);
    }
  });
}

function updateActiveNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === currentPage);
  });
}

async function loadPage(page) {
  const container = document.getElementById('page-content');
  container.innerHTML = '<div class="flex items-center justify-center h-64"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
  
  try {
    const renderer = window[`render_${page.replace(/-/g, '_')}`];
    if (renderer) {
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
      const key = page.replace(/-/g, '_');
      const apiUrl = apiMap[key];
      let data = pageCache[key];
      if (!data && apiUrl) {
        const resp = await fetch(apiUrl);
        data = await resp.json();
        pageCache[key] = data;
      }
      container.innerHTML = renderer(data);
      // Init charts after render
      const chartInit = window[`initCharts_${key}`];
      if (chartInit) setTimeout(() => chartInit(data), 50);
    }
  } catch (err) {
    console.error('Page load error:', err);
    container.innerHTML = '<div class="text-center py-20 text-gray-500">页面加载失败</div>';
  }
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
  if (value >= 90) return 'bg-emerald-500/80 text-white';
  if (value >= 80) return 'bg-emerald-600/50 text-emerald-100';
  if (value >= 70) return 'bg-blue-500/50 text-blue-100';
  if (value >= 60) return 'bg-yellow-500/40 text-yellow-100';
  if (value >= 50) return 'bg-orange-500/40 text-orange-100';
  return 'bg-red-500/30 text-red-200';
}
