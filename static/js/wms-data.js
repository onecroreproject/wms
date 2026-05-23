/* ============================================================
   WMS PRO — Global Mock Data Store
   All data lives here; pages mutate this store, DataTables re-render.
   ============================================================ */
'use strict';

window.WMS = window.WMS || {};

/* ─── PRODUCTS ─────────────────────────────────────────────── */
WMS.products = [
  {id:'PRD-001',name:'Laptop Pro 15',sku:'SKU-001',category:'Electronics',price:1200,stock:245,sales:4820,rating:4.8,status:'Active',image:''},
  {id:'PRD-002',name:'Wireless Mouse X',sku:'SKU-002',category:'Electronics',price:25,stock:1820,sales:8210,rating:4.6,status:'Active',image:''},
  {id:'PRD-003',name:'Office Chair Pro',sku:'SKU-003',category:'Furniture',price:180,stock:94,sales:2140,rating:4.7,status:'Active',image:''},
  {id:'PRD-004',name:'Safety Helmet Pro',sku:'SKU-004',category:'Hardware',price:35,stock:0,sales:540,rating:4.3,status:'Out of Stock',image:''},
  {id:'PRD-005',name:'Running Shoes',sku:'SKU-005',category:'Apparel',price:65,stock:450,sales:5670,rating:4.9,status:'Active',image:''},
  {id:'PRD-006',name:'USB-C Hub 7P',sku:'SKU-006',category:'Electronics',price:45,stock:38,sales:3890,rating:4.5,status:'Low Stock',image:''},
  {id:'PRD-007',name:'Steel Cabinet',sku:'SKU-007',category:'Furniture',price:280,stock:72,sales:1420,rating:4.4,status:'Active',image:''},
  {id:'PRD-008',name:'Mechanical Keyboard',sku:'SKU-008',category:'Electronics',price:120,stock:215,sales:6540,rating:4.7,status:'Active',image:''},
  {id:'PRD-009',name:'Ergonomic Desk',sku:'SKU-009',category:'Furniture',price:350,stock:30,sales:980,rating:4.6,status:'Low Stock',image:''},
  {id:'PRD-010',name:'Work Boots XL',sku:'SKU-010',category:'Apparel',price:90,stock:320,sales:2300,rating:4.5,status:'Active',image:''},
];

/* ─── INVENTORY ─────────────────────────────────────────────── */
WMS.inventory = [
  {id:'INV-001',product:'Laptop Pro 15',sku:'SKU-001',warehouse:'Zone A',qty:245,minQty:50,maxQty:500,location:'A-01-03',lastUpdated:'2026-05-20',status:'In Stock'},
  {id:'INV-002',product:'Wireless Mouse X',sku:'SKU-002',warehouse:'Zone A',qty:1820,minQty:100,maxQty:2000,location:'A-02-05',lastUpdated:'2026-05-21',status:'In Stock'},
  {id:'INV-003',product:'Office Chair Pro',sku:'SKU-003',warehouse:'Zone B',qty:94,minQty:20,maxQty:200,location:'B-01-02',lastUpdated:'2026-05-19',status:'Low Stock'},
  {id:'INV-004',product:'Safety Helmet Pro',sku:'SKU-004',warehouse:'Zone D',qty:0,minQty:50,maxQty:300,location:'D-03-01',lastUpdated:'2026-05-15',status:'Out of Stock'},
  {id:'INV-005',product:'Running Shoes',sku:'SKU-005',warehouse:'Zone C',qty:450,minQty:80,maxQty:600,location:'C-02-04',lastUpdated:'2026-05-22',status:'In Stock'},
  {id:'INV-006',product:'USB-C Hub 7P',sku:'SKU-006',warehouse:'Zone A',qty:38,minQty:50,maxQty:400,location:'A-04-02',lastUpdated:'2026-05-18',status:'Low Stock'},
  {id:'INV-007',product:'Steel Cabinet',sku:'SKU-007',warehouse:'Zone B',qty:72,minQty:15,maxQty:150,location:'B-03-01',lastUpdated:'2026-05-17',status:'In Stock'},
  {id:'INV-008',product:'Mechanical Keyboard',sku:'SKU-008',warehouse:'Zone A',qty:215,minQty:50,maxQty:400,location:'A-03-06',lastUpdated:'2026-05-22',status:'In Stock'},
];

