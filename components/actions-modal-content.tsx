import Thumbnail from "./thumbnail";
import FormattedDateTime from "./formatted-date-time";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { X } from "lucide-react";

interface FileCardProps {
  fileName: string;
  url: string;
  size: number;
  extension: string;
  type: string;
  createdAt: number;
  creator: Id<"users">;
}

interface ThumbnailProps {
  fileName: string;
  url: string;
  extension: string;
  type: string;
  createdAt: number;
}

const ImageThumbnail = ({
  fileName,
  url,
  type,
  extension,
  createdAt,
}: ThumbnailProps) => {
  return (
    <div className="!mb-1 flex items-center gap-3 rounded-xl border border-primary/20 bg-muted/50 p-3">
      <Thumbnail type={type} extension={extension} url={url} />
      <div className="flex flex-col">
        <p className="text-[14px] leading-[20px] font-semibold mb-1">{fileName}</p>
        <FormattedDateTime date={createdAt.toString()} className="text-[12px] leading-[16px] font-normal" />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="w-[12%] text-[14px] leading-[20px] font-normal text-left">{label}</p>
    <p className="flex-1 text-[14px] leading-[20px] font-semibold text-left">{value}</p>
  </div>
);

export const FileDetails: React.FC<FileCardProps> = ({
  fileName,
  url,
  type,
  extension,
  createdAt,
  size,
  creator,
}) => {
  return (
    <>
      <ImageThumbnail
        fileName={fileName}
        url={url}
        type={type}
        extension={extension}
        createdAt={createdAt}
      />
      <div className="space-y-2 text-sm text-gray-600">
        <DetailRow label="Owner:" value={creator} />
        <DetailRow label="Format:" value={extension} />
        <DetailRow label="Size:" value={convertFileSize(size)} />
      </div>
    </>
  );
};

interface Props {
  fileName: string;
  url: string;
  size: number;
  extension: string;
  type: string;
  createdAt: number;
  creator: Id<"users">;
  users: [string];
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({
  fileName,
  url,
  type,
  extension,
  createdAt,
  users,
  onInputChange,
  onRemove,
}: Props) => {
  return (
    <>
      <ImageThumbnail
        fileName={fileName}
        url={url}
        type={type}
        extension={extension}
        createdAt={createdAt}
      />

      <div className="!mt-2 space-y-1">
        <p className="text-sm leading-[20px] font-semibold text-primary">
          Share your file
        </p>
        <span className="text-muted-foreground text-xs">(add a comma after each email to add multiple)</span>
        <Input
          type="email"
          placeholder="Enter email address(es)"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="text-[14px] leading-[20px] font-normal h-[52px] w-full rounded-2xl border px-4 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-[14px] leading-[20px] font-semibold text-primary">Shared with:</p>
            <p className="text-[14px] leading-[20px] font-semibold">{users?.length || 0} users</p>
          </div>

          <ul className="pt-2">
            {users?.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-sm text-muted-foreground leading-[20px] font-semibold">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  variant="outline"
                  size="icon"
                >
                  <X className="text-red-500 h-10 w-10" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};