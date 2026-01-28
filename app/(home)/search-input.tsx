"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, XIcon } from "lucide-react";
import React, { useRef } from "react";
import { useQueryState } from "nuqs";
import { useSearchParams } from "@/hooks/use-search-param";

const SearchInput = () => {
  const [search, setSearch] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchInputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <InputGroup className="md:text-base placeholder:text-neutral-800 border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white">
          <InputGroupInput
            ref={searchInputRef}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {search && (
            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer"
              onClick={() => setSearch("")}
            >
              <XIcon />
            </InputGroupAddon>
          )}
        </InputGroup>
      </form>
    </div>
  );
};

export default SearchInput;
