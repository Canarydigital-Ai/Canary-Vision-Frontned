import React from 'react';

interface SideNavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  activeView,
  setActiveView
}) => {
  const navItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Reports', icon: '📝' },
    { name: 'Logs', icon: '📜' }
  ];

  const articleItems = [
    { title: 'Customer Behavior', views: 245 },
    { title: 'Maximizing Shelf Space', views: 182 },
    { title: 'Improving Store Layout', views: 156 },
    { title: 'Enhancing Customer Experience', views: 134 }
  ];

  return (
    <div className="side-navigation">
      <div className="nav-section">
        {navItems.map((item) => (
          <div 
            key={item.name}
            className={`nav-item ${activeView === item.name ? 'active' : ''}`}
            onClick={() => setActiveView(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </div>
        ))}
      </div>
      
      <div className="articles-section">
        <h3>Articles for you</h3>
        {articleItems.map((article) => (
          <div key={article.title} className="article-item">
            <div className="article-info">
              <div className="article-title">{article.title}</div>
              <div className="article-views">{article.views} views</div>
            </div>
            <div className="article-arrow">→</div>
          </div>
        ))}
      </div>
      
      <div className="app-branding">
        <div className="app-logo">🦅</div>
        <div className="app-name">
          <div>Canary Vision</div>
          <div className="app-tagline">Built by AI Labs</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;