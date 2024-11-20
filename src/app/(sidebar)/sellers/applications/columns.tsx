"use client";

import Link from "next/link";
import Image from "next/image";

import { CheckIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/ui/custom/CopyButton";

import { DataTableColumnHeader } from "@/components/helpers/dataTable/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import {
  dateFormatter,
  capitalizeFirstLetter,
  truncateString,
  timeAgo,
  getFormattedDate,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type shopApplication = {
  id: number | string;
  name: string;
  logo: string;
  subdomain: string;
  description: string;
  stripeVerified?: boolean;
  appliedAt: Date | string;
};

export const columns: ColumnDef<shopApplication>[] = [
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
      const rdata = row.original;
      return (
        <div className="flex flex-wrap gap-2 place-items-center">
          <Avatar>
            <AvatarImage src={rdata.logo}></AvatarImage>
            <AvatarFallback>{rdata.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="flex place-items-center gap-1">
            <h2 className="text-sm">{rdata.name}</h2>
            <CopyButton
              className="p-1 px-3"
              copyContent={rdata.name}
            ></CopyButton>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "subdomain",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subdomain" />
    ),

    cell: ({ row }) => {
      const value: string = row.getValue("subdomain");
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[170px] text-xs">
          {truncateString(row.getValue("description"), 40)}
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
      const verified: boolean = row.getValue("stripeVerified");
      return verified ? (
        <CheckIcon className="size-5 text-green-500" />
      ) : (
        <X className="size-5 text-red-500" />
      );
    },
  },
  {
    accessorKey: "appliedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applied At" />
    ),
    cell: ({ row }) => {
      const cell_value: Date = row.getValue("appliedAt");
      return (
        <div className="flex flex-col">
          <p>{getFormattedDate(cell_value)}</p>
          <p className="text-xs text-muted-foreground opacity-85">
            {timeAgo(cell_value)}
          </p>
        </div>
      );
    },
  },

  //   {
  //     accessorKey: "id",
  //     header: "#ID",
  //     cell: ({ row }) => {
  //       const value: string = row.getValue("id");
  //       return (
  //         <div className="font-medium">
  //           {value}{" "}
  //           <CopyButton copyContent={value} alertTitle="ID Copied:"></CopyButton>
  //         </div>
  //       );
  //     },
  //   },

  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="mr-[-2rem]  pr-0 max-w-[fit-content] flex flex-wrap gap-2">
          <Button
            className="text-muted-foreground hover:bg-green-500/75"
            variant={"outline"}
          >
            Accept
          </Button>
          <Button
            className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            variant={"outline"}
          >
            Decline
          </Button>
        </div>
      );
    },
  },
];
