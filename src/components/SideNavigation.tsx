import React from 'react';
import Logo from '../assets/Ai-Logo.png'

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}

interface SideNavigationProps {
  activeView: string;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
  companyName?: string;
  companyTagline?: string;
  recentReports?: Array<{
    title: string;
    views: number;
  }>;
  collapsed?: boolean;
}

const NavItem: React.FC<{
  item: NavigationItem;
  isActive: boolean;
  onClick: () => void;
  collapsed?: boolean;
}> = ({ item, isActive, onClick, collapsed }) => {
  return (
    <div
      className={`flex items-center  p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive ? 'bg-[#F1EF7E0F] text-[#F1EF7E]' : 'text-slate-400 hover:bg-white/5'
      }`}
      onClick={onClick}
    >
     {collapsed &&  <span className={`text-xl ${!collapsed ? 'mr-3' : ''}`}>{item.icon}</span>}
      {!collapsed && <span className="text-lg font-semibold">{item.label}</span>}
    </div>
  );
};

const SideNavigation: React.FC<SideNavigationProps> = ({
  activeView,
  setActiveView,
  companyName = 'Canary Vision',
  companyTagline = 'AI Customer Analytics',
  recentReports = [],
  collapsed = false,
}) => {
  // Navigation items
  const navItems: NavigationItem[] = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'Analytics', label: 'Analytics', icon: '📈' },
    { id: 'Cameras', label: 'Cameras', icon: '📹' },
    { id: 'Settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`bg-[#080F17] flex flex-col h-full transition-all duration-300 overflow-hidden ${
      collapsed ? 'w-20' : 'w-80'
    }`}>
      {/* Header/Logo */}
      <div className="p-6">
        <div className="mb-8 border-b-2 border-[#d4d1d1] pb-1">
          <h2 className="text-[28.43px] font-medium text-yellow-400 truncate">{companyName}</h2>
          {!collapsed && (
            <p className="text-base text-slate-400">{companyTagline}</p>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="mb-8">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeView === item.id}
              onClick={() => setActiveView(item.id)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Recent Reports Section */}
        {!collapsed && recentReports.length > 0 && (
          <div className="mb-8 mt-12">
            <h3 className="text-xl font-bold  text-[#D6DDE6] mb-4 pl-2">Articles for you</h3>
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-white/5"
              >
                <div>
                  <div className="text-sm mb-1 text-[#F1EF7E]">{report.title}</div>
                  <div className="text-xs text-slate-400">{report.views} views</div>
                </div>
                <span className="text-slate-400">→</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with company info */}
      <div className="mt-auto p-6 border-t border-slate-700">
        <div className="flex items-center">
          
          {!collapsed && (
            <div>
              <img src={Logo} alt="Logo" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideNavigation;