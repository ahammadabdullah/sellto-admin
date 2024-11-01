// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/custom/PageTitle";
import { FileUser } from "lucide-react";
export default function Home() {
  return (
    <div className=" p-8">
      <PageTitle
        Icon={FileUser}
        title="Sellars Applications"
        subTitle="(total 20)"
      />
    </div>
  );
}
