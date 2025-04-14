
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-6 md:py-10">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
