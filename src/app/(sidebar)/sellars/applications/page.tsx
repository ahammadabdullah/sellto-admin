// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";

import PageTitle from "@/components/ui/custom/PageTitle";
import { DataTable } from "@/components/helpers/dataTable/data-table";
import { columns, shopApplication } from "./columns";

async function getData(): Promise<shopApplication[]> {
  return [
    {
      id: 1,
      name: "Cool Shop",
      logo: "https://github.com/shadcn.png",
      subdomain: "cool-shop",
      description: "A very cool shop",
      stripeVerified: true,
      appliedAt: new Date(),
    },
    {
      id: 2,
      name: "Awesome Store",
      logo: "/placeholder.svg?height=40&width=40",
      subdomain: "awesome-store",
      description: "An awesome store with great products",
      stripeVerified: false,
      appliedAt: new Date("2023-05-16T14:45:00"),
    },
    {
      id: 3,
      name: "Mega Mart",
      logo: "/placeholder.svg?height=40&width=40",
      subdomain: "mega-mart",
      description: "Your one-stop shop for everything",
      stripeVerified: true,
      appliedAt: new Date("2023-05-17T09:15:00"),
    },
    {
      id: 4,
      name: "Trendy Boutique",
      logo: "/placeholder.svg?height=40&width=40",
      subdomain: "trendy-boutique",
      description: "Stay fashionable with our latest trends",
      stripeVerified: true,
      appliedAt: new Date("2023-05-18T11:20:00"),
    },
    {
      id: 5,
      name: "Gadget World",
      logo: "/placeholder.svg?height=40&width=40",
      subdomain: "gadget-world",
      description: "Discover the latest tech gadgets",
      stripeVerified: false,
      appliedAt: new Date("2023-05-19T16:00:00"),
    },
    // Add more mock data as needed
  ];
}

export default async function Applications() {
  const data = await getData();
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
