// app/components/UserMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, RefreshCw, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSync = () => {
    // TODO: Implement sync functionality
    console.log("Syncing...");
    setIsOpen(false);
  };

  const handleSettings = () => {
    router.push("/settings");
    setIsOpen(false);
  };

  const handleSignOut = () => {
    // TODO: Implement sign out
    console.log("Signing out...");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 dark:bg-amber-500/70 hover:bg-amber-600 dark:hover:bg-amber-600/70 text-white font-medium transition-colors cursor-pointer"
      >
        {/* TODO: Replace with actual user image from OAuth */}
        <User className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-800 py-1 z-50">
          {/* User Info */}
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Ruth
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              ruth@example.com
            </p>
          </div>

          {/* Menu Items */}
          <button
            onClick={handleSync}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Sync
          </button>

          <button
            onClick={handleSettings}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <div className="border-t border-zinc-200 dark:border-zinc-800 my-1"></div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
