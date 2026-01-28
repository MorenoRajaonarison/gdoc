import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image width={36} height={36} src="/logo.svg" alt="Logo" />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div className=""></div>
    </nav>
  );
};

export default Navbar;
