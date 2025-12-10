const express = require('express');
const router = express.Router();
const db = require('../db/database');

// 获取所有记录
router.get('/', (req, res) => {
  const { title, date } = req.query;
  
  let filteredRecords = db.getAllRecords();
  
  // 根据标题过滤
  if (title) {
    filteredRecords = filteredRecords.filter(r => 
      r.title.includes(title)
    );
  }
  
  // 根据日期过滤
  if (date) {
    filteredRecords = filteredRecords.filter(r => r.date === date);
  }
  
  // 排序：按日期降序，然后按创建时间降序
  filteredRecords.sort((a, b) => {
    if (b.date !== a.date) {
      return b.date.localeCompare(a.date);
    }
    return b.created_at.localeCompare(a.created_at);
  });
  
  res.json({ 
    success: true,
    data: filteredRecords,
    total: filteredRecords.length 
  });
});

// 根据 ID 获取单条记录
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const record = db.getRecordById(id);
  
  if (!record) {
    res.status(404).json({ error: '记录不存在' });
    return;
  }
  
  res.json({ 
    success: true,
    data: record 
  });
});

// 创建新记录
router.post('/', (req, res) => {
  const { icon, title, content, date } = req.body;
  
  // 验证必填字段
  if (!icon || !title || !content || !date) {
    res.status(400).json({ 
      error: '参数不完整',
      message: 'icon, title, content, date 都是必填字段' 
    });
    return;
  }
  
  try {
    const newRecord = db.createRecord({ icon, title, content, date });
    res.status(201).json({ 
      success: true,
      message: '记录创建成功',
      data: newRecord 
    });
  } catch (err) {
    console.error('创建记录失败:', err);
    res.status(500).json({ error: '创建记录失败', message: err.message });
  }
});

// 更新记录
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { icon, title, content, date } = req.body;
  
  // 验证必填字段
  if (!icon || !title || !content || !date) {
    res.status(400).json({ 
      error: '参数不完整',
      message: 'icon, title, content, date 都是必填字段' 
    });
    return;
  }
  
  try {
    const updatedRecord = db.updateRecord(id, { icon, title, content, date });
    
    if (!updatedRecord) {
      res.status(404).json({ error: '记录不存在' });
      return;
    }
    
    res.json({ 
      success: true,
      message: '记录更新成功',
      data: updatedRecord 
    });
  } catch (err) {
    console.error('更新记录失败:', err);
    res.status(500).json({ error: '更新记录失败', message: err.message });
  }
});

// 删除记录
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const deleted = db.deleteRecord(id);
    
    if (!deleted) {
      res.status(404).json({ error: '记录不存在' });
      return;
    }
    
    res.json({ 
      success: true,
      message: '记录删除成功' 
    });
  } catch (err) {
    console.error('删除记录失败:', err);
    res.status(500).json({ error: '删除记录失败', message: err.message });
  }
});

module.exports = router;

