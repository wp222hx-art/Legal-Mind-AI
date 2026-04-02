// AI Agent Engine Page — Clean Theme
function render_agent(data) {
  return `
  <div class="fade-in space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-800">
          <i class="fas fa-robot mr-2 text-blue-500"></i>AI Agent 智能体引擎
          <span class="tag tag-green ml-2">运行中</span>
        </h2>
        <p class="text-sm text-slate-400 mt-1">意图理解 · 任务编排 · 多模型调度 · 法律工具链集成</p>
      </div>
    </div>

    <!-- Orchestration Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      ${[
        { label: '总调度任务', value: formatNumber(data.orchestration.totalTasks), icon: 'fa-layer-group', color: '#2563eb', bg: '#eff6ff' },
        { label: '平均任务步骤', value: data.orchestration.avgSteps, icon: 'fa-list-ol', color: '#7c3aed', bg: '#f5f3ff' },
        { label: '任务成功率', value: data.orchestration.successRate + '%', icon: 'fa-check-circle', color: '#059669', bg: '#ecfdf5' },
        { label: '并发Agent数', value: data.orchestration.concurrentAgents, icon: 'fa-bolt', color: '#d97706', bg: '#fffbeb' },
      ].map(k => `
        <div class="stat-card">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${k.bg}">
              <i class="fas ${k.icon} text-xs" style="color:${k.color}"></i>
            </div>
            <span class="text-xs text-slate-400">${k.label}</span>
          </div>
          <div class="text-2xl font-bold text-slate-800">${k.value}</div>
        </div>
      `).join('')}
    </div>

    <!-- Agent List -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4">智能体列表</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-xs">
              <th class="text-left py-3 px-3">Agent</th>
              <th class="text-left py-3 px-3">模型</th>
              <th class="text-left py-3 px-3">状态</th>
              <th class="text-right py-3 px-3">调用次数</th>
              <th class="text-right py-3 px-3">平均延迟</th>
              <th class="text-right py-3 px-3">准确率</th>
            </tr>
          </thead>
          <tbody>
            ${data.agents.map(a => `
              <tr>
                <td class="py-3 px-3">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <i class="fas fa-robot text-xs text-blue-500"></i>
                    </div>
                    <span class="font-medium text-slate-700">${a.name}</span>
                  </div>
                </td>
                <td class="py-3 px-3"><span class="tag tag-blue">${a.model}</span></td>
                <td class="py-3 px-3"><span class="tag tag-green"><i class="fas fa-circle text-[6px] mr-1"></i>${a.status === 'active' ? '运行中' : '已停止'}</span></td>
                <td class="py-3 px-3 text-right font-mono text-slate-600">${formatNumber(a.calls)}</td>
                <td class="py-3 px-3 text-right font-mono text-slate-600">${a.avgLatency}</td>
                <td class="py-3 px-3 text-right">
                  <span class="font-semibold ${a.accuracy >= 95 ? 'text-emerald-600' : a.accuracy >= 90 ? 'text-blue-600' : 'text-amber-600'}">${a.accuracy}%</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Toolchain -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-wrench mr-2 text-amber-500"></i>法律工具链</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        ${data.toolchain.map(t => `
          <div class="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                <i class="fas ${t.icon} text-blue-500"></i>
              </div>
              <div>
                <div class="font-medium text-sm text-slate-700">${t.name}</div>
                <span class="tag tag-green text-[10px]"><i class="fas fa-circle text-[5px]"></i> 已接入</span>
              </div>
            </div>
            <p class="text-xs text-slate-400 mt-1">${t.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Agent Orchestration Flow -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-sitemap mr-2 text-violet-500"></i>Agent 任务编排流程</h3>
      <div class="flex flex-wrap items-center justify-center gap-3 py-6">
        ${['用户输入', '意图识别', '任务分解', '工具选择', 'Agent执行', '结果融合', '质量检查', '响应输出'].map((step, i) => `
          <div class="flex items-center gap-3">
            <div class="px-4 py-3 rounded-xl ${i === 4 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'} border text-sm font-medium text-center text-slate-700">
              <div class="text-[10px] text-slate-400 mb-1">Step ${i+1}</div>
              ${step}
            </div>
            ${i < 7 ? '<i class="fas fa-chevron-right text-slate-300 text-xs"></i>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function initCharts_agent(data) {}
