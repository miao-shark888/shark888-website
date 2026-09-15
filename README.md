# 有赞内蒙古运营中心 - 官方站点

> **域名**：https://www.shark888.cn  
> **公司**：内蒙古神客科技有限公司  
> **电话**：15652701682  
> **部署目标**：替换现有【上线了】站点，全新的 Astro 静态站

## 项目结构

```
astro-site/
├── src/                    # Astro 源码（含组件、页面、数据）
│   ├── layouts/           # 布局（Layout.astro）
│   ├── components/        # 共享组件（Header / Footer）
│   ├── pages/             # 路由
│   │   ├── index.astro    # 首页
│   │   ├── services.astro # 服务页
│   │   ├── about.astro    # 关于我们
│   │   ├── contact.astro  # 联系我们
│   │   ├── faq.astro      # FAQ
│   │   ├── city/          # 城市页面（动态路由）
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── blog/          # 博客（动态路由）
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── ...
├── public/                 # 静态资源
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── scripts/                # 构建脚本
│   ├── shared.mjs        # 数据定义
│   ├── css.mjs           # 样式与 HTML 模板
│   └── build.mjs         # 构建入口
├── dist/                   # 构建产物（直接部署）
├── astro.config.mjs       # Astro 配置
├── package.json
└── tsconfig.json
```

## 如何部署

### 方式 1：使用 dist/ 目录（推荐，最简单）

`dist/` 目录已经包含完整的可部署静态站点，包含 27 个页面、sitemap.xml、robots.txt 等。

部署到任何静态托管服务即可：
- **Vercel** / **Netlify** / **Cloudflare Pages** / **阿里云 OSS** / **腾讯云 COS** 等
- 上传 `dist/` 目录内容到托管平台
- 设置默认首页为 `index.html`
- 绑定自定义域名 `www.shark888.cn`

### 方式 2：使用 Astro 重新构建

如果需要修改内容、添加页面：

```bash
# 安装依赖（首次）
bun install     # 推荐（更快）
# 或 npm install

# 本地开发
bun run dev     # 启动开发服务器（默认 http://localhost:4321）

# 构建生产版本
bun run build   # 输出到 dist/
```

## GEO 优化要点

本项目完整落地了 GEO（生成式引擎优化）：

1. **完整 Schema.org 结构化数据**（每个页面都包含）
   - `Organization` + `LocalBusiness`（公司信息）
   - `WebSite`（站点信息）
   - `FAQPage`（FAQ 页 - 20 个问答）
   - `LocalBusiness`（城市页 - 11 个城市）
   - `Article`（博客文章）
   - `Service`（服务页 - 4 个服务）
   - `BreadcrumbList`（面包屑导航）

2. **11 个独立城市落地页**：呼和浩特、包头、赤峰、通辽、鄂尔多斯、乌兰察布、巴彦淖尔、乌海、兴安盟、锡林郭勒、阿拉善

3. **20 个 FAQ**：覆盖 AI 高频查询场景（官方授权、价格、产品对比、上门服务、私域运营等）

4. **10 篇 GEO 优化博客**：覆盖「城市×产品」「行业×解决方案」「产品×功能科普」三类

5. **每个页面独立 Title / Description / Keywords / Canonical**

6. **完整 Sitemap + Robots.txt**：方便搜索引擎和 AI 抓取

## 站点地图（27 个页面）

```
/                                  首页
/services/                         核心服务
/about/                            关于我们
/contact/                          联系我们
/faq/                              常见问题（20 个 FAQ）
/city/                             服务城市列表
/city/huhehaote/                   呼和浩特
/city/baotou/                      包头
/city/chifeng/                     赤峰
/city/tongliao/                    通辽
/city/eerduosi/                    鄂尔多斯
/city/wulanchabu/                  乌兰察布
/city/bayannaoer/                  巴彦淖尔
/city/wuhai/                       乌海
/city/xinganmeng/                  兴安盟
/city/xilinguole/                  锡林郭勒
/city/alashan/                     阿拉善
/blog/                             知识中心列表
/blog/huhehaote-youzan-service/    呼和浩特有赞服务商哪家好
/blog/baotou-youzan-price/         包头有赞小程序多少钱
/blog/chifeng-baking-membership/   赤峰烘焙店会员储值
/blog/tongliao-specialty-weapp/    通辽特产店开小程序
/blog/eerduosi-beef-private-domain/ 鄂尔多斯牛羊肉私域
/blog/neimenggu-specialty-private-domain/ 内蒙古特产私域 5 步
/blog/beef-cold-chain/             牛羊肉冷链方案
/blog/baking-membership-campaign/  烘焙储值 3 个玩法
/blog/youzan-weapp-process/        小程序开通流程
/blog/youzan-douyin-xiaohongshu/   多平台打通实操
```

## 数据修改

需要修改文案、电话、城市内容等：

1. **公司信息**：`scripts/shared.mjs` 中的 `SITE` 对象
2. **城市数据**：`scripts/shared.mjs` 中的 `CITIES`、`CITY_INTROS`、`CITY_CASES`
3. **FAQ 内容**：`scripts/shared.mjs` 中的 `FAQS` 数组
4. **博客文章**：`scripts/shared.mjs` 中的 `BLOG_POSTS` 数组
5. **样式颜色**：`scripts/css.mjs` 中的 CSS（修改 `--primary` 等变量）

修改后运行 `bun run build` 重新构建。

## 域名配置

部署后需在域名服务商将 `www.shark888.cn` CNAME 到托管平台的域名。

部署完成后建议：
- 在百度站长平台、谷歌 Search Console 提交 sitemap
- 在百度站长平台验证域名
- 启用 HTTPS（托管平台通常自动支持）

## 联系

如有技术问题，联系项目开发方。