import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { SiGoogledocs } from "react-icons/si"
import { Doc } from "@/convex/_generated/dataModel";
import { Building2Icon, CircleUserIcon, MoreVerticalIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface Props {
    doc: Doc<"documents">;
}

const DocumentRow = ({doc}: Props) => {
  return (
    <TableRow className="cursor-pointer">
        <TableCell className="w-[50px]">
            <SiGoogledocs className="size-6 fill-blue-500" />
        </TableCell>
        <TableCell className="font-medium md:w-[45%]">{doc.title}</TableCell>
        <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
            {doc.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
            {doc.organizationId ? "Organization" : "Personal"}
        </TableCell>
        <TableCell className="text-muted-foreground hidden md:table-cell">
            {format(new Date(doc._creationTime), "MMM dd, yyyy")}
        </TableCell>
        <TableCell className="flex justify-end">
           <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVerticalIcon />
           </Button>
        </TableCell>
    </TableRow>
  )
}

export default DocumentRow