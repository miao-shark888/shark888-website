// 共享 CSS 样式
export const CSS = `
:root {
  --primary: #ff4d4f;
  --primary-dark: #d9363e;
  --secondary: #1890ff;
  --text: #1a1a2e;
  --text-light: #4a4a5a;
  --bg: #ffffff;
  --bg-light: #f8f9fa;
  --bg-dark: #1a1a2e;
  --border: #e8e8e8;
  --radius: 8px;
  --shadow: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
  --max-width: 1200px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: var(--text);
  line-height: 1.7;
  background: var(--bg);
}
a { color: var(--secondary); text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; height: auto; }
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 24px; }
.btn {
  display: inline-block;
  padding: 14px 32px;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  text-decoration: none;
}
.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}
.btn-secondary:hover { background: var(--primary); color: white; }
.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
}
.section-subtitle {
  text-align: center;
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 48px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.card {
  background: white;
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255,77,79,0.1);
  color: var(--primary);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}
.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  font-size: 1.1rem;
}
.main-nav ul {
  display: flex;
  gap: 28px;
  list-style: none;
}
.main-nav a {
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 4px 0;
  position: relative;
}
.main-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s;
}
.main-nav a:hover::after, .main-nav a.active::after { width: 100%; }
.header-phone {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.9rem;
}
.header-phone:hover { background: var(--primary-dark); text-decoration: none; }
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.site-footer {
  background: var(--bg-dark);
  color: rgba(255,255,255,0.7);
  padding: 64px 0 24px;
}
.site-footer a { color: rgba(255,255,255,0.7); }
.site-footer a:hover { color: white; }
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}
.footer-brand h3 { color: white; font-size: 1.3rem; margin-bottom: 8px; }
.footer-brand p { margin-bottom: 4px; }
.footer-desc { margin: 16px 0; line-height: 1.8; }
.footer-contact { margin-top: 16px; }
.footer-contact p { margin-bottom: 6px; }
.footer-links h4 { color: white; font-size: 1rem; margin-bottom: 16px; }
.footer-links ul { list-style: none; }
.footer-links li { margin-bottom: 8px; }
.city-list { display: grid; grid-template-columns: 1fr 1fr; gap: 0 12px; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  text-align: center;
  font-size: 0.85rem;
}
.footer-icp { margin-top: 8px; color: rgba(255,255,255,0.5); }
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  padding: 80px 0 60px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255,77,79,0.15) 0%, transparent 70%);
  border-radius: 50%;
}
.hero-inner { position: relative; z-index: 1; }
.hero-badge { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
.hero-badge .tag { background: rgba(255,255,255,0.15); color: white; backdrop-filter: blur(4px); }
.hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 16px; line-height: 1.2; }
.hero-subtitle { font-size: 1.3rem; color: rgba(255,255,255,0.85); margin-bottom: 16px; font-weight: 500; }
.hero-desc { font-size: 1.05rem; color: rgba(255,255,255,0.7); max-width: 600px; margin-bottom: 32px; line-height: 1.8; }
.hero-desc strong { color: #ff4d4f; }
.hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }
.hero-stats {
  display: flex;
  gap: 48px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.stat-item { text-align: center; }
.stat-num { font-size: 2.5rem; font-weight: 800; color: #ff4d4f; line-height: 1; }
.stat-label { font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-top: 8px; }
.section { padding: 80px 0; }
.bg-light { background: var(--bg-light); }
.service-card { text-align: center; }
.service-icon { font-size: 3rem; margin-bottom: 16px; }
.service-card h3 { font-size: 1.25rem; margin-bottom: 12px; }
.service-features {
  list-style: none;
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.service-features li {
  padding: 4px 12px;
  background: var(--bg-light);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--text-light);
}
.city-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}
.city-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  font-weight: 600;
  color: var(--text);
  transition: all 0.3s;
}
.city-card:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-4px);
  text-decoration: none;
}
.city-tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: var(--primary);
  color: white;
  border-radius: 12px;
}
.city-card:hover .city-tag { background: white; color: var(--primary); }
.industry-card { text-align: center; }
.industry-icon { font-size: 2.5rem; margin-bottom: 12px; }
.industry-card h3 { margin-bottom: 8px; }
.industry-card p { font-size: 0.9rem; color: var(--text-light); }
.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.case-card {
  background: white;
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--primary);
}
.case-name { font-weight: 700; font-size: 1.1rem; margin-bottom: 4px; }
.case-industry {
  display: inline-block;
  padding: 2px 10px;
  background: rgba(255,77,79,0.1);
  color: var(--primary);
  border-radius: 12px;
  font-size: 0.8rem;
  margin-bottom: 8px;
}
.case-result { font-size: 0.9rem; color: var(--text-light); }
.case-more { text-align: center; margin-top: 32px; color: var(--text-light); }
.process-steps {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}
.process-step {
  text-align: center;
  flex: 1;
  min-width: 150px;
  max-width: 180px;
}
.step-num {
  width: 48px;
  height: 48px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 auto 16px;
}
.process-step h4 { margin-bottom: 8px; }
.process-step p { font-size: 0.9rem; color: var(--text-light); }
.cta-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}
.cta-section h2 { font-size: 2.2rem; margin-bottom: 16px; }
.cta-section p { font-size: 1.1rem; margin-bottom: 32px; opacity: 0.9; }
.cta-section a { color: white; text-decoration: underline; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.cta-section .btn { background: white; color: var(--primary); }
.cta-section .btn:hover { background: var(--bg-light); }
.cta-section .btn-secondary { background: transparent; color: white; border-color: white; }
.cta-section .btn-secondary:hover { background: white; color: var(--primary); }
.page-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 48px 0 40px;
}
.breadcrumb ol {
  display: flex;
  list-style: none;
  gap: 8px;
  font-size: 0.9rem;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.breadcrumb a { color: rgba(255,255,255,0.7); }
.breadcrumb li:not(:last-child)::after {
  content: '>';
  margin-left: 8px;
  color: rgba(255,255,255,0.4);
}
.page-hero h1 { font-size: 2.5rem; margin-bottom: 12px; }
.page-hero p { color: rgba(255,255,255,0.7); font-size: 1.1rem; }
.service-detail { margin-bottom: 64px; }
.service-detail:last-child { margin-bottom: 0; }
.service-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.service-row.reverse { direction: rtl; }
.service-row.reverse > * { direction: ltr; }
.service-visual { text-align: center; }
.service-big-icon { font-size: 5rem; margin-bottom: 16px; }
.service-visual h2 { font-size: 1.8rem; margin-bottom: 8px; }
.service-subtitle { color: var(--text-light); font-size: 1.05rem; }
.service-desc { font-size: 1.05rem; margin-bottom: 24px; line-height: 1.8; }
.feature-list { list-style: none; }
.feature-list li {
  padding: 10px 0;
  padding-left: 28px;
  position: relative;
  border-bottom: 1px solid var(--border);
}
.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 700;
}
.industry-table { max-width: 800px; margin: 0 auto; }
.industry-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.industry-name { font-weight: 700; font-size: 1.1rem; }
.industry-cases { color: var(--text-light); }
.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 64px;
  align-items: start;
}
.about-intro h2 { font-size: 1.8rem; margin-bottom: 20px; }
.about-intro p { margin-bottom: 16px; line-height: 1.8; font-size: 1.05rem; }
.about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.about-stat {
  background: var(--bg-light);
  padding: 24px;
  border-radius: var(--radius);
  text-align: center;
}
.about-stat-num { font-size: 2rem; font-weight: 800; color: var(--primary); }
.about-stat-label { margin-top: 4px; color: var(--text-light); font-size: 0.9rem; }
.why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.why-card { padding: 32px; border-radius: var(--radius); box-shadow: var(--shadow); }
.why-card h3 { margin-bottom: 12px; font-size: 1.15rem; }
.why-card p { color: var(--text-light); line-height: 1.7; }
.client-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.client-card {
  background: white;
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border-left: 3px solid var(--primary);
}
.client-name { font-weight: 700; margin-bottom: 4px; }
.client-desc { font-size: 0.9rem; color: var(--text-light); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
.contact-info h2 { font-size: 1.8rem; margin-bottom: 32px; }
.contact-item { display: flex; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--border); }
.contact-icon {
  width: 48px;
  height: 48px;
  background: var(--bg-light);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}
.contact-item h3 { font-size: 1rem; margin-bottom: 4px; }
.contact-item p { color: var(--text-light); }
.contact-cities { margin-top: 32px; }
.contact-cities h3 { margin-bottom: 16px; }
.city-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.city-tag-mini { padding: 6px 14px; background: var(--bg-light); border-radius: 20px; font-size: 0.9rem; }
.contact-cta { display: flex; flex-direction: column; gap: 24px; }
.cta-box { background: var(--bg-light); padding: 32px; border-radius: var(--radius); text-align: center; }
.cta-box h3 { margin-bottom: 12px; }
.cta-box p { color: var(--text-light); margin-bottom: 24px; }
.cta-note { font-size: 0.85rem; margin-top: 12px; margin-bottom: 0 !important; }
.cta-box-alt { background: white; box-shadow: var(--shadow); }
.faq-list { max-width: 900px; margin: 0 auto; }
.faq-item { padding: 24px 0; border-bottom: 1px solid var(--border); }
.faq-item h3 {
  font-size: 1.15rem;
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.faq-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}
.faq-item p { color: var(--text-light); line-height: 1.8; padding-left: 40px; }
.faq-cta {
  text-align: center;
  margin-top: 48px;
  padding: 40px;
  background: var(--bg-light);
  border-radius: var(--radius);
}
.faq-cta h3 { margin-bottom: 12px; }
.faq-cta p { color: var(--text-light); margin-bottom: 20px; }
.city-list-page { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-bottom: 64px; }
.city-list-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--text);
  transition: all 0.3s;
}
.city-list-card:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-4px);
  text-decoration: none;
}
.city-list-card:hover p { color: rgba(255,255,255,0.8); }
.city-list-card:hover .city-arrow { color: white; }
.city-info h3 { margin-bottom: 4px; font-size: 1.2rem; }
.city-info p { font-size: 0.9rem; color: var(--text-light); }
.city-arrow { font-size: 1.5rem; color: var(--primary); font-weight: 700; }
.service-promise h2 { text-align: center; font-size: 1.8rem; margin-bottom: 32px; }
.promise-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.promise-item { text-align: center; padding: 32px; background: var(--bg-light); border-radius: var(--radius); }
.promise-item strong { display: block; margin-bottom: 8px; font-size: 1.1rem; }
.promise-item p { color: var(--text-light); font-size: 0.9rem; }
.city-intro { text-align: center; max-width: 800px; margin: 0 auto; }
.city-intro h2 { font-size: 1.8rem; margin-bottom: 16px; }
.city-intro p { margin-bottom: 12px; line-height: 1.8; }
.city-intro a { color: var(--primary); font-weight: 600; }
.specialty-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.specialty-card { display: flex; align-items: center; gap: 12px; padding: 20px; background: var(--bg-light); border-radius: var(--radius); font-weight: 600; }
.specialty-icon { font-size: 1.5rem; }
.why-item { text-align: center; padding: 24px; background: var(--bg-light); border-radius: var(--radius); }
.why-item strong { display: block; margin-bottom: 8px; font-size: 1.1rem; }
.why-item p { color: var(--text-light); font-size: 0.9rem; }
.nearby-cities { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); }
.nearby-cities h4 { margin-bottom: 16px; }
.nearby-list { display: flex; flex-wrap: wrap; gap: 12px; }
.nearby-list a { padding: 8px 16px; background: var(--bg-light); border-radius: var(--radius); font-size: 0.9rem; }
.nearby-list a:hover { background: var(--primary); color: white; text-decoration: none; }
.post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
.post-card {
  display: block;
  background: white;
  padding: 28px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--text);
  transition: all 0.3s;
}
.post-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); text-decoration: none; }
.post-meta { display: flex; gap: 12px; margin-bottom: 12px; font-size: 0.85rem; }
.post-category { padding: 2px 10px; background: rgba(255,77,79,0.1); color: var(--primary); border-radius: 12px; font-weight: 500; }
.post-date { color: var(--text-light); }
.post-card h3 { font-size: 1.15rem; margin-bottom: 8px; line-height: 1.4; }
.post-card p { color: var(--text-light); font-size: 0.95rem; line-height: 1.6; margin-bottom: 12px; }
.read-more { color: var(--primary); font-weight: 600; font-size: 0.9rem; }
.blog-post { padding: 32px 0 64px; }
.post-header { margin-bottom: 40px; }
.post-header h1 { font-size: 2rem; margin-bottom: 16px; line-height: 1.3; }
.post-excerpt { font-size: 1.1rem; color: var(--text-light); line-height: 1.7; }
.post-content { max-width: 760px; line-height: 1.9; }
.post-content h2 { font-size: 1.5rem; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 2px solid var(--primary); }
.post-content h3 { font-size: 1.2rem; margin: 28px 0 12px; }
.post-content p { margin-bottom: 16px; font-size: 1.05rem; }
.post-content ul, .post-content ol { margin-bottom: 16px; padding-left: 24px; }
.post-content li { margin-bottom: 8px; }
.post-content strong { color: var(--text); }
.post-footer { margin-top: 48px; padding: 24px; background: var(--bg-light); border-radius: var(--radius); font-size: 0.95rem; }
.post-footer p { margin-bottom: 4px; }
.post-nav { display: flex; gap: 16px; margin-top: 32px; flex-wrap: wrap; }
@media (max-width: 768px) {
  .hero { padding: 48px 0 40px; }
  .hero h1 { font-size: 2rem; }
  .hero-stats { gap: 24px; }
  .stat-num { font-size: 1.8rem; }
  .section-title { font-size: 1.6rem; }
  .container { padding: 0 16px; }
  .service-row { grid-template-columns: 1fr; gap: 32px; }
  .service-row.reverse { direction: ltr; }
  .page-hero h1 { font-size: 1.8rem; }
  .page-hero h1.post-header { font-size: 1.5rem; }
  .about-grid { grid-template-columns: 1fr; gap: 32px; }
  .contact-grid { grid-template-columns: 1fr; gap: 32px; }
  .industry-row { grid-template-columns: 1fr; gap: 4px; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .main-nav { display: none; }
  .mobile-menu-btn { display: block; }
  .header-phone { display: none; }
  .city-list-page { grid-template-columns: 1fr; }
  .post-grid { grid-template-columns: 1fr; }
  .post-content h2 { font-size: 1.3rem; }
  .city-card { padding: 16px; }
  .city-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
  .process-steps { gap: 16px; }
  .process-step { min-width: 120px; }
  .post-header h1 { font-size: 1.5rem; }
  .faq-item p { padding-left: 0; }
}
`;

