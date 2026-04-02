// Home / Dashboard Page — Redesigned
function render_home(data) {
  const activityIcons = { study: 'fa-graduation-cap text-blue-400', thesis: 'fa-file-alt text-purple-400', court: 'fa-gavel text-yellow-400', job: 'fa-briefcase text-green-400', report: 'fa-chart-bar text-pink-400' };

  const modules = [
    { icon: 'fa-robot', name: 'AI Agent 引擎', desc: '多模型调度·意图理解·任务编排·法律工具链集成', stat: '5 个智能体运行中', statIcon: 'fa-circle text-emerald-400', color: '#3b82f6', bg: 'from-blue-600/20 via-blue-500/10 to-cyan-500/5', border: 'hover:border-blue-500/30', page: 'agent' },
    { icon: 'fa-database', name: 'RAG 检索增强', desc: '5200万+裁判文书·精准检索·溯源引用·增强生成', stat: '召回率 92.3%', statIcon: 'fa-bolt text-yellow-400', color: '#8b5cf6', bg: 'from-violet-600/20 via-violet-500/10 to-purple-500/5', border: 'hover:border-violet-500/30', page: 'rag' },
    { icon: 'fa-cubes', name: '私有向量数据库', desc: '1.86亿向量·个人知识空间·Milvus 2.x 驱动', stat: '12ms 平均查询', statIcon: 'fa-tachometer-alt text-cyan-400', color: '#10b981', bg: 'from-emerald-600/20 via-emerald-500/10 to-teal-500/5', border: 'hover:border-emerald-500/30', page: 'vector-db' },
    { icon: 'fa-project-diagram', name: '知识图谱引擎', desc: 'Neo4j 图数据库·245万节点·知识关联推理', stat: '12 个法律领域', statIcon: 'fa-sitemap text-orange-400', color: '#f59e0b', bg: 'from-amber-600/20 via-orange-500/10 to-yellow-500/5', border: 'hover:border-amber-500/30', page: 'knowledge-graph' },
    { icon: 'fa-graduation-cap', name: 'AI 学习助手', desc: '苏格拉底式引导问答·智能诊断报告·知识热力图', stat: '满意度 4.6/5.0', statIcon: 'fa-star text-yellow-400', color: '#ec4899', bg: 'from-pink-600/20 via-pink-500/10 to-rose-500/5', border: 'hover:border-pink-500/30', page: 'learning' },
    { icon: 'fa-file-alt', name: '论文辅导工作流', desc: '选题→文献→框架→案例→评审→格式→查重→答辩', stat: '完成率 86.5%', statIcon: 'fa-check-circle text-emerald-400', color: '#6366f1', bg: 'from-indigo-600/20 via-indigo-500/10 to-blue-500/5', border: 'hover:border-indigo-500/30', page: 'thesis' },
    { icon: 'fa-gavel', name: '模拟法庭训练', desc: 'AI扮演法官/律师·沉浸式辩论·四维度评分体系', stat: '100+ 经典案例', statIcon: 'fa-book text-blue-400', color: '#ef4444', bg: 'from-red-600/20 via-red-500/10 to-orange-500/5', border: 'hover:border-red-500/30', page: 'moot-court' },
    { icon: 'fa-briefcase', name: '实习就业匹配', desc: 'AI简历生成·岗位双向匹配·AI面试模拟训练', stat: '236+ 合作律所', statIcon: 'fa-building text-teal-400', color: '#06b6d4', bg: 'from-cyan-600/20 via-cyan-500/10 to-sky-500/5', border: 'hover:border-cyan-500/30', page: 'career' },
  ];

  return `
  <div class="fade-in">
    <!-- ===== HERO: 一屏核心展示 ===== -->
    <section class="relative overflow-hidden rounded-2xl mb-6" style="background: linear-gradient(135deg, #0f172a 0%, #1a1a3e 50%, #0f172a 100%);">
      <div class="hero-glow bg-blue-600" style="top:-60px;left:-40px;width:500px;height:500px;opacity:0.12"></div>
      <div class="hero-glow bg-violet-600" style="bottom:-80px;right:-40px;width:450px;height:450px;opacity:0.1"></div>
      <div class="hero-glow bg-cyan-500" style="top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;opacity:0.06"></div>
      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image:radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px);background-size:24px 24px"></div>
      
      <div class="relative z-10 p-6 lg:p-10">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div class="max-w-xl">
            <div class="flex items-center gap-2 mb-4">
              <div class="pulse-dot"></div>
              <span class="text-xs text-emerald-400 font-medium tracking-wide">SYSTEM ONLINE</span>
              <span class="text-xs text-gray-600 ml-2">v1.0 | ${data.systemKPI.systemUptime} SLA</span>
            </div>
            <h1 class="text-3xl lg:text-4xl font-extrabold leading-tight mb-3">
              <span class="gradient-text">Legal-Mind AI</span>
            </h1>
            <p class="text-base lg:text-lg text-gray-300 font-light leading-relaxed">
              法律智能学习与职业发展平台
            </p>
            <p class="text-sm text-gray-500 mt-2 leading-relaxed max-w-lg">
              基于 AI-Agent + RAG + 知识图谱技术底座，面向 40 万法学学生提供千人千面的个性化学习体验
            </p>
          </div>
          <!-- Hero KPI cluster -->
          <div class="grid grid-cols-3 gap-3 lg:gap-4">
            ${[
              { value: formatNumber(data.totalUsers), label: '注册用户', sub: '+2.3k 本月', color: 'text-white' },
              { value: formatNumber(data.activeToday), label: '今日活跃', sub: '峰值 9,218', color: 'text-emerald-400' },
              { value: formatNumber(data.aiConversations), label: 'AI 对话', sub: '+12.5% 周增长', color: 'text-blue-400' },
            ].map(k => `
              <div class="text-center p-3 lg:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
                <div class="text-xl lg:text-2xl font-bold ${k.color}">${k.value}</div>
                <div class="text-[11px] text-gray-400 mt-1">${k.label}</div>
                <div class="text-[10px] text-gray-600 mt-0.5">${k.sub}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 八大核心模块（视觉焦点） ===== -->
    <section class="mb-6">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="text-lg font-bold text-gray-100">八大核心模块</h2>
          <p class="text-xs text-gray-500 mt-0.5">AI-Agent 驱动的法学教育全生态能力矩阵</p>
        </div>
        <div class="hidden lg:flex items-center gap-1.5 text-[10px] text-gray-600">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 全部在线
        </div>
      </div>

      <!-- Top row: 4 modules, larger -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        ${modules.slice(0, 4).map((m, i) => `
          <a href="/${m.page}" onclick="event.preventDefault();navigateTo('${m.page}','/${m.page}');" class="module-card group block relative overflow-hidden rounded-2xl bg-gradient-to-br ${m.bg} border border-white/[0.06] ${m.border} p-5 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg cursor-pointer" style="--mc:${m.color};animation:fadeSlideUp 0.4s ease ${i * 0.06}s both">
            <!-- Subtle glow -->
            <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" style="background:${m.color};filter:blur(40px)"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${m.color}18;border:1px solid ${m.color}25">
                  <i class="fas ${m.icon}" style="color:${m.color}"></i>
                </div>
                <i class="fas fa-arrow-right text-xs text-gray-700 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all"></i>
              </div>
              <h3 class="font-semibold text-[15px] text-gray-100 mb-1.5">${m.name}</h3>
              <p class="text-xs text-gray-500 leading-relaxed mb-3 min-h-[32px]">${m.desc}</p>
              <div class="flex items-center gap-1.5 text-[11px] text-gray-400">
                <i class="fas ${m.statIcon} text-[9px]"></i>
                <span>${m.stat}</span>
              </div>
            </div>
          </a>
        `).join('')}
      </div>

      <!-- Bottom row: 4 modules -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        ${modules.slice(4).map((m, i) => `
          <a href="/${m.page}" onclick="event.preventDefault();navigateTo('${m.page}','/${m.page}');" class="module-card group block relative overflow-hidden rounded-2xl bg-gradient-to-br ${m.bg} border border-white/[0.06] ${m.border} p-5 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg cursor-pointer" style="--mc:${m.color};animation:fadeSlideUp 0.4s ease ${(i+4) * 0.06}s both">
            <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" style="background:${m.color};filter:blur(40px)"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${m.color}18;border:1px solid ${m.color}25">
                  <i class="fas ${m.icon}" style="color:${m.color}"></i>
                </div>
                <i class="fas fa-arrow-right text-xs text-gray-700 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all"></i>
              </div>
              <h3 class="font-semibold text-[15px] text-gray-100 mb-1.5">${m.name}</h3>
              <p class="text-xs text-gray-500 leading-relaxed mb-3 min-h-[32px]">${m.desc}</p>
              <div class="flex items-center gap-1.5 text-[11px] text-gray-400">
                <i class="fas ${m.statIcon} text-[9px]"></i>
                <span>${m.stat}</span>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <!-- ===== 数据看板区 ===== -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      <!-- 左侧：趋势图 + KPI -->
      <div class="lg:col-span-8 space-y-4">
        <!-- KPI row -->
        <div class="grid grid-cols-4 gap-3">
          ${[
            { label: '论文项目', value: formatNumber(data.thesisProjects), delta: '+8.3%', icon: 'fa-file-alt', cs: '--accent-start:#d946ef;--accent-end:#ec4899' },
            { label: '就业匹配', value: formatNumber(data.jobMatches), delta: '+15.2%', icon: 'fa-briefcase', cs: '--accent-start:#10b981;--accent-end:#059669' },
            { label: '用户满意度', value: data.satisfaction + '/5.0', delta: '+0.2', icon: 'fa-star', cs: '--accent-start:#f59e0b;--accent-end:#ef4444' },
            { label: 'AI 准确率', value: data.accuracy + '%', delta: '+1.4%', icon: 'fa-bullseye', cs: '--accent-start:#3b82f6;--accent-end:#6366f1' },
          ].map(k => `
            <div class="stat-card" style="${k.cs}">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-500 text-[11px]">${k.label}</span>
                <i class="fas ${k.icon} text-gray-700 text-xs"></i>
              </div>
              <div class="text-lg font-bold">${k.value}</div>
              <div class="text-[10px] text-emerald-400/80 mt-0.5"><i class="fas fa-arrow-up mr-0.5"></i>${k.delta}</div>
            </div>
          `).join('')}
        </div>

        <!-- Chart -->
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-sm text-gray-200">活跃趋势</h3>
            <div class="flex gap-3 text-[11px]">
              <span class="flex items-center gap-1.5 text-gray-500"><span class="w-2.5 h-[3px] rounded-full bg-blue-500 inline-block"></span>活跃用户</span>
              <span class="flex items-center gap-1.5 text-gray-500"><span class="w-2.5 h-[3px] rounded-full bg-violet-500 inline-block"></span>AI 对话</span>
            </div>
          </div>
          <div class="h-52"><canvas id="weeklyChart"></canvas></div>
        </div>
      </div>

      <!-- 右侧：模块分布 + 系统状态 -->
      <div class="lg:col-span-4 space-y-4">
        <!-- Doughnut -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-gray-200 mb-3">模块使用分布</h3>
          <div class="h-44"><canvas id="moduleChart"></canvas></div>
        </div>

        <!-- System KPI compact -->
        <div class="glass-card p-4">
          <h3 class="font-semibold text-xs text-gray-400 mb-3 flex items-center gap-1.5">
            <i class="fas fa-heartbeat text-emerald-500 text-[10px]"></i> 系统健康
          </h3>
          <div class="space-y-2">
            ${[
              { label: 'API 响应', value: data.systemKPI.apiResponseTime, good: true },
              { label: 'RAG 延迟', value: data.systemKPI.ragLatency, good: true },
              { label: '向量速度', value: data.systemKPI.vectorProcessSpeed, good: true },
              { label: '法律引用', value: data.systemKPI.legalCitationAccuracy, good: true },
              { label: '并发数', value: data.systemKPI.concurrentUsers.toLocaleString(), good: true },
            ].map(k => `
              <div class="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
                <span class="text-[11px] text-gray-500">${k.label}</span>
                <span class="text-[12px] font-mono font-medium text-gray-300">${k.value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 实时动态 ===== -->
    <section class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-sm text-gray-200 flex items-center gap-2">
          <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
          实时动态
        </h3>
        <span class="text-[10px] text-gray-600">自动刷新</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        ${data.recentActivities.map((a, i) => `
          <div class="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors" style="animation:fadeSlideUp 0.3s ease ${i*0.05}s both">
            <div class="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
              <i class="fas ${activityIcons[a.type]} text-xs"></i>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs truncate"><span class="font-medium text-gray-300">${a.user}</span></p>
              <p class="text-[10px] text-gray-500 truncate">${a.action}</p>
              <p class="text-[9px] text-gray-700 mt-0.5">${a.time}</p>
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
      { label: '活跃用户', data: data.weeklyGrowth.map(d => d.users), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)', fill: true, tension: 0.45, borderWidth: 2, pointRadius: 0, pointHoverRadius: 4 },
      { label: 'AI对话', data: data.weeklyGrowth.map(d => d.conversations), borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.06)', fill: true, tension: 0.45, borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, yAxisID: 'y1' }
    ]
  ));
  const weeklyChart = Chart.getChart('weeklyChart');
  if (weeklyChart) {
    weeklyChart.options.scales.y1 = { position: 'right', grid: { display: false }, beginAtZero: true };
    weeklyChart.options.plugins.legend = { display: false };
    weeklyChart.update();
  }

  // Module usage doughnut
  createChart('moduleChart', doughnutChartConfig(
    data.moduleUsage.map(m => m.name),
    data.moduleUsage.map(m => m.value),
    ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#6366f1']
  ));
}
