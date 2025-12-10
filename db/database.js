// 内存数据存储
let records = [
  {
    id: 1,
    icon: '💕',
    title: '第一次相遇',
    content: '那个阳光明媚的午后，我们第一次相遇。你的笑容如春风般温暖，那一刻，我知道我的世界因你而改变。',
    date: '2024-01-15',
    created_at: '2024-01-15 10:00:00',
    updated_at: '2024-01-15 10:00:00'
  },
  {
    id: 2,
    icon: '🌸',
    title: '春日赏花',
    content: '一起去看樱花，粉色的花瓣飘落在肩头。我们手牵手走在花海中，时间仿佛静止，只有彼此的心跳声。',
    date: '2024-03-20',
    created_at: '2024-03-20 14:30:00',
    updated_at: '2024-03-20 14:30:00'
  },
  {
    id: 3,
    icon: '🎂',
    title: '生日惊喜',
    content: '你为我准备的生日惊喜，让我感动不已。每一个细节都充满了爱意，谢谢你让我的生日如此特别。',
    date: '2024-05-10',
    created_at: '2024-05-10 18:00:00',
    updated_at: '2024-05-10 18:00:00'
  },
  {
    id: 4,
    icon: '🌙',
    title: '夜晚散步',
    content: '手牵手在月光下漫步，时间仿佛静止了...',
    date: '2024-06-15',
    created_at: '2024-06-15 20:00:00',
    updated_at: '2024-06-15 20:00:00'
  },
  {
    id: 5,
    icon: '☕',
    title: '咖啡时光',
    content: '在咖啡店里一起看书，享受安静的午后...',
    date: '2024-07-22',
    created_at: '2024-07-22 15:00:00',
    updated_at: '2024-07-22 15:00:00'
  },
  {
    id: 6,
    icon: '🎁',
    title: '特别礼物',
    content: '收到你精心准备的礼物，心里暖暖的...',
    date: '2024-08-30',
    created_at: '2024-08-30 12:00:00',
    updated_at: '2024-08-30 12:00:00'
  },
  {
    id: 7,
    icon: '🌈',
    title: '雨后彩虹',
    content: '雨后的彩虹特别美，就像我们的爱情...',
    date: '2024-09-12',
    created_at: '2024-09-12 16:00:00',
    updated_at: '2024-09-12 16:00:00'
  },
  {
    id: 8,
    icon: '⭐',
    title: '星空下的约定',
    content: '在星空下许下美好的约定，永远在一起...',
    date: '2024-10-01',
    created_at: '2024-10-01 21:00:00',
    updated_at: '2024-10-01 21:00:00'
  }
];

let nextId = 9;

// 初始化（兼容原有接口）
function init() {
  return Promise.resolve();
}

// 获取所有记录
function getAllRecords() {
  return [...records];
}

// 根据 ID 获取记录
function getRecordById(id) {
  return records.find(r => r.id === parseInt(id));
}

// 创建记录
function createRecord(record) {
  const newRecord = {
    id: nextId++,
    ...record,
    created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
    updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  records.push(newRecord);
  return newRecord;
}

// 更新记录
function updateRecord(id, record) {
  const index = records.findIndex(r => r.id === parseInt(id));
  if (index === -1) {
    return null;
  }
  records[index] = {
    ...records[index],
    ...record,
    id: parseInt(id),
    updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  return records[index];
}

// 删除记录
function deleteRecord(id) {
  const index = records.findIndex(r => r.id === parseInt(id));
  if (index === -1) {
    return false;
  }
  records.splice(index, 1);
  return true;
}

module.exports = {
  init,
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord
};

