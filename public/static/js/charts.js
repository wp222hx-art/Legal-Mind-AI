// Chart utility functions — Light Theme
function createChart(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();
  
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = '#f1f5f9';
  Chart.defaults.font.family = 'Inter, Noto Sans SC, sans-serif';
  Chart.defaults.font.size = 11;
  
  return new Chart(canvas, config);
}

function lineChartConfig(labels, datasets) {
  return {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: datasets.length > 1, labels: { boxWidth: 12, padding: 16, usePointStyle: true } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
        y: { grid: { color: '#f1f5f9' }, beginAtZero: true, ticks: { color: '#94a3b8', font: { size: 11 } } }
      }
    }
  };
}

function barChartConfig(labels, data, color = 'rgba(37,99,235,0.7)') {
  return {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: color,
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 28,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: '#f1f5f9' }, beginAtZero: true, ticks: { color: '#94a3b8' } }
      }
    }
  };
}

function doughnutChartConfig(labels, data, colors) {
  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 0, spacing: 3 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { position: 'right', labels: { boxWidth: 10, padding: 10, usePointStyle: true, font: { size: 11 } } }
      }
    }
  };
}

function radarChartConfig(labels, data, label = '') {
  return {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: 'rgba(37,99,235,0.08)',
        borderColor: 'rgba(37,99,235,0.5)',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: { color: '#f1f5f9' },
          angleLines: { color: '#f1f5f9' },
          pointLabels: { font: { size: 11 }, color: '#64748b' },
          ticks: { display: false, stepSize: 20 }
        }
      },
      plugins: { legend: { display: false } }
    }
  };
}

function scoreRingSVG(score, max = 100, size = 120, color1 = '#2563eb', color2 = '#60a5fa') {
  const r = (size - 12) / 2;
  const c = Math.PI * 2 * r;
  const pct = score / max;
  return `
    <div class="score-ring" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}">
        <defs>
          <linearGradient id="scoreGrad_${score}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1}"/>
            <stop offset="100%" style="stop-color:${color2}"/>
          </linearGradient>
        </defs>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#f1f5f9" stroke-width="8"/>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="url(#scoreGrad_${score})" stroke-width="8" 
          stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct)}" stroke-linecap="round"/>
      </svg>
      <div class="value" style="color:#1e293b">${score}</div>
    </div>`;
}
