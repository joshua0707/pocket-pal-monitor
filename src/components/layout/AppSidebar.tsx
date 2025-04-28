
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiggyBank, Wallet, BarChart, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <BarChart size={20} />, path: "/" },
    { name: "Expenses", icon: <Wallet size={20} />, path: "/expenses" },
    { name: "Budgets", icon: <Calendar size={20} />, path: "/budgets" },
    { name: "Savings", icon: <PiggyBank size={20} />, path: "/savings" },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="font-bold text-xl text-primary">PocketPal</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-sidebar-accent"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center p-2 rounded-md hover:bg-sidebar-accent transition-colors duration-200 text-sidebar-foreground"
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground">
            <p>PocketPal v1.0</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;
