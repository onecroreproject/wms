/* ============================================================
   WMS DASHBOARD - Charts Configuration (ApexCharts)
   ============================================================ */

(function () {
  'use strict';

  const PRIMARY = '#4f46e5';
  const SECONDARY = '#7c3aed';
  const SUCCESS = '#10b981';
  const WARNING = '#f59e0b';
  const DANGER = '#ef4444';
  const INFO = '#3b82f6';
  const CYAN = '#06b6d4';

  const baseChartOptions = {
    chart: { fontFamily: 'Inter, sans-serif', toolbar: { show: false } },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
    tooltip: { theme: 'light' },
  };

  // ============================================================
  // DASHBOARD - Monthly Rent Revenue Chart
  // ============================================================
  if (document.getElementById('revenueChart')) {
    const chart = new ApexCharts(document.getElementById('revenueChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'area', height: 300, sparkline: { enabled: false } },
      series: [
        { name: 'Rent Collected', data: [72000, 78000, 75000, 80000, 82000, 85000, 83000, 88000, 90000, 94000, 98000, 89000] },
        { name: 'Outstanding', data: [18000, 14000, 20000, 15000, 12000, 10000, 16000, 12000, 9000, 11000, 8000, 27000] },
      ],
      xaxis: {
        categories: ['Jun\u201925', 'Jul\u201925', 'Aug\u201925', 'Sep\u201925', 'Oct\u201925', 'Nov\u201925', 'Dec\u201925', 'Jan\u201926', 'Feb\u201926', 'Mar\u201926', 'Apr\u201926', 'May\u201926'],
        labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      },
      yaxis: {
        labels: {
          formatter: function (v) { return '\u20b9' + (v / 1000).toFixed(0) + 'K'; },
          style: { colors: '#94a3b8', fontSize: '12px' },
        }
      },
      colors: [PRIMARY, DANGER],
      fill: {
        type: ['gradient', 'gradient'],
        gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] },
      },
      stroke: { curve: 'smooth', width: [3, 2] },
      legend: { position: 'top', horizontalAlign: 'right', fontSize: '13px', labels: { colors: '#64748b' } },
      markers: { size: [4, 0], strokeWidth: 2, strokeColors: '#fff', fillColors: [PRIMARY] },
      dataLabels: { enabled: false },
    });
    chart.render();
  }

  // ============================================================
  // DASHBOARD - Occupancy / Ticket Status Donut
  // ============================================================
  if (document.getElementById('orderStatusChart')) {
    const chart = new ApexCharts(document.getElementById('orderStatusChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'donut', height: 220 },
      series: [8, 3, 1],
      labels: ['Occupied', 'Vacant', 'Maintenance'],
      colors: [SUCCESS, PRIMARY, WARNING],
      plotOptions: {
        pie: {
          donut: {
            size: '72%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Units',
                fontSize: '13px',
                fontWeight: 600,
                color: '#64748b',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce(function (a, b) { return a + b; }, 0);
                }
              },
              value: { fontSize: '26px', fontWeight: 700, color: '#0f172a', fontFamily: 'Poppins, sans-serif' },
            }
          }
        }
      },
      legend: { position: 'bottom', fontSize: '13px', labels: { colors: '#64748b' } },
      dataLabels: { enabled: false },
      stroke: { width: 3 },
    });
    chart.render();
  }

  // ============================================================
  // REPORTS - Occupancy Rate (Last 6 Months)
  // ============================================================
  if (document.getElementById('warehouseChart')) {
    const chart = new ApexCharts(document.getElementById('warehouseChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'bar', height: 280 },
      series: [
        { name: 'Occupied', data: [7, 7, 8, 8, 7, 8] },
        { name: 'Vacant', data: [4, 4, 3, 3, 4, 3] },
        { name: 'Maintenance', data: [1, 1, 1, 1, 1, 1] },
      ],
      xaxis: {
        categories: ['Dec\u201925', 'Jan\u201926', 'Feb\u201926', 'Mar\u201926', 'Apr\u201926', 'May\u201926'],
        labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      },
      yaxis: {
        max: 12,
        labels: {
          formatter: function (v) { return v + ' units'; },
          style: { colors: '#94a3b8', fontSize: '12px' },
        }
      },
      colors: [SUCCESS, PRIMARY, WARNING],
      plotOptions: {
        bar: { horizontal: false, columnWidth: '55%', borderRadius: 6, stacked: true }
      },
      legend: { position: 'top', fontSize: '13px', labels: { colors: '#64748b' } },
      dataLabels: { enabled: false },
      stroke: { show: false },
      fill: { opacity: 1 },
    });
    chart.render();
  }

  // ============================================================
  // REPORTS - Revenue Trend Line (reused as salesChart id)
  // ============================================================
  if (document.getElementById('salesChart')) {
    const chart = new ApexCharts(document.getElementById('salesChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'line', height: 350 },
      series: [
        { name: 'Collected (FY2026)', data: [78000, 80000, 82000, 85000, 88000, 90000, 83000, 87000, 92000, 95000, 98000, 89000] },
        { name: 'Collected (FY2025)', data: [62000, 65000, 68000, 70000, 72000, 75000, 73000, 77000, 80000, 82000, 85000, 84000] },
      ],
      xaxis: {
        categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
        labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      },
      yaxis: { labels: { formatter: function(v){ return '\u20b9'+(v/1000).toFixed(0)+'K'; }, style: { colors: '#94a3b8', fontSize: '12px' } } },
      colors: [PRIMARY, '#e2e8f0'],
      stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 5] },
      markers: { size: [4, 0] },
      legend: { position: 'top', fontSize: '13px', labels: { colors: '#64748b' } },
      dataLabels: { enabled: false },
    });
    chart.render();
  }

  // ============================================================
  // REPORTS - Ticket Resolution Radial
  // ============================================================
  if (document.getElementById('salesRadial')) {
    const chart = new ApexCharts(document.getElementById('salesRadial'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'radialBar', height: 300 },
      series: [92, 75, 88, 60],
      labels: ['Maintenance', 'Billing', 'Access Issue', 'General'],
      colors: [PRIMARY, SUCCESS, WARNING, CYAN],
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: -90,
          endAngle: 270,
          hollow: { size: '30%' },
          track: { background: '#f1f5f9', strokeWidth: '80%' },
          dataLabels: {
            name: { fontSize: '12px', color: '#94a3b8' },
            value: { fontSize: '18px', fontWeight: 700, color: '#0f172a', fontFamily: 'Poppins, sans-serif' },
            total: {
              show: true,
              label: 'Avg Resolution',
              fontSize: '12px',
              fontWeight: 600,
              color: '#64748b',
              formatter: function () { return '79%'; }
            }
          }
        }
      },
      legend: { show: true, position: 'bottom', fontSize: '12px', labels: { colors: '#64748b' } },
    });
    chart.render();
  }

  // (Removed obsolete inventory heatmap and shipments chart - not used in WareHub)

  // ============================================================
  // MINI SPARKLINES on stat cards
  // ============================================================
  function renderSparkline(id, data, color) {
    if (!document.getElementById(id)) return;
    new ApexCharts(document.getElementById(id), {
      chart: { type: 'line', height: 50, sparkline: { enabled: true } },
      series: [{ data: data }],
      colors: [color],
      stroke: { curve: 'smooth', width: 2 },
      tooltip: { enabled: false },
    }).render();
  }

  renderSparkline('spark1', [34, 44, 39, 50, 43, 56, 52, 61, 58, 70], PRIMARY);
  renderSparkline('spark2', [24, 32, 28, 35, 31, 38, 36, 42, 39, 48], SUCCESS);
  renderSparkline('spark3', [15, 20, 18, 23, 19, 25, 22, 28, 24, 31], WARNING);
  renderSparkline('spark4', [8, 10, 9, 12, 11, 13, 12, 15, 13, 16], DANGER);

  // ============================================================
  // REPORTS - Payment Status Bar (Collected / Outstanding / Late Fee)
  // ============================================================
  if (document.getElementById('reportsBarChart')) {
    const chart = new ApexCharts(document.getElementById('reportsBarChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'bar', height: 320 },
      series: [
        { name: 'Collected', data: [72000, 78000, 75000, 80000, 82000, 85000, 83000, 88000, 90000, 94000, 98000, 89000] },
        { name: 'Outstanding', data: [18000, 14000, 20000, 15000, 12000, 10000, 16000, 12000, 9000, 11000, 8000, 27000] },
        { name: 'Late Fees', data: [900, 600, 1100, 500, 300, 200, 800, 400, 200, 300, 150, 1800] },
      ],
      xaxis: {
        categories: ['Jun\u201925', 'Jul\u201925', 'Aug\u201925', 'Sep\u201925', 'Oct\u201925', 'Nov\u201925', 'Dec\u201925', 'Jan\u201926', 'Feb\u201926', 'Mar\u201926', 'Apr\u201926', 'May\u201926'],
        labels: { style: { colors: '#94a3b8', fontSize: '11px' } },
      },
      yaxis: { labels: { formatter: function(v){ return '\u20b9'+(v/1000).toFixed(0)+'K'; }, style: { colors: '#94a3b8', fontSize: '11px' } } },
      colors: [SUCCESS, WARNING, DANGER],
      plotOptions: { bar: { borderRadius: 4, columnWidth: '65%' } },
      dataLabels: { enabled: false },
      legend: { position: 'top', fontSize: '12px', labels: { colors: '#64748b' } },
    });
    chart.render();
  }

})();
