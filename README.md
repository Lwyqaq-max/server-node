# 记录幸福 - 后端 API 服务

这是一个为"记录幸福"前端应用提供数据服务的 Node.js 后端 API。

## 功能特性

- ✅ RESTful API 接口
- ✅ 内存数据存储（写死数据）
- ✅ CORS 跨域支持
- ✅ Docker 容器化部署
- ✅ 完整的 CRUD 操作

## API 接口

### 健康检查
- `GET /health` - 检查服务状态

### 记录管理
- `GET /api/records` - 获取所有记录（支持 title 和 date 查询参数）
- `GET /api/records/:id` - 根据 ID 获取单条记录
- `POST /api/records` - 创建新记录
- `PUT /api/records/:id` - 更新记录
- `DELETE /api/records/:id` - 删除记录

### 请求示例

#### 创建记录
```bash
curl -X POST http://localhost:3000/api/records \
  -H "Content-Type: application/json" \
  -d '{
    "icon": "💕",
    "title": "第一次相遇",
    "content": "那个阳光明媚的午后...",
    "date": "2024-01-15"
  }'
```

#### 获取所有记录
```bash
curl http://localhost:3000/api/records
```

#### 根据标题查询
```bash
curl http://localhost:3000/api/records?title=相遇
```

## 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 启动生产服务器
```bash
npm start
```

服务将在 `http://localhost:3000` 启动

## Docker 部署

### 构建镜像
```bash
docker build -t love-record-api .
```

### 运行容器
```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  --name love-record-api \
  love-record-api
```

### 使用 docker-compose（推荐）

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - PORT=3000
      - NODE_ENV=production
    restart: unless-stopped
```

然后运行：
```bash
docker-compose up -d
```

## 数据存储

数据存储在内存中（写死数据），重启服务后数据会重置为初始值。

数据结构：
- `id` - 主键
- `icon` - 图标
- `title` - 标题
- `content` - 内容
- `date` - 日期
- `created_at` - 创建时间
- `updated_at` - 更新时间

## 环境变量

- `PORT` - 服务端口（默认: 3000）
- `NODE_ENV` - 运行环境（development/production）

## 注意事项

- 数据存储在内存中，服务重启后数据会重置
- 如需持久化存储，请修改 `db/database.js` 使用数据库