// 共享 Header 组件
export const HEADER = ({ currentPath = '/' }) => {
  const navItems = [
    { label: '首页', href: '/' },
    { label: '核心服务', href: '/services/' },
    { label: '服务城市', href: '/city/' },
    { label: '常见问题', href: '/faq/' },
    { label: '知识中心', href: '/blog/' },
    { label: '关于我们', href: '/about/' },
    { label: '联系我们', href: '/contact/' }
  ];
  return `
<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <span class="logo-icon">赞</span>
      <span class="logo-text">有赞内蒙古运营中心</span>
    </a>
    <nav class="main-nav">
      <ul>
        ${navItems.map(item => {
          const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
          return `<li><a href="${item.href}"${isActive ? ' class="active"' : ''}>${item.label}</a></li>`;
        }).join('')}
      </ul>
    </nav>
    <a href="tel:15652701682" class="header-phone">
      <span>&#9742;</span>
      <span>15652701682</span>
    </a>
    <button class="mobile-menu-btn" aria-label="打开菜单">
      <span style="display:block;width:24px;height:2px;background:#1a1a2e;margin:5px 0;"></span>
      <span style="display:block;width:24px;height:2px;background:#1a1a2e;margin:5px 0;"></span>
      <span style="display:block;width:24px;height:2px;background:#1a1a2e;margin:5px 0;"></span>
    </button>
  </div>
</header>`;
};

