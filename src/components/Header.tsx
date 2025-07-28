"use client";

import Link from "next/link";
import { AnnuliveLogo } from "./AnnuliveLogo";
import Button from "./ui/Button";
import { UserData } from "@/lib/types";
import HeaderUser from "./HeaderUser";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  user: UserData | null;
}

export default function Header({ user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-white/80 shadow-sm backdrop-blur-sm dark:bg-amber-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <AnnuliveLogo height={50} width={50} />

          <nav className="hidden items-center space-x-4 md:flex">
            <Link
              href="/roadmaps"
              className="font-medium text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
            >
              Trunk Tracks
            </Link>
            <Link
              href="/explore"
              className="font-medium text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
            >
              Explore
            </Link>
            {user ? (
              <HeaderUser user={user} />
            ) : (
              <Link
                href={`/auth/login?returnTo=${process.env.NEXT_PUBLIC_APP_BASE_URL}/roadmaps`}
              >
                <Button size="sm">Login</Button>
              </Link>
            )}
          </nav>

          <div className="flex items-center md:hidden">
            {user && (
              <div className="mr-3">
                <HeaderUser user={user} />
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-amber-700 transition-colors hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-amber-200 px-2 pt-2 pb-3 sm:px-3 dark:border-amber-800">
              <Link
                href="/roadmaps"
                className="block rounded-md px-3 py-2 text-base font-medium text-amber-700 transition-colors hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trunk Tracks
              </Link>
              <Link
                href="/explore"
                className="block rounded-md px-3 py-2 text-base font-medium text-amber-700 transition-colors hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              {!user && (
                <div className="px-3 py-2">
                  <Link
                    href={`/auth/login?returnTo=${process.env.NEXT_PUBLIC_APP_BASE_URL}/roadmaps`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
