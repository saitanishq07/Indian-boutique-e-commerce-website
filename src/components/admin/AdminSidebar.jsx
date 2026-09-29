import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Boxes, 
  ShoppingBag, 
  Users, 
  Ticket, 
  Star, 
  Layers, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  LogOut, 
  Store,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function AdminSidebar({ currentPath, onNavigate, onLogout, collapsed, setCollapsed }) {
  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Collections', path: '/admin/collections', icon: Layers },
    { label: 'Banners', path: '/admin/banners', icon: ImageIcon },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <aside className={`bg-[#1E293B] text-slate-200 transition-all duration-300 flex flex-col justify-between shrink-0 z-30 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      
      <div>
        {/* Admin Brand Logo Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-700/60 bg-[#0F172A]">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#4A0E17] flex items-center justify-center font-serif font-bold text-lg text-[#C5A059]">
                A
              </div>
              <div>
                <span className="font-serif font-bold tracking-wider text-base text-white block leading-tight">AAVANI</span>
                <span className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase">ADMIN PANEL</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-[#4A0E17] flex items-center justify-center font-serif font-bold text-lg text-[#C5A059] mx-auto">
              A
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors hidden lg:block cursor-pointer"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));

            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4A0E17] text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-700/60 bg-[#0F172A] space-y-2">
        <button
          onClick={() => onNavigate('/')}
          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-300 hover:bg-amber-400/10 rounded transition-colors cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Open Customer Storefront"
        >
          <Store className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Customer Store</span>}
        </button>

        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Logout of Admin"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {!collapsed && (
          <p className="text-[10px] text-center text-slate-500 pt-1">
            AAVANI Admin · Demo by <span className="text-slate-400 font-bold">TanovaX</span>
          </p>
        )}
      </div>

    </aside>
  );
}
