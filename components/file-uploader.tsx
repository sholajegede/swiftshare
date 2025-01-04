"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Thumbnail from "@/components/thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FileX, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface Props {
  ownerId: Id<"users">;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const { getPermission } = useKindeBrowserClient();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const canUploadFile = getPermission("upload:file");

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl, {
    onUploadProgress: (progress: any) => setUploadProgress(progress),
  });

  const getFileUrl = useMutation(api.files.getUrl);
  const saveUserFile = useMutation(api.files.createFile);

  const uploadFile = async (
    file: File,
    ownerId: Id<"users">,
    accountId: string
  ): Promise<boolean> => {
    const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
    const fileName = file.name;
    const fileSize = file.size;

    setUploadProgress(0);

    try {
      const { mimeType, type, extension } = getFileType(fileName);
      const file = new File([blob], fileName, { type: mimeType });

      const uploaded = await startUpload([file]);

      const storageId = (uploaded[0].response as any).storageId;

      const fileUrl = await getFileUrl({ storageId });

      await saveUserFile({
        userId: ownerId,
        accountId,
        name: fileName,
        type,
        url: fileUrl || "",
        storageId: storageId !== null ? storageId : undefined,
        extension,
        size: fileSize,
      });

      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading file",
        variant: "destructive",
      });
      return false;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );

          return toast({
            title: "Max file size is 50MB.",
            description: (
              <p className="text-[14px] leading-[20px] font-normal text-white">
                <span className="font-semibold">{file.name}</span> is too large.
              </p>
            ),
            variant: "destructive",
          });
        }

        const success = await uploadFile(file, ownerId, accountId);

        if (success) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
        }
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  if (!canUploadFile?.isGranted) {
    return <div>Access denied</div>;
  }

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("h-[48px] gap-2 px-8", className)}>
        <Upload className="h-8 w-8" /> <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="fixed bottom-10 right-10 z-80 flex size-full h-fit max-w-[480px] flex-col gap-3 rounded-[20px] border text-card-foreground shadow p-7">
          <h4 className="h4 text-primary">Uploading</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-xl p-3 shadow-drop-3"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="text-[14px] leading-[20px] font-semibold mb-2 grid max-w-[300px]">
                    {file.name}
                    <Progress value={uploadProgress} className="mt-1" />
                  </div>
                </div>

                <FileX
                  className="h-6 w-6 stroke-red-500"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;