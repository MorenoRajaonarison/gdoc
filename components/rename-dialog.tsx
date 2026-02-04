"use client";


import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  documentId: Id<"documents">;
  children: React.ReactNode;
  initialTitle: string;
}

const RenameDialog = ({ documentId, children, initialTitle }: Props) => {
  const update = useMutation(api.documents.updateDocument);
  const [isUpdating, setIsUpdating] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    update({ id: documentId, title })
    .then(() => setOpen(false))
    .finally(() => setIsUpdating(false));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              You can change the name of the document. This will not affect the URL.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <DialogFooter>
            <Button type="button" disabled={isUpdating} variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating} onClick={e => e.stopPropagation()}>
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