/* ─── ORDERS ─────────────────────────────────────────────────── */
WMS.orders = [
  {id:'ORD-2001',customer:'Arjun Sharma',email:'arjun@example.com',product:'Laptop Pro 15',qty:2,amount:2400,date:'2026-05-22',status:'Processing',priority:'High',zone:'Zone A'},
  {id:'ORD-2002',customer:'Priya Nair',email:'priya@example.com',product:'Wireless Mouse X',qty:10,amount:250,date:'2026-05-21',status:'Shipped',priority:'Normal',zone:'Zone A'},
  {id:'ORD-2003',customer:'Rahul Mehta',email:'rahul@example.com',product:'Office Chair Pro',qty:5,amount:900,date:'2026-05-21',status:'Delivered',priority:'Normal',zone:'Zone B'},
  {id:'ORD-2004',customer:'Sneha Kapoor',email:'sneha@example.com',product:'Running Shoes',qty:8,amount:520,date:'2026-05-20',status:'Pending',priority:'High',zone:'Zone C'},
  {id:'ORD-2005',customer:'Vikram Singh',email:'vikram@example.com',product:'USB-C Hub 7P',qty:15,amount:675,date:'2026-05-20',status:'Processing',priority:'Normal',zone:'Zone A'},
  {id:'ORD-2006',customer:'Anita Roy',email:'anita@example.com',product:'Mechanical Keyboard',qty:3,amount:360,date:'2026-05-19',status:'Delivered',priority:'Low',zone:'Zone A'},
  {id:'ORD-2007',customer:'Kiran Patel',email:'kiran@example.com',product:'Steel Cabinet',qty:2,amount:560,date:'2026-05-18',status:'Cancelled',priority:'Normal',zone:'Zone B'},
  {id:'ORD-2008',customer:'Deepa Menon',email:'deepa@example.com',product:'Ergonomic Desk',qty:1,amount:350,date:'2026-05-17',status:'Shipped',priority:'High',zone:'Zone B'},
  {id:'ORD-2009',customer:'Suresh Iyer',email:'suresh@example.com',product:'Work Boots XL',qty:6,amount:540,date:'2026-05-16',status:'Delivered',priority:'Normal',zone:'Zone C'},
  {id:'ORD-2010',customer:'Meena Pillai',email:'meena@example.com',product:'Safety Helmet Pro',qty:20,amount:700,date:'2026-05-15',status:'Pending',priority:'High',zone:'Zone D'},
];

/* ─── CUSTOMERS ─────────────────────────────────────────────── */
WMS.customers = [
  {id:'CUS-001',name:'Arjun Sharma',email:'arjun@example.com',phone:'+91-9811234567',company:'TechCorp Pvt Ltd',city:'Mumbai',orders:24,spent:48200,status:'Active',joined:'2024-03-15'},
  {id:'CUS-002',name:'Priya Nair',email:'priya@example.com',phone:'+91-9822345678',company:'Nair Enterprises',city:'Bangalore',orders:18,spent:32400,status:'Active',joined:'2024-05-20'},
  {id:'CUS-003',name:'Rahul Mehta',email:'rahul@example.com',phone:'+91-9833456789',company:'Mehta Logistics',city:'Delhi',orders:31,spent:61800,status:'Active',joined:'2023-11-08'},
  {id:'CUS-004',name:'Sneha Kapoor',email:'sneha@example.com',phone:'+91-9844567890',company:'Kapoor Retail',city:'Pune',orders:9,spent:12500,status:'Inactive',joined:'2025-01-12'},
  {id:'CUS-005',name:'Vikram Singh',email:'vikram@example.com',phone:'+91-9855678901',company:'Singh Distributors',city:'Chennai',orders:42,spent:89600,status:'Active',joined:'2023-08-25'},
  {id:'CUS-006',name:'Anita Roy',email:'anita@example.com',phone:'+91-9866789012',company:'Roy Wholesale',city:'Kolkata',orders:15,spent:27300,status:'Active',joined:'2024-07-30'},
  {id:'CUS-007',name:'Kiran Patel',email:'kiran@example.com',phone:'+91-9877890123',company:'Patel Trading',city:'Surat',orders:7,spent:9800,status:'Inactive',joined:'2025-02-14'},
  {id:'CUS-008',name:'Deepa Menon',email:'deepa@example.com',phone:'+91-9888901234',company:'Menon Industries',city:'Hyderabad',orders:28,spent:54100,status:'Active',joined:'2024-01-05'},
];

