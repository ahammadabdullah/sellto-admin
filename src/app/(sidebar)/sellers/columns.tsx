"use client";

import Link from "next/link";
import Image from "next/image";

import {
  CheckIcon,
  X,
  MoreHorizontal,
  Gavel,
  TriangleAlert,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/ui/custom/CopyButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "@/components/helpers/dataTable/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import {
  dateFormatter,
  capitalizeFirstLetter,
  truncateString,
  timeAgo,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type shopBasicDetailsType = {
  id: string;
  favicon: string | null;
  name: string;
  subDomain: string;
  status: "clean" | "warned" | "banned" | "pending";
  balance: number;
  currency: string;
};
export const columns: ColumnDef<shopBasicDetailsType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop Name" />
    ),
    cell: ({ row }) => {
      const rData = row.original;
      return (
        <div className="flex flex-wrap gap-2 place-items-center">
          <Avatar>
            <AvatarImage src={rData.favicon || ""}></AvatarImage>
            <AvatarFallback>{rData.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="-mt-2">
            <div className="flex flex-wrap place-items-center md:gap-1">
              <h2 className="text-sm">{rData.name}</h2>
              <CopyButton
                className="p-1 px-3"
                copyContent={rData.name}
              ></CopyButton>
            </div>
            <p className="text-xs text-muted-foreground opacity-85 md:-mt-2">
              ID: {truncateString(rData.id?.toString(), 30)}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "subDomain",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subdomain" />
    ),

    cell: ({ row }) => {
      const value: string = row.getValue("subDomain");
      return (
        <div className="font-medium">
          {value}{" "}
          <CopyButton
            copyContent={value}
            alertTitle="Subdomain Copied:"
          ></CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "stripeVerified",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Stripe"
        ICON1={X}
        ICON2={CheckIcon}
        text1="Not connected"
        text2="Connected"
      />
    ),
    cell: ({ row }) => {
      // need to update in future
      const verified = true;
      return verified ? (
        <CheckIcon className="size-5 text-green-500" />
      ) : (
        <X className="size-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <div
          className={`text-xs text-${status === "clean" ? "green" : "yellow"}`}
        >
          {capitalizeFirstLetter(status)}
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => {
      const rData = row.original;
      return (
        <div className="flex gap-1">
          <p>
            {rData.balance}{" "}
            <span className="text-muted-foreground/65">{rData.currency}</span>
          </p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original;
      const className = {
        clean: " text-[#1ED760] focus:bg-[#1ED760]/25",
        ban: " text-[#FF5C5C] focus:bg-[#FF5C5C]/25",
        warn: " text-[#FFAE5C] focus:bg-[#FFAE5C]/25",
      };
      return (
        <div className="sm:mr-[-2rem]  pr-0 max-w-[fit-content] flex flex-wrap gap-2">
          <Button variant="ghost">
            <Link href={`/sellers/profile/${rowData.id}`}>
              <span className="hidden md:inline-block">View</span>Profile
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className={className.ban}>
                <Gavel className="mr-2 h-4 w-4" />
                Ban
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem className={className.warn}>
                <TriangleAlert className="mr-2 h-4 w-4" />
                Warn
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
