import { Doc } from '@/convex/_generated/dataModel';
import { PaginationStatus } from 'convex/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from 'react'
import { Spinner } from "@/components/ui/spinner"
import DocumentRow from './document-row';
import { Button } from '@/components/ui/button';

interface Props {
    docs: Doc<"documents">[]|undefined;
    status: PaginationStatus;
    loadMore: (numItems: number) => void;
}

const DocumentsTable = ({docs, status, loadMore}: Props) => {
  return (
    <div className='max-w-7xl mx-auto px-16 py-6 flex flex-col gap-5'>
        {
            docs === undefined ? (
                <div className="flex justify-center items-center h-24">
                    <Spinner />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent border-none'>
                            <TableHead>Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className='hidden md:table-cell'>Shared</TableHead>
                            <TableHead className='hidden md:table-cell'>Created at</TableHead>
                        </TableRow>
                    </TableHeader>
                    {
                        docs.length === 0 ? (
                            <TableBody>
                                <TableRow className='hover:bg-transparent'>
                                    <TableCell colSpan={4} className='h-24 text-center text-muted-foreground'>
                                        No documents
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ): (
                            <TableBody>
                                {docs.map(doc => <DocumentRow doc={doc} key={doc._id} />)}
                            </TableBody>
                        )
                    }
                </Table>
            )
        }
        <div className="flex items-center justify-center">
            <Button size="sm" variant="ghost" onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>
                {status === "CanLoadMore" ? "Load more" : "End results"}
            </Button>
        </div>
    </div>
  )
}

export default DocumentsTable