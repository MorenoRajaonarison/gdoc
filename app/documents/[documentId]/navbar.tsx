"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSub,
} from "@/components/ui/menubar";
import DocumentInput from "./document-input";
import {
  BoldIcon,
  Code,
  FileBraces,
  FilePenIcon,
  FilePlusIcon,
  FileText,
  FileType,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  SaveIcon,
  StrikethroughIcon,
  Table,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import InsertTableDialog from "@/components/insert-table-dialog";

const Navbar = () => {
  const { editor } = useEditorStore();

  const insertTable = ({rows, cols}: {rows: number, cols: number}) => {
    editor?.commands.insertTable({ rows, cols, withHeaderRow: false })
  }

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = fileName
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const onSaveJson = () => {
    if(!editor) return;
    const content = editor?.getJSON()
    const blob = new Blob([JSON.stringify(content)], { type: "application/json" })
    onDownload(blob, "document.json")
  }

  const onSaveHtml = () => {
    if(!editor) return;
    const content = editor?.getHTML()
    const blob = new Blob([content], { type: "text/html" })
    onDownload(blob, "document.html")
  }

  const onSaveText = () => {
    if(!editor) return;
    const content = editor?.getHTML()
    const blob = new Blob([content], { type: "text/plain" })
    onDownload(blob, "document.txt")
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image width={36} height={36} src="/logo.svg" alt="Logo" />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <SaveIcon size={15} className="mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileBraces />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <Code />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}> 
                        <FileText />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileType />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onSelect={(e) => e.preventDefault()}>
                    <FilePenIcon />
                    Rename
                  </MenubarItem>
                  <MenubarItem onSelect={(e) => e.preventDefault()}>
                    <TrashIcon />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon />
                    Print
                    <MenubarShortcut>cmd+p</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.commands.undo()}>
                    <Undo2Icon />
                    Undo
                    <MenubarShortcut>cmd+z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.commands.redo()}>
                    <Redo2Icon />
                    Redo
                    <MenubarShortcut>cmd+y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Table size={15} className="mr-2" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>1 x 1</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>2 x 2</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>3 x 3</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>4 x 4</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 5, cols: 5 })}>5 x 5</MenubarItem>
                      <MenubarSeparator />
                      <InsertTableDialog />
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon size={15} className="mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => editor?.commands.toggleBold()}>
                        <BoldIcon />
                        Bold<MenubarShortcut>cmd+b</MenubarShortcut>
                      </MenubarItem> 
                      <MenubarItem onClick={() => editor?.commands.toggleItalic()}>
                        <ItalicIcon />
                        Italic<MenubarShortcut>cmd+i</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.commands.toggleUnderline()}>
                        <UnderlineIcon />
                        Underline<MenubarShortcut>cmd+u</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.commands.toggleStrike()}>
                        <StrikethroughIcon />
                        Strikethrough<MenubarShortcut>cmd+s</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={() => editor?.commands.unsetAllMarks()}>
                    <RemoveFormatting />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
