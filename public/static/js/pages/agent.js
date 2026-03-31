// AI Agent Engine Page
function render_agent(data) {
  return `
  <div class="fade-in space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold">
          <i class="fas fa-robot mr-2 text-blue-400"></i>AI Agent 智能体引擎
          <span class="tag tag-green ml-2">运行中</span>
        </h2>
        <p class="text-sm text-gray-500 mt-1">意图理解 · 任务编排 · 多模型调度 · 法律工具链集成</p>
      </div>
    </div>

    <!-- Orchestration Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="stat-card" style="--accent-start:#3b82f6;--accent-end:#06b6d4">
        <div class="text-xs text-gray-500 mb-2">总调度任务</div>
        <div class="text-2xl font-bold">${formatNumber(data.orchestration.totalTasks)}</div>
      </div>
      <div class="stat-card" style="--accent-start:#d946ef;--accent-end:#ec4899">
        <div class="text-xs text-gray-500 mb-2">平均任务步骤</div>
        <div class="text-2xl font-bold">${data.orchestration.avgSteps}</div>
      </div>
      <div class="stat-card" style="--accent-start:#10b981;--accent-end:#059669">
        <div class="text-xs text-gray-500 mb-2">任务成功率</div>
        <div class="text-2xl font-bold">${data.orchestration.successRate}%</div>
      </div>
      <div class="stat-card" style="--accent-start:#f59e0b;--accent-end:#ef4444">
        <div class="text-xs text-gray-500 mb-2">并发Agent数</div>
        <div class="text-2xl font-bold">${data.orchestration.concurrentAgents}</div>
      </div>
    </div>

    <!-- Agent List -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm mb-4">智能体列表</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs border-b border-white/5">
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
              <tr class="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td class="py-3 px-3">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                      <i class="fas fa-robot text-xs text-primary-400"></i>
                    </div>
                    <span class="font-medium">${a.name}</span>
                  </div>
                </td>
                <td class="py-3 px-3"><span class="tag tag-blue">${a.model}</span></td>
                <td class="py-3 px-3"><span class="tag tag-green"><i class="fas fa-circle text-[6px] mr-1"></i>${a.status === 'active' ? '运行中' : '已停止'}</span></td>
                <td class="py-3 px-3 text-right font-mono">${formatNumber(a.calls)}</td>
                <td class="py-3 px-3 text-right font-mono">${a.avgLatency}</td>
                <td class="py-3 px-3 text-right">
                  <span class="font-semibold ${a.accuracy >= 95 ? 'text-emerald-400' : a.accuracy >= 90 ? 'text-blue-400' : 'text-yellow-400'}">${a.accuracy}%</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Toolchain -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm mb-4"><i class="fas fa-tools mr-2 text-yellow-400"></i>法律工具链</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        ${data.toolchain.map(t => `
          <div class="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary-500/20 transition-all">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/15 to-accent-500/15 flex items-center justify-center">
                <i class="fas ${t.icon} text-primary-400"></i>
              </div>
              <div>
                <div class="font-medium text-sm">${t.name}</div>
                <span class="tag tag-green text-[10px]"><i class="fas fa-circle text-[5px]"></i> 已接入</span>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">${t.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Agent Orchestration Flow -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm mb-4"><i class="fas fa-sitemap mr-2 text-purple-400"></i>Agent 任务编排流程</h3>
      <div class="flex flex-wrap items-center justify-center gap-3 py-6">
        ${['用户输入', '意图识别', '任务分解', '工具选择', 'Agent执行', '结果融合', '质量检查', '响应输出'].map((step, i) => `
          <div class="flex items-center gap-3">
            <div class="px-4 py-3 rounded-xl ${i === 4 ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-primary-500/30' : 'bg-white/[0.03] border-white/5'} border text-sm font-medium text-center">
              <div class="text-[10px] text-gray-500 mb-1">Step ${i+1}</div>
              ${step}
            </div>
            ${i < 7 ? '<i class="fas fa-chevron-right text-gray-700 text-xs"></i>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function initCharts_agent(data) {}
