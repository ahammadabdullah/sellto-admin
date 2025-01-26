import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  ChevronRight,
  PackageSearch,
  ShoppingBasket,
  Ticket,
  Palette,
  Users,
  FileText,
} from "lucide-react";
import { StatsCard } from "@/components/stats-card";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Flag } from "lucide-react";
import { DollarSign } from "lucide-react";
import { TicketIcon } from "lucide-react";
import { OrderVolumeChart } from "@/components/order-volume-chart";
const navItems = [
  { icon: ShoppingBasket, label: "Sellers", url: "/sellers" },
  { icon: Ticket, label: "Sellar Applications", url: "/sellers/applications" },
  { icon: PackageSearch, label: "Sellar Tickers", url: "/sellers/tickets" },
  { icon: Palette, label: "Settings", url: "/settings" },
];

export default function Home() {
  return (
    <>
      <div className="container ">
        <div className="mx-auto flex flex-col items-center justify-center mb-16">
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Balance Available"
            value="$124,750.50"
            subtitle="Current funds across all accounts"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Open Seller Tickets"
            value="23"
            subtitle="Unresolved issues from sellers"
            icon={<TicketIcon className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Open Customer Reports"
            value="15"
            subtitle="Pending customer complaints"
            icon={<Flag className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Total Seller Count"
            value="1,234"
            subtitle="Active sellers on the platform"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Total Seller Applications"
            value="78"
            subtitle="Pending seller registrations"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Total website visits"
            value="78"
            subtitle="Total website visits"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Volume Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderVolumeChart />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto"></div>
    </>
  );
}
