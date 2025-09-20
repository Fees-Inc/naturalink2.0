import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { NotificationPanel } from "./NotificationPanel";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      <NotificationPanel />
    </div>
  );
}