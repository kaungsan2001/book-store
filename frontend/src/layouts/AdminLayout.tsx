import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  BookOpen,
  Boxes,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

type DashboardPage =
  | "overview"
  | "products"
  | "orders"
  | "users"
  | "inventory"
  | "settings";

interface NavItem {
  label: string;
  value: DashboardPage;
  icon: React.ElementType;
  link: string;
}

const navItems: NavItem[] = [
  {
    label: "Overview",
    value: "overview",
    icon: LayoutDashboard,
    link: "admin",
  },
  {
    label: "Products",
    value: "products",
    icon: BookOpen,
    link: "products",
  },
  {
    label: "Orders",
    value: "orders",
    icon: ShoppingCart,
    link: "orders",
  },
  {
    label: "Users",
    value: "users",
    icon: Users,
    link: "users",
  },
  {
    label: "Inventory",
    value: "inventory",
    icon: Boxes,
    link: "inventory",
  },
  {
    label: "Settings",
    value: "settings",
    icon: Settings,
    link: "settings",
  },
];

export default function AdminLayout() {
  const [activePage, setActivePage] = useState<DashboardPage>("overview");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-background md:block">
        <SidebarContent activePage={activePage} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent activePage={activePage} />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>

            <div>
              <h1 className="font-semibold">Example Page</h1>

              <p className="hidden text-xs text-muted-foreground sm:block">
                Online Book Store Admin
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            <ModeToggle />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">Admin</p>

              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

interface SidebarContentProps {
  activePage: DashboardPage;
}

function SidebarContent({ activePage }: SidebarContentProps) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BookOpen className="size-5" />
        </div>

        <div>
          <h2 className="font-bold">BookStore</h2>

          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Management
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => navigate(item.link)}
              className={`
                flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              <Icon className="size-4" />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2">
            <Package className="size-4" />

            <span className="text-sm font-medium">Store Status</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500" />

            <span className="text-xs text-muted-foreground">
              Store is active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
