/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AnnuliveLogo } from "./AnnuliveLogo";
import Button from "./ui/Button";
import { UserData } from "@/lib/types";

interface HeaderProps {
  user: UserData | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="border-b bg-white/80 shadow-sm backdrop-blur-sm dark:bg-amber-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <AnnuliveLogo height={50} width={50} />
          <nav className="flex items-center space-x-4">
            <Link
              href="/roadmaps"
              className="font-medium text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
            >
              Roadmaps
            </Link>
            <Link
              href="/explore"
              className="font-medium text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
            >
              Explore
            </Link>
            {user && (
              <Link
                href="/profile"
                className="font-medium text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
              >
                Profile
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={
                    user.picture ||
                    "https://annulive-content.tor1.cdn.digitaloceanspaces.com/app-images/annulive-logo.png"
                  }
                  alt={user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-amber-200 object-cover dark:border-amber-600"
                />
                <span className="font-medium text-amber-700 dark:text-amber-300">
                  {user.name || "User"}
                </span>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
