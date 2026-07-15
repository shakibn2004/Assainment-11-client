"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Rocket,
  Wallet,
  Settings,
  LogOut,
  LayoutDashboard,
  Shield,
  Menu,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const { data: session, isPending, error } = authClient.useSession();
  let user = session?.user;
  let logout = true;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border dark:border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full opacity-30 group-hover:opacity-70 blur-md transition-opacity duration-500 animate-pulse"></div>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="relative z-10 drop-shadow-md"
            >
              <defs>
                <linearGradient
                  id="sparklift-grad-nav"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                fill="url(#sparklift-grad-nav)"
              />
            </svg>
          </div>
          <span className="text-2xl font-sans tracking-tight flex items-center">
            <span className="font-medium text-foreground">Spark</span>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Lift
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/explore"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/campaigns"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Start a Campaign
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Our Story
          </Link>
          {session && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          {!session ? (
            <div className="hidden md:flex gap-4">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-foreground/5">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none cursor-pointer border-none bg-transparent p-0">
                  <Avatar className="h-10 w-10 border border-border dark:border-white/10 shadow-md transition-transform hover:scale-105">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 glass-panel border-border dark:border-white/10"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-border dark:bg-white/10" />

                  <DropdownMenuItem className="cursor-pointer focus:bg-foreground/5 p-0">
                    <Link
                      href="/dashboard"
                      className="flex items-center w-full px-2 py-1.5"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer focus:bg-foreground/5">
                    <Wallet className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Wallet</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer focus:bg-foreground/5">
                    <Link href="/settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-border dark:bg-white/10" />

                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Mobile Menu (Hamburger) */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] glass-panel border-l border-border dark:border-white/10 flex flex-col gap-6 pt-12 px-6"
              >
                <SheetTitle className="sr-only">
                  Mobile Navigation Menu
                </SheetTitle>

                {session && (
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border dark:border-white/10">
                    <Avatar className="h-12 w-12 border border-border dark:border-white/10">
                      <AvatarImage src={user?.avatarUrl} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {user?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-primary mt-1">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <Link
                    href="/explore"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    Explore
                  </Link>
                  <Link
                    href="/campaigns"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    Start a Campaign
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    Our Story
                  </Link>
                </div>

                {session ? (
                  <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-border dark:border-white/10">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary"
                    >
                      <LayoutDashboard className="w-5 h-5 text-muted-foreground" />{" "}
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary"
                    >
                      <Settings className="w-5 h-5 text-muted-foreground" />{" "}
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-lg font-medium text-destructive mt-4 text-left"
                    >
                      <LogOut className="w-5 h-5" /> Log out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-border dark:border-white/10">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full text-lg h-12">
                        Log In
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full text-lg h-12 bg-primary hover:bg-primary/90 text-white">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
