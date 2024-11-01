// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/custom/PageTitle";
import { Ticket } from "lucide-react";
export default function Home() {
  return (
    <div className=" p-8">
      <PageTitle
        Icon={Ticket}
        title="Sellars Tickets"
        subTitle="(total 20 tickets)"
      />
    </div>
  );
}
