// Vector Database Page — Clean Theme
function render_vector_db(data) {
  return `
  <div class="fade-in space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-database mr-2 text-emerald-500"></i>私有向量数据库系统</h2>
      <p class="text-sm text-slate-400 mt-1">为每个用户提供独立知识空间，存储个人课件、笔记、参考文献，实现个性化检索</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      ${[
        { label: '集合数', value: data.stats.totalCollections, icon: 'fa-layer-group', color: '#2563eb', bg: '#eff6ff' },
        { label: '总向量数', value: formatNumber(data.stats.totalVectors), icon: 'fa-cubes', color: '#7c3aed', bg: '#f5f3ff' },
        { label: '存储空间', value: data.stats.storageUsed, icon: 'fa-hard-drive', color: '#059669', bg: '#ecfdf5' },
        { label: '用户空间', value: formatNumber(data.stats.userSpaces), icon: 'fa-users', color: '#d97706', bg: '#fffbeb' },
        { label: '平均查询', value: data.stats.avgQueryTime, icon: 'fa-bolt', color: '#ec4899', bg: '#fdf2f8' },
      ].map(s => `
        <div class="stat-card">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${s.bg}">
              <i class="fas ${s.icon} text-xs" style="color:${s.color}"></i>
            </div>
            <span class="text-xs text-slate-400">${s.label}</span>
          </div>
          <div class="text-xl font-bold text-slate-800">${s.value}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Collections -->
      <div class="lg:col-span-2 glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4">向量集合概览</h3>
        <div class="space-y-3">
          ${data.collections.map(col => {
            const pct = (col.vectors / data.stats.totalVectors * 100).toFixed(1);
            return `
            <div class="p-3 rounded-xl bg-gray-50/50 border border-gray-100">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <i class="fas fa-cubes text-emerald-500 text-xs"></i>
                  </div>
                  <div>
                    <div class="font-medium text-sm font-mono text-slate-700">${col.name}</div>
                    <div class="text-xs text-slate-400">${col.desc}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-semibold text-sm text-slate-800">${formatNumber(col.vectors)}</div>
                  <div class="text-xs text-slate-400">${col.dimension}d</div>
                </div>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill" style="width:${pct}%"></div>
              </div>
              <div class="text-right text-xs text-slate-400 mt-1">${pct}%</div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- User Private Space -->
      <div class="glass-card p-5">
        <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-user-lock mr-2 text-cyan-500"></i>个人知识空间</h3>
        <div class="p-4 rounded-xl bg-blue-50/50 border border-blue-100 mb-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">张</div>
            <div>
              <div class="font-medium text-sm text-slate-700">张明远的知识库</div>
              <div class="text-xs text-slate-400">最近上传: ${data.userSpace.lastUpload}</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-lg bg-white/80 text-center border border-gray-100">
              <div class="text-lg font-bold text-slate-800">${data.userSpace.files}</div>
              <div class="text-xs text-slate-400">文件数</div>
            </div>
            <div class="p-3 rounded-lg bg-white/80 text-center border border-gray-100">
              <div class="text-lg font-bold text-slate-800">${data.userSpace.notes}</div>
              <div class="text-xs text-slate-400">笔记数</div>
            </div>
          </div>
          <div class="mt-3 p-3 rounded-lg bg-white/80 text-center border border-gray-100">
            <div class="text-lg font-bold gradient-text">${formatNumber(data.userSpace.vectors)}</div>
            <div class="text-xs text-slate-400">个人向量</div>
          </div>
        </div>

        <!-- Milvus Architecture -->
        <h4 class="font-semibold text-xs text-slate-400 mb-3">Milvus 2.x 架构</h4>
        <div class="space-y-2">
          ${['Proxy Layer: 请求路由', 'Coord Layer: 集群协调', 'Worker Layer: 查询/索引', 'Storage Layer: MinIO/S3'].map((item, i) => `
            <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50/50 border border-gray-100 text-xs">
              <span class="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[10px]">L${i+1}</span>
              <span class="text-slate-500">${item}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Vector Search Demo -->
    <div class="glass-card p-5">
      <h3 class="font-semibold text-sm text-slate-700 mb-4"><i class="fas fa-magnifying-glass mr-2 text-violet-500"></i>向量语义搜索演示</h3>
      <div class="flex gap-3 mb-4">
        <input type="text" placeholder="输入法律问题进行语义搜索..." value="善意取得制度的构成要件" class="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-blue-400 text-slate-700 placeholder-slate-400" readonly>
        <button class="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <i class="fas fa-magnifying-glass mr-1"></i>搜索
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${[
          { title: '善意取得制度研究——以物权法第106条为中心', source: '法学研究', score: 0.96, type: '学术论文' },
          { title: '(2024)最高法民终456号 善意取得纠纷案', source: '裁判文书网', score: 0.93, type: '裁判文书' },
          { title: '民法典第三百一十一条 善意取得规定', source: '国家法规库', score: 0.91, type: '法律法规' },
        ].map(r => `
          <div class="p-3 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="tag tag-purple text-[10px]">${r.type}</span>
              <span class="text-xs font-mono text-emerald-600">${(r.score*100).toFixed(0)}%</span>
            </div>
            <div class="font-medium text-sm text-slate-700 mb-1">${r.title}</div>
            <div class="text-xs text-slate-400"><i class="fas fa-database mr-1"></i>${r.source}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}
function initCharts_vector_db(data) {}
