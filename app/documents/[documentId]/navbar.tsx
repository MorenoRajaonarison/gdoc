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
  RedoIcon,
  RemoveFormatting,
  SaveIcon,
  StrikethroughIcon,
  Table,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";

const Navbar = () => {
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
                      <MenubarItem>
                        <FileBraces />
                        JSON
                      </MenubarItem>
                      <MenubarItem>
                        <Code />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <FileText />
                        PDF
                      </MenubarItem>
                      <MenubarItem>
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
                  <MenubarItem>
                    <FilePenIcon />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
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
                  <MenubarItem>
                    <UndoIcon />
                    Undo
                    <MenubarShortcut>cmd+z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <RedoIcon />
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
                      <MenubarItem>1 x 1</MenubarItem>
                      <MenubarItem>2 x 2</MenubarItem>
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
                      <MenubarItem>
                        <BoldIcon />
                        Bold<MenubarShortcut>cmd+b</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <ItalicIcon />
                        Italic<MenubarShortcut>cmd+i</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <UnderlineIcon />
                        Underline<MenubarShortcut>cmd+u</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <StrikethroughIcon />
                        Strikethrough<MenubarShortcut>cmd+s</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
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
