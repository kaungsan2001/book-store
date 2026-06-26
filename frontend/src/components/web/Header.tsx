import { useState } from "react";
import {
  BookOpenText,
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import { Form } from "react-router";
import { Paths } from "@/config/constants";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: "Best Sellers", href: "#best-sellers" },
    { name: "Categories", href: "#categories-section" },
  ];

  return (
    <>
      <header
        id="app-header"
        className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-black shadow-sm group-hover:scale-105 transition-transform">
              <BookOpenText className="h-5.5 w-5.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tighter text-amber-500 italic">
                Pageturner
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                Est. 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-primary hover:text-primary/10 transition-colors cursor-pointer py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Search, Cart & User Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 grow md:grow-0 justify-end max-w-md ml-4 md:ml-0">
            {/* Search Input Box */}
            <div className="relative hidden sm:block max-w-50 md:max-w-60">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="search-input-desktop"
                type="text"
                aria-label="Search bookstore catalog"
                placeholder="Search titles..."
                className="w-full  border border-zinc-800 rounded-full py-1.5 pl-9 pr-4 text-xs  placeholder:text-zinc-500 focus:outline-hidden focus:border-amber-500/50 transition-all font-sans"
              />
            </div>

            {/* Shopping Cart Trigger */}
            <Button
              id="header-cart-btn"
              variant="outline"
              size="icon"
              className="relative rounded-full h-10 w-10 border-border/50 hover:bg-muted/30 hover:text-primary transition-colors cursor-pointer"
              aria-label={`Open shopping cart with  items`}
            >
              <ShoppingCart className="h-4.5 w-4.5" />
            </Button>

            {/* User Profile Button */}
            <div className="relative">
              <Button
                id="header-user-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-border/50 hover:bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary/40"
                aria-label="Toggle user panel"
              >
                <User className="h-4.5 w-4.5" />
              </Button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2.5 w-64 origin-top-right rounded-xl border border-border/40 bg-popover p-4 shadow-xl z-50 text-foreground">
                    <div className="mb-3 pb-3 border-b border-border/30">
                      <p className="text-xs font-mono text-muted-foreground">
                        Logged in as
                      </p>
                      <p className="font-semibold text-sm truncate text-foreground mt-0.5">
                        rottenfrog9@gmail.com
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-1.5 text-[9px] uppercase px-1.5 py-0"
                      >
                        Gold Tier Member
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      <button className="w-full text-left font-sans text-xs px-2.5 py-1.5 rounded-md hover:bg-muted font-medium transition-colors">
                        My Orders
                      </button>
                      <button className="w-full text-left font-sans text-xs px-2.5 py-1.5 rounded-md hover:bg-muted font-medium transition-colors">
                        Wishlist & Favorites
                      </button>
                      <button className="w-full text-left font-sans text-xs px-2.5 py-1.5 rounded-md hover:bg-muted font-medium transition-colors">
                        Account Settings
                      </button>
                      <Form method="post" action={Paths.logout}>
                        <button
                          type="submit"
                          className="w-full text-left font-sans text-xs px-2.5 py-1.5 rounded-md hover:bg-destructive/10 text-destructive font-medium flex items-center gap-1.5 transition-colors mt-2"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          Sign Out
                        </button>
                      </Form>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Responsive Menu Toggle button */}
            <Button
              id="header-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="outline"
              size="icon"
              className="md:hidden rounded-full h-10 w-10 border-border/50 hover:bg-muted/30"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4.5 w-4.5" />
              ) : (
                <Menu className="h-4.5 w-4.5" />
              )}
            </Button>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Navigation Dropdown Container */}

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/30 bg-background overflow-hidden">
            <div className="px-4 py-4 space-y-4">
              {/* Search Bar Mobile */}
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  id="search-input-mobile"
                  type="text"
                  aria-label="Search Book Catalog"
                  placeholder="Search titles, authors, genres..."
                  className="w-full rounded-full border border-border/60 bg-muted/40 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/75 focus:border-primary/55"
                />
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col space-y-2.5 py-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors py-1.5 border-b border-border/30"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
