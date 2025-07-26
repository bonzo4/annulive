"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { updateUserName } from "@/app/(platform)/actions/updateUserName";

interface SetNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SetNameDialog({
  open,
  onOpenChange,
}: SetNameDialogProps) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", name.trim());
        await updateUserName(formData);
        onOpenChange(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update name");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => {}} dismissible={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Annulive!</DialogTitle>
          <DialogDescription>
            To get started, please tell us your name. This will help personalize
            your experience.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              className="w-full"
              autoFocus
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending || !name.trim()}
              className="w-full"
            >
              {isPending ? "Saving..." : "Save Name"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