/* ─── STAFF ─────────────────────────────────────────────────── */
WMS.staff = [
  {id:'EMP-001',name:'John Doe',role:'Warehouse Manager',dept:'Operations',email:'john@wms.com',phone:'+91-9876543210',joined:'2022-04-01',status:'Active',initials:'JD',gradient:'135deg,#4f46e5,#7c3aed'},
  {id:'EMP-002',name:'Sarah Kim',role:'Inventory Analyst',dept:'Inventory',email:'sarah@wms.com',phone:'+91-9876543211',joined:'2023-01-15',status:'Active',initials:'SK',gradient:'135deg,#10b981,#059669'},
  {id:'EMP-003',name:'Mike Ross',role:'Dispatch Coordinator',dept:'Logistics',email:'mike@wms.com',phone:'+91-9876543212',joined:'2022-09-10',status:'On Leave',initials:'MR',gradient:'135deg,#f59e0b,#d97706'},
  {id:'EMP-004',name:'Raj Kumar',role:'Driver',dept:'Logistics',email:'raj@wms.com',phone:'+91-9876543213',joined:'2023-06-20',status:'Active',initials:'RK',gradient:'135deg,#3b82f6,#2563eb'},
  {id:'EMP-005',name:'Jane Smith',role:'HR Manager',dept:'Human Resources',email:'jane@wms.com',phone:'+91-9876543214',joined:'2021-11-05',status:'Active',initials:'JS',gradient:'135deg,#ef4444,#dc2626'},
  {id:'EMP-006',name:'Amit Patel',role:'Security Guard',dept:'Security',email:'amit@wms.com',phone:'+91-9876543215',joined:'2024-02-28',status:'Active',initials:'AP',gradient:'135deg,#06b6d4,#0891b2'},
];

/* ─── SHIPMENTS ─────────────────────────────────────────────── */
WMS.incoming = [
  {id:'INC-001',supplier:'Tech Supply Co',product:'Laptop Pro 15',qty:100,expected:'2026-05-25',status:'In Transit',tracking:'TRK-7821'},
  {id:'INC-002',supplier:'Office World',product:'Office Chair Pro',qty:50,expected:'2026-05-24',status:'Scheduled',tracking:'TRK-7822'},
  {id:'INC-003',supplier:'Apparel Plus',product:'Running Shoes',qty:200,expected:'2026-05-23',status:'Arrived',tracking:'TRK-7823'},
  {id:'INC-004',supplier:'Hardware Hub',product:'Safety Helmet Pro',qty:150,expected:'2026-05-26',status:'In Transit',tracking:'TRK-7824'},
  {id:'INC-005',supplier:'Electronics Park',product:'USB-C Hub 7P',qty:300,expected:'2026-05-27',status:'Scheduled',tracking:'TRK-7825'},
];

WMS.outgoing = [
  {id:'OUT-001',customer:'Arjun Sharma',product:'Laptop Pro 15',qty:2,dispatched:'2026-05-22',eta:'2026-05-24',status:'In Transit',carrier:'FedEx'},
  {id:'OUT-002',customer:'Priya Nair',product:'Wireless Mouse X',qty:10,dispatched:'2026-05-21',eta:'2026-05-23',status:'Delivered',carrier:'DHL'},
  {id:'OUT-003',customer:'Rahul Mehta',product:'Office Chair Pro',qty:5,dispatched:'2026-05-20',eta:'2026-05-22',status:'Delivered',carrier:'BlueDart'},
  {id:'OUT-004',customer:'Sneha Kapoor',product:'Running Shoes',qty:8,dispatched:'2026-05-22',eta:'2026-05-25',status:'Processing',carrier:'DTDC'},
  {id:'OUT-005',customer:'Vikram Singh',product:'USB-C Hub 7P',qty:15,dispatched:'2026-05-21',eta:'2026-05-24',status:'In Transit',carrier:'FedEx'},
];

