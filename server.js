const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/database');
const recordsRouter = require('./routes/records');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '服务运行正常' });
});

// API 路由
app.use('/api/records', recordsRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: err.message 
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

// 初始化并启动服务器
db.init().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在端口 ${PORT}`);
    console.log(`📝 API 地址: http://localhost:${PORT}/api/records`);
  });
}).catch((err) => {
  console.error('❌ 初始化失败:', err);
  process.exit(1);
});

module.exports = app;

