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
  // DASHBOARD - Revenue Line Chart
  // ============================================================
  if (document.getElementById('revenueChart')) {
    const chart = new ApexCharts(document.getElementById('revenueChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'area', height: 300, sparkline: { enabled: false } },
      series: [
        { name: 'Revenue', data: [42000, 58000, 51000, 73000, 68000, 82000, 79000, 91000, 86000, 104000, 98000, 115000] },
        { name: 'Expenses', data: [28000, 34000, 30000, 42000, 38000, 47000, 44000, 52000, 49000, 58000, 54000, 63000] },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      },
      yaxis: {
        labels: {
          formatter: function (v) { return '$' + (v / 1000).toFixed(0) + 'K'; },
          style: { colors: '#94a3b8', fontSize: '12px' },
        }
      },
      colors: [PRIMARY, '#e2e8f0'],
      fill: {
        type: ['gradient', 'solid'],
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
  // DASHBOARD - Order Status Donut
  // ============================================================
  if (document.getElementById('orderStatusChart')) {
    const chart = new ApexCharts(document.getElementById('orderStatusChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'donut', height: 300 },
      series: [38, 27, 19, 16],
      labels: ['Delivered', 'Processing', 'Pending', 'Cancelled'],
      colors: [SUCCESS, PRIMARY, WARNING, DANGER],
      plotOptions: {
        pie: {
          donut: {
            size: '72%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Orders',
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
  // DASHBOARD - Warehouse Utilization Bar
  // ============================================================
  if (document.getElementById('warehouseChart')) {
    const chart = new ApexCharts(document.getElementById('warehouseChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'bar', height: 280 },
      series: [
        { name: 'Used', data: [78, 65, 90, 54, 82, 71] },
        { name: 'Available', data: [22, 35, 10, 46, 18, 29] },
      ],
      xaxis: {
        categories: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E', 'Zone F'],
        labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: function (v) { return v + '%'; },
          style: { colors: '#94a3b8', fontSize: '12px' },
        }
      },
      colors: [PRIMARY, '#e2e8f0'],
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
  // REPORTS - Sales Analytics Line
  // ============================================================
  if (document.getElementById('salesChart')) {
    const chart = new ApexCharts(document.getElementById('salesChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'line', height: 350 },
      series: [
        { name: 'This Year', data: [31, 40, 28, 51, 42, 109, 100, 87, 95, 111, 104, 118] },
        { name: 'Last Year', data: [20, 29, 37, 36, 44, 45, 50, 68, 76, 88, 80, 93] },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      },
      yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '12px' } } },
      colors: [PRIMARY, '#e2e8f0'],
      stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 5] },
      markers: { size: [4, 0] },
      legend: { position: 'top', fontSize: '13px', labels: { colors: '#64748b' } },
      dataLabels: { enabled: false },
    });
    chart.render();
  }

  // ============================================================
  // SALES ANALYTICS - Radial Chart
  // ============================================================
  if (document.getElementById('salesRadial')) {
    const chart = new ApexCharts(document.getElementById('salesRadial'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'radialBar', height: 300 },
      series: [87, 73, 61, 94],
      labels: ['Electronics', 'Apparel', 'Food', 'Hardware'],
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
              label: 'Avg Score',
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

  // ============================================================
  // INVENTORY - Stock Levels Heatmap
  // ============================================================
  if (document.getElementById('stockHeatmap')) {
    const generateData = function (count, yrange) {
      let series = [];
      for (let i = 0; i < count; i++) {
        series.push({ x: 'W' + (i + 1), y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min });
      }
      return series;
    };
    const chart = new ApexCharts(document.getElementById('stockHeatmap'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'heatmap', height: 260 },
      series: [
        { name: 'Electronics', data: generateData(12, { min: 0, max: 100 }) },
        { name: 'Apparel', data: generateData(12, { min: 10, max: 90 }) },
        { name: 'Food', data: generateData(12, { min: 5, max: 95 }) },
        { name: 'Hardware', data: generateData(12, { min: 20, max: 80 }) },
      ],
      colors: [PRIMARY],
      dataLabels: { enabled: false },
      xaxis: { labels: { style: { colors: '#94a3b8', fontSize: '11px' } } },
      yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '11px' } } },
    });
    chart.render();
  }

  // ============================================================
  // SHIPMENTS - Timeline Area Chart
  // ============================================================
  if (document.getElementById('shipmentsChart')) {
    const chart = new ApexCharts(document.getElementById('shipmentsChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'area', height: 260 },
      series: [
        { name: 'Incoming', data: [45, 62, 38, 71, 84, 56, 91, 68, 75, 82, 67, 88] },
        { name: 'Outgoing', data: [38, 54, 31, 65, 72, 48, 83, 60, 68, 74, 59, 79] },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: '#94a3b8', fontSize: '11px' } },
      },
      yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '11px' } } },
      colors: [PRIMARY, SUCCESS],
      fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0.05 } },
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      legend: { position: 'top', fontSize: '12px', labels: { colors: '#64748b' } },
    });
    chart.render();
  }

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
  // REPORTS - Multi-metric Bar
  // ============================================================
  if (document.getElementById('reportsBarChart')) {
    const chart = new ApexCharts(document.getElementById('reportsBarChart'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'bar', height: 320 },
      series: [
        { name: 'Orders', data: [120, 145, 132, 168, 155, 182, 175, 198, 185, 210, 202, 225] },
        { name: 'Shipments', data: [95, 118, 108, 140, 128, 152, 147, 168, 158, 180, 172, 195] },
        { name: 'Returns', data: [12, 15, 13, 18, 16, 20, 19, 22, 21, 25, 23, 26] },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: '#94a3b8', fontSize: '11px' } },
      },
      yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '11px' } } },
      colors: [PRIMARY, SUCCESS, DANGER],
      plotOptions: { bar: { borderRadius: 4, columnWidth: '65%' } },
      dataLabels: { enabled: false },
      legend: { position: 'top', fontSize: '12px', labels: { colors: '#64748b' } },
    });
    chart.render();
  }

  // ============================================================
  // CATEGORY PIE - Products page
  // ============================================================
  if (document.getElementById('categoryPie')) {
    const chart = new ApexCharts(document.getElementById('categoryPie'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'pie', height: 300 },
      series: [35, 25, 20, 12, 8],
      labels: ['Electronics', 'Apparel', 'Food & Bev', 'Hardware', 'Others'],
      colors: [PRIMARY, SUCCESS, WARNING, CYAN, '#94a3b8'],
      legend: { position: 'bottom', fontSize: '12px', labels: { colors: '#64748b' } },
      dataLabels: { enabled: true, style: { fontSize: '12px' }, dropShadow: { enabled: false } },
      stroke: { width: 3 },
    });
    chart.render();
  }

  // ============================================================
  // DISPATCH STATUS PIE
  // ============================================================
  if (document.getElementById('dispatchPie')) {
    const chart = new ApexCharts(document.getElementById('dispatchPie'), {
      ...baseChartOptions,
      chart: { ...baseChartOptions.chart, type: 'donut', height: 280 },
      series: [42, 28, 18, 12],
      labels: ['On Time', 'Delayed', 'In Transit', 'Failed'],
      colors: [SUCCESS, WARNING, PRIMARY, DANGER],
      plotOptions: { pie: { donut: { size: '70%' } } },
      legend: { position: 'bottom', fontSize: '12px', labels: { colors: '#64748b' } },
      dataLabels: { enabled: false },
    });
    chart.render();
  }

})();
