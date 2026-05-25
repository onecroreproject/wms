/* ============================================================
   WareHub — Warehouse Rent Management Data Store
   All mock data lives here; pages mutate this store.
   ============================================================ */
'use strict';

window.WMS = window.WMS || {};

/* ─── WAREHOUSE UNITS ───────────────────────────────────────── */
WMS.warehouses = [
  {id:'WH-001',unit:'A-101',block:'Block A',floor:'Ground',size:1200,type:'Standard',rent:18000,status:'Occupied',tenant:'Arjun Sharma',tenantId:'TNT-001',assignedDate:'2024-03-15'},
  {id:'WH-002',unit:'A-102',block:'Block A',floor:'Ground',size:800,type:'Standard',rent:12000,status:'Occupied',tenant:'Priya Nair',tenantId:'TNT-002',assignedDate:'2024-06-01'},
  {id:'WH-003',unit:'A-201',block:'Block A',floor:'First',size:1500,type:'Large',rent:24000,status:'Vacant',tenant:'',tenantId:'',assignedDate:''},
  {id:'WH-004',unit:'B-101',block:'Block B',floor:'Ground',size:600,type:'Small',rent:9000,status:'Occupied',tenant:'Rahul Mehta',tenantId:'TNT-003',assignedDate:'2023-11-10'},
  {id:'WH-005',unit:'B-102',block:'Block B',floor:'Ground',size:600,type:'Small',rent:9000,status:'Vacant',tenant:'',tenantId:'',assignedDate:''},
  {id:'WH-006',unit:'B-201',block:'Block B',floor:'First',size:1000,type:'Standard',rent:15000,status:'Occupied',tenant:'Sneha Kapoor',tenantId:'TNT-004',assignedDate:'2025-01-20'},
  {id:'WH-007',unit:'C-101',block:'Block C',floor:'Ground',size:2000,type:'Extra Large',rent:32000,status:'Occupied',tenant:'Vikram Singh',tenantId:'TNT-005',assignedDate:'2023-08-30'},
  {id:'WH-008',unit:'C-102',block:'Block C',floor:'Ground',size:2000,type:'Extra Large',rent:32000,status:'Under Maintenance',tenant:'',tenantId:'',assignedDate:''},
  {id:'WH-009',unit:'C-201',block:'Block C',floor:'First',size:1200,type:'Standard',rent:18000,status:'Occupied',tenant:'Anita Roy',tenantId:'TNT-006',assignedDate:'2024-08-05'},
  {id:'WH-010',unit:'D-101',block:'Block D',floor:'Ground',size:800,type:'Standard',rent:12000,status:'Vacant',tenant:'',tenantId:'',assignedDate:''},
  {id:'WH-011',unit:'D-102',block:'Block D',floor:'Ground',size:800,type:'Standard',rent:12000,status:'Occupied',tenant:'Kiran Patel',tenantId:'TNT-007',assignedDate:'2025-02-20'},
  {id:'WH-012',unit:'D-201',block:'Block D',floor:'First',size:1000,type:'Standard',rent:15000,status:'Vacant',tenant:'',tenantId:'',assignedDate:''},
];

