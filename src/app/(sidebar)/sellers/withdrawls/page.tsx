// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { columns } from "./columns";

// This is temporary mock data - replace with actual data fetching
const getWithdrawals = async () => {
  const generateMockData = (count: number) => {
    const statuses = ["pending", "approved", "declined"];
    const shops = [
      "Electronics Store",
      "Fashion Boutique",
      "Grocery Mart",
      "Book Haven",
      "Toy World",
    ];
    const data = [];

    for (let i = 1; i <= count; i++) {
      const shopIndex = Math.floor(Math.random() * shops.length);
      const statusIndex = Math.floor(Math.random() * statuses.length);
      data.push({
        id: i.toString(),
        shopId: `SHOP${i.toString().padStart(3, "0")}`,
        shopName: shops[shopIndex],
        balance: parseFloat((Math.random() * 10000).toFixed(2)),
        requestAmount: parseFloat((Math.random() * 5000).toFixed(2)),
        status: statuses[statusIndex],
        createdAt: new Date().toISOString().split("T")[0],
      });
    }

    return data;
  };

  return generateMockData(20);
};

export default async function Withdrawals() {
  const withdrawals = await getWithdrawals();

  return (
    <>
      <PageTitle
        Icon={FileUser}
        title="Withdrawal Requests"
        subTitle={`(total ${withdrawals.length} requests)`}
      />

      <div className="bg-background rounded-lg p-4 border">
        <DataTable
          columns={columns}
          data={withdrawals}
          pagination={true}
          filterColumn="status"
          showStatusFilter={true}
        />
      </div>
    </>
  );
}
