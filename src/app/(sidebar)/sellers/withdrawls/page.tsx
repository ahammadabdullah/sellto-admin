import { FileUser } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { columns } from "./columns";
import prisma from "@/lib/db";

async function getWithdrawals() {
  const data = await prisma.withdraw.findMany({
    include: {
      Shop: true,
    },
  });
  return data.map((d) => ({
    id: d.id,
    shopId: d.shopId,
    shopName: d.Shop?.name,
    balance: d.Shop?.balance,
    requestAmount: d.amount,
    stripeAccountId: d.Shop.stripeAccountId,
    stripeStatus: d.Shop.stripeStatus,
    status: d.status,
    createdAt: d.createdAt.toISOString(),
  }));
}

export default async function Withdrawals() {
  const withdrawals = await getWithdrawals();

  return (
    <>
      <PageTitle
        Icon={FileUser}
        title="Withdrawal Requests"
        subTitle={`(total ${withdrawals.length || 0} requests)`}
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
