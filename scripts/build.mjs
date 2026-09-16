#!/usr/bin/env node
// 有赞内蒙古运营中心 - 静态站点构建脚本
// 使用纯 Node.js 标准库生成所有静态 HTML 页面
import { writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, CITIES, CITY_INTROS, CITY_CASES, INDUSTRIES, FAQS, BLOG_POSTS } from './shared.mjs';
import { htmlPage, defaultOrgSchema, websiteSchema, breadcrumbSchema, faqSchema } from './css.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

// 通用 CTA section
const ctaSection = (text = '预约免费上门演示') => `
<section class="cta-section">
  <div class="container">
    <h2>立即获取免费方案</h2>
    <p>拨打 <a href="tel:15652701682">15652701682</a>（同微信），${text}</p>
    <div class="cta-buttons">
      <a href="tel:15652701682" class="btn">电话咨询</a>
      <a href="/contact/" class="btn btn-secondary">在线咨询</a>
    </div>
  </div>
</section>`;

// 通用 breadcrumb
const breadcrumb = (path) => {
  const labels = { '/services/': '核心服务', '/about/': '关于我们', '/contact/': '联系我们', '/faq/': '常见问题', '/blog/': '知识中心', '/city/': '服务城市' };
  const items = [{ label: '首页', href: '/' }];
  if (labels[path]) items.push({ label: labels[path], href: path });
  return `<nav aria-label="breadcrumb" class="breadcrumb">
    <ol>${items.map((it, i) => `<li>${i < items.length - 1 ? `<a href="${it.href}">${it.label}</a>` : it.label}</li>`).join('')}</ol>
  </nav>`;
};

const breadcrumbCity = (slug, name) => `<nav aria-label="breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/">首页</a></li>
    <li><a href="/city/">服务城市</a></li>
    <li>${name}</li>
  </ol>
</nav>`;

const breadcrumbBlog = (slug, title) => `<nav aria-label="breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/">首页</a></li>
    <li><a href="/blog/">知识中心</a></li>
    <li>${title}</li>
  </ol>
</nav>`;

