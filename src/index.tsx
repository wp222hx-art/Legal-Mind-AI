import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

// ============ Mock Data API ============

// Dashboard stats
app.get('/api/dashboard', (c) => {
  return c.json({
    totalUsers: 128756,
    activeToday: 8432,
    totalCourses: 2460,
    aiConversations: 1563280,
    thesisProjects: 45230,
    jobMatches: 12890,
    satisfaction: 4.6,
    accuracy: 96.2,
    weeklyGrowth: [
      { day: '周一', users: 6200, conversations: 18500 },
      { day: '周二', users: 7100, conversations: 21300 },
      { day: '周三', users: 7800, conversations: 23100 },
      { day: '周四', users: 8200, conversations: 25600 },
      { day: '周五', users: 8432, conversations: 27800 },
      { day: '周六', users: 5600, conversations: 15200 },
      { day: '周日', users: 4800, conversations: 12100 },
    ],
    moduleUsage: [
      { name: 'AI学习助手', value: 35 },
      { name: '论文辅导', value: 25 },
      { name: '模拟法庭', value: 18 },
      { name: '就业匹配', value: 12 },
      { name: '知识图谱', value: 10 },
    ],
    recentActivities: [
      { user: '张同学', action: '完成了刑法总论学习路径', time: '2分钟前', type: 'study' },
      { user: '李同学', action: '提交论文初稿进入评审阶段', time: '5分钟前', type: 'thesis' },
      { user: '王同学', action: '参与模拟法庭民事纠纷案件', time: '8分钟前', type: 'court' },
      { user: '赵同学', action: '获得金杜律所实习推荐', time: '12分钟前', type: 'job' },
      { user: '刘同学', action: 'AI诊断报告生成完成', time: '15分钟前', type: 'report' },
    ],
    systemKPI: {
      apiResponseTime: '128ms',
      systemUptime: '99.97%',
      ragLatency: '320ms',
      concurrentUsers: 8432,
      vectorProcessSpeed: '156页/分钟',
      recallRate: '92.3%',
      faithfulness: '94.8%',
      legalCitationAccuracy: '97.1%',
      thesisCompletionRate: '86.5%',
    }
  })
})

// AI Agent data
app.get('/api/agent', (c) => {
  return c.json({
    agents: [
      { id: 1, name: '法律问答助手', type: 'qa', status: 'active', model: 'DeepSeek-V3', calls: 523400, avgLatency: '1.2s', accuracy: 96.8 },
      { id: 2, name: '论文辅导专家', type: 'thesis', status: 'active', model: 'Qwen-72B', calls: 234100, avgLatency: '2.1s', accuracy: 94.5 },
      { id: 3, name: '模拟法庭裁判', type: 'court', status: 'active', model: 'GLM-4', calls: 89200, avgLatency: '1.8s', accuracy: 93.2 },
      { id: 4, name: '就业顾问', type: 'career', status: 'active', model: 'DeepSeek-V3', calls: 67300, avgLatency: '0.9s', accuracy: 95.1 },
      { id: 5, name: '文献检索引擎', type: 'search', status: 'active', model: 'BGE-large-zh', calls: 412800, avgLatency: '0.4s', accuracy: 97.3 },
    ],
    toolchain: [
      { name: '裁判文书检索', icon: 'fa-gavel', desc: '对接中国裁判文书网，检索5000万+裁判文书', status: 'active' },
      { name: '学术文献检索', icon: 'fa-book', desc: '对接CNKI/万方/北大法宝，覆盖法学核心期刊', status: 'active' },
      { name: '法律法规查询', icon: 'fa-balance-scale', desc: '实时同步国家法律法规数据库，涵盖30万+法条', status: 'active' },
      { name: '查重检测引擎', icon: 'fa-search', desc: '多维度论文相似度检测，支持语义级查重', status: 'active' },
      { name: '知识图谱查询', icon: 'fa-project-diagram', desc: 'Neo4j图数据库驱动，法律知识关联推理', status: 'active' },
      { name: '简历生成器', icon: 'fa-file-alt', desc: '法律行业定制化简历模板，AI智能优化', status: 'active' },
    ],
    orchestration: {
      totalTasks: 1326800,
      avgSteps: 4.2,
      successRate: 98.7,
      concurrentAgents: 256,
    }
  })
})

