'use client';

import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Clock, LogOut, User } from 'lucide-react';

interface UserMenuProps {
  onOpenHistory: () => void;
}

export default function UserMenu({ onOpenHistory }: UserMenuProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="gap-2 rounded-xl border-white/20 bg-white/40 hover:bg-white/60 text-gray-900"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            {user.name[0].toUpperCase()}
          </div>
          <span className="hidden sm:inline">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 glass border-white/20">
        <div className="px-2 py-1.5">
          <p className="text-xs font-semibold text-gray-600">Signed in as</p>
          <p className="text-sm font-medium text-gray-900">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          onClick={onOpenHistory}
          className="gap-2 text-gray-900 cursor-pointer"
        >
          <Clock className="h-4 w-4" />
          <span>View History</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          onClick={logout}
          className="gap-2 text-red-600 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
