"use client";

import { useState, useEffect } from "react";
import { UserData } from "@/lib/types";
import SetNameDialog from "@/components/SetNameDialog";

interface PlatformClientWrapperProps {
  userData: UserData | null;
  children: React.ReactNode;
}

export default function PlatformClientWrapper({
  userData,
  children,
}: PlatformClientWrapperProps) {
  const [showNameDialog, setShowNameDialog] = useState(false);

  useEffect(() => {
    if (userData && (!userData.name || userData.name.trim() === "")) {
      setShowNameDialog(true);
    }
  }, [userData]);

  return (
    <>
      {children}
      <SetNameDialog open={showNameDialog} onOpenChange={setShowNameDialog} />
    </>
  );
}