/* ─── TENANTS ───────────────────────────────────────────────── */
WMS.tenants = [
  {id:'TNT-001',name:'Arjun Sharma',email:'arjun@techcorp.com',phone:'+91-9811234567',company:'TechCorp Pvt Ltd',city:'Mumbai',unit:'A-101',leaseStart:'2024-03-15',leaseEnd:'2025-03-14',rent:18000,status:'Active',documents:'ID Proof, Agreement',initials:'AS',gradient:'135deg,#4f46e5,#7c3aed'},
  {id:'TNT-002',name:'Priya Nair',email:'priya@nairenterprises.com',phone:'+91-9822345678',company:'Nair Enterprises',city:'Bangalore',unit:'A-102',leaseStart:'2024-06-01',leaseEnd:'2025-05-31',rent:12000,status:'Active',documents:'ID Proof, Agreement',initials:'PN',gradient:'135deg,#10b981,#059669'},
  {id:'TNT-003',name:'Rahul Mehta',email:'rahul@mehtalogistics.com',phone:'+91-9833456789',company:'Mehta Logistics',city:'Delhi',unit:'B-101',leaseStart:'2023-11-10',leaseEnd:'2024-11-09',rent:9000,status:'Active',documents:'ID Proof, Agreement, GST',initials:'RM',gradient:'135deg,#f59e0b,#d97706'},
  {id:'TNT-004',name:'Sneha Kapoor',email:'sneha@kapoorretail.com',phone:'+91-9844567890',company:'Kapoor Retail',city:'Pune',unit:'B-201',leaseStart:'2025-01-20',leaseEnd:'2026-01-19',rent:15000,status:'Active',documents:'ID Proof, Agreement',initials:'SK',gradient:'135deg,#3b82f6,#2563eb'},
  {id:'TNT-005',name:'Vikram Singh',email:'vikram@singhdist.com',phone:'+91-9855678901',company:'Singh Distributors',city:'Chennai',unit:'C-101',leaseStart:'2023-08-30',leaseEnd:'2025-08-29',rent:32000,status:'Active',documents:'ID Proof, Agreement, GST, PAN',initials:'VS',gradient:'135deg,#ef4444,#dc2626'},
  {id:'TNT-006',name:'Anita Roy',email:'anita@roywholesale.com',phone:'+91-9866789012',company:'Roy Wholesale',city:'Kolkata',unit:'C-201',leaseStart:'2024-08-05',leaseEnd:'2025-08-04',rent:18000,status:'Active',documents:'ID Proof, Agreement',initials:'AR',gradient:'135deg,#06b6d4,#0891b2'},
  {id:'TNT-007',name:'Kiran Patel',email:'kiran@pateltrading.com',phone:'+91-9877890123',company:'Patel Trading',city:'Surat',unit:'D-102',leaseStart:'2025-02-20',leaseEnd:'2026-02-19',rent:12000,status:'Active',documents:'ID Proof, Agreement',initials:'KP',gradient:'135deg,#8b5cf6,#7c3aed'},
];

/* ─── LEASES ────────────────────────────────────────────────── */
WMS.leases = [
  {id:'LSE-001',tenant:'Arjun Sharma',tenantId:'TNT-001',unit:'A-101',startDate:'2024-03-15',endDate:'2025-03-14',tenure:12,rent:18000,status:'Expiring Soon',renewalStatus:'Renewal Requested',daysLeft:18},
  {id:'LSE-002',tenant:'Priya Nair',tenantId:'TNT-002',unit:'A-102',startDate:'2024-06-01',endDate:'2025-05-31',tenure:12,rent:12000,status:'Active',renewalStatus:'None',daysLeft:98},
  {id:'LSE-003',tenant:'Rahul Mehta',tenantId:'TNT-003',unit:'B-101',startDate:'2023-11-10',endDate:'2024-11-09',tenure:12,rent:9000,status:'Expired',renewalStatus:'Pending Renewal',daysLeft:0},
  {id:'LSE-004',tenant:'Sneha Kapoor',tenantId:'TNT-004',unit:'B-201',startDate:'2025-01-20',endDate:'2026-01-19',tenure:12,rent:15000,status:'Active',renewalStatus:'None',daysLeft:239},
  {id:'LSE-005',tenant:'Vikram Singh',tenantId:'TNT-005',unit:'C-101',startDate:'2023-08-30',endDate:'2025-08-29',tenure:24,rent:32000,status:'Active',renewalStatus:'None',daysLeft:281},
  {id:'LSE-006',tenant:'Anita Roy',tenantId:'TNT-006',unit:'C-201',startDate:'2024-08-05',endDate:'2025-08-04',tenure:12,rent:18000,status:'Expiring Soon',renewalStatus:'None',daysLeft:24},
  {id:'LSE-007',tenant:'Kiran Patel',tenantId:'TNT-007',unit:'D-102',startDate:'2025-02-20',endDate:'2026-02-19',tenure:12,rent:12000,status:'Active',renewalStatus:'None',daysLeft:270},
];

