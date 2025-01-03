"use client";

import * as React from "react";
import { GalleryVerticalEnd, LayoutGrid } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const data = {
  files: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
      isActive: true,
      items: [
        { title: "Organization Files", url: "/dashboard" },
        { title: "Your Files", url: "/dashboard/user" },
        { title: "Documents", url: "/dashboard/documents" },
        { title: "Images", url: "/dashboard/images" },
        { title: "Audios", url: "/dashboard/audios" },
        { title: "Videos", url: "/dashboard/videos" },
        { title: "Others", url: "/dashboard/others" },
      ],
    },
  ],
};

interface Profile {
  _id: Id<"users">;
  _creationTime: number;
  username?: string;
  imageUrl?: string;
  permissions?: string;
  email: string;
  kindeId: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useKindeBrowserClient();

  const profile = useQuery(api.users.getUserByKindeId, {
    kindeId: user?.id as string,
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">SwiftShare</span>
          </div>
          <div className="ml-auto">
            <ModeToggle className="ml-auto" />
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.files} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profile={profile as Profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};