// RAG system data
app.get('/api/rag', (c) => {
  return c.json({
    dataSources: [
      { name: '中国裁判文书网', docs: 52000000, lastSync: '2026-03-31', status: 'synced' },
      { name: 'CNKI法学期刊', docs: 1200000, lastSync: '2026-03-30', status: 'synced' },
      { name: '万方法律数据库', docs: 850000, lastSync: '2026-03-30', status: 'synced' },
      { name: '北大法宝', docs: 2300000, lastSync: '2026-03-31', status: 'synced' },
      { name: '国家法律法规库', docs: 320000, lastSync: '2026-03-31', status: 'synced' },
      { name: '法学教材库', docs: 4500, lastSync: '2026-03-28', status: 'synced' },
    ],
    pipeline: {
      totalVectors: 186000000,
      chunkSize: 512,
      overlapSize: 64,
      embeddingModel: 'BGE-large-zh-v1.5',
      vectorDimension: 1024,
      indexType: 'HNSW',
      retrievalTopK: 10,
      rerankModel: 'BGE-reranker-large',
    },
    performance: {
      avgRetrievalTime: '320ms',
      recallAt10: 92.3,
      precision: 88.7,
      mrr: 0.91,
      ndcg: 0.89,
    },
    recentQueries: [
      { query: '善意取得制度的构成要件', sources: 12, relevance: 0.96, time: '280ms' },
      { query: '公司法人格否认的司法适用', sources: 8, relevance: 0.93, time: '310ms' },
      { query: '刑事附带民事诉讼的赔偿范围', sources: 15, relevance: 0.95, time: '350ms' },
      { query: '行政许可撤回的法律后果', sources: 6, relevance: 0.91, time: '290ms' },
    ]
  })
})

// Vector DB data
app.get('/api/vector-db', (c) => {
  return c.json({
    stats: {
      totalCollections: 12,
      totalVectors: 186000000,
      storageUsed: '245 GB',
      userSpaces: 128756,
      avgQueryTime: '12ms',
    },
    collections: [
      { name: 'judgments', vectors: 98000000, dimension: 1024, desc: '裁判文书向量集合' },
      { name: 'academic_papers', vectors: 42000000, dimension: 1024, desc: '学术论文向量集合' },
      { name: 'legal_provisions', vectors: 8500000, dimension: 1024, desc: '法律法规向量集合' },
      { name: 'textbooks', vectors: 3200000, dimension: 1024, desc: '法学教材向量集合' },
      { name: 'user_notes', vectors: 28500000, dimension: 1024, desc: '用户笔记向量集合' },
      { name: 'user_files', vectors: 5800000, dimension: 1024, desc: '用户文件向量集合' },
    ],
    userSpace: {
      userId: 'demo-user',
      files: 128,
      notes: 256,
      vectors: 34200,
      lastUpload: '2026-03-31 14:30',
    }
  })
})

