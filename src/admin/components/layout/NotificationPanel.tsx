import { Bell, AlertCircle, CheckCircle, Info, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Nouveau producteur certifié",
    message: "La Ferme du Soleil a été certifiée bio",
    time: "Il y a 5 min",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Stickers NFC bas",
    message: "Stock de stickers < 100 unités",
    time: "Il y a 1h",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Mise à jour système",
    message: "Version 2.4.0 disponible",
    time: "Il y a 2h",
    read: true,
  },
  {
    id: "4",
    type: "error",
    title: "Expiration de certification",
    message: "3 certifications expirent dans 7 jours",
    time: "Il y a 3h",
    read: false,
  },
];

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-[hsl(var(--nature-primary))]" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-[hsl(var(--accent))]" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "info":
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <>
      {/* Notification Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </Button>

      {/* Notification Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 h-screen w-96 bg-background border-l border-border shadow-xl transition-transform duration-300 z-30",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount} non lues
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-88px)]">
          <div className="p-4 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer",
                  notification.read 
                    ? "bg-muted/30 border-border/50" 
                    : "bg-background border-border"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-[hsl(var(--nature-primary))] animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" size="sm">
              Tout marquer comme lu
            </Button>
            <Button variant="default" className="flex-1" size="sm">
              Voir tout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}