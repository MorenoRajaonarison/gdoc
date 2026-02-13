import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useDebounce } from "@/hooks/use-debounce";
import { useMutation } from "convex/react";
import React from "react";
import { toast } from "sonner";
import {BsCloudCheck, BsCloudSlash} from "react-icons/bs"
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface DocumentInputProps {
    title: string;
    id: Id<"documents">;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus()
  const [value, setValue] = React.useState(title);
  const [pending, setPending] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateDocument)

  const debouncedUpdateDocument = useDebounce((newTitle: string) => {
    if(newTitle === value) return;
    setPending(true)
    mutate({id, title: newTitle})
      .then(() => toast.success("Document updated"))
      .catch(() => toast.error("Failed to update document"))
      .finally(() => {
        setPending(false)
      })
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedUpdateDocument(newValue)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setPending(true)
    mutate({id, title: value})
      .then(() => {
        toast.success("Document updated")
        setEditing(false)
      })
      .catch((e) => {
        toast.error("Failed to update document")
      })
      .finally(() => {
        setPending(false)
      })
  }
  
  const showLoader = pending || status === "connecting" || status === "reconnecting"
  const showError = status === "disconnected"

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">{value || " "}</span>
          <input ref={inputRef} value={value} onChange={handleChange} onBlur={() => setEditing(false)} className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate" />
        </form>
      ):(
        <span onClick={() => {
          setEditing(true)
          setTimeout(() => {
            inputRef.current?.focus()
          }, 0)
        }} className="text-lg px-1.5 cursor-pointer truncate">
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {
        !showError && !showLoader && (
          <BsCloudCheck className="size-4" />
        )
      }
      {showLoader && (
        <Spinner />
      )}
    </div>
  );
};

export default DocumentInput;