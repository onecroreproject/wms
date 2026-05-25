/* ============================================================
   WMS PRO — Interactions, Modals, CRUD, Filters, Theme
   ============================================================ */
'use strict';

/* ── TOAST ─────────────────────────────────────────────────── */
window.showToast = function(msg, type, duration) {
  type = type || 'info';
  duration = duration || 4000;
  const colors = {success:'#10b981',danger:'#ef4444',warning:'#f59e0b',info:'#3b82f6',primary:'#4f46e5'};
  const icons  = {success:'fa-check-circle',danger:'fa-times-circle',warning:'fa-exclamation-triangle',info:'fa-info-circle',primary:'fa-bell'};
  let wrap = document.getElementById('wms-toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'wms-toast-wrap';
    wrap.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.style.cssText = `background:var(--bg-card,#fff);border-radius:12px;padding:14px 18px;
    box-shadow:0 20px 40px rgba(0,0,0,0.18);border-left:4px solid ${colors[type]};
    display:flex;align-items:center;gap:12px;font-family:Inter,sans-serif;font-size:14px;
    color:var(--text-primary,#0f172a);min-width:280px;max-width:360px;
    transform:translateX(120%);transition:transform 0.35s cubic-bezier(0.4,0,0.2,1);`;
  t.innerHTML = `<i class="fas ${icons[type]}" style="color:${colors[type]};font-size:18px;flex-shrink:0"></i>
    <span style="flex:1">${msg}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:18px;line-height:1">&times;</button>`;
  wrap.appendChild(t);
  requestAnimationFrame(function(){ t.style.transform='translateX(0)'; });
  setTimeout(function(){ t.style.transform='translateX(120%)'; setTimeout(function(){ t.remove(); },400); }, duration);
};

/* ── LOADING OVERLAY ────────────────────────────────────────── */
window.WMS = window.WMS || {};
WMS.showLoading = function() {
  let el = document.getElementById('wms-page-loader');
  if (!el) {
    el = document.createElement('div'); el.id = 'wms-page-loader';
    el.innerHTML = '<div class="wms-loader-bar"></div>';
    document.body.prepend(el);
  }
  el.classList.add('active');
};
WMS.hideLoading = function() {
  const el = document.getElementById('wms-page-loader');
  if (el) { el.classList.remove('active'); }
};

/* ── CONFIRM MODAL ──────────────────────────────────────────── */
WMS.confirm = function(title, msg, cb) {
  let m = document.getElementById('wmsConfirmModal');
  if (!m) {
    m = document.createElement('div');
    m.id = 'wmsConfirmModal';
    m.innerHTML = `
    <div class="modal fade" id="wmsConfirmModalInner" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header" style="border-bottom:1px solid var(--border-color)">
            <h5 class="modal-title" id="wmsConfirmTitle"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="wmsConfirmMsg" style="padding:24px 28px;color:var(--text-secondary)"></div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost sm" data-bs-dismiss="modal">Cancel</button>
            <button type="button" id="wmsConfirmOk" class="btn-wms danger sm">Confirm</button>
          </div>
        </div>
      </div>
    </div>`;
    document.body.appendChild(m);
  }
  document.getElementById('wmsConfirmTitle').textContent = title;
  document.getElementById('wmsConfirmMsg').textContent = msg;
  const okBtn = document.getElementById('wmsConfirmOk');
  const clone = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(clone, okBtn);
  const bsM = new bootstrap.Modal(document.getElementById('wmsConfirmModalInner'));
  clone.addEventListener('click', function() { bsM.hide(); if (cb) cb(); });
  bsM.show();
};

/* ── FORM VALIDATION ────────────────────────────────────────── */
WMS.validateForm = function(formEl) {
  let valid = true;
  formEl.querySelectorAll('[required]').forEach(function(el) {
    if (!el.value.trim()) {
      el.classList.add('is-invalid');
      valid = false;
    } else {
      el.classList.remove('is-invalid');
    }
  });
  return valid;
};

/* ── RIPPLE EFFECT ON BUTTONS ─────────────────────────────── */
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-wms');
  if (!btn) return;
  const r = document.createElement('span');
  r.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.35);width:0;height:0;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;transition:width 0.5s,height 0.5s,opacity 0.5s;opacity:1;';
  btn.style.position = 'relative'; btn.style.overflow = 'hidden';
  btn.appendChild(r);
  const s = Math.max(btn.offsetWidth, btn.offsetHeight) * 2;
  requestAnimationFrame(function(){ r.style.width=s+'px'; r.style.height=s+'px'; r.style.opacity='0'; });
  setTimeout(function(){ r.remove(); }, 600);
});

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════════════════ */
WMS.initTheme = function() {
  const saved = localStorage.getItem('wms-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const toggles = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
  toggles.forEach(function(btn) {
    btn.innerHTML = saved === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    btn.onclick = function() {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('wms-theme', next);
      btn.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      showToast((next === 'dark' ? 'Dark' : 'Light') + ' mode activated', 'info', 2000);
    };
  });
};

/* ═══════════════════════════════════════════════════════════════
   PRODUCTS PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Products = {
  dt: null,
  init: function() {
    if (!document.getElementById('productsTable')) return;
    this.render();
    this.bindAddBtn();
    this.bindCategoryFilter();
    this.bindSearch();
  },
  render: function() {
    const tbody = document.querySelector('#productsTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const cats = [...new Set(WMS.products.map(p=>p.category))];
    WMS.products.forEach(function(p) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.id}</td>
        <td><strong>${p.name}</strong></td>
        <td><code class="sku-code">${p.sku}</code></td>
        <td>${p.category}</td>
        <td>$${p.price.toLocaleString()}</td>
        <td>${p.stock.toLocaleString()}</td>
        <td>${p.sales.toLocaleString()}</td>
        <td>⭐ ${p.rating}</td>
        <td>${WMS.statusBadge(p.status)}</td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn-wms ghost sm icon-only" title="View" onclick="WMS.Products.view('${p.id}')"><i class="fas fa-eye"></i></button>
            <button class="btn-wms outline sm icon-only" title="Edit" onclick="WMS.Products.edit('${p.id}')"><i class="fas fa-pen"></i></button>
            <button class="btn-wms danger sm icon-only" title="Delete" onclick="WMS.Products.del('${p.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>`;
      tbody.appendChild(tr);
    });
    if (this.dt) { this.dt.destroy(); }
    if (typeof $.fn !== 'undefined' && typeof $.fn.DataTable !== 'undefined') {
      this.dt = $('#productsTable').DataTable({
        responsive:true, pageLength:10,
        dom:'<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center gap-2"Bl><"d-flex"f>>rtip',
        buttons:[
          {extend:'csv',className:'btn-wms ghost sm',text:'<i class="fas fa-download me-1"></i>CSV'},
          {extend:'excel',className:'btn-wms ghost sm',text:'<i class="fas fa-file-excel me-1"></i>Excel'},
          {extend:'print',className:'btn-wms ghost sm',text:'<i class="fas fa-print me-1"></i>Print'},
        ],
        language:{search:'',searchPlaceholder:'Search products...',lengthMenu:'Show _MENU_',
          paginate:{previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}}
      });
    }
  },
  bindAddBtn: function() {
    const btn = document.getElementById('addProductBtn');
    if (btn) btn.addEventListener('click', function() { WMS.Products.openForm(); });
  },
  bindCategoryFilter: function() {
    const sel = document.getElementById('productCategoryFilter');
    if (sel) sel.addEventListener('change', function() {
      const v = this.value;
      if (WMS.Products.dt) {
        WMS.Products.dt.column(3).search(v).draw();
      }
    });
  },
  bindSearch: function() {
    const inp = document.getElementById('productSearch');
    if (inp && WMS.Products.dt) {
      inp.addEventListener('input', function() { WMS.Products.dt.search(this.value).draw(); });
    }
  },
  openForm: function(id) {
    const isEdit = !!id;
    const p = isEdit ? WMS.products.find(x=>x.id===id) : null;
    const html = `
    <div class="modal fade" id="productFormModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-${isEdit?'pen':'plus'} me-2"></i>${isEdit?'Edit':'Add'} Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <form id="productForm" novalidate>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label-wms">Product Name <span class="text-danger">*</span></label>
                  <input type="text" id="pName" class="form-control-wms" required value="${isEdit?p.name:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">SKU <span class="text-danger">*</span></label>
                  <input type="text" id="pSku" class="form-control-wms" required value="${isEdit?p.sku:''}"></div>
                <div class="col-md-4"><label class="form-label-wms">Category <span class="text-danger">*</span></label>
                  <select id="pCategory" class="form-control-wms" required>
                    <option value="">Select...</option>
                    ${['Electronics','Furniture','Apparel','Hardware'].map(c=>`<option value="${c}" ${isEdit&&p.category===c?'selected':''}>${c}</option>`).join('')}
                  </select></div>
                <div class="col-md-4"><label class="form-label-wms">Price ($) <span class="text-danger">*</span></label>
                  <input type="number" id="pPrice" class="form-control-wms" required min="0" value="${isEdit?p.price:''}"></div>
                <div class="col-md-4"><label class="form-label-wms">Stock Qty <span class="text-danger">*</span></label>
                  <input type="number" id="pStock" class="form-control-wms" required min="0" value="${isEdit?p.stock:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">Status</label>
                  <select id="pStatus" class="form-control-wms">
                    ${['Active','Low Stock','Out of Stock'].map(s=>`<option value="${s}" ${isEdit&&p.status===s?'selected':''}>${s}</option>`).join('')}
                  </select></div>
                <div class="col-md-6"><label class="form-label-wms">Product Image (optional)</label>
                  <input type="file" id="pImage" class="form-control-wms" accept="image/*">
                  <div id="pImagePreview" style="margin-top:8px"></div></div>
              </div>
            </form>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn-wms primary" id="saveProductBtn"><i class="fas fa-save me-2"></i>Save Product</button>
          </div>
        </div>
      </div>
    </div>`;
    this._openModal('productFormModal', html);
    document.getElementById('pImage').addEventListener('change', function() {
      const f = this.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = function(e){ document.getElementById('pImagePreview').innerHTML = `<img src="${e.target.result}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid var(--border-color)">`; };
      r.readAsDataURL(f);
    });
    document.getElementById('saveProductBtn').addEventListener('click', function() {
      const form = document.getElementById('productForm');
      if (!WMS.validateForm(form)) { showToast('Please fill all required fields','warning'); return; }
      const data = {
        id: isEdit ? p.id : WMS.nextId('PRD', WMS.products, 'id'),
        name: document.getElementById('pName').value.trim(),
        sku: document.getElementById('pSku').value.trim(),
        category: document.getElementById('pCategory').value,
        price: parseFloat(document.getElementById('pPrice').value)||0,
        stock: parseInt(document.getElementById('pStock').value)||0,
        sales: isEdit ? p.sales : 0,
        rating: isEdit ? p.rating : 4.0,
        status: document.getElementById('pStatus').value,
        image: ''
      };
      if (isEdit) {
        const idx = WMS.products.findIndex(x=>x.id===id);
        WMS.products[idx] = data;
        WMS.logAction('John Doe','Updated Product','Products','Updated '+data.name);
        showToast('Product updated successfully!','success');
      } else {
        WMS.products.push(data);
        WMS.logAction('John Doe','Added Product','Products','Added '+data.name);
        showToast('Product added successfully!','success');
      }
      bootstrap.Modal.getInstance(document.getElementById('productFormModal')).hide();
      WMS.Products.render();
    });
  },
  edit: function(id) { this.openForm(id); },
  view: function(id) {
    const p = WMS.products.find(x=>x.id===id);
    if (!p) return;
    const html = `
    <div class="modal fade" id="productViewModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-box me-2"></i>Product Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <div class="row g-3">
              <div class="col-md-3 text-center">
                <div style="width:90px;height:90px;background:var(--gradient-primary);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:36px;color:white">
                  <i class="fas fa-cube"></i></div>
                <div>${WMS.statusBadge(p.status)}</div>
              </div>
              <div class="col-md-9">
                <h4 style="font-weight:700;margin-bottom:4px">${p.name}</h4>
                <div style="color:var(--text-muted);margin-bottom:16px">${p.id} &nbsp;|&nbsp; ${p.sku}</div>
                <div class="row g-3">
                  ${[['Category',p.category],['Price','$'+p.price],['Stock',p.stock+' units'],['Sales',p.sales+' units'],['Rating','⭐ '+p.rating]].map(([l,v])=>`<div class="col-sm-4"><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;text-transform:uppercase;letter-spacing:.5px">${l}</div><div style="font-weight:600">${v}</div></div>`).join('')}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn-wms primary" onclick="bootstrap.Modal.getInstance(document.getElementById('productViewModal')).hide();WMS.Products.edit('${p.id}')">
              <i class="fas fa-pen me-2"></i>Edit Product</button>
          </div>
        </div>
      </div>
    </div>`;
    this._openModal('productViewModal', html);
  },
  del: function(id) {
    const p = WMS.products.find(x=>x.id===id);
    WMS.confirm('Delete Product', 'Are you sure you want to delete "'+p.name+'"? This action cannot be undone.', function() {
      WMS.products = WMS.products.filter(x=>x.id!==id);
      WMS.logAction('John Doe','Deleted Product','Products','Deleted '+p.name);
      WMS.Products.render();
      showToast('Product "'+p.name+'" deleted.','danger');
    });
  },
  _openModal: function(id, html) {
    const old = document.getElementById(id); if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', html);
    const m = new bootstrap.Modal(document.getElementById(id));
    document.getElementById(id).addEventListener('hidden.bs.modal', function() { this.remove(); });
    m.show();
  }
};

/* ═══════════════════════════════════════════════════════════════
   INVENTORY PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Inventory = {
  dt: null,
  init: function() {
    if (!document.getElementById('inventoryTable')) return;
    this.render();
    const addBtn = document.getElementById('addInventoryBtn');
    if (addBtn) addBtn.addEventListener('click', function() { WMS.Inventory.openForm(); });
  },
  render: function() {
    const tbody = document.querySelector('#inventoryTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    WMS.inventory.forEach(function(inv) {
      const pct = inv.maxQty ? Math.round(inv.qty/inv.maxQty*100) : 0;
      const barCls = pct < 20 ? 'danger' : pct < 40 ? 'warning' : 'primary';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${inv.id}</td>
        <td><strong>${inv.product}</strong></td>
        <td><code class="sku-code">${inv.sku}</code></td>
        <td>${inv.warehouse}</td>
        <td>${inv.location}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="progress-wms" style="width:80px;flex-shrink:0"><div class="progress-bar-wms ${barCls}" style="width:${pct}%"></div></div>
            <span style="font-weight:600">${inv.qty}</span>
          </div>
        </td>
        <td>${inv.minQty} / ${inv.maxQty}</td>
        <td>${inv.lastUpdated}</td>
        <td>${WMS.statusBadge(inv.status)}</td>
        <td>
          <div class="d-flex gap-1 align-items-center">
            <button class="btn-wms ghost sm icon-only" title="Increase" onclick="WMS.Inventory.adjust('${inv.id}',10)"><i class="fas fa-plus"></i></button>
            <button class="btn-wms ghost sm icon-only" title="Decrease" onclick="WMS.Inventory.adjust('${inv.id}',-10)"><i class="fas fa-minus"></i></button>
            <button class="btn-wms outline sm icon-only" title="Edit" onclick="WMS.Inventory.openForm('${inv.id}')"><i class="fas fa-pen"></i></button>
            <button class="btn-wms danger sm icon-only" title="Delete" onclick="WMS.Inventory.del('${inv.id}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>`;
      tbody.appendChild(tr);
    });
    if (this.dt) { this.dt.destroy(); }
    if (typeof $.fn !== 'undefined' && typeof $.fn.DataTable !== 'undefined') {
      this.dt = $('#inventoryTable').DataTable({
        responsive:true,pageLength:10,
        dom:'<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center gap-2"Bl><"d-flex"f>>rtip',
        buttons:[{extend:'csv',className:'btn-wms ghost sm',text:'<i class="fas fa-download me-1"></i>CSV'},{extend:'excel',className:'btn-wms ghost sm',text:'<i class="fas fa-file-excel me-1"></i>Excel'}],
        language:{search:'',searchPlaceholder:'Search inventory...',paginate:{previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}}
      });
    }
  },
  adjust: function(id, delta) {
    const inv = WMS.inventory.find(x=>x.id===id);
    if (!inv) return;
    inv.qty = Math.max(0, inv.qty + delta);
    inv.status = inv.qty === 0 ? 'Out of Stock' : inv.qty < inv.minQty ? 'Low Stock' : 'In Stock';
    inv.lastUpdated = new Date().toISOString().slice(0,10);
    WMS.logAction('John Doe','Updated Inventory','Inventory','Adjusted qty for '+inv.product+' by '+delta);
    this.render();
    showToast('Stock '+(delta>0?'increased':'decreased')+' by '+Math.abs(delta)+' for '+inv.product,'success',2500);
  },
  openForm: function(id) {
    const isEdit = !!id;
    const inv = isEdit ? WMS.inventory.find(x=>x.id===id) : null;
    const products = WMS.products.map(p=>p.name);
    const html = `
    <div class="modal fade" id="inventoryFormModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-${isEdit?'pen':'plus'} me-2"></i>${isEdit?'Edit':'Add'} Inventory</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <form id="inventoryForm" novalidate>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label-wms">Product <span class="text-danger">*</span></label>
                  <select id="invProduct" class="form-control-wms" required>
                    <option value="">Select product...</option>
                    ${products.map(n=>`<option value="${n}" ${isEdit&&inv.product===n?'selected':''}>${n}</option>`).join('')}
                  </select></div>
                <div class="col-md-6"><label class="form-label-wms">Warehouse Zone <span class="text-danger">*</span></label>
                  <select id="invWarehouse" class="form-control-wms" required>
                    ${['Zone A','Zone B','Zone C','Zone D','Zone E','Zone F'].map(z=>`<option value="${z}" ${isEdit&&inv.warehouse===z?'selected':''}>${z}</option>`).join('')}
                  </select></div>
                <div class="col-md-4"><label class="form-label-wms">Location <span class="text-danger">*</span></label>
                  <input type="text" id="invLocation" class="form-control-wms" required placeholder="A-01-01" value="${isEdit?inv.location:''}"></div>
                <div class="col-md-4"><label class="form-label-wms">Quantity <span class="text-danger">*</span></label>
                  <input type="number" id="invQty" class="form-control-wms" required min="0" value="${isEdit?inv.qty:''}"></div>
                <div class="col-md-4"><label class="form-label-wms">Min / Max Qty</label>
                  <div class="d-flex gap-2">
                    <input type="number" id="invMin" class="form-control-wms" placeholder="Min" value="${isEdit?inv.minQty:50}">
                    <input type="number" id="invMax" class="form-control-wms" placeholder="Max" value="${isEdit?inv.maxQty:500}">
                  </div></div>
              </div>
            </form>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn-wms primary" id="saveInvBtn"><i class="fas fa-save me-2"></i>Save</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('inventoryFormModal', html);
    document.getElementById('saveInvBtn').addEventListener('click', function() {
      const form = document.getElementById('inventoryForm');
      if (!WMS.validateForm(form)) { showToast('Fill required fields','warning'); return; }
      const qty = parseInt(document.getElementById('invQty').value)||0;
      const minQ = parseInt(document.getElementById('invMin').value)||0;
      const data = {
        id: isEdit ? inv.id : WMS.nextId('INV', WMS.inventory, 'id'),
        product: document.getElementById('invProduct').value,
        sku: (WMS.products.find(p=>p.name===document.getElementById('invProduct').value)||{sku:''}).sku,
        warehouse: document.getElementById('invWarehouse').value,
        location: document.getElementById('invLocation').value.trim(),
        qty: qty, minQty: minQ,
        maxQty: parseInt(document.getElementById('invMax').value)||500,
        lastUpdated: new Date().toISOString().slice(0,10),
        status: qty===0?'Out of Stock':qty<minQ?'Low Stock':'In Stock'
      };
      if (isEdit) { const i = WMS.inventory.findIndex(x=>x.id===id); WMS.inventory[i]=data; }
      else { WMS.inventory.push(data); }
      WMS.logAction('John Doe',isEdit?'Updated Inventory':'Added Inventory','Inventory',data.product);
      bootstrap.Modal.getInstance(document.getElementById('inventoryFormModal')).hide();
      WMS.Inventory.render();
      showToast('Inventory '+(isEdit?'updated':'added')+' successfully!','success');
    });
  },
  del: function(id) {
    const inv = WMS.inventory.find(x=>x.id===id);
    WMS.confirm('Remove Inventory','Remove inventory record for "'+inv.product+'"?', function() {
      WMS.inventory = WMS.inventory.filter(x=>x.id!==id);
      WMS.Inventory.render();
      showToast('Inventory record removed.','danger');
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   ORDERS PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Orders = {
  dt: null,
  init: function() {
    if (!document.getElementById('ordersTable')) return;
    this.render();
    const addBtn = document.getElementById('addOrderBtn');
    if (addBtn) addBtn.addEventListener('click', function() { WMS.Orders.openForm(); });
    const statusFilter = document.getElementById('orderStatusFilter');
    if (statusFilter) statusFilter.addEventListener('change', function() {
      if (WMS.Orders.dt) WMS.Orders.dt.column(4).search(this.value).draw();
    });
  },
  render: function() {
    const tbody = document.querySelector('#ordersTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    WMS.orders.forEach(function(o) {
      const priorityCls = o.priority==='High'?'danger':o.priority==='Low'?'info':'warning';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${o.id}</strong></td>
        <td>${o.customer}</td>
        <td>${o.product}</td>
        <td>${o.qty}</td>
        <td>$${o.amount.toLocaleString()}</td>
        <td>${o.date}</td>
        <td>${WMS.statusBadge(o.status)}</td>
        <td><span class="badge-wms ${priorityCls}">${o.priority}</span></td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn-wms ghost sm icon-only" title="View" onclick="WMS.Orders.view('${o.id}')"><i class="fas fa-eye"></i></button>
            <button class="btn-wms outline sm icon-only" title="Edit" onclick="WMS.Orders.edit('${o.id}')"><i class="fas fa-pen"></i></button>
            <button class="btn-wms danger sm icon-only" title="Cancel" onclick="WMS.Orders.cancel('${o.id}')"><i class="fas fa-ban"></i></button>
          </div>
        </td>`;
      tbody.appendChild(tr);
    });
    if (this.dt) { this.dt.destroy(); }
    if (typeof $.fn !== 'undefined' && typeof $.fn.DataTable !== 'undefined') {
      this.dt = $('#ordersTable').DataTable({
        responsive:true,pageLength:10,
        dom:'<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center gap-2"Bl><"d-flex"f>>rtip',
        buttons:[{extend:'csv',className:'btn-wms ghost sm',text:'<i class="fas fa-download me-1"></i>CSV'},{extend:'excel',className:'btn-wms ghost sm',text:'Excel'},{extend:'print',className:'btn-wms ghost sm',text:'Print'}],
        language:{search:'',searchPlaceholder:'Search orders...',paginate:{previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}}
      });
    }
  },
  view: function(id) {
    const o = WMS.orders.find(x=>x.id===id); if (!o) return;
    const steps = ['Order Placed','Processing','Shipped','Out for Delivery','Delivered'];
    const curStep = {Pending:0,Processing:1,Shipped:2,'Out for Delivery':3,Delivered:4,Cancelled:0}[o.status]||0;
    const html = `
    <div class="modal fade" id="orderViewModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-shopping-cart me-2"></i>Order Details — ${o.id}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <div class="row g-3 mb-4">
              ${[['Customer',o.customer],['Email',o.email],['Product',o.product],['Quantity',o.qty],['Amount','$'+o.amount.toLocaleString()],['Date',o.date],['Zone',o.zone],['Priority',o.priority]].map(([l,v])=>`
              <div class="col-sm-3"><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">${l}</div><div style="font-weight:600">${v}</div></div>`).join('')}
            </div>
            ${o.status!=='Cancelled'?`
            <div style="background:var(--bg-body);border-radius:12px;padding:20px">
              <div style="font-weight:600;margin-bottom:16px;font-size:13px;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted)">Order Timeline</div>
              <div style="display:flex;justify-content:space-between;position:relative">
                <div style="position:absolute;top:14px;left:0;right:0;height:2px;background:var(--border-color)"></div>
                <div style="position:absolute;top:14px;left:0;height:2px;background:var(--gradient-primary);width:${Math.min(curStep/(steps.length-1)*100,100)}%;transition:width 1s"></div>
                ${steps.map((s,i)=>`
                <div style="display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;z-index:1">
                  <div style="width:28px;height:28px;border-radius:50%;background:${i<=curStep?'var(--gradient-primary)':'var(--border-color)'};display:flex;align-items:center;justify-content:center;color:${i<=curStep?'#fff':'var(--text-muted)'};font-size:12px;transition:all .4s">
                    <i class="fas ${i<curStep?'fa-check':'fa-circle'}" style="font-size:10px"></i></div>
                  <span style="font-size:10px;color:${i<=curStep?'var(--primary)':'var(--text-muted)'};font-weight:${i<=curStep?600:400};text-align:center;max-width:60px">${s}</span>
                </div>`).join('')}
              </div>
            </div>`:'<div class="text-center py-3"><span class="badge-wms danger" style="font-size:14px;padding:8px 16px"><i class="fas fa-ban me-2"></i>Order Cancelled</span></div>'}
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn-wms primary" onclick="WMS.Orders.updateStatus('${o.id}')"><i class="fas fa-refresh me-2"></i>Update Status</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('orderViewModal', html);
  },
  updateStatus: function(id) {
    const o = WMS.orders.find(x=>x.id===id); if (!o) return;
    const flow = {Pending:'Processing',Processing:'Shipped',Shipped:'Delivered',Delivered:'Delivered'};
    const next = flow[o.status] || o.status;
    if (next === o.status) { showToast('Order is already '+o.status,'info'); return; }
    const old = document.getElementById('orderViewModal');
    if (old) { bootstrap.Modal.getInstance(old)?.hide(); }
    o.status = next;
    WMS.logAction('John Doe','Updated Order','Orders','Status changed to '+next+' for '+id);
    WMS.Orders.render();
    showToast('Order '+id+' → '+next,'success');
  },
  edit: function(id) {
    const o = WMS.orders.find(x=>x.id===id); if (!o) return;
    const html = `
    <div class="modal fade" id="orderEditModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-pen me-2"></i>Edit Order — ${o.id}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <div class="row g-3">
              <div class="col-12"><label class="form-label-wms">Status</label>
                <select id="oStatus" class="form-control-wms">
                  ${['Pending','Processing','Shipped','Delivered','Cancelled'].map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${s}</option>`).join('')}
                </select></div>
              <div class="col-12"><label class="form-label-wms">Priority</label>
                <select id="oPriority" class="form-control-wms">
                  ${['High','Normal','Low'].map(s=>`<option value="${s}" ${o.priority===s?'selected':''}>${s}</option>`).join('')}
                </select></div>
            </div>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn-wms primary" id="saveOrderBtn"><i class="fas fa-save me-2"></i>Update</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('orderEditModal', html);
    document.getElementById('saveOrderBtn').addEventListener('click', function() {
      o.status = document.getElementById('oStatus').value;
      o.priority = document.getElementById('oPriority').value;
      bootstrap.Modal.getInstance(document.getElementById('orderEditModal')).hide();
      WMS.Orders.render();
      showToast('Order updated!','success');
    });
  },
  cancel: function(id) {
    const o = WMS.orders.find(x=>x.id===id); if (!o) return;
    WMS.confirm('Cancel Order','Cancel order '+id+' for '+o.customer+'?', function() {
      o.status='Cancelled';
      WMS.Orders.render();
      showToast('Order '+id+' cancelled.','warning');
    });
  },
  openForm: function() {
    const html = `
    <div class="modal fade" id="orderAddModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-plus me-2"></i>New Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <form id="orderForm" novalidate>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label-wms">Customer Name <span class="text-danger">*</span></label>
                  <input type="text" id="oCust" class="form-control-wms" required></div>
                <div class="col-md-6"><label class="form-label-wms">Email</label>
                  <input type="email" id="oEmail" class="form-control-wms" placeholder="customer@email.com"></div>
                <div class="col-md-6"><label class="form-label-wms">Product <span class="text-danger">*</span></label>
                  <select id="oProduct" class="form-control-wms" required>
                    <option value="">Select product...</option>
                    ${WMS.products.map(p=>`<option value="${p.name}">${p.name}</option>`).join('')}
                  </select></div>
                <div class="col-md-3"><label class="form-label-wms">Qty <span class="text-danger">*</span></label>
                  <input type="number" id="oQty" class="form-control-wms" required min="1" value="1"></div>
                <div class="col-md-3"><label class="form-label-wms">Priority</label>
                  <select id="oPri" class="form-control-wms">
                    <option>Normal</option><option>High</option><option>Low</option>
                  </select></div>
              </div>
            </form>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn-wms primary" id="saveNewOrderBtn"><i class="fas fa-save me-2"></i>Place Order</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('orderAddModal', html);
    document.getElementById('saveNewOrderBtn').addEventListener('click', function() {
      if (!WMS.validateForm(document.getElementById('orderForm'))) { showToast('Fill required fields','warning'); return; }
      const prod = WMS.products.find(p=>p.name===document.getElementById('oProduct').value);
      const qty = parseInt(document.getElementById('oQty').value)||1;
      const order = {
        id: WMS.nextId('ORD',WMS.orders,'id'),
        customer: document.getElementById('oCust').value.trim(),
        email: document.getElementById('oEmail').value.trim(),
        product: document.getElementById('oProduct').value,
        qty: qty,
        amount: prod ? prod.price*qty : 0,
        date: new Date().toISOString().slice(0,10),
        status:'Pending',
        priority: document.getElementById('oPri').value,
        zone: prod ? 'Zone A' : 'Zone A'
      };
      WMS.orders.unshift(order);
      WMS.logAction('John Doe','Added Order','Orders','New order '+order.id);
      bootstrap.Modal.getInstance(document.getElementById('orderAddModal')).hide();
      WMS.Orders.render();
      showToast('Order '+order.id+' placed!','success');
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   STAFF PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Staff = {
  dt: null,
  init: function() {
    if (!document.getElementById('staffTable')) return;
    this.renderCards();
    this.renderTable();
    const btn = document.getElementById('addStaffBtn');
    if (btn) btn.addEventListener('click', function() { WMS.Staff.openForm(); });
  },
  renderCards: function() {
    const grid = document.getElementById('staffCardsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    WMS.staff.forEach(function(s) {
      const div = document.createElement('div');
      div.className = 'col-xl-4 col-md-6 animate-in';
      div.innerHTML = `<div class="wms-card"><div class="card-body-wms">
        <div class="d-flex align-items-start gap-3">
          <div class="avatar lg" style="background:linear-gradient(${s.gradient})">${s.initials}</div>
          <div style="flex:1"><div style="font-size:15px;font-weight:700;color:var(--text-primary)">${s.name}</div>
            <div style="font-size:12.5px;color:var(--text-secondary);margin-bottom:4px">${s.role}</div>
            <span class="tag-chip">${s.dept}</span></div>
          ${WMS.statusBadge(s.status)}
        </div>
        <div class="d-flex flex-column gap-2 mt-3" style="font-size:12.5px;color:var(--text-secondary)">
          <div><i class="fas fa-envelope me-2" style="color:#4f46e5;width:14px"></i>${s.email}</div>
          <div><i class="fas fa-phone me-2" style="color:#10b981;width:14px"></i>${s.phone}</div>
        </div>
        <div class="d-flex gap-2 mt-3">
          <button class="btn-wms ghost sm flex-fill" onclick="WMS.Staff.view('${s.id}')"><i class="fas fa-eye me-1"></i>View</button>
          <button class="btn-wms outline sm flex-fill" onclick="WMS.Staff.openForm('${s.id}')"><i class="fas fa-pen me-1"></i>Edit</button>
        </div>
      </div></div>`;
      grid.appendChild(div);
    });
  },
  renderTable: function() {
    const tbody = document.querySelector('#staffTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    WMS.staff.forEach(function(s) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.id}</td>
        <td><div class="d-flex align-items-center gap-2"><div class="avatar sm" style="background:linear-gradient(${s.gradient})">${s.initials}</div><strong>${s.name}</strong></div></td>
        <td>${s.role}</td><td>${s.dept}</td><td>${s.email}</td><td>${s.phone}</td><td>${s.joined}</td>
        <td>${WMS.statusBadge(s.status)}</td>
        <td><div class="d-flex gap-1">
          <button class="btn-wms ghost sm icon-only" onclick="WMS.Staff.view('${s.id}')"><i class="fas fa-eye"></i></button>
          <button class="btn-wms outline sm icon-only" onclick="WMS.Staff.openForm('${s.id}')"><i class="fas fa-pen"></i></button>
          <button class="btn-wms danger sm icon-only" onclick="WMS.Staff.del('${s.id}')"><i class="fas fa-trash"></i></button>
        </div></td>`;
      tbody.appendChild(tr);
    });
    if (this.dt) { this.dt.destroy(); }
    if (typeof $.fn !== 'undefined' && typeof $.fn.DataTable !== 'undefined') {
      this.dt = $('#staffTable').DataTable({responsive:true,pageLength:10,
        dom:'<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center gap-2"Bl><"d-flex"f>>rtip',
        buttons:[{extend:'csv',className:'btn-wms ghost sm',text:'<i class="fas fa-download me-1"></i>CSV'}],
        language:{search:'',searchPlaceholder:'Search staff...',paginate:{previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}}});
    }
  },
  view: function(id) {
    const s = WMS.staff.find(x=>x.id===id); if (!s) return;
    const html = `<div class="modal fade" id="staffViewModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-user me-2"></i>Staff Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px;text-align:center">
            <div class="avatar xl" style="background:linear-gradient(${s.gradient});margin:0 auto 16px;width:72px;height:72px;font-size:22px">${s.initials}</div>
            <h4 style="font-weight:700">${s.name}</h4>
            <div style="color:var(--text-muted);margin-bottom:12px">${s.role} &middot; ${s.dept}</div>
            ${WMS.statusBadge(s.status)}
            <hr style="margin:20px 0;border-color:var(--border-color)">
            <div class="row g-3 text-start">
              ${[['ID',s.id],['Email',s.email],['Phone',s.phone],['Joined',s.joined]].map(([l,v])=>`
              <div class="col-6"><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;text-transform:uppercase">${l}</div><div style="font-weight:600;font-size:13px">${v}</div></div>`).join('')}
            </div>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn-wms primary" onclick="bootstrap.Modal.getInstance(document.getElementById('staffViewModal')).hide();WMS.Staff.openForm('${s.id}')"><i class="fas fa-pen me-2"></i>Edit</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('staffViewModal', html);
  },
  openForm: function(id) {
    const isEdit = !!id;
    const s = isEdit ? WMS.staff.find(x=>x.id===id) : null;
    const html = `<div class="modal fade" id="staffFormModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-${isEdit?'pen':'user-plus'} me-2"></i>${isEdit?'Edit':'Add'} Staff</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <form id="staffForm" novalidate>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label-wms">Full Name <span class="text-danger">*</span></label>
                  <input type="text" id="sName" class="form-control-wms" required value="${isEdit?s.name:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">Role <span class="text-danger">*</span></label>
                  <input type="text" id="sRole" class="form-control-wms" required value="${isEdit?s.role:''}"></div>
                <div class="col-md-4"><label class="form-label-wms">Department <span class="text-danger">*</span></label>
                  <select id="sDept" class="form-control-wms" required>
                    ${['Operations','Inventory','Logistics','Human Resources','Security','Finance'].map(d=>`<option value="${d}" ${isEdit&&s.dept===d?'selected':''}>${d}</option>`).join('')}
                  </select></div>
                <div class="col-md-4"><label class="form-label-wms">Email <span class="text-danger">*</span></label>
                  <input type="email" id="sEmail" class="form-control-wms" required value="${isEdit?s.email:''}"></div>
                <div class="col-md-4"><label class="form-label-wms">Phone</label>
                  <input type="text" id="sPhone" class="form-control-wms" value="${isEdit?s.phone:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">Status</label>
                  <select id="sStatus" class="form-control-wms">
                    ${['Active','On Leave','Inactive'].map(st=>`<option value="${st}" ${isEdit&&s.status===st?'selected':''}>${st}</option>`).join('')}
                  </select></div>
                <div class="col-md-6"><label class="form-label-wms">Profile Photo</label>
                  <input type="file" id="sPhoto" class="form-control-wms" accept="image/*"></div>
              </div>
            </form>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn-wms primary" id="saveStaffBtn"><i class="fas fa-save me-2"></i>Save</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('staffFormModal', html);
    document.getElementById('saveStaffBtn').addEventListener('click', function() {
      if (!WMS.validateForm(document.getElementById('staffForm'))) { showToast('Fill required fields','warning'); return; }
      const nm = document.getElementById('sName').value.trim();
      const inits = nm.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
      const data = {
        id: isEdit ? s.id : WMS.nextId('EMP',WMS.staff,'id'),
        name: nm, role: document.getElementById('sRole').value.trim(),
        dept: document.getElementById('sDept').value,
        email: document.getElementById('sEmail').value.trim(),
        phone: document.getElementById('sPhone').value.trim(),
        joined: isEdit ? s.joined : new Date().toISOString().slice(0,10),
        status: document.getElementById('sStatus').value,
        initials: inits,
        gradient: isEdit ? s.gradient : '135deg,#4f46e5,#7c3aed'
      };
      if (isEdit) { const i=WMS.staff.findIndex(x=>x.id===id); WMS.staff[i]=data; }
      else { WMS.staff.push(data); }
      WMS.logAction('John Doe',isEdit?'Updated Staff':'Added Staff','Staff',data.name);
      bootstrap.Modal.getInstance(document.getElementById('staffFormModal')).hide();
      WMS.Staff.renderCards(); WMS.Staff.renderTable();
      showToast('Staff '+(isEdit?'updated':'added')+'!','success');
    });
  },
  del: function(id) {
    const s = WMS.staff.find(x=>x.id===id);
    WMS.confirm('Remove Staff','Remove '+s.name+' from the system?', function() {
      WMS.staff = WMS.staff.filter(x=>x.id!==id);
      WMS.Staff.renderCards(); WMS.Staff.renderTable();
      showToast(s.name+' removed.','danger');
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   CUSTOMERS PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Customers = {
  dt: null,
  init: function() {
    if (!document.getElementById('customersTable')) return;
    this.render();
    const btn = document.getElementById('addCustomerBtn');
    if (btn) btn.addEventListener('click', function() { WMS.Customers.openForm(); });
  },
  render: function() {
    const tbody = document.querySelector('#customersTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    WMS.customers.forEach(function(c) {
      const initials = c.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.id}</td>
        <td><div class="d-flex align-items-center gap-2">
          <div class="avatar sm" style="background:var(--gradient-primary)">${initials}</div>
          <strong>${c.name}</strong></div></td>
        <td>${c.email}</td><td>${c.phone}</td><td>${c.company}</td><td>${c.city}</td>
        <td>${c.orders}</td><td>$${c.spent.toLocaleString()}</td>
        <td>${WMS.statusBadge(c.status)}</td>
        <td><div class="d-flex gap-1">
          <button class="btn-wms ghost sm icon-only" onclick="WMS.Customers.view('${c.id}')"><i class="fas fa-eye"></i></button>
          <button class="btn-wms outline sm icon-only" onclick="WMS.Customers.openForm('${c.id}')"><i class="fas fa-pen"></i></button>
          <button class="btn-wms danger sm icon-only" onclick="WMS.Customers.del('${c.id}')"><i class="fas fa-trash"></i></button>
        </div></td>`;
      tbody.appendChild(tr);
    });
    if (this.dt) { this.dt.destroy(); }
    if (typeof $.fn !== 'undefined' && typeof $.fn.DataTable !== 'undefined') {
      this.dt = $('#customersTable').DataTable({responsive:true,pageLength:10,
        dom:'<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center gap-2"Bl><"d-flex"f>>rtip',
        buttons:[{extend:'csv',className:'btn-wms ghost sm',text:'CSV'},{extend:'excel',className:'btn-wms ghost sm',text:'Excel'}],
        language:{search:'',searchPlaceholder:'Search customers...',paginate:{previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}}});
    }
  },
  view: function(id) {
    const c = WMS.customers.find(x=>x.id===id); if(!c) return;
    const init = c.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    const html = `<div class="modal fade" id="custViewModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-user-group me-2"></i>Customer Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px;text-align:center">
            <div class="avatar xl" style="background:var(--gradient-primary);margin:0 auto 12px;width:72px;height:72px;font-size:22px">${init}</div>
            <h4 style="font-weight:700">${c.name}</h4>
            <div style="color:var(--text-muted);margin-bottom:8px">${c.company}</div>
            ${WMS.statusBadge(c.status)}
            <div class="row g-3 mt-3 text-start">
              <div class="col-6"><div style="background:var(--bg-body);border-radius:8px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--primary)">${c.orders}</div><div style="font-size:12px;color:var(--text-muted)">Total Orders</div></div></div>
              <div class="col-6"><div style="background:var(--bg-body);border-radius:8px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:#10b981">$${c.spent.toLocaleString()}</div><div style="font-size:12px;color:var(--text-muted)">Total Spent</div></div></div>
              ${[['Email',c.email],['Phone',c.phone],['City',c.city],['Joined',c.joined]].map(([l,v])=>`
              <div class="col-6"><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;text-transform:uppercase">${l}</div><div style="font-weight:600;font-size:13px">${v}</div></div>`).join('')}
            </div>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('custViewModal', html);
  },
  openForm: function(id) {
    const isEdit = !!id;
    const c = isEdit ? WMS.customers.find(x=>x.id===id) : null;
    const html = `<div class="modal fade" id="custFormModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-${isEdit?'pen':'user-plus'} me-2"></i>${isEdit?'Edit':'Add'} Customer</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <form id="custForm" novalidate>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label-wms">Full Name <span class="text-danger">*</span></label>
                  <input type="text" id="cName" class="form-control-wms" required value="${isEdit?c.name:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">Email <span class="text-danger">*</span></label>
                  <input type="email" id="cEmail" class="form-control-wms" required value="${isEdit?c.email:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">Phone</label>
                  <input type="text" id="cPhone" class="form-control-wms" value="${isEdit?c.phone:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">Company</label>
                  <input type="text" id="cCompany" class="form-control-wms" value="${isEdit?c.company:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">City</label>
                  <input type="text" id="cCity" class="form-control-wms" value="${isEdit?c.city:''}"></div>
                <div class="col-md-6"><label class="form-label-wms">Status</label>
                  <select id="cStatus" class="form-control-wms">
                    ${['Active','Inactive'].map(s=>`<option value="${s}" ${isEdit&&c.status===s?'selected':''}>${s}</option>`).join('')}
                  </select></div>
              </div>
            </form>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn-wms primary" id="saveCustBtn"><i class="fas fa-save me-2"></i>Save</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('custFormModal', html);
    document.getElementById('saveCustBtn').addEventListener('click', function() {
      if (!WMS.validateForm(document.getElementById('custForm'))) { showToast('Fill required fields','warning'); return; }
      const data = {
        id: isEdit ? c.id : WMS.nextId('CUS',WMS.customers,'id'),
        name: document.getElementById('cName').value.trim(),
        email: document.getElementById('cEmail').value.trim(),
        phone: document.getElementById('cPhone').value.trim(),
        company: document.getElementById('cCompany').value.trim(),
        city: document.getElementById('cCity').value.trim(),
        orders: isEdit ? c.orders : 0,
        spent: isEdit ? c.spent : 0,
        status: document.getElementById('cStatus').value,
        joined: isEdit ? c.joined : new Date().toISOString().slice(0,10)
      };
      if (isEdit) { const i=WMS.customers.findIndex(x=>x.id===id); WMS.customers[i]=data; }
      else { WMS.customers.push(data); }
      bootstrap.Modal.getInstance(document.getElementById('custFormModal')).hide();
      WMS.Customers.render();
      showToast('Customer '+(isEdit?'updated':'added')+'!','success');
    });
  },
  del: function(id) {
    const c = WMS.customers.find(x=>x.id===id);
    WMS.confirm('Remove Customer','Remove '+c.name+' from the system?', function() {
      WMS.customers = WMS.customers.filter(x=>x.id!==id);
      WMS.Customers.render();
      showToast(c.name+' removed.','danger');
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   SETTINGS PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Settings = {
  init: function() {
    if (!document.getElementById('settingsPage')) return;
    this.initToggles();
    this.initSaveBtn();
    this.initThemeSelect();
  },
  initToggles: function() {
    document.querySelectorAll('.wms-toggle input[type="checkbox"]').forEach(function(cb) {
      cb.addEventListener('change', function() {
        const label = this.closest('.wms-toggle-row')?.querySelector('.wms-toggle-label');
        showToast((label ? label.textContent : 'Setting') + ' ' + (this.checked ? 'enabled' : 'disabled'), this.checked ? 'success' : 'info', 2000);
      });
    });
  },
  initSaveBtn: function() {
    document.querySelectorAll('.settings-save-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        WMS.showLoading();
        setTimeout(function() { WMS.hideLoading(); showToast('Settings saved successfully!','success'); }, 800);
      });
    });
  },
  initThemeSelect: function() {
    const sel = document.getElementById('themeSelect');
    if (sel) {
      sel.value = localStorage.getItem('wms-theme') || 'light';
      sel.addEventListener('change', function() {
        document.documentElement.setAttribute('data-theme', this.value);
        localStorage.setItem('wms-theme', this.value);
        showToast('Theme changed to '+this.value,'success',2000);
      });
    }
  }
};

/* ═══════════════════════════════════════════════════════════════
   PROFILE PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Profile = {
  init: function() {
    if (!document.getElementById('profilePage')) return;
    this.initImageUpload();
    this.initEditBtn();
    this.initPasswordToggle();
    this.initSaveBtn();
  },
  initImageUpload: function() {
    const inp = document.getElementById('profileImageInput');
    const preview = document.getElementById('profileImagePreview');
    if (inp && preview) {
      inp.addEventListener('change', function() {
        const f = this.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = function(e) { preview.src = e.target.result; showToast('Profile photo updated!','success',2500); };
        r.readAsDataURL(f);
      });
    }
    const uploadBtn = document.getElementById('uploadAvatarBtn');
    if (uploadBtn && inp) { uploadBtn.addEventListener('click', function() { inp.click(); }); }
  },
  initEditBtn: function() {
    const btn = document.getElementById('editProfileBtn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      document.querySelectorAll('.profile-field-input').forEach(function(inp) { inp.disabled = !inp.disabled; });
      btn.innerHTML = btn.innerHTML.includes('Edit') ? '<i class="fas fa-times me-2"></i>Cancel' : '<i class="fas fa-pen me-2"></i>Edit Profile';
    });
  },
  initPasswordToggle: function() {
    document.querySelectorAll('.toggle-password').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const inp = this.previousElementSibling;
        if (!inp) return;
        const isText = inp.type === 'text';
        inp.type = isText ? 'password' : 'text';
        this.querySelector('i').className = 'fas ' + (isText ? 'fa-eye' : 'fa-eye-slash');
      });
    });
  },
  initSaveBtn: function() {
    const btn = document.getElementById('saveProfileBtn');
    if (btn) btn.addEventListener('click', function() {
      WMS.showLoading();
      setTimeout(function() { WMS.hideLoading(); showToast('Profile updated successfully!','success'); }, 700);
    });
    const pwdBtn = document.getElementById('changePasswordBtn');
    if (pwdBtn) pwdBtn.addEventListener('click', function() {
      const np = document.getElementById('newPassword')?.value;
      const cp = document.getElementById('confirmPassword')?.value;
      if (!np || np.length < 6) { showToast('Password must be at least 6 characters','warning'); return; }
      if (np !== cp) { showToast('Passwords do not match','danger'); return; }
      showToast('Password changed successfully!','success');
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATIONS PAGE
   ═══════════════════════════════════════════════════════════ */
WMS.Notifications = {
  init: function() {
    if (!document.getElementById('notificationsPage')) return;
    this.render();
    const markAllBtn = document.getElementById('markAllReadBtn');
    if (markAllBtn) markAllBtn.addEventListener('click', function() {
      WMS.notifications.forEach(function(n) { n.read = true; });
      WMS.Notifications.render();
      showToast('All notifications marked as read','success');
    });
    const clearBtn = document.getElementById('clearAllNotifBtn');
    if (clearBtn) clearBtn.addEventListener('click', function() {
      WMS.confirm('Clear All','Clear all notifications?', function() {
        WMS.notifications = [];
        WMS.Notifications.render();
        showToast('All notifications cleared','info');
      });
    });
  },
  render: function() {
    const unreadList = document.getElementById('unreadNotifList');
    const readList = document.getElementById('readNotifList');
    if (!unreadList || !readList) return;
    const unread = WMS.notifications.filter(n=>!n.read);
    const read = WMS.notifications.filter(n=>n.read);
    const countEl = document.getElementById('unreadNotifCount');
    if (countEl) countEl.textContent = unread.length;
    unreadList.innerHTML = unread.length ? unread.map(n=>WMS.Notifications._itemHtml(n)).join('') :
      '<div class="text-center py-4" style="color:var(--text-muted)"><i class="fas fa-check-circle fa-2x mb-2"></i><div>No unread notifications</div></div>';
    readList.innerHTML = read.length ? read.map(n=>WMS.Notifications._itemHtml(n)).join('') :
      '<div class="text-center py-4" style="color:var(--text-muted)">No read notifications</div>';
  },
  _itemHtml: function(n) {
    const colors = {warning:'#f59e0b',danger:'#ef4444',success:'#10b981',info:'#3b82f6'};
    return `<div class="notif-item ${n.read?'':'notif-unread'}" style="display:flex;gap:14px;padding:14px 16px;border-radius:10px;margin-bottom:8px;background:${n.read?'var(--bg-body)':'var(--bg-card)'};border:1px solid ${n.read?'transparent':'var(--border-color)'};cursor:pointer;transition:var(--transition)" onclick="WMS.Notifications.markRead(${n.id})">
      <div style="width:36px;height:36px;border-radius:50%;background:${colors[n.type]}20;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas ${n.icon}" style="color:${colors[n.type]};font-size:14px"></i></div>
      <div style="flex:1"><div style="font-weight:${n.read?500:700};font-size:13.5px;margin-bottom:2px">${n.title}</div>
        <div style="font-size:12.5px;color:var(--text-secondary)">${n.msg}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px"><i class="fas fa-clock me-1"></i>${n.time}</div></div>
      ${!n.read?'<span style="width:8px;height:8px;border-radius:50%;background:var(--primary);margin-top:6px;flex-shrink:0"></span>':''}
    </div>`;
  },
  markRead: function(id) {
    const n = WMS.notifications.find(x=>x.id===id);
    if (n && !n.read) { n.read = true; this.render(); }
  }
};

/* ═══════════════════════════════════════════════════════════════
   SHIPMENTS PAGES
   ═══════════════════════════════════════════════════════════ */
WMS.Shipments = {
  initIncoming: function() {
    if (!document.getElementById('incomingTable')) return;
    this.renderIncoming();
    const btn = document.getElementById('addIncomingBtn');
    if (btn) btn.addEventListener('click', function() { WMS.Shipments.addShipmentForm('incoming'); });
  },
  initOutgoing: function() {
    if (!document.getElementById('outgoingTable')) return;
    this.renderOutgoing();
    const btn = document.getElementById('addOutgoingBtn');
    if (btn) btn.addEventListener('click', function() { WMS.Shipments.addShipmentForm('outgoing'); });
  },
  renderIncoming: function() {
    const tbody = document.querySelector('#incomingTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    WMS.incoming.forEach(function(s) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.id}</td><td><strong>${s.supplier}</strong></td><td>${s.product}</td>
        <td>${s.qty}</td><td>${s.expected}</td>
        <td><code class="sku-code">${s.tracking}</code></td>
        <td>${WMS.statusBadge(s.status)}</td>
        <td><div class="d-flex gap-1">
          <button class="btn-wms ghost sm icon-only" onclick="WMS.Shipments.updateShipStatus('incoming','${s.id}')"><i class="fas fa-refresh"></i></button>
          <button class="btn-wms danger sm icon-only" onclick="WMS.Shipments.delShipment('incoming','${s.id}')"><i class="fas fa-trash"></i></button>
        </div></td>`;
      tbody.appendChild(tr);
    });
    if (typeof $.fn!=='undefined' && $.fn.DataTable) {
      if ($.fn.DataTable.isDataTable('#incomingTable')) { $('#incomingTable').DataTable().destroy(); }
      $('#incomingTable').DataTable({responsive:true,pageLength:10,
        dom:'<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center gap-2"Bl><"d-flex"f>>rtip',
        buttons:[{extend:'csv',className:'btn-wms ghost sm',text:'CSV'}],
        language:{search:'',searchPlaceholder:'Search...',paginate:{previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}}});
    }
  },
  renderOutgoing: function() {
    const tbody = document.querySelector('#outgoingTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    WMS.outgoing.forEach(function(s) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.id}</td><td><strong>${s.customer}</strong></td><td>${s.product}</td>
        <td>${s.qty}</td><td>${s.dispatched}</td><td>${s.eta}</td><td>${s.carrier}</td>
        <td>${WMS.statusBadge(s.status)}</td>
        <td><div class="d-flex gap-1">
          <button class="btn-wms ghost sm icon-only" onclick="WMS.Shipments.updateShipStatus('outgoing','${s.id}')"><i class="fas fa-refresh"></i></button>
          <button class="btn-wms danger sm icon-only" onclick="WMS.Shipments.delShipment('outgoing','${s.id}')"><i class="fas fa-trash"></i></button>
        </div></td>`;
      tbody.appendChild(tr);
    });
    if (typeof $.fn!=='undefined' && $.fn.DataTable) {
      if ($.fn.DataTable.isDataTable('#outgoingTable')) { $('#outgoingTable').DataTable().destroy(); }
      $('#outgoingTable').DataTable({responsive:true,pageLength:10,
        dom:'<"d-flex justify-content-between align-items-center mb-3"<"d-flex align-items-center gap-2"Bl><"d-flex"f>>rtip',
        buttons:[{extend:'csv',className:'btn-wms ghost sm',text:'CSV'}],
        language:{search:'',searchPlaceholder:'Search...',paginate:{previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}}});
    }
  },
  updateShipStatus: function(type, id) {
    const arr = type==='incoming' ? WMS.incoming : WMS.outgoing;
    const s = arr.find(x=>x.id===id); if (!s) return;
    const nextMap = {Scheduled:'In Transit','In Transit':'Arrived',Arrived:'Arrived',Processing:'In Transit','In Transit':'Delivered',Delivered:'Delivered'};
    s.status = nextMap[s.status] || s.status;
    type==='incoming' ? WMS.Shipments.renderIncoming() : WMS.Shipments.renderOutgoing();
    showToast('Shipment '+id+' → '+s.status,'success');
  },
  delShipment: function(type, id) {
    WMS.confirm('Remove Shipment','Remove shipment '+id+'?', function() {
      if (type==='incoming') WMS.incoming = WMS.incoming.filter(x=>x.id!==id);
      else WMS.outgoing = WMS.outgoing.filter(x=>x.id!==id);
      type==='incoming' ? WMS.Shipments.renderIncoming() : WMS.Shipments.renderOutgoing();
      showToast('Shipment removed.','danger');
    });
  },
  addShipmentForm: function(type) {
    const html = `<div class="modal fade" id="shipFormModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wms-modal-content">
          <div class="modal-header wms-modal-header">
            <h5 class="modal-title"><i class="fas fa-plus me-2"></i>Add ${type==='incoming'?'Incoming':'Outgoing'} Shipment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="padding:28px">
            <form id="shipForm" novalidate>
              <div class="row g-3">
                <div class="col-12"><label class="form-label-wms">${type==='incoming'?'Supplier':'Customer'} <span class="text-danger">*</span></label>
                  <input type="text" id="shParty" class="form-control-wms" required></div>
                <div class="col-md-8"><label class="form-label-wms">Product <span class="text-danger">*</span></label>
                  <select id="shProduct" class="form-control-wms" required>
                    <option value="">Select...</option>
                    ${WMS.products.map(p=>`<option>${p.name}</option>`).join('')}
                  </select></div>
                <div class="col-md-4"><label class="form-label-wms">Qty <span class="text-danger">*</span></label>
                  <input type="number" id="shQty" class="form-control-wms" required min="1"></div>
                <div class="col-md-6"><label class="form-label-wms">${type==='incoming'?'Expected':'ETA'} Date</label>
                  <input type="date" id="shDate" class="form-control-wms"></div>
                ${type==='outgoing'?`<div class="col-md-6"><label class="form-label-wms">Carrier</label>
                  <select id="shCarrier" class="form-control-wms"><option>FedEx</option><option>DHL</option><option>BlueDart</option><option>DTDC</option></select></div>`:''}
              </div>
            </form>
          </div>
          <div class="modal-footer" style="padding:16px 28px;border-top:1px solid var(--border-color)">
            <button type="button" class="btn-wms ghost" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn-wms primary" id="saveShipBtn"><i class="fas fa-save me-2"></i>Add Shipment</button>
          </div>
        </div>
      </div>
    </div>`;
    WMS.Products._openModal('shipFormModal', html);
    document.getElementById('saveShipBtn').addEventListener('click', function() {
      if (!WMS.validateForm(document.getElementById('shipForm'))) { showToast('Fill required fields','warning'); return; }
      const today = new Date().toISOString().slice(0,10);
      if (type==='incoming') {
        WMS.incoming.push({
          id:WMS.nextId('INC',WMS.incoming,'id'),
          supplier:document.getElementById('shParty').value.trim(),
          product:document.getElementById('shProduct').value,
          qty:parseInt(document.getElementById('shQty').value)||0,
          expected:document.getElementById('shDate').value||today,
          status:'Scheduled',
          tracking:'TRK-'+Math.floor(8000+Math.random()*2000)
        });
        bootstrap.Modal.getInstance(document.getElementById('shipFormModal')).hide();
        WMS.Shipments.renderIncoming();
      } else {
        WMS.outgoing.push({
          id:WMS.nextId('OUT',WMS.outgoing,'id'),
          customer:document.getElementById('shParty').value.trim(),
          product:document.getElementById('shProduct').value,
          qty:parseInt(document.getElementById('shQty').value)||0,
          dispatched:today,
          eta:document.getElementById('shDate').value||today,
          status:'Processing',
          carrier:document.getElementById('shCarrier')?.value||'FedEx'
        });
        bootstrap.Modal.getInstance(document.getElementById('shipFormModal')).hide();
        WMS.Shipments.renderOutgoing();
      }
      showToast('Shipment added!','success');
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   REPORTS — Generate Report Button
   ═══════════════════════════════════════════════════════════ */
WMS.Reports = {
  init: function() {
    if (!document.getElementById('reportsPage')) return;
    document.querySelectorAll('.generate-report-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        WMS.showLoading();
        showToast('Generating report...','info',1500);
        setTimeout(function() {
          WMS.hideLoading();
          showToast('Report generated! Download ready.','success');
        }, 1800);
      });
    });
    document.querySelectorAll('.export-report-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        showToast('Exporting report as PDF...','info',2000);
      });
    });
  }
};

/* ═══════════════════════════════════════════════════════════════
   AUTO INITIALISE — runs on DOMContentLoaded
   ═══════════════════════════════════════════════════════════ */
/* Apply opacity:0 immediately (before DOMContentLoaded) so theme
   is already set by the inline <head> script before body paints */
document.documentElement.style.opacity = '0';

document.addEventListener('DOMContentLoaded', function() {
  WMS.initTheme();
  WMS.Products.init();
  WMS.Inventory.init();
  WMS.Orders.init();
  WMS.Staff.init();
  WMS.Customers.init();
  WMS.Settings.init();
  WMS.Profile.init();
  WMS.Notifications.init();
  WMS.Shipments.initIncoming();
  WMS.Shipments.initOutgoing();
  WMS.Reports.init();
  WMS.hideLoading();

  /* Page-transition fade-in — reveal after theme is applied */
  requestAnimationFrame(function(){
    document.documentElement.style.transition = 'opacity .25s ease';
    document.documentElement.style.opacity = '1';
  });
});
