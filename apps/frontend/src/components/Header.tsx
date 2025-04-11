import { signOut } from '@/lib/auth-client';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components';
import { Link, useNavigate } from '@tanstack/react-router';
import { LogOut, Menu, Settings, User } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onResponse: () => {
          setTimeout(() => {
            navigate({
              to: '/',
              search: { redirect: window.location.pathname },
            });
          }, 100);
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo/Brand */}
        <div className="mr-4 flex items-center md:mr-6">
          <Link to="/" className="flex items-center space-x-2 font-bold">
            <span className="text-xl">Zendenta</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="hidden flex-1 items-center space-x-4 md:flex">
          <Link
            to="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/reservations"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Reservations
          </Link>
        </nav>

        {/* Mobile Navigation Button (can be expanded later) */}
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
