/* ============================================================
   WMS DASHBOARD - Core JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // SIDEBAR TOGGLE
  // ============================================================
  const sidebar = document.getElementById('wmsSidebar');
  const mainContent = document.getElementById('wmsMain');
  const toggleBtn = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');

  function isMobile() { return window.innerWidth <= 768; }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (isMobile()) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('show');
      } else {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebar-collapsed', isCollapsed);
        localStorage.setItem('wms-sidebar-user-set', 'true');
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('show');
    });
  }

  // Restore sidebar state on desktop (only if user explicitly collapsed it)
  if (!isMobile() && sidebar && mainContent) {
    const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (collapsed) {
      sidebar.classList.add('collapsed');
      mainContent.classList.add('sidebar-collapsed');
    } else {
      // Ensure sidebar is always fully expanded by default
      sidebar.classList.remove('collapsed');
      mainContent.classList.remove('sidebar-collapsed');
    }
  }

  // ============================================================
  // DROPDOWN MENUS
  // ============================================================
  document.addEventListener('click', function (e) {
    // Notification dropdown
    const notifBtn = document.getElementById('notifBtn');
    const notifMenu = document.getElementById('notifMenu');
    if (notifBtn && notifMenu) {
      if (notifBtn.contains(e.target)) {
        notifMenu.classList.toggle('show');
        closeOtherDropdowns('notifMenu');
      } else if (!notifMenu.contains(e.target)) {
        notifMenu.classList.remove('show');
      }
    }

    // User profile dropdown
    const userBtn = document.getElementById('userProfileBtn');
    const userMenu = document.getElementById('userProfileMenu');
    if (userBtn && userMenu) {
      if (userBtn.contains(e.target)) {
        userMenu.classList.toggle('show');
        closeOtherDropdowns('userProfileMenu');
      } else if (!userMenu.contains(e.target)) {
        userMenu.classList.remove('show');
      }
    }
  });

  function closeOtherDropdowns(except) {
    document.querySelectorAll('.dropdown-menu-wms.show').forEach(function (menu) {
      if (menu.id !== except) menu.classList.remove('show');
    });
  }

  // ============================================================
  // ACTIVE NAV ITEM HIGHLIGHT
  // ============================================================
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && (currentPath === href || (href !== '/' && currentPath.startsWith(href)))) {
      link.classList.add('active');
    }
  });

  // ============================================================
  // ANIMATED COUNTERS
  // ============================================================
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const isFloat = String(target).includes('.');

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter-value').forEach(function (el) {
    counterObserver.observe(el);
  });

  // ============================================================
  // PROGRESS BAR ANIMATION
  // ============================================================
  const progressObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || bar.style.width;
        bar.style.width = '0%';
        setTimeout(function () { bar.style.width = width; }, 100);
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-bar-wms').forEach(function (bar) {
    const w = bar.style.width;
    bar.dataset.width = w;
    bar.style.width = '0%';
    progressObserver.observe(bar);
  });

  // ============================================================
  // TABS
  // ============================================================
  document.querySelectorAll('.wms-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const tabGroup = tab.closest('[data-tab-group]');
      if (!tabGroup) return;
      const target = tab.dataset.tab;

      tabGroup.querySelectorAll('.wms-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      document.querySelectorAll('[data-tab-content="' + target + '"]').forEach(function (c) {
        c.style.display = 'block';
      });
      document.querySelectorAll('[data-tab-content]').forEach(function (c) {
        if (c.dataset.tabContent !== target) c.style.display = 'none';
      });
    });
  });

  // ============================================================
  // TOOLTIP INIT (Bootstrap)
  // ============================================================
  if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
      new bootstrap.Tooltip(el);
    });
  }

  // ============================================================
  // SETTINGS TABS
  // ============================================================
  var settingsTabs = document.querySelectorAll('.settings-tab');
  settingsTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      settingsTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.dataset.target;
      document.querySelectorAll('.settings-panel').forEach(function(panel) {
        panel.style.display = panel.dataset.panel === target ? 'block' : 'none';
      });
    });
  });

  // ============================================================
  // TOAST NOTIFICATIONS (legacy shim — real impl in wms-interactions.js)
  // ============================================================
  if (!window.showToast) window.showToast = function (message, type) {
    type = type || 'info';
    const colors = {
      success: '#10b981', danger: '#ef4444', warning: '#f59e0b', info: '#3b82f6'
    };
    const icons = {
      success: 'fa-check-circle', danger: 'fa-times-circle',
      warning: 'fa-exclamation-triangle', info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:99999;
      background:white; border-radius:12px; padding:14px 18px;
      box-shadow:0 20px 40px rgba(0,0,0,0.15); border-left:4px solid ${colors[type]};
      display:flex; align-items:center; gap:12px; font-family:Inter,sans-serif;
      font-size:14px; color:#0f172a; min-width:280px; max-width:360px;
      transform:translateX(120%); transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
    `;
    toast.innerHTML = `
      <i class="fas ${icons[type]}" style="color:${colors[type]};font-size:18px;flex-shrink:0"></i>
      <span style="flex:1">${message}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:16px">×</button>
    `;
    document.body.appendChild(toast);
    setTimeout(function () { toast.style.transform = 'translateX(0)'; }, 10);
    setTimeout(function () {
      toast.style.transform = 'translateX(120%)';
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  };

  // ============================================================
  // SEARCH HIGHLIGHT
  // ============================================================
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const val = this.value.trim().toLowerCase();
      document.querySelectorAll('.wms-datatable tbody tr').forEach(function (row) {
        const text = row.textContent.toLowerCase();
        row.style.display = val && !text.includes(val) ? 'none' : '';
      });
    });
  }

  // ============================================================
  // WINDOW RESIZE
  // ============================================================
  window.addEventListener('resize', function () {
    if (isMobile()) {
      // Going to mobile: ensure desktop-collapsed class removed
      if (sidebar) {
        sidebar.classList.remove('collapsed');
        if (mainContent) mainContent.classList.remove('sidebar-collapsed');
      }
    } else {
      // Going back to desktop: close mobile overlay
      if (sidebar) sidebar.classList.remove('mobile-open');
      if (overlay) overlay.classList.remove('show');
      // Restore user preference
      const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
      if (sidebar && mainContent) {
        sidebar.classList.toggle('collapsed', collapsed);
        mainContent.classList.toggle('sidebar-collapsed', collapsed);
      }
    }
  });

})();
