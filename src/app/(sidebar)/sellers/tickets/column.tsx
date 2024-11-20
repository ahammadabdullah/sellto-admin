"use client";

import Link from "next/link";
import Image from "next/image";

import { Mail, MessageSquare, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  cn,
  getFormattedDate,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type sellarTickets = {
  id: number | string;
  logo: string;
  name: string;
  subdomain: string;
  senderEmail: string;
  createdAt: Date;
  status: "open" | "closed";
};
export const columns: ColumnDef<sellarTickets>[] = [
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
          <div className="">
            <div className="flex place-items-center gap-1">
              <h2 className="text-sm">{truncateString(rdata.name, 20)}</h2>
              <CopyButton
                className="p-1 px-3"
                copyContent={rdata.name}
              ></CopyButton>
            </div>
            <p className="text-xs text-muted-foreground opacity-85 -mt-2">
              Subdomain: {truncateString(rdata.subdomain, 30)}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "senderEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender Email" />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("senderEmail");
      return (
        <div className="font-medium">
          {value}{" "}
          <CopyButton
            copyContent={value}
            alertTitle="Email Copied:"
          ></CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#TicketID" />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      return (
        <div className="font-medium">
          {value}{" "}
          <CopyButton
            copyContent={value}
            alertTitle="Ticket ID Copied:"
          ></CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const cell_value: Date = row.getValue("createdAt");
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

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => {
      const cell_value: string = row.getValue("status");
      const className = {
        open: "bg-[#1ED760]/20 text-[#1ED760] hover:bg-[#1ED760]/25",
        closed: "bg-[#FF5C5C]/20 text-[#FF5C5C] hover:bg-[#FF5C5C]/25",
      };
      return (
        <Badge
          className={cn(
            cell_value === "open" && className.open,
            cell_value === "closed" && className.closed,
            "cursor-default"
          )}
        >
          {capitalizeFirstLetter(cell_value)}
        </Badge>
      );
    },
  },

  {
    id: "actions",

    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="mr-[-2rem]  pr-0 max-w-[fit-content]">
          <Button
            className="text-muted-foreground hover:bg-muted-foreground/25"
            variant={"ghost"}
            size={"icon"}
            onClick={() =>
              console.log("link: /dashboard/products/" + rowData.id)
            }
          >
            <Link href={`/sellers/tickets/chat/${rowData.id}`}>
              <MessageSquare size={22} />
            </Link>
          </Button>
          <Button
            className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            variant={"ghost"}
            size={"icon"}
            onClick={() => console.log("link: api/product/dlt/" + rowData.id)}
          >
            <Trash2 size={20} />
          </Button>
        </div>
      );
    },
  },
];