// ========== 首页 ==========
function buildIndex() {
  const title = '有赞内蒙古运营中心 | 有赞官方授权独家服务商 - 小程序商城·门店数字化·私域运营';
  const description = '有赞官方授权的内蒙古地区独家服务商，服务全内蒙12个盟市。提供有赞小程序商城搭建、门店数字化升级、会员私域运营一站式服务。已服务300+本地商家，免费上门演示，电话15652701682。';
  const keywords = '有赞内蒙古,有赞服务商,有赞代理商,小程序商城,门店数字化,私域运营,呼和浩特有赞';

  const services = [
    { icon: '&#128241;', title: '有赞小程序商城', desc: '微信商城、视频号带货、抖音本地生活、小红书开店，多平台一键同步，全网卖货无忧。', features: ['微信小程序商城', '视频号小店', '抖音本地生活', '小红书本地生活'] },
    { icon: '&#128187;', title: '门店数字化升级', desc: '智能收银、库存管理、扫码点单、外卖自提、同城配送，线上线下一体化经营。', features: ['智能收银系统', '扫码点单', '外卖自提', '多门店管理'] },
    { icon: '&#128101;', title: '会员私域运营', desc: '会员储值、积分等级、企微互通、精准营销，让老客户持续复购，复购率平均提升30%+。', features: ['会员储值系统', '积分等级', '企微助手', '精准营销'] },
    { icon: '&#127775;', title: '内蒙古本地专属服务', desc: '免费上门演示、一对一培训、店铺搭建上线、7×12小时售后，全内蒙12盟市本地化服务。', features: ['免费上门演示', '一对一培训', '7×12售后', '全内蒙覆盖'] }
  ];

  const stats = [
    { num: '300+', label: '服务商家' },
    { num: '12', label: '覆盖城市' },
    { num: '7', label: '深耕行业' },
    { num: '9', label: '年服务经验' }
  ];

  const industries = [
    { name: '特产', icon: '&#127807;', desc: '牛肉干、奶制品、羊绒制品线上销售，助力内蒙古特产走向全国' },
    { name: '牛羊肉', icon: '&#129385;', desc: '冷鲜肉、分割肉、礼盒装线上预订与配送，冷链配送全程可追溯' },
    { name: '烘焙', icon: '&#127856;', desc: '蛋糕面包预售、会员储值、节日营销，提升烘焙店客单价与复购' },
    { name: '酒水', icon: '&#127863;', desc: '白酒红酒精酿啤酒会员制销售，打造酒水行业私域营销标杆' },
    { name: '母婴', icon: '&#128118;', desc: '奶粉辅食用品私域会员运营，精准触达宝妈群体提升复购' },
    { name: '美业', icon: '&#128135;', desc: '美容美发美甲预约与会员管理，提升美业门店数字化水平' },
    { name: '咖啡茶饮', icon: '&#9749;', desc: '扫码点单、积分兑换、社群营销，适配年轻消费群体' }
  ];

  const cases = [
    { name: '伊利伊知牛', industry: '牛羊肉', result: '牛肉产品线上商城搭建，会员体系运营' },
    { name: '新华书店', industry: '零售', result: '线上线下图书销售一体化' },
    { name: '天骄航空', industry: '航空', result: '会员运营与积分体系' },
    { name: '内蒙古邮政', industry: '邮政', result: '邮政服务线上化' },
    { name: '莲七珠宝', industry: '珠宝', result: '珠宝门店数字化与私域运营' },
    { name: '额尔敦', industry: '牛羊肉', result: '羊肉产品线上预订与会员制' },
    { name: '云湃7天精酿', industry: '酒水', result: '精酿啤酒私域会员销售' },
    { name: '二子猪肉', industry: '生鲜', result: '猪肉产品线上预售与配送' }
  ];

  const processSteps = [
    { step: '1', title: '咨询需求', desc: '了解您的业务场景和需求' },
    { step: '2', title: '免费演示', desc: '上门或线上演示有赞功能' },
    { step: '3', title: '开通账号', desc: '协助开通有赞账号和认证' },
    { step: '4', title: '店铺搭建', desc: '装修店铺、上架商品' },
    { step: '5', title: '培训上线', desc: '一对一培训，正式上线' },
    { step: '6', title: '长期支持', desc: '7×12小时售后持续陪跑' }
  ];

  const body = `
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="tag">有赞官方授权</span>
        <span class="tag">内蒙古独家服务商</span>
      </div>
      <h1>有赞内蒙古运营中心</h1>
      <p class="hero-subtitle">实体店线上线下一体化 · 私域电商新零售 · 全内蒙古上门服务</p>
      <p class="hero-desc">我们为特产、牛羊肉、烘焙、酒水、母婴、美业、咖啡茶饮等实体商家提供有赞小程序商城搭建、门店数字化升级、会员私域运营等一站式解决方案。已服务<strong>300+</strong>内蒙古本地商家。</p>
      <div class="hero-cta">
        <a href="tel:15652701682" class="btn">免费咨询 15652701682</a>
        <a href="/services/" class="btn btn-secondary">了解核心服务</a>
      </div>
    </div>
    <div class="hero-stats">
      ${stats.map(s => `<div class="stat-item"><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>`).join('')}
    </div>
  </div>
</section>

<section class="services section">
  <div class="container">
    <h2 class="section-title">四大核心服务</h2>
    <p class="section-subtitle">从开店到运营，从获客到复购，全链路数字化解决方案</p>
    <div class="card-grid">
      ${services.map(s => `
        <div class="card service-card">
          <div class="service-icon">${s.icon}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <ul class="service-features">
            ${s.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <h2 class="section-title">服务全内蒙古12个盟市</h2>
    <p class="section-subtitle">无论您在哪个城市，我们都能提供本地化的上门服务</p>
    <div class="city-grid">
      ${CITIES.map(c => `<a href="/city/${c.slug}/" class="city-card"><span class="city-name">${c.name}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">深耕7大行业</h2>
    <p class="section-subtitle">每个行业都有成熟的解决方案和标杆案例</p>
    <div class="card-grid">
      ${industries.map(i => `
        <div class="card industry-card">
          <div class="industry-icon">${i.icon}</div>
          <h3>${i.name}</h3>
          <p>${i.desc}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <h2 class="section-title">部分客户案例</h2>
    <p class="section-subtitle">用有赞，让生意更好做</p>
    <div class="case-grid">
      ${cases.map(c => `
        <div class="case-card">
          <div class="case-name">${c.name}</div>
          <div class="case-industry">${c.industry}</div>
          <div class="case-result">${c.result}</div>
        </div>`).join('')}
    </div>
    <p class="case-more">更多案例请咨询 <a href="tel:15652701682">15652701682</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">合作流程</h2>
    <p class="section-subtitle">从咨询到上线，全程专人对接</p>
    <div class="process-steps">
      ${processSteps.map(p => `
        <div class="process-step">
          <div class="step-num">${p.step}</div>
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

${ctaSection()}`;

  return htmlPage({ title, description, keywords, currentPath: '/', schemas: [defaultOrgSchema, websiteSchema, faqSchema], body });
}

// ========== 服务页 ==========
function buildServices() {
  const title = '核心服务 | 有赞小程序商城·门店数字化·私域运营 - 有赞内蒙古运营中心';
  const description = '有赞内蒙古运营中心提供四大核心服务：有赞小程序商城搭建、门店数字化升级、会员私域运营、内蒙古本地专属服务。覆盖特产、牛羊肉、烘焙、酒水、母婴、美业、咖啡茶饮7大行业。';

  const services = [
    {
      icon: '&#128241;', title: '有赞小程序商城', subtitle: '一键开通多平台商城，全网卖货',
      desc: '为内蒙古商家搭建微信小程序商城、视频号小店，打通抖音本地生活、小红书本地生活、支付宝小程序、百度小程序等多平台，实现一个后台管理多个渠道，商品、订单、会员数据实时同步。',
      features: ['微信小程序商城搭建与装修', '视频号小店开通与带货', '抖音本地生活接入', '小红书本地生活开店', '支付宝/百度小程序', '商品上架与库存同步', '订单管理与物流对接', '营销活动配置（拼团/秒杀/优惠券）']
    },
    {
      icon: '&#128187;', title: '门店数字化升级', subtitle: '智能收银+库存管理，线上线下一体化',
      desc: '帮助实体门店实现全面数字化：智能收银系统、库存管理、多门店统一管理、扫码点单、外卖自提、同城配送。让门店经营更高效，顾客体验更流畅。',
      features: ['智能收银系统（支持多种硬件）', '库存管理与预警', '多门店统一管理', '扫码点单（堂食/外带）', '外卖自提与同城配送', '会员储值与次卡', '积分系统与等级体系', '企业微信互通']
    },
    {
      icon: '&#128101;', title: '会员私域运营', subtitle: '沉淀客户资产，让老客持续复购',
      desc: '搭建完整的私域运营体系：通过会员体系沉淀客户资产，利用企微助手连接导购与客户，借助智能CRM进行精准分层营销，配合拼团、秒杀、优惠券等营销工具提升复购率。我们服务过的客户复购率平均提升30%以上。',
      features: ['会员储值与充值赠送', '积分系统与积分商城', '会员等级与权益', '企业微信助手', '客户标签与分层', '精准营销推送', '拼团/秒杀/优惠券', '数据分析与报表']
    },
    {
      icon: '&#127775;', title: '内蒙古本地专属服务', subtitle: '本地化团队，面对面服务',
      desc: '我们是内蒙古本地团队，服务覆盖全内蒙12个盟市，提供免费的上门演示、面对面培训、店铺搭建支持等服务。呼和浩特、包头、呼伦贝尔、赤峰、通辽、鄂尔多斯等主要城市均可安排上门服务。',
      features: ['免费上门演示', '一对一培训', '店铺搭建与配置', '7×12小时售后支持', '营销活动策划', '定期回访优化', '紧急问题快速响应', '长期陪跑服务']
    }
  ];

  const industryRows = [
    { name: '特产', cases: '牛肉干、奶制品、羊绒制品线上销售' },
    { name: '牛羊肉', cases: '冷鲜肉、分割肉、礼盒装线上预订与配送' },
    { name: '烘焙', cases: '蛋糕面包预售、会员储值、节日营销' },
    { name: '酒水', cases: '白酒红酒精酿啤酒会员制销售' },
    { name: '母婴', cases: '奶粉辅食用品私域会员运营' },
    { name: '美业', cases: '美容美发美甲预约与会员管理' },
    { name: '咖啡茶饮', cases: '扫码点单、积分兑换、社群营销' }
  ];

  const body = `
<section class="page-hero">
  <div class="container">
    ${breadcrumb('/services/')}
    <h1>四大核心服务</h1>
    <p>从开店到运营，从获客到复购，全链路数字化解决方案</p>
  </div>
</section>

<section class="section">
  <div class="container">
    ${services.map((s, i) => `
      <div class="service-detail">
        <div class="service-row ${i % 2 === 1 ? 'reverse' : ''}">
          <div class="service-visual">
            <div class="service-big-icon">${s.icon}</div>
            <h2>${s.title}</h2>
            <p class="service-subtitle">${s.subtitle}</p>
          </div>
          <div class="service-content">
            <p class="service-desc">${s.desc}</p>
            <ul class="feature-list">
              ${s.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>`).join('')}
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <h2 class="section-title">7大深耕行业</h2>
    <p class="section-subtitle">每个行业都有成熟的解决方案和标杆案例</p>
    <div class="industry-table">
      ${industryRows.map(ind => `
        <div class="industry-row">
          <div class="industry-name">${ind.name}</div>
          <div class="industry-cases">${ind.cases}</div>
        </div>`).join('')}
    </div>
  </div>
</section>

${ctaSection()}`;

  const schemas = [
    defaultOrgSchema,
    websiteSchema,
    breadcrumbSchema('/services/'),
    {
      '@context': 'https://schema.org', '@type': 'Service',
      serviceType: '小程序商城搭建', provider: { '@id': 'https://www.shark888.cn/#organization' },
      name: '有赞小程序商城',
      description: '微信商城、视频号带货、抖音本地生活打通、小红书本地生活开店',
      areaServed: { '@type': 'AdministrativeArea', 'name': '内蒙古自治区' }
    },
    {
      '@context': 'https://schema.org', '@type': 'Service',
      serviceType: '门店数字化解决方案', provider: { '@id': 'https://www.shark888.cn/#organization' },
      name: '门店数字化升级',
      description: '门店收银、库存管理、扫码点单、外卖自提',
      areaServed: { '@type': 'AdministrativeArea', 'name': '内蒙古自治区' }
    },
    {
      '@context': 'https://schema.org', '@type': 'Service',
      serviceType: '私域运营服务', provider: { '@id': 'https://www.shark888.cn/#organization' },
      name: '会员私域运营',
      description: '会员储值、次卡、积分、等级、企业微信互通、老客户精准营销',
      areaServed: { '@type': 'AdministrativeArea', 'name': '内蒙古自治区' }
    },
    {
      '@context': 'https://schema.org', '@type': 'Service',
      serviceType: '本地化上门支持', provider: { '@id': 'https://www.shark888.cn/#organization' },
      name: '内蒙古本地专属服务',
      description: '免费上门演示、一对一培训、7×12小时售后支持',
      areaServed: { '@type': 'AdministrativeArea', 'name': '内蒙古自治区' }
    }
  ];
  return htmlPage({ title, description, currentPath: '/services/', schemas, body });
}

// ========== 关于我们 ==========
function buildAbout() {
  const title = '关于我们 | 有赞内蒙古运营中心 - 内蒙古神客科技有限公司';
  const description = '了解有赞内蒙古运营中心。我们是内蒙古神客科技有限公司，有赞官方授权的内蒙古地区独家服务商，已服务300余家内蒙古本地企业，覆盖全内蒙12个盟市。';

  const clients = [
    { name: '伊利伊知牛', desc: '牛肉产品线上商城搭建，会员体系运营' },
    { name: '新华书店', desc: '线上线下图书销售一体化' },
    { name: '天骄航空', desc: '会员运营与积分体系' },
    { name: '内蒙古邮政', desc: '邮政服务线上化' },
    { name: '莲七珠宝', desc: '珠宝门店数字化与私域运营' },
    { name: '巴盟人家', desc: '餐饮门店数字化升级' },
    { name: '兴泰乐泰汇', desc: '商业综合体数字化运营' },
    { name: '额尔敦', desc: '羊肉产品线上预订与会员制' },
    { name: '云湃7天精酿', desc: '精酿啤酒私域会员销售' },
    { name: '二子猪肉', desc: '猪肉产品线上预售与配送' },
    { name: '海鹏', desc: '烘焙产品线上销售' },
    { name: '康新食品', desc: '食品企业数字化升级' }
  ];

  const whyCards = [
    { title: '官方独家授权', desc: '有赞官方授权的内蒙古地区独家服务商，拥有最完整的服务网络和最直接的官方支持通道。' },
    { title: '全内蒙覆盖', desc: '服务覆盖呼和浩特、包头、呼伦贝尔、赤峰、通辽、鄂尔多斯等全内蒙12个盟市，无论您在哪里都能获得本地化服务。' },
    { title: '行业深耕', desc: '针对特产、牛羊肉、烘焙、酒水、母婴、美业、咖啡茶饮7大行业，提供成熟的专业解决方案。' },
    { title: '本地化服务', desc: '内蒙古本地团队，提供免费上门演示、面对面培训、7×12小时售后支持。' },
    { title: '全链路交付', desc: '从咨询、演示、开通、搭建、培训到售后，全程专人对接，确保平稳上线。' },
    { title: '标杆案例', desc: '服务伊利伊知牛、新华书店、天骄航空、内蒙古邮政、莲七珠宝等知名企业。' }
  ];

  const body = `
<section class="page-hero">
  <div class="container">
    ${breadcrumb('/about/')}
    <h1>关于我们</h1>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="about-grid">
      <div class="about-intro">
        <h2>有赞官方授权的内蒙古独家服务商</h2>
        <p>内蒙古神客科技有限公司是有赞官方授权的<strong>内蒙古地区独家服务商与代理商</strong>。自2015年成立以来，我们始终专注于为内蒙古本地实体商家提供数字化升级服务。</p>
        <p>我们总部位于呼和浩特市赛罕区金桥电子商务产业园，服务网络覆盖全内蒙古<strong>12个盟市</strong>，累计服务本地企业客户<strong>300余家</strong>，深耕特产、牛羊肉、烘焙、酒水、母婴、美业、咖啡茶饮<strong>7大行业</strong>。</p>
        <p>我们的使命是帮助内蒙古实体商家实现线上线下一体化经营，通过有赞SaaS平台和本地化专业服务，让每一位商家都能轻松拥抱数字化新零售。</p>
      </div>
      <div class="about-stats">
        <div class="about-stat"><div class="about-stat-num">2015</div><div class="about-stat-label">成立年份</div></div>
        <div class="about-stat"><div class="about-stat-num">300+</div><div class="about-stat-label">服务商家</div></div>
        <div class="about-stat"><div class="about-stat-num">12</div><div class="about-stat-label">覆盖城市</div></div>
        <div class="about-stat"><div class="about-stat-num">7</div><div class="about-stat-label">深耕行业</div></div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <h2 class="section-title">为什么选择我们</h2>
    <div class="why-grid">
      ${whyCards.map(w => `<div class="why-card"><h3>${w.title}</h3><p>${w.desc}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">部分客户案例</h2>
    <div class="client-grid">
      ${clients.map(c => `<div class="client-card"><div class="client-name">${c.name}</div><div class="client-desc">${c.desc}</div></div>`).join('')}
    </div>
  </div>
</section>

${ctaSection()}`;

  const schemas = [defaultOrgSchema, websiteSchema, breadcrumbSchema('/about/'),
    { '@context': 'https://schema.org', '@type': 'AboutPage', name: '关于我们 - 有赞内蒙古运营中心', url: 'https://www.shark888.cn/about/', mainEntity: { '@id': 'https://www.shark888.cn/#organization' } }
  ];
  return htmlPage({ title, description, currentPath: '/about/', schemas, body });
}

// ========== 联系我们 ==========
function buildContact() {
  const title = '联系我们 | 有赞内蒙古运营中心 - 电话15652701682';
  const description = '联系有赞内蒙古运营中心，获取免费咨询服务。电话：15652701682（同微信）。地址：呼和浩特市赛罕区金桥电子商务产业园3楼326。';

  const body = `
<section class="page-hero">
  <div class="container">
    ${breadcrumb('/contact/')}
    <h1>联系我们</h1>
    <p>有任何问题，欢迎随时联系我们</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <h2>联系方式</h2>
        <div class="contact-item"><div class="contact-icon">&#9742;</div><div><h3>电话咨询</h3><p><a href="tel:15652701682">15652701682</a>（同微信）</p></div></div>
        <div class="contact-item"><div class="contact-icon">&#9993;</div><div><h3>电子邮箱</h3><p><a href="mailto:${SITE.email}">${SITE.email}</a></p></div></div>
        <div class="contact-item"><div class="contact-icon">&#127968;</div><div><h3>公司地址</h3><p>呼和浩特市赛罕区金桥电子商务产业园3楼326</p></div></div>
        <div class="contact-item"><div class="contact-icon">&#128338;</div><div><h3>服务时间</h3><p>周一至周日 09:00 - 21:00</p></div></div>
        <div class="contact-item"><div class="contact-icon">&#127760;</div><div><h3>官方网站</h3><p><a href="https://www.shark888.cn">www.shark888.cn</a></p></div></div>
        <div class="contact-cities">
          <h3>服务覆盖城市</h3>
          <div class="city-tags">
            ${CITIES.map(c => `<span class="city-tag-mini">${c.name}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="contact-cta">
        <div class="cta-box">
          <h3>立即获取免费方案</h3>
          <p>留下您的联系方式，我们将在30分钟内与您联系，为您量身定制数字化升级方案。</p>
          <a href="tel:15652701682" class="btn">拨打 15652701682</a>
          <p class="cta-note">或添加微信：15652701682</p>
        </div>
        <div class="cta-box cta-box-alt">
          <h3>免费上门演示</h3>
          <p>呼和浩特、包头、呼伦贝尔、赤峰、通辽、鄂尔多斯等主要城市均可安排上门服务。</p>
          <a href="tel:15652701682" class="btn btn-secondary">预约上门演示</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const schemas = [defaultOrgSchema, websiteSchema, breadcrumbSchema('/contact/'),
    { '@context': 'https://schema.org', '@type': 'ContactPage', name: '联系我们 - 有赞内蒙古运营中心', url: 'https://www.shark888.cn/contact/', mainEntity: { '@id': 'https://www.shark888.cn/#organization' } }
  ];
  return htmlPage({ title, description, currentPath: '/contact/', schemas, body });
}

// ========== FAQ ==========
function buildFAQ() {
  const title = '常见问题 | 有赞内蒙古运营中心 - FAQ';
  const description = '关于有赞内蒙古运营中心服务的常见问题解答。涵盖官方授权、产品服务、价格、开通流程、售后服务等。如有其他疑问，欢迎致电15652701682。';

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  };

  const body = `
<section class="page-hero">
  <div class="container">
    ${breadcrumb('/faq/')}
    <h1>常见问题解答</h1>
    <p>关于有赞内蒙古运营中心服务的常见问题，如果您有其他疑问，欢迎致电咨询</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="faq-list">
      ${FAQS.map((f, i) => `
        <div class="faq-item">
          <h3><span class="faq-num">${i + 1}</span>${f.q}</h3>
          <p>${f.a}</p>
        </div>`).join('')}
    </div>
    <div class="faq-cta">
      <h3>还有其他问题？</h3>
      <p>欢迎拨打 <a href="tel:15652701682">15652701682</a>（同微信）或直接到店面谈</p>
      <a href="/contact/" class="btn">联系我们</a>
    </div>
  </div>
</section>`;

  return htmlPage({ title, description, currentPath: '/faq/', schemas: [defaultOrgSchema, websiteSchema, breadcrumbSchema('/faq/'), faqSchema], body });
}

// ========== 城市列表页 ==========
function buildCityIndex() {
  const title = '服务城市 | 有赞内蒙古运营中心 - 覆盖全内蒙12个盟市';
  const description = '有赞内蒙古运营中心服务覆盖全内蒙古12个盟市：呼和浩特、包头、呼伦贝尔、赤峰、通辽、鄂尔多斯、乌兰察布、巴彦淖尔、乌海、兴安盟、锡林郭勒、阿拉善。无论您在哪个城市，都能获得本地化上门服务。';

  const promises = [
    { strong: '免费上门演示', desc: '主要城市均可安排专业人员上门演示有赞功能' },
    { strong: '一对一培训', desc: '根据您的业务场景，提供针对性的操作培训' },
    { strong: '7×12小时售后', desc: '工作日和周末均有专人响应，确保问题及时解决' },
    { strong: '长期陪跑', desc: '不是一次性交付，而是持续陪伴您的数字化成长' }
  ];

  const body = `
<section class="page-hero">
  <div class="container">
    ${breadcrumb('/city/')}
    <h1>服务全内蒙古12个盟市</h1>
    <p>无论您在哪个城市，我们都能提供本地化的上门服务</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="city-list-page">
      ${CITIES.map(c => `
        <a href="/city/${c.slug}/" class="city-list-card">
          <div class="city-info"><h3>${c.name}</h3><p>${c.desc}</p></div>
          <span class="city-arrow">&rarr;</span>
        </a>`).join('')}
    </div>
    <div class="service-promise">
      <h2>服务承诺</h2>
      <div class="promise-grid">
        ${promises.map(p => `<div class="promise-item"><strong>${p.strong}</strong><p>${p.desc}</p></div>`).join('')}
      </div>
    </div>
  </div>
</section>

${ctaSection('预约您所在城市的免费上门演示')}`;

  return htmlPage({ title, description, currentPath: '/city/', schemas: [defaultOrgSchema, websiteSchema, breadcrumbSchema('/city/')], body });
}

// ========== 单个城市页 ==========
function buildCity(city) {
  const title = `${city.name}有赞服务商_小程序商城_门店数字化_私域运营_内蒙古神客科技`;
  const description = `${city.name}有赞官方授权服务商，提供有赞小程序商城搭建、门店数字化升级、会员私域运营服务。免费上门演示，咨询电话15652701682。深耕${city.specialties.join('、')}等行业。`;
  const keywords = `${city.name}有赞,有赞服务商,小程序商城,门店数字化,私域运营,有赞代理,${city.specialties.join(',')}`;
  const canonical = `/city/${city.slug}/`;
  const currentPath = canonical;

  const intro = CITY_INTROS[city.slug];
  const cases = CITY_CASES[city.slug] || [];

  const services = [
    { title: '有赞小程序商城', desc: `为${city.name}商家搭建微信商城、视频号小店，打通抖音、小红书本地生活，实现多平台同步经营。` },
    { title: '门店数字化升级', desc: `智能收银、库存管理、扫码点单、外卖自提、同城配送，帮助${city.name}实体门店实现线上线下一体化。` },
    { title: '会员私域运营', desc: `会员储值、积分、等级体系，企业微信互通，精准营销触达，让${city.name}商家老客户持续复购。` },
    { title: '本地化上门服务', desc: `${city.name}本地团队，免费上门演示、一对一培训、7×12小时售后支持，资料齐全3-7天即可上线。` }
  ];

  const whyItems = [
    { strong: '官方独家授权', desc: '有赞官方授权的内蒙古地区独家服务商' },
    { strong: '本地化服务', desc: `${city.name}本地团队，可安排上门服务` },
    { strong: '全流程交付', desc: '开通—搭建—培训—运营—售后一条龙' },
    { strong: '价格透明', desc: '无隐形收费，免费咨询报价' }
  ];

  const otherCities = CITIES.filter(c => c.slug !== city.slug);

  const body = `
<section class="page-hero">
  <div class="container">
    ${breadcrumbCity(city.slug, city.name)}
    <h1>${city.name}有赞服务商</h1>
    <p>小程序商城 · 门店数字化 · 私域运营 · 免费上门演示</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="city-intro">
      <h2>${city.name}有赞官方授权服务商</h2>
      <p>${intro}</p>
      <p>服务电话：<a href="tel:15652701682">15652701682</a>（同微信） | 免费上门演示</p>
    </div>

    <h3 style="margin-top:48px;margin-bottom:24px;font-size:1.4rem;font-weight:700;text-align:center;">我们在${city.name}提供的服务</h3>
    <div class="card-grid">
      ${services.map(s => `<div class="card"><h4>${s.title}</h4><p>${s.desc}</p></div>`).join('')}
    </div>

    <h3 style="margin-top:48px;margin-bottom:24px;font-size:1.4rem;font-weight:700;text-align:center;">${city.name}特色行业</h3>
    <div class="specialty-grid">
      ${city.specialties.map(s => `<div class="specialty-card"><span class="specialty-icon">&#127807;</span><span>${s}</span></div>`).join('')}
    </div>

    ${cases.length > 0 ? `
      <h3 style="margin-top:48px;margin-bottom:24px;font-size:1.4rem;font-weight:700;text-align:center;">${city.name}本地客户案例</h3>
      <div class="case-grid">
        ${cases.map(c => `<div class="case-card"><div class="case-name">${c.name}</div><div class="case-result">${c.result}</div></div>`).join('')}
      </div>
    ` : ''}

    <h3 style="margin-top:48px;margin-bottom:24px;font-size:1.4rem;font-weight:700;text-align:center;">为什么选择我们</h3>
    <div class="why-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
      ${whyItems.map(w => `<div class="why-item"><strong>${w.strong}</strong><p>${w.desc}</p></div>`).join('')}
    </div>

    <div class="nearby-cities">
      <h4>其他服务城市</h4>
      <div class="nearby-list">
        ${otherCities.map(c => `<a href="/city/${c.slug}/">${c.name}</a>`).join('')}
      </div>
    </div>
  </div>
</section>

${ctaSection(`预约${city.name}免费上门演示`)}`;

  const schemas = [
    defaultOrgSchema,
    websiteSchema,
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.shark888.cn/' },
        { '@type': 'ListItem', position: 2, name: '服务城市', item: 'https://www.shark888.cn/city/' },
        { '@type': 'ListItem', position: 3, name: city.name, item: `https://www.shark888.cn/city/${city.slug}/` }
      ]
    },
    {
      '@context': 'https://schema.org', '@type': 'LocalBusiness',
      name: `有赞${city.name}服务中心`,
      description: `有赞官方授权${city.name}服务商，提供小程序商城、门店数字化、私域运营一站式服务`,
      url: `https://www.shark888.cn/city/${city.slug}/`,
      telephone: '+86-15652701682',
      address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: '内蒙古自治区', addressCountry: 'CN' },
      geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
      areaServed: { '@type': 'City', name: city.name },
      parentOrganization: { '@id': 'https://www.shark888.cn/#organization' }
    }
  ];
  return htmlPage({ title, description, keywords, canonical, currentPath, schemas, body });
}

// ========== 博客列表 ==========
function buildBlogIndex() {
  const title = '知识中心 | 有赞内蒙古运营中心 - 数字化经营干货';
  const description = '有赞内蒙古运营中心知识中心，分享小程序商城搭建、门店数字化升级、会员私域运营等实操干货。覆盖内蒙古12个盟市、7大行业的数字化经营指南。';

  const body = `
<section class="page-hero">
  <div class="container">
    ${breadcrumb('/blog/')}
    <h1>知识中心</h1>
    <p>分享数字化经营干货，助力内蒙古实体商家转型升级</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="post-grid">
      ${BLOG_POSTS.map(p => `
        <a href="/blog/${p.slug}/" class="post-card">
          <div class="post-meta">
            <span class="post-category">${p.category}</span>
            <span class="post-date">${p.date}</span>
          </div>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <span class="read-more">阅读全文 &rarr;</span>
        </a>`).join('')}
    </div>
  </div>
</section>

${ctaSection('获取专属数字化升级方案')}`;

  return htmlPage({ title, description, currentPath: '/blog/', schemas: [defaultOrgSchema, websiteSchema, breadcrumbSchema('/blog/')], body });
}

// ========== 单篇博客 ==========
function buildBlogPost(post) {
  const title = `${post.title} - 有赞内蒙古运营中心`;
  const description = post.excerpt;
  const canonical = `/blog/${post.slug}/`;
  const currentPath = canonical;

  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title, description: post.excerpt,
    author: { '@type': 'Organization', name: '有赞内蒙古运营中心', '@id': 'https://www.shark888.cn/#organization' },
    publisher: { '@type': 'Organization', name: '有赞内蒙古运营中心', logo: { '@type': 'ImageObject', url: 'https://www.shark888.cn/logo.png' } },
    datePublished: post.date, dateModified: post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.shark888.cn/blog/${post.slug}/` }
  };

  const bcSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.shark888.cn/' },
      { '@type': 'ListItem', position: 2, name: '知识中心', item: 'https://www.shark888.cn/blog/' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.shark888.cn/blog/${post.slug}/` }
    ]
  };

  const body = `
<article class="blog-post">
  <div class="container">
    ${breadcrumbBlog(post.slug, post.title)}
    <header class="post-header">
      <div class="post-meta">
        <span class="post-category">${post.category}</span>
        <time datetime="${post.date}">${post.date}</time>
      </div>
      <h1>${post.title}</h1>
      <p class="post-excerpt">${post.excerpt}</p>
    </header>
    <div class="post-content">${post.content}</div>
    <div class="post-footer">
      <p>本文作者：有赞内蒙古运营中心</p>
      <p>如有疑问，欢迎致电 <a href="tel:15652701682">15652701682</a>（同微信）或访问 <a href="https://www.shark888.cn">www.shark888.cn</a></p>
    </div>
    <div class="post-nav">
      <a href="/blog/" class="btn btn-secondary">&larr; 返回知识中心</a>
      <a href="/contact/" class="btn">咨询相关问题</a>
    </div>
  </div>
</article>`;

  return htmlPage({ title, description, canonical, currentPath, schemas: [defaultOrgSchema, websiteSchema, articleSchema, bcSchema], body });
}

// ========== 构建所有页面 ==========
function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function writePage(dir, filename, content) {
  const filepath = join(dir, filename);
  ensureDir(dirname(filepath));
  writeFileSync(filepath, content, 'utf-8');
  console.log(`  ✓ ${filename}`);
}

// 写静态资源
function writeAssets() {
  const publicDir = join(ROOT, 'public');
  const files = ['robots.txt', 'sitemap.xml', 'favicon.svg'];
  for (const f of files) {
    const src = join(publicDir, f);
    const dest = join(DIST, f);
    if (existsSync(src)) {
      copyFileSync(src, dest);
      console.log(`  ✓ ${f} (copied from public/)`);
    }
  }
}

// 生成更新后的 sitemap（含全部页面）
function generateSitemap() {
  const urls = [
    { loc: 'https://www.shark888.cn/', priority: '1.0', changefreq: 'weekly' },
    { loc: 'https://www.shark888.cn/services/', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://www.shark888.cn/about/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://www.shark888.cn/contact/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://www.shark888.cn/faq/', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://www.shark888.cn/city/', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://www.shark888.cn/blog/', priority: '0.8', changefreq: 'weekly' }
  ];
  for (const c of CITIES) urls.push({ loc: `https://www.shark888.cn/city/${c.slug}/`, priority: '0.8', changefreq: 'weekly' });
  for (const p of BLOG_POSTS) urls.push({ loc: `https://www.shark888.cn/blog/${p.slug}/`, priority: '0.7', changefreq: 'monthly' });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>`;
  writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8');
  console.log('  ✓ sitemap.xml (generated)');
}

// 主流程
console.log('=== 有赞内蒙古运营中心 静态站点构建 ===\n');
console.log('输出目录: ' + DIST + '\n');

// 确保 dist 目录存在
ensureDir(DIST);

// 写静态资源
console.log('[1/4] 复制静态资源...');
writeAssets();
generateSitemap();

// 写核心页面
console.log('\n[2/4] 构建核心页面...');
writePage(DIST, 'index.html', buildIndex());
writePage(join(DIST, 'services'), 'index.html', buildServices());
writePage(join(DIST, 'about'), 'index.html', buildAbout());
writePage(join(DIST, 'contact'), 'index.html', buildContact());
writePage(join(DIST, 'faq'), 'index.html', buildFAQ());

// 写城市页面
console.log('\n[3/4] 构建城市页面 (' + CITIES.length + ' 个)...');
writePage(join(DIST, 'city'), 'index.html', buildCityIndex());
for (const city of CITIES) {
  writePage(join(DIST, 'city', city.slug), 'index.html', buildCity(city));
}

// 写博客页面
console.log('\n[4/4] 构建博客页面 (' + BLOG_POSTS.length + ' 篇)...');
writePage(join(DIST, 'blog'), 'index.html', buildBlogIndex());
for (const post of BLOG_POSTS) {
  writePage(join(DIST, 'blog', post.slug), 'index.html', buildBlogPost(post));
}

console.log('\n=== 构建完成 ===');
console.log(`共生成页面：${4 + 1 + CITIES.length + 1 + BLOG_POSTS.length} 个`);
console.log(`输出目录：${DIST}`);