// 共享 Footer 组件
export const FOOTER = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>有赞内蒙古运营中心</h3>
        <p>内蒙古神客科技有限公司</p>
        <p class="footer-desc">有赞官方授权的内蒙古地区独家服务商，服务全内蒙12个城市，已助力300+本地商家实现数字化转型。</p>
        <div class="footer-contact">
          <p><strong>电话：</strong><a href="tel:15652701682">15652701682</a>（同微信）</p>
          <p><strong>邮箱：</strong><a href="mailto:miaoyuwei@shark888.cn">miaoyuwei@shark888.cn</a></p>
          <p><strong>地址：</strong>呼和浩特市赛罕区金桥电子商务产业园3楼326</p>
        </div>
      </div>
      <div class="footer-links">
        <h4>核心服务</h4>
        <ul>
          <li><a href="/services/">有赞小程序商城</a></li>
          <li><a href="/services/">门店数字化升级</a></li>
          <li><a href="/services/">会员私域运营</a></li>
          <li><a href="/services/">内蒙古本地专属服务</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>服务城市</h4>
        <ul class="city-list">
          <li><a href="/city/huhehaote/">呼和浩特</a></li>
          <li><a href="/city/baotou/">包头</a></li>
          <li><a href="/city/chifeng/">赤峰</a></li>
          <li><a href="/city/tongliao/">通辽</a></li>
          <li><a href="/city/eerduosi/">鄂尔多斯</a></li>
          <li><a href="/city/wulanchabu/">乌兰察布</a></li>
          <li><a href="/city/bayannaoer/">巴彦淖尔</a></li>
          <li><a href="/city/wuhai/">乌海</a></li>
          <li><a href="/city/xinganmeng/">兴安盟</a></li>
          <li><a href="/city/xilinguole/">锡林郭勒</a></li>
          <li><a href="/city/alashan/">阿拉善</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>深耕行业</h4>
        <ul>
          <li><a href="/services/">特产</a></li>
          <li><a href="/services/">牛羊肉</a></li>
          <li><a href="/services/">烘焙</a></li>
          <li><a href="/services/">酒水</a></li>
          <li><a href="/services/">母婴</a></li>
          <li><a href="/services/">美业</a></li>
          <li><a href="/services/">咖啡茶饮</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2015-${new Date().getFullYear()} 内蒙古神客科技有限公司 版权所有 | <a href="/">www.shark888.cn</a></p>
      <p class="footer-icp">有赞官方授权内蒙古独家服务商 | 服务电话：15652701682</p>
    </div>
  </div>
