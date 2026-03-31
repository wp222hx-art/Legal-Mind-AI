// RAG System Page
function render_rag(data) {
  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold"><i class="fas fa-database mr-2 text-violet-400"></i>RAG 检索增强生成系统</h2>
      <p class="text-sm text-gray-500 mt-1">从海量法律文档中精准检索，确保 AI 生成内容准确可溯源</p>
    </div>

    <!-- Performance Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div class="stat-card" style="--accent-start:#8b5cf6;--accent-end:#6366f1">
        <div class="text-xs text-gray-500 mb-2">总向量数</div>
        <div class="text-xl font-bold">${formatNumber(data.pipeline.totalVectors)}</div>
      </div>
      <div class="stat-card" style="--accent-start:#3b82f6;--accent-end:#06b6d4">
        <div class="text-xs text-gray-500 mb-2">检索延迟</div>
        <div class="text-xl font-bold">${data.performance.avgRetrievalTime}</div>
      </div>
      <div class="stat-card" style="--accent-start:#10b981;--accent-end:#059669">
        <div class="text-xs text-gray-500 mb-2">Recall@10</div>
        <div class="text-xl font-bold">${data.performance.recallAt10}%</div>
      </div>
      <div class="stat-card" style="--accent-start:#f59e0b;--accent-end:#ef4444">
        <div class="text-xs text-gray-500 mb-2">Precision</div>
        <div class="text-xl font-bold">${data.performance.precision}%</div>
      </div>
      <div class="stat-card" style="--accent-start:#ec4899;--accent-end:#d946ef">
        <div class="text-xs text-gray-500 mb-2">MRR</div>
        <div class="text-xl font-bold">${data.performance.mrr}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Data Sources -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm mb-4"><i class="fas fa-layer-group mr-2 text-blue-400"></i>数据源接入</h3>
        <div class="space-y-3">
          ${data.dataSources.map(s => `
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/15 to-blue-500/15 flex items-center justify-center">
                <i class="fas fa-server text-violet-400 text-sm"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-sm">${s.name}</span>
                  <span class="tag tag-green text-[10px]"><i class="fas fa-check text-[8px]"></i> 已同步</span>
                </div>
                <div class="flex items-center gap-4 mt-1">
                  <span class="text-xs text-gray-500"><i class="fas fa-file mr-1"></i>${formatNumber(s.docs)} 文档</span>
                  <span class="text-xs text-gray-600">更新: ${s.lastSync}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Pipeline Config -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm mb-4"><i class="fas fa-cogs mr-2 text-cyan-400"></i>RAG Pipeline 配置</h3>
        <div class="space-y-3">
          ${Object.entries({
            '向量化模型': data.pipeline.embeddingModel,
            '向量维度': data.pipeline.vectorDimension,
            '分块大小': data.pipeline.chunkSize + ' tokens',
            '重叠大小': data.pipeline.overlapSize + ' tokens',
            '索引类型': data.pipeline.indexType,
            '检索 Top-K': data.pipeline.retrievalTopK,
            '重排序模型': data.pipeline.rerankModel,
          }).map(([k,v]) => `
            <div class="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span class="text-sm text-gray-400">${k}</span>
              <span class="text-sm font-mono font-medium text-gray-200">${v}</span>
            </div>
          `).join('')}
        </div>

        <!-- Pipeline Flow -->
        <div class="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div class="text-xs text-gray-500 mb-3">处理流水线</div>
          <div class="flex items-center gap-2 flex-wrap">
            ${['文档加载', '文本分块', '向量化', '索引构建', '语义检索', 'Rerank', '上下文注入', 'LLM生成'].map((s, i) => `
              <span class="px-3 py-1.5 rounded-lg text-xs font-medium ${i === 4 ? 'bg-primary-500/20 text-primary-300 border border-primary-500/20' : 'bg-white/[0.03] text-gray-400 border border-white/5'}">${s}</span>
              ${i < 7 ? '<i class="fas fa-arrow-right text-gray-700 text-[10px]"></i>' : ''}
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Queries -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm mb-4"><i class="fas fa-search mr-2 text-green-400"></i>最近检索记录</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-500 text-xs border-b border-white/5">
              <th class="text-left py-3 px-3">查询内容</th>
              <th class="text-center py-3 px-3">匹配源数</th>
              <th class="text-center py-3 px-3">相关度</th>
              <th class="text-right py-3 px-3">检索耗时</th>
            </tr>
          </thead>
          <tbody>
            ${data.recentQueries.map(q => `
              <tr class="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td class="py-3 px-3 font-medium">${q.query}</td>
                <td class="py-3 px-3 text-center"><span class="tag tag-blue">${q.sources} 篇</span></td>
                <td class="py-3 px-3 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style="width:${q.relevance*100}%"></div>
                    </div>
                    <span class="text-xs font-mono">${(q.relevance*100).toFixed(0)}%</span>
                  </div>
                </td>
                <td class="py-3 px-3 text-right font-mono text-emerald-400">${q.time}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}
function initCharts_rag(data) {}