/* ─── RENT PAYMENTS ─────────────────────────────────────────── */
WMS.payments = [
  {id:'PAY-001',tenant:'Arjun Sharma',tenantId:'TNT-001',unit:'A-101',month:'May 2026',amount:18000,lateFee:0,total:18000,dueDate:'2026-05-01',paidDate:'2026-05-02',method:'NEFT',reference:'NEFT202605021',status:'Paid',receipt:'RCP-001'},
  {id:'PAY-002',tenant:'Priya Nair',tenantId:'TNT-002',unit:'A-102',month:'May 2026',amount:12000,lateFee:0,total:12000,dueDate:'2026-05-01',paidDate:'2026-05-01',method:'IMPS',reference:'IMPS202605011',status:'Paid',receipt:'RCP-002'},
  {id:'PAY-003',tenant:'Rahul Mehta',tenantId:'TNT-003',unit:'B-101',month:'May 2026',amount:9000,lateFee:900,total:9900,dueDate:'2026-05-01',paidDate:'',method:'',reference:'',status:'Overdue',receipt:''},
  {id:'PAY-004',tenant:'Sneha Kapoor',tenantId:'TNT-004',unit:'B-201',month:'May 2026',amount:15000,lateFee:0,total:15000,dueDate:'2026-05-01',paidDate:'',method:'',reference:'',status:'Pending',receipt:''},
  {id:'PAY-005',tenant:'Vikram Singh',tenantId:'TNT-005',unit:'C-101',month:'May 2026',amount:32000,lateFee:0,total:32000,dueDate:'2026-05-01',paidDate:'2026-05-03',method:'RTGS',reference:'RTGS202605031',status:'Paid',receipt:'RCP-005'},
  {id:'PAY-006',tenant:'Anita Roy',tenantId:'TNT-006',unit:'C-201',month:'May 2026',amount:18000,lateFee:1800,total:19800,dueDate:'2026-05-01',paidDate:'',method:'',reference:'',status:'Overdue',receipt:''},
  {id:'PAY-007',tenant:'Kiran Patel',tenantId:'TNT-007',unit:'D-102',month:'May 2026',amount:12000,lateFee:0,total:12000,dueDate:'2026-05-01',paidDate:'2026-05-01',method:'NEFT',reference:'NEFT202605012',status:'Paid',receipt:'RCP-007'},
  {id:'PAY-008',tenant:'Arjun Sharma',tenantId:'TNT-001',unit:'A-101',month:'Apr 2026',amount:18000,lateFee:0,total:18000,dueDate:'2026-04-01',paidDate:'2026-04-01',method:'NEFT',reference:'NEFT202604011',status:'Paid',receipt:'RCP-008'},
  {id:'PAY-009',tenant:'Priya Nair',tenantId:'TNT-002',unit:'A-102',month:'Apr 2026',amount:12000,lateFee:0,total:12000,dueDate:'2026-04-01',paidDate:'2026-04-02',method:'IMPS',reference:'IMPS202604012',status:'Paid',receipt:'RCP-009'},
  {id:'PAY-010',tenant:'Rahul Mehta',tenantId:'TNT-003',unit:'B-101',month:'Apr 2026',amount:9000,lateFee:0,total:9000,dueDate:'2026-04-01',paidDate:'2026-04-05',method:'Manual',reference:'CASH202604051',status:'Paid',receipt:'RCP-010'},
];

