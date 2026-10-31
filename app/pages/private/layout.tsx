import { Outlet, Navigate } from "react-router";
import { useAuth } from "~/hooks/providers/AuthProvider";
import Header from "~/components/layout/header";
import Footer from "~/components/layout/footer";
import { getLocalStorage } from "~/utils";
import type { User } from "~/types";

export default function PrivateLayout() {
  const { user } = useAuth();
  const storedUser = getLocalStorage<User>("berg-user");
  const storedToken = getLocalStorage<string>("berg-token");

  // If user is not logged in, redirect to login
  if (!user && (!storedUser || !storedToken)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
