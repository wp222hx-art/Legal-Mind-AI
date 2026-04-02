// RAG System Page — Clean Theme
function render_rag(data) {
  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-magnifying-glass mr-2 text-violet-500"></i>RAG 检索增强生成系统</h2>
      <p class="text-sm text-slate-400 mt-1">从海量法律文档中精准检索，确保 AI 生成内容准确可溯源</p>
    </div>

    <!-- Performance Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      ${[
        { label: '总向量数', value: formatNumber(data.pipeline.totalVectors), icon: 'fa-cubes', color: '#7c3aed', bg: '#f5f3ff' },
        { label: '检索延迟', value: data.performance.avgRetrievalTime, icon: 'fa-bolt', color: '#2563eb', bg: '#eff6ff' },
        { label: 'Recall@10', value: data.performance.recallAt10 + '%', icon: 'fa-bullseye', color: '#059669', bg: '#ecfdf5' },
        { label: 'Precision', value: data.performance.precision + '%', icon: 'fa-crosshairs', color: '#d97706', bg: '#fffbeb' },
        { label: 'MRR', value: data.performance.mrr, icon: 'fa-chart-simple', color: '#ec4899', bg: '#fdf2f8' },
      ].map(k => `
        <div class="stat-card">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${k.bg}">
              <i class="fas ${k.icon} text-xs" style="color:${k.color}"></i>
            </div>
            <span class="text-xs text-slate-400">${k.label}</span>
          </div>
          <div class="text-xl font-bold text-slate-800">${k.value}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Data Sources -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-layer-group mr-2 text-blue-500"></i>数据源接入</h3>
        <div class="space-y-3">
          ${data.dataSources.map(s => `
            <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 border border-gray-100">
              <div class="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <i class="fas fa-server text-violet-500 text-sm"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-sm text-slate-700">${s.name}</span>
                  <span class="tag tag-green text-[10px]"><i class="fas fa-check text-[8px]"></i> 已同步</span>
                </div>
                <div class="flex items-center gap-4 mt-1">
                  <span class="text-xs text-slate-400"><i class="fas fa-file mr-1"></i>${formatNumber(s.docs)} 文档</span>
                  <span class="text-xs text-slate-500">更新: ${s.lastSync}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Pipeline Config -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-gears mr-2 text-cyan-500"></i>RAG Pipeline 配置</h3>
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
            <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 border border-gray-100">
              <span class="text-sm text-slate-500">${k}</span>
              <span class="text-sm font-mono font-medium text-slate-700">${v}</span>
            </div>
          `).join('')}
        </div>

        <!-- Pipeline Flow -->
        <div class="mt-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
          <div class="text-xs text-slate-500 mb-3">处理流水线</div>
          <div class="flex items-center gap-2 flex-wrap">
            ${['文档加载', '文本分块', '向量化', '索引构建', '语义检索', 'Rerank', '上下文注入', 'LLM生成'].map((s, i) => `
              <span class="px-3 py-1.5 rounded-lg text-xs font-medium ${i === 4 ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-slate-500 border border-gray-200'}">${s}</span>
              ${i < 7 ? '<i class="fas fa-arrow-right text-slate-300 text-[10px]"></i>' : ''}
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Queries -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-clock-rotate-left mr-2 text-green-500"></i>最近检索记录</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-xs">
              <th class="text-left py-3 px-3">查询内容</th>
              <th class="text-center py-3 px-3">匹配源数</th>
              <th class="text-center py-3 px-3">相关度</th>
              <th class="text-right py-3 px-3">检索耗时</th>
            </tr>
          </thead>
          <tbody>
            ${data.recentQueries.map(q => `
              <tr>
                <td class="py-3 px-3 font-medium text-slate-700">${q.query}</td>
                <td class="py-3 px-3 text-center"><span class="tag tag-blue">${q.sources} 篇</span></td>
                <td class="py-3 px-3 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style="width:${q.relevance*100}%"></div>
                    </div>
                    <span class="text-xs font-mono text-slate-600">${(q.relevance*100).toFixed(0)}%</span>
                  </div>
                </td>
                <td class="py-3 px-3 text-right font-mono text-emerald-600">${q.time}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}
function initCharts_rag(data) {}