/* ─── SUPPORT TICKETS ───────────────────────────────────────── */
WMS.tickets = [
  {id:'TKT-001',tenant:'Arjun Sharma',tenantId:'TNT-001',unit:'A-101',category:'Maintenance',subject:'Broken shutter door latch',description:'The latch on the main shutter door is broken and needs urgent replacement.',created:'2026-05-20',updated:'2026-05-22',assignedTo:'Ravi Kumar',status:'In Progress',priority:'High',slaHours:48,slaBreach:false},
  {id:'TKT-002',tenant:'Priya Nair',tenantId:'TNT-002',unit:'A-102',category:'Billing',subject:'Invoice amount discrepancy for April',description:'The April invoice shows ₹12,500 but my agreement says ₹12,000.',created:'2026-05-21',updated:'2026-05-21',assignedTo:'Meera Singh',status:'Open',priority:'Medium',slaHours:48,slaBreach:false},
  {id:'TKT-003',tenant:'Vikram Singh',tenantId:'TNT-005',unit:'C-101',category:'Access Issue',subject:'Access card not working at main gate',description:'My access card stopped working since yesterday morning.',created:'2026-05-18',updated:'2026-05-23',assignedTo:'Ravi Kumar',status:'Resolved',priority:'High',slaHours:24,slaBreach:false},
  {id:'TKT-004',tenant:'Rahul Mehta',tenantId:'TNT-003',unit:'B-101',category:'Maintenance',subject:'Water leakage from ceiling',description:'There is a water leakage from the ceiling near the north wall.',created:'2026-05-15',updated:'2026-05-16',assignedTo:'',status:'Open',priority:'High',slaHours:24,slaBreach:true},
  {id:'TKT-005',tenant:'Anita Roy',tenantId:'TNT-006',unit:'C-201',category:'General Inquiry',subject:'Parking bay allocation query',description:'I need to know which parking bays are allotted to my unit.',created:'2026-05-22',updated:'2026-05-22',assignedTo:'Meera Singh',status:'Open',priority:'Low',slaHours:72,slaBreach:false},
  {id:'TKT-006',tenant:'Sneha Kapoor',tenantId:'TNT-004',unit:'B-201',category:'Billing',subject:'Request for payment receipt copy',description:'Please share a copy of the payment receipt for March 2026.',created:'2026-05-23',updated:'2026-05-23',assignedTo:'Meera Singh',status:'Closed',priority:'Low',slaHours:72,slaBreach:false},
];

/* ─── STAFF ─────────────────────────────────────────────────── */
WMS.staff = [
  {id:'EMP-001',name:'Admin User',role:'Property Manager',dept:'Management',email:'admin@warehub.com',phone:'+91-9876543210',joined:'2022-04-01',status:'Active',initials:'AD',gradient:'135deg,#4f46e5,#7c3aed'},
  {id:'EMP-002',name:'Ravi Kumar',role:'Support Agent',dept:'Operations',email:'ravi@warehub.com',phone:'+91-9876543211',joined:'2023-01-15',status:'Active',initials:'RK',gradient:'135deg,#10b981,#059669'},
  {id:'EMP-003',name:'Meera Singh',role:'Support Agent',dept:'Operations',email:'meera@warehub.com',phone:'+91-9876543212',joined:'2022-09-10',status:'Active',initials:'MS',gradient:'135deg,#f59e0b,#d97706'},
  {id:'EMP-004',name:'Suresh Iyer',role:'Finance Officer',dept:'Finance',email:'suresh@warehub.com',phone:'+91-9876543213',joined:'2023-06-20',status:'Active',initials:'SI',gradient:'135deg,#3b82f6,#2563eb'},
  {id:'EMP-005',name:'Deepa Menon',role:'HR Manager',dept:'Human Resources',email:'deepa@warehub.com',phone:'+91-9876543214',joined:'2021-11-05',status:'Active',initials:'DM',gradient:'135deg,#ef4444,#dc2626'},
  {id:'EMP-006',name:'Amit Patel',role:'Security Supervisor',dept:'Security',email:'amit@warehub.com',phone:'+91-9876543215',joined:'2024-02-28',status:'Active',initials:'AP',gradient:'135deg,#06b6d4,#0891b2'},
];

