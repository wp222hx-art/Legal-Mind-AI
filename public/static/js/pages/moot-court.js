// Moot Court Page
function render_moot_court(data) {
  const roleMap = { judge: { name: '审判长', icon: 'fa-gavel', color: 'text-yellow-400', bg: 'from-yellow-500/10 to-amber-500/10' }, user: { name: '你(原告)', icon: 'fa-user', color: 'text-blue-400', bg: 'from-blue-500/10 to-cyan-500/10' }, opponent: { name: 'AI被告律师', icon: 'fa-robot', color: 'text-red-400', bg: 'from-red-500/10 to-orange-500/10' } };

  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold"><i class="fas fa-gavel mr-2 text-yellow-400"></i>模拟法庭与实战训练</h2>
      <p class="text-sm text-gray-500 mt-1">AI 角色扮演 · 沉浸式辩论 · 四维度评分 · 资深律师视频答疑</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Court Session -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Case Info -->
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="text-xs text-gray-500 mb-1">当前庭审</div>
              <h3 class="font-semibold">${data.currentSession.caseName}</h3>
            </div>
            <div class="flex gap-2">
              <span class="tag tag-blue">${data.currentSession.role}</span>
              <span class="tag tag-yellow">第 ${data.currentSession.round}/${data.currentSession.totalRounds} 轮</span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-gray-400 leading-relaxed mb-4">
            <div class="text-xs text-gray-500 mb-1 font-medium">案件背景</div>
            ${data.currentSession.caseBackground}
          </div>

          <!-- Dialog -->
          <div class="space-y-3 max-h-80 overflow-y-auto pr-1">
            ${data.currentSession.dialogHistory.map(msg => {
              const role = roleMap[msg.role];
              return `
              <div class="flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br ${role.bg} flex items-center justify-center flex-shrink-0 border border-white/5">
                  <i class="fas ${role.icon} ${role.color} text-xs"></i>
                </div>
                <div class="max-w-md">
                  <div class="text-[10px] ${role.color} mb-1 ${msg.role === 'user' ? 'text-right' : ''}">${role.name}</div>
                  <div class="${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}">
                    <p class="text-sm leading-relaxed">${msg.content}</p>
                  </div>
                </div>
              </div>`;
            }).join('')}
          </div>

          <div class="mt-4 flex gap-2">
            <input type="text" placeholder="输入你的辩论发言..." class="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary-500/50 placeholder-gray-600">
            <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-sm font-medium"><i class="fas fa-paper-plane mr-1"></i>发言</button>
          </div>
        </div>

        <!-- Scoring -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-chart-radar mr-2 text-cyan-400"></i>辩论评分</h3>
          <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">
            ${[
              { label: '法律依据', score: data.scoring.legalBasis },
              { label: '论证逻辑', score: data.scoring.logicReasoning },
              { label: '表达流畅', score: data.scoring.expression },
              { label: '应变能力', score: data.scoring.adaptability },
              { label: '综合评分', score: data.scoring.overall },
            ].map((s, i) => `
              <div class="text-center p-3 rounded-xl ${i === 4 ? 'bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/15' : 'bg-white/[0.02] border border-white/5'}">
                ${scoreRingSVG(s.score, 100, i === 4 ? 80 : 60, i === 4 ? '#3b82f6' : '#6366f1', i === 4 ? '#d946ef' : '#a855f7')}
                <div class="text-xs ${i === 4 ? 'text-primary-400 font-medium' : 'text-gray-500'} mt-1">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">
        <!-- Case Library -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-book mr-2 text-blue-400"></i>案件库 (${data.cases.length} 案件)</h3>
          <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
            ${data.cases.map(c => `
              <div class="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/15 transition-all cursor-pointer">
                <div class="font-medium text-sm mb-1">${c.name}</div>
                <div class="flex items-center gap-2 text-xs">
                  <span class="tag ${c.type === '民事' ? 'tag-blue' : c.type === '刑事' ? 'tag-red' : 'tag-yellow'} text-[10px]">${c.type}</span>
                  <span class="tag ${c.difficulty === '简单' ? 'tag-green' : c.difficulty === '中等' ? 'tag-blue' : c.difficulty === '较难' ? 'tag-yellow' : 'tag-red'} text-[10px]">${c.difficulty}</span>
                  <span class="text-gray-600">${c.participants}人参与</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Lawyer Pool -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-user-tie mr-2 text-emerald-400"></i>资深律师库</h3>
          <div class="space-y-2">
            ${data.lawyers.map(l => `
              <div class="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/15 transition-all">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/15 flex items-center justify-center text-sm font-bold text-emerald-400">${l.name[0]}</div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm">${l.name}</div>
                  <div class="text-xs text-gray-500">${l.firm}</div>
                  <div class="text-[10px] text-gray-600">${l.specialization} · ${l.experience}年经验</div>
                </div>
                <div class="text-right">
                  <div class="flex items-center gap-1 text-yellow-400 text-xs"><i class="fas fa-star text-[10px]"></i>${l.rating}</div>
                  <div class="text-[10px] text-gray-600">${l.sessions}场</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- History -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm mb-4"><i class="fas fa-history mr-2 text-gray-400"></i>历史记录</h3>
          <div class="space-y-2">
            ${data.userHistory.map(h => `
              <div class="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] text-xs">
                <div>
                  <div class="font-medium text-sm">${h.case}</div>
                  <span class="text-gray-600">${h.date} · ${h.role}</span>
                </div>
                <span class="font-mono font-bold ${h.score >= 80 ? 'text-emerald-400' : h.score >= 70 ? 'text-blue-400' : 'text-yellow-400'}">${h.score}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
function initCharts_moot_court(data) {}
