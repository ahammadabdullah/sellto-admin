// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { columns, shopApplication } from "./columns";
import prisma from "@/lib/db";

async function getData(): Promise<shopApplication[]> {
  const data = await prisma.user.findMany({
    where: {
      role: "merchant",
      status: "pending",
      shopId: {
        not: null,
      },
    },
    include: {
      Shop: {
        select: {
          id: true,
          name: true,
          favicon: true,
          subDomain: true,
          description: true,
          createdAt: true,
        },
      },
    },
  });
  return data.map((d) => ({
    id: d.shopId as string,
    name: d.Shop?.name as string,
    logo: d.Shop?.favicon as string,
    subdomain: d.Shop?.subDomain as string,
    description: d.Shop?.description as string,
    appliedAt: d.Shop?.createdAt as Date,
  }));
}

export default async function Applications() {
  const data = await getData();
  console.log(data);
  return (
    <>
      <PageTitle
        Icon={FileUser}
        title="Sellars Applications"
        subTitle="(total 20 applications)"
      />
      <div className="bg-background rounded-lg p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </>
  );
}
