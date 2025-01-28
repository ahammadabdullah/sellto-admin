"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react"; // Import the filter icon

interface StatusFilterProps<TData> {
  table: Table<TData>;
}

export function StatusFilter<TData>({ table }: StatusFilterProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> {/* Use the filter icon */}
            Select Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => table.getColumn("status")?.setFilterValue("")}
          >
            All Statuses
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn("status")?.setFilterValue("pending")}
          >
            Pending
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              table.getColumn("status")?.setFilterValue("approved")
            }
          >
            Approved
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              table.getColumn("status")?.setFilterValue("declined")
            }
          >
            Declined
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
