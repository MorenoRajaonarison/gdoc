import Link from "next/link";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <Link href="/documents/123">One Document</Link>
    </div>
  );
}
