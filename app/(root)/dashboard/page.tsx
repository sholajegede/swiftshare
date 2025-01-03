"use client";

import React, { useState, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import FileCard from "@/components/file-card";
import Sort from "@/components/sort";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import FileUploader from "@/components/file-uploader";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const { user, isAuthenticated, getPermissions, getPermission, getOrganization } =
    useKindeBrowserClient();

  //const org = getOrganization()
  // ;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState(searchParams.get("query") || "");

  const sort = searchParams.get("sort") || "";

  const profile = useQuery(api.users.getUserByKindeId, {
    kindeId: user?.id as string,
  });

  const files = useQuery(api.files.getUserFiles, {
    userId: profile?._id as Id<"users">,
    searchText
  });

  const totalFileSize =
    files?.reduce((total, file) => total + (file?.size || 0), 0) || 0;

  const totalFileSizeInMB = (totalFileSize / (1024 * 1024)).toFixed(2);

  const sortedFiles = useMemo(() => {
      if (!files) return [];
      switch (sort) {
        case "name-asc":
          return [...files].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        case "name-desc":
          return [...files].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
        case "size-desc":
          return [...files].sort((a, b) => (b.size || 0) - (a.size || 0));
        case "size-asc":
          return [...files].sort((a, b) => (a.size || 0) - (b.size || 0));
        case "date-asc":
          return [...files].sort(
            (a, b) => a._creationTime - b._creationTime
          );
        case "date-desc":
          return [...files].sort(
            (a, b) => b._creationTime - a._creationTime
          );
        default:
          return files;
      }
    }, [files, sort]);
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);
  
      const queryParams = new URLSearchParams(searchParams.toString());
      if (value) {
        queryParams.set("query", value);
      } else {
        queryParams.delete("query");
      }
      router.replace(`?${queryParams.toString()}`);
    };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Welcome {profile?.username}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center justify-center">
          <Input
            type="text"
            placeholder="Search for file"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="ml-auto mr-4">
          <FileUploader ownerId={profile?._id as Id<"users">} accountId={profile?.orgId as string} />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex flex-col rounded-xl bg-muted/50 md:min-h-min p-4">
          <div className="flex items-center text-sm">
            <p>
              Total File Size: <span>{totalFileSizeInMB} MB</span> <span className="text-muted-foreground">|</span> Total Number of Files: {files?.length}
            </p>
            <div className="ml-auto">
              <Sort />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedFiles && sortedFiles.length > 0 ? (
              sortedFiles.map((file) => (
                <FileCard
                  key={file?._id}
                  _id={file?._id as Id<"files">}
                  storageId={file?.storageId as Id<"_storage">}
                  name={file?.name as string}
                  url={file?.url as string}
                  size={file?.size as number}
                  extension={file?.extension as string}
                  type={file?.type as string}
                  createdAt={file?._creationTime as number}
                  creator={profile?.username as Id<"users">}
                  users={file.users as [string]}
                />
              ))
            ) : (
              <p className="text-base text-muted-foreground">
                No files available.
              </p>
            )}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Dashboard;