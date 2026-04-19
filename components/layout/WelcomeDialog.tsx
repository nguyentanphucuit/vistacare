"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "vista-welcome-dismissed";

export function WelcomeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setOpen(true);
  }, []);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value && typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden sm:max-w-lg md:max-w-xl">
        <DialogTitle className="sr-only">Welcome to Vista Care</DialogTitle>
        <div className="relative aspect-[904/1280] max-h-[85vh] w-full bg-brand-mint">
          <Image
            src="/invited.jpg"
            alt="Welcome invitation from Vista Care"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 576px"
            className="object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