</footer>`;

// HTML 页面包装器
export const htmlPage = ({ title, description, keywords, canonical, schemas = [], currentPath = '/', body }) => {
  const siteUrl = 'https://www.shark888.cn';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${currentPath}`;
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<meta name="description" content="${description}" />
${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
<link rel="canonical" href="${fullCanonical}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${fullCanonical}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="有赞内蒙古运营中心" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="format-detection" content="telephone=yes" />
<meta name="baidu-site-verification" content="codeva-07Ua40vFYI" />
<!-- 搜索引擎验证标签（百度站长平台），task 7686395109436394424 浏览器接管流程添加 -->
${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
<style>${CSS}</style>
</head>
<body>
${HEADER({ currentPath })}
${body}
${FOOTER}
</body>
</html>`;
};

// 默认的 Organization + LocalBusiness schema
export const defaultOrgSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': 'https://www.shark888.cn/#organization',
  name: '有赞内蒙古运营中心',
  alternateName: ['内蒙古神客科技有限公司', '神客科技'],
  url: 'https://www.shark888.cn',
  logo: 'https://www.shark888.cn/logo.png',
  description: '有赞官方授权的内蒙古地区独家服务商，覆盖内蒙古12个盟市。提供有赞小程序商城、收银新零售系统、CRM系统、私域营销、私域代运营一站式数字化解决方案，已助力300+本地商家。',
  telephone: '+86-15652701682',
  email: 'miaoyuwei@shark888.cn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '金桥电子商务产业园3楼326',
    addressLocality: '呼和浩特市',
    addressRegion: '内蒙古自治区',
    addressCountry: 'CN'
  },
  geo: { '@type': 'GeoCoordinates', latitude: '40.8414', longitude: '111.7519' },
  areaServed: ['呼和浩特', '包头', '赤峰', '通辽', '鄂尔多斯', '乌兰察布', '巴彦淖尔', '乌海', '兴安盟', '锡林郭勒', '阿拉善'].map(n => ({ '@type': 'City', name: n })),
  priceRange: '￥',
  knowsAbout: [
    '有赞服务商', '有赞内蒙古', '小程序商城', '微信小程序商城', '视频号小店',
    '收银新零售', '扫码点单', '智能收银系统', '门店数字化',
    'CRM系统', '会员管理', '企微互通', '私域营销', '私域代运营'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '有赞内蒙古核心服务',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '有赞小程序商城', description: '微信小程序商城、视频号小店、抖音/小红书本地生活多平台搭建与运营' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '收银新零售系统', description: '智能收银、扫码点单、库存管理、外卖自提、同城配送一体化解决方案' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM系统', description: '会员储值、积分等级、客户标签、智能分层、精准营销自动化' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '私域营销', description: '企微助手、社群运营、拼团/秒杀/优惠券等营销活动策划与执行' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '私域代运营', description: '全程代运营、内容策划、数据分析、复购率提升一站式托管服务' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '内蒙古本地专属服务', description: '免费上门演示、一对一培训、7×12小时售后、本地化陪跑服务' } }
    ]
  }
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.shark888.cn/#website',
  url: 'https://www.shark888.cn',
  name: '有赞内蒙古运营中心',
  description: '有赞官方授权内蒙古独家服务商，提供小程序商城、收银新零售、CRM系统、私域营销、私域代运营一站式服务',
  publisher: { '@id': 'https://www.shark888.cn/#organization' }
};

export const breadcrumbSchema = (path) => {
  const items = [{ '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.shark888.cn/' }];
  const labels = { '/services/': '核心服务', '/about/': '关于我们', '/contact/': '联系我们', '/faq/': '常见问题', '/blog/': '知识中心', '/city/': '服务城市' };
  if (labels[path]) items.push({ '@type': 'ListItem', position: 2, name: labels[path], item: `https://www.shark888.cn${path}` });
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '有赞内蒙古运营中心是做什么的？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '我们是内蒙古神客科技有限公司，有赞官方授权的内蒙古地区独家服务商。提供有赞小程序商城、收银新零售系统、CRM系统、私域营销、私域代运营一站式数字化解决方案，覆盖内蒙古12个盟市，已助力300+本地商家实现数字化转型。'
      }
    },
    {
      '@type': 'Question',
      name: '有赞小程序商城包含哪些平台？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '有赞小程序商城支持微信小程序、视频号小店、抖音本地生活、小红书本地生活、支付宝小程序、百度小程序。商品、库存、订单、会员、营销活动数据全平台同步，一个后台管理多个渠道。'
      }
    },
    {
      '@type': 'Question',
      name: '收银新零售系统能解决哪些门店痛点？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '收银新零售系统提供智能收银（兼容多种硬件）、扫码点单（堂食/外带）、库存管理与预警、外卖自提与同城配送、多门店统一管理、会员储值与次卡、积分等级体系、企业微信互通，全面打通线上线下。'
      }
    },
    {
      '@type': 'Question',
      name: '私域代运营具体包含哪些服务？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '私域代运营包括：店铺搭建与装修、商品上架、营销活动策划（拼团/秒杀/优惠券）、会员运营、企微社群运营、内容创作（朋友圈/社群/小程序）、数据分析与优化建议。我们服务过的客户复购率平均提升30%以上。'
      }
    },
    {
      '@type': 'Question',
      name: '服务覆盖内蒙古哪些城市？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '我们服务全内蒙古12个盟市：呼和浩特、包头、呼伦贝尔、赤峰、通辽、鄂尔多斯、乌兰察布、巴彦淖尔、乌海、兴安盟、锡林郭勒、阿拉善。总部在呼和浩特，主要城市均可安排免费上门演示与本地化服务。'
      }
    },
    {
      '@type': 'Question',
      name: '联系有赞内蒙古运营中心的方式？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '电话/微信：15652701682（同微信）；邮箱：miaoyuwei@shark888.cn；地址：呼和浩特市赛罕区金桥电子商务产业园3楼326。服务时间：周一至周日 09:00-21:00。也可访问官网 www.shark888.cn 在线咨询。'
      }
    }
  ]
};
