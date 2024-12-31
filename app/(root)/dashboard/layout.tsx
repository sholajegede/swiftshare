import React from "react";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = getKindeServerSession();

  const currentUser = getUser();

  if (!currentUser) return redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
      <Toaster />
    </SidebarProvider>
  );
};
export default Layout;