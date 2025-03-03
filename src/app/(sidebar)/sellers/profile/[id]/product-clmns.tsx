"use client";

import Link from "next/link";
import Image from "next/image";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/ui/custom/CopyButton";

import { DataTableColumnHeader } from "@/components/helpers/dataTable/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { dateFormatter, capitalizeFirstLetter } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { toast } from "@/hooks/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Product = {
  id: string;
  productName: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  type?: string;
  stock?: number;
  shopId: string;
  price: number;
  shortDescription?: string | null;
  shopSubDomain: string;
};

// const handleDelete = async (id: string) => {
//   if (confirm("Are you sure you want to delete this product?")) {
//     console.log(id);
//     const res = await deleteProduct(id);
//     console.log(res);
//     if (res.success) {
//       toast({
//         title: "Success",
//         description: "Product deleted successfully",
//         variant: "default",
//       });
//     }
//   }
// };

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      const pd = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const { toast } = useToast();

      return (
        <div className="flex flex-wrap gap-2 place-items-center">
          <Image
            src={pd?.image || "/placeholder.png"}
            alt="img"
            width={40}
            height={40}
            className="max-w-[50px] aspect-square rounded object-cover"
          />
          <div className="flex flex-col">
            <div className="flex place-items-center gap-1">
              <h2 className="text-lg">{pd.productName}</h2>
              <CopyButton
                className="p-1 px-3"
                copyContent={pd.productName}
              ></CopyButton>
            </div>
            <p className="text-xs text-muted-foreground">
              (created at{dateFormatter(pd.createdAt)})
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const { toast } = useToast();

      return (
        <div className="font-medium">
          {value}{" "}
          <CopyButton copyContent={value} alertTitle="ID Copied:"></CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const cell_value: string = row.getValue("type");
      return (
        <div className="text-muted-foreground text-base">
          {capitalizeFirstLetter(cell_value)}
        </div>
      );
    },
  },
  {
    accessorKey: "visibility",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="visibility" />
    ),
    cell: ({ row }) => {
      const cell_value: "unpublished" | "active" | "discontinued" =
        row.getValue("visibility");
      return (
        <div
          className={cn(
            "text-center p-[0.35rem] max-w-[115px] rounded font-bold ",
            cell_value === "unpublished" && `bg-[#FFAE5C]/20 text-[#FFAE5C]`,
            cell_value === "active" && `bg-[#1ED760]/20 text-[#1ED760]`,
            cell_value === "discontinued" && `bg-[#FF5C5C]/20 text-[#FF5C5C]`
          )}
        >
          {cell_value}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("price"));
      return (
        <div className=" font-medium text-base">
          {value} <span className="text-muted-foreground opacity-80">USD</span>
        </div>
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
            <Link href={`/dashboard/products/edit/${rowData.id}`}>
              {" "}
              <ExternalLink size={18} />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
