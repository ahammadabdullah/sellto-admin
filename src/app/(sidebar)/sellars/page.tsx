// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { shopBasicDetailsType, columns } from "./columns";

async function getData(): Promise<shopBasicDetailsType[]> {
  return [
    {
      id: 1,
      logo: "/placeholder.svg?height=40&width=40",
      name: "Tech Haven",
      subdomain: "techhaven",
      stripeVerified: true,
      status: "clean",
      warnings: null,
      balance: 5000.75,
      currency: "USD",
    },
    {
      id: 2,
      logo: "/placeholder.svg?height=40&width=40",
      name: "Gadget World",
      subdomain: "gadgetworld",
      stripeVerified: false,
      status: "warned",
      warnings: {
        amount: 2,
        list: ["Late payment", "Policy violation"],
      },
      balance: 2500.5,
      currency: "EURO",
    },
    {
      id: 3,
      logo: "/placeholder.svg?height=40&width=40",
      name: "Digital Dreams",
      subdomain: "digitaldreams",
      stripeVerified: true,
      status: "banned",
      warnings: null,
      balance: 0,
      currency: "USD",
    },
  ];
}

export default async function Home() {
  const data = await getData();
  return (
    <>
      <PageTitle Icon={Store} title="Sellars" subTitle="(total 54 sellars)" />
      <div className="bg-background rounded-lg p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </>
  );
}
