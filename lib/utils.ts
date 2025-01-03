import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const formatDateTime = (timestamp: string | number | null | undefined) => {
  if (!timestamp) return "—";

  const date = new Date(Number.parseFloat(timestamp.toString()));

  if (isNaN(date.getTime())) return "—";

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string): { mimeType: string; type: string; extension: string } => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  const mimeTypes: Record<string, { mimeType: string; type: string }> = {
    pdf: { mimeType: "application/pdf", type: "document" },
    doc: { mimeType: "application/msword", type: "document" },
    docx: { mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", type: "document" },
    txt: { mimeType: "text/plain", type: "document" },
    xls: { mimeType: "application/vnd.ms-excel", type: "document" },
    xlsx: { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", type: "document" },
    csv: { mimeType: "text/csv", type: "document" },
    rtf: { mimeType: "application/rtf", type: "document" },
    ods: { mimeType: "application/vnd.oasis.opendocument.spreadsheet", type: "document" },
    ppt: { mimeType: "application/vnd.ms-powerpoint", type: "document" },
    odp: { mimeType: "application/vnd.oasis.opendocument.presentation", type: "document" },
    md: { mimeType: "text/markdown", type: "document" },
    html: { mimeType: "text/html", type: "document" },
    htm: { mimeType: "text/html", type: "document" },
    epub: { mimeType: "application/epub+zip", type: "document" },
    pages: { mimeType: "application/x-iwork-pages-sffpages", type: "document" },
    fig: { mimeType: "application/vnd.figma.raw+json", type: "document" },
    psd: { mimeType: "image/vnd.adobe.photoshop", type: "image" },
    ai: { mimeType: "application/postscript", type: "document" },
    indd: { mimeType: "application/x-indesign", type: "document" },
    xd: { mimeType: "application/vnd.adobe.xd", type: "document" },
    sketch: { mimeType: "application/vnd.sketch", type: "document" },
    afdesign: { mimeType: "application/x-affinity-designer", type: "document" },
    afphoto: { mimeType: "application/x-affinity-photo", type: "document" },
    jpg: { mimeType: "image/jpeg", type: "image" },
    jpeg: { mimeType: "image/jpeg", type: "image" },
    png: { mimeType: "image/png", type: "image" },
    gif: { mimeType: "image/gif", type: "image" },
    bmp: { mimeType: "image/bmp", type: "image" },
    svg: { mimeType: "image/svg+xml", type: "image" },
    webp: { mimeType: "image/webp", type: "image" },
    mp4: { mimeType: "video/mp4", type: "video" },
    avi: { mimeType: "video/x-msvideo", type: "video" },
    mov: { mimeType: "video/quicktime", type: "video" },
    mkv: { mimeType: "video/x-matroska", type: "video" },
    webm: { mimeType: "video/webm", type: "video" },
    mp3: { mimeType: "audio/mpeg", type: "audio" },
    wav: { mimeType: "audio/wav", type: "audio" },
    ogg: { mimeType: "audio/ogg", type: "audio" },
    flac: { mimeType: "audio/flac", type: "audio" },
  };

  const fileType = mimeTypes[extension] || { mimeType: "application/octet-stream", type: "other" };

  return { ...fileType, extension };
};

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string,
) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/assets/icons/file-pdf.svg";
    case "doc":
      return "/assets/icons/file-doc.svg";
    case "docx":
      return "/assets/icons/file-docx.svg";
    case "csv":
      return "/assets/icons/file-csv.svg";
    case "txt":
      return "/assets/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/assets/icons/file-document.svg";
    // Image
    case "svg":
      return "/assets/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/assets/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/assets/icons/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/file-video.svg";
        case "audio":
          return "/assets/icons/file-audio.svg";
        default:
          return "/assets/icons/file-other.svg";
      }
  }
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return "document";
    case "images":
      return "image";
    case "videos":
      return "video";
    case "audios":
      return "audio";
    case "others":
      return "other";
    default:
      return "document";
  }
};