// Career / Job Matching Page
function render_career(data) {
  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold"><i class="fas fa-briefcase mr-2 text-cyan-400"></i>实习就业智能匹配</h2>
      <p class="text-sm text-gray-500 mt-1">AI 简历生成 · 岗位双向匹配 · AI 面试模拟 · ${data.firmPool.totalFirms}+ 合作律所</p>
    </div>

    <!-- Application Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      ${[
        { label: '已投递', value: data.applicationStats.totalApplied, icon: 'fa-paper-plane', cs: '--accent-start:#3b82f6;--accent-end:#06b6d4' },
        { label: '面试中', value: data.applicationStats.interviewing, icon: 'fa-video', cs: '--accent-start:#8b5cf6;--accent-end:#6366f1' },
        { label: '已录用', value: data.applicationStats.offered, icon: 'fa-check-circle', cs: '--accent-start:#10b981;--accent-end:#059669' },
        { label: '待回复', value: data.applicationStats.pending, icon: 'fa-clock', cs: '--accent-start:#f59e0b;--accent-end:#ef4444' },
        { label: '面试均分', value: data.interviewSimulation.avgScore, icon: 'fa-chart-line', cs: '--accent-start:#ec4899;--accent-end:#d946ef' },
      ].map(s => `
        <div class="stat-card" style="${s.cs}">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-gray-500">${s.label}</span>
            <i class="fas ${s.icon} text-gray-600 text-sm"></i>
          </div>
          <div class="text-2xl font-bold">${s.value}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Job Matches -->
      <div class="lg:col-span-2 space-y-4">
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-sm"><i class="fas fa-magic mr-2 text-violet-400"></i>AI 智能岗位推荐</h3>
            <span class="text-xs text-gray-500">基于你的画像匹配</span>
          </div>
          <div class="space-y-3">
            ${data.matchedJobs.map(j => `
              <div class="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/15 transition-all">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-semibold text-sm">${j.title}</h4>
                      <span class="tag tag-green text-[10px]">${j.matchScore}% 匹配</span>
                    </div>
                    <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span><i class="fas fa-building mr-1"></i>${j.firm}</span>
                      <span><i class="fas fa-map-marker-alt mr-1"></i>${j.location}</span>
                      <span class="text-emerald-400 font-medium">${j.salary}</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      ${j.requirements.map(r => `<span class="tag text-[10px]" style="background:rgba(255,255,255,0.04);color:#9ca3af;border:1px solid rgba(255,255,255,0.06)">${r}</span>`).join('')}
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    ${scoreRingSVG(j.matchScore, 100, 50, '#10b981', '#06b6d4')}
                  </div>
                </div>
                <div class="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span class="text-xs text-gray-600"><i class="fas fa-clock mr-1"></i>截止: ${j.deadline}</span>
                  <button class="px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/20 text-xs font-medium text-primary-300 hover:bg-primary-500/30 transition-colors">
                    <i class="fas fa-paper-plane mr-1"></i>投递
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interview Score Trend -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-chart-line mr-2 text-pink-400"></i>AI 面试模拟成绩趋势</h3>
          <div class="h-48"><canvas id="interviewChart"></canvas></div>
          <div class="mt-3 space-y-1">
            ${data.interviewSimulation.improvements.map(imp => `
              <div class="flex items-center gap-2 text-xs text-gray-400">
                <i class="fas fa-check-circle text-emerald-400 text-[10px]"></i>
                <span>${imp}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">
        <!-- AI Resume -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-id-card mr-2 text-blue-400"></i>AI 智能简历</h3>
          <div class="p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-accent-500/5 border border-primary-500/10">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xl font-bold">张</div>
              <div>
                <div class="font-bold text-lg">${data.userResume.name}</div>
                <div class="text-xs text-gray-500">${data.userResume.university}</div>
                <div class="text-xs text-gray-500">${data.userResume.major} · GPA ${data.userResume.gpa}</div>
              </div>
            </div>
            <div class="mb-3">
              <div class="text-xs text-gray-500 mb-1.5">核心技能</div>
              <div class="flex flex-wrap gap-1.5">
                ${data.userResume.skills.map(s => `<span class="tag tag-blue text-[10px]">${s}</span>`).join('')}
              </div>
            </div>
            <div class="mb-3">
              <div class="text-xs text-gray-500 mb-1.5">实习经历</div>
              ${data.userResume.experience.map(e => `
                <div class="p-2 rounded-lg bg-white/[0.03] border border-white/5 mb-1.5">
                  <div class="font-medium text-xs">${e.title}</div>
                  <div class="text-[10px] text-gray-600">${e.duration}</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">${e.desc}</div>
                </div>
              `).join('')}
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1.5">目标岗位</div>
              <div class="flex flex-wrap gap-1.5">
                ${data.userResume.targetPositions.map(p => `<span class="tag tag-purple text-[10px]">${p}</span>`).join('')}
              </div>
            </div>
          </div>
          <button class="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/20 text-sm font-medium text-primary-300 hover:bg-primary-500/30 transition-colors">
            <i class="fas fa-download mr-1"></i>导出 PDF 简历
          </button>
        </div>

        <!-- Firm Pool -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-building mr-2 text-emerald-400"></i>律所资源池</h3>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
              <div class="text-xl font-bold gradient-text">${data.firmPool.totalFirms}</div>
              <div class="text-xs text-gray-500">合作律所</div>
            </div>
            <div class="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
              <div class="text-xl font-bold text-yellow-400">${data.firmPool.topFirms}</div>
              <div class="text-xs text-gray-500">顶级律所</div>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-xs text-gray-500 mb-1.5">覆盖城市</div>
            <div class="flex flex-wrap gap-1.5">
              ${data.firmPool.locations.map(l => `<span class="tag tag-blue text-[10px]">${l}</span>`).join('')}
            </div>
          </div>
          <div>
            <div class="text-xs text-gray-500 mb-1.5">业务领域</div>
            <div class="flex flex-wrap gap-1.5">
              ${data.firmPool.industries.map(ind => `<span class="tag tag-purple text-[10px]">${ind}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Interview Simulation Card -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-3"><i class="fas fa-microphone mr-2 text-red-400"></i>AI 面试模拟</h3>
          <div class="text-center mb-3">
            <div class="text-3xl font-bold gradient-text">${data.interviewSimulation.totalSessions}</div>
            <div class="text-xs text-gray-500">已完成模拟场次</div>
          </div>
          <button class="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/20 text-sm font-medium text-red-300 hover:bg-red-500/30 transition-colors">
            <i class="fas fa-play mr-1"></i>开始模拟面试
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

function initCharts_career(data) {
  createChart('interviewChart', {
    type: 'line',
    data: {
      labels: data.interviewSimulation.recentScores.map((_, i) => `第${i+1}次`),
      datasets: [{
        label: '面试评分',
        data: data.interviewSimulation.recentScores,
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236,72,153,0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#ec4899',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, min: 60, max: 100 }
      }
    }
  });
}