/* ─── NOTIFICATIONS ─────────────────────────────────────────── */
WMS.notifications = [
  {id:1,type:'warning',icon:'fa-triangle-exclamation',title:'Low Stock Alert',msg:'USB-C Hub 7P has only 38 units left.',time:'5 min ago',read:false},
  {id:2,type:'danger',icon:'fa-circle-xmark',title:'Out of Stock',msg:'Safety Helmet Pro is completely out of stock.',time:'18 min ago',read:false},
  {id:3,type:'success',icon:'fa-circle-check',title:'Shipment Arrived',msg:'INC-003 (Running Shoes) arrived at dock.',time:'1 hr ago',read:false},
  {id:4,type:'info',icon:'fa-box-open',title:'New Order',msg:'ORD-2001 placed by Arjun Sharma.',time:'2 hr ago',read:true},
  {id:5,type:'warning',icon:'fa-temperature-high',title:'Temperature Alert',msg:'Zone D temp exceeded threshold (25°C).',time:'3 hr ago',read:true},
  {id:6,type:'success',icon:'fa-truck',title:'Order Shipped',msg:'ORD-2002 dispatched via FedEx.',time:'5 hr ago',read:true},
  {id:7,type:'info',icon:'fa-user-plus',title:'New Customer',msg:'Deepa Menon registered as a new customer.',time:'1 day ago',read:true},
];

/* ─── ACTIVITY LOGS ──────────────────────────────────────────── */
WMS.activityLogs = [
  {id:'ACT-001',user:'John Doe',action:'Added Product',module:'Products',details:'Added Laptop Pro 15 (PRD-001)',ip:'192.168.1.10',time:'2026-05-23 17:15:00',type:'create'},
  {id:'ACT-002',user:'Sarah Kim',action:'Updated Inventory',module:'Inventory',details:'Updated stock for Wireless Mouse X',ip:'192.168.1.11',time:'2026-05-23 16:45:00',type:'update'},
  {id:'ACT-003',user:'Mike Ross',action:'Dispatched Order',module:'Dispatch',details:'ORD-2002 dispatched via FedEx',ip:'192.168.1.12',time:'2026-05-23 15:30:00',type:'create'},
  {id:'ACT-004',user:'John Doe',action:'Deleted Product',module:'Products',details:'Removed obsolete item SKU-099',ip:'192.168.1.10',time:'2026-05-23 14:00:00',type:'delete'},
  {id:'ACT-005',user:'Jane Smith',action:'Added Staff',module:'Staff',details:'New employee Amit Patel added',ip:'192.168.1.14',time:'2026-05-23 11:20:00',type:'create'},
];

/* ─── HELPER UTILITIES ─────────────────────────────────────── */
WMS.nextId = function(prefix, arr, field) {
  if (!arr.length) return prefix + '-001';
  const nums = arr.map(function(r){ return parseInt((r[field]||'0').replace(/\D/g,''))||0; });
  const next = Math.max.apply(null,nums) + 1;
  return prefix + '-' + String(next).padStart(3,'0');
};

WMS.statusBadge = function(status) {
  const map = {
    'Active':'success','In Stock':'success','Delivered':'success','Arrived':'success',
    'Low Stock':'warning','On Leave':'warning','Processing':'warning','In Transit':'warning','Scheduled':'info',
    'Out of Stock':'danger','Cancelled':'danger','Inactive':'secondary',
    'Pending':'info','Shipped':'primary'
  };
  const cls = map[status] || 'secondary';
  return '<span class="badge-wms '+cls+'"><span class="badge-dot"></span>'+status+'</span>';
};

WMS.logAction = function(user, action, module, details) {
  WMS.activityLogs.unshift({
    id: WMS.nextId('ACT', WMS.activityLogs, 'id'),
    user: user || 'John Doe',
    action: action,
    module: module,
    details: details,
    ip: '192.168.1.10',
    time: new Date().toLocaleString(),
    type: action.toLowerCase().includes('delet') ? 'delete' : action.toLowerCase().includes('add') ? 'create' : 'update'
  });
};
