"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Thumbnail from "@/components/thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/formatted-date-time";
import ActionDropdown from "@/components/action-dropdown";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface FileCardProps {
  _id: Id<"files">;
  storageId: Id<"_storage">;
  name: string;
  url: string;
  size: number;
  extension: string;
  type: string;
  createdAt: number;
  userId: Id<"users">;
  users: [string];
}

const FileCard: React.FC<FileCardProps> = ({
  _id,
  storageId,
  name,
  url,
  size,
  extension,
  type,
  createdAt,
  userId,
  users,
}) => {
  const user = useQuery(api.users.getUserByConvexId, {
    userId
  });
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="grid grid-cols-1 justify-center">
            <p className="text-sm text-gray-600 mb-1">Uploaded By: {user?.username}</p>
            <FormattedDateTime
              date={createdAt.toString()}
              className="text-gray-600 text-sm"
            />
          </div>
        </CardTitle>
        <div className="absolute top-2 right-2">
          <ActionDropdown
            fileId={_id}
            storageId={storageId}
            fileName={name}
            url={url}
            type={type}
            size={size}
            createdAt={createdAt}
            extension={extension}
            users={users}
            creator={user?.username as string}
          />
        </div>
      </CardHeader>
      <CardContent className="h-[150px] flex justify-center items-center">
        <Thumbnail
          type={type}
          extension={extension}
          url={url}
          className="!size-20"
          imageClassName="!size-16"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 text-sm w-40 items-center">{name}</div>
        <div className="text-sm text-gray-600">{convertFileSize(size)}</div>
      </CardFooter>
    </Card>
  );
};
export default FileCard;