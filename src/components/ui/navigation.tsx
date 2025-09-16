import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  Package, 
  TrendingUp, 
  CreditCard, 
  MessageSquare,
  Settings,
  Bell,
  Search
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", exact: true },
  { icon: Users, label: "Producteurs", path: "/cockpit-producers", badge: "12" },
  { icon: Award, label: "Certifications", path: "/certifications", badge: "5" },
  { icon: Package, label: "Produits", path: "/produits", badge: "28" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: CreditCard, label: "Facturation", path: "/facturation" },
  { icon: MessageSquare, label: "Support", path: "/support" },
  { icon: Settings, label: "Paramètres", path: "/parametres" },
];

export function Navigation() {
  return (
    <nav className="flex flex-col w-64 bg-card border-r border-border h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">NaturaLink</h1>
            <p className="text-sm text-muted-foreground">Cockpit Agricole</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-0 text-sm focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-2">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  "w-full h-11 px-4 rounded-md flex items-center gap-3 transition-smooth",
                  isActive ? "bg-muted text-primary font-medium shadow-soft" : "hover:bg-muted/50"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="p-4 border-t border-border">
        <div className="w-full justify-start gap-3 h-11 px-4 rounded-md flex items-center hover:bg-muted/50 transition-smooth cursor-pointer">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
          <Badge variant="destructive" className="ml-auto">3</Badge>
        </div>
      </div>
    </nav>
  );
}