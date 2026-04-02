// Knowledge Graph Page — Clean Theme
function render_knowledge_graph(data) {
  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-diagram-project mr-2 text-amber-500"></i>用户知识图谱引擎</h2>
      <p class="text-sm text-slate-400 mt-1">Neo4j 图数据库驱动 · 法律知识关联推理 · 学习轨迹追踪 · 薄弱点识别</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      ${[
        { label: '知识节点', value: formatNumber(data.stats.totalNodes), icon: 'fa-circle-nodes', color: '#d97706', bg: '#fffbeb' },
        { label: '关系边数', value: formatNumber(data.stats.totalRelations), icon: 'fa-arrows-turn-right', color: '#2563eb', bg: '#eff6ff' },
        { label: '法律领域', value: data.stats.domains, icon: 'fa-scale-balanced', color: '#059669', bg: '#ecfdf5' },
        { label: '知识点', value: formatNumber(data.stats.knowledgePoints), icon: 'fa-lightbulb', color: '#7c3aed', bg: '#f5f3ff' },
      ].map(k => `
        <div class="stat-card">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${k.bg}">
              <i class="fas ${k.icon} text-xs" style="color:${k.color}"></i>
            </div>
            <span class="text-xs text-slate-400">${k.label}</span>
          </div>
          <div class="text-2xl font-bold text-slate-800">${k.value}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Graph Visualization -->
      <div class="lg:col-span-2 glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4">知识图谱可视化</h3>
        <div class="graph-container h-80 lg:h-96" id="graphCanvas">
          <canvas id="knowledgeGraphCanvas" class="w-full h-full"></canvas>
        </div>
        <div class="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-blue-500"></span> 法律领域</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> 知识点</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-violet-500"></span> 法条</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-orange-500"></span> 案例</span>
        </div>
      </div>

      <!-- User Mastery -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-chart-pie mr-2 text-pink-500"></i>知识掌握度</h3>
        <div class="flex justify-center mb-4">
          ${scoreRingSVG(data.userMastery.masteryRate, 100, 130)}
        </div>
        <div class="text-center text-sm text-slate-400 mb-4">总体掌握率</div>
        <div class="space-y-3">
          ${[
            { label: '已掌握', value: data.userMastery.mastered, color: 'bg-emerald-500', total: 1400 },
            { label: '学习中', value: data.userMastery.learning, color: 'bg-blue-500', total: 1400 },
            { label: '薄弱点', value: data.userMastery.weak, color: 'bg-amber-400', total: 1400 },
            { label: '未学习', value: data.userMastery.notLearned, color: 'bg-gray-300', total: 1400 },
          ].map(m => `
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full ${m.color}"></span>
              <span class="text-xs text-slate-500 w-14">${m.label}</span>
              <div class="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div class="${m.color} h-full rounded-full" style="width:${(m.value/m.total*100).toFixed(0)}%"></div>
              </div>
              <span class="text-xs font-mono w-8 text-right text-slate-600">${m.value}</span>
            </div>
          `).join('')}
        </div>

        <!-- Node types -->
        <h4 class="font-semibold text-xs text-slate-400 mt-6 mb-3">节点类型</h4>
        <div class="space-y-1.5">
          ${[
            { type: 'KnowledgePoint', label: '知识点节点' },
            { type: 'LegalDomain', label: '法律领域节点' },
            { type: 'LegalProvision', label: '法条节点' },
            { type: 'LegalCase', label: '案例节点' },
            { type: 'StudyRecord', label: '学习记录节点' },
            { type: 'User', label: '用户节点' },
          ].map(n => `
            <div class="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-50 text-xs">
              <span class="font-mono text-blue-600">${n.type}</span>
              <span class="text-slate-400">→ ${n.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Domain Grid -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-th mr-2 text-blue-500"></i>法律领域知识分布</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        ${data.domains.map(d => `
          <div class="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-3 h-3 rounded-full" style="background:${d.color}"></div>
              <span class="font-medium text-sm text-slate-700">${d.name}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="text-slate-400">节点 <span class="text-slate-700 font-medium">${formatNumber(d.nodes)}</span></div>
              <div class="text-slate-400">关系 <span class="text-slate-700 font-medium">${formatNumber(d.relations)}</span></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function initCharts_knowledge_graph(data) {
  const canvas = document.getElementById('knowledgeGraphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  const nodes = data.graphPreview.nodes;
  const edges = data.graphPreview.edges;
  const colors = { domain: '#3b82f6', knowledge: '#10b981', provision: '#8b5cf6', case: '#f59e0b' };
  
  const cx = canvas.width / 2, cy = canvas.height / 2;
  const positions = {};
  nodes.forEach((n, i) => {
    const angle = (i / nodes.length) * Math.PI * 2;
    const radius = n.group === 'domain' ? 80 : n.group === 'knowledge' ? 160 : 220;
    positions[n.id] = {
      x: cx + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
      y: cy + Math.sin(angle) * radius + (Math.random() - 0.5) * 40
    };
  });
  
  // Draw edges
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  edges.forEach(e => {
    const from = positions[e.from], to = positions[e.to];
    if (from && to) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
  });
  
  // Draw nodes
  nodes.forEach(n => {
    const pos = positions[n.id];
    const color = colors[n.group] || '#6366f1';
    const r = n.size / 3;
    
    // Glow
    const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 3);
    gradient.addColorStop(0, color + '20');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Node
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.fill();
    
    // White border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.stroke();
    
    // Label
    ctx.fillStyle = '#475569';
    ctx.font = `${r < 6 ? 9 : 11}px "Noto Sans SC", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(n.label, pos.x, pos.y + r + 14);
  });
}
