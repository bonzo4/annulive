import Link from "next/link";
import { AnnuliveLogo } from "./AnnuliveLogo";
import Button from "./ui/Button";
import { UserData } from "@/lib/types";
import HeaderUser from "./HeaderUser";

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
        </div>
      </div>
    </header>
  );
}
