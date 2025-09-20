import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Wheat,
  Building2,
  Link,
  BarChart3,
  Megaphone,
  CreditCard,
  ChevronLeft,
  Settings,
  HelpCircle,
  Bell,
  LogOut
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/admin/context/AuthContext";


const basePath = "/admin/naturalink";
const navigation = [
  { name: "Dashboard", href: `${basePath}/dashboard`, icon: LayoutDashboard, badge: null },
  { name: "Utilisateurs", href: `${basePath}/users`, icon: Users, badge: "250" },
  { name: "Produits", href: `${basePath}/products`, icon: Package, badge: "35" },
  { name: "Producteurs", href: `${basePath}/producers`, icon: Wheat, badge: null },
  { name: "Distributeurs", href: `${basePath}/distributors`, icon: Building2, badge: null },
  { name: "Blockchain", href: `${basePath}/blockchain`, icon: Link, badge: "1450" },
  { name: "Analytics", href: `${basePath}/analytics`, icon: BarChart3, badge: null },
  { name: "Marketing", href: `${basePath}/marketing`, icon: Megaphone, badge: "3" },
  { name: "Billing", href: `${basePath}/billing`, icon: CreditCard, badge: null },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-sidebar-background border-r border-sidebar-border transition-all duration-300 relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl nature-gradient animate-pulse-slow" />
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">NaturaLink</h2>
              <p className="text-xs text-muted-foreground">Cockpit Admin</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-xl nature-gradient animate-pulse-slow mx-auto" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute -right-3 top-8 z-10 h-6 w-6 rounded-full border bg-background shadow-md",
            collapsed && "rotate-180"
          )}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "sidebar-item-active shadow-sm" 
                  : "hover:bg-sidebar-accent text-sidebar-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon 
                  className={cn(
                    "h-5 w-5 transition-transform group-hover:scale-110",
                    isActive && "text-[hsl(var(--nature-primary))]"
                  )} 
                />
                {!collapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </div>
              {!collapsed && item.badge && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "ml-auto",
                    isActive && "badge-success"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-all duration-200"
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Paramètres</span>}
        </NavLink>
        <NavLink
          to="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-all duration-200"
        >
          <HelpCircle className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Aide</span>}
        </NavLink>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--nature-primary))] to-[hsl(var(--nature-secondary))] flex items-center justify-center text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-sidebar-foreground">
                {user?.email === 'admin' ? 'Administrateur' : 'Utilisateur'}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Bell className="h-5 w-5 text-muted-foreground hover:text-sidebar-foreground cursor-pointer transition-colors" />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      )}
      
      {/* Collapsed logout button */}
      {collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            title="Déconnexion"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      )}
    </aside>
  );
}