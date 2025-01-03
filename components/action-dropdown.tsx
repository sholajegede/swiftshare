"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { actionsDropdownItems } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileDetails, ShareInput } from "@/components/actions-modal-content";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface FileCardProps {
  fileId: Id<"files">;
  storageId: Id<"_storage">;
  fileName: string;
  url: string;
  size: number;
  extension: string;
  type: string;
  createdAt: number;
  creator: string;
  users: [string];
}

const ActionDropdown: React.FC<FileCardProps> = ({
  fileId,
  storageId,
  fileName,
  url,
  type,
  size,
  createdAt,
  extension,
  users,
  creator,
}) => {
  const { getPermission } = useKindeBrowserClient();

  const canViewFileDetails = getPermission("view:file")
  const canEditFile = getPermission("edit:file");
  const canShareFile = getPermission("share:file");
  const canDeleteFile = getPermission("delete:file");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(fileName);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const router = useRouter();

  const deleteFile = useMutation(api.files.deleteFile);
  const renameFile = useMutation(api.files.updateFile);
  const updateFileUsers = useMutation(api.files.updateFile);

  const closeAllModals = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      setIsDropdownOpen(false);
      setAction(null);
      setName(name);
      //setEmails([]);
    }, 0);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({
          fileId,
          name,
          extension,
        }),
      share: () =>
        updateFileUsers({
          fileId,
          users: [...new Set([...users, ...emails])],
        }),
      delete: () =>
        deleteFile({
          fileId,
          storageId,
        }),
    };

    success = !!(await actions[action.value as keyof typeof actions]());

    if (success) {
      closeAllModals();
      router.refresh();
    }

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const updatedUsers = users.filter((user) => user !== email);

    const success = await updateFileUsers({
      fileId,
      users: updatedUsers,
    });

    if (success) {
      setEmails(updatedEmails);
      //closeAllModals();
    }
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="focus:ring-0 focus:ring-offset-0 focus-visible:border-none outline-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-muted-foreground">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-[14px] leading-[20px] font-normal h-[52px] w-full rounded-2xl border px-4 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
          )}
          {value === "details" && (
            <FileDetails
              fileName={fileName}
              url={url}
              type={type}
              extension={extension}
              createdAt={createdAt}
              size={size}
              creator={creator}
            />
          )}
          {value === "share" && (
            <ShareInput
              fileName={fileName}
              url={url}
              type={type}
              extension={extension}
              createdAt={createdAt}
              size={size}
              creator={creator}
              users={users}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="text-center text-muted-foreground">
              Are you sure you want to delete{` `}
              <span className="font-medium text-primary">{fileName}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} variant="destructive">
              Cancel
            </Button>
            <Button onClick={handleAction} variant={"default"}>
              <p className="capitalize">{value}</p>
              {isLoading && <Loader className="animate-spin" />}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {fileName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems
            .filter((actionItem) => {
              if (actionItem.value === "rename") {
                return canEditFile?.isGranted;
              }
              if (actionItem.value === "details") {
                return canViewFileDetails?.isGranted;
              }
              if (actionItem.value === "delete") {
                return canDeleteFile?.isGranted;
              }
              if (actionItem.value === "share") {
                return canShareFile?.isGranted;
              }
              return true;
            })
            .map((actionItem) => (
              <DropdownMenuItem
                key={actionItem.value}
                className="cursor-pointer"
                onClick={() => {
                  setAction(actionItem);

                  if (
                    ["rename", "share", "delete", "details"].includes(
                      actionItem.value
                    )
                  ) {
                    setTimeout(() => setIsModalOpen(true), 0);
                  }
                }}
              >
                {actionItem.value === "download" ? (
                  <div
                    onClick={() => {
                      setTimeout(() => {
                        window.open(url, "_blank");
                      }, 0);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={30}
                      height={30}
                    />
                    {actionItem.label}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={30}
                      height={30}
                    />
                    {actionItem.label}
                  </div>
                )}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};
export default ActionDropdown;