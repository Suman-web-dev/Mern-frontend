import { UploadCloud, File, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface UploadCardProps {
  title: string;
  description: string;
  acceptedFormats: string[];
  maxSize: number;
  uploadedFile?: UploadedFile | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  hasError?: boolean;
  className?: string;
}

export default function UploadCard({
  title,
  description,
  acceptedFormats,
  maxSize,
  uploadedFile,
  onUpload,
  onRemove,
  hasError = false,
  className,
}: UploadCardProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const validateAndUpload = (file: File) => {
    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(`.${fileExtension}`)) {
      alert(`Invalid file type. Accepted formats: ${acceptedFormats.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    onUpload(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col h-full", className)}>
      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-3 text-center transition-colors cursor-pointer flex-grow flex flex-col items-center justify-center",
            hasError
              ? "border-red-400 bg-red-50 hover:border-red-500"
              : "border-gray-300 hover:border-primary-500"
          )}
        >
          <input
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id={`upload-${title}`}
          />
          <label htmlFor={`upload-${title}`} className="cursor-pointer flex flex-col items-center justify-center w-full">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
            <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-700 font-medium mb-1">
              Drag & Drop or Browse
            </p>
            <p className="text-[10px] text-gray-500">
              {acceptedFormats.join(', ')} • Max {maxSize}MB
            </p>
          </label>
        </div>
      ) : (
        <div className="border-2 border-dashed border-green-400 rounded-lg p-3 text-center bg-green-50 flex-grow flex flex-col items-center justify-center h-full">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="font-medium text-gray-900 text-xs mb-1 truncate w-full">{uploadedFile.name}</p>
          <p className="text-[10px] text-gray-500 mb-2">{formatFileSize(uploadedFile.size)}</p>
          <button
            onClick={onRemove}
            className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