// Knowledge Graph data
app.get('/api/knowledge-graph', (c) => {
  return c.json({
    stats: {
      totalNodes: 2450000,
      totalRelations: 8900000,
      domains: 12,
      knowledgePoints: 18600,
    },
    domains: [
      { name: '民法', nodes: 4200, relations: 15600, color: '#3b82f6' },
      { name: '刑法', nodes: 3800, relations: 14200, color: '#ef4444' },
      { name: '行政法', nodes: 2100, relations: 7800, color: '#f59e0b' },
      { name: '民事诉讼法', nodes: 1800, relations: 6500, color: '#10b981' },
      { name: '刑事诉讼法', nodes: 1600, relations: 5900, color: '#8b5cf6' },
      { name: '商法', nodes: 1500, relations: 5200, color: '#ec4899' },
      { name: '经济法', nodes: 1200, relations: 4100, color: '#06b6d4' },
      { name: '国际法', nodes: 800, relations: 2800, color: '#84cc16' },
      { name: '宪法', nodes: 600, relations: 2100, color: '#f97316' },
      { name: '法理学', nodes: 500, relations: 1800, color: '#6366f1' },
      { name: '知识产权法', nodes: 900, relations: 3200, color: '#14b8a6' },
      { name: '劳动法', nodes: 700, relations: 2400, color: '#e11d48' },
    ],
    userMastery: {
      mastered: 342,
      learning: 128,
      weak: 56,
      notLearned: 874,
      masteryRate: 67.8,
    },
    graphPreview: {
      nodes: [
        { id: 'civil', label: '民法总则', group: 'domain', size: 40 },
        { id: 'property', label: '物权法', group: 'domain', size: 35 },
        { id: 'contract', label: '合同法', group: 'domain', size: 35 },
        { id: 'tort', label: '侵权责任法', group: 'domain', size: 30 },
        { id: 'good_faith', label: '善意取得', group: 'knowledge', size: 20 },
        { id: 'mortgage', label: '抵押权', group: 'knowledge', size: 20 },
        { id: 'breach', label: '违约责任', group: 'knowledge', size: 20 },
        { id: 'negligence', label: '过错责任', group: 'knowledge', size: 20 },
        { id: 'art311', label: '民法典第311条', group: 'provision', size: 15 },
        { id: 'art394', label: '民法典第394条', group: 'provision', size: 15 },
        { id: 'case1', label: '(2024)最高法民终123号', group: 'case', size: 12 },
      ],
      edges: [
        { from: 'civil', to: 'property' },
        { from: 'civil', to: 'contract' },
        { from: 'civil', to: 'tort' },
        { from: 'property', to: 'good_faith' },
        { from: 'property', to: 'mortgage' },
        { from: 'contract', to: 'breach' },
        { from: 'tort', to: 'negligence' },
        { from: 'good_faith', to: 'art311' },
        { from: 'mortgage', to: 'art394' },
        { from: 'art311', to: 'case1' },
      ]
    }
  })
})

