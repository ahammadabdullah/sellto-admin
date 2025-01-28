"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WithdrawalActions } from "./withdrawal-actions";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/helpers/dataTable/DataTableColumnHeader";

type WithdrawalData = {
  id: string;
  shopId: string;
  shopName: string;
  balance: number;
  requestAmount: number;
  status: string;
  createdAt: string;
};

const statusOrder = {
  pending: 1,
  approved: 2,
  declined: 3,
};

export const columns: ColumnDef<WithdrawalData>[] = [
  {
    accessorKey: "shopId",
    header: "Shop ID",
  },
  {
    accessorKey: "shopName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop Name" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/sellers/profile/${row.original.shopId}`}>
          <Button variant="link">{row.original.shopName}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop Balance" />
    ),
    cell: ({ row }) => {
      return `$${row.original.balance.toFixed(2)}`;
    },
  },
  {
    accessorKey: "requestAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Amount" />
    ),
    cell: ({ row }) => {
      return `$${row.original.requestAmount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : status === "approved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Date" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status !== "pending") {
        return null;
      }
      return (
        <WithdrawalActions
          withdrawal={
            row.original as WithdrawalData & {
              status: "pending" | "approved" | "declined";
            }
          }
        />
      );
    },
  },
];

export type Withdrawal = WithdrawalData & {
  status: "pending" | "approved" | "declined";
};
