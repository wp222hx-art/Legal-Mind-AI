// Home / Dashboard Page
function render_home(data) {
  const activityIcons = { study: 'fa-graduation-cap text-blue-400', thesis: 'fa-file-alt text-purple-400', court: 'fa-gavel text-yellow-400', job: 'fa-briefcase text-green-400', report: 'fa-chart-bar text-pink-400' };
  
  return `
  <div class="fade-in space-y-6">
    <!-- Hero Section -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-white/5 p-6 lg:p-8">
      <div class="hero-glow bg-primary-500 -top-20 -left-20"></div>
      <div class="hero-glow bg-accent-500 -bottom-20 -right-20"></div>
      <div class="relative z-10">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold mb-2">
              <span class="gradient-text">Legal-Mind AI</span>
              <span class="text-gray-300"> 数据总览</span>
            </h1>
            <p class="text-gray-400 text-sm lg:text-base max-w-2xl">
              基于 AI-Agent 技术的法律教育 SaaS 平台，面向中国 40 万法学专业学生提供个性化学习、论文辅导、实战训练和就业对接一站式解决方案
            </p>
            <div class="flex items-center gap-4 mt-4">
              <div class="flex items-center gap-2">
                <div class="pulse-dot"></div>
                <span class="text-sm text-emerald-400">系统运行正常</span>
              </div>
              <span class="text-xs text-gray-600">可用性 ${data.systemKPI.systemUptime}</span>
              <span class="text-xs text-gray-600">响应 ${data.systemKPI.apiResponseTime}</span>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="text-center px-5 py-3 rounded-xl bg-white/5 border border-white/5">
              <div class="text-2xl font-bold gradient-text">${formatNumber(data.totalUsers)}</div>
              <div class="text-xs text-gray-500 mt-1">注册用户</div>
            </div>
            <div class="text-center px-5 py-3 rounded-xl bg-white/5 border border-white/5">
              <div class="text-2xl font-bold text-emerald-400">${formatNumber(data.activeToday)}</div>
              <div class="text-xs text-gray-500 mt-1">今日活跃</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="stat-card" style="--accent-start:#3b82f6;--accent-end:#06b6d4">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-xs">AI对话总量</span>
          <i class="fas fa-comments text-blue-400/40"></i>
        </div>
        <div class="text-2xl font-bold">${formatNumber(data.aiConversations)}</div>
        <div class="text-xs text-emerald-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>12.5% 本周</div>
      </div>
      <div class="stat-card" style="--accent-start:#d946ef;--accent-end:#ec4899">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-xs">论文项目</span>
          <i class="fas fa-file-alt text-purple-400/40"></i>
        </div>
        <div class="text-2xl font-bold">${formatNumber(data.thesisProjects)}</div>
        <div class="text-xs text-emerald-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>8.3% 本周</div>
      </div>
      <div class="stat-card" style="--accent-start:#10b981;--accent-end:#059669">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-xs">就业匹配</span>
          <i class="fas fa-briefcase text-emerald-400/40"></i>
        </div>
        <div class="text-2xl font-bold">${formatNumber(data.jobMatches)}</div>
        <div class="text-xs text-emerald-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>15.2% 本周</div>
      </div>
      <div class="stat-card" style="--accent-start:#f59e0b;--accent-end:#ef4444">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-500 text-xs">用户满意度</span>
          <i class="fas fa-star text-yellow-400/40"></i>
        </div>
        <div class="text-2xl font-bold">${data.satisfaction}<span class="text-sm text-gray-500">/5.0</span></div>
        <div class="text-xs text-emerald-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>0.2 本月</div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Weekly Trend -->
      <div class="lg:col-span-2 glass-card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-sm">本周用户与对话趋势</h3>
          <div class="flex gap-2">
            <span class="tag tag-blue"><i class="fas fa-circle text-[6px]"></i> 活跃用户</span>
            <span class="tag tag-purple"><i class="fas fa-circle text-[6px]"></i> AI对话</span>
          </div>
        </div>
        <div class="h-64"><canvas id="weeklyChart"></canvas></div>
      </div>
      <!-- Module Usage -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm mb-4">模块使用分布</h3>
        <div class="h-64"><canvas id="moduleChart"></canvas></div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- System KPI -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm mb-4"><i class="fas fa-tachometer-alt mr-2 text-primary-400"></i>系统性能指标</h3>
        <div class="grid grid-cols-2 gap-3">
          ${Object.entries({
            'RAG检索延迟': data.systemKPI.ragLatency,
            '向量处理速度': data.systemKPI.vectorProcessSpeed,
            '检索召回率': data.systemKPI.recallRate,
            '回答准确率': data.systemKPI.faithfulness,
            '法律引用准确率': data.systemKPI.legalCitationAccuracy,
            '论文完成率': data.systemKPI.thesisCompletionRate,
            '并发用户': data.systemKPI.concurrentUsers.toLocaleString(),
            '系统可用性': data.systemKPI.systemUptime,
          }).map(([k,v]) => `
            <div class="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span class="text-xs text-gray-400">${k}</span>
              <span class="text-sm font-semibold text-gray-200">${v}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm mb-4"><i class="fas fa-bolt mr-2 text-yellow-400"></i>实时动态</h3>
        <div class="space-y-3">
          ${data.recentActivities.map(a => `
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <i class="fas ${activityIcons[a.type]} text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm"><span class="font-medium text-gray-200">${a.user}</span> <span class="text-gray-400">${a.action}</span></p>
              </div>
              <span class="text-xs text-gray-600 whitespace-nowrap">${a.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Eight Modules Overview -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm mb-4"><i class="fas fa-th-large mr-2 text-accent-400"></i>八大核心模块</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        ${[
          { icon: 'fa-robot', name: 'AI Agent 引擎', desc: '意图理解·任务编排·多模型调度', color: 'from-blue-500/20 to-cyan-500/20', page: 'agent' },
          { icon: 'fa-database', name: 'RAG 检索系统', desc: '海量法律文档精准检索与增强生成', color: 'from-violet-500/20 to-purple-500/20', page: 'rag' },
          { icon: 'fa-cubes', name: '私有向量数据库', desc: '个人专属知识空间·智能检索', color: 'from-emerald-500/20 to-teal-500/20', page: 'vector-db' },
          { icon: 'fa-project-diagram', name: '知识图谱引擎', desc: '法律知识关联·学习轨迹追踪', color: 'from-orange-500/20 to-amber-500/20', page: 'knowledge-graph' },
          { icon: 'fa-graduation-cap', name: 'AI 学习助手', desc: '苏格拉底式引导·个性化诊断', color: 'from-pink-500/20 to-rose-500/20', page: 'learning' },
          { icon: 'fa-file-alt', name: '论文辅导', desc: '八阶段全流程论文辅导工作流', color: 'from-indigo-500/20 to-blue-500/20', page: 'thesis' },
          { icon: 'fa-gavel', name: '模拟法庭', desc: 'AI角色扮演·沉浸式辩论训练', color: 'from-red-500/20 to-orange-500/20', page: 'moot-court' },
          { icon: 'fa-briefcase', name: '实习就业', desc: 'AI简历·岗位匹配·面试模拟', color: 'from-cyan-500/20 to-sky-500/20', page: 'career' },
        ].map(m => `
          <a href="/${m.page}" class="nav-item-module block p-4 rounded-xl bg-gradient-to-br ${m.color} border border-white/5 hover:border-white/15 transition-all cursor-pointer group" data-page="${m.page}" onclick="event.preventDefault();navigateTo('${m.page}','/${m.page}');">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas ${m.icon} text-lg opacity-60 group-hover:opacity-100 transition-opacity"></i>
              <span class="font-medium text-sm">${m.name}</span>
            </div>
            <p class="text-xs text-gray-500">${m.desc}</p>
          </a>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function initCharts_home(data) {
  // Weekly trend chart
  createChart('weeklyChart', lineChartConfig(
    data.weeklyGrowth.map(d => d.day),
    [
      { label: '活跃用户', data: data.weeklyGrowth.map(d => d.users), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
      { label: 'AI对话', data: data.weeklyGrowth.map(d => d.conversations), borderColor: '#d946ef', backgroundColor: 'rgba(217,70,239,0.1)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3, yAxisID: 'y1' }
    ]
  ));
  // Add second y axis
  const weeklyChart = Chart.getChart('weeklyChart');
  if (weeklyChart) {
    weeklyChart.options.scales.y1 = { position: 'right', grid: { display: false }, beginAtZero: true };
    weeklyChart.update();
  }

  // Module usage doughnut
  createChart('moduleChart', doughnutChartConfig(
    data.moduleUsage.map(m => m.name),
    data.moduleUsage.map(m => m.value),
    ['#3b82f6', '#d946ef', '#f59e0b', '#10b981', '#6366f1']
  ));
}
