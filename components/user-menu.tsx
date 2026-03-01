'use client';

import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock3, LogOut } from 'lucide-react';

interface UserMenuProps {
  onOpenHistory: () => void;
}

export default function UserMenu({ onOpenHistory }: UserMenuProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-full bg-[var(--paper-2)] px-2 pr-4 text-[15px] text-[var(--ink)] hover:bg-[#e7dfd4]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(130deg,#9a6ce8,#21c6d5)] text-base font-semibold text-white">
            {user.name[0].toUpperCase()}
          </span>
          <span className="max-w-24 truncate">{user.name}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-0 text-[var(--ink)] shadow-[0_8px_20px_rgba(53,39,24,0.12)]"
      >
        <div className="px-4 pb-3 pt-3">
          <p className="text-sm font-semibold leading-none text-[var(--ink-soft)]">Signed in as</p>
          <p className="mt-2 truncate text-[15px] leading-none text-[var(--ink)]">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="bg-[var(--line)]" />
        <div className="p-2">
          <DropdownMenuItem
            onClick={onOpenHistory}
            className="h-11 cursor-pointer rounded-xl text-[15px] text-[var(--ink)] outline-none focus:bg-[var(--paper-2)]"
          >
            <Clock3 className="mr-2 h-5 w-5 text-[var(--ink-soft)]" />
            View History
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={logout}
            className="mt-1 h-11 cursor-pointer rounded-xl text-[15px] text-red-600 outline-none focus:bg-red-50"
          >
            <LogOut className="mr-2 h-5 w-5 text-[var(--ink-soft)]" />
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