// Learning Assistant data
app.get('/api/learning', (c) => {
  return c.json({
    userProfile: {
      name: '张明远',
      university: '中国政法大学',
      major: '法学',
      grade: '大三',
      targetExam: '法律职业资格考试',
      studyHours: 1256,
      completedCourses: 42,
      currentStreak: 15,
    },
    studyPlan: {
      weeklyGoal: 25,
      weeklyCompleted: 18.5,
      dailyPlan: [
        { time: '09:00-10:30', subject: '刑法总论', type: '视频学习', status: 'completed' },
        { time: '10:45-12:00', subject: '民事诉讼法', type: 'AI对话练习', status: 'completed' },
        { time: '14:00-15:30', subject: '行政法', type: '案例分析', status: 'in_progress' },
        { time: '15:45-17:00', subject: '商法', type: '知识点复习', status: 'pending' },
        { time: '19:00-20:30', subject: '法理学', type: '模拟测试', status: 'pending' },
      ]
    },
    diagnosticReport: {
      overallScore: 78.5,
      studyHoursThisWeek: 18.5,
      conversationsThisWeek: 42,
      knowledgeGrowth: 12.3,
      subjectScores: [
        { subject: '民法', score: 88, trend: 'up', change: 3.2 },
        { subject: '刑法', score: 82, trend: 'up', change: 5.1 },
        { subject: '行政法', score: 75, trend: 'down', change: -1.8 },
        { subject: '民事诉讼法', score: 71, trend: 'up', change: 8.6 },
        { subject: '刑事诉讼法', score: 68, trend: 'stable', change: 0.5 },
        { subject: '商法', score: 85, trend: 'up', change: 2.4 },
        { subject: '经济法', score: 72, trend: 'up', change: 4.0 },
        { subject: '国际法', score: 65, trend: 'down', change: -3.2 },
      ],
      weakPoints: [
        { point: '行政诉讼管辖', mastery: 32, priority: 'high' },
        { point: '刑事证据规则', mastery: 41, priority: 'high' },
        { point: '国际私法冲突规范', mastery: 38, priority: 'medium' },
        { point: '票据法基本制度', mastery: 45, priority: 'medium' },
        { point: '环境法责任机制', mastery: 48, priority: 'low' },
      ],
      peerComparison: {
        userRank: 1256,
        totalStudents: 45230,
        percentile: 72.2,
        avgScore: 73.4,
        topStudentScore: 96.8,
      },
      heatmapData: [
        [85, 90, 78, 92, 88, 70, 82],
        [75, 80, 72, 85, 78, 65, 70],
        [60, 65, 58, 70, 62, 55, 60],
        [88, 92, 85, 95, 90, 80, 85],
        [70, 75, 68, 78, 72, 60, 65],
        [82, 85, 78, 88, 82, 72, 78],
      ],
      heatmapLabels: {
        x: ['物权法', '债权法', '侵权法', '合同法', '婚姻法', '继承法', '人格权'],
        y: ['识记', '理解', '应用', '分析', '综合', '评价']
      }
    },
    socratesDemo: [
      { role: 'user', content: '什么是善意取得制度？' },
      { role: 'ai', content: '这是一个很好的问题。在回答之前，我想先引导你思考：当你在二手市场购买了一件物品，后来发现卖家并非真正的所有者，你觉得这件物品应该归谁所有？请说说你的第一反应。' },
      { role: 'user', content: '我觉得应该归原来的所有者，因为卖家没有权利卖这个东西。' },
      { role: 'ai', content: '你提到了一个重要的原则——"无权处分"。但如果每次都归还原所有者，二手市场的交易安全会怎样？如果买家每次都担心买到"有问题"的东西，市场还能正常运转吗？' },
      { role: 'user', content: '那确实会影响交易安全，没人敢买二手东西了。' },
      { role: 'ai', content: '非常好！你已经触及到了善意取得制度的核心价值——保护交易安全。法律需要在"保护原所有权人"和"保护善意购买人"之间找到平衡。那么你觉得，什么条件下，法律应该保护买家的权益呢？' },
    ]
  })
})

