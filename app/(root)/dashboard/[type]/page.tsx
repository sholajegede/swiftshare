import React from "react";
import Sort from "@/components/sort";
import FileCard from "@/components/file-card";
import { getFileTypesParams } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const profile = useQuery(api.users.getUserByKindeId, {
    kindeId: user?.id as string,
  });

  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = useQuery(api.files.getUserFiles, {
    userId: profile?._id as Id<"users">,
    searchText,
    type,
  });

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {/* Render the files 
      {files && files > 0 ? (
        <section className="file-list">
          {files.documents.map((file: any) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
        */}
    </div>
  );
};

export default Page;