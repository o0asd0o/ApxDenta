import { signOut, useSession } from '@/lib/auth-client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuButton,
} from '@repo/ui/components';
import { useLocation, useNavigate } from '@tanstack/react-router';
import {
  BellIcon,
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  UserCircleIcon,
} from 'lucide-react';

// const user = {
//   name: 'Darrell Steward',
//   role: 'Superadmin',
//   avatar: '/avatars/shadcn.jpg',
// };

export const UserMenu = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignOut = async () => {
    console.log('LOGOUT');
    await signOut({
      fetchOptions: {
        onResponse: () => {
          setTimeout(() => {
            navigate({
              to: '/',
              search: { redirect: location.href },
            });
          }, 100);
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-fit!"
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage
              src={session?.user.image as string}
              alt={session?.user.name}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {session?.user.name as string}
            </span>
            <span className="truncate text-xs text-gray-400">
              {session?.user.email || 'N/A'}
            </span>
          </div>
          <ChevronDown className="ml-auto size-4! text-gray-400" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={session?.user.image as string}
                alt={session?.user.name}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session?.user.name || 'Unknown'}
              </span>
              <span className="truncate text-xs text-gray-foreground">
                {session?.user.email || 'N/A'}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCircleIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