// Thesis data
app.get('/api/thesis', (c) => {
  return c.json({
    currentProject: {
      id: 'TH-2026-0892',
      title: '数字经济背景下个人信息保护的法律路径研究',
      stage: 5,
      stageName: '初稿反馈',
      progress: 62,
      createdAt: '2026-02-15',
      advisor: '李华教授',
      deadline: '2026-06-01',
    },
    stages: [
      { id: 1, name: '论文选题', status: 'completed', score: 92, completedAt: '2026-02-20', desc: 'AI推荐5-10个选题方向' },
      { id: 2, name: '文献检索', status: 'completed', score: 88, completedAt: '2026-02-28', desc: '智能文献综述生成' },
      { id: 3, name: '框架搭建', status: 'completed', score: 85, completedAt: '2026-03-08', desc: '自动生成论文大纲' },
      { id: 4, name: '案例匹配', status: 'completed', score: 90, completedAt: '2026-03-15', desc: '裁判文书精准匹配' },
      { id: 5, name: '初稿反馈', status: 'in_progress', score: null, completedAt: null, desc: '多维度评审与批注' },
      { id: 6, name: '格式规范', status: 'pending', score: null, completedAt: null, desc: '引注格式自动修正' },
      { id: 7, name: '查重优化', status: 'pending', score: null, completedAt: null, desc: '语义保持改写优化' },
      { id: 8, name: '答辩准备', status: 'pending', score: null, completedAt: null, desc: 'AI模拟答辩对练' },
    ],
    topicSuggestions: [
      { title: '数字经济背景下个人信息保护的法律路径研究', feasibility: 92, innovation: 88, practiceValue: 95, literatureRichness: 90 },
      { title: '算法歧视的法律规制：以就业领域为视角', feasibility: 85, innovation: 92, practiceValue: 88, literatureRichness: 78 },
      { title: '数据跨境流动的法律挑战与制度回应', feasibility: 80, innovation: 90, practiceValue: 92, literatureRichness: 82 },
      { title: '深度伪造技术的刑法规制路径', feasibility: 88, innovation: 85, practiceValue: 82, literatureRichness: 75 },
      { title: '平台经济反垄断的法律适用问题', feasibility: 90, innovation: 78, practiceValue: 93, literatureRichness: 88 },
    ],
    reviewFeedback: {
      overallScore: 76,
      dimensions: [
        { name: '逻辑结构', score: 82, feedback: '整体结构清晰，但第三章与第四章之间的逻辑衔接不够紧密' },
        { name: '论证严密性', score: 74, feedback: '部分论点缺少充分的案例支撑，建议增加实证分析' },
        { name: '法条引用准确性', score: 85, feedback: '法条引用基本准确，但第2.3节引用的《个保法》第13条应为第15条' },
        { name: '学术规范性', score: 68, feedback: '文献综述部分引用格式不统一，建议统一为GB/T 7714格式' },
      ],
      annotations: [
        { section: '第一章 绪论', type: 'suggestion', content: '研究背景部分可以补充2025年最新的数据安全执法案例' },
        { section: '第二章 2.1', type: 'warning', content: '"个人信息"的定义建议引用《个人信息保护法》第4条原文' },
        { section: '第三章 3.2', type: 'error', content: '此处引用的欧盟GDPR条款编号有误，应为Article 17而非Article 15' },
        { section: '第四章 4.1', type: 'suggestion', content: '建议增加中美个人信息保护法律制度的比较分析' },
      ]
    },
    allProjects: [
      { id: 'TH-2026-0892', title: '数字经济背景下个人信息保护的法律路径研究', stage: '初稿反馈', progress: 62, status: 'active' },
      { id: 'TH-2026-0456', title: '人工智能生成内容的著作权归属问题研究', stage: '查重优化', progress: 87, status: 'active' },
      { id: 'TH-2025-1203', title: '电子商务平台经营者的法律责任研究', stage: '已完成', progress: 100, status: 'completed' },
    ]
  })
})

