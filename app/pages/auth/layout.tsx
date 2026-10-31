import { Outlet, Navigate } from "react-router";
import { useAuth } from "~/hooks/providers/AuthProvider";
import Header from "~/components/layout/header";

export default function AuthLayout() {
  const { user } = useAuth();

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* Same top navigation as the public pages so users can reach home and
          every other page directly from the login / OTP screens. */}
      <Header />
      <main className="min-h-screen bg-mainBG">
        <Outlet />
      </main>
    </>
  );
}
