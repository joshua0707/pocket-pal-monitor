
import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