// Moot Court data
app.get('/api/moot-court', (c) => {
  return c.json({
    cases: [
      { id: 1, name: '张某诉李某房屋买卖合同纠纷案', type: '民事', difficulty: '中等', participants: 1256, avgScore: 78.5 },
      { id: 2, name: '王某故意伤害案', type: '刑事', difficulty: '较难', participants: 892, avgScore: 72.3 },
      { id: 3, name: '某科技公司诉市场监管局行政处罚案', type: '行政', difficulty: '困难', participants: 634, avgScore: 68.7 },
      { id: 4, name: '刘某与某公司劳动争议案', type: '民事', difficulty: '简单', participants: 2134, avgScore: 82.1 },
      { id: 5, name: '赵某挪用公款案', type: '刑事', difficulty: '困难', participants: 456, avgScore: 65.4 },
      { id: 6, name: '某企业环境污染侵权案', type: '民事', difficulty: '中等', participants: 789, avgScore: 75.8 },
    ],
    currentSession: {
      caseId: 1,
      caseName: '张某诉李某房屋买卖合同纠纷案',
      role: '原告代理律师',
      aiRole: '被告代理律师',
      round: 3,
      totalRounds: 5,
      caseBackground: '张某于2025年3月与李某签订房屋买卖合同，约定以280万元购买李某位于北京朝阳区的一套住房。张某支付了60万元定金后，李某以房价上涨为由拒绝履行合同，张某遂诉至法院。',
      dialogHistory: [
        { role: 'judge', content: '本庭现在开庭审理原告张某诉被告李某房屋买卖合同纠纷案。请原告陈述诉讼请求。' },
        { role: 'user', content: '审判长，我方诉讼请求如下：一、请求判令被告继续履行房屋买卖合同；二、请求判令被告赔偿因违约给原告造成的损失共计30万元；三、本案诉讼费用由被告承担。' },
        { role: 'opponent', content: '审判长，被告认为该合同存在重大误解，签约时房屋实际面积与合同约定存在差异。且原告在签约时明知房屋存在质量瑕疵，构成欺诈，被告有权撤销合同。' },
        { role: 'judge', content: '被告方提出了合同撤销的抗辩，请原告方就此进行回应。' },
      ],
    },
    scoring: {
      legalBasis: 85,
      logicReasoning: 78,
      expression: 82,
      adaptability: 75,
      overall: 80,
    },
    lawyers: [
      { id: 1, name: '陈大明', firm: '金杜律师事务所', specialization: '民商事争议', rating: 4.9, experience: 15, sessions: 234 },
      { id: 2, name: '王晓峰', firm: '中伦律师事务所', specialization: '刑事辩护', rating: 4.8, experience: 12, sessions: 189 },
      { id: 3, name: '李婷', firm: '方达律师事务所', specialization: '知识产权', rating: 4.7, experience: 10, sessions: 156 },
      { id: 4, name: '赵明远', firm: '君合律师事务所', specialization: '行政法', rating: 4.8, experience: 18, sessions: 267 },
      { id: 5, name: '刘雨涵', firm: '海问律师事务所', specialization: '劳动法', rating: 4.6, experience: 8, sessions: 123 },
    ],
    userHistory: [
      { date: '2026-03-28', case: '民事合同纠纷', score: 82, role: '原告律师' },
      { date: '2026-03-25', case: '刑事盗窃案', score: 75, role: '辩护律师' },
      { date: '2026-03-20', case: '行政许可纠纷', score: 68, role: '原告律师' },
      { date: '2026-03-15', case: '劳动争议案', score: 88, role: '原告律师' },
    ]
  })
})

// Career / Job matching data
app.get('/api/career', (c) => {
  return c.json({
    userResume: {
      name: '张明远',
      university: '中国政法大学',
      major: '法学',
      gpa: 3.75,
      skills: ['合同法', '公司法', '法律文书写作', '法律检索', '模拟法庭优秀奖'],
      experience: [
        { title: '法律援助中心实习', duration: '2025.07-2025.09', desc: '参与3起民事案件的文书起草与案例研究' },
        { title: 'Legal-Mind AI平台实训', duration: '2025.09至今', desc: '完成42个学习模块，参与12场模拟法庭' },
      ],
      targetPositions: ['律所实习生', '法务助理', '合规分析师'],
    },
    matchedJobs: [
      { id: 1, firm: '金杜律师事务所', title: '民商事争议解决实习生', location: '北京', matchScore: 94, salary: '6000-8000/月', requirements: ['法学在读', 'CET-6', '熟悉合同法'], deadline: '2026-04-15' },
      { id: 2, firm: '中伦律师事务所', title: '公司法务实习生', location: '上海', matchScore: 91, salary: '5000-7000/月', requirements: ['法学在读', '熟悉公司法', '良好英文能力'], deadline: '2026-04-20' },
      { id: 3, firm: '方达律师事务所', title: '知识产权实习生', location: '北京', matchScore: 87, salary: '5500-7500/月', requirements: ['法学在读', '了解知识产权法'], deadline: '2026-04-30' },
      { id: 4, firm: '君合律师事务所', title: '合规分析师实习生', location: '深圳', matchScore: 85, salary: '5000-6500/月', requirements: ['法学在读', '细致认真', '数据分析能力'], deadline: '2026-05-01' },
      { id: 5, firm: '海问律师事务所', title: '资本市场实习生', location: '北京', matchScore: 82, salary: '6000-8000/月', requirements: ['法学在读', '金融法基础', '英文优秀'], deadline: '2026-04-25' },
      { id: 6, firm: '通商律师事务所', title: '诉讼实习生', location: '上海', matchScore: 79, salary: '4500-6000/月', requirements: ['法学在读', '诉讼法基础'], deadline: '2026-05-10' },
    ],
    firmPool: {
      totalFirms: 236,
      topFirms: 28,
      locations: ['北京', '上海', '深圳', '广州', '杭州', '成都', '武汉'],
      industries: ['民商事', '刑事', '知识产权', '公司法务', '合规', '资本市场', '劳动法'],
    },
    interviewSimulation: {
      totalSessions: 8,
      avgScore: 82,
      improvements: ['法律推理表达更加清晰', '案例引用更加准确', '应变能力显著提升'],
      recentScores: [75, 78, 80, 82, 85, 79, 88, 82],
    },
    applicationStats: {
      totalApplied: 12,
      interviewing: 3,
      offered: 1,
      rejected: 2,
      pending: 6,
    }
  })
})

