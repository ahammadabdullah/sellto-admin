import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  ChevronRight,
  PackageSearch,
  ShoppingBasket,
  Ticket,
  Palette,
} from "lucide-react";
const navItems = [
  { icon: ShoppingBasket, label: "Sellars", url: "/sellars" },
  { icon: Ticket, label: "Sellar Applications", url: "/sellars/applications" },
  { icon: PackageSearch, label: "Sellar Tickers", url: "/sellars/tickets" },
  { icon: Palette, label: "Settings", url: "/settings" },
];

export default function Home() {
  return (
    <div className="container px-10 h-[80vh] grid place-items-center text-center">
      <div>
        <h1 className="font-clash text-4xl font-medium mb-10">
          <span className="text-muted-foreground/90 font-normal">
            Welcome to Sellto.io
          </span>
          <br />
          Super Admin Dashboard
        </h1>
        <div className="flex flex-wrap gap-2">
          {navItems.map((page) => (
            <Button key={page.label} asChild variant={"outline"}>
              <Link href={page.url}>
                {page.label} <ChevronRight></ChevronRight>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
