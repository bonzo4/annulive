/* eslint-disable @next/next/no-img-element */
"use client";

import { UserData } from "@/lib/types";
import Dropdown, { DropdownItem } from "./ui/Dropdown";
import { ChevronDown, User, LogOut } from "lucide-react";

type HeaderUserProps = {
  user: UserData;
};

export default function HeaderUser({ user }: HeaderUserProps) {
  return (
    <Dropdown
      trigger={
        <div className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-amber-100/50 dark:hover:bg-amber-900/30">
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
          <ChevronDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </div>
      }
    >
      <DropdownItem href="/profile">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Profile
        </div>
      </DropdownItem>
      <DropdownItem
        href={`/auth/logout?returnTo=${process.env.NEXT_PUBLIC_APP_BASE_URL}/roadmaps`}
      >
        <div className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </div>
      </DropdownItem>
    </Dropdown>
  );
}