// ============ HTML Pages ============

// SPA Router - serves the main layout for all pages
const mainLayout = (title: string, page: string) => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Legal-Mind AI</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>&#x2696;</text></svg>">
  <!-- Critical: inline base styles to prevent FOUC -->
  <style>
    html,body{margin:0;padding:0;background:#0a0a1a;color:#f3f4f6;font-family:Inter,'Noto Sans SC',system-ui,-apple-system,sans-serif;min-height:100vh;}
    #app-loader{position:fixed;inset:0;z-index:9999;background:#0a0a1a;display:flex;align-items:center;justify-content:center;transition:opacity 0.3s ease;}
    #app-loader .spinner{width:40px;height:40px;border:3px solid rgba(99,102,241,0.15);border-top-color:#6366f1;border-radius:50%;animation:spin 0.8s linear infinite;}
    #app-loader.loaded{opacity:0;pointer-events:none;}
    @keyframes spin{to{transform:rotate(360deg)}}
    #app{opacity:0;transition:opacity 0.35s ease;}
    #app.ready{opacity:1;}
  </style>
  <!-- Preload critical resources -->
  <link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Main CSS first -->
  <link href="/static/css/main.css" rel="stylesheet">
  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' },
            accent: { 50:'#fdf4ff',100:'#fae8ff',200:'#f5d0fe',300:'#f0abfc',400:'#e879f9',500:'#d946ef',600:'#c026d3',700:'#a21caf',800:'#86198f',900:'#701a75' },
            dark: { 800:'#1a1a2e',900:'#0f0f23',950:'#0a0a1a' },
          },
          fontFamily: { sans: ['Inter', 'Noto Sans SC', 'sans-serif'] }
        }
      }
    }
  </script>
  <!-- Non-blocking: fonts and icons loaded async -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" media="print" onload="this.media='all'">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
