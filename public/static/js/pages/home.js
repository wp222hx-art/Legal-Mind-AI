// Home / Dashboard Page — Clean & Fresh Legal Theme
function render_home(data) {
  const activityIcons = {
    study: 'fa-graduation-cap text-blue-500',
    thesis: 'fa-pen-fancy text-violet-500',
    court: 'fa-gavel text-amber-500',
    job: 'fa-briefcase text-emerald-500',
    report: 'fa-chart-bar text-rose-500'
  };

  const modules = [
    { icon: 'fa-robot',            name: 'AI Agent 引擎',      desc: '多模型调度 · 意图理解 · 任务编排 · 法律工具链集成',                stat: '5 个智能体',    color: '#2563eb', bg: '#eff6ff', page: 'agent' },
    { icon: 'fa-magnifying-glass', name: 'RAG 检索增强',       desc: '5200万+ 裁判文书精准检索，溯源引用与增强生成',                     stat: '召回率 92.3%',   color: '#7c3aed', bg: '#f5f3ff', page: 'rag' },
    { icon: 'fa-database',         name: '私有向量数据库',     desc: '1.86 亿向量 · Milvus 驱动 · 个人知识空间',                        stat: '12ms 查询',     color: '#059669', bg: '#ecfdf5', page: 'vector-db' },
    { icon: 'fa-diagram-project',  name: '知识图谱引擎',       desc: 'Neo4j 245万节点 · 法律知识关联推理 · 薄弱点识别',                  stat: '12 个领域',     color: '#d97706', bg: '#fffbeb', page: 'knowledge-graph' },
    { icon: 'fa-graduation-cap',   name: 'AI 学习助手',        desc: '苏格拉底式引导问答 · 智能诊断报告 · 知识热力图',                   stat: '满意度 4.6',    color: '#0284c7', bg: '#f0f9ff', page: 'learning' },
    { icon: 'fa-pen-fancy',        name: '论文辅导工作流',     desc: '选题 → 文献 → 框架 → 案例 → 评审 → 格式 → 查重 → 答辩',          stat: '完成率 86.5%',  color: '#7c3aed', bg: '#f5f3ff', page: 'thesis' },
    { icon: 'fa-gavel',            name: '模拟法庭训练',       desc: 'AI 扮演法官/律师 · 沉浸式辩论 · 四维度评分',                      stat: '100+ 案例',     color: '#dc2626', bg: '#fef2f2', page: 'moot-court' },
    { icon: 'fa-briefcase',        name: '实习就业匹配',       desc: 'AI 简历生成 · 岗位双向匹配 · AI 面试模拟',                        stat: '236+ 律所',     color: '#0891b2', bg: '#ecfeff', page: 'career' },
  ];

  return `
  <div class="fade-in">
    <!-- Welcome Bar -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-slate-800">平台概览</h1>
        <p class="text-sm text-slate-400 mt-0.5">Legal-Mind AI 法律智能学习平台运营数据</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="pulse-dot"></div>
        <span class="text-xs text-emerald-600 font-medium">系统正常</span>
        <span class="text-xs text-slate-400">${data.systemKPI.systemUptime} SLA</span>
      </div>
    </div>

    <!-- Top KPI Row -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      ${[
        { label: '注册用户',    value: formatNumber(data.totalUsers),      icon: 'fa-users',          color: '#2563eb', bg: '#eff6ff' },
        { label: '今日活跃',    value: formatNumber(data.activeToday),     icon: 'fa-bolt',           color: '#059669', bg: '#ecfdf5' },
        { label: 'AI 对话',     value: formatNumber(data.aiConversations), icon: 'fa-comments',       color: '#7c3aed', bg: '#f5f3ff' },
        { label: '论文项目',    value: formatNumber(data.thesisProjects),  icon: 'fa-pen-fancy',      color: '#d97706', bg: '#fffbeb' },
        { label: '就业匹配',    value: formatNumber(data.jobMatches),      icon: 'fa-briefcase',      color: '#0891b2', bg: '#ecfeff' },
        { label: '用户满意度',  value: data.satisfaction + '/5',           icon: 'fa-star',           color: '#f59e0b', bg: '#fffbeb' },
      ].map(k => `
        <div class="stat-card flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${k.bg}">
            <i class="fas ${k.icon} text-sm" style="color:${k.color}"></i>
          </div>
          <div class="min-w-0">
            <div class="text-lg font-bold text-slate-800 leading-tight">${k.value}</div>
            <div class="text-[11px] text-slate-400">${k.label}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Eight Modules — Visual Core -->
    <section class="mb-6">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-base font-bold text-slate-800">核心功能模块</h2>
        <span class="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">8 个模块</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${modules.map((m, i) => `
          <a href="/${m.page}" onclick="event.preventDefault();navigateTo('${m.page}','/${m.page}');"
             class="module-card group" style="--mc:${m.color};animation:fadeSlideUp 0.35s ease ${i * 0.04}s both">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${m.bg}">
                <i class="fas ${m.icon} text-base" style="color:${m.color}"></i>
              </div>
              <h3 class="text-[13px] font-semibold text-slate-800">${m.name}</h3>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed mb-3" style="min-height:32px">${m.desc}</p>
            <div class="flex items-center justify-between pt-2 border-t border-gray-100">
              <span class="text-[11px] font-medium" style="color:${m.color}">${m.stat}</span>
              <i class="fas fa-arrow-right text-[10px] text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all"></i>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <!-- Data Dashboard Row -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
      <!-- Left: Trend Chart -->
      <div class="lg:col-span-8">
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-slate-700">本周活跃趋势</h3>
            <div class="flex gap-4 text-[11px] text-slate-400">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-[3px] bg-blue-500 rounded-full inline-block"></span>用户</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-[3px] bg-violet-500 rounded-full inline-block"></span>对话</span>
            </div>
          </div>
          <div class="h-52"><canvas id="weeklyChart"></canvas></div>
        </div>
      </div>

      <!-- Right: Module Usage + System -->
      <div class="lg:col-span-4 space-y-5">
        <div class="glass-card p-5">
          <h3 class="text-sm font-semibold text-slate-700 mb-3">模块使用分布</h3>
          <div class="h-40"><canvas id="moduleChart"></canvas></div>
        </div>
        <div class="glass-card p-4">
          <h3 class="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
            <i class="fas fa-heart-pulse text-emerald-500 text-[10px]"></i> 系统状态
          </h3>
          <div class="space-y-0">
            ${[
              { l: 'API 响应',  v: data.systemKPI.apiResponseTime },
              { l: 'RAG 延迟',  v: data.systemKPI.ragLatency },
              { l: '向量速度',  v: data.systemKPI.vectorProcessSpeed },
              { l: '法律引用',  v: data.systemKPI.legalCitationAccuracy },
              { l: '并发数',    v: data.systemKPI.concurrentUsers.toLocaleString() },
            ].map(k => `
              <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span class="text-[11px] text-slate-400">${k.l}</span>
                <span class="text-xs font-mono font-medium text-slate-700">${k.v}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Activity Feed -->
    <section class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          实时动态
        </h3>
        <span class="text-[11px] text-slate-400">最近更新</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        ${data.recentActivities.map(a => `
          <div class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
            <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <i class="fas ${activityIcons[a.type]} text-xs"></i>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs font-medium text-slate-700 truncate">${a.user}</p>
              <p class="text-[10px] text-slate-400 truncate">${a.action}</p>
              <p class="text-[9px] text-slate-300 mt-0.5">${a.time}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  </div>`;
}

function initCharts_home(data) {
  // Weekly trend chart
  createChart('weeklyChart', lineChartConfig(
    data.weeklyGrowth.map(d => d.day),
    [
      { label: '活跃用户', data: data.weeklyGrowth.map(d => d.users), borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.05)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0, pointHoverRadius: 4 },
      { label: 'AI对话', data: data.weeklyGrowth.map(d => d.conversations), borderColor: '#7c3aed', backgroundColor: 'rgba(124,58,237,0.03)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, yAxisID: 'y1' }
    ]
  ));
  const wc = Chart.getChart('weeklyChart');
  if (wc) {
    wc.options.scales.y1 = { position: 'right', grid: { display: false }, beginAtZero: true, ticks: { color: '#94a3b8' } };
    wc.options.plugins.legend = { display: false };
    wc.update();
  }

  // Module usage doughnut
  createChart('moduleChart', doughnutChartConfig(
    data.moduleUsage.map(m => m.name),
    data.moduleUsage.map(m => m.value),
    ['#2563eb', '#7c3aed', '#d97706', '#059669', '#6366f1']
  ));
}
