// Thesis Tutoring Page — Clean Theme
function render_thesis(data) {
  return `
  <div class="fade-in space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-pen-fancy mr-2 text-violet-500"></i>论文辅导工作流</h2>
        <p class="text-sm text-slate-400 mt-1">八阶段全流程智能辅导 · 选题 → 文献 → 框架 → 案例 → 初稿 → 格式 → 查重 → 答辩</p>
      </div>
      <div class="flex gap-2">
        <span class="tag tag-blue">${data.allProjects.length} 个项目</span>
        <span class="tag tag-green">${data.allProjects.filter(p=>p.status==='active').length} 进行中</span>
      </div>
    </div>

    <!-- Current Project Info -->
    <div class="glass-card p-5">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div class="text-xs text-slate-400 mb-1">当前项目 <span class="font-mono text-slate-500">${data.currentProject.id}</span></div>
          <h3 class="text-lg font-bold text-slate-800">${data.currentProject.title}</h3>
          <div class="flex items-center gap-4 mt-2 text-xs text-slate-400">
            <span><i class="fas fa-user-tie mr-1"></i>${data.currentProject.advisor}</span>
            <span><i class="fas fa-calendar mr-1"></i>截止: ${data.currentProject.deadline}</span>
            <span class="tag tag-blue">阶段 ${data.currentProject.stage}/8</span>
          </div>
        </div>
        <div class="text-center">
          ${scoreRingSVG(data.currentProject.progress, 100, 80, '#6366f1', '#a855f7')}
          <div class="text-xs text-slate-400 mt-1">完成进度</div>
        </div>
      </div>

      <!-- Stage Timeline -->
      <div class="overflow-x-auto pb-2">
        <div class="flex items-start gap-0 min-w-[700px]">
          ${data.stages.map((s, i) => `
            <div class="flex-1 relative">
              <div class="flex flex-col items-center">
                <div class="stage-dot ${s.status}">${s.status === 'completed' ? '<i class="fas fa-check text-xs"></i>' : i+1}</div>
                <div class="mt-2 text-center">
                  <div class="text-xs font-medium ${s.status === 'in_progress' ? 'text-blue-600' : s.status === 'completed' ? 'text-emerald-600' : 'text-slate-400'}">${s.name}</div>
                  ${s.score ? `<div class="text-[10px] text-slate-500 mt-0.5">${s.score}分</div>` : ''}
                  ${s.completedAt ? `<div class="text-[10px] text-slate-400">${s.completedAt}</div>` : ''}
                </div>
              </div>
              ${i < data.stages.length - 1 ? `<div class="absolute top-4 left-[calc(50%+16px)] right-0 h-[2px] ${s.status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'}"></div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Topic Suggestions -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-lightbulb mr-2 text-amber-500"></i>阶段一: AI 选题推荐</h3>
        <div class="space-y-3">
          ${data.topicSuggestions.map((t, i) => `
            <div class="p-3 rounded-xl ${i === 0 ? 'bg-blue-50/50 border border-blue-200' : 'bg-gray-50/50 border border-gray-100'} hover:border-blue-200 transition-all">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-sm text-slate-700">${i === 0 ? '<i class="fas fa-star text-amber-500 mr-1"></i>' : ''}${t.title}</span>
              </div>
              <div class="grid grid-cols-4 gap-2">
                ${[
                  { label: '可行性', value: t.feasibility },
                  { label: '创新度', value: t.innovation },
                  { label: '实践价值', value: t.practiceValue },
                  { label: '文献量', value: t.literatureRichness },
                ].map(d => `
                  <div class="text-center">
                    <div class="text-xs font-mono font-medium ${d.value >= 90 ? 'text-emerald-600' : d.value >= 80 ? 'text-blue-600' : 'text-amber-500'}">${d.value}</div>
                    <div class="text-[10px] text-slate-400">${d.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Review Feedback (Stage 5) -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-pen-to-square mr-2 text-red-500"></i>阶段五: 初稿评审反馈</h3>
        <div class="flex items-center gap-4 mb-4">
          ${scoreRingSVG(data.reviewFeedback.overallScore, 100, 90, '#ef4444', '#f59e0b')}
          <div class="flex-1">
            ${data.reviewFeedback.dimensions.map(dim => `
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs w-20 text-slate-400">${dim.name}</span>
                <div class="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div class="h-full rounded-full ${dim.score >= 80 ? 'bg-emerald-500' : dim.score >= 70 ? 'bg-blue-500' : 'bg-amber-400'}" style="width:${dim.score}%"></div>
                </div>
                <span class="text-xs font-mono w-8 text-slate-600">${dim.score}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Annotations -->
        <h4 class="text-xs text-slate-400 mb-2 font-medium">批注反馈</h4>
        <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
          ${data.reviewFeedback.annotations.map(a => {
            const typeConfig = { suggestion: { color: 'tag-blue', icon: 'fa-circle-info' }, warning: { color: 'tag-yellow', icon: 'fa-triangle-exclamation' }, error: { color: 'tag-red', icon: 'fa-circle-xmark' } };
            const cfg = typeConfig[a.type];
            return `
            <div class="p-3 rounded-lg bg-gray-50/50 border border-gray-100">
              <div class="flex items-center gap-2 mb-1">
                <span class="tag ${cfg.color} text-[10px]"><i class="fas ${cfg.icon}"></i></span>
                <span class="text-xs font-medium text-slate-600">${a.section}</span>
              </div>
              <p class="text-xs text-slate-500 leading-relaxed">${a.content}</p>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- All Projects -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-folder-open mr-2 text-emerald-500"></i>我的论文项目</h3>
      <div class="space-y-3">
        ${data.allProjects.map(p => `
          <div class="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
            <div class="w-10 h-10 rounded-xl ${p.status === 'completed' ? 'bg-emerald-50' : 'bg-blue-50'} flex items-center justify-center">
              <i class="fas ${p.status === 'completed' ? 'fa-check text-emerald-500' : 'fa-pen text-blue-500'}"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium text-sm truncate text-slate-700">${p.title}</div>
              <div class="text-xs text-slate-400 mt-0.5">${p.id} · ${p.stage}</div>
            </div>
            <div class="w-24">
              <div class="progress-bar"><div class="progress-bar-fill" style="width:${p.progress}%"></div></div>
              <div class="text-xs text-slate-400 text-right mt-1">${p.progress}%</div>
            </div>
            <span class="tag ${p.status === 'completed' ? 'tag-green' : 'tag-blue'}">${p.status === 'completed' ? '已完成' : '进行中'}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 8 Stages Overview -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-bars-staggered mr-2 text-violet-500"></i>八阶段工作流概览</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        ${data.stages.map(s => `
          <div class="p-4 rounded-xl ${s.status === 'in_progress' ? 'bg-blue-50/50 border border-blue-200' : 'bg-gray-50/50 border border-gray-100'}">
            <div class="flex items-center gap-2 mb-2">
              <div class="stage-dot ${s.status} !w-6 !h-6 !text-[10px]">${s.status === 'completed' ? '<i class="fas fa-check text-[8px]"></i>' : s.id}</div>
              <span class="font-medium text-sm text-slate-700">${s.name}</span>
            </div>
            <p class="text-xs text-slate-400">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}
function initCharts_thesis(data) {}
