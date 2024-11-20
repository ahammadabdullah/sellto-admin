// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { shopBasicDetailsType, columns } from "./columns";
import prisma from "@/lib/db";

async function getAllShops() {
  const data = await prisma.shop.findMany({
    where: {
      status: {
        in: ["clean", "warned", "banned"],
      },
    },
  });
  return data;
}
export default async function Home() {
  const data = await getAllShops();
  console.log(data);
  return (
    <>
      <PageTitle Icon={Store} title="Sellers" subTitle="(total 54 sellers)" />
      <div className="bg-background rounded-lg p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </>
  );
}
