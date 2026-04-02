// AI Learning Assistant Page — Clean Theme
function render_learning(data) {
  const d = data.diagnosticReport;
  return `
  <div class="fade-in space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-graduation-cap mr-2 text-sky-500"></i>个性化 AI 学习助手</h2>
        <p class="text-sm text-slate-400 mt-1">苏格拉底式引导问答 · 智能诊断报告 · 知识热力图 · 个性化学习计划</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 text-sm text-slate-700">
          <i class="fas fa-fire text-orange-500 mr-1"></i>连续学习 <span class="font-bold">${data.userProfile.currentStreak}</span> 天
        </div>
      </div>
    </div>

    <!-- User Profile Bar -->
    <div class="glass-card p-4">
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white">张</div>
          <div>
            <div class="font-semibold text-slate-800">${data.userProfile.name}</div>
            <div class="text-xs text-slate-400">${data.userProfile.university} · ${data.userProfile.major} · ${data.userProfile.grade}</div>
          </div>
        </div>
        <div class="flex gap-4 text-center">
          <div><div class="text-lg font-bold gradient-text">${data.userProfile.studyHours}</div><div class="text-[10px] text-slate-400">学习小时</div></div>
          <div><div class="text-lg font-bold text-blue-600">${data.userProfile.completedCourses}</div><div class="text-[10px] text-slate-400">完成课程</div></div>
        </div>
        <div class="flex-1 hidden lg:block">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-slate-400">本周学习进度</span>
            <span class="text-xs font-medium text-slate-600">${data.studyPlan.weeklyCompleted}/${data.studyPlan.weeklyGoal}h</span>
          </div>
          <div class="progress-bar"><div class="progress-bar-fill" style="width:${(data.studyPlan.weeklyCompleted/data.studyPlan.weeklyGoal*100).toFixed(0)}%"></div></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Diagnostic Report -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Score Overview -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-chart-bar mr-2 text-blue-500"></i>学习诊断报告</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div class="text-center">${scoreRingSVG(d.overallScore, 100, 100)}<div class="text-xs text-slate-400 mt-1">综合评分</div></div>
            <div class="text-center p-3 rounded-xl bg-blue-50/50">
              <div class="text-2xl font-bold text-blue-600">${d.studyHoursThisWeek}h</div>
              <div class="text-xs text-slate-400">本周学时</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-violet-50/50">
              <div class="text-2xl font-bold text-violet-600">${d.conversationsThisWeek}</div>
              <div class="text-xs text-slate-400">AI对话次数</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-emerald-50/50">
              <div class="text-2xl font-bold text-emerald-600">+${d.knowledgeGrowth}%</div>
              <div class="text-xs text-slate-400">知识增长</div>
            </div>
          </div>
          <!-- Subject Radar -->
          <div class="h-64"><canvas id="subjectRadarChart"></canvas></div>
        </div>

        <!-- Subject Scores -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4">各科目掌握度</h3>
          <div class="space-y-2">
            ${d.subjectScores.map(s => `
              <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span class="text-sm text-slate-600 w-20">${s.subject}</span>
                <div class="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000 ${s.score >= 85 ? 'bg-emerald-500' : s.score >= 75 ? 'bg-blue-500' : s.score >= 65 ? 'bg-amber-400' : 'bg-red-400'}" style="width:${s.score}%"></div>
                </div>
                <span class="font-mono text-sm w-10 text-right font-medium text-slate-700">${s.score}</span>
                <span class="text-xs w-14 text-right ${s.trend === 'up' ? 'text-emerald-600' : s.trend === 'down' ? 'text-red-500' : 'text-slate-400'}">
                  ${s.trend === 'up' ? '<i class="fas fa-arrow-up"></i>' : s.trend === 'down' ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-minus"></i>'} ${Math.abs(s.change)}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Knowledge Heatmap -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-fire mr-2 text-orange-500"></i>知识热力图 (民法)</h3>
          <div class="overflow-x-auto">
            <div class="min-w-[500px]">
              <div class="grid gap-1.5" style="grid-template-columns: 60px repeat(${d.heatmapLabels.x.length}, 1fr)">
                <div></div>
                ${d.heatmapLabels.x.map(l => `<div class="text-[10px] text-slate-400 text-center py-1">${l}</div>`).join('')}
                ${d.heatmapData.map((row, ri) => `
                  <div class="text-[10px] text-slate-400 flex items-center">${d.heatmapLabels.y[ri]}</div>
                  ${row.map(v => `<div class="heatmap-cell ${getHeatColor(v)}">${v}</div>`).join('')}
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">
        <!-- Today's Plan -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-calendar-day mr-2 text-green-500"></i>今日学习计划</h3>
          <div class="space-y-2">
            ${data.studyPlan.dailyPlan.map(p => `
              <div class="p-3 rounded-xl bg-gray-50/50 border border-gray-100 ${p.status === 'completed' ? 'opacity-60' : ''}">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-slate-400">${p.time}</span>
                  ${p.status === 'completed' ? '<span class="tag tag-green text-[10px]"><i class="fas fa-check"></i> 完成</span>' : p.status === 'in_progress' ? '<span class="tag tag-blue text-[10px]"><i class="fas fa-play"></i> 进行中</span>' : '<span class="text-[10px] text-slate-400 bg-gray-100 px-2 py-0.5 rounded">待开始</span>'}
                </div>
                <div class="font-medium text-sm text-slate-700">${p.subject}</div>
                <div class="text-xs text-slate-400">${p.type}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Weak Points -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-triangle-exclamation mr-2 text-amber-500"></i>薄弱知识点</h3>
          <div class="space-y-2">
            ${d.weakPoints.map(w => `
              <div class="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                <span class="tag ${w.priority === 'high' ? 'tag-red' : w.priority === 'medium' ? 'tag-yellow' : 'tag-blue'} text-[10px]">${w.priority === 'high' ? '高' : w.priority === 'medium' ? '中' : '低'}</span>
                <span class="text-sm flex-1 text-slate-600">${w.point}</span>
                <span class="text-xs font-mono ${w.mastery < 40 ? 'text-red-500' : 'text-amber-500'}">${w.mastery}%</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Peer Comparison -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-users mr-2 text-violet-500"></i>同龄对比</h3>
          <div class="text-center mb-3">
            <div class="text-3xl font-bold gradient-text">Top ${(100 - d.peerComparison.percentile).toFixed(1)}%</div>
            <div class="text-xs text-slate-400 mt-1">超越 ${d.peerComparison.percentile}% 的同龄学生</div>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between p-2 rounded-lg bg-gray-50/50"><span class="text-slate-400">我的排名</span><span class="font-medium text-slate-700">${d.peerComparison.userRank} / ${formatNumber(d.peerComparison.totalStudents)}</span></div>
            <div class="flex justify-between p-2 rounded-lg bg-gray-50/50"><span class="text-slate-400">平均分</span><span class="font-medium text-slate-700">${d.peerComparison.avgScore}</span></div>
            <div class="flex justify-between p-2 rounded-lg bg-gray-50/50"><span class="text-slate-400">最高分</span><span class="font-medium text-slate-700">${d.peerComparison.topStudentScore}</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Socratic Dialog Demo -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-comments mr-2 text-cyan-500"></i>苏格拉底式问答演示</h3>
      <div class="max-w-3xl mx-auto space-y-4">
        ${data.socratesDemo.map(m => m.role === 'user' ? `
          <div class="flex justify-end"><div class="chat-bubble-user max-w-md"><p class="text-sm text-slate-700">${m.content}</p></div></div>
        ` : `
          <div class="flex justify-start gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
              <i class="fas fa-robot text-xs text-white"></i>
            </div>
            <div class="chat-bubble-ai max-w-md"><p class="text-sm leading-relaxed text-slate-700">${m.content}</p></div>
          </div>
        `).join('')}
        <div class="flex justify-start gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
            <i class="fas fa-robot text-xs text-white"></i>
          </div>
          <div class="chat-bubble-ai"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto mt-4 flex gap-2">
        <input type="text" placeholder="输入你的回答..." class="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-400 placeholder-slate-400 text-slate-700">
        <button class="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  </div>`;
}

function initCharts_learning(data) {
  const d = data.diagnosticReport;
  createChart('subjectRadarChart', radarChartConfig(
    d.subjectScores.map(s => s.subject),
    d.subjectScores.map(s => s.score),
    '学科掌握度'
  ));
}
