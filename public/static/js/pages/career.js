// Career / Job Matching Page — Clean Theme
function render_career(data) {
  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-briefcase mr-2 text-cyan-500"></i>实习就业智能匹配</h2>
      <p class="text-sm text-slate-400 mt-1">AI 简历生成 · 岗位双向匹配 · AI 面试模拟 · ${data.firmPool.totalFirms}+ 合作律所</p>
    </div>

    <!-- Application Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      ${[
        { label: '已投递', value: data.applicationStats.totalApplied, icon: 'fa-paper-plane', color: '#2563eb', bg: '#eff6ff' },
        { label: '面试中', value: data.applicationStats.interviewing, icon: 'fa-video', color: '#7c3aed', bg: '#f5f3ff' },
        { label: '已录用', value: data.applicationStats.offered, icon: 'fa-circle-check', color: '#059669', bg: '#ecfdf5' },
        { label: '待回复', value: data.applicationStats.pending, icon: 'fa-clock', color: '#d97706', bg: '#fffbeb' },
        { label: '面试均分', value: data.interviewSimulation.avgScore, icon: 'fa-chart-line', color: '#ec4899', bg: '#fdf2f8' },
      ].map(s => `
        <div class="stat-card">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${s.bg}">
              <i class="fas ${s.icon} text-xs" style="color:${s.color}"></i>
            </div>
            <span class="text-xs text-slate-400">${s.label}</span>
          </div>
          <div class="text-2xl font-bold text-slate-800">${s.value}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Job Matches -->
      <div class="lg:col-span-2 space-y-4">
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-sm text-slate-700"><i class="fas fa-wand-magic-sparkles mr-2 text-violet-500"></i>AI 智能岗位推荐</h3>
            <span class="text-xs text-slate-400">基于你的画像匹配</span>
          </div>
          <div class="space-y-3">
            ${data.matchedJobs.map(j => `
              <div class="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-semibold text-sm text-slate-700">${j.title}</h4>
                      <span class="tag tag-green text-[10px]">${j.matchScore}% 匹配</span>
                    </div>
                    <div class="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span><i class="fas fa-building mr-1"></i>${j.firm}</span>
                      <span><i class="fas fa-location-dot mr-1"></i>${j.location}</span>
                      <span class="text-emerald-600 font-medium">${j.salary}</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      ${j.requirements.map(r => `<span class="text-[10px] text-slate-500 bg-gray-100 px-2 py-0.5 rounded">${r}</span>`).join('')}
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    ${scoreRingSVG(j.matchScore, 100, 50, '#059669', '#34d399')}
                  </div>
                </div>
                <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span class="text-xs text-slate-400"><i class="fas fa-clock mr-1"></i>截止: ${j.deadline}</span>
                  <button class="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    <i class="fas fa-paper-plane mr-1"></i>投递
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interview Score Trend -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-chart-line mr-2 text-pink-500"></i>AI 面试模拟成绩趋势</h3>
          <div class="h-48"><canvas id="interviewChart"></canvas></div>
          <div class="mt-3 space-y-1">
            ${data.interviewSimulation.improvements.map(imp => `
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <i class="fas fa-circle-check text-emerald-500 text-[10px]"></i>
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
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-id-card mr-2 text-blue-500"></i>AI 智能简历</h3>
          <div class="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl font-bold text-white shadow-sm">张</div>
              <div>
                <div class="font-bold text-lg text-slate-800">${data.userResume.name}</div>
                <div class="text-xs text-slate-400">${data.userResume.university}</div>
                <div class="text-xs text-slate-400">${data.userResume.major} · GPA ${data.userResume.gpa}</div>
              </div>
            </div>
            <div class="mb-3">
              <div class="text-xs text-slate-400 mb-1.5">核心技能</div>
              <div class="flex flex-wrap gap-1.5">
                ${data.userResume.skills.map(s => `<span class="tag tag-blue text-[10px]">${s}</span>`).join('')}
              </div>
            </div>
            <div class="mb-3">
              <div class="text-xs text-slate-400 mb-1.5">实习经历</div>
              ${data.userResume.experience.map(e => `
                <div class="p-2 rounded-lg bg-white/80 border border-gray-100 mb-1.5">
                  <div class="font-medium text-xs text-slate-700">${e.title}</div>
                  <div class="text-[10px] text-slate-400">${e.duration}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${e.desc}</div>
                </div>
              `).join('')}
            </div>
            <div>
              <div class="text-xs text-slate-400 mb-1.5">目标岗位</div>
              <div class="flex flex-wrap gap-1.5">
                ${data.userResume.targetPositions.map(p => `<span class="tag tag-purple text-[10px]">${p}</span>`).join('')}
              </div>
            </div>
          </div>
          <button class="w-full mt-3 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <i class="fas fa-download mr-1"></i>导出 PDF 简历
          </button>
        </div>

        <!-- Firm Pool -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-building mr-2 text-emerald-500"></i>律所资源池</h3>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
              <div class="text-xl font-bold gradient-text">${data.firmPool.totalFirms}</div>
              <div class="text-xs text-slate-400">合作律所</div>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
              <div class="text-xl font-bold text-amber-500">${data.firmPool.topFirms}</div>
              <div class="text-xs text-slate-400">顶级律所</div>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-xs text-slate-400 mb-1.5">覆盖城市</div>
            <div class="flex flex-wrap gap-1.5">
              ${data.firmPool.locations.map(l => `<span class="tag tag-blue text-[10px]">${l}</span>`).join('')}
            </div>
          </div>
          <div>
            <div class="text-xs text-slate-400 mb-1.5">业务领域</div>
            <div class="flex flex-wrap gap-1.5">
              ${data.firmPool.industries.map(ind => `<span class="tag tag-purple text-[10px]">${ind}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Interview Simulation Card -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-3"><i class="fas fa-microphone mr-2 text-red-500"></i>AI 面试模拟</h3>
          <div class="text-center mb-3">
            <div class="text-3xl font-bold gradient-text">${data.interviewSimulation.totalSessions}</div>
            <div class="text-xs text-slate-400">已完成模拟场次</div>
          </div>
          <button class="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
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
        backgroundColor: 'rgba(236,72,153,0.06)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#ec4899',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: '#f1f5f9' }, min: 60, max: 100, ticks: { color: '#94a3b8' } }
      }
    }
  });
}
