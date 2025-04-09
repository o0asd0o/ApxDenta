import { Outlet } from '@tanstack/react-router';

export const Protected = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>This is a protected route</div>
      <Outlet />
    </div>
  );
};
