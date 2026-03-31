// AI Learning Assistant Page
function render_learning(data) {
  const d = data.diagnosticReport;
  return `
  <div class="fade-in space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold"><i class="fas fa-graduation-cap mr-2 text-pink-400"></i>个性化 AI 学习助手</h2>
        <p class="text-sm text-gray-500 mt-1">苏格拉底式引导问答 · 智能诊断报告 · 知识热力图 · 个性化学习计划</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500/15 to-rose-500/15 border border-pink-500/20 text-sm">
          <i class="fas fa-fire text-orange-400 mr-1"></i>连续学习 <span class="font-bold text-white">${data.userProfile.currentStreak}</span> 天
        </div>
      </div>
    </div>

    <!-- User Profile Bar -->
    <div class="glass-card p-4">
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-lg font-bold">张</div>
          <div>
            <div class="font-semibold">${data.userProfile.name}</div>
            <div class="text-xs text-gray-500">${data.userProfile.university} · ${data.userProfile.major} · ${data.userProfile.grade}</div>
          </div>
        </div>
        <div class="flex gap-4 text-center">
          <div><div class="text-lg font-bold gradient-text">${data.userProfile.studyHours}</div><div class="text-[10px] text-gray-500">学习小时</div></div>
          <div><div class="text-lg font-bold text-blue-400">${data.userProfile.completedCourses}</div><div class="text-[10px] text-gray-500">完成课程</div></div>
        </div>
        <div class="flex-1 hidden lg:block">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-gray-500">本周学习进度</span>
            <span class="text-xs font-medium">${data.studyPlan.weeklyCompleted}/${data.studyPlan.weeklyGoal}h</span>
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
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-chart-bar mr-2 text-blue-400"></i>学习诊断报告</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div class="text-center">${scoreRingSVG(d.overallScore, 100, 100)}<div class="text-xs text-gray-500 mt-1">综合评分</div></div>
            <div class="text-center p-3 rounded-xl bg-white/[0.02]">
              <div class="text-2xl font-bold text-blue-400">${d.studyHoursThisWeek}h</div>
              <div class="text-xs text-gray-500">本周学时</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-white/[0.02]">
              <div class="text-2xl font-bold text-purple-400">${d.conversationsThisWeek}</div>
              <div class="text-xs text-gray-500">AI对话次数</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-white/[0.02]">
              <div class="text-2xl font-bold text-emerald-400">+${d.knowledgeGrowth}%</div>
              <div class="text-xs text-gray-500">知识增长</div>
            </div>
          </div>
          <!-- Subject Radar -->
          <div class="h-64"><canvas id="subjectRadarChart"></canvas></div>
        </div>

        <!-- Subject Scores -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4">各科目掌握度</h3>
          <div class="space-y-2">
            ${d.subjectScores.map(s => `
              <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                <span class="text-sm w-20">${s.subject}</span>
                <div class="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000 ${s.score >= 85 ? 'bg-emerald-500' : s.score >= 75 ? 'bg-blue-500' : s.score >= 65 ? 'bg-yellow-500' : 'bg-red-500'}" style="width:${s.score}%"></div>
                </div>
                <span class="font-mono text-sm w-10 text-right font-medium">${s.score}</span>
                <span class="text-xs w-14 text-right ${s.trend === 'up' ? 'text-emerald-400' : s.trend === 'down' ? 'text-red-400' : 'text-gray-500'}">
                  ${s.trend === 'up' ? '<i class="fas fa-arrow-up"></i>' : s.trend === 'down' ? '<i class="fas fa-arrow-down"></i>' : '<i class="fas fa-minus"></i>'} ${Math.abs(s.change)}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Knowledge Heatmap -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-fire mr-2 text-orange-400"></i>知识热力图 (民法)</h3>
          <div class="overflow-x-auto">
            <div class="min-w-[500px]">
              <div class="grid gap-1.5" style="grid-template-columns: 60px repeat(${d.heatmapLabels.x.length}, 1fr)">
                <div></div>
                ${d.heatmapLabels.x.map(l => `<div class="text-[10px] text-gray-500 text-center py-1">${l}</div>`).join('')}
                ${d.heatmapData.map((row, ri) => `
                  <div class="text-[10px] text-gray-500 flex items-center">${d.heatmapLabels.y[ri]}</div>
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
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-calendar-day mr-2 text-green-400"></i>今日学习计划</h3>
          <div class="space-y-2">
            ${data.studyPlan.dailyPlan.map(p => `
              <div class="p-3 rounded-xl bg-white/[0.02] border border-white/5 ${p.status === 'completed' ? 'opacity-60' : ''}">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-gray-500">${p.time}</span>
                  ${p.status === 'completed' ? '<span class="tag tag-green text-[10px]"><i class="fas fa-check"></i> 完成</span>' : p.status === 'in_progress' ? '<span class="tag tag-blue text-[10px]"><i class="fas fa-play"></i> 进行中</span>' : '<span class="tag text-[10px]" style="background:rgba(255,255,255,0.05);color:#6b7280;border:1px solid rgba(255,255,255,0.08)">待开始</span>'}
                </div>
                <div class="font-medium text-sm">${p.subject}</div>
                <div class="text-xs text-gray-500">${p.type}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Weak Points -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-exclamation-triangle mr-2 text-yellow-400"></i>薄弱知识点</h3>
          <div class="space-y-2">
            ${d.weakPoints.map(w => `
              <div class="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02]">
                <span class="tag ${w.priority === 'high' ? 'tag-red' : w.priority === 'medium' ? 'tag-yellow' : 'tag-blue'} text-[10px]">${w.priority === 'high' ? '高' : w.priority === 'medium' ? '中' : '低'}</span>
                <span class="text-sm flex-1">${w.point}</span>
                <span class="text-xs font-mono ${w.mastery < 40 ? 'text-red-400' : 'text-yellow-400'}">${w.mastery}%</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Peer Comparison -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-users mr-2 text-violet-400"></i>同龄对比</h3>
          <div class="text-center mb-3">
            <div class="text-3xl font-bold gradient-text">Top ${(100 - d.peerComparison.percentile).toFixed(1)}%</div>
            <div class="text-xs text-gray-500 mt-1">超越 ${d.peerComparison.percentile}% 的同龄学生</div>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between p-2 rounded-lg bg-white/[0.02]"><span class="text-gray-400">我的排名</span><span class="font-medium">${d.peerComparison.userRank} / ${formatNumber(d.peerComparison.totalStudents)}</span></div>
            <div class="flex justify-between p-2 rounded-lg bg-white/[0.02]"><span class="text-gray-400">平均分</span><span class="font-medium">${d.peerComparison.avgScore}</span></div>
            <div class="flex justify-between p-2 rounded-lg bg-white/[0.02]"><span class="text-gray-400">最高分</span><span class="font-medium">${d.peerComparison.topStudentScore}</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Socratic Dialog Demo -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm mb-4"><i class="fas fa-comments mr-2 text-cyan-400"></i>苏格拉底式问答演示</h3>
      <div class="max-w-3xl mx-auto space-y-4">
        ${data.socratesDemo.map(m => m.role === 'user' ? `
          <div class="flex justify-end"><div class="chat-bubble-user max-w-md"><p class="text-sm">${m.content}</p></div></div>
        ` : `
          <div class="flex justify-start gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 mt-1">
              <i class="fas fa-robot text-xs"></i>
            </div>
            <div class="chat-bubble-ai max-w-md"><p class="text-sm leading-relaxed">${m.content}</p></div>
          </div>
        `).join('')}
        <div class="flex justify-start gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 mt-1">
            <i class="fas fa-robot text-xs"></i>
          </div>
          <div class="chat-bubble-ai"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto mt-4 flex gap-2">
        <input type="text" placeholder="输入你的回答..." class="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary-500/50 placeholder-gray-600">
        <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-sm font-medium"><i class="fas fa-paper-plane"></i></button>
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