</head>
<body class="bg-dark-950 text-gray-100 font-sans min-h-screen">
  <!-- Loading screen: covers page until everything ready -->
  <div id="app-loader"><div class="spinner"></div></div>
  <div id="app">
    <!-- Sidebar -->
    <aside id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-dark-900/80 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col transition-transform duration-300">
      <div class="p-5 border-b border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <i class="fas fa-scale-balanced text-white text-lg"></i>
          </div>
          <div>
            <h1 class="text-lg font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Legal-Mind</h1>
            <p class="text-[10px] text-gray-500 tracking-wider">AI 法律智能学习平台</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <a href="/" class="nav-item" data-page="home">
          <i class="fas fa-chart-line w-5"></i><span>数据总览</span>
        </a>
        <a href="/agent" class="nav-item" data-page="agent">
          <i class="fas fa-robot w-5"></i><span>AI Agent 引擎</span>
        </a>
        <a href="/rag" class="nav-item" data-page="rag">
          <i class="fas fa-database w-5"></i><span>RAG 检索系统</span>
        </a>
        <a href="/vector-db" class="nav-item" data-page="vector-db">
          <i class="fas fa-cubes w-5"></i><span>向量数据库</span>
        </a>
        <a href="/knowledge-graph" class="nav-item" data-page="knowledge-graph">
          <i class="fas fa-project-diagram w-5"></i><span>知识图谱</span>
        </a>
        <a href="/learning" class="nav-item" data-page="learning">
          <i class="fas fa-graduation-cap w-5"></i><span>AI 学习助手</span>
        </a>
        <a href="/thesis" class="nav-item" data-page="thesis">
          <i class="fas fa-file-alt w-5"></i><span>论文辅导</span>
        </a>
        <a href="/moot-court" class="nav-item" data-page="moot-court">
          <i class="fas fa-gavel w-5"></i><span>模拟法庭</span>
        </a>
        <a href="/career" class="nav-item" data-page="career">
          <i class="fas fa-briefcase w-5"></i><span>实习就业</span>
        </a>
      </nav>
      <div class="p-4 border-t border-white/5">
        <div class="flex items-center gap-3 px-2">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold">张</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">张明远</p>
            <p class="text-xs text-gray-500">中国政法大学</p>
          </div>
          <button class="text-gray-500 hover:text-gray-300"><i class="fas fa-cog"></i></button>
        </div>
      </div>
    </aside>

    <!-- Mobile header -->
    <header class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-dark-900/90 backdrop-blur-xl border-b border-white/5 z-40 flex items-center px-4">
      <button onclick="toggleSidebar()" class="text-gray-400 hover:text-white mr-4"><i class="fas fa-bars text-lg"></i></button>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
          <i class="fas fa-scale-balanced text-white text-sm"></i>
        </div>
        <span class="font-bold text-sm bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Legal-Mind AI</span>
      </div>
    </header>

    <!-- Main Content -->
    <main class="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
      <div id="page-content" class="p-4 lg:p-6">
        <!-- Page content loaded here -->
      </div>
    </main>
  </div>

  <!-- Overlay for mobile sidebar -->
  <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden" onclick="toggleSidebar()"></div>

  <!-- Chart.js loaded async, non-blocking -->
  <script>
    (function(){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      s.async=true;
      s.onload=function(){window._chartReady=true;if(window._pendingChartInit)window._pendingChartInit();};
      document.head.appendChild(s);
    })();
  </script>
  <script src="/static/js/router.js"></script>
  <script src="/static/js/charts.js"></script>
  <script src="/static/js/pages/home.js"></script>
  <script src="/static/js/pages/agent.js"></script>
  <script src="/static/js/pages/rag.js"></script>
  <script src="/static/js/pages/vector-db.js"></script>
  <script src="/static/js/pages/knowledge-graph.js"></script>
  <script src="/static/js/pages/learning.js"></script>
  <script src="/static/js/pages/thesis.js"></script>
  <script src="/static/js/pages/moot-court.js"></script>
  <script src="/static/js/pages/career.js"></script>
  <script>
    initRouter('${page}');
  </script>
</body>
</html>
`

// Page routes
app.get('/', (c) => c.html(mainLayout('数据总览', 'home')))
app.get('/agent', (c) => c.html(mainLayout('AI Agent 引擎', 'agent')))
app.get('/rag', (c) => c.html(mainLayout('RAG 检索系统', 'rag')))
app.get('/vector-db', (c) => c.html(mainLayout('向量数据库', 'vector-db')))
app.get('/knowledge-graph', (c) => c.html(mainLayout('知识图谱', 'knowledge-graph')))
app.get('/learning', (c) => c.html(mainLayout('AI 学习助手', 'learning')))
app.get('/thesis', (c) => c.html(mainLayout('论文辅导', 'thesis')))
app.get('/moot-court', (c) => c.html(mainLayout('模拟法庭', 'moot-court')))
app.get('/career', (c) => c.html(mainLayout('实习就业', 'career')))

export default app