/* ─── NOTIFICATIONS ─────────────────────────────────────────── */
WMS.notifications = [
  {id:1,type:'danger',icon:'fa-triangle-exclamation',title:'Rent Overdue',msg:'Rahul Mehta (B-101) — May rent overdue by 24 days.',time:'2 hr ago',read:false},
  {id:2,type:'danger',icon:'fa-triangle-exclamation',title:'Rent Overdue',msg:'Anita Roy (C-201) — May rent overdue by 24 days.',time:'2 hr ago',read:false},
  {id:3,type:'warning',icon:'fa-file-contract',title:'Lease Expiring',msg:'Arjun Sharma (A-101) — Lease expires in 18 days.',time:'5 hr ago',read:false},
  {id:4,type:'warning',icon:'fa-file-contract',title:'Lease Expiring',msg:'Anita Roy (C-201) — Lease expires in 24 days.',time:'5 hr ago',read:true},
  {id:5,type:'info',icon:'fa-ticket',title:'New Support Ticket',msg:'TKT-005 raised by Anita Roy — Parking bay query.',time:'1 day ago',read:true},
  {id:6,type:'success',icon:'fa-money-bill-wave',title:'Payment Received',msg:'Vikram Singh paid ₹32,000 for May 2026.',time:'2 days ago',read:true},
  {id:7,type:'warning',icon:'fa-clock',title:'SLA Breach Alert',msg:'TKT-004 (Rahul Mehta) has breached 24-hr SLA.',time:'3 days ago',read:true},
];

/* ─── ACTIVITY LOGS ──────────────────────────────────────────── */
WMS.activityLogs = [
  {id:'ACT-001',user:'Admin User',action:'Added Tenant',module:'Tenants',details:'Added new tenant Sneha Kapoor (TNT-004)',ip:'192.168.1.10',time:'2026-05-23 17:15:00',type:'create'},
  {id:'ACT-002',user:'Suresh Iyer',action:'Marked Payment',module:'Payments',details:'Marked PAY-001 paid — Arjun Sharma, May 2026',ip:'192.168.1.11',time:'2026-05-23 16:45:00',type:'update'},
  {id:'ACT-003',user:'Meera Singh',action:'Closed Ticket',module:'Tickets',details:'Closed TKT-006 — Receipt copy request by Sneha Kapoor',ip:'192.168.1.12',time:'2026-05-23 15:30:00',type:'update'},
  {id:'ACT-004',user:'Admin User',action:'Updated Warehouse',module:'Warehouses',details:'Set WH-008 (C-102) to Under Maintenance',ip:'192.168.1.10',time:'2026-05-23 14:00:00',type:'update'},
  {id:'ACT-005',user:'Admin User',action:'Added Staff',module:'Staff',details:'New staff member Amit Patel added (EMP-006)',ip:'192.168.1.10',time:'2026-05-22 11:20:00',type:'create'},
  {id:'ACT-006',user:'Ravi Kumar',action:'Resolved Ticket',module:'Tickets',details:'Resolved TKT-003 — Access card issue for Vikram Singh',ip:'192.168.1.11',time:'2026-05-23 10:00:00',type:'update'},
  {id:'ACT-007',user:'Suresh Iyer',action:'Generated Invoice',module:'Payments',details:'Bulk invoices generated for May 2026 — 7 tenants',ip:'192.168.1.11',time:'2026-05-01 09:00:00',type:'create'},
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
    'Active':'success','Paid':'success','Resolved':'success','Closed':'secondary',
    'Expiring Soon':'warning','In Progress':'warning','Pending':'warning','Pending Renewal':'warning',
    'Overdue':'danger','Expired':'danger','SLA Breach':'danger','Inactive':'secondary',
    'Vacant':'info','Open':'info','Under Maintenance':'secondary','Occupied':'success',
    'Renewal Requested':'primary','None':''
  };
  const cls = map[status] || 'secondary';
  if(!cls) return '<span class="text-muted">—</span>';
  return '<span class="badge-wms '+cls+'"><span class="badge-dot"></span>'+status+'</span>';
};

WMS.formatCurrency = function(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
};

WMS.logAction = function(user, action, module, details) {
  WMS.activityLogs.unshift({
    id: WMS.nextId('ACT', WMS.activityLogs, 'id'),
    user: user || 'Admin User',
    action: action,
    module: module,
    details: details,
    ip: '192.168.1.10',
    time: new Date().toLocaleString(),
    type: action.toLowerCase().includes('delet') ? 'delete' : action.toLowerCase().includes('add') ? 'create' : 'update'
  });
};
