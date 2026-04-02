// Moot Court Page — Clean Theme
function render_moot_court(data) {
  const roleMap = {
    judge: { name: '审判长', icon: 'fa-gavel', color: 'text-amber-600', bg: 'from-amber-50 to-amber-100' },
    user: { name: '你(原告)', icon: 'fa-user', color: 'text-blue-600', bg: 'from-blue-50 to-blue-100' },
    opponent: { name: 'AI被告律师', icon: 'fa-robot', color: 'text-red-600', bg: 'from-red-50 to-red-100' }
  };

  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-gavel mr-2 text-amber-500"></i>模拟法庭与实战训练</h2>
      <p class="text-sm text-slate-400 mt-1">AI 角色扮演 · 沉浸式辩论 · 四维度评分 · 资深律师视频答疑</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Court Session -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Case Info -->
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="text-xs text-slate-400 mb-1">当前庭审</div>
              <h3 class="font-semibold text-slate-800">${data.currentSession.caseName}</h3>
            </div>
            <div class="flex gap-2">
              <span class="tag tag-blue">${data.currentSession.role}</span>
              <span class="tag tag-yellow">第 ${data.currentSession.round}/${data.currentSession.totalRounds} 轮</span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-slate-500 leading-relaxed mb-4">
            <div class="text-xs text-slate-400 mb-1 font-medium">案件背景</div>
            ${data.currentSession.caseBackground}
          </div>

          <!-- Dialog -->
          <div class="space-y-3 max-h-80 overflow-y-auto pr-1">
            ${data.currentSession.dialogHistory.map(msg => {
              const role = roleMap[msg.role];
              return `
              <div class="flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br ${role.bg} flex items-center justify-center flex-shrink-0 border border-gray-200">
                  <i class="fas ${role.icon} ${role.color} text-xs"></i>
                </div>
                <div class="max-w-md">
                  <div class="text-[10px] ${role.color} mb-1 ${msg.role === 'user' ? 'text-right' : ''}">${role.name}</div>
                  <div class="${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}">
                    <p class="text-sm leading-relaxed text-slate-700">${msg.content}</p>
                  </div>
                </div>
              </div>`;
            }).join('')}
          </div>

          <div class="mt-4 flex gap-2">
            <input type="text" placeholder="输入你的辩论发言..." class="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-400 placeholder-slate-400 text-slate-700">
            <button class="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"><i class="fas fa-paper-plane mr-1"></i>发言</button>
          </div>
        </div>

        <!-- Scoring -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-chart-simple mr-2 text-cyan-500"></i>辩论评分</h3>
          <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">
            ${[
              { label: '法律依据', score: data.scoring.legalBasis },
              { label: '论证逻辑', score: data.scoring.logicReasoning },
              { label: '表达流畅', score: data.scoring.expression },
              { label: '应变能力', score: data.scoring.adaptability },
              { label: '综合评分', score: data.scoring.overall },
            ].map((s, i) => `
              <div class="text-center p-3 rounded-xl ${i === 4 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50/50 border border-gray-100'}">
                ${scoreRingSVG(s.score, 100, i === 4 ? 80 : 60, i === 4 ? '#2563eb' : '#6366f1', i === 4 ? '#60a5fa' : '#a78bfa')}
                <div class="text-xs ${i === 4 ? 'text-blue-600 font-medium' : 'text-slate-400'} mt-1">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-4">
        <!-- Case Library -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-book mr-2 text-blue-500"></i>案件库 (${data.cases.length} 案件)</h3>
          <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
            ${data.cases.map(c => `
              <div class="p-3 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-blue-200 transition-all cursor-pointer">
                <div class="font-medium text-sm text-slate-700 mb-1">${c.name}</div>
                <div class="flex items-center gap-2 text-xs">
                  <span class="tag ${c.type === '民事' ? 'tag-blue' : c.type === '刑事' ? 'tag-red' : 'tag-yellow'} text-[10px]">${c.type}</span>
                  <span class="tag ${c.difficulty === '简单' ? 'tag-green' : c.difficulty === '中等' ? 'tag-blue' : c.difficulty === '较难' ? 'tag-yellow' : 'tag-red'} text-[10px]">${c.difficulty}</span>
                  <span class="text-slate-400">${c.participants}人参与</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Lawyer Pool -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-user-tie mr-2 text-emerald-500"></i>资深律师库</h3>
          <div class="space-y-2">
            ${data.lawyers.map(l => `
              <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-emerald-200 transition-all">
                <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-sm font-bold text-emerald-600">${l.name[0]}</div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm text-slate-700">${l.name}</div>
                  <div class="text-xs text-slate-400">${l.firm}</div>
                  <div class="text-[10px] text-slate-400">${l.specialization} · ${l.experience}年经验</div>
                </div>
                <div class="text-right">
                  <div class="flex items-center gap-1 text-amber-500 text-xs"><i class="fas fa-star text-[10px]"></i>${l.rating}</div>
                  <div class="text-[10px] text-slate-400">${l.sessions}场</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- History -->
        <div class="glass-card p-5">
          <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-clock-rotate-left mr-2 text-slate-400"></i>历史记录</h3>
          <div class="space-y-2">
            ${data.userHistory.map(h => `
              <div class="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 text-xs">
                <div>
                  <div class="font-medium text-sm text-slate-700">${h.case}</div>
                  <span class="text-slate-400">${h.date} · ${h.role}</span>
                </div>
                <span class="font-mono font-bold ${h.score >= 80 ? 'text-emerald-600' : h.score >= 70 ? 'text-blue-600' : 'text-amber-500'}">${h.score}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
function initCharts_moot_court(data) {}
