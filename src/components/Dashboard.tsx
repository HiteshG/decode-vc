"use client";

import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost, Loader2, Plus, TrashIcon } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";

// Updated File type to match the actual structure
type File = {
  id: string;
  name: string;
  createdAt: string; // Changed from Date to string
  key: string;
  uploadStatus: string;
  url: string;
  updatedAt: string;
  enrich_data: any; // You might want to define a more specific type for this
};

const FileItem = ({ file, onDelete, isDeleting }: { file: File; onDelete: () => void; isDeleting: boolean }) => (
  <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
    <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
      <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
        <div
          aria-hidden
          className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
        />
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-lg font-medium text-zinc-900">
              {file.name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
    <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
      <div className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        {format(new Date(file.createdAt), "MMM yyyy")}
      </div>
      <br />
      <Button
        size="sm"
        className="w-full active:scale-90 transition-all duration-200 hover:opacity-90"
        variant="destructive"
        onClick={onDelete}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <TrashIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  </li>
);

const Dashboard = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null);
  
  // Simplify the query call
  const { data, isLoading } = trpc.getUserFiles.useQuery();

  // Use type assertion after receiving the data
  const files = data as File[] | undefined;

  const utils = trpc.useUtils();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate: ({ id }) => {
      setCurrentlyDeletingFile(id);
    },
    onSettled: () => {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900"> Enrich Pitch Decks</h1>
        <UploadButton isSubscribed={isSubscribed} />
      </div>

      {files && files.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onDelete={() => deleteFile({ id: file.id })}
                isDeleting={currentlyDeletingFile === file.id}
              />
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here. </h3>
          <p>Let&apos;s upload your first deck. </p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;