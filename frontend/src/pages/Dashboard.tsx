import { Navigate, Outlet } from 'react-router';

export function DashboardPage() {
  const token = window.localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
      <Navigate to="/dashboard/feed" />
    </div>
  );
}
