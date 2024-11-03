// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { columns, sellarTickets } from "./column";

async function getData(): Promise<sellarTickets[]> {
  return [
    {
      id: "T1234",
      logo: "/placeholder.svg?height=40&width=40",
      name: "Acme Store",
      subdomain: "acmestore",
      senderEmail: "support@acmestore.com",
      createdAt: "2023-06-15 14:30",
      status: "active",
    },
    {
      id: "T5678",
      logo: "/placeholder.svg?height=40&width=40",
      name: "Globex Shop",
      subdomain: "globexshop",
      senderEmail: "help@globexshop.com",
      createdAt: "2023-06-14 09:15",
      status: "closed",
    },
    {
      id: "T9012",
      logo: "/placeholder.svg?height=40&width=40",
      name: "Initech Market",
      subdomain: "initechmarket",
      senderEmail: "support@initechmarket.com",
      createdAt: "2023-06-16 11:45",
      status: "pending reply",
    },
  ];
}

export default async function SellarTickets() {
  const data = await getData();
  return (
    <>
      <PageTitle
        Icon={Ticket}
        title="Sellars Tickets"
        subTitle="(total 20 tickets)"
      />
      <div className="bg-background rounded-lg p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </>
  );
}